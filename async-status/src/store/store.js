// Core
import Vue from 'vue';
import Vuex from 'vuex';

import asyncStatusFactory from './modules/async-status';

Vue.use(Vuex);

const asyncStatus = asyncStatusFactory({
  flags: [
    'test',
  ],
  getterPrefix: 'get',
  stateSuffix: 'Status',
});

// General state.
const store = new Vuex.Store({
  state: {},
  actions: {},
  getters: {},
  mutations: {},
  modules: {
    asyncStatus,
  },
});

export default store;
