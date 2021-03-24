<template>
  <div>
    <span class="info--text ma-3 pa-2"> {{ myMantraByProperty('name') }} in Sanskrit</span>
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

      <v-btn text x-small rounded class="text--secondary">
        <v-icon
          small
          class="mx-1"
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
    <span class="info--text ma-3 pa-2"> {{ myMantraByProperty('name') }} in English</span>

      <v-btn text x-small rounded class="text--secondary">
        <v-icon
          small
          class="mx-1"
          @click="transOn = false"
          v-if="transOn"
          >mdi-close</v-icon
        >
        <v-icon
          small
          class="mx-1"
          @click="transOn = true"
          v-if="!transOn"
        >
          mdi-plus</v-icon
        >
      </v-btn>
    <div v-if="transOn">
      <v-card-text class="ma-0" v-html="myMantraByProperty('mantraenglish')[0]">
      </v-card-text>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import Sanscript from "sanscript";
export default {
  props: {
    whichMantra: Number,
    whichVerse: Number,
    whatScript: String,
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
      return this.mantras[this.whichMantra - 1].mantra[this.whichVerse].split(
        ";"
      );
    },
    myWords() {
      return this.mantras[this.whichMantra - 1].wordenglish[
        this.whichVerse
      ].split(";");
    },    
  },
  methods: {
    convert(myinput, option) {
      if (option === "primary") {
        return Sanscript.t(myinput, "itrans", this.whatScript);
      } else {
        let secondScript = "iast";
        if (this.whatScript === "iast" || this.whatScript === "itrans") {
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
    myMantraByProperty(val) {
      return this.mantras[this.whichMantra - 1][val];
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