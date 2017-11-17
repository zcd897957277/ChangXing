// 条件项中条件的选择、压力预警
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

var SearchItem = {
    aDomAry: [],lis:null,inputUserDefined:null,
    clearBtn:null,sureBtn:null,span:null,div:null,rst:null,
    btn:null,nav:null,statist:null,statistLis:null,statistInputs:null,
    switchBar:null,statisticalBtn:null,pressureWarning:null,pressure:null,
    pressureInput:null,transactionMonitoring:null,transaction:null,
    content:null,
    finit:function(){//初始化
    	// 获取元素
        if (this.aDomAry.length < 12) {
            this.aDomAry = fGetElement("search","result","statistics","map","allCustomManagement","switchBar","pressure_warning","pressure","transaction_monitoring","transaction","content");
        }
        this.lis=$(this.aDomAry[0]).children('div.condition_item').children('div.searchbox_condition').find('li.condition>ul.alllines>li');
        this.inputUserDefined=$(this.aDomAry[0]).children('div.condition_item').children('div.searchbox_condition').find('li.condition>div.input_user_defined>input');
       	this.clearBtn=$(this.aDomAry[0]).children('div.condition_item').children('div.btns').children('div.clear_btn');
        this.sureBtn=$(this.aDomAry[0]).children('div.condition_item').children('div.btns').children('div.sure_btn');
        this.statisticalBtn=$(this.aDomAry[0]).children('div.condition_item').children('div.btns').children('div.statistical_btn');
        this.span=$(this.aDomAry[0]).children('div.searchbox_nav').children('span');
    	this.div=$(this.aDomAry[0]).children('div.condition_item');
    	this.rst=$(this.aDomAry[1]);
    	this.statist=$(this.aDomAry[2]);
        this.nav=$(this.aDomAry[0]).children('div.searchbox_nav');
        this.map=$(this.aDomAry[3]);
        this.statistLis=$(this.aDomAry[2]).find('ul.alllines>li');
        this.statistInputs=$(this.aDomAry[2]).find('div.input_user_defined>input.set_input');
        this.customManagements=$(this.aDomAry[4]).children('div');
        this.switchBar=$(this.aDomAry[5]);
        this.pressureWarning=$(this.aDomAry[6]);
        this.pressure=$(this.aDomAry[7]);
        this.pressureInput=$(this.aDomAry[7]).find('div.input_user_defined>input.set_input');
        this.transactionMonitoring=$(this.aDomAry[8]);
        this.transaction=$(this.aDomAry[9]);
        this.transactionInput=$(this.aDomAry[9]).find('div.input_user_defined>input.set_input');
        this.content=$(this.aDomAry[10]);
        this.searchLiClick();
        this.btnsClick();
    	this.transNav();
        this.transPoints();
        this.pressureClick();
        this.transactionClick();
        this.switchLayer();
        this.filp();
    },
    searchLiClick:function(){//搜索条件中li的选择
    	var Thislis=this.lis;
    	for(var i=0;i<(Thislis).length;i++){
    		!(function(i){
    			$($(Thislis)[i]).on('click',function(){
                    if($($(Thislis)[i]).hasClass('population_li')){
                        if(($($(Thislis)[i]).hasClass('small_line') || $($(Thislis)[i]).hasClass('normal_line') || $($(Thislis)[i]).hasClass('sbig_line') || $($(Thislis)[i]).hasClass('big_line'))&&!$($(Thislis)[i]).hasClass('line_selected')){
                            $($(Thislis)[i]).siblings().removeClass('line_selected');
                            $($(Thislis)[i]).addClass('line_selected');
                        }
                    }else{
                        if(($($(Thislis)[i]).hasClass('small_line') || $($(Thislis)[i]).hasClass('normal_line') || $($(Thislis)[i]).hasClass('sbig_line') || $($(Thislis)[i]).hasClass('big_line'))&&!$($(Thislis)[i]).hasClass('line_selected')){
                            $($(Thislis)[i]).addClass('line_selected');
                        }else if(($($(Thislis)[i]).hasClass('small_line') || $($(Thislis)[i]).hasClass('normal_line') || $($(Thislis)[i]).hasClass('sbig_line') || $($(Thislis)[i]).hasClass('big_line'))&&$($(Thislis)[i]).hasClass('line_selected')){
                            $($(Thislis)[i]).removeClass('line_selected');
                        }
                    }		
	    		});
    		}(i))
    	}
    },
    btnsClick:function(){//按钮组设置：三按钮
        var clearBtn=this.clearBtn;
        var sureBtn=this.sureBtn;
        var statisticalBtn=this.statisticalBtn;
        var Thislis=this.lis;
        var Thisinput=this.inputUserDefined;
        var rst=this.rst;
        var statist=this.statist;
        var statistLis=this.statistLis;
        var statistInputs=this.statistInputs;
        var customManagements=this.customManagements;
        var div=this.div;
        var nav=$(this.nav).children('span');
        
        $(sureBtn).on('click',function(){
            var dataAll=[];
        	if(Thislis){
        		for(var i=0;i<(Thislis).length;i++){
	        		if($($(Thislis)[i]).hasClass('line_selected')){
	        			dataAll.push($($(Thislis)[i]).attr('data'));
                        $($(Thislis)[i]).removeClass('line_selected');
                        $($(Thislis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected');
	        		}
	        	}
        	}
        	if(Thisinput){
        		for(var j=0;j<(Thisinput).length;j++){
	        		if($($(Thisinput)[j]).val()){
	        			dataAll.push($($(Thisinput)[j]).attr('data')+':'+$($(Thisinput)[j]).val());
                        $($(Thisinput)[j]).val('');
	        		}
	        	}
        	}

        	var span=this.span;
        	var div=this.div;
        	var rst=this.rst;
        	$(span).removeClass('searchbox_nav_off').addClass('searchbox_nav_show');
        	$(div).attr('style','display:none');//隐藏

        	//清空地图上的图标
        	var map=this.map;
        	var divs=$(map).children('div.tdt-map-pane').children('div');
        	for(var i=1;i<(divs).length;i++){
                if(i==2){
                    $($(divs)[i]).children('div').remove();
                    $($(divs)[i]).children('svg').children('g').empty();
                }else{
                    $($(divs)[i]).empty();
                }
            }
            // console.log(dataAll)
            
            if(rst && !$(sureBtn).hasClass('population_sure_btn')){
                $(rst).attr('style','');//显示
                // 土地圈定图
                var landInfo=[
                    {
                        'landId':'1001',
                        'landPosition':'长兴区',
                        'landNature':'商业',
                        'landArea':'500',
                        'startPrice':'120',
                        'currentPrice':'200',
                        'competitionMan':'张三',
                        'sellTime':'2017-11-7'
                    },
                    {
                        'landId':'1002',
                        'landPosition':'长兴区',
                        'landNature':'居住',
                        'landArea':'200',
                        'startPrice':'300',
                        'currentPrice':'360',
                        'competitionMan':'李四',
                        'sellTime':'2017-11-7'
                    },
                    {
                        'landId':'1003',
                        'landPosition':'长兴区',
                        'landNature':'商住',
                        'landArea':'300',
                        'startPrice':'400',
                        'currentPrice':'500',
                        'competitionMan':'王五',
                        'sellTime':'2017-11-7'
                    }
                ]
                if(typeof landMapInfo === 'function' ){
                    landMapInfo(landInfo);
                }
                // 房屋圈定图
                var buildingsInfo=[
                    {
                        'tradeName':'绿城玉兰花园一期',
                        'unitPrice':'10000元/m²'
                    },
                    {
                        'tradeName':'绿城玉兰花园二期',
                        'unitPrice':'16000元/m²'
                    },
                    {
                        'tradeName':'绿城玉兰花园三期',
                        'unitPrice':'8000元/m²'
                    }
                ];
                if(typeof buildingsMapInfo === 'function' ){
                    buildingsMapInfo(buildingsInfo);
                }
            }else{
                hotTMap();
            }

        }.bind(this))

        $(clearBtn).on('click',function(){
        	if(Thislis){
        		for(var i=0;i<(Thislis).length;i++){
	        		if($($(Thislis)[i]).hasClass('line_selected')){
	        			$($(Thislis)[i]).removeClass('line_selected');
                        $($(Thislis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected');
	        		}
	        	}
        	}
        	if(Thisinput){
        		for(var j=0;j<(Thisinput).length;j++){
	        		if($($(Thisinput)[j]).val()){
	        			$($(Thisinput)[j]).val('');
	        		}
	        	}
        	}
        });

        $(statisticalBtn).on('click',function(){
            if(div){
                $(div).attr('style','display:none');
            }
            if($(nav).hasClass('searchbox_nav_off')){
                $(nav).removeClass('searchbox_nav_off').addClass('searchbox_nav_show');
            }
            if(rst){
                $(rst).attr('style','display:none');
            }
            if(Thislis){
                for(var i=0;i<(Thislis).length;i++){
                    if($($(Thislis)[i]).hasClass('line_selected')){
                        $($(Thislis)[i]).removeClass('line_selected');
                        $($(Thislis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected');
                    }
                }
            }
            if(Thisinput){
                for(var j=0;j<(Thisinput).length;j++){
                    if($($(Thisinput)[j]).val()){
                        $($(Thisinput)[j]).val('');
                    }
                }
            }
            if(!$(statist).attr('style')){
                // 清除数据
                if(statistLis){
                    for(var i=0;i<(statistLis).length;i++){
                        if($($(statistLis)[i]).hasClass('line_selected')){
                            $($(statistLis)[i]).removeClass('line_selected');
                            $($(statistLis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected');
                        }
                    }
                }
                if(statistInputs){
                    for(var j=0;j<(statistInputs).length;j++){
                        if($($(statistInputs)[j]).val()){
                            $($(statistInputs)[j]).val('');
                        }
                    }
                }
                if(customManagements){
                    // 关闭自定义管理弹窗
                    for(var n=0;n<customManagements.length;n++){
                        var maindiv=$($(customManagements)[n]).children('div:first');
                        var modeSet=$($(customManagements)[n]).children('div:last');
                        if(!$(maindiv).attr('style')){
                            $(maindiv).attr('style','display:none');
                        }
                        if(!$(modeSet).attr('style')){
                            $(modeSet).attr('style','display:none');
                        }
                    }
                }                
            }else{
                $(statist).attr('style','');
            }
        });
    },
    transNav:function(){//nav的切换
    	var nav=this.nav;
    	var span=this.span;
    	var div=this.div;
    	var rst=this.rst;
    	$(nav).on('click',function(){
    		if($(span).hasClass('searchbox_nav_off')){
				$(span).removeClass('searchbox_nav_off').addClass('searchbox_nav_show');
				$(div).attr('style','display:none');
			}else if($(span).hasClass('searchbox_nav_show')){
				$(span).removeClass('searchbox_nav_show').addClass('searchbox_nav_off');
				$(div).attr('style','');
				if(!$(rst).attr('style')){
					$(rst).attr('style','display:none');
				}
			}
    	});
    },
    transPoints:function(){//房屋、土地、人口之间的切换
        var switchBar=this.switchBar;
        var div=$(switchBar).find('div.switchs>div.switch_selected');
        var ul=$(switchBar).find('div.switchs>ul.switch_items');
        var span=$(div).children('span:last');
        $(div).on('click',function(){
            if($(span).hasClass('dropDownBox')){
                $(span).removeClass('dropDownBox').addClass('dropUpBox');
                if(!$(ul).attr('style')){
                    $(ul).attr('style','display:none');
                }
            }else if($(span).hasClass('dropUpBox')){
                $(span).removeClass('dropUpBox').addClass('dropDownBox');
                if($(ul).attr('style')){
                    $(ul).attr('style','');
                }
            }
        });
    },
    pressureClick:function(){//压力预警
        var pressureWarning=this.pressureWarning;
        var pressure=this.pressure;
        var pressure_inputs=this.pressureInput;
        var deleteBtn=$(pressure).children('i.delete_icon');
        var pressureSubmit=$(pressure).children('div.pressure_submit_btn');
        if(pressureWarning){
            $(pressureWarning).on('click',function(){
                if(pressure){
                    $(pressure).attr('style','');
                }
            });
        }
        if(deleteBtn){
            $(deleteBtn).on('click',function(){//压力预警删除
                for(var i=0;i<pressure_inputs.length;i++){
                    if($($(pressure_inputs)[i]).val()){
                        $($(pressure_inputs)[i]).val('');
                    }
                }
                if(!$(pressure).attr('style')){
                    $(pressure).attr('style','display:none');
                }
            });
        }
        if(pressureSubmit){
            $(pressureSubmit).on('click',function(){//提交
                var pressureData=[];
                for(var i=0;i<pressure_inputs.length;i++){
                    if($($(pressure_inputs)[i]).val()){
                        pressureData.push(
                            $($(pressure_inputs)[i]).attr('data')+':'+$($(pressure_inputs)[i]).val()
                        );
                        $($(pressure_inputs)[i]).val('');
                    }
                }
                if(!$(pressure).attr('style')){
                    $(pressure).attr('style','display:none');
                }
                // 随意图表
                var jspanel=$('div.jsPanel');
                if(jspanel){
                    $(jspanel).remove();
                    showECharts();
                }else{
                    showECharts();
                }
                // console.log(pressureData)
            });
        }
    },
    transactionClick:function(){//异动监测
        var transactionMonitoring=this.transactionMonitoring;
        var transaction=this.transaction;
        var transaction_inputs=this.transactionInput;
        var deleteBtn=$(transaction).children('i.delete_icon');
        var transactionSubmit=$(transaction).children('div.transaction_submit_btn');
        if(transactionMonitoring){
            $(transactionMonitoring).on('click',function(){
                if(transaction){
                    $(transaction).attr('style','');
                }
            });
        }
        if(deleteBtn){
            $(deleteBtn).on('click',function(){//压力预警删除
                for(var i=0;i<transaction_inputs.length;i++){
                    if($($(transaction_inputs)[i]).val()){
                        $($(transaction_inputs)[i]).val('');
                    }
                }
                if(!$(transaction).attr('style')){
                    $(transaction).attr('style','display:none');
                }
            });
        }
        if(transactionSubmit){
            $(transactionSubmit).on('click',function(){//提交
                var transactionData=[];
                for(var i=0;i<transaction_inputs.length;i++){
                    if($($(transaction_inputs)[i]).val()){
                        transactionData.push(
                            $($(transaction_inputs)[i]).attr('data')+':'+$($(transaction_inputs)[i]).val()
                        );
                        $($(transaction_inputs)[i]).val('');
                    }
                }
                if(!$(transaction).attr('style')){
                    $(transaction).attr('style','display:none');
                }
                // 随意图表
                var jspanel=$('div.jsPanel');
                if(jspanel){
                    $(jspanel).remove();
                    showECharts();
                }else{
                    showECharts();
                }
                // console.log(transactionData)
            });
        }
    },
    switchLayer:function(){//图层切换
        var ctent=this.content;
        var iBtn=$(ctent).find('div.layer_nav>div.switch_btn>i');
        var layerPop=$(ctent).find('div.layer_nav>div.layer-pop');
        var layers=$(ctent).find('div.layer_nav>div.layer-pop>div.layer_container>div.layer-items>a');
        // 打开图层
        $(iBtn).on('click',function(){
            if($(layerPop).attr('style')){
                $(layerPop).attr('style','');
            }else{
                $(layerPop).attr('style','display:none');
            }
        });
        // 选择相应的图层
        for(var i=0;i<layers.length;i++){
            !(function(i){
                $($(layers)[i]).on('click',function(){
                    // 地图
                    if($(this).hasClass('vec_type')){
                        if(!$(layerPop).attr('style')){
                            $(layerPop).attr('style','display:none');
                        }
                        map.setMaxZoom(18);
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
                    }
                    // 影像
                    if($(this).hasClass('img_type')){
                        if(!$(layerPop).attr('style')){
                            $(layerPop).attr('style','display:none');
                        }
                        // 删除添加的图层
                        var addLayers=$("#map").find('div.tdt-map-pane>div.tdt-tile-pane>div');
                        for(var j=0;j<addLayers.length;j++){
                            if($($(addLayers)[j])){
                                $($(addLayers)[j]).remove();
                            }
                        }
                        map.setMaxZoom(18);
                        //创建自定义图层对象
                        var imageURL = "https://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
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

                        if($(layerEarth).attr('style')){
                            $(layerEarth).attr('style','');
                        }
                    }
                    // 地形
                    if($(this).hasClass('ter_type')){
                        if(!$(layerPop).attr('style')){
                            $(layerPop).attr('style','display:none');
                        }
                        // 删除添加的图层
                        var addLayers=$("#map").find('div.tdt-map-pane>div.tdt-tile-pane>div');
                        for(var j=0;j<addLayers.length;j++){
                            if($($(addLayers)[j])){
                                $($(addLayers)[j]).remove();
                            }
                        }
                        map.setMaxZoom(14);
                        var imageURL = "https://t4.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}";
                        //创建自定义图层对象
                        var maplay_base = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomNormal});
                        //将图层增加到地图上
                        map.addLayer(maplay_base);
                        var imageURL = "https://t4.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}";
                        var maplay_text = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomNormal});
                        //将图层增加到地图上
                        map.addLayer(maplay_text);
                        if($(layerEarth).attr('style')){
                            $(layerEarth).attr('style','');
                        }
                    }
                    // 三维
                    if($(this).hasClass('sw_type')){
                        if(!$(layerPop).attr('style')){
                            $(layerPop).attr('style','display:none');
                        }
                        map.setMaxZoom(18);
                        // 删除添加的图层
                        var addLayers=$("#map").find('div.tdt-map-pane>div.tdt-tile-pane>div');
                        for(var j=0;j<addLayers.length;j++){
                            if($($(addLayers)[j])){
                                $($(addLayers)[j]).remove();
                            }
                        }
                        var imageURL = "https://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}";
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

                        var imageURL = "https://t4.tianditu.com/DataServer?T=elv_c&x={x}&y={y}&l={z}";
                        maplay_3D = new T.TileLayer(imageURL, {minZoom: zoomMin, maxZoom: zoomMax});
                        //将图层增加到地图上
                        map.addLayer(maplay_3D);

                        if($(layerEarth).attr('style')){
                            $(layerEarth).attr('style','');
                        }
                    }
                });
            }(i));
        }
    },
    filp:function(){//结果显示去翻页功能
        var result=this.rst;
        var results=$(result).children('ul.result_show');
        var pages=$(result).children('div.pages').find('ul>li');
        for(var i=0;i<pages.length;i++){
            !(function(i){
                $($(pages)[i]).on('click',function(){
                    var str='';
                    str+="<li class='result_item' onclick='window.location.href = './buildingsdetails.html';'>"+
                        "<div class='result_img'><img class='resultImg' src='images/房屋.jpg' alt=''></div>"+
                        "<div class='result_content'>"+
                            "<div class='result_content_col1'><span class='result_content_col_icon col_icon1'></span>绿城玉兰花园</div>"+
                            "<div class='result_content_col2'>"+
                                "[<span class='col2_span'>城区</span>] 地址：<p class='col2_p'>长兴区.......</p>"+
                            "</div>"+
                            "<div class='result_content_col3'><span class='col3_span'>16000</span>元/m²</div>"+
                        "</div>"+
                        "<div class='clear'></div>"+
                    "</li>";
                    var num=parseInt(Math.random()*7);
                    var strs='';
                    for(var j=0;j<num;j++){
                        strs+=str;
                    }
                    $(results).html(strs);
                });
            }(i))
        }
    }
}
// 初始化
SearchItem.finit();

// 热力图
function hotTMap(){
    if (!isSupportCanvas()) {
        alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
    }
    var heatTMapOverlay = new T.HeatmapOverlay({
        "radius": 30,
    });
    map.addOverLay(heatTMapOverlay);
    heatTMapOverlay.setDataSet({data: heatmapData, max: 300});
    // 打开热力图
    heatTMapOverlay.show();
    //判断浏览区是否支持canvas
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
}