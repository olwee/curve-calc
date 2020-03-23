import Calculator from '@/lib/calculator';

const curve = (state) => state.curveInst;
const cache = (state) => state.curveCache;

const calculator = (state, getters, rootState) => {
  //
  const {
    curveCache,
  } = state;
  const {
    wallet: { blockHeight },
    compound: {
      tokenCache: {
        cDAI: cacheCDAI,
        cUSDC: cacheCUSDC,
      },
    },
    sandbox: {
      dollarDAI,
      dollarUSDC,
      dollarUSDT,
    },
  } = rootState;
  const isCurveSet = curveCache === 'NOT_SET';
  const isCompoundDAISet = cacheCDAI === 'NOT_SET';
  const isCompoundUSDCSet = cacheCUSDC === 'NOT_SET';

  if (isCurveSet || isCompoundDAISet || isCompoundUSDCSet) return 'NOT_SET';

  const {
    balancesRaw: {
      cDAI: balanceCDAI,
      cUSDC: balanceCUSDC,
      USDT: balanceUSDT,
    },
    totalSupplyRaw: poolSupply,
  } = curveCache;

  const calc = Calculator.fromUSDT();

  calc.setBlkNum(String(blockHeight));

  calc.setBalances([
    balanceCDAI,
    balanceCUSDC,
    balanceUSDT,
  ]);

  calc.setToken('cDAI', cacheCDAI);
  calc.setToken('cUSDC', cacheCUSDC);

  calc.setPoolSupply(poolSupply);
  //
  calc.setDollarRate('DAI', dollarDAI);
  calc.setDollarRate('USDC', dollarUSDC);
  calc.setDollarRate('USDT', dollarUSDT);

  return calc;
};

export {
  curve,
  cache,
  calculator,
};
