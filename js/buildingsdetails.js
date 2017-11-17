var map;
var zoomNormal = 14;
var zoomZone = 16;
var zoomMax = 18;
var YKlng = 119.92;
var YKlat = 31.02;
// 获取元素
function fGetElement() {
    var c = new Array();
    for (var b = 0; b < arguments.length; b++) {
        var a = arguments[b];
        // 判断是否是字符串类型
        if (typeof a == "string") {
            // 获取a
            a = document.getElementById(a)
        }
        if (arguments.length == 1) {
            return a;
        }
        c.push(a);
    }
    return c;
} 
//布局控制
var TLayoutControl = {
    // nMapH 地图的高度
    // nMapW地图宽度
    // nMapMinWidth 地图的最小宽度
    oMap: null, oFullScreen: null, nMapH: 0
    , nMapW: 0, aDomAry: [], nMapMinWidth:1059, nMapMaxWidth:1059 
    , fInitLayout: function () {//初始化布局
        var b = this;
        // 窗口的文档显示区的宽度 window.innerWidth
        if (window.innerWidth) {
            this.nMapW = window.innerWidth;
        } else { //ie（兼容）中获取窗口的文档显示区的宽度
            if ((document.body) && (document.body.clientWidth)) {
                this.nMapW = document.body.clientWidth;
            }
        }
        if (window.innerHeight) {
            this.nMapH = window.innerHeight;
        } else {
            //clientHeight页面浏览器中可以看到内容的这个区域的高度
            if ((document.body) && (document.body.clientHeight)) {
                this.nMapH = document.body.clientHeight;
            }
        }
        // ie(兼容) 获取可视区域的高宽
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            this.nMapH = document.documentElement.clientHeight;
            this.nMapW = document.documentElement.clientWidth;
        }
        // 获取元素
        if (this.aDomAry.length < 4) {
            this.aDomAry = fGetElement("buildingsdetailsmap","chart","buildings_picts");
        }
        this.oMap = this.aDomAry[0];
        // 地图最大宽度限制 shezhi?
        if(this.nMapW < this.nMapMinWidth){
            this.oMap.style.width = parseInt(parseInt(this.nMapMinWidth) *0.9) + "px";
        }else{
            this.oMap.style.width = parseInt(parseInt(this.nMapW) *0.82) + "px";
        }
        
        this.oMap.style.height =this.nMapH + "px";
        this.chart();
        this.carouselSmall();
        this.carouselBig();
        this.pictureClick();
    },
    fWinResizeHandle: function () {//调整可视框大小
        this.fInitLayout();//初始化
        // 查找方法有
        if(typeof map.checkResize == 'function'){
            map.checkResize();//通用针对两个版本 通知地图其容器大小已更改。在更改了容器对象的大小后调用此方法，以便地图能够调整自己适合于新的大小。
        }else{
            return;
        }
    },
    chart:function(){//折线图
        //基于准备好的Dom，初始化echarts实例
        var myChart=echarts.init(document.getElementById("chart"));

        var dataX=['2017-05','2017-06','2017-07','2017-08','2017-09','2017-10'];
        var data=[10500,10500,10500,10500,10500,10500];

        var option={
            //提示
            tooltip:{
                trigger:'axis'
            },
            //x轴
            xAxis:{
                data:dataX,
                axisLabel:{ 
                    textStyle:{ fontSize:15} 
                },
                axisTick:{
                    alignWithLabel:true
                }
            },
            yAxis:{
                name:'元/m²',
                nameTextStyle:{
                    fontSize:15
                },
                type:'value',
                interval:4,
                scale: true,
                min:10490,
                max:10510,
                axisLabel:{ 
                    textStyle:{ fontSize:15} 
                },
                axisTick:{
                    interval:10
                }
            },
            //数据
            series:[{
                type:'line',
                symbolSize:10,
                data:data,
                lineStyle:{
                    normal:{
                        color:'#61bf04'
                    }
                },
                itemStyle:{
                    normal:{
                        color:'#61bf04'
                    }
                }
            }]
        }
        //使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    },
    carouselSmall:function(){//简单图片轮播
        var index=0;
        var length=$("#img img").length;
        var i=1;
        
        //关键函数：通过控制i ，来显示图片
        function showImg(i){
            $("#img img")
                .eq(i).stop(true,true).fadeIn(800)
                .siblings("img").hide();
            $("#cbtn li")
                .eq(i).addClass("hov")
                .siblings().removeClass("hov");
        }
        
        function slideNext(){
            if(index >= 0 && index < length-1) {
                 ++index;
                 showImg(index);
            }else{
                showImg(0);
                index=0;
                i=1;
            }                         
            i++;
        }
         
        function slideFront(){
           if(index >= 1 ) {
                --index;
                showImg(index);
            }
            i--;
        }   
        $("#img img").eq(0).show();
        $("#cbtn li").eq(0).addClass("hov");
    
        $(".picSildeRight,#next").click(function(){
            slideNext();
        })
        $(".picSildeLeft,#front").click(function(){
            slideFront();
        })
        $("#cbtn li").click(function(){
            index  =  $("#cbtn li").index(this);
            showImg(index);
        }); 
        $("#next,#front").hover(function(){
            $(this).children("a").fadeIn();
        },function(){
            $(this).children("a").fadeOut();
        })
    },
    carouselBig:function(){//复杂图片轮播
        var index=0;
        var length=$("#imgAll img").length;
        var i=1;
        //关键函数：通过控制i ，来显示图片
        function showImg(i){
            var str="<span class='page_current'>"+(i+1)+"</span>/"+length;
            var strStatus='在售';
            $("#imgAll img")
                .eq(i).stop(true,true).fadeIn(800)
                .siblings("img").hide();
            $("#thumbnail li")
                .eq(i).addClass("hov")
                .siblings().removeClass("hov");
            $("#text_icon>tt").html(str);
            $("#imgAll>div.sell_status").html(strStatus);
        }
        showImg(0);
        function slideNext(){
            if(index >= 0 && index < length-1) {
                 ++index;
                 showImg(index);
            }else{
                if(index == length-1){
                    showImg(0);
                    index=0;
                    aniPx=(length-5)*142+'px'; //所有图片数 - 可见图片数 * 每张的距离 = 最后一张滚动到第一张的距离
                    $("#thumbnailAll ul").animate({ "left": "+="+aniPx },200);
                    i=1;
                }
                return false;
            }
            if(i<0 || i>length-5) {return false;}                         
            $("#thumbnailAll ul").animate({ "left": "-=142px" },200)
            i++;
        }
         
        function slideFront(){
           if(index >= 1 ) {
                 --index;
                 showImg(index);
            }
            if(i<2 || i>length+5) {return false;}
                   $("#cSlideUl ul").animate({ "left": "+=142px" },200)
                   i--;
        }   
        $("#imgAll img").eq(0).show();
        $("#thumbnail li").eq(0).addClass("hov");
        
        $(".pictsSildeRight,#nextOne").off('click').on("click",function(){
            slideNext();
        })
        $(".pictsSildeLeft,#prevOne").off('click').on("click",function(){
            slideFront();
        })
        $("#thumbnail li").on("click",function(){
            index  =  $("#thumbnail li").index(this);
            showImg(index);
        }); 
    },
    pictureClick:function(){//楼盘相册展开
        var picts=this.aDomAry[2];
        var pict=$(picts).find('div.picts_show>ul>li.picture');
        var carousel=$(picts).children('div.pictsHide');
        var deleteBtn=$(picts).find('i.delete_i');
        // 打开轮播图
        for(var i=0;i<pict.length;i++){
            !(function(i){
                $($(pict)[i]).on('click',function(){
                    if($(carousel).attr('style')){
                        $(carousel).attr('style','');
                    }
                });
            }(i))
        }
        // 隐藏轮播图
        $(deleteBtn).on('click',function(){
            if(!$(carousel).attr('style')){
                $(carousel).attr('style','display:none');
            }
        });
    }
};
// 初始化布局
TLayoutControl.fInitLayout();
// 地图大小调整时调用
window.onresize = function () {
    // ie中长宽不变就跳出
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        var a = document.documentElement.clientHeight;
        var b = document.documentElement.clientWidth;
        if (b === TLayoutControl.nLayoutWidth && a === TLayoutControl.nLayoutHeight) {
            return;
        }
    }
    TLayoutControl.fWinResizeHandle();
};

function loadbuildingsdetailsmap() {
    //初始化地图对象 
    map = new T.Map("buildingsdetailsmap");
    //设置显示地图的中心点和级别 
    map.centerAndZoom(new T.LngLat(YKlng, YKlat), zoomNormal);
    // 缩放控件的配置
    var config={
        position:T_ANCHOR_BOTTOM_RIGHT,//  控件初始位置，在四角位置之一。
        zoomInText:"+",// 放大层级按钮的文字显示。
        zoomOutText:"-",// 缩小层级按钮的文字显示。
        zoomInTitle:"放大",// 放大层级按钮的标题显示。
        zoomOutTitle:"缩小"
    };
    //创建一个地图缩放控件。
    var control=new T.Control.Zoom(config);
    // // 添加控件
    map.addControl(control);
}

