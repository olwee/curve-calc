import BN from 'bignumber.js';

const ZERO = BN('0.0');
const ONE = BN('1.0');

const SandBox = ({
  A,
  coins,
  cstUseLending,
  cstPrecision,
  cstPrecisionLending,
  cstPrecisionMul,
  cstFee,
  cstFeeDenom,
}) => {
  const inst = {
    blkNum: '0',
    A,
    coins,
    cstUseLending, // e.g [true, true, false]
    cstPrecision: BN(`${cstPrecision}`),
    cstPrecisionLending: BN(`${cstPrecisionLending}`),
    cstPrecisionMul: [],
    // cstFeeDenom: BN('1e10'),
    cstFee: BN(`${cstFee}`),
    cstFeeDenom: BN(`${cstFeeDenom}`),
    balances: ['0', '0'],
    poolSupply: '0',
    // fee: BN('4000000'),
  };
  const coinSize = new BN(coins.length);
  const coinSizeSub = new BN(coins.length - 1);

  const fee = inst.cstFee.times(coinSize).idiv(coinSizeSub.times(BN('4.0')));

  const tokens = {};

  const fcopy = (n) => new BN(n.toFixed());

  // Internal
  const getD = (XP) => {
    const coinSizeSafe = new BN(coins.length + 1);

    let S = ZERO;
    XP.forEach((xp) => {
      S = S.plus(xp);
    });
    let prevD = ZERO;
    // JS is pass by reference
    let D = fcopy(S);
    const ann = BN(inst.A).times(coinSize);
    const annSub = ann.minus(ONE);

    let i = 0;

    while (i < 255) {
      let loopD = fcopy(D);
      /* eslint-disable-next-line no-loop-func */
      XP.forEach((xp) => {
        const c1 = loopD.times(D);
        const c2 = xp.times(coinSize);
        const c3 = c2.plus(ONE);
        loopD = c1.idiv(c3);
      });
      prevD = fcopy(D);
      const d1 = ann.times(S);
      const d2 = loopD.times(coinSize);
      const d3 = d1.plus(d2);
      const d4 = d3.times(D);

      const d5 = annSub.times(D);
      const d6 = coinSizeSafe.times(loopD);
      const d7 = d5.plus(d6);

      D = d4.idiv(d7);

      if (D.isGreaterThan(prevD)) {
        //
        if (D.minus(prevD).isLessThanOrEqualTo(ONE)) {
          break;
        }
      } else {
        /* eslint-disable-next-line no-lonely-if */
        if (prevD.minus(D).isLessThanOrEqualTo(ONE)) {
          break;
        }
      }
      i += 1;
    }
    return D;
  };
  const getXP = (rates) => {
    const result = rates.map((r, idx) => r
      .times(inst.balances[idx])
      .idiv(cstPrecision));
    return result;
  };
  const getXPMem = (rates, balances) => {
    const result = rates.map((r, idx) => r
      .times(balances[idx])
      .idiv(cstPrecision));
    return result;
  };

  const getDMem = (rates, balances) => getD(getXPMem(rates, balances));

  const getStoredRates = () => {
    const result = cstPrecisionMul.map((x) => BN(x));
    let i = 0;
    while (i < coins.length) {
      const useLending = inst.cstUseLending[i];
      // Default for No Lending
      let rate = inst.cstPrecisionLending;
      if (useLending === true) {
        rate = tokens[coins[i]].exchRateStored;
        const supplyRate = tokens[coins[i]].supplyRatePerBlk;
        const blkNumOld = tokens[coins[i]].accrBlkNum;
        const rateAdd = rate
          .times(supplyRate)
          .times(inst.blkNum.minus(blkNumOld))
          .idiv(cstPrecisionLending);
        // console.log(`raw: ${rateAdd.toFixed()} int: ${rateAdd.integerValue().toFixed()}`);
        // rate = rate.plus(rateAdd);
        rate = rate.plus(rateAdd);
      }
      result[i] = result[i].times(rate);
      i += 1;
    }
    return result;
  };

  const getCurrentRates = () => {
    const result = cstPrecisionMul.map((x) => BN(x));
    let i = 0;
    while (i < coins.length) {
      const useLending = inst.cstUseLending[i];
      // Default for No Lending
      let rate = inst.cstPrecisionLending;
      if (useLending === true) {
        rate = tokens[coins[i]].exchRateCurrent;
      }
      result[i] = result[i].times(rate);
      i += 1;
    }
    return result;
  };
  // External

  const getVirtD = () => {
    const rates = getCurrentRates();
    const currentBalances = inst.balances.map((b) => fcopy(b));
    const D = getDMem(rates, currentBalances);
    return D;
  };

  const getVirtPx = () => {
    const storedRates = getStoredRates();
    const xp = getXP(storedRates);
    const D = getD(xp);
    const rawVirtPx = D.times(cstPrecision).idiv(inst.poolSupply);
    return rawVirtPx.toFixed();
  };

  const calcTokenAmt = (amts, deposit) => {
    const rates = getStoredRates();
    // Clone Value
    const currentBalances = inst.balances.map((b) => fcopy(b));
    const D0 = getDMem(rates, currentBalances);
    const newBalances = currentBalances.map((b, idx) => {
      const diffAmt = BN(amts[idx]);
      if (deposit === true) return b.plus(diffAmt);
      return b.minus(diffAmt);
    });
    const D1 = getDMem(rates, newBalances);
    let dDiff = D1.minus(D0);
    if (deposit === false) dDiff = D0.minus(D1);
    return dDiff.times(inst.poolSupply).idiv(D0).toFixed();
  };

  const addLiquidity = (amts) => {
    const rates = getCurrentRates();
    const currentBalances = inst.balances.map((b) => fcopy(b));
    const D0 = getDMem(rates, currentBalances);

    const newBalances = currentBalances.map((b, idx) => {
      const diffAmt = BN(amts[idx]);
      return b.plus(diffAmt);
    });

    const D1 = getDMem(rates, newBalances);
    let D2 = fcopy(D1);
    // Calculate Fees
    const finalBalances = [];

    newBalances.forEach((nb, idx) => {
      const ib = D1.times(currentBalances[idx]).idiv(D0);
      let balDiff = ib.minus(nb);
      if (ib.isLessThanOrEqualTo(nb)) balDiff = nb.minus(ib);
      const penaltyFee = fee.times(balDiff).idiv(inst.cstFeeDenom);
      finalBalances[idx] = newBalances[idx].minus(penaltyFee);
    });

    D2 = getDMem(rates, finalBalances);

    const mintAmt = inst.poolSupply.times(D2.minus(D0)).idiv(D0);

    return mintAmt.toFixed();
  };

  const removeLiquidity = (amt) => {
    const share = BN(amt).div(inst.poolSupply);
    const recvCoins = inst.balances.map((b) => b.times(share).integerValue().toFixed());
    return recvCoins;
  };

  const removeLiquidityImbalance = (amts) => {
    const rates = getCurrentRates();
    const currentBalances = inst.balances.map((b) => fcopy(b));
    const D0 = getDMem(rates, currentBalances);

    const newBalances = currentBalances.map((b, idx) => {
      const diffAmt = BN(amts[idx]);
      return b.minus(diffAmt);
    });
    const D1 = getDMem(rates, newBalances);
    let D2 = fcopy(D1);
    const finalBalances = [];
    newBalances.forEach((nb, idx) => {
      const ib = D1.times(currentBalances[idx]).idiv(D0);
      let balDiff = ib.minus(nb);
      if (ib.isLessThanOrEqualTo(nb)) balDiff = nb.minus(ib);
      const penaltyFee = fee.times(balDiff).idiv(inst.cstFeeDenom);
      finalBalances[idx] = newBalances[idx].minus(penaltyFee);
    });
    D2 = getDMem(rates, finalBalances);

    const deltaD1 = D0.minus(D2);
    const deltaD2 = deltaD1.div(D0);

    const burnAmt = inst.poolSupply.times(deltaD2).integerValue();
    return burnAmt.toFixed();
  };

  // Setters
  const setToken = (name, {
    exchRateCurrent,
    exchRateStored,
    accrBlkNum,
    supplyRatePerBlk,
  }) => {
    tokens[name] = {
      exchRateCurrent: BN(exchRateCurrent),
      exchRateStored: BN(exchRateStored),
      accrBlkNum: BN(accrBlkNum),
      supplyRatePerBlk: BN(supplyRatePerBlk),
    };
  };
  const setBalances = (balances) => {
    inst.balances = balances.map((b) => BN(b));
  };

  const setPoolSupply = (supply) => {
    inst.poolSupply = BN(supply);
  };

  const setBlkNum = (blkNum) => {
    inst.blkNum = BN(blkNum);
  };

  return {
    addLiquidity,
    removeLiquidity,
    removeLiquidityImbalance,
    calcTokenAmt,
    getVirtPx,
    getVirtD,
    // getCurrentRates,
    // Setters,
    setBlkNum,
    setToken,
    setBalances,
    setPoolSupply,
    // base,
    inst,
  };
};

export default SandBox;
