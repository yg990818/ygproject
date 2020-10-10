$(function(){
    (function($,window,document,undefinen){
      $.fn.bannerSwiper=function(option){
        this.default={
          boxWrap:null,//必填
          nextBtn:false,//是否往下启动按钮
          prevBtn:false,//是否往上启动按钮
          autoPlay:false,//是否启动自动播放
          times:3000,//自动轮播的时间间隔,
          speed:600,//点击按钮是切换的速度
          circle:false,//是否启动小圆点
          circleAlign:"center",//小圆点的对其方式
          circleClick:false//小圆点是否可以点击
        }
        var self=this;
        this.time=null;
        this.options=$.extend({},this.default,option);
        self.flag=true;
        // 插件入口
        this.init=function(){
          this.bulid();
        }
        this.bulid=function(){
          var self=this;
          var wrap=self.options.boxWrap;
          self.num=1;
          self.nowTime=+new Date();
          self.width=$(window).width();
          var firstImg=$(wrap).find('li').first();
          var lastImg=$(wrap).find('li').last();
          $(wrap).append(firstImg.clone());
          $(wrap).prepend(lastImg.clone());
          self.length=$(wrap).find('li').length;
          $(wrap).width(self.width*self.length);
          $(wrap).find('li').width(self.width)
          $(wrap).parent().height(480);
          $(wrap).parent().width(self.width);
          $(wrap).css({'left':-self.width*self.num})
          // 是否启动自动轮播
          if(self.options.autoPlay){
            self.plays();
          }
          // 是否启动按钮
          if(self.options.nextBtn){
            self.NextBtn();
          }
          // 是否启动按钮
          if(self.options.prevBtn){
            self.prevBtn();
          }
          // 是否启动小圆点
          if(self.options.circle){
            self.circle()
          }
          if(self.options.circleClick){
            self.clickCircle();
          }
        }
        // // 鼠标移入时
        self.on('mouseenter',function(){
          self.stops();
        })
        // 鼠标移出时
        self.on('mouseleave',function(){
          self.plays(1);
        })
        // 开始计时器，自动轮播
        this.plays=function(){
          var self=this;
          // self.stops();
          console.log('play')
          this.time=setInterval(function(){
            self.go(-self.width)
          },self.options.times);
        }
        // 停止计时器
        this.stops=function(){
          console.log('stop');
          clearInterval(self.time)
        }
        // 手动创建按钮元素
        this.prevBtn=function(){
          var self=this;
          var ele=$("<a href='javascript:;' id='prevBtn'><</a>");
          self.append(ele);
          $('#prevBtn').bind("click",function(){
            self.go(self.width);
          })
        }
        // 手动创建按钮元素
        this.NextBtn=function(){
          var self=this;
          var ele=$("<a href='javascript:;' id='nextBtn'>></a>");
          self.append(ele)
          $('#nextBtn').bind("click",function(){
            self.go(-self.width);
          })
        }
        // 手动创建小圆点
        this.circle=function(){
          var self=this;
          var ele=$('<div id="circle-wrap"></div>');
          for(var i=0;i<self.length-2;i++){
            $('<a class="dot" href="javascript:;" rel="external nofollow" ></a>').appendTo(ele)
          }
          ele.css({
            "position":"absolute",
            'bottom':'0',
            'right':'0',
            'left':'0',
            'height':'20px',
            "padding":"0 10px",
            'text-align':self.options.circleAlign
          });
          self.append(ele);
          self.playCircle(this.num-1);
        }
        //小圆点指定当前项
        this.playCircle=function(num){
          $('#circle-wrap').find('.dot').eq(num).addClass('on').siblings().removeClass('on');
        }
        // 点击小圆点
        this.clickCircle=function(){
          var self=this;
          $('#circle-wrap').find('.dot').on('click',function(){
            self.num=$(this).index()+1;
            self.circlePlay()
          })
        }
        // 点击小圆点，图片切换
        this.circlePlay=function(){
          self.flag=true;
          if(self.flag){
            self.flag=false;
            $(self.options.boxWrap).stop().animate({
              'left':-self.num*self.width
            },self.options.speed,function(){
              self.flag=true;
            });
          }
          self.playCircle(this.num-1);
        }
        // 点击按钮，进行轮播,以及自动轮播
        this.go=function(offset){
          var self=this;
          if(self.flag){
            self.flag=false;
             if(offset<0){
               self.num++;
               if(self.num>self.length-2){
                 self.num=1;
               }
             }
             if(offset>0){
               self.num--;
               if(self.num<=0){
                self.num=self.length-2
               }
             }
             if(Math.ceil($(self.options.boxWrap).position().left)<-(self.length-2)*self.width){
              $(self.options.boxWrap).css({
                'left':-self.width
              });
            }
            if(Math.ceil($(self.options.boxWrap).position().left)>-self.length){
              $(self.options.boxWrap).css({
                'left':-self.width*(self.length-2)
              })
            }
            self.playCircle(this.num-1);
            $(self.options.boxWrap).stop().animate({
              'left':$(self.options.boxWrap).position().left+offset
            },self.options.speed,function(){
              self.flag=true;
            });
          }
        }
        this.init();
      }
    })(jQuery,window,document)
    $('#banner').bannerSwiper({
      boxWrap:"#banner-wrap",
      nextBtn:true,
      prevBtn:true,
      autoPlay:true,
      circle:true,
      circleClick:true
    })
  })
 