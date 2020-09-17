$(document).ready(function() {
    loadGuidingTable();
	loadVisitState();
	loadDicData();
});

var visitStateMap = {
    "0": "未就诊",
    "1": "就诊中",
    "2": "就诊结束",
    "3": "暂挂",
    "4": "已过号"
};

var guidingTableMap = {}; //所有导诊台
var dicSysUserMap = {}; //所有用户
var dicSysOrgNameMap = {}; //所有部门

//加载导诊台信息
function loadGuidingTable() {
    $.ajax({
        type: "POST",
        url: "../../../guiding/selectGuidingTableList.jo",
        data: {},
        dataType: "json",
        success: function (result) {
            if (result.code == "0") {
                var data = result.data;
                if (data) {
                    var htmlStr = "<option value=''>请选择导诊台</option>";
                    for (var i=0; i < data.length; i++) {
                        var obj = data[i];
                        htmlStr += "<option value='" + obj.guidingTableId + "'>" + obj.guidingTableName + "</option>";
						guidingTableMap[obj.guidingTableId] = obj.guidingTableName;
                    }
                    $("#guidingTableId").append(htmlStr);
					$("#guidingTableId2").append(htmlStr);
                }
            } else {
                common.alert("查询出错");
            }
        },
        error: function (res) {
            jqueryPostError(res);
        }
    });
}

//为导诊状态的下拉框赋值
function loadVisitState() {
	
	var output = [];
	$.each(visitStateMap, function(key, value){
		output.push('<option value="'+ key +'">'+ value +'</option>');
	});
	$('#visitState').html(output.join(''));
}



function loadDicData() {
    $.ajax({
        type: "POST",
        url: "../../../sys/selectDicData.jo",
        data: {dicMapNames: "dicSysUser,dicSysOrgName"},
        dataType: "json",
        async: false,//同步
        success: function (result) {
            if (result.code == "0") {
                var data = result.data;
                dicSysUserMap = data["dicSysUser"];
                dicSysOrgNameMap = data["dicSysOrgName"]
            }
        },
        error: function (res) {
            jqueryPostError(res);
        }
    });
}

