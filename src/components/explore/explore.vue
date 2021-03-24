<template>
  <div>
    <!-- explore: Coming soon... -->
    <!-- <recognizeSpeech> </recognizeSpeech> -->
    <div v-if="!chantingON"> 
    <searchBar> </searchBar>
    <v-divider class="my-5"></v-divider>
    <renderList> </renderList>
    </div>

  <div v-if="chantingON"> 
    <chantingTimer></chantingTimer>
  </div>
    <v-fab-transition>
      <v-btn color="purple darken-3" fab dark small fixed bottom right 
      @click="SET_value({list: !chantingON, id: 'chantingON'})">
        <v-icon v-if="!chantingON">mdi-account-voice</v-icon>
        <v-icon v-if="chantingON">mdi-book-open</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import searchBar from "./search-bar";
import chantingTimer from "./chanting-timer";
import renderList from "./render-list";
// import recognizeSpeech from "./subcomponents/recognize-speech";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    // recognizeSpeech
    searchBar,
    renderList,
    chantingTimer,
  },
  mounted() {},
  computed: {
    ...mapState("parameters", ["chantingON"]),
  },
  methods: {
    ...mapMutations("parameters", ["SET_value"]),
  },
};
</script>

 <style lang="scss" scoped>
 .v-btn--fixed.v-btn--bottom {
    bottom: 70px;
}
.v-btn--fixed.v-btn--right {
    right: 16px;
}
</style>