// import { firestoreAction } from 'vuexfire'
// import { db } from '@/main.js'

// const state = {
//   ownedPlaylists: [],
//   borrowedPlaylists: null
// };

// export default {
//   namespaced: true,
//   state,
//   actions: {
//     bindUserdata: firestoreAction(({ bindFirestoreRef }, payload) => {
//     console.log(payload)
//     //return bindFirestoreRef('ownedPlaylists', db.collection('userdata').doc(auth.currentUser.uid).collection('playlists'))  
//       if(payload.includeQuery) {
//       // return the promise returned by `bindFirestoreRef`
//       return bindFirestoreRef(payload.wheretoBind, db.collection(payload.path)
//       .where(payload.query[0], payload.query[1], payload.query[2]))
//       } else {
//         console.log('I am here')
//         console.log(payload.path)
//       // return the promise returned by `bindFirestoreRef`
//       return bindFirestoreRef('ownedPlaylists', db.collection(payload.path))
//     }
//   })
// }
// }


// queryDB() {    
//   this.$store.dispatch('firestore/bindUserdata', 
//   {
//     wheretoBind: 'userdata',
//     path: 'users/profiles/signin', 
//     includeQuery: false,
//     query: [this.message1, this.message2, this.message3]})
// }


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
      // return the promise returned by `bindFirestoreRef`
      // return bindFirestoreRef('userdata', db.collection(payload.path)
      return bindFirestoreRef(payload.whereTo, db.collection(payload.path)
      // .where(payload.query[0], payload.query[1], payload.query[2])
      )
    }),
  },  
};