layui.config({
    base: '../../../resource/layuiadmin/'
}).extend({
    index: 'lib/index'
}).use(['index', 'form', 'table', 'laytpl'], function () {
    var $ = layui.$, form = layui.form, table = layui.table, laytpl = layui.laytpl, element = layui.element;

	var tabId = 'tab1'; //第一个tab页的id
	
	//监听Tab切换
	element.on('tab(guidingTab)', function(){
	    tabId = this.getAttribute('lay-id');
	});

	//===============第一个tab页=========================
    //导诊记录表格
    table.render($.extend(basePageTable, {
        elem: '#guidingRecordTable',
        height: getTableHight(),
        url: '../../../guiding/guidingPatientRecordListData.jo',
        page: true, //开启分页,
        where: common.serializeObject($('#queryForm')),
        cols: [[
			{
	            type: 'numbers',
				title: '序号',
	            unresize: true
			},
            {field: 'guidingTableId', title: '导诊台名称', align: 'center',
		            templet :function (row) {
		            		return guidingTableMap[row.guidingTableId];
		            }
			},
            {field: 'visitState', title: '导诊状态', align: 'center',
		            templet :function (row) {
		            		return visitStateMap[row.visitState];
		            }
			},
            {field: 'guidingMode', title: '导诊模式', align: 'center',
		            templet :function (row) {
		            	var flag = row.guidingMode;
		            	if(flag == "1"){
		            		return "诊室排号";
		            	}else if(flag == "2"){
		            		return "科室排号";
		            	}
		            }
			},
			{field: 'patientName', title: '患者姓名', align: 'center', width: 120},
            {field: 'appointRegisterFlag', title: '预约-挂号标志', align: 'center',
		            templet :function (row) {
		            	var flag = row.appointRegisterFlag;
		            	if(flag == "1"){
		            		return "预约";
		            	}else if(flag == "2"){
		            		return "挂号";
		            	}
		            }
			},
            {field: 'visitDoctorName', title: '预约-挂号医生姓名', align: 'center'},
            {field: 'serialNum', title: '就诊序号', align: 'center'},
            {field: 'visitDateEqu', title: '预约-挂号就诊日期', align: 'center', width: 150,templet : function (row) {return layui.util.toDateString(row.visitDateEqu, 'yyyy-MM-dd HH:mm');}},
            {field: 'roomName', title: '诊室名称', align: 'center'},
            {field: 'visitOfficeName', title: '预约-挂号科室', align: 'center'},
            {field: 'registerTimeBegin', title: '预约挂号时间', align: 'center', width: 150,templet : function (row) {return layui.util.toDateString(row.registerTimeBegin, 'yyyy-MM-dd HH:mm');}},
            {field: 'refundRegisterTimeBegin', title: '预约挂号退号时间', align: 'center',templet : function (row) {return layui.util.toDateString(row.refundRegisterTimeBegin, 'yyyy-MM-dd HH:mm');}},
            {field: 'callShowContent', title: '呼叫显示内容', align: 'center'},
            {field: 'guidingTimeBegin', title: '导诊时间', align: 'center',width: 150,templet : function (row) {return layui.util.toDateString(row.guidingTimeBegin, 'yyyy-MM-dd HH:mm');}},
			{
	            title: '操作',
	            unresize: true,
	            width: 100,
	            align: 'center',
	            fixed: 'right',
	            toolbar: '<div class="layui-table-cell laytable-cell-1-0-9"><a class="layui-btn layui-btn-xs layui-btn-normal" lay-tips="详情"  lay-event="btn_show">详情</a></div>'
        	}
   
        ]]
    }));

    // 查询按钮
    $('#btn_query').click(function () {
        query();
    });

    // 清空按钮
    $('#btn_clean').click(function () {
        common.cleanForm('queryForm');
	    $('#patientName').val('');//cleanForm方法不起作用，重新赋空
    });

    //查询列表
    function query() {
        var queryParams = common.serializeObject($('#queryForm'));
        if (!queryParams.patientName) {
            queryParams.patientName = '';
        }
        table.reload('guidingRecordTable', {where: queryParams,height: getTableHight() });
    }

    //操作事件
    table.on('tool(guidingRecordGrid)', function (obj) {
        var data = obj.data;
   		//var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        //var tr = obj.tr; //获得当前行 tr 的DOM对象
        if (obj.event === 'btn_show') { //详情按钮
			//guidingRecordShow(data);
        }
    });

    //详情
    function guidingRecordShow(data) {
    	
  	  layer.open({
		  type: 1, 
		  title:"导诊详情",
		  area:['50%','50%'],
		  btn: ['关闭'], 
		  content: $("#guidingRecordPop"),
		  yes:function(index,layero){
				layer.close(index);
          },success: function (index,layero) {
        	  debugger
			  $('#guidingTableName').val(guidingTableMap[data.guidingTableId]);
			  $('#visitStateShow').val(visitStateMap[data.visitState]);
	
	
			 
	
          }
		});
    }

    $(window).resize(function () {

	   if(tabId == 'tab1'){
		   query();
	   }else if(tabId == 'tab2'){
		   query2();
	   }

    });

    function getTableHight() {
        return ($('body').height() - 90);
    }


    //===============第二个tab页=========================
    //导诊服务记录表格
    table.render($.extend(basePageTable, {
        elem: '#guidingServiceRecordTable',
        height: getTableHight(),
        url: '../../../guiding/guidingServiceRecordListData.jo',
        page: true,
        cols: [[
			{
	            type: 'numbers',
				title: '序号',
	            unresize: true
			},
			{field: 'guidingTableId', title: '导诊台名称', align: 'center',
		            templet :function (row) {
		            		return guidingTableMap[row.guidingTableId];
		            }
			},
            {field: 'officeId', title: '科室名称', align: 'center', 
		            templet :function (row) {
		            		return dicSysOrgNameMap[row.officeId];
		            }
			},
			{field: 'patientName', title: '患者姓名', align: 'center', width: 80},
            {field: 'doctorUserId', title: '医生姓名', align: 'center', width: 80,
		            templet :function (row) {
		            		return dicSysUserMap[row.doctorUserId];
		            }
			},
            {field: 'guidingProjectNum', title: '项目数量', align: 'center', width: 100},
            {field: 'guidingServiceTimeBegin', title: '服务时间', align: 'center', width: 150,templet : function (row) {return layui.util.toDateString(row.registerTimeBegin, 'yyyy-MM-dd HH:mm');}},
     		{field: 'guidingServiceContent', title: '服务内容', align: 'center'}

        ]]
    }));

    // 查询按钮
    $('#btn_query2').click(function () {
        query2();
    });

    // 清空按钮
    $('#btn_clean2').click(function () {
        common.cleanForm('queryForm2');
	    $('#patientName2').val(''); //cleanForm方法不起作用，重新赋空
    });

    //查询列表
    function query2() {
        var queryParams = common.serializeObject($('#queryForm2'));
        if (!queryParams.patientName) {
            queryParams.patientName = '';
        }
        table.reload('guidingServiceRecordTable', {where: queryParams,height: getTableHight()});
    }

});
