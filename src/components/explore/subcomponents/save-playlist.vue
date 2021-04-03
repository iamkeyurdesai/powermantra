<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn          
          rounded
          v-bind="attrs"
          v-on="on"
          text
          x-large
          @click="bindToFirestore('ownedPlaylists')"
        >
          <v-icon>mdi-plus-box-multiple</v-icon> save
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          >Save to... <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text style="height: 300px">
          <v-radio-group v-model="dialogm1" column>
            <v-radio
              v-for="(list, i) in ownedPlaylists"
              :key="i"
              :label="list.name"
            ></v-radio>
          </v-radio-group>
          <!-- {{ ownedPlaylists.map(a=>a.mantras) }} -->
        </v-card-text>
        <v-alert
          v-model="alert"
          border="left"
          close-text="Close Alert"
          color="error"
          dark
          dismissible
          class="body-2"
          dense
        >
          {{ errMsg }}
        </v-alert>
        <v-divider></v-divider>

        <v-card-actions>
          <v-dialog v-model="nameBox" max-width="250px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                color="primary"
                small
                text
                class="text-none"
                @click="openNameBox()"
              >
                <v-icon>mdi-playlist-plus</v-icon>
                Create new playlist
              </v-btn>
            </template>
            <v-card outlined rounded>
              <v-card-text>
                <v-container align="center">
                  <v-row class="my-3">
                    <v-text-field
                      label="Playlist Name"
                      v-model="playlistName"
                      required
                      dense
                      clearable
                      class="caption"
                      :rules="[
                        rulesName.required,
                        rulesName.counterMax,
                        rulesName.counterMin,
                        rulesName.name,
                      ]"
                    ></v-text-field>
                  </v-row>
                  <v-row class="mt-3">
                    <v-textarea
                      auto-grow
                      counter
                      label="Description"
                      v-model="playlistDescription"
                      rows="3"
                      clearable
                      hint="A brief description of the playlist"
                      persistent-hint
                      class="caption"
                      :rules="[
                        rulesDescription.required,
                        rulesDescription.counterMin,
                        rulesDescription.counterMax,
                      ]"
                    ></v-textarea>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="nameBox = false">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="addNewPlaylist()">
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn color="blue darken-1 " text @click="saveToPlaylist()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { mapState } from "vuex";
import { auth, db } from "@/main.js";
import firebase from "firebase/app";
export default {
  data() {
    return {
      dialogm1: 0,
      dialog: false,
      nameBox: false,
      playlistDescription: "",
      playlistName: "",
      errMsg: "",
      alert: false,
      rulesDescription: {
        required: (value) => !!value || "Required.",
        counterMin: (value) => value.trim().length > 50 || "Min 50 characters",
        counterMax: (value) =>
          value.trim().length <= 250 || "Max 250 characters",
      },
      rulesName: {
        required: (value) => !!value || "Required.",
        counterMin: (value) => value.trim().length > 1 || "Min 2 characters",
        counterMax: (value) => value.trim().length <= 35 || "Max 35 characters",
        name: (value) =>
          this.takenPlaylistNames.includes(value.trim()) == false ||
          "Already exists",
        // name: value => {
        //   const pattern = /[^A-Za-z0-9]/
        //   return pattern.test(value)==false || 'No special characters'
        // },
      },
    };
  },
  props: {
    whichMantra: Number,
  },
  components: {},
  computed: {
    // ...mapState(["firestore", "ownedPlaylists"]), //this was a bad bad mistake. wasted 5 hours.
    ...mapState("firestore", ["ownedPlaylists"]),
    ...mapState("parameters", ["authenticated"]),
    takenPlaylistNames() {
      return this.ownedPlaylists.map((a) => a.name);
    },
  },
  methods: {
    openNameBox() {
      if (auth.currentUser == null) {
        this.errMsg = "Sing In to create playlist.";
        this.alert = true;
        this.nameBox = false;
      } else {
        this.nameBox = true;
      }
    },
    saveToPlaylist() {
      if (this.ownedPlaylists[this.dialogm1].mantras.length > 8) {
        this.errMsg = "Playlist too long: start new or delete entries.";
        this.alert = true;
      } else if (
        this.ownedPlaylists[this.dialogm1].mantras.filter(
          (a) => a === this.whichMantra
        ).length > 4
      ) {
        this.errMsg = "A mantra can be added up to 5 times.";
        this.alert = true;
      } else {
        this.alert = false;
        let newArray = [...this.ownedPlaylists[this.dialogm1].mantras];
        newArray.push(this.whichMantra);
        db.collection("userdata")
          .doc(auth.currentUser.uid)
          .collection("playlists")
          .doc(this.ownedPlaylists[this.dialogm1].id)
          .update({
            mantras: newArray,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        this.dialog = false;
        this.$emit("saveSuccess", this.ownedPlaylists[this.dialogm1].name);
      }
    },
    addNewPlaylist() {
      //console.log(db)
      // console.log(this.playlistName)
      // console.log(auth.currentUser.uid)
      db.collection("userdata")
        .doc(auth.currentUser.uid)
        .collection("playlists")
        .add({
          name: this.playlistName.trim(),
          description: this.playlistDescription.trim(),
          mantras: [this.whichMantra],
          owner: auth.currentUser.displayName,
          tag: this.uniqueTag(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      this.nameBox = false;
      this.dialog = false;
      this.$emit("saveSuccess", this.playlistName.trim());
    },
    uniqueTag() {
      let d = new Date();
      let n = d.getTime().toString(36);
      return n + auth.currentUser.uid.slice(1, 4);
    },
    bindToFirestore(value) {
      if (this.authenticated) {
      if (this[value] == null) {
        console.log("I am in bindToFireStore " + value);
        this.$store.dispatch("firestore/bindUserdata", {
          path: "/userdata/" + auth.currentUser.uid + "/playlists",
          type: "collection",
          whereToBind: value,
        });
        } else {
        console.log(value + " already bound");
        }
      }
    },
  },
  mounted() {},
};
</script>
 <style lang="scss" scoped>
</style>
