import { firestoreAction } from 'vuexfire'
import { db } from '@/main.js'

const state = {
  userdata: []
};

export default {
  namespaced: true,
  state,
  actions: {
    bindUserdata: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('userdata', db.collection('users/profiles/signin'))
    }),
  },  
};
