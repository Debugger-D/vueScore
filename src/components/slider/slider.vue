<!--
<template>
  <div ref="root" style="user-select: none;-webkit-user-select: none;width: 100%" class="clearBoth">
    <div  class="sliderPanel"
          :class="{transitionAni:ani}"
          style="height:460px"  :style="{transform:translateX}">
      <div v-for="item in banner" class="verticalCenter picbox" :style="{left:item.x+'px'}">
        <a :href="item.targetUrl" target="_blank">
          <img  :style="{width:width,top:top}"  :src="item.imgUrl" style="height: 460px;">
        </a>
      </div>
    </div>
    <div class="banner-center">
      <div @click="clickLeft" class="arrowLeft verticalCenter horizaCenter">
        <img src="http://www.trc.com/themes/luckymall/images/store/btn-right1.png" style="transform: rotate(180deg)">
      </div>
      <div @click="clickRight" class="arrowRight verticalCenter horizaCenter">
        <img src="http://www.trc.com/themes/luckymall/images/store/btn-right1.png">
      </div>
      <div class="sliderBar horizaCenter">
        <div v-for="(item,index) in banner" @click="clickSliderCircle(index)"  class="circle" :class="{circleSelected:item.selected}">
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

  const SCREEN_WIDTH=document.body.clientWidth;
  let left,center,right;
  let selectIndex=0;
  let count=0;
  let second=5;//slider 时间间隔
  let timer=null;
  let ani=null;
  let debugScale=1.0;//测试用可调整为小于1
  let Direction={left:'left',right:'right'};
  let autoDirection=Direction.right;
  let canClick=true;
  export default({
    data:function(){
      return{
        width:'100%',
        top:0,
        ani:true,
        banner:'',
        translateX:'scale('+debugScale+') translateX(0px)',
        imgArray:[
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            imgUrl:'https://image.trc.com/Fnj2mSbPy5Wu4u3UGfuJpGhQwkHT',
            //selected:false,
          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            imgUrl:'https://image.trc.com/FhIbrtgbAygKlpzyvMI90WUanfup',
          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            imgUrl:'https://image.trc.com/FqZ7sl1ghN6Bu4fAFAbQyNDtQ_8Z',
          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            imgUrl:'https://image.trc.com/Ft5uO17J_ftO_AmaMMB6YUf9DcLX',

          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            imgUrl:'https://image.trc.com/FmNf90r7eW0Kk2vIZSHBC73rac2M',
          }
        ],
        itemList:[]
      }
    },
    created() {

    },
    mounted:function(){
      var this_ = this;
      axios.get(types.BANNER+'/1').then(function (data) {
        this_.banner=data.data;
        console.log(this_.banner)
      })
      ani=this.$refs.root.querySelector('.sliderPanel');
      count=this.imgArray.length;
      this.setIndex(selectIndex);
      //自动滚动切换图片
      this.slideAuto(second)


    },
    methods:{
        //左点击
      clickLeft:function(){
        if(!canClick) return false;
        autoDirection=Direction.left;
        this.slideAuto(second);
        this.moveLeftAni();
        canClick=false
      },
      clickRight:function(){
        if(!canClick) return false;
        autoDirection=Direction.right;
        this.slideAuto(second);
        this.moveRightAni();
        canClick=false
      },
      slideRight:function () {
        selectIndex++;
        if(selectIndex+1>count){
          selectIndex=0
        }else if(selectIndex<0){
          selectIndex=count-1
        }
        this.setIndex(selectIndex)
      },
      slideLeft:function () {
        selectIndex&#45;&#45;;
        if(selectIndex+1>count){
          selectIndex=0
        }else if(selectIndex<0){
          selectIndex=count-1
        }
        this.setIndex(selectIndex)
      },
      clickSliderCircle:function (index) {
        this.slideAuto(second);
        this.setIndexPre(index)
      },
      setIndexPre:function (index) {
        if(!canClick) return false;
        canClick=false;
        if(index==selectIndex)return;
        var leftIndex=index;
        var centerIndex=selectIndex;
        var rightIndex=index;
        for(var i=0;i<count;i++){
          if(i==selectIndex){
            this.imgArray[i].selected=true
          }else{
            this.imgArray[i].selected=false
          }
        }
        left=this.imgArray[leftIndex];
        center=this.imgArray[centerIndex];
        right=this.imgArray[rightIndex];
        left=JSON.parse(JSON.stringify(left));
        right=JSON.parse(JSON.stringify(right));
        left.x=-SCREEN_WIDTH;
        center.x=0;
        right.x=SCREEN_WIDTH;
        left.index=leftIndex;
        center.index=centerIndex;
        right.index=rightIndex;
        this.itemList=[left,center,right];
        if(index>selectIndex){
          autoDirection=Direction.right;
          +function(obj){
            obj.anicompted(
              'scale('+debugScale+') translateX('+0+'px)',
              'scale('+debugScale+') translateX('+-SCREEN_WIDTH+'px)',
              function(){
                obj.setIndex(index)
              })
          }(this)
          //右移
        }else if(index<selectIndex){
          //左移
          autoDirection=Direction.left;
          +function(obj){
            obj.anicompted(
              'scale('+debugScale+') translateX('+0+'px)',
              'scale('+debugScale+') translateX('+SCREEN_WIDTH+'px)',
              function(){
                obj.setIndex(index)
              })
          }(this)
        }
      },
      setIndex:function (index) {
        var leftIndex=index-1;
        var centerIndex=index;
        var rightIndex=index+1;
        if(index<=0){
          index=0;
          leftIndex=count-1;
          centerIndex=index;
          rightIndex=index+1;
        }else if(index>=count-1){
          index=count-1;
          leftIndex=index-1;
          centerIndex=index;
          rightIndex=0
        }
        selectIndex=index;
        for(var i=0;i<count;i++){
          if(i==selectIndex){
            this.imgArray[i].selected=true
          }else{
            this.imgArray[i].selected=false
          }
        }
        left=this.imgArray[leftIndex];
        center=this.imgArray[centerIndex];
        right=this.imgArray[rightIndex];
        left.x=-SCREEN_WIDTH;
        center.x=0;
        right.x=SCREEN_WIDTH;
        left.index=leftIndex;
        center.index=centerIndex;
        right.index=rightIndex;
        this.itemList=[left,center,right]
      },
      slideAuto:function () {
        clearInterval(timer);
        +function (obj) {
          timer=setInterval(function () {
            if(autoDirection==Direction.left){
              obj.moveLeftAni()
            }else{
              obj.moveRightAni()
            }
          },second*1000)
        }(this)
      },
      moveLeftAni:function(){
        +function(obj){
          obj.anicompted(
            'scale('+debugScale+') translateX('+0+'px)',
            'scale('+debugScale+') translateX('+SCREEN_WIDTH+'px)',
            function(){
              obj.slideLeft()
            })
        }(this)
      },
      moveRightAni:function(){
        +function(obj){
          obj.anicompted(
            'scale('+debugScale+') translateX('+0+'px)',
            'scale('+debugScale+') translateX('+-SCREEN_WIDTH+'px)',
            function(){
              obj.slideRight()
            })
        }(this)
      },
      anicompted:function(fromStr,toStr,callBack){
        var handler=null,obj=this
        handler=function(){
          ani.removeEventListener('webkitTransitionEnd',handler,false)
          callBack()
          obj.ani=false
          obj.translateX=fromStr
          canClick=true
        }
        ani.removeEventListener('webkitTransitionEnd',handler,false)
        ani.addEventListener('webkitTransitionEnd',handler,false)
        this.ani=true
        this.translateX=toStr
      }
    }

  })

