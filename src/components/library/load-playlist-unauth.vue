<template>
  <div>
    <!-- explore: Coming soon... -->
    <!-- <recognizeSpeech> </recognizeSpeech> -->

    <div v-if="!cl">
      I am in load playlist
      <span v-if="authenticated">
        {{ sharedPlaylists }}
      </span>

      <div v-if="sharedPlaylists.length > 0">
        <renderItem
          v-for="(item, i) in sharedPlaylists[0].mantras"
          :key="i"
          :mantra="mantras[item - 1]"
          :mantra_id="item"
          :script="script"
        >
        </renderItem>
      </div>
      <!-- <renderList> </renderList> -->
    </div>

    <div v-if="cl">
      <chantingTimer></chantingTimer>
    </div>

    <v-fab-transition>
      <v-btn fab fixed x-small bottom left @click="goBack()">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn
        color="purple darken-3"
        fab
        dark
        small
        fixed
        bottom
        right
        @click="SET_value({ list: !cl, id: 'cl' })"
      >
        <v-icon v-if="!cl">mdi-account-voice</v-icon>
        <v-icon v-if="cl">mdi-book-open</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import renderItem from "@/components/explore/render-item";
import chantingTimer from "@/components/explore/chanting-timer";
import { mapState, mapMutations } from "vuex";
// import {auth} from "@/main.js"

export default {
  data() {
    return {};
  },
  components: {
    renderItem,
    chantingTimer,
  },
  mounted() {
    setTimeout(() => {
      this.bindToFirestore("sharedPlaylists");
    }, 1000);
  },
  computed: {
    ...mapState("parameters", ["pl", "authenticated", "cl", "script"]),
    ...mapState("firestore", ["sharedPlaylists"]),
    ...mapState("coretext", ["mantras"]),
  },
  methods: {
    ...mapMutations("parameters", ["SET_value"]),
    goBack() {
      this.$router.push("/Library");
    },
    bindToFirestore(value) {
      if (this[value].length == 0) {
        console.log("I am in bindToFireStore");
        this.$store.dispatch("firestore/bindUserdata", {
          path: "playlists",
          includQuery: true,
          collectionGroupQuery: true,
          query: ["tag", "==", this.pl],
          whereToBind: value,
        });
        if (this.sharedPlaylists.length > 0) {
          this.SET_value({
            list: this.pl,
            id: "plUnauth",
          });
        }
      } else {
        if (this.sharedPlaylists.length > 0) {
          this.SET_value({
            list: this.pl,
            id: "plUnauth",
          });
        }
      }
    },
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
.v-btn--fixed.v-btn--left {
  left: 16px;
}
</style>