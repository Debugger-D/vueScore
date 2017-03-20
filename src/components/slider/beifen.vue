<!--
<template>
  <div ref="root" style="user-select: none;-webkit-user-select: none;overflow: hidden">
    <div  class="sliderPanel"
          :class="{transitionAni:ani}"
          :style="{transform:translateX}">
      <div v-for="item in itemList" class="verticalCenter picbox" :style="{left:item.x+'px'}">
        <img  :style="{width:width,top:top}"  :src="item.url" style="min-height: 100%">
      </div>
    </div>
    <div @click="clickLeft" class="arrowLeft verticalCenter horizaCenter">
      <img src="http://www.trc.com/themes/luckymall/images/store/btn-right1.png" style="transform: rotate(180deg)">
    </div>
    <div @click="clickRight" class="arrowRight verticalCenter horizaCenter">
      <img src="http://www.trc.com/themes/luckymall/images/store/btn-right1.png">
    </div>
    <div class="arrowBottom verticalCenter horizaCenter" >
      <img src="http://www.trc.com/themes/luckymall/images/store/btn-right1.png" style="transform: rotate(90deg) scale(0.7)">
    </div>
    <div class="sliderBar horizaCenter">
      <div v-for="(item,index) in imgArray" @click="clickSliderCircle(index)"  class="circle" :class="{circleSelected:item.selected}">
      </div>
    </div>
  </div>
</template>
<script>
  const SCREEN_WIDTH=document.body.clientWidth
  //const SCREEN_HEIGHT=document.body.scrollHeight
  var left,center,right
  var selectIndex=0
  var count=0
  var second=3//slider 时间间隔
  var timer=null
  var ani=null
  var debugScale=1.0//测试用可调整为小于1
  var Direction={left:'left',right:'right'};
  var autoDirection=Direction.right
  var canClick=true
  export default({
    data:function(){
      return{
        width:'100%',
        height:'460px',
        top:0,
        ani:true,
        translateX:'scale('+debugScale+') translateX(0px)',
        imgArray:[
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            url:'https://image.trc.com/Fnj2mSbPy5Wu4u3UGfuJpGhQwkHT',
            //selected:false,
          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            url:'https://image.trc.com/FhIbrtgbAygKlpzyvMI90WUanfup',
          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            url:'https://image.trc.com/FqZ7sl1ghN6Bu4fAFAbQyNDtQ_8Z',
          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            url:'https://image.trc.com/Ft5uO17J_ftO_AmaMMB6YUf9DcLX',

          },
          {
            //x:0,
            click_url:'http://www.berrygenomics.com/products/nextseq-cn500/cn500test/',
            url:'https://image.trc.com/FmNf90r7eW0Kk2vIZSHBC73rac2M',
          }
        ],
        itemList:[]
      }
    },
    mounted:function(){
      ani=this.$refs.root.querySelector('.sliderPanel')
      count=this.imgArray.length
      this.setIndex(selectIndex)
      //自动滚动切换图片
      this.slideAuto(second)
    },
    methods:{
      clickLeft:function(){
        if(!canClick) return false
        autoDirection=Direction.left
        this.slideAuto(second)
        this.moveLeftAni()
        canClick=false
      },
      clickRight:function(){
        if(!canClick) return false
        autoDirection=Direction.right
        this.slideAuto(second)
        this.moveRightAni()
        canClick=false
      },
      slideRight:function () {
        selectIndex++
        if(selectIndex+1>count){
          selectIndex=0
        }else if(selectIndex<0){
          selectIndex=count-1
        }
        this.setIndex(selectIndex)
      },
      slideLeft:function () {
        selectIndex&#45;&#45;
        if(selectIndex+1>count){
          selectIndex=0
        }else if(selectIndex<0){
          selectIndex=count-1
        }
        this.setIndex(selectIndex)
      },
      clickSliderCircle:function (index) {
        this.slideAuto(second)
        this.setIndexPre(index)
      },
      setIndexPre:function (index) {
        if(!canClick) return false
        canClick=false
        if(index==selectIndex)return
        var leftIndex=index
        var centerIndex=selectIndex
        var rightIndex=index
        for(var i=0;i<count;i++){
          if(i==selectIndex){
            this.imgArray[i].selected=true
          }else{
            this.imgArray[i].selected=false
          }
        }
        left=this.imgArray[leftIndex]
        center=this.imgArray[centerIndex]
        right=this.imgArray[rightIndex]
        left=JSON.parse(JSON.stringify(left))
        right=JSON.parse(JSON.stringify(right))
        left.x=-SCREEN_WIDTH
        center.x=0
        right.x=SCREEN_WIDTH
        left.index=leftIndex
        center.index=centerIndex
        right.index=rightIndex
        this.itemList=[left,center,right]
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
        var leftIndex=index-1
        var centerIndex=index
        var rightIndex=index+1
        if(index<=0){
          index=0
          leftIndex=count-1
          centerIndex=index
          rightIndex=index+1
        }else if(index>=count-1){
          index=count-1
          leftIndex=index-1
          centerIndex=index
          rightIndex=0
        }
        selectIndex=index
        for(var i=0;i<count;i++){
          if(i==selectIndex){
            this.imgArray[i].selected=true
          }else{
            this.imgArray[i].selected=false
          }
        }
        left=this.imgArray[leftIndex]
        center=this.imgArray[centerIndex]
        right=this.imgArray[rightIndex]
        left.x=-SCREEN_WIDTH
        center.x=0
        right.x=SCREEN_WIDTH
        left.index=leftIndex
        center.index=centerIndex
        right.index=rightIndex
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
<style scoped>
  .transitionAni{
    transition: all 0.8s cubic-bezier(.23,1,.32,1);
    /*transition: transform 1s;*/
  }
  .sliderPanel{
    height: 460px;
  }
  .arrowLeft{
    transition: all 0.4s ease;
    width: 60px;
    height: 60px;
    position: absolute;
    left: 15px;
    top: 50%;
    margin-top: -30px;
    background: rgba(0,0,0,0.6);
    border-radius: 6px;
  }
  .arrowLeft:hover{
    background: rgba(0,0,0,0.8);
    transform: scale(1.1);
  }
  .arrowRight{
    transition: all 0.4s ease;
    width: 60px;
    height: 60px;
    position: absolute;
    right: 15px;
    top: 50%;
    margin-top: -30px;
    background: rgba(0,0,0,0.6);
    border-radius: 6px;
  }
  .arrowRight:hover{
    background: rgba(0,0,0,0.8);
    transform: scale(1.1);
  }
  .sliderBar{
    width:100%;height: auto;position: absolute;bottom: 50px;
  }
  .circle{
    width: 15px;
    height: 15px;
    background: rgba(0,0,0,0.7);
    border-radius: 50%;
    display: table-cell;
    margin-right: 3px;
    transition: all 0.5s ease;
  }
  .circle:hover{
    background: #C7015C;
    transform: scale(1.15);
  }
  .circleSelected{
    background: #C7015C;
    transform: scale(1.15);
  }
  .arrowBottom{
    width: 80px;
    height: 50px;
    position: absolute;
    bottom: -15px;
    left: 50%;
    margin-left: -40px;
    background: #C7015C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: all 0.5s ease-out;
  }
  .arrowBottom:hover{
    transform: translateY(-10px);
    background: deeppink;
  }
  .picbox{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
    transition: all 0.45s ease;
  }
</style>
-->
