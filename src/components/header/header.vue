<template>
    <div class="header">
        <div class="top-bar">
            <div class="center">
                <div class="fl">
                    <span class="helloTRC">您好<a href="javascript:;" class="phone">{{UNAME}}</a>欢迎来到泰然城
                    </span>
                    <a href="javascript:;" class="logout" v-if="islogin" @click="logout">退出</a>
                    <!-- 未登录 -->
                    <span v-if="!islogin">
                        <a href="http://passport.trc.com/register" rel="nofollow" class="register">注册</a> |
                        <a href="javascript:;" rel="nofollow" class="login" @click="login">登录</a>
                    </span>
                </div>
                <div class="topbar-nav fr">
                    <span>
                        <a href="http://www.trc.com" target="_blank">返回泰然城</a>
                    </span>
                    <span>
                        <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4008260035&amp;aty=0&amp;a=0&amp;curl=&amp;ty=1" target="_blank">在线客服
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <div class="navigation clearBoth">
            <div class="center">
                <div class="mode-i-logo">
                    <a :href="TRCURL" target="_blank">
                        <img src="./img/logoTRC.png" alt="泰然城" title="'泰然城">
                    </a>
                </div>
                <div class="mode-i-top-nav">
                    <div class="mode-top-nav-first">
                        <ul class="mode-top-nav-inner">
                            <li class="mode-top-nav-item">
                                <div class="mode-top-nav-txt">
                                    <span :class="{sm : msgToChild.sm1Active}">
                                        <router-link to="/mall_home">积分商城</router-link>
                                    </span>
                                </div>
                            </li>
                            <li class="mode-top-nav-item" v-if="!islogin">
                                <div class="mode-top-nav-txt">
                                    <span @click="login">
                                        帐号登录
                                    </span>
                                </div>
                            </li>
                            <li class="mode-top-nav-item" v-if="islogin">
                                <div class="mode-top-nav-txt">
                                    <span :class="{sm : msgToChild.sm2Active}">
                                        <router-link to="/errie">我的积分</router-link>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as types from '@/services/types'
    import * as methods from '@/util/common'
    import axios from 'axios';
    import qs from 'qs';
    export default{
        data(){
            return{
                TRCURL:'http://www.trc.com',
                thisUrl:window.location.href,
                islogin:false,
                redirectUrl:'',
                phone:'',
                UNAME:'',
                msgToChild:''
            }
        },
        //从外层传来的msg
        props:['msgToChild'],
        created(){
            let UNAME=methods.getCookie('UNAME');
            if(UNAME){
                this.UNAME=UNAME;
                this.islogin=true;
            }
        },
        methods:{
            login(){
                if(types.SETTING().env=='trc'){
                    window.location.href=types.SETTING().loginUrl;
                }else{
                    this.$router.push({path:'/login',query:{redirectUrl:this.thisUrl}})
                }
            },
            logout(){
                axios.post(types.LOGOUT).then((data) =>{
                    this.islogin=false;
                    this.UNAME='';
                    methods.delCookie('UNAME')
                    window.location.reload()
                },(data)=>{this.$router.push({path:'/login',query:{redirectUrl:this.thisUrl}})})
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .router-link-active{
        color: #0086d1;
        font-weight: 700;
        /*&:before{
            content: '';
            position: relative;
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: #0086d1;
            vertical-align: middle;
            right: 4px;
        }*/
    }
  .header{
    .top-bar{
      height: 28px;
      background: #f5f5f5;
      line-height: 28px;
      font-size: 12px;
      color: #444;
      a {
        &:hover{
          color: #f55;
        }
      }
      .center{
        width: 1200px;
        margin: 0 auto;
        .helloTRC{
          padding-right: 16px;
        }
        .phone{
          padding: 0 10px;
          color: #27a1e5;;
        }
      }
      .topbar-nav{
        span{
          margin-left: 18px;
        }
      }
    }
      .navigation{
          margin: 0 auto;
          position: relative;
          .center{
              width: 1200px;
              margin: 0 auto;
              .mode-i-logo{
                  float: left;
                  padding-top: 20px;
                  width: 210px;
              }
              .mode-top-nav-inner{
                  float: right;
                  .mode-top-nav-item{
                      position: relative;
                      float: left;
                      height: 80px;
                      width: 86px;
                      padding: 0 12px;
                      text-align: center;
                      .mode-top-nav-txt{
                          position: relative;
                          font-size: 16px;
                          height: 60px;
                          padding: 10px 0;
                          line-height: 54px;
                          span{
                              display: inline-block;
                              line-height: 1em;
                              color: #353535;
                              font-weight: 700;
                          }
                          .sm{
                              color: #0086d1;
                              font-weight: 700;
                              a{
                                  color: #0086d1;
                              }
                              &:before{
                                  content: '';
                                  position: relative;
                                  display: inline-block;
                                  width: 6px;
                                  height: 6px;
                                  background-color: #0086d1;
                                  vertical-align: middle;
                                  right: 4px;
                              }
                          }
                      }
                  }
              }
          }
      }
  }
</style>
