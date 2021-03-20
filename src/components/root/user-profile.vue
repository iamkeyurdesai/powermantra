
<template>
<div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon  
          dark 
          v-on="on"
          v-bind="attrs"          
        >
          <v-avatar size="32px">
              <img
                :src="photoURL"
                alt="Error Loading"
              >
            </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in myLoginMenu"
          :key="index"
          @click="logOut()"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
data () {
  return {
    myLoginMenu: [
     { title: 'History' },
     { title: 'Account' },
     { title: 'Profile' },
     { title: 'Signout' }]
  }
},
computed: {
  ...mapState('parameters', ['authenticated', 'photoURL']),
},
methods: {
  ...mapMutations('parameters', ['SET_authenticated', 'SET_photoURL', 'SET_userClaims']),
  logOut() {
    firebase.auth().signOut();
    this.SET_authenticated(false);
    this.SET_photoURL('not signed in');
    this.SET_userClaims({})
  }
},
  mounted() {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.SET_photoURL(user.photoURL);
     }
   });
 }
}
</script>

<style scoped>
</style>
