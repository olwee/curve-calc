import * as types from './mutation-types';

const updateParams = async ({ commit }, { cstA, cstFee }) => {
  commit(types.SET_PARAMS, { cstA, cstFee });
};

export {
// eslint-disable-next-line import/prefer-default-export
  updateParams,
};
