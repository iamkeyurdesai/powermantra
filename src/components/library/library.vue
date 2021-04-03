<template>
  <div>
    
    <v-alert
      v-model="alertSingIn"
      border="left"
      close-text="Close Alert"
      color="info"
      dark
      dismissible
      class="body-2"
      dense
      v-if="!authenticated"
    >      
    <span dark class="orange darken 3 pa-1">Sing In</span> to create and share your own playlists. Store up to 10 shared playlists by <span class="orange darken 3 pa-1">Sing In</span>. We collect minimum data to support the sharing functionality. We never misuse your Sign In information. 
    </v-alert>


    <v-alert
      v-model="alertSingIn"
      border="left"
      close-text="Close Alert"
      color="info"
      dark
      dismissible
      class="body-2"
      dense
      v-if="authenticated"
    >      
    Use <v-btn small text> <v-icon>mdi-plus-box-multiple</v-icon> save </v-btn> to create and <v-btn small text> <v-icon>mdi-share</v-icon>share</v-btn> your own playlist.
    </v-alert>


    <renderPlaylists v-if="(pl == null) & authenticated"> </renderPlaylists>
    <renderPlaylistsUnauth v-if="(pl == null) & !authenticated">
    </renderPlaylistsUnauth>
    <loadPlaylist v-if="(pl != null) & authenticated"> </loadPlaylist>
    <loadPlaylistUnauth v-if="(pl != null) & !authenticated">
    </loadPlaylistUnauth>
  </div>
</template>

<script>
import renderPlaylists from "./render-playlists";
import renderPlaylistsUnauth from "./render-playlists-unauth";
import loadPlaylist from "./load-playlist";
import loadPlaylistUnauth from "./load-playlist-unauth";
import { auth } from "@/main.js";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      alertSingIn: true,
    };
  },
  components: {
    renderPlaylists,
    renderPlaylistsUnauth,
    loadPlaylist,
    loadPlaylistUnauth,
  },
  mounted() {
    setTimeout(() => {
      if (this.authenticated) {
        //authenticated
        //bind owned playlists
        this.bindToFirestoreOwned("ownedPlaylists");
        //bind to the list of shared playlists
        this.bindToFirestoreMySharedList("mySharedList");
      } else {
        //unauthenticated
        //if plUnauth is available then bind using it
        this.bindToFirestoreSharedUnauth("sharedPlaylists");
      }
    }, 1000);

    setTimeout(() => {
      if (this.authenticated) {
        this.bindToFirestoreSharedAuth("sharedPlaylists");
      }
    }, 2000);
  },
  computed: {
    ...mapState("firestore", [
      "ownedPlaylists",
      "sharedPlaylists",
      "mySharedList",
    ]),
    ...mapState("parameters", ["pl", "authenticated"]),
  },
  methods: {
    ...mapMutations("parameters", ["SET_value"]),

    bindToFirestoreOwned(value) {
      if (this[value] == null) {
        console.log("I am in bindToFireStore " + value);
        this.$store.dispatch("firestore/bindUserdata", {
          path: "/userdata/" + auth.currentUser.uid + "/playlists",
          type: "collection",
          whereToBind: value,
        });
      } else {
        console.log(value + " already bound");
      }
    },

    bindToFirestoreMySharedList(value) {
      if (this[value] == null) {
        console.log("I am in bindToFireStore " + value);
        console.log(auth.currentUser.uid);
        this.$store.dispatch("firestore/bindUserdata", {
          path: "/userdata/" + auth.currentUser.uid + "/track/mysharedlist",
          type: "document",
          whereToBind: value,
        });
      } else {
        console.log(value + " already bound");
      }
      console.log(this[value]);
      console.log(auth.currentUser.uid);
    },

    //this needs to be handled differently from the unauthenticated case
    bindToFirestoreSharedAuth(value) {
      if (this[value] == null) {
        if (this.mySharedList != null) {
          if (this.mySharedList.tag.length > 0) {
            console.log("I am in bindToFireStore " + value);
            this.$store.dispatch("firestore/bindUserdata", {
              path: "playlists",
              type: "collectionGroup",
              query: ["tag", "in", this.mySharedList.tag],
              whereToBind: value,
            });
          } else {
            console.log(value + " nothing to bind yet");
          }
        } else {
          console.log(value + " mySharedList not bound yet");
        }
      } else {
        console.log(value + " already bound");
      }
    },

    bindToFirestoreSharedUnauth(value) {
      if (this[value] == null) {
        console.log("I am in bindToFireStore");
        console.log(this.plUnauth);
        if (this.plUnauth != undefined) {
          this.$store.dispatch("firestore/bindUserdata", {
            path: "playlists",
            type: "collectionGroup",
            query: ["tag", "==", this.plUnauth],
            whereToBind: value,
          });
        }
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