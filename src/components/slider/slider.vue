<template>
  <div class="shuffling">
    <label for="">{{label}}</label>
    <input type="text" v-model="val">
  </div>
</template>
<script>
  export default {
    props:[label, val],
    ready: function() {
      var _this=this;
      var timer = setInterval(function() {
        if(_this.shufflingId>=0&&_this.shufflingId<_this.shufflingData.length-1){
          _this.shufflingId=parseInt(_this.shufflingId)+1;
        }
        else if (_this.shufflingId==_this.shufflingData.length-1) {
          _this.shufflingId=0;
        }
      }, 5000)
    },
    methods: {
      bulletFunOne:function(){
        this.shufflingId=0;
      },
      bulletFunTwo:function(){
        this.shufflingId=1;
      },
      bulletFunThree:function(){
        this.shufflingId=2;
      },
      showPreNext:function(){
        this.PreNext=true;
      },
      hiddenPreNext:function(){
        this.PreNext=false;
      },
      preFun:function(){
        var _this=this;
        if(_this.shufflingId>0&&_this.shufflingId<_this.shufflingData.length){
          _this.shufflingId=parseInt(_this.shufflingId)-1;
        }
      },
      nextFun:function(){
        var _this=this;
        if(_this.shufflingId>=0&&_this.shufflingId<_this.shufflingData.length-1){
          _this.shufflingId=parseInt(_this.shufflingId)+1;
        }
      }
    },
    data() {
      return {
        shufflingData:[{
          title:'喵来个米',
          href:'1',
          url:'/xxx/xx/src/img/1.png'
        },
          {
            title:'豆豆',
            href:'2',
            url:'/xxx/xx/src/img/2.png'
          },{
            title:'猫咪咪',
            href:'3',
            url:'/xxx/xx/src/img/3.jpg'
          }],
        shufflingId:0,
        PreNext:false,
      }
    }
  }
</script>
<style>
  .fouce {
    position: relative;
    left:380px;
    overflow: hidden;
    height: 570px;
    width: 1100px;
  }
  .fl {
    float: left;
  }
  .focus{
    overflow: hidden;
  }
  .fouce ul {
    position: absolute;
  }
  .fouce ul li {
    float: left;
  }
  .fouce ul li a.img {
    display: block;
    height: 520px;
  }
  .showimg{
    width:1440px;
    left:-0px;
  }
  .showimg img {
    display: block;
    width:1100px;
    height:520px;
  }
  .fouce .bullet-pagination {
    position: absolute;
    bottom: 50px;
  }
  .fouce ul li h3 {
    height: 40px;
    line-height: 40px;
    background-color: #ededed;
    text-align: center;
    font-size: 25px;
    width: 1100px;
  }
  .bullet-pagination {
    width: 100%;
    text-align: center;
    padding-top: 16px;
    clear: both;
    overflow: hidden;
  }
  .bullet {
    display: inline-block;
    background: #fff;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    margin-right: 5px;
    opacity: 0.8;
    -webkit-transition: opacity 0.8s linear;
    -moz-transition: opacity 0.8s linear;
    -ms-transition: opacity 0.8s linear;
    -o-transition: opacity 0.8s linear;
    transition: opacity 0.8s linear;
  }
  .bullet.active {
    background: #007cdb;
    opacity: 1;
    cursor: pointer;
  }
  .preNext {
    display: block;
    width: 31px;
    height: 41px;
    position: absolute;
    top: 200px;
    cursor: pointer;
  }
  .pre {
    background: url('/xxx/xx/src/img/news_arr_r.png') no-repeat right center;
  }
  .next {
    background: url('/xxx/xx/src/img/news_arr_r.png') no-repeat left center;
    right: 0px;
  }
  * {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  a{
    text-decoration: none;
  }

</style>
