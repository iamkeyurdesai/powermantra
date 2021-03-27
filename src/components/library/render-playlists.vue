<template>
  <div>

    <v-container>
      <v-row dense>

<v-col
          v-for="(list, i) in ownedPlaylists" :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    v-if="item.artist === 'Ellie Goulding'"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-play</v-icon>
                  </v-btn>

                  <v-btn
                    v-else
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    START RADIO
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>

           </v-row>
    </v-container>
    <v-card v-for="(list, i) in ownedPlaylists" :key="i">
      {{list}}
    </v-card>
  </div>
</template>


<script>
import { auth } from "@/main.js";
import { mapState } from "vuex";
export default {
  data () {
    return {
      
    }
  },
  computed: {
      ...mapState("firestore", ["ownedPlaylists"]),
  },
  mounted() {
    setTimeout(() => {
      this.bindToFirestore("ownedPlaylists")
    }, 10000);
  },
  methods: {
        bindToFirestore(value) {      
        if (this[value].length == 0) {
        this.$store.dispatch("firestore/bindUserdata", {
          path: "/userdata/" + auth.currentUser.uid + "/playlists",
          includQuery: false,
          // query: [this.message1, this.message2, this.message3],
          whereTo: value,
        });
      } else {
        console.log("ownedPlaylists already loaded");
      }
    }
  }
}
</script>
 <style lang="scss" scoped>
</style>