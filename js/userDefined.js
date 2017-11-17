// 自定义管理
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

var userDefined={
	aDomAry: [],marea:null,customManagements:null,lis:null,dele:null,
    inputs:null,submitBtn:null,stat:null,times:null,
    finitial:function(){//初始阶段
        // 获取元素
        if (this.aDomAry.length < 4) {
            this.aDomAry = fGetElement("search","statistics","allCustomManagement");
        }
        this.marea=$(this.aDomAry[1]).children('ul.statistics_items').find('li.stat_item>div>div.custom');
        this.customManagements=$(this.aDomAry[2]).children('div');
        this.lis=$(this.aDomAry[1]).find('ul.alllines>li');
        this.dele=$(this.aDomAry[1]).children('i.delete_icon');
        this.inputs=$(this.aDomAry[1]).find('div.input_user_defined>input.set_input');
        this.submitBtn=$(this.aDomAry[1]).children('div.submit_btn');
        this.stat=$(this.aDomAry[1]);
        this.data1=$(this.aDomAry[3]);
        this.data2=$(this.aDomAry[4]);
        this.times=$(this.aDomAry[1]).find('div.time_plug>input.ldate');
        this.customManagement();
        this.liClick();
        this.deleteAll();
        this.submitData();
        this.timePlug();
    },
    customManagement:function(){//自定义管理
        var marea=this.marea;
        var customManagements=this.customManagements;
    	for(var i=0;i<marea.length;i++){
    		!(function(i){
    			$($(marea)[i]).on('click',function(){
                    for(var j=0;j<customManagements.length;j++){
                        if(!$($(customManagements)[j]).children('div:first').attr('style')){
                            $($(customManagements)[j]).children('div:first').attr('style','display:none')
                        }
                    }
                    if($(this).hasClass('area_part')){
                        $($(customManagements)[0]).children('div:first').attr('style','');
                    }
                    if($(this).hasClass('unitPrice_part')){
                        $($(customManagements)[1]).children('div:first').attr('style','');
                    }
                    if($(this).hasClass('totalPrice_part')){
                        $($(customManagements)[2]).children('div:first').attr('style','');
                    }
                    if($(this).hasClass('floor_part')){
                        $($(customManagements)[3]).children('div:first').attr('style','');
                    }
    			});
    		}(i))
    	}
        this.customManage();
    },
    liClick:function(){//选择li项
        var lis=this.lis;
        for(var i=0;i<(lis).length;i++){
            !(function(i){
                $($(lis)[i]).on('click',function(){
                    if($($(lis)[i]).hasClass('population_li')){
                        if(($($(lis)[i]).hasClass('small_line') || $($(lis)[i]).hasClass('normal_line') || $($(lis)[i]).hasClass('sbig_line') || $($(lis)[i]).hasClass('big_line'))&&!$($(lis)[i]).hasClass('line_selected')){
                            $($(lis)[i]).siblings().removeClass('line_selected');
                            $($(lis)[i]).addClass('line_selected');
                        }else if(($($(lis)[i]).hasClass('small_line') || $($(lis)[i]).hasClass('normal_line') || $($(lis)[i]).hasClass('sbig_line') || $($(lis)[i]).hasClass('big_line'))&&$($(lis)[i]).hasClass('line_selected')){
                            $($(lis)[i]).removeClass('line_selected');
                        }
                    }else if($($(lis)[i]).hasClass('land_li') || $($(lis)[i]).hasClass('buildings_li')){
                        if(($($(lis)[i]).hasClass('small_line') || $($(lis)[i]).hasClass('normal_line') || $($(lis)[i]).hasClass('sbig_line') || $($(lis)[i]).hasClass('big_line'))&&!$($(lis)[i]).hasClass('line_selected_red')){
                            $($(lis)[i]).addClass('line_selected_red');
                        }else if(($($(lis)[i]).hasClass('small_line') || $($(lis)[i]).hasClass('normal_line') || $($(lis)[i]).hasClass('sbig_line') || $($(lis)[i]).hasClass('big_line'))&&$($(lis)[i]).hasClass('line_selected_red')){
                            $($(lis)[i]).removeClass('line_selected_red');
                        }
                    }
                });
            }(i))
        }
    },
    deleteAll:function(){//删除当前统计项并且清空数据
        var dele=this.dele;
        var lis=this.lis;
        var inputs=this.inputs
        $(dele).on('click',function(){ 
            $(this.aDomAry[1]).attr('style','display:none');
            if(lis){
                for(var i=0;i<(lis).length;i++){
                    if($($(lis)[i]).hasClass('population_li')){
                        if($($(lis)[i]).hasClass('line_selected')){
                            $($(lis)[i]).removeClass('line_selected');
                            $($(lis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected');
                        }
                    }else if($($(lis)[i]).hasClass('land_li') || $($(lis)[i]).hasClass('buildings_li')){
                        if($($(lis)[i]).hasClass('line_selected_red')){
                            $($(lis)[i]).removeClass('line_selected_red');
                            $($(lis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected_red');
                        }
                    }
                }
            }
            if(inputs){
                for(var j=0;j<(inputs).length;j++){
                    if($($(inputs)[j]).val()){
                        $($(inputs)[j]).val('');
                    }
                }
            }
        }.bind(this));
    },
    submitData:function(){//提交数据
        var stat=this.stat;
        var submitBtn=this.submitBtn;
        var lis=this.lis;
        var inputs=this.inputs;
        var times=this.times;
        var customManagements=this.customManagements;
        $(submitBtn).on('click',function(){
            var subData=[];
            // 单选框中的内容
            if(lis){
                for(var i=0;i<(lis).length;i++){
                    if($($(lis)[i]).hasClass('population_li')){
                        if($($(lis)[i]).hasClass('line_selected')){
                            subData.push($($(lis)[i]).attr('data'));
                            $($(lis)[i]).removeClass('line_selected');
                            $($(lis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected');
                        }
                    }else if($($(lis)[i]).hasClass('land_li') || $($(lis)[i]).hasClass('buildings_li')){
                        if($($(lis)[i]).hasClass('line_selected_red')){
                            subData.push($($(lis)[i]).attr('data'));
                            $($(lis)[i]).removeClass('line_selected_red');
                            $($(lis)[i]).parent('ul.alllines').children('li:first').addClass('line_selected_red');
                        }
                    }
                }
            }
            // input中的内容
            if(inputs){
                for(var j=0;j<(inputs).length;j++){
                    if($($(inputs)[j]).val()){
                        subData.push($($(inputs)[j]).attr('data')+':'+$($(inputs)[j]).val());
                        $($(inputs)[j]).val('');
                    }
                }
            }
            // 时期
            if(times){
                for(var p=0;p<(times).length;p++){
                    if($($(times)[p]).val()){
                        subData.push($($(times)[p]).attr('data')+':'+$($(times)[p]).val());
                        $($(times)[p]).val('');
                    }
                }
            }
            // console.log(this.subData)
            // 统计表隐藏
            $(stat).attr('style','display:none');
            for(var k=0;k<customManagements.length;k++){
                if(!$($(customManagements)[k]).children('div:first').attr('style')){
                    $($(customManagements)[k]).children('div:first').attr('style','display:none')
                }
            }
            var jspanel=$('div.jsPanel');
            if(jspanel){
                $(jspanel).remove();
                showECharts();
            }else{
                showECharts();
            }
        }.bind(this));
    },
    customManage:function(){//自定义面积段管理 自定义单价段管理 自定义总价段管理 自定义楼层管理
        if (this.aDomAry.length < 4) {
            this.aDomAry = fGetElement("search","statistics","allCustomManagement");
        }
        var customManagements=$(this.aDomAry[2]).children('div');
        for(var k=0;k<customManagements.length;k++){
            !(function(k){
                var area=$($(customManagements)[k]).children('div:eq(0)');
                var addArea=$($(customManagements)[k]).children('div:eq(1)');
                var tbody=$($(customManagements)[k]).children('div:eq(0)').children('table').children('tbody');

                var modeBtn=$(addArea).children('div.mode_btn');
                var modeInput=$(addArea).children('div.setting').find('div.mode_cont>input');
                var btnPart=$(area).find('div.btn_part>div.sure_table_btn');
                var spans=$(tbody).find('tr>td>span');
                // 添加面积段
                var setArea=$(area).find('div.set_manage');
                $(setArea).on('click',function(){
                    $(addArea).attr('style','');
                });
                // 设置
                $(tbody).on('click','span',function(){
                    if($(tbody).find('span').hasClass('tbody_td_span_selected')){
                        $(tbody).find('span').removeClass('tbody_td_span_selected').addClass('tbody_td_span_not_selected');
                    }
                    if(!$(this).hasClass('tbody_td_span_selected')){
                        $(this).addClass('tbody_td_span_selected').removeClass('tbody_td_span_not_selected');
                    }
                });
                // 确定
                $(btnPart).on('click',function(){
                    $(area).attr('style','display:none');
                    var trs=$(tbody).find('tr');
                    // 清除新添加的模式
                    for(var m=2;m<trs.length;m++){
                        $($(trs)[m]).remove();
                    }
                });
                // 保存
                $(modeBtn).on('click',function(){
                    $(addArea).attr('style','display:none');
                    var oldNum=parseInt($(tbody).find('tr:last>td:first').html());
                    if(oldNum<10){
                        var num='0'+parseInt(oldNum+1);//编号
                    }else{
                        var num=parseInt(oldNum+1);
                    }
                    if($($(modeInput)[0]).val()){//模式名
                        var mode_name=$($(modeInput)[0]).val();
                        // 清空
                        $($(modeInput)[0]).val('');
                    }else{
                        var mode_name='';
                    }
                    if($($(modeInput)[1]).val()){//内容
                        var mode_content=$($(modeInput)[1]).val();
                        // 清空
                        $($(modeInput)[1]).val('');
                    }else{
                        var mode_content='';
                    }
                    if(mode_content){
                        if(parseInt(num)%2==1){
                            var str='<tr>'+
                                '<td class="bianhao_item blue_bg">'+num+'</td>'+
                                '<td class="mingchen_item blue_bg">'+mode_name+'</td>'+
                                '<td class="neirong_item blue_bg">'+mode_content+'</td>'+
                                '<td class="shezhi_item blue_bg"><span class="hidden_mode tbody_td_span_not_selected"></span></td>'+
                            '</tr>';
                        }else{
                            var str='<tr>'+
                                '<td class="bianhao_item">'+num+'</td>'+
                                '<td class="mingchen_item">'+mode_name+'</td>'+
                                '<td class="neirong_item">'+mode_content+'</td>'+
                                '<td class="shezhi_item"><span class="hidden_mode tbody_td_span_not_selected"></span></td>'+
                            '</tr>';
                        }
                    }else{
                        return;
                    }
                    $(tbody).append(str);
                }.bind(this));
            }(k))
        }
    },
    timePlug:function(){//日期插件
        laydate.render({
          elem: '#data1' //指定元素
        });
        laydate.render({
          elem: '#data2' //指定元素
        });
    }
}
// 初始化
userDefined.finitial();