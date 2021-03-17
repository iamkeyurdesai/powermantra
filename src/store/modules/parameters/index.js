import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {  
  authenticated: false,
  photoURL: 'not singed in',
  userName: '',
  path: '/explore',
  userClaims: {},
  mainItem: 'explore',
  themeDark: false,
  language: 'english',
  script: 'iast',
  fsize: 'medium',
  fabShow: true,
  isDeveloper: false,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
