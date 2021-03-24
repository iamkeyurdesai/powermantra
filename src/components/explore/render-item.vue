<template>
  <v-container v-if="mantra">
    <v-row>
      <v-col>
        <v-card>
          <v-row align="center" justify="space-around" class="my-2">
            <v-btn x-small class="text-none">
              <v-icon left> mdi-information </v-icon> Info
            </v-btn>
            <v-btn x-small class="text-none" @click="showAudio = !showAudio">
              <v-icon left> mdi-account-voice </v-icon> Audio
              <v-icon small v-if="showAudio">mdi-check </v-icon>
            </v-btn>
            <v-btn
              x-small
              class="text-none"
              @click="showYoutube = !showYoutube"
            >
              <v-icon left> mdi-youtube </v-icon> Youtube
              <v-icon small v-if="showYoutube">mdi-check </v-icon>
            </v-btn>
          </v-row>
          <v-expansion-panels flat focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="6" v-if="!open" class="info--text pl-0">
                      Learn about {{mantra.name}}</v-col
                    >
                    <v-col cols="6" class="info--text">
                      <v-fade-transition leave-absolute>
                        <span v-if="open"> {{mantra.name}} Background </span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div>
                  <v-card-text>
                    This is a <strong>{{mantra.category}}</strong>. 
                    The diety of this
                    mantra is <strong>{{mantra.deity}}</strong>.
                    This mantra embodies the quality of <strong>{{mantra.quality}}</strong>.
                    Chanting this mantra will grant the benefits of
                    <strong>{{mantra.benefits}}</strong>. The key application of this mantra is toward <strong>{{mantra.application}}</strong>.
                  </v-card-text>
                  <v-tabs v-model="tab" right>
                    <v-tab
                      v-for="item in items"
                      :key="item"
                      class="text-none text-caption text-sm-body-2"
                    >
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                      <v-card color="basil" flat>
                        <v-card-text>{{ mantra[item] }}</v-card-text>
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <div align="center" class="mt-2" v-if="showAudio">
            <div align="left" class="pa-2 info--text body-2">
            Audio by Power Mantra                        
            <v-btn color="success" text small @click="showAudio=false"><v-icon small>mdi-close</v-icon></v-btn>
            </div> 
            <av-bars              
              caps-color="#FFF"
              :bar-color="['#f00', '#ff0', '#0f0']"
              canv-fill-color="#000"
              :caps-height="2"
              audio-src="assets/audio/gita4.mp3"
            ></av-bars>
          </div>
          <div align="center" class="my-2" v-if="showYoutube">
            <v-row justify="space-between" class="ma-0 px-4 mb-3">
             <span class="info--text"> Check out this youtube video</span>             
            <v-btn color="warning" text small @click="showYoutube=false"><v-icon>mdi-close</v-icon></v-btn>
            </v-row> 
            <youtube
              :video-id="mantra.youtube.split('=')[1]"
              ref="youtube"
              fitParent              
            ></youtube>
          </div>
          <div>
          <!-- <renderMantra :mantra="mantra" :script="script"></renderMantra>           -->
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
// import { mapState } from "vuex";
// import addToPlaylist from "./subcomponents/add-to-playlist";
// import renderMantra from "./subcomponents/render-mantra";
export default {
  props: {
    mantra: Object,
    script: String
  },
  data() {
    return {      
      tab: null,      
      items: ["Significance", "How to chant"],      
      showAudio: false,
      showYoutube: false,
      audioPlaying: null,
    };
  },
  components: {
    // renderMantra
  },
  computed: {
    // ...mapState('parameters', ['searchSelect', 'script']),
    // ...mapState('coretext', ['mantras']),
    // myMantra() {
    //   if(this.mantras.length > 0) {
    //     return this.mantras[this.searchSelect]
    //   } else {
    //     return false
    //   }
      
    // }
  }
};
</script>
 <style lang="scss" scoped>
</style>