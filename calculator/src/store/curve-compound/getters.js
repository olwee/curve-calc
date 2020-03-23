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
    },
    totalSupplyRaw: poolSupply,
  } = curveCache;

  const calc = Calculator.fromCompound();

  calc.setBlkNum(String(blockHeight));

  calc.setBalances([
    balanceCDAI,
    balanceCUSDC,
  ]);

  calc.setToken('cDAI', cacheCDAI);
  calc.setToken('cUSDC', cacheCUSDC);

  calc.setPoolSupply(poolSupply);
  //
  calc.setDollarRate('DAI', dollarDAI);
  calc.setDollarRate('USDC', dollarUSDC);

  return calc;
};

export {
  curve,
  cache,
  calculator,
};
