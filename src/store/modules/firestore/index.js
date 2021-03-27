import { firestoreAction } from 'vuexfire'
import { db } from '@/main.js'

const state = {
  // userdata: [],
  ownedPlaylists: [],
};

export default {
  namespaced: true,
  state,
  actions: {
    bindUserdata: firestoreAction(({ bindFirestoreRef }, payload) => {
      if(payload.includeQuery) {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef(payload.wheretoBind, db.collection(payload.path)
        .where(payload.query[0], payload.query[1], payload.query[2]))
        } else {        
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('ownedPlaylists', db.collection(payload.path))
      }
    })
    },
  }  



// queryDB() {    
//   this.$store.dispatch('firestore/bindUserdata', 
//   {
//     wheretoBind: 'userdata',
//     path: 'users/profiles/signin', 
//     includeQuery: false,
//     query: [this.message1, this.message2, this.message3]})
// }

