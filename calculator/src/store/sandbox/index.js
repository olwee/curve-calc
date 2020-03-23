import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  // Constants
  dollarAmt: '1000',
  dollarDAI: '1.00',
  dollarUSDC: '1.00',
  dollarUSDT: '1.00',
};

const mutations = {
  /*  eslint-disable-next-line */
  [types.SET_PARAMS](state, {
    dollarAmt,
    dollarDAI,
    dollarUSDC,
    dollarUSDT,
  }) {
    state.dollarAmt = dollarAmt;
    state.dollarDAI = dollarDAI;
    state.dollarUSDC = dollarUSDC;
    state.dollarUSDT = dollarUSDT;
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
};
