<template>
  <div>
    
    <v-card v-for="(item, i) in ownedPlaylists" :key="i" class="pa-4 mx-0 my-2">
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
    ...mapState("firestore", ["ownedPlaylists"]),    
    ...mapState("coretext", ["mantras"]),
  },
  mounted() {
    setTimeout(() => {
      this.bindToFirestore("ownedPlaylists");
    }, 5000);
  },
  methods: {
    ...mapMutations("parameters", ["SET_value"]),
    bindToFirestore(value) {
      console.log(auth.currentUser.uid);
      if (this[value].length == 0) {
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
    loadSelectedPlaylist(item) {
      console.log(item);
      let playlistId = item.tag;
      let myTempPath = "/" + "Library" + "/" + "api=1&" + "pl=" + playlistId;
      if (this.path !== myTempPath) {
        this.$router.push(myTempPath);
        console.log(myTempPath);
        if (myTempPath !== "/")
          this.SET_value({ list: myTempPath, id: "path" });

        // let myTempPath = '/' + this.mainItem + '/' + 'api=1' + '&activeTab=' + this.activeTab +
        //    '&chapter=' + this.chapter + '&verse=' + this.verse + '&theme=' + this.theme + '&language=' + this.language +
        //    '&script=' + this.script + '&fsize=' + this.fsize
        //    if(this.path !== myTempPath) {
        //    this.$router.push(myTempPath)
        //    console.log(myTempPath)
        //    if(myTempPath !== "/") this.SET_path(myTempPath)
      }
    },    
    extractDHMS(secs) {
      let a = new Date(secs * 1000);
      a = a.toLocaleString().split(",");
      let b = new Date();
      b = b.toLocaleString().split(",");
      console.log(a, b);
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
        "api=1&" +
        "pl=" +
        playlistId;        
        this.$router.push(myTempPath)
    }      
  },
};
</script>
 <style lang="scss" scoped>
</style>