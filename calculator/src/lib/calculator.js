import BN from 'bignumber.js';
import Sandbox from '@/lib/sandbox';
import { Convertor } from '@/lib/utils';

const coinInfo = {
  DAI: { places: 18, wrapped: 'cDAI' },
  USDC: { places: 6, wrapped: 'cUSDC' },
  cDAI: { places: 8, underlying: 'DAI' },
  cUSDC: { places: 8, underlying: 'USDC' },
  USDT: { places: 6, underlying: false, wrapped: false },
  POOL: { places: 18 },
};

const coinConvertors = Object.keys(coinInfo).reduce((acc, coinName) => {
  const { [coinName]: { places } } = coinInfo;
  return { ...acc, [coinName]: Convertor(places) };
}, {});

const underConvert = (decUnder, decCoin) => (currentRate) => {
  const decRate = 18 + decUnder - decCoin;
  const rateConvertor = Convertor(decRate);

  const underConvertor = Convertor(decUnder);
  const coinConvertor = Convertor(decCoin);

  const rate = BN(rateConvertor.fromNative(currentRate));

  const underToCoin = (n, isNative = false) => {
    let underAmt = BN(n);
    if (isNative === true) underAmt = BN(underConvertor.fromNative(n));
    const coinAmt = coinConvertor.toNative(underAmt.div(rate).toFixed());
    return coinAmt;
  };
  const coinToUnder = (n, isNative = true) => {
    let coinAmt = BN(coinConvertor.fromNative(n));
    if (isNative === false) coinAmt = BN(n);
    const underAmt = underConvertor.toNative(coinAmt.times(rate).toFixed());
    return underAmt;
  };

  return {
    underToCoin,
    coinToUnder,
  };
};

