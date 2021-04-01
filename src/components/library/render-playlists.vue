<template>
  <div>
    
    <v-card v-for="(item) in ownedPlaylists" :key="item.tag" class="pa-4 mx-0 my-2">
      <v-row justify="space-between">
        <span>{{ item.name }}</span>
        <playlistInfo :item="item" :mantras="mantras"></playlistInfo>
      </v-row>
      <v-row justify="space-between">
        <div class="body-2 text--secondary">
          {{ item.owner }} &#183; {{ item.mantras.length }}
          {{ item.mantras.length > 1 ? "mantras" : "mantra" }} &#183;
          {{ extractDHMS(item.timestamp.seconds) }}
        </div>
        <div class="body-2 text--secondary">
          <v-btn x-small text @click="viewPlaylist(item)"> <v-icon>mdi-playlist-play</v-icon> </v-btn>
        </div>
      </v-row>
    </v-card>

    <v-card v-for="(item) in sharedPlaylists" :key="item.tag" class="pa-4 mx-0 my-2">
      <v-row justify="space-between">
        <span>{{ item.name }}</span>
        <playlistInfo :item="item" :mantras="mantras"></playlistInfo>
      </v-row>
      <v-row justify="space-between">
        <div class="body-2 text--secondary">
          {{ item.owner }} &#183; {{ item.mantras.length }}
          {{ item.mantras.length > 1 ? "mantras" : "mantra" }} &#183;
          {{ extractDHMS(item.timestamp.seconds) }}
        </div>
        <div class="body-2 text--secondary">
          <v-btn x-small text @click="viewPlaylist(item)"> <v-icon>mdi-playlist-play</v-icon> </v-btn>
        </div>
      </v-row>
    </v-card>
  
  </div>
</template>


<script>
import { auth } from "@/main.js";
import { mapState, mapMutations } from "vuex";
// import socialSharing from "./subcomponents/social-sharing.vue";
import playlistInfo from "./subcomponents/playlist-info.vue"

export default {
  data() {
    return {      
    };
  },
  components: {
    // socialSharing,
    playlistInfo
  },
  computed: {
    ...mapState("firestore", ["ownedPlaylists", "sharedPlaylists"]),    
    ...mapState("coretext", ["mantras"]),
    ...mapState("parameters", ["authenticated", "pl", "plUnauth"]),
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

    loadSelectedPlaylist(item) {      
      let playlistId = item.tag;
      let myTempPath = "/" + "Library" + "/" + "pl=" + playlistId;
      this.$router.push(myTempPath);      
    },    
    extractDHMS(secs) {
      let a = new Date(secs * 1000);
      a = a.toLocaleString().split(",");
      let b = new Date();
      b = b.toLocaleString().split(",");      
      if (a[0] == b[0]) {
        let temp1 = a[1].trim().split(" ");
        let temp2 = temp1[0].split(":");
        return temp2[0] + ":" + temp2[1] + " " + temp1[1];
      } else {
        return a[0];
      }
    },
    viewPlaylist(item) {
      let playlistId = item.tag;      
      let myTempPath =
        // "https://powermantra.web.app" +
        "/" +
        "Library" +
        "/" +        
        "pl=" +
        playlistId;        
        this.$router.push(myTempPath)
    }      
  },
};
</script>
 <style lang="scss" scoped>
</style>