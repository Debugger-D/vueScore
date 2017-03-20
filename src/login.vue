<template>
    <div class="">
        <input type="text" placeholder="帐号" v-model="user.phone" > <br>
        <input type="text" placeholder="密码" v-model="user.password">
        <p>{{error}}</p>
        <button @click="link">登录</button>
    </div>
</template>

<script>
    import * as types from '@/services/types'
    import * as methods from '@/util/common'
    import axios from 'axios';
    import qs from 'qs';
    export default {
        name: 'login',
        data (){
            return {
                error: '',
                phone:'',
                user:{
                    phone:'',
                    password:''
                }
            }
        },
        methods:{
            link () {
                axios.post(types.LOGIN,qs.stringify(this.user), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((data) =>{
                    methods.setCookie("UNAME",data.data.phone);
                    let redirectUrl=this.$route.query.redirectUrl
                    if(redirectUrl){
                        window.location.href= redirectUrl
                    }else{window.location.href='http://localhost:8080/#/mall_home'}
                },(data) => {this.error=data.response.data})
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss" >
    input{
        margin: 5px;
    }
    button {
        margin-left: 10px;
    }
</style>
