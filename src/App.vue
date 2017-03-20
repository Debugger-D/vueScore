<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import mall_home from './views/mall_home/mall_home'//商城首页
  import errie from './components/errie'//错误页面
  import login from './login'//登录页面
  export default {
    name: 'app',
    components: {
      mall_home,
      errie,
      login
    }
  }
</script>

<style lang="sass">
  @import "./assets/css/reset.css";
  @import "./assets/css/common.css";


</style>
