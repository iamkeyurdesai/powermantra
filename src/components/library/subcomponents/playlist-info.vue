<template>
  <div>    
    <v-bottom-sheet v-model="sheet">                                 
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab text v-bind="attrs" v-on="on" small>
          <v-icon>mdi-dots-vertical</v-icon></v-btn>
      </template>          
    
            <v-sheet class="text-center" height="300px">
              <v-card flat>
                <v-row justify="space-between" class="pa-6" align="center">
                  <div class="text-body-1">{{ item.name }}</div>
                  <div class="text-body-2 text--secondary">
                    <v-btn x-small text @click="viewPlaylist(item)" >
                      <v-icon>mdi-playlist-play</v-icon>view
                    </v-btn>
                  </div>
                  <socialSharing :sharing="sharingInfo(item)"></socialSharing>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="6">
                    <div class="text-justify ma-4">{{ item.description }}</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="ma-4">
                      Mantras
                      <v-chip class="ma-1 caption" v-for="(midx, m) in item.mantras" :key="m">
                        {{m+1}} {{ mantras[midx - 1].name }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-sheet>          
            </v-bottom-sheet>
        </div>    
</template>


<script>
import socialSharing from "./social-sharing.vue";
export default {
  props: {
    item: Object,
    mantras: Array
  },
  components: {
    socialSharing,
  },
  data() {
    return {
      sheet: false,       
    };
  },
  computed: {
    
  },
  methods: {
        sharingInfo(item) {
      let playlistId = item.tag;
      let myTempPath =
        "https://powermantra.web.app" +
        "/" +
        "Library" +
        "/" +
        "api=1&" +
        "pl=" +
        playlistId;
      return {
        url: myTempPath,
        title: item.name,
        description: item.description,
        quote:
          "Mantrams are collection of phrases, words and sounds which by virtue of rhythmic effect achieve results that would not be possible apart from them.. - Master Djwhal Khul",
        hashtags: "mantra, meditation, yoga",
      };
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
}
}
</script>
 <style lang="scss" scoped>
 
</style>