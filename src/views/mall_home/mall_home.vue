<template>
    <div class="mallHome">
        <v-header :msgToChild="msgToChild"></v-header>
        <v-slider></v-slider>
        <h1 @click="link"> {{ msg }}</h1>
        <v-footer></v-footer>
    </div>
</template>

<script>
  import vHeader from '@/components/header/header'
  import vFooter from '@/components/footer/footer'
  import vSlider from '@/components/slider/slider'
  export default {
    name: 'mall_home',
    components: {vHeader,vFooter,vSlider},
      data (){
          return {
              msg: '商城首页',
              msgToChild:{
                  sm1Active:true
              }
          }
      },
      methods:{
          link () {
            this.$router.push({path:'/errie'})
          }
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
