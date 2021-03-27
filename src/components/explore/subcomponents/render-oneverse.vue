<template>
  <div>
    <v-row justify="space-between" class="ma-3" v-if="whichVerse==0">      
    <div class="info--text"> Sanskrit with translation</div>
    <div>
      <savePlaylist :whichMantra="mantra.id"></savePlaylist>
    </div>
    </v-row>
    <div class="d-flex justify-center">
      <div align="left">
        <span v-for="(item, i) in myMantra" :key="item + i">
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
          <span v-if="secondScriptOn">
            <span
              v-for="(item2, k) in item.split(',')"
              :key="item2 + i + k + '_secondary'"
              class="text--secondary"
              >{{ convert(item2, "secondary") }}
            </span>
            <br
          /></span>
        </span>
      </div>
      <div class="font-weight-light caption" v-if="mantra.mantra.length > 1">
        (v-{{whichVerse+1}})
        </div>
        <div >
          <v-btn x-small text class="font-weight-bold">
            <v-icon small @click="secondScriptOn = false" v-if="secondScriptOn" color="success"
              >mdi-format-title</v-icon
            >
            <v-icon
              small              
              @click="secondScriptOn = true"
              v-if="!secondScriptOn" color="error"
            >
              mdi-format-clear</v-icon
            >
          </v-btn>
        </div>      
    </div>
    <div>
      <v-card-text  v-html="mantra.mantraenglish[whichVerse]">              
      </v-card-text>
    </div>
    <v-divider inset class="mb-4"></v-divider>
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
  },
  methods: {
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
}
</style>