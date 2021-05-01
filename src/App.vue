<template>
  <div id="app">
    <router-view/>
    <my-tab-bar class="my-tab-bar"></my-tab-bar>
  </div>
</template>

<script>
import MyTabBar from 'components/content/MyTabBar.vue'

export default {
  components: { MyTabBar },
  
}
</script>
<style>
@import 'assets/css/base.js';
#app{
  
}
#app .my-tab-bar{
  box-shadow: 0 2px 2px rgba(100,100,100,0.3);
}
</style>
