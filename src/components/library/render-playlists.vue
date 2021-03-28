<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in ownedPlaylists" :key="i" cols="12">
          <v-card dense>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="subtitle-2"
                  v-text="item.name"
                ></v-card-title>

                <!-- <v-card-subtitle v-text="item.artist"></v-card-subtitle> -->
                <v-card-subtitle class="body-2">Lotsandlots</v-card-subtitle>

                <v-card-actions class="ma-0">
                  <v-btn left x-small @click="loadSelectedPlaylist(item)"> open </v-btn>
                  <v-btn left x-small> share </v-btn>
                </v-card-actions>
              </div>
              <v-divider inset vertical></v-divider>
              <div>
                <v-row dense>
                  <v-card-text class="pa-2 caption">
                    {{ item.description }}
                  </v-card-text>
                </v-row>
                <v-row dense>
                  <v-card-text class="pa-2 caption">
                    {{ item.timestamp.seconds }} | {{ item.mantras.length }} |
                    {{ item.timestamp.nanoseconds }}
                  </v-card-text>
                </v-row>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { auth } from "@/main.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("firestore", ["ownedPlaylists"]),
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
      let playlistId = item.tag      
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
  },
};
</script>
 <style lang="scss" scoped>
</style>