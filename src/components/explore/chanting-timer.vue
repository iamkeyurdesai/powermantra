<template>
    <v-row align="center" justify="space-between" class="ma-0" v-if="myMantra">
      <v-col align="start"> A </v-col>
      <v-col align="center"> A </v-col>
      <v-col align="end"> A </v-col>
    </v-row>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState("parameters", ["searchSelect"]),
    ...mapState("coretext", ["mantras"]),
    myMantra() {
      if (this.mantras.length > 0) {
        return this.mantras[this.searchSelect];
      } else {
        return false;
      }
    },
  },
};
</script>
 <style lang="scss" scoped>
</style>