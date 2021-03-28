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
  searchSelect: [{mantra_id:3, verse_id:0},
    {mantra_id:4, verse_id:0},
    {mantra_id:5, verse_id:0}],
  chantingON: false,
  pl: null
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
