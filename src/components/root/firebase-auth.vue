
<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script>

import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import "firebaseui/dist/firebaseui.css"

import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { db, auth } from "@/main.js";
export default {
  name: 'auth',
  computed: {
    ...mapState('parameters', ['path', 'authenticated'])
  },
  methods: {
    ...mapMutations('parameters', ['SET_path', 'SET_authenticated'])
  },
  mounted() {
    var uiConfig = {
      signInFlow: 'popup',
      callbacks: {
            signInSuccessWithAuthResult: function(authResult) {
            if(authResult.additionalUserInfo.isNewUser) {
            var user = authResult.user
            db.collection('users').doc('profiles').collection('signin').doc(authResult.user.uid).set({
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
              emailVerified: user.emailVerified
            })
          }          
              return true;
            }
        },
      //signInSuccessUrl: this.path,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
      };
        //const auth = firebase.auth();        
        let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(auth);
    }
    ui.start('#firebaseui-auth-container', uiConfig);        
    }
}
</script>

<style lang="css">
#firebaseui-auth-container {
   background-color: #fefbd8;
}
</style>