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

  const normDollar = (underName, dollarAmt) => {
    const dollars = BN(dollarAmt);
    const underAmt = dollars.div(cacheDollarRates[underName]);
    return underAmt.toFixed();
  };

  // Normalized 100 PoolToken

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

  const fromDollar = (underName, underValue) => BN(underValue).div(cacheDollarRates[underName]);
  const toDollar = (underName, underValue) => BN(underValue).times(cacheDollarRates[underName]);

  const normBasket = (dollarAmt) => {
    const absCurveAmt = '100';
    const normAmt = BN(dollarAmt);
    // What is the Dollar Value of 100 Curve Tokens
    const absBasketValue = BN(getBasketValue(absCurveAmt));
    // Normalize against $100
    const normCurveAmt = normAmt.times(normAmt).div(absBasketValue);
    return normCurveAmt.toFixed(5);
  };
  // getBonus takes 'amt' from normalized $100 Pool Tokens returned
  // and gets the bonus from an ideal $100 Investment
  const getInvestBonus = (dollarAmt, poolAmtRaw, isNative = true) => {
    let poolAmt = BN(poolConvertor.fromNative(poolAmtRaw));
    if (isNative === false) poolAmt = BN(poolAmtRaw);
    const normPoolAmt = BN(normBasket(dollarAmt)); // Non-Native
    const bonus = (poolAmt.div(normPoolAmt)).minus(BN('1.00'));
    return bonus.toFixed(5);
  };
  // Redeem Bonus means, how much dollar value we got from burning POOL unevenly
  // Over burning POOL evenly
  const getRedeemBonus = (dollarAmt, poolAmtRaw, isNative = true) => {
    let poolAmt = BN(poolConvertor.fromNative(poolAmtRaw));
    if (isNative === false) poolAmt = BN(poolAmtRaw);
    const normDollarAmt = BN(getBasketValue(poolAmt, false));
    const bonus = (dollarAmt.div(normDollarAmt)).minus(BN('1.00'));
    return bonus.toFixed(5);
  };

  // Invest Underlying Coins
  // { cDAI: { value: '100', norm: false | true } }
  const investUnderlying = (underlying) => {
    let dollarVal = BN('0.0');
    // Convert underlying to cTokens or not
    const coinAmts = underList.reduce((acc, underName) => {
      let underAmt = '0';
      const { wrapped: wrapCoin } = coinInfo[underName];
      const wrapKey = wrapCoin !== false ? wrapCoin : underName;
      if (typeof underlying[underName] === 'undefined') return { ...acc, [wrapKey]: underAmt };
      const { value: underValue, norm } = underlying[underName];
      // Convert and Add to Dollar Val
      underAmt = normDollar(underName, underValue);
      let dollarValAmt = BN(underValue);
      if (norm === false) {
        underAmt = underValue;
        dollarValAmt = fromDollar(underName, underValue);
      }
      console.log('underAmt');
      console.log(underAmt);
      // Add to Total Dollar Investment
      dollarVal = dollarVal.plus(dollarValAmt);
      const cvtr = rateConvertors[underName];
      const coinAmt = cvtr(cacheRates[wrapKey]).underToCoin(underAmt);
      return { ...acc, [wrapKey]: coinAmt };
    }, {});
    // Pool Tokens Returned
    const poolTokens = sandbox.addLiquidity([coinAmts.cDAI, coinAmts.cUSDC, coinAmts.USDT]);
    // Get Dollar Value
    const basketVal = getBasketValue(poolTokens, true);
    // Get Bonus
    const bonus = getInvestBonus(dollarVal, poolTokens);
    return { pool: poolTokens, dollars: basketVal, bonus };
  };

  const increments = [4, 2, 1];
  const incrOffsets = increments.map((it) => {
    const thPct = 1000 + it;
    const pct = BN(String(thPct)).div(BN('1000'));
    return pct;
  });

  const clone = (x) => JSON.parse(JSON.stringify(x));

  const redeemEstimator = (retBalances, coinIdx, maxBurnAmt) => {
    const maxAmt = BN(maxBurnAmt);
    let currentAmt = BN(retBalances[coinIdx]);
    const redeemAmts = ['0', '0', '0'];
    redeemAmts[coinIdx] = currentAmt;
    let currentBurnAmt = sandbox.removeLiquidityImbalance(redeemAmts);
    let tierPct = 0;

    while (tierPct < increments.length) {
      const pctOffset = incrOffsets[tierPct];
      let loopAmt = BN(clone(currentAmt));
      let loopBurnAmt = BN(clone(currentBurnAmt));

      while (loopBurnAmt.lt(maxAmt)) {
        const loopAmtNew = loopAmt.times(pctOffset).integerValue();
        redeemAmts[coinIdx] = loopAmtNew;
        const loopBurnAmtNew = BN(sandbox.removeLiquidityImbalance(redeemAmts));
        const hitBurnLimit = loopBurnAmtNew.gte(maxAmt);
        if (hitBurnLimit === true) break;
        loopAmt = loopAmtNew;
        loopBurnAmt = loopBurnAmtNew;
      }
      currentAmt = clone(loopAmt.toFixed());
      currentBurnAmt = clone(loopBurnAmt.toFixed());
      tierPct += 1;
    }
    const efficiency = BN(currentBurnAmt).div(maxAmt).toFixed(5);
    return { wrapValue: currentAmt, poolBurnt: currentBurnAmt, eff: efficiency };
  };

  const redeemUnderlying = (underName, poolAmtRaw, isNative = true) => {
    let poolAmt = poolAmtRaw;
    if (isNative === false) poolAmt = poolConvertor.toNative(poolAmtRaw);
    // Get the Base Amount of cTokens returned
    const retBalances = sandbox.removeLiquidity(poolAmt);
    const { wrapped: wrapCoin } = coinInfo[underName];
    let wrapKey = wrapCoin;
    if (wrapCoin === false) wrapKey = underName;
    const coinIdx = sandbox.inst.coins.indexOf(wrapKey);
    const { wrapValue, poolBurnt, eff } = redeemEstimator(retBalances, coinIdx, poolAmt);
    const cvtr = rateConvertors[underName];
    const coinAmt = cvtr(cacheRates[wrapKey]).coinToUnder(wrapValue);
    const dollars = toDollar(underName, coinConvertors[underName].fromNative(coinAmt));
    const bonus = getRedeemBonus(dollars, poolBurnt);

    return {
      burnt: poolBurnt,
      burnEff: eff,
      coins: wrapValue,
      underlying: coinAmt,
      dollars,
      bonus,
    };
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

  return {
    sandbox,
    investUnderlying,
    redeemUnderlying,
    getBasketValue,
    setDollarRate,
    normDollar,
    normBasket,
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
