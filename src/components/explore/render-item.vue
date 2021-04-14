<template>
  <v-sheet min-height="250" class="fill-height" color="transparent">
    <v-lazy
      v-model="isActiveItem"
      :options="{
        threshold: 0.5,
      }"
    >
      <v-container v-if="mantra">
        <v-row>
          <v-col>
            <v-card class="text-justify pa-2" flat>
              <v-row align="center" justify="center" class="ma-3">
              <span class="text-h5 success--text">{{ mantra.name }}</span>
              </v-row>
              <v-row align="center" justify="space-around" class="ma-1">
                <v-btn 
                :text="!backgroundOn" 
                :dark="backgroundOn"
                :class="{'info darken-1': backgroundOn}"
                class="text-none">
                  <v-icon left> mdi-information </v-icon> Info
                </v-btn>
                <v-btn
                  :text="!backgroundOn" 
                  :dark="backgroundOn"
                  :class="{'purple darken-3': backgroundOn}"
                  class="text-none" 
                  @click="showAudio = !showAudio"
                >
                  <v-icon left> mdi-waveform </v-icon> Audio
                  <v-icon small v-if="showAudio">mdi-check </v-icon>
                </v-btn>
                <v-btn
                  :text="!backgroundOn" 
                  :dark="backgroundOn"
                  :class="{'red darken-1': backgroundOn}"
                  class="text-none" 
                  @click="showYoutube = !showYoutube"
                >
                  <v-icon left> mdi-youtube </v-icon> Youtube
                  <v-icon small v-if="showYoutube">mdi-check </v-icon>
                </v-btn>
              </v-row>
<div align="center" class="mt-2" v-if="showAudio">
                <v-row justify="space-between" class="ma-0 px-4 mb-3">
                  <span class="info--text"> Audio by Power Mantra</span>                  
                  <v-btn  small text @click="showAudio = false" class="text--secondary"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-row>                
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
                  <v-btn small text @click="showYoutube = false" class="text--secondary"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-row>
                <v-pagination
      v-model="videoPage"
      :length="mantra.Youtube.length"      
    ></v-pagination>
                <youtube
                  :video-id="mantra.Youtube[videoPage-1].split('=')[1]"
                  ref="youtube"
                  fitParent
                ></youtube>
              </div>
             
              <v-row justify="space-between" align="center" class="ma-3"> 
                <span class="info--text  my-5">Background on {{ mantra.name }}</span>
                <v-btn text small rounded class="text--secondary">
                  <v-icon @click="backgroundOn = false" v-if="backgroundOn"
                    >mdi-chevron-down</v-icon
                  >
                  <v-icon @click="backgroundOn = true" v-if="!backgroundOn">
                    mdi-chevron-up</v-icon
                  >
                </v-btn>
              </v-row>

              <v-fade-transition leave-absolute>
                <div v-if="backgroundOn">
                  <!-- <v-card-text class="text--primary text-body-1"> -->
                    <div class="fsIncrease">
                    This is a {{ mantra.Category }}. The diety of this mantra is
                    {{ mantra.Deity }}. This mantra embodies the quality of
                    {{ mantra.Quality }}. The primary application of this mantra is {{ mantra.Application }}. The recitation of {{mantra.name}} will {{ mantra.Benefits }}. 
                    </div>
                  <!-- </v-card-text> -->
                  <v-tabs v-model="tab" right>
                    <v-tab
                      v-for="item in items"
                      :key="item"
                      class="body-1"
                    >
                      {{ item }}
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                      <v-card color="basil" flat>                        
                        <!-- <v-card-text class="text--primary body-1"> -->
                          <div class="fsIncrease">
                          {{ mantra[item] }}
                          </div>
                          <!-- </v-card-text>                           -->
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </v-fade-transition>              

                            <div>
                <renderMantra
                  :mantra="mantra"
                  :script="script"
                  :mantra_id="mantra_id"
                ></renderMantra>
              </div> 
              
            </v-card>    
            <v-divider></v-divider>        
            <v-divider></v-divider>                    
          </v-col>
        </v-row>        
      </v-container>
    </v-lazy>
  </v-sheet>
</template>


<script>
import renderMantra from "./subcomponents/render-mantra";

export default {
  props: {
    mantra: Object,
    script: String,
    mantra_id: Number,    
  },
  data() {
    return {
      tab: null,
      items: ["Significance", "How to chant"],
      showAudio: false,
      showYoutube: false,
      audioPlaying: null,
      isActiveItem: false,
      backgroundOn: false,
      videoPage: 1
    };
  },
  components: {
    renderMantra,
  },
  computed: {    
  },
  methods: {    
  }
};
</script>
 <style lang="scss" scoped>
 .fsIncrease {
   font-size: 1.25rem;
 }
</style>