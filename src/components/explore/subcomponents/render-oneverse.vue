<template>
<div class="d-flex justify-center">
  <div align="left">
    <span v-for="item in a" :key="item"> {{item}} </span> <br>
    <span v-for="item in b" :key="item"> {{item}} </span>
</div>
</div>

  </template>


<script>
export default {
  data () {
    return {
      a: ['Keyur', 'Keyur', 'Keyur'],
      b: ['Keyur', 'Desaikeyur', 'Desaiiii']
    }
  }
}
</script>
 <style lang="scss" scoped>
</style>