const Calculator = (sandbox) => {
  const cacheRates = {};
  const cacheDollarRates = {};
  // Utility Functions
  const { POOL: { places: decPool } } = coinInfo;
  const poolConvertor = Convertor(decPool);
  // Underlying
  const underList = sandbox.inst.coins.reduce((acc, wrapCoin) => {
    const { underlying } = coinInfo[wrapCoin];
    if (underlying === false) return acc.concat(wrapCoin); // USDT
    return acc.concat(underlying);
  }, []);

  const rateConvertors = underList.reduce((acc, underCoin) => {
    const { [underCoin]: { wrapped, places: decUnder } } = coinInfo;
    if (wrapped === false) {
      return Object.assign(
        acc,
        {
          [underCoin]: () => ({
            underToCoin: Convertor(decUnder).toNative,
            coinToUnder: (n) => n,
          }),
        },
      );
    }
    const { [wrapped]: { places: decCoin } } = coinInfo;
    const cvtr = underConvert(decUnder, decCoin);
    return { ...acc, [underCoin]: cvtr };
  }, {});
  // { DAI, USDC, USDT }
  const investUnderlying = (underlying) => {
    // Convert underlying to cTokens or not
    const coinAmts = underList.reduce((acc, underName) => {
      let underAmt = '0';
      const { wrapped: wrapCoin } = coinInfo[underName];
      const wrapKey = wrapCoin !== false ? wrapCoin : underName;
      if (typeof underlying[underName] === 'undefined') return { ...acc, [wrapKey]: underAmt };
      underAmt = underlying[underName];
      const cvtr = rateConvertors[underName];
      const coinAmt = cvtr(cacheRates[wrapKey]).underToCoin(underAmt);
      return { ...acc, [wrapKey]: coinAmt };
    }, {});
    console.log('coinAmts');
    console.log(coinAmts);
    const curveTokens = sandbox.addLiquidity([coinAmts.cDAI, coinAmts.cUSDC, coinAmts.USDT]);
    return curveTokens;
  };

  // Wrap Around Sandbox Methods
  const setToken = (tokenName, tokenData) => {
    //
    const { exchRateCurrent } = tokenData;
    cacheRates[tokenName] = exchRateCurrent;
    sandbox.setToken(tokenName, tokenData);
  };

  const setDollarRate = (underName, rate) => {
    cacheDollarRates[underName] = BN(String(rate));
  };

  const getBasketValue = (poolAmt, isNative = false) => {
    let redeemEvenAmt = poolAmt;
    if (isNative === false) redeemEvenAmt = poolConvertor.toNative(poolAmt);
    //
    const retBalances = sandbox.removeLiquidity(redeemEvenAmt);

    const underAmts = retBalances.reduce((acc, coinAmt, idx) => {
      const coinName = sandbox.inst.coins[idx];
      const { [coinName]: { underlying: underName } } = coinInfo;
      let underKey = underName;
      if (underName === false) underKey = coinName; // USDT
      // Convert to underlying coins
      const cvtr = rateConvertors[underKey];
      const underAmt = cvtr(cacheRates[coinName]).coinToUnder(coinAmt);
      return { ...acc, [underKey]: underAmt };
    }, {});

    const dollarValue = underList.reduce((acc, underName) => {
      const underValue = coinConvertors[underName].fromNative(underAmts[underName]);
      const dollarVal = BN(underValue).div(cacheDollarRates[underName]);
      return acc.plus(dollarVal);
    }, BN('0.0'));

    return dollarValue.toFixed(5);
  };

  const normDollar = (underName, dollarAmt) => {
    //
    const dollars = BN(dollarAmt);
    const underAmt = dollars.div(cacheDollarRates[underName]);
    return underAmt.toFixed();
  };
  // Normalized 100 PoolToken
  const normBasket = () => {
    const absCurveAmt = '100';
    const normAmt = BN('100');
    // What is the Dollar Value of 100 Curve Tokens
    const absBasketValue = BN(getBasketValue(absCurveAmt));
    console.log(`100 CURV = How many USD: ${absBasketValue.toFixed()}`);
    // Normalize against $100
    const normCurveAmt = normAmt.times(normAmt).div(absBasketValue);
    return normCurveAmt.toFixed(5);
  };
  // getBonus takes 'amt' from normalized $100 Pool Tokens returned
  // and gets the bonus from an ideal $100 Investment
  const getBonus = (amt, isNative = true) => {
    let poolAmt = BN(poolConvertor.fromNative(amt));
    if (isNative === false) poolAmt = BN(amt);
    console.log(`PoolAmt: ${poolAmt.toFixed(3)}`);
    const normPoolAmt = BN(normBasket()); // Non-Native
    console.log(`Normalized Basket: ${normPoolAmt.toFixed(5)}`);
    console.log('idealCTokens from normalized basket');
    const retBal = sandbox.removeLiquidity(poolConvertor.toNative(normPoolAmt));
    console.log(retBal);
    //
    const bonus = (poolAmt.div(normPoolAmt)).minus(BN('1.00'));
    return bonus.toFixed(5);
  };

  return {
    sandbox,
    investUnderlying,
    getBasketValue,
    setDollarRate,
    normDollar,
    normBasket,
    getBonus,
    // Wrap Around Sandbox
    setBlkNum: sandbox.setBlkNum,
    setBalances: sandbox.setBalances,
    setToken,
    setPoolSupply: sandbox.setPoolSupply,
  };
};

Calculator.fromCompound = () => {

};

Calculator.fromUSDT = () => {
  const A = '2000';
  const coins = ['cDAI', 'cUSDC', 'USDT'];
  const cstUseLending = [true, true, false];
  const cstPrecision = '1e18';
  const cstPrecisionLending = '1e18';
  const cstPrecisionMul = ['1', '1000000000000', '1000000000000'];
  const cstFee = '4e6';
  const cstFeeDenom = '1e10';

  const sandbox = Sandbox({
    A,
    coins,
    cstUseLending,
    cstPrecision,
    cstPrecisionLending,
    cstPrecisionMul,
    cstFee,
    cstFeeDenom,
  });

  return Calculator(sandbox);
};

export default Calculator;
