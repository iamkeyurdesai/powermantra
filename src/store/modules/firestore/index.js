import { firestoreAction } from 'vuexfire'
import { db } from '@/main.js'

const state = {
  userdata: [],
};

export default {
  namespaced: true,
  state,
  actions: {
    bindUserdata: firestoreAction(({ bindFirestoreRef }, payload) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('userdata', db.collection(payload.path)
      .where(payload.query[0], payload.query[1], payload.query[2]))
    }),
  },  
};
