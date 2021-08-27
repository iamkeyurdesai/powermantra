<template>
  <div>
    <v-row justify="space-between" align="center" class="ma-3" v-if="whichVerse==0">      
    <div class="info--text"> Sanskrit with translation</div>
    <div>
      <savePlaylist :whichMantra="mantra.id" v-on:saveSuccess="saveSuccessMsgAlert"></savePlaylist>
    </div>
    </v-row>
    <v-alert
      v-model="saveSuccessMsg"
      border="left"
      close-text="Close Alert"
      color="success"
      dark
      dismissible
      class="body-2"
      dense
    >
      <strong> {{mantra.name}} </strong> was added to <strong> {{saveSuccessInfo}} </strong>. Go to <strong> Library </strong> for your playlists. 
    </v-alert>
    <div class="d-flex justify-center">
      <div align="start">
        <span v-for="(item, i) in myMantra" :key="item + i" :style="{color: mytextcolors[i]}">
          <span
            v-for="(item1, j) in item.split(',')"
            :key="item1 + i + j + '_primary'"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on"
                  >{{ convert(item1, "primary") }}
                </span>                
              </template>
              <span
                v-for="item3 in addBr(myWords[i].split(',')[j])"
                :key="item3"
                >{{ convert1(item3, "primary") }}
                <br />
              </span>
            </v-tooltip>
          </span>
          <br />
          <span v-if="secondScriptOn" class="text--secondary">
            <span            
              v-for="(item2, k) in item.split(',')"
              :key="item2 + i + k + '_secondary'"              
              >{{ convert(item2, "secondary") }}
            </span>
            <br
          /></span>
        </span>
      </div>
      <div>
      <div class="font-weight-light body-1" v-if="mantra.mantra.length > 1">
        (v-{{whichVerse+1}})
        </div>
        <div >
          <v-btn fab small text class="font-weight-bold">
            <v-icon @click="secondScriptOn = false" v-if="secondScriptOn" color="success"
              >mdi-format-title</v-icon
            >
            <v-icon                      
              @click="secondScriptOn = true"
              v-if="!secondScriptOn" color="error"
            >
              mdi-format-clear</v-icon
            >
          </v-btn>
        </div>
        </div>      
    </div>
    <!-- <div class="fsIncrease" v-html="mantra.mantraenglish[whichVerse]"> -->
      <!-- <v-card-text  class="text--primary body-1" v-html="mantra.mantraenglish[whichVerse]">              
      </v-card-text> -->      
    <!-- </div> -->
    <span v-for="(item, i) in myTranslation" :key="item + i" :style="{color: mytextcolors[i]}" v-html="item">
    </span> 
    <v-divider inset v-if="(whichVerse+1) < mantra.mantra.length" class="my-3"></v-divider>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Sanscript from "sanscript";
import savePlaylist from "./save-playlist"
export default {
  props: {
    mantra: Object,
    whichVerse: Number,
    script: String,
  },
  components: {
    savePlaylist
  },
  data() {
    return {
      secondScriptOn: true,
      saveSuccessMsg: false,
      saveSuccessInfo: "",
      mytextcolors: ["#00E5FF", "#FFC400", "#76FF03", "#F48FB1"]
      // transOn: true,
    };
  },
  computed: {
    ...mapState("coretext", ["mantras"]),
    ...mapState("parameters", ["searchSelect"]),
    myMantra() {
      return this.mantra.mantra[this.whichVerse].split(";");
    },
    myWords() {
      return this.mantra.wordenglish[this.whichVerse].split(";");
    },
    myTranslation() {
      return this.mantra.mantraenglish[this.whichVerse].split("/")
    }
  },
  methods: {
    saveSuccessMsgAlert(value){
    this.saveSuccessMsg=true
    this.saveSuccessInfo=value
    },
    convert(myinput, option) {      
      if (option === "primary") {        
        return Sanscript.t(myinput, "itrans", this.script);
      } else {
        let secondScript = "iast";
        if (this.script === "iast" || this.script === "itrans") {
          secondScript = "devanagari";
        }
        return Sanscript.t(myinput, "itrans", secondScript);
      }
    },
    addBr(val) {
      return val.split("/");
    },
    convert1(val) {
      let a = val.split("=");
      return this.convert(a[0], "primary") + " = " + a[1];
    },
  },
};
</script>
 <style lang="scss" scoped>

.v-tooltip__content {
  background: rgb(230, 74, 25, 1);
  color: #f1e9e9;
  border-radius: 6px;
  font-size: 14px;
};
span {
  font-size: 1.375rem;
};
.fsIncrease {
   font-size: 1.25rem;
 }
</style>