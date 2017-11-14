var wmsLayer;
var zoomMin = 1;
var zoomMax = 18;
var layerEarth;
var planner;
var maps;
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

var Layers = {
    aDomAry: [],
    finitial:function(){//初始化
        // 获取元素
        if (this.aDomAry.length < 2) {
            this.aDomAry = fGetElement("layers");
        }
        this.childLiClick();
    },
    childLiClick:function(){//li的点击事件
        layerEarth=$(this.aDomAry).find('li.layer_earth');
        planner=$(this.aDomAry).find('li.planner');
        $(layerEarth).off('click').on('click',function(){
            // 删除添加的图层
            var addLayers=$("#map").find('div.tdt-map-pane>div.tdt-tile-pane>div');
            for(var j=0;j<addLayers.length;j++){
                if($($(addLayers)[j])){
                    $($(addLayers)[j]).remove();
                }
            }
            var imageURL = "https://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}";
            //创建自定义图层对象
            var maplay_base = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomNormal});
            //将图层增加到地图上
            map.addLayer(maplay_base);
            var imageURL = "https://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}";
            var maplay_text = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomNormal});
            //将图层增加到地图上
            map.addLayer(maplay_text);
            if(!$(planner).hasClass('planner_selected')){
                $(planner).attr('style','').addClass('planner_selected');
                $(layerEarth).attr('style','border: 1px solid #ff0000;color:#169bd5;');
            }else{
                $(planner).attr('style','display:none').removeClass('planner_selected');
                $(layerEarth).attr('style','');
            }
        })
        $(layerEarth).mouseenter(function(){
            if(!$(planner).hasClass('planner_selected')){
                $(planner).attr('style','').addClass('planner_selected');
                $(layerEarth).attr('style','border: 1px solid #ff0000;color:#169bd5;');
            }else{
                $(planner).attr('style','display:none').removeClass('planner_selected');
                $(layerEarth).attr('style','');
            }
        });
        $(planner).off('click').on('click',function(){
            // 删除添加的图层
            var addLayers=$("#map").find('div.tdt-map-pane>div.tdt-tile-pane>div');
            for(var j=0;j<addLayers.length;j++){
                if($($(addLayers)[j])){
                    $($(addLayers)[j]).remove();
                }
            }
            var imageURL = "http://t0.tianditu.cn/img_w/wmts?" +
                "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
            //创建自定义图层对象
            var maplay_base = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomMax});
            //将图层增加到地图上
            map.addLayer(maplay_base);

            var imageURL = "http://t0.tianditu.cn/cia_w/wmts?" +
                "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
            //创建自定义图层对象
            var maplay_text = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomMax});
            //将图层增加到地图上
            map.addLayer(maplay_text);

            $(this).attr('style','display:none');
            if($(layerEarth).attr('style')){
                $(layerEarth).attr('style','');
            }
        })
        $(planner).mouseleave(function(){
            $(this).attr('style','display:none');
            if($(layerEarth).attr('style')){
                $(layerEarth).attr('style','');
            }
        });
    }
}

Layers.finitial();