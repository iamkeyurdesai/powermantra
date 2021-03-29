<template>
  <v-app>
    <v-app-bar app class="purple darken-3" dense>
      <v-app-bar-title>
        <v-avatar size="28px" tile>
          <img
            :src="'/img/icons/android-chrome-192x192.png'"
            alt="Error Loading"
          />
        </v-avatar>
        <span class="ma-1 pa-1 white--text title">
          Power Mantra</span
        >
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
import settingsPopup from "@/components/settings/settings-popup.vue"
import { mapState, mapMutations, mapGetters } from "vuex";
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
    settingsPopup
  },
  computed: {
    ...mapState("settings", ["options", "menu"]),
    ...mapState("parameters", [
      "authenticated",
      "photoURL",
      "script",
      "fsize",
      "path",
      "themeDark"
    ]),
    mainItem: {
      get() {
        return this.$store.state.parameters.mainItem;
      },
      set(value) {
        this.SET_mainItem(value);
        let myTempPath = "/" + this.mainItem;
        if (this.path !== myTempPath) {
          this.$router.push(myTempPath);
          if (myTempPath !== "/") this.SET_path(myTempPath);
        }
      },
    },
  },
  methods: {
    ...mapGetters("settings", ["GET_dark"]),
    ...mapMutations("parameters", [
      "SET_authenticated",
      "SET_photoURL",
      "SET_mainItem",
      "SET_path",
      "SET_userName",
    ]),
    ...mapGetters("settings", ["GET_dark"]),
  },
  mounted() {
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
  },
};
</script>

<style lang="scss">
.container {
  max-width: 960px;
}
</style>
