<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="sheet"
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{}">
        <v-btn v-show="true"  text @click="sheet = true">
          <v-icon medium color="blue lighten-3"> mdi-format-size</v-icon>
        </v-btn>
      </template>
  
    
    <v-card>    
      <v-toolbar flat dark color="primary" >
        <v-btn dark icon small @click.native="sheet = false">
          <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <div class="text-xs-center subheading">
        settings
      </div>    
      <v-spacer></v-spacer>
  <!-- <div class="subheading">{{(themeDark ? "Dark" : "Light")}}</div> -->
  <div class="caption">{{convert(script)}}</div>
      </v-toolbar>

    <v-card class="px-2 my-3" v-if="isScript">
        <strong>script: </strong>
        <v-btn small  class="ma-2 pa-1" v-for="(item) in options.script" @click="script=item" :key="item" 
        :outlined="script===item" :rounded="script!==item">
          <span>{{convert(item)}}
            <v-icon small v-if="script===item">mdi-check </v-icon> </span></v-btn>
      </v-card>
            <v-card class="pa-1 my-3" v-if="isTheme">
            <strong>Theme: </strong>
            <v-switch
              v-model="themeDark"
              label="dark"
              color="black"              
            ></v-switch>            
          </v-card>
</v-card>
</v-dialog>
</div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Sanscript from "sanscript";

export default {
  props: {
    isLanguage: Boolean,
    isScript: Boolean,
    isTheme: Boolean,
    isFsize: Boolean,
  },
  data: () => ({
    sheet: false,
  }),
  computed: {
    ...mapState("settings", ["options"]),
    ...mapState("parameters", ["themeDark", "script"]),
    ...mapGetters("settings", ["GET_dark"]),
    themeDark: {
      get() {
        return this.$store.state.parameters.themeDark;
      },
      set(value) {
        this.SET_themeDark(value);
        this.$vuetify.theme.isDark=value
      },
    },
    script: {
      get() {
        return this.$store.state.parameters.script;
      },
      set(value) {
        this.SET_script(value);
      },
    },
  },
  methods: {
    ...mapMutations("parameters", ["SET_themeDark", "SET_script"]),
    convert(myinput) {
      if (myinput === "iast") {
        return "English";
      } else {
        return Sanscript.t(this.options.script1[myinput], "itrans", myinput);
      }
    },
  },
};
</script>

<style scoped>
</style>
