const setText = (state, { list, id }) => {
state[id] = list;
}
const SET_indexMantras = (state, input) => {
  state.indexMantras = input
}
export default {
  setText,
  SET_indexMantras
}
