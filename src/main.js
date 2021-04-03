import Vue from 'vue'
import App from '@/components/root/App'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import router from './router'
import {store} from './store/index.js'
import AudioVisual from 'vue-audio-visual'
import VueYoutube from 'vue-youtube'
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueYoutube)
Vue.use(AudioVisual)
Vue.use(VueSocialSharing)

Vue.config.productionTip = false
Vue.config.performance = true


// set up global routing
router.beforeEach((to, from, next) => {
  // set default parameters which will load 
  // the root paths (/library, /explore, /history)
  // if the pushed link has additional parameters they 
  // will be picked and the desired path will be loaded  
  // let pathTag = [
  //   {path: 'Library', data: 'pl'}, 
  //   // {path: 'Explore', data: 'mn'}, 
  // ]
  let pathTag = store.state.settings.pathTag
  for (let index = 0; index < pathTag.length; index++) {
    if(to.path.includes(pathTag[index].path) && !to.path.includes(pathTag[index].data + '=')) {          
      store.commit('parameters/SET_value', {
        list: null,
        id: pathTag[index].data
      })
    }
  }  
  //made a loop out of this above
  // if(to.path.includes('Library') && !to.path.includes("pl=")) {   
  //   store.commit('parameters/SET_value', {
  //     list: null,
  //     id: "pl"
  //   })
  // }

  if (to.path !== "/") {
    let mypath = to.path.split("/");
    if (mypath[1] != null) store.state.parameters.mainItem = mypath[1];
   if (to.params.data != null) {
      
        let myquery = to.params.data.split("&");
        let i;
        for (i = 0; i < myquery.length; i++) {
          let temp = myquery[i].split("=")
          store.commit('parameters/SET_value', {
            list: temp[1],
            id: temp[0]
          })
        }      
    }
  } else {
    store.state.parameters.mainItem = "Explore"
  } 
  next()
})

// import additional library
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {config} from './helpers/firebaseConfig'
// import { firestorePlugin, rtdbPlugin } from 'vuefire'
// Vue.use(firestorePlugin)
// Vue.use(rtdbPlugin)

// import VueAnalytics from 'vue-analytics'
// Vue.use(VueAnalytics, {
//   id: 'UA-141658397-1',
//   router
// })

const myApp = firebase.initializeApp(config)

export const db = myApp.firestore()
// export const rtdb = myApp.database()
export const auth = myApp.auth()


/* eslint-disable no-new */
//var vm = new Vue({
//   new Vue({
//   vuetify,
//   //el: '#app',
//   router,
//   //store,
//   // created() {
//   //   // var realtimeDB = myApp.database()
//   //   if (location.hostname === "localhost" & false) {

//   //     // Note that the Firebase Web SDK must connect to the WebChannel port
//   //     db.settings({
//   //       host: "localhost:5002",
//   //       ssl: false
//   //     });
//   //     db.enablePersistence({synchronizeTabs:true}).then(()=>{console.log("offline persistence enabled!")})
//   //     db.doc('aggregates/available_groups').set({
//   //       groups: []
//   //     })
//   //     var firebaseConfig = {
//   //       // Point to the RTDB emulator running on localhost.
//   //       // In almost all cases the ns (namespace) is your project ID.
//   //       databaseURL: "http://localhost:9000?ns=gitawebapp"
//   //     }
//   //     myApp.options.databaseURL =  firebaseConfig.databaseURL
//   //   } else {
//   //     db.enablePersistence({synchronizeTabs:true}).then(()=>{console.log("offline persistence enabled!")})
//   //   }
//   //   // this.$store.dispatch('settings/loadText')
//   //   // this.$store.dispatch('coretext/loadText');
//   //   // this.$store.dispatch('audiolabels/loadText');
//   // },
//   mounted() {
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.addEventListener('controllerchange', () => {
//         // This fires when the service worker controlling this page
//         // changes, eg a new worker has skipped waiting and become
//         // the new active worker.
//         window.location.reload();
//       });
//     }
//   },
//   components: {
//     App
//   },
//   template: '<App/>'
// }).$mount('#app')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {    
    db.enablePersistence({synchronizeTabs:true}).then(()=>{
      // console.log("offline persistence enabled!")
    })
    this.$store.dispatch('coretext/loadText')    
    //this.$store.dispatch('firestore/bindUserdata')
  }
}).$mount('#app')






