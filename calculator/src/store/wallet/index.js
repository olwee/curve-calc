import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  web3: 'NOT_SET',
  networkName: '',
  blockHeight: 0,
  accountAddress: '',
};

const mutations = {
  /*  eslint-disable-next-line */
  [types.SET_WEB3_PROVIDER](state, web3Provider) {
    state.web3 = web3Provider;
  },
  /*  eslint-disable-next-line */
  [types.SET_NETWORK_NAME](state, networkName) {
    state.networkName = networkName;
  },
  /*  eslint-disable-next-line */
  [types.SET_BLOCK_HEIGHT](state, blockHeight) {
    state.blockHeight = blockHeight;
  },
  /*  eslint-disable-next-line */
  [types.SET_ACCOUNT_ADDRESS](state, accountAddress) {
    state.accountAddress = accountAddress;
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
};
