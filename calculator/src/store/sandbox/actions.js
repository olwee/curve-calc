import * as types from './mutation-types';

const updateParams = async ({ commit }, {
  dollarAmt,
  dollarDAI,
  dollarUSDC,
  dollarUSDT,
}) => {
  commit(types.SET_PARAMS, {
    dollarAmt,
    dollarDAI,
    dollarUSDC,
    dollarUSDT,
  });
};

export {
// eslint-disable-next-line import/prefer-default-export
  updateParams,
};
