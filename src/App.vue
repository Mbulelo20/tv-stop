<template>
  <div>
    
    <h1 style="text-align: center">tv-Stop</h1>
    <home-view></home-view>

  </div>
</template>

<script>

import homeView from './components/home.vue'
import header from './components/header.vue';


export default {
  components: {
    'home-view': homeView,
    'app-header': header ,
  },
  data () {
    return {
    }
  }
 
}
</script>
<style scoped>
h1{
  display: block;
  color: #333333;
    max-width: 650px;
    margin: 0 auto;
    padding: 0 16px;
    font-size: 59px;
}
</style>