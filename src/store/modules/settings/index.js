import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { options } from '../../../helpers/settingsOptions'
import { menu } from '../../../helpers/menuItems'

const state = {
  options: options,
  menu: menu,
  pathTag: [
    { path: 'Library', data: 'pl' }, 
    {path: 'Explore', data: 'mn'} 
  ]
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
