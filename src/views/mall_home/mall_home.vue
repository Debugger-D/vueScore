<template>
    <div class="mallHome">
        <v-input :label="msg" :val="msg1"></v-input>
    </div>
</template>
<script>
  import vInput from '@/components/slider/slider'
  export default {
    name: 'mall_home',
    components: {vInput},
      data (){
          return {
              msg: '商城首页11',
              msg1: '商城首页',
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
