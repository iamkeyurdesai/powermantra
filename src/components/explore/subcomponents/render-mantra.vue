<template>
<div>
<renderOneVerse  :whichMantra="myMantra.id" :whichVerse="0" :whatScript="script"> </renderOneVerse>
</div>
</template>


<script>
import renderOneVerse from './render-oneverse'
import { mapState } from "vuex";
export default {
  data () {
    return {

    }
  },
  components: {
    renderOneVerse
  },
  computed: {
    ...mapState('parameters', ['searchSelect', 'script']),
    ...mapState('coretext', ['mantras']),
    myMantra() {
      return this.mantras[this.searchSelect]
    }
  }
}
</script>
 <style lang="scss" scoped>
</style>