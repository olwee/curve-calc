import BN from 'bignumber.js';
import Sandbox from '@/lib/sandbox';
import { Convertor } from '@/lib/utils';

const coinInfo = {
  DAI: { places: 18, wrapped: 'cDAI' },
  USDC: { places: 6, wrapped: 'cUSDC' },
  cDAI: { places: 8, underlying: 'DAI' },
  cUSDC: { places: 8, underlying: 'USDC' },
  USDT: { places: 6, underlying: false, wrapped: false },
};

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

  return {
    underToCoin,
  };
};

const Calculator = (sandbox) => {
  const cacheRates = {};
  // Underlying
  const underList = sandbox.inst.coins.reduce((acc, wrapCoin) => {
    const { underlying } = coinInfo[wrapCoin];
    if (underlying === false) return acc.concat(wrapCoin); // USDT
    return acc.concat(underlying);
  }, []);

  const underConvertors = underList.reduce((acc, underCoin) => {
    const { [underCoin]: { wrapped, places: decUnder } } = coinInfo;
    if (wrapped === false) {
      return Object.assign(
        acc,
        { [underCoin]: () => ({ underToCoin: Convertor(decUnder).toNative }) },
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
      const cvtr = underConvertors[underName];
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

  return {
    sandbox,
    investUnderlying,
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
