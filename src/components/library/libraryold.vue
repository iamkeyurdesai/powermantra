<template>
  <div>    
      
    <renderPlaylists v-if="pl==null"> </renderPlaylists>
    <loadPlaylist v-if="pl!=null & authenticated"> </loadPlaylist>    
    <loadPlaylistUnauth v-if="pl!=null & !authenticated"> </loadPlaylistUnauth>    
  
  </div>
</template>

<script>
import renderPlaylists from "./render-playlists";
import loadPlaylist from "./load-playlist";
import loadPlaylistUnauth from "./load-playlist-unauth";
import { auth } from "@/main.js";
import { mapState, mapMutations } from "vuex";


export default {
  data() {
    return {};
  },
  components: {    
    renderPlaylists,
    loadPlaylist,
    loadPlaylistUnauth,        
  },
  mounted() {    
        
    if(this.authenticated) {
    //bind owned playlists
    setTimeout(() => {
      this.bindToFirestoreOwned("ownedPlaylists");
    }, 1000);
    //bind shared playlists
setTimeout(() => {
      this.bindToFirestoreSharedAuth("sharedPlaylists");
    }, 1000);
    } else {
      console.log(this.plUnauth)
      if(this.plUnauth!=null) {
            //bind shared playlists
setTimeout(() => {
      this.bindToFirestoreSharedUnauth("sharedPlaylists");
    }, 1000);
      }
    }

  },
  computed: {
    ...mapState("firestore", ["ownedPlaylists", "sharedPlaylists"]),    
    ...mapState("parameters", ["pl", "authenticated"]),
  },
  methods: {
    ...mapMutations("parameters", ["SET_value"]),

    bindToFirestoreOwned(value) {      
      if (this[value].length == 0) {
        console.log('I am in bindToFireStore')
        this.$store.dispatch("firestore/bindUserdata", {
          path: "/userdata/" + auth.currentUser.uid + "/playlists",
          includQuery: false,
          // query: [this.message1, this.message2, this.message3],
          whereToBind: value,
        });
      } else {
        console.log("ownedPlaylists already loaded");
      }
    },

    //this needs to be handled differently from the unauthenticated case
    bindToFirestoreSharedAuth(value) {
      if (this[value].length == 0) {
        console.log("I am in bindToFireStore");
        this.$store.dispatch("firestore/bindUserdata", {
          path: "playlists",
          includQuery: true,
          collectionGroupQuery: true,
          query: ["tag", "==", this.pl],
          whereToBind: value,
        });
        console.log(this.sharedPlaylists);
      } else {
        console.log("sharedPlaylists already loaded");
      }
    },

    bindToFirestoreSharedUnauth(value) {
      if (this[value].length == 0) {
        console.log("I am in bindToFireStore");
        this.$store.dispatch("firestore/bindUserdata", {
          path: "playlists",
          includQuery: true,
          collectionGroupQuery: true,
          query: ["tag", "==", this.plUnauth],
          whereToBind: value,
        });
        console.log(this.sharedPlaylists);
      } else {
        console.log("sharedPlaylist already loaded");
      }
    },


  },
};
</script>

 <style lang="scss" scoped>
 .v-btn--fixed.v-btn--bottom {
    bottom: 70px;
}
.v-btn--fixed.v-btn--right {
    right: 16px;
}
</style>