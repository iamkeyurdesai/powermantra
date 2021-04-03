<template>
  <div>
        
    <div v-if="sharedPlaylists!=null">
      <div v-if="sharedPlaylists.length >0">
    <v-card v-for="(item) in sharedPlaylists" :key="item.tag+'shared'" class="pa-4 mx-0 my-2">
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
  </div>

  
  </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import playlistInfo from "./subcomponents/playlist-info.vue"

export default {
  data() {
    return {      
    };
  },
  components: {
    playlistInfo
  },
  computed: {
    ...mapState("firestore", ["ownedPlaylists", "sharedPlaylists"]),    
    ...mapState("coretext", ["mantras"]),
    ...mapState("parameters", ["authenticated", "pl", "plUnauth"]),
  },
  mounted() {
  },
  methods: {
    ...mapMutations("parameters", ["SET_value"]),
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