<template>
  <div>    
      
    <renderPlaylists v-if="pl==null"> </renderPlaylists>
    <loadPlaylist v-if="pl!=null"> </loadPlaylist>    

  
  </div>
</template>

<script>
import renderPlaylists from "./render-playlists";
import loadPlaylist from "./load-playlist";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  components: {    
    renderPlaylists,
    loadPlaylist,    
  },
  mounted() {    
  },
  computed: {
    ...mapState("parameters", ["pl"]),
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