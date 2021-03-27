<template>
  <div>    
    <div v-if="!chantingON">     
    <renderPlaylists> </renderPlaylists>
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
import chantingTimer from "@/components/explore/chanting-timer";
import renderPlaylists from "./render-playlists";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  components: {    
    renderPlaylists,
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