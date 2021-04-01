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
  ce: false, //chanting on for explore
  cl: false, //chanting on for library
  pl: null, //pl is passed through url for the library
  plUnauth: null, //for unauthenticated scenario store a temparory pl that can be reused
  mn: null, //mantra number in an encoded string format, name.subset$mantra_id$verse_id, 
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
