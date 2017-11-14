var pict_nums=[],marker_tlnglat_nums=[],config_tlnglat_nums=[],
    config_text=[],label_nums=[],infoclick_tlnglat_nums=[];
function buildingsMapInfo(infos){
	//详细信息输出框
    //创建图片对象
    pict_nums=['marker1.png','marker2.png','marker3.png'];
    marker_tlnglat_nums=[["119.92","31.025"],['119.945','31.029'],['119.905','31.02']];
    config_tlnglat_nums=[['119.9175','31.0279'],['119.9435','31.0322'],['119.9025','31.0229']];
    config_text=['楼盘1','民居2','商户3'];
    infoclick_tlnglat_nums=[['119.92','31.027'],['119.945','31.031'],['119.905','31.022']];
    for(var i=0,j=0;i<pict_nums.length,j<pict_nums.length;i++,j++){
        var icon,marker,config,label,lnglats;
        //创建图片对象
        icon='icon'+j;
        icon=new T.Icon({
            iconUrl: "./images/"+pict_nums[i],
            iconSize: new T.Point(19, 27),
            iconAnchor: new T.Point(9, 27)
        });
        //创建标注对象
        marker='marker'+j;
        lnglats=new T.LngLat(marker_tlnglat_nums[i][0],marker_tlnglat_nums[i][1]);
        marker = new T.Marker(lnglats,{icon:icon});
        //向地图上添加标注
        map.addOverLay(marker);

        // 设置配置信息
        config = {
            text:config_text[i],
            offset:new T.Point(-35,-35),
            position:lnglats
        };
        //创建地图文本对象
        var label = new T.Label(config);
        //创建地图文本对象
        map.addOverLay(label);

        // 给标注对象绑定点击事件 
        !function(marker,lnglats,i){
            // 修改提示文本样式
            $('.tdt-pane .tdt-overlay-pane').children('div').each(function(index,val){
                $(val).removeClass('tdt-label').css({
                    'color': '#000000',
                    'z-index': '500',
                    'font-size': '16px',
                    'white-space': 'nowrap',
                    'position': 'absolute',
                    'font-weight':'bold'
                });
            });

            marker.addEventListener("click",function(){
                var point = lnglats;
                var html='';
                html+="名称："+infos[i].tradeName+"<br/>均价："+infos[i].unitPrice+"。";
                var markerInfoWin = new T.InfoWindow(html,{offset:new T.Point(0,-40)}); // 创建信息窗口对象
                map.openInfoWindow(markerInfoWin,point); //开启信息窗口
            });
        }(marker,lnglats,i)
    }
}
