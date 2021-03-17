import Vue from 'vue';
import Vuex from 'vuex';
import parametersModule from './modules/parameters';
import settingsModule from './modules/settings';
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    parameters: parametersModule,
    settings: settingsModule
  },
  plugins: [createPersistedState({
    paths: ['parameters']
  })]
});
