import Vue from 'vue';
import Vuex from 'vuex';
import parametersModule from './modules/parameters';
import settingsModule from './modules/settings';
import coretextModule from './modules/coretext';
import firestoreModule from './modules/firestore';
import createPersistedState from 'vuex-persistedstate'
import { vuexfireMutations} from 'vuexfire'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
  },
  mutations: vuexfireMutations,
  modules: {
    parameters: parametersModule,
    settings: settingsModule,
    coretext: coretextModule,
    firestore: firestoreModule,    
  },
  plugins: [createPersistedState({
    paths: ['parameters']
  })],  
});
