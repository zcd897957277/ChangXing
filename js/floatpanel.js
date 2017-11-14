function showECharts(){
	$.jsPanel({
	    //定位
	    position:    {my: "center-top", at: "center-top", offsetY: 15},
	    //主题
	    theme:       "rebeccapurple",
	    contentSize: {width: 600, height: 450},
	    headerTitle: "嵌套环形饼图",
	    content:     "<div id='wrap1' style='height:450px'></div>",
	    //插入document后操作面板
	    callback:    function () {
	        setTimeout(function(){
	            $('.jsPanel').css({'z-index':'10000','cursor':'pointer'});
	        },20);
	        var myChart=echarts.init(document.getElementById("wrap1"));

	        var option = {
	            title:{
	                text:'2017年人口数(万人)',
	                x:'center',
	                y:10,
	                borderColor:'#000000'
	            },
	            tooltip: {
	                trigger: 'item',
	                formatter: "{a} <br/>{b}: {c} ({d}%)"
	            },
	            legend: {
	                orient: 'vertical',
	                x: 'right',
	                y:'center',
	                data:['20岁以下','20-30岁','30-40岁','40-50岁','50岁以上']
	            },
	            series: [
	                {
	                    name:'年龄组',
	                    type:'pie',
	                    selectedMode: 'single',
	                    radius: [0, '70%'],
	                    label: {
	                        normal: {
	                            position: 'outer'
	                        }
	                    },
	                    data:[
	                        {value:335, name:'20岁以下', selected:true},
	                        {value:429, name:'20-30岁', selected:true},
	                        {value:300, name:'30-40岁', selected:true},
	                        {value:335, name:'40-50岁', selected:true},
	                        {value:102, name:'50岁以上', selected:true}
	                    ]
	                },
	            ]
	        };
	        myChart.setOption(option); 
	    }
	});
}
