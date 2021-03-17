import Vue from 'vue'
import Router from 'vue-router'
//import goTo from 'vuetify/lib/components/Vuetify/util/goTo'

import history from '@/components/history/history'
import library from '@/components/library/library'
import explore from '@/components/explore/explore'

//import {store} from '../store/index.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'root', component: explore },
    { path: '/history/:data?', name: 'history', component: history },
    { path: '/library/:data?', name: 'library', component: library },
    { path: '/explore/:data?', name: 'explore', component: explore },    
  ]
})
