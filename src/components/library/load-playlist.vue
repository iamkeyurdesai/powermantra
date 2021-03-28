<template>
  <div>
    I am in load playlist
    {{sharedPlaylists}}
    <!-- <renderItem
      v-for="(item, i) in searchSelect"
      :key="i"
      :mantra="mantras[searchSelect[i].mantra_id]"
      :mantra_id="searchSelect[i].mantra_id"
      :script="script"      
    >
    </renderItem> -->
  </div>
</template>

<script>
// import renderItem from "./render-item";
import { mapState } from "vuex";
import {db} from "@/main.js"

export default {
  data() {
    return {};
  },
  components: {
    // renderItem,
  },
  mounted() {
    console.log(this.pl)
    var mydata = db.collectionGroup('playlists').where('tag', '==', this.pl);
mydata.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
});
    setTimeout(() => {
      this.bindToFirestore("sharedPlaylists");
    }, 1000);
  },
  computed: {
    ...mapState("parameters", ["pl"]),    
    ...mapState("firestore", ["sharedPlaylists"]),    
  },
  methods: {
    bindToFirestore(value) {            
        if (this[value].length == 0) {
          console.log('I am here')
        this.$store.dispatch("firestore/bindUserdata", {
          path: "playlists",
          includQuery: true,
          collectionGroupQuery: true,
          query: ['tag', '==', this.pl],
          whereToBind: value,
        });
        console.log(this.sharedPlaylists)
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
</style>