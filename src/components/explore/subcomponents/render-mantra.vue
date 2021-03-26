<template>
<div>
<renderOneVerse  v-for="(item, i) in mantra.mantra" :key="myKey(i)" :id="myId(i)"
:mantra="mantra" :whichVerse="i" :script="script"> 
</renderOneVerse>
</div>
</template>


<script>
import renderOneVerse from './render-oneverse'
export default {
  props: {    
    script: String,
    mantra: Object,
    mantra_id: Number
  },
  data () {
    return {

    }
  },
  components: {
    renderOneVerse
  },
  computed: {        
  },
  methods: {
    myKey(val) {
      return 'mantra'+this.mantra_id+'verse'+val
    },
    myId(val) {
      return 'ID_'+'mantra'+this.mantra_id+'verse'+val
    }
  }
}
</script>
 <style lang="scss" scoped>
</style>