</script>
<style scoped rel="stylesheet/scss" lang="scss" >
  .transitionAni{
    transition: all 0.8s cubic-bezier(.23,1,.32,1);
  }
  .banner-center{
    width: 1200px;
    text-align: center;
    position: relative;
    margin: 0 auto;
    .arrowLeft{
      position: absolute;
      left: 0;
      margin-top: -280px;
      display: block;
      width: 40px;
      height: 100px;
      opacity: 0.5;
    }
    &:hover{
      background: rgba(0,0,0,0.6);
    }

    .arrowRight {
      position: absolute;
      right: 0;
      margin-top: -280px;
      display: block;
      width: 40px;
      height: 100px;
      opacity: 0.5;
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }

    .sliderBar{
      width:100%;
      position: absolute;
      bottom: 20px;
      .circle{
        width: 10px;
        height: 10px;
        background: #d5d8da;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
        transition: all 0.5s ease;
        &:hover{
          background: #C7015C;
          transform: scale(1.15);
        }
      }
      .circleSelected{
        background: #020d12;
        transform: scale(1.15);
      }
    }
  }
  .picbox{
    width: 100%;
    position: absolute;
    overflow: hidden;
    transition: all 0.45s ease;
  }
</style>
-->
<template>
  <div class="shuffling">
    <div class="fouce fl">
      <div class="focus">
        <ul class="showimg">
          <template v-for='(item,index) in shufflingData'>
            <li v-if='shufflingId==index' v-on:mouseover='showPreNext' v-on:mouseout='hiddenPreNext'>
              <a target="_blank" class="img" :href="item.href">
                <img   v-bind:src="item.url"/></a>
              <h3><a target="_blank"  :href="sd.href">{{item.title}}</a></h3>
            </li>
          </template>
        </ul>
        <div class='bullet-pagination'>
          <a class="bullet" v-bind:class="{'active': shufflingId==0}" v-on:click='bulletFunOne'></a>
          <a class="bullet" v-bind:class="{'active': shufflingId==1}" v-on:click='bulletFunTwo'></a>
          <a class="bullet" v-bind:class="{'active': shufflingId==2}" v-on:click='bulletFunThree'></a>
        </div>
        <div v-show='PreNext' class="preNext pre" v-on:mouseover='showPreNext' v-on:mouseout='hiddenPreNext' v-on:click='preFun'></div>
        <div v-show='PreNext' class="preNext next" v-on:mouseover='showPreNext' v-on:mouseout='hiddenPreNext' v-on:click='nextFun'></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
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
