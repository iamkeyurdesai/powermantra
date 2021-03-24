<template>
<div>
<renderOneVerse  v-for="(item, i) in mantra.mantra" :key="i"
:mantra="mantra" :whichVerse="i" :script="script"> </renderOneVerse>
</div>
</template>


<script>
import renderOneVerse from './render-oneverse'
// import { mapState } from "vuex";
export default {
  props: {    
    script: String,
    mantra: Object
  },
  data () {
    return {

    }
  },
  components: {
    renderOneVerse
  },
  computed: {    
    // myMantra() {
    //   return this.mantras[this.searchSelect]
    // }
  }
}
</script>
 <style lang="scss" scoped>
</style>