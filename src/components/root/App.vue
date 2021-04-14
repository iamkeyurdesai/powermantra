<template>
  <v-app>
    <!-- <v-app-bar app color="#190933" dense>       -->
      <!-- <v-app-bar app color="#1f0b40" dense>       -->
        <v-app-bar app color="#230c47" dense>      
        
      <v-app-bar-title>
        <v-avatar size="28px" tile>
          <img
            :src="'/img/icons/android-chrome-192x192.png'"
            alt="Error Loading"
          />
        </v-avatar>
        <span class="ma-1 pa-1 white--text title"> Power Mantra</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <settingsPopup isScript isTheme></settingsPopup>
      <div v-if="!this.authenticated" class="white--text ma-1 pa-1">
        <v-btn
          rounded
          @click.native.stop="dialog = true"
          class="white--text ma-1 pa-1 text-none"
          color="orange darken-3"
        >
          Sing In
        </v-btn>
        <v-dialog v-model="dialog">
          <firebaseAuth></firebaseAuth>
        </v-dialog>
      </div>
      <div v-else>
        <userProfile></userProfile>
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- dynamic bottom navigation -->
    <v-bottom-navigation v-model="mainItem" app height="56" grow>
      <v-btn
        v-for="(zz, k) in menu.mainItems"
        :key="zz"
        :value="zz"
        color="primary--text"
      >
        <span :id="`main_${zz}`">{{ zz }}</span>
        <v-icon>{{ menu.mainIcons[k] }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>






<script>
import firebaseAuth from "./firebase-auth.vue";
import userProfile from "./user-profile.vue";
import settingsPopup from "@/components/settings/settings-popup.vue";
import { mapState, mapMutations } from "vuex";
import { auth } from "@/main.js";
export default {
  data() {
    return {
      dialog: false, // open authentication dialog
    };
  },
  name: "App",
  components: {
    firebaseAuth,
    userProfile,
    settingsPopup,
  },
  computed: {
    ...mapState("settings", ["options", "menu", "pathTag"]),
    ...mapState("parameters", [
      "authenticated",
      "photoURL",
      "script",
      "fsize",
      "themeDark",
      "pl",
      "mn"
    ]),
    mainItem: {
      get() {
        return this.$store.state.parameters.mainItem;
      },
      set(value) {
        this.SET_mainItem(value); //sync store with the click
        //to retain the previous state within each mainItem we would need to push out the 
        //correct path when we switch the mainItem
        //since mainItem is reactive this will be executed everytime we switch mainItem
        //this is a better way than adding a watcher
        //go to settings/pathTag to update the tags
        //any number of tags can be added now as long as the correct mechanism to act on the tag 
        //once updated exists
        let myTempPath = "/" + this.mainItem + "/"; //beging the path handle
        for (let index = 0; index < this.pathTag.length; index++) { //cycle through all possible path tags and append 
          if (//if mainItem equals the pathtag and value of the tag is non-null then append the tag
            this.mainItem == this.pathTag[index].path &&
            this[this.pathTag[index].data] != null
          ) {//if a tag is already appended then append &
            if (myTempPath.includes("=")) {
              myTempPath = myTempPath + "&";
            }//now append the actual tag with its current value in the store
            myTempPath =
              myTempPath +
              this.pathTag[index].data +
              "=" +
              this[this.pathTag[index].data];
          }
        }
        // console.log(myTempPath);
        //older simpler implementation
        // if(this.mainItem=='Library' & this.pl!==null) {
        //           myTempPath = myTempPath + "/pl=" + this.pl
        //         }        
        //now push out the correct path
        this.$router.push(myTempPath);
      },
    },
  },
  methods: {
    ...mapMutations("parameters", [
      "SET_authenticated",
      "SET_photoURL",
      "SET_mainItem",
      "SET_userName",
    ]),
  },
  mounted() {
    // console.log(auth)
    // auth.onAuthStateChanged((user) => {console.log(auth.currentUser.uid, user)})
    // setTimeout(()=>console.log(auth.currentUser.uid), 1000)
    // let temp = auth.currentUser.uid
    // console.log(temp)
    // this.$nextTick((auth) => console.log(auth.currentUser.uid))
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.SET_authenticated(true);
        this.SET_photoURL(user.photoURL);
        this.SET_userName(user.displayName);
      } else {
        this.SET_authenticated(false);
        this.SET_photoURL("not signed in");
      }
    });
    this.$vuetify.theme.isDark = this.themeDark;
  },
};
</script>

<style lang="scss">
.container {
  max-width: 960px;
}
</style>
