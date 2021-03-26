<template>
  <div>
    <renderItem
      v-for="(item, i) in searchSelect"
      :key="i"
      :mantra="mantras[searchSelect[i].mantra_id]"
      :mantra_id="searchSelect[i].mantra_id"
      :script="script"      
    >
    </renderItem>
  </div>
</template>

<script>
import renderItem from "./render-item";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    renderItem,
  },
  mounted() {},
  computed: {
    ...mapState("parameters", ["searchSelect", "script"]),
    ...mapState("coretext", ["mantras"]),
  },
  methods: {},
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