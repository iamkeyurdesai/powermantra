<template>
<div class="d-flex justify-center">
  <div align="left">
    <span v-for="item in a" :key="item"> {{item}} </span> <br>
    <span v-for="item in b" :key="item"> {{item}} </span>
    <span> {{myMantra.mantra}} </span>
    {{this.whichMantra}}
</div>
</div>
</template>


<script>
import { mapState } from "vuex";
export default {
  props: {
    whichMantra: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      a: ["xx1", "yy2"],
      b: ["xx2", "yy3"]
    }
  },  
  computed: {  
    ...mapState('coretext', ['mantras']),
    ...mapState('parameters', ['searchSelect']),
      myMantra() {
      console.log(this.whichMantra)  
      return this.mantras[this.searchSelect]
    }
    }
  }

</script>
 <style lang="scss" scoped>
</style>