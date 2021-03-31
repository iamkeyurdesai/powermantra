<template>
  <div>
    <!-- explore: Coming soon... -->
    <!-- <recognizeSpeech> </recognizeSpeech> -->


    <div v-if="!cl">
      I am in load playlist
      <span v-if="authenticated">
        {{ sharedPlaylists }}
      </span>

    <renderItem
      v-for="(item, i) in myPlaylist.mantras"
      :key="i"
      :mantra="mantras[item-1]"
      :mantra_id="item"
      :script="script"      
    >    
    </renderItem>
      <!-- <renderList> </renderList> -->
    </div>

    <div v-if="cl">
      <chantingTimer></chantingTimer>
    </div>

    <v-fab-transition>
      <v-btn fab fixed bottom left icon @click="goBack()">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn color="purple darken-3" fab dark small fixed bottom right 
      @click="SET_value({list: !cl, id: 'cl'})">
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
    //     console.log(this.pl)
    //     var mydata = db.collectionGroup('playlists').where('tag', '==', this.pl);
    // mydata.get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, ' => ', doc.data());
    //     });
    // });
    setTimeout(() => {
      this.bindToFirestore("sharedPlaylists");
    }, 1000);
  },
  computed: {
    ...mapState("parameters", ["pl", "authenticated", "cl", "plOwned", "script"]),
    ...mapState("firestore", ["sharedPlaylists", "ownedPlaylists"]),
    ...mapState("coretext", ["mantras"]),
    myPlaylist() {
      console.log(this.pl, this.plOwned, this.ownedPlaylists)
      if(this.plOwned) {
        console.log(this.ownedPlaylists.find(a => a.tag==this.pl).mantras)
        return this.ownedPlaylists.find(a => a.tag==this.pl)
      } else {
        return this.sharedPlaylists.find(a => a.tag==this.pl)
      }
    }
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
        console.log(this.sharedPlaylists);
      } else {
        console.log("ownedPlaylists already loaded");
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
  left: 0px;
}
</style>