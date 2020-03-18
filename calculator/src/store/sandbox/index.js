import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  // Constants
  cstA: '900',
  cstUseLending: [true, true],
  cstCoins: ['cDAI', 'cUSDC'],
  cstPrecision: '1e18',
  cstPrecisionLending: '1e19',
  cstPrecisionMul: ['1', '1000000000000'],
  cstFee: '4e6',
  cstFeeDenom: '1e10',
};

const mutations = {
  /*  eslint-disable-next-line */
  [types.SET_PARAMS](state, { cstFee, cstA }) {
    state.cstFee = cstFee;
    state.cstA = cstA;
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
};
