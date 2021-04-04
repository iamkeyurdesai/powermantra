<template>
  <div>
    <!-- explore: Coming soon... -->
    <!-- <recognizeSpeech> </recognizeSpeech> -->

    <div v-if="!cl">
      <!-- I am in load playlist
      <span v-if="authenticated">
        {{myPlaylistLocal}}
      </span> -->
      <div class="text-center">
      <v-progress-circular
      indeterminate
      color="success"      
      v-if="!loaded"
    ></v-progress-circular>
      </div>

      <div v-if="loaded">
      <renderItem
        v-for="(item, i) in myPlaylistLocal.mantras"
        :key="i"
        :mantra="mantras[item - 1]"
        :mantra_id="item"
        :script="script"
      >
      </renderItem>
      </div>
      <!-- <renderList> </renderList> -->
    </div>

    <div v-if="cl">
      <chantingTimer></chantingTimer>
    </div>

    <v-fab-transition>
      <v-btn
        fab
        fixed
        bottom
        left
        small
        dark
        color="info darken-2"
        @click="goBack()"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn
        color="purple darken-3"
        fab
        dark
        small
        fixed
        bottom
        right
        @click="SET_value({ list: !cl, id: 'cl' })"
      >
        <v-icon v-if="!cl">mdi-account-voice</v-icon>
        <v-icon v-if="cl">mdi-book-open</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import renderItem from "@/components/explore/render-item";
import chantingTimer from "@/components/explore/chanting-timer";
import { mapState, mapMutations } from "vuex";
import { db, auth } from "@/main.js";
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  data() {
    return {
      myPlaylistLocal: null,
      loaded: false,
    };
  },
  components: {
    renderItem,
    chantingTimer,
  },
  mounted() {
    setTimeout(()=>{
      // this.$store.state.firestore.selfURL = false
    //check for pl in sharedlist
      //if success then return the playlist
      if (this.sharedPlaylists != null) {
        if (this.sharedPlaylists.length > 0) {
          let sharedTemp = this.sharedPlaylists.find((a) => a.tag == this.pl);
          if (sharedTemp !== undefined) {
            this.myPlaylistLocal = sharedTemp;
            this.loaded = true
            // console.log('I got it from sharedPlaylists')
          }
        }
      }

      if(!this.loaded) {

      //check for pl in owned lists
      //if success then return the playlist
      if (this.ownedPlaylists != null) {
        if (this.ownedPlaylists.length > 0) {
          let ownedTemp = this.ownedPlaylists.find((a) => a.tag == this.pl);
          if (ownedTemp !== undefined) {        
            this.myPlaylistLocal = ownedTemp;
            this.loaded = true
            // console.log('I got it from ownedPlaylists')
          }
        }
      }
      
      // console.log(this.mySharedList)

      if(!this.loaded) {
      //get pl once through the collectiongroup query
      //if success then
      db.collectionGroup("playlists")
        .where("tag", "==", this.pl)
        .get()
        .then((querySnapshot) => {

          querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        this.myPlaylistLocal = doc.data()
        // console.log('I got it from querySnapshot')
    });   
          if(this.myPlaylistLocal.tag == this.pl) {       
          if(this.mySharedList==null){
            //update mySharedlist
          db.collection("userdata")
            .doc(auth.currentUser.uid)
            .collection("track")
            .doc("mysharedlist")
            .set({
              tag: [this.pl],
            })
            .then(() => {
              //fire a new collectiongroup query to sync sharedPlaylists
              // console.log(this.mySharedList + " add")
              this.bindToFirestoreSharedAuth("sharedPlaylists");              
              this.loaded = true
            });
          } else {
            //update mySharedlist
          db.collection("userdata")
            .doc(auth.currentUser.uid)
            .collection("track")
            .doc("mysharedlist")
            .update({
              tag: firebase.firestore.FieldValue.arrayUnion(this.pl),
            })
            .then(() => {
              //fire a new collectiongroup query to sync sharedPlaylists
              // console.log(this.mySharedList +  " update")
              this.bindToFirestoreSharedAuth("sharedPlaylists");              
              this.loaded = true
            });
          }       
          }
          //return the pl obtained through the first collection group query
          //return querySnapshot[0].data();                    
        });
      }      
      //default return as a filler / should be made more informative 
      //return { mantras: [1] };  
      }
      }, 
      this.$store.state.firestore.selfURL ? 10 : 3500)            
  },
  computed: {
    ...mapState("parameters", ["pl", "authenticated", "cl", "script"]),
    ...mapState("firestore", ["sharedPlaylists", "ownedPlaylists", "mySharedList"]),
    ...mapState("coretext", ["mantras"]),    
  },
  methods: {
    ...mapMutations("parameters", ["SET_value"]),
    goBack() {
      this.$router.push("/Library");
    },

// myPlaylist() {
  //  },
    //this needs to be handled differently from the unauthenticated case
    bindToFirestoreSharedAuth(value) {
      // if (this[value] == null) {
        if (this.mySharedList != null) {
          if (this.mySharedList.tag.length > 0) {
            // console.log("I am in bindToFireStore " + value);
            this.$store.dispatch("firestore/bindUserdata", {
              path: "playlists",
              type: "collectionGroup",
              query: ["tag", "in", this.mySharedList.tag],
              whereToBind: value,
            });
            // console.log('I will bind'+this.mySharedList.tag)
          } else {
            console.log(value + " nothing to bind yet");
          }
        } else {
          console.log(value + " mySharedList not bound yet");
        }      
        // console.log(value + " already bound");
      }
    }
};
</script>

 <style lang="scss" scoped>
.v-btn--fixed.v-btn--bottom {
  bottom: 70px;
}
.v-btn--fixed.v-btn--right {
  right: 16px;
}
.v-btn--fixed.v-btn--left {
  left: 16px;
}
</style>