import Vue from 'vue';
import Vuex from 'vuex';

import wallet from './wallet';
import compound from './compound';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    wallet,
    compound,
  },
});
