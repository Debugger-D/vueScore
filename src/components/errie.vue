<template>
    <div>
        <v-header  :msgToChild="msgToChild"></v-header>
      <p>{{msg}}</p>
      <div>浏览版本太低了，赶紧换。</div>
    </div>
</template>
<style>

</style>
<script>
    import vHeader from '@/components/header/header'
    export default{
        name:'errie',
        components:{vHeader},
        data(){
            return{
                msg:'hello vue',
                msgToChild:{
                    sm2Active:true
                }
            }
        }
    }
</script>
