const dollarRates = (state) => ({
  DAI: state.dollarDAI,
  USDC: state.dollarUSDC,
  USDT: state.dollarUSDT,
});

const dollarAmt = (state) => state.dollarAmt;
// eslint-disable-next-line import/prefer-default-export
export { dollarRates, dollarAmt };
