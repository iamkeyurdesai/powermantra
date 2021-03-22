<template>
  <div class="ma-2">
    <!-- explore: Coming soon... -->
    <!-- <recognizeSpeech> </recognizeSpeech> -->
    <searchBar> </searchBar>
    <v-divider class="my-5"></v-divider>
    <renderItem> </renderItem>
  </div>
</template>

<script>
import searchBar from "./search-bar";
import renderItem from "./render-item";
// import recognizeSpeech from "./subcomponents/recognize-speech";
export default {
  data() {
    return {

    } 
  },
  components: {
// recognizeSpeech
searchBar,
renderItem
  },
  mounted() {    
  }
}  
</script>

 <style lang="scss" scoped>
</style>