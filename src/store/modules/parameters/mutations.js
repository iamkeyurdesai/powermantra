const SET_mainItem = (state, input) => {  
  state.mainItem = input
};
const SET_authenticated = (state, input) => {
  state.authenticated = input
};
const SET_photoURL = (state, input) => {
  state.photoURL = input
};
const SET_userName = (state, input) => {
  state.userName = input
};
const SET_path = (state, input) => {
  state.path = input
};
const SET_themeDark = (state, input) => {
  state.themeDark = input
};
const SET_script = (state, input) => {
  state.script = input
};
const SET_userClaims = (state, input) => {
  state.userClaims = input
};
function SET_value(state, { list, id }) {
  if (id == 'chapter' || id == 'verse') {
    state[id] = parseInt(list);
  } else if (id == 'breakSandhi') {
    state[id] = (list == 'true');
  } else {
    state[id] = list;
  }
}
const SET_searchSelect = (state, input) => {
  state.searchSelect = input
}


export default {
  SET_mainItem,
  SET_authenticated,
  SET_photoURL,
  SET_userName,
  SET_path,
  SET_themeDark,
  SET_script,
  SET_userClaims,
  SET_value,
  SET_searchSelect,
};
