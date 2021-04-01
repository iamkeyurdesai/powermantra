<template>
  <div>    
      
    <renderPlaylists v-if="pl==null"> </renderPlaylists>
    <loadPlaylist v-if="pl!=null & authenticated"> </loadPlaylist>    
    <loadPlaylistUnauth v-if="pl!=null & !authenticated"> </loadPlaylistUnauth>    
  
  </div>
</template>

<script>
import renderPlaylists from "./render-playlists";
import loadPlaylist from "./load-playlist";
import loadPlaylistUnauth from "./load-playlist-unauth";

import { mapState, mapMutations } from "vuex";


export default {
  data() {
    return {};
  },
  components: {    
    renderPlaylists,
    loadPlaylist,
    loadPlaylistUnauth,        
  },
  mounted() {    
  },
  computed: {
    ...mapState("parameters", ["pl", "authenticated"]),
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