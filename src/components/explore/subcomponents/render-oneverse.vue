<template>
  <div>
    <span class="info--text ma-0 pa-4"> {{ mantra.name }} in Sanskrit</span>
    <div class="d-flex justify-center mb-3">
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
                >{{ convert1(item3, "primary") }} <br />
              </span>
            </v-tooltip>
          </span>
          <br />
          <span v-if="secondScriptOn">
            <span
              v-for="(item2, k) in item.split(',')"
              :key="item2 + i + k + '_secondary'"
              class="text--secondary"
              >{{ convert(item2, "secondary") }} </span
            ><br
          /></span>
        </span>
      </div>

      <v-btn text x-small rounded class="text--secondary" >
        <v-icon
          small          
          @click="secondScriptOn = false"
          v-if="secondScriptOn"
          >mdi-close</v-icon
        >
        <v-icon
          small
          class="mx-1"
          @click="secondScriptOn = true"
          v-if="!secondScriptOn"
        >
          mdi-plus</v-icon
        >
      </v-btn>
    </div>
    <v-row justify="space-between" class="ma-0 px-4">
    <span class="info--text"> {{ mantra.name }} in English</span>
      <v-btn text x-small rounded class="text--secondary">
        <v-icon                  
          class="mx-1"
          @click="transOn = false"
          v-if="transOn"
          >mdi-chevron-down</v-icon
        >
        <v-icon          
          class="mx-1"
          @click="transOn = true"
          v-if="!transOn"
        >
          mdi-chevron-up</v-icon
        >
      </v-btn>
    </v-row>
    <div v-if="transOn">
      <v-card-text class="ma-0" v-html="mantra.mantraenglish[whichVerse]">
      </v-card-text>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import Sanscript from "sanscript";
export default {
  props: {
    mantra: Object,
    whichVerse: Number,
    script: String,
  },
  data() {
    return {
      secondScriptOn: true,
      transOn: true
    };
  },
  computed: {
    ...mapState("coretext", ["mantras"]),
    ...mapState("parameters", ["searchSelect"]),
    myMantra() {
      
      return this.mantra.mantra[this.whichVerse].split(
        ";"
      );
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
    }
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