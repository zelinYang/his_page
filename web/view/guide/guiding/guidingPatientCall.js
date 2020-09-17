$(document).ready(function() {
    loadGuidingTable();
});

var visitStateMap = {
    "0": "未就诊",
    "1": "就诊中",
    "2": "就诊结束",
    "3": "暂挂",
    "4": "已过号"
};

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
                    }
                    $("#guidingTableId").append(htmlStr);
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

layui.config({
    base: '../../../resource/layuiadmin/'
}).extend({
    index: 'lib/index'
}).use(['index', 'form', 'table', 'laytpl'], function () {
    var $ = layui.$, form = layui.form, table = layui.table, laytpl = layui.laytpl;

    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = date.getDate();
    var dateVal = year + "-" + month + "-" + day;

    //初始赋值
    laydate.render({
        elem: '#visitDateBegin',
        value: dateVal,
        isInitValue: true
    });
    //初始赋值
    laydate.render({
        elem: '#visitDateEnd',
        value: dateVal,
        isInitValue: true
    });

    //第一个实例
    table.render($.extend(basePageTable, {
        elem: '#guidingPatientCall_table',
        height: getTableHight(),
        limit:10,//限制每页10条
        url: '../../../guiding/guidingPatientCallListData.jo', //数据接口
        where: {visitDateBegin: dateVal, visitDateEnd: dateVal},
        page: true, //开启分页,
        cols: [[
            // {type: 'checkbox', fixed: 'left', width: 40,},
            {type: 'numbers', title: '序号'},
            {field: 'patientName', title: '患者姓名', align: 'center', width: 80},
            {field: 'visitOfficeName', title: '科室', align: 'center', width: 120},
            {field: 'roomName', title: '诊室', align: 'center', width: 140},
            {field: 'visitDoctorName', title: '医生', align: 'center', width: 80},
            {field: 'serialNum', title: '就诊序号', align: 'center', width: 80},
            {field: 'guidingSerialNum', title: '导诊序号', align: 'center', width: 80},
            {field: 'visitDate', title: '就诊日期', align: 'center', width: 120,
                templet :function (row) {
                    return row.visitDate ? layui.util.toDateString(row.visitDate, 'yyyy-MM-dd') : '';
                }
            },
            {field: 'appointRegisterFlag', title: '挂号标志', align: 'center', width: 80,
                templet:function(row){
                    var mode = "挂号";
                    if ("1" == row.appointRegisterFlag) {
                        mode = "预约";
                    }
                    return mode;
                }
            },
            {field: 'guidingMode', title: '导诊模式', align: 'center', width: 80,
                templet:function(row){
                    var mode = "诊室排号";
                    if ("2" == row.guidingMode) {
                        mode = "科室排号";
                    }
                    return mode;
                }
            },
            //{field: 'callTime', title: '呼叫时间', align: 'center', width: 100,
            //     templet :function (row) {
            //         return row.callTime ? layui.util.toDateString(row.callTime, 'yyyy-MM-dd HH:mm') : '';
            //     }
            // },
            //{field: 'doctorCallFlag', title: '医生呼叫', align: 'center', width: 80},
            {field: 'visitState', title: '导诊状态', align: 'center', width: 80,
                templet:function(row){
                    return visitStateMap[row.visitState] || '' ;
                }
            },
            {field: 'callStateFlag', title: '呼叫状态', align: 'center', width: 80,
                templet:function(row){
                    return "1" == row.callStateFlag ? "已呼叫" : "未呼叫";
                }
            },
            // {field: 'callShowContent', title: '内容', align: 'center'},
            {field: 'registerTime', title: '预约挂号时间', align: 'center', width: 160,
                templet :function (row) {
                    return row.registerTime ? layui.util.toDateString(row.registerTime, 'yyyy-MM-dd HH:mm:ss') : '';
                }
            },
            // {field: 'guidingTime', title: '导诊时间', align: 'center',
            //     templet :function (row) {
            //         return row.guidingTime ? layui.util.toDateString(row.guidingTime, 'yyyy-MM-dd HH:mm') : '';
            //     }
            // },
            //{field: 'guidingExplain', title: '导诊说明', align: 'center'},
            {fixed: 'right', title: '操作', align: 'center', toolbar: '#barDemo'},
        ]]
        // done: function (res, curr, count) {
        //     var that = this;
        //     window.box = maillist(that);
        // },
        // maillist : {
        //     templet: "#maillistTpl",
        //     boxElem:'.layadmin-contact-box',//盒子元素
        //     box: function (obj) {
        //         var data = obj.data;
        //     },
        //     boxDouble: function (obj) {
        //         //openDbClickBed(obj.data);
        //     }
        // }
    }));
    //
    // function maillist(tableIns) {
    //     var options = $.extend({model: tableIns.where.model || 'table'}, tableIns.maillist || {});
    //     var FLUID_CLASS = 'fluid-box';//流式布局容器类
    //     if(!tableIns || !options.templet) return ;
    //     var data = table.cache[tableIns.id];
    //     var view = $("#"+ tableIns.id).next('.layui-table-view');
    //     var box = view.find('.layui-table-box');
    //     view.children('.'+ FLUID_CLASS).remove();
    //     var fluid = $(layui.laytpl($(options.templet).html()).render(data)).prependTo(view).addClass(FLUID_CLASS);
    //     //样式：滚动条
    //     fluid.css({'overflow-y': 'auto'});
    //     $(window).resize(function () {
    //         //设置动态高度
    //         fluid.height(tableIns.height - (tableIns.page ? view.find('#' + tableIns.page.elem).height() : 0) - 30)
    //     }).resize();
    //     //监听行单击双击事件
    //     fluid.find(options.boxElem).on('click dblclick', function (e) {
    //         var index = $(this).index(options.boxElem);
    //         $(this).addClass('box-selected').parent().siblings().find(options.boxElem).removeClass('box-selected');
    //         switch (e.type) {
    //             case 'click':
    //                 options.box && options.box({
    //                     elem: fluid,
    //                     data: data[index]
    //                 }).call(this);
    //                 break;
    //             case "dblclick":
    //                 options.box && options.boxDouble({
    //                     elem: fluid,
    //                     data: data[index]
    //                 });
    //                 break;
    //         }
    //     });
    //     var obj = {
    //         config: options,
    //         elem: fluid,
    //         model: function (type) {//切换模式
    //             tableIns.where.model = type;
    //             switch (type) {
    //                 case 'table':
    //                     fluid.hide();
    //                     box.show();
    //                     break;
    //                 case 'fluid':
    //                     box.hide();
    //                     fluid.show();
    //                     break;
    //             }
    //         }
    //     };
    //     obj.model(options.model);
    //     return obj;
    // }


    //操作事件
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        if (obj.event === 'call') {
            layer.msg("已呼叫 " + data.patientName + " 到导诊台");
        } else if (obj.event === 'toSecond') {
            common.requestServer('../../../guiding/gotoSecond.jo', {
                diseaseIds : diseaseIds,
                validFlag : validFlag
            }, function(result) {
                if (result.code == "0") {
                    layer.msg("保存成功");
                } else {
                    layer.msg(result.msg);
                }
            });
        } else if (obj.event === 'changeOffice') {
            var registerTime = data.registerTime ? layui.util.toDateString(data.registerTime, 'yyyy-MM-dd') : "";

            var content = "../guiding/guidingChangeOffice.html?" +
                "registerId=" + data.registerId +
                "&registerTime=" + registerTime +
                "&visitDoctorId=" + data.visitDoctorId;
            common.open(content, data.patientName + " 转科", {
                area : [ '70%', '80%' ],
                scroll:'yes'
            });
        }
    });

    // 查询按钮
    $('#btn_query').click(function () {
        reloadTable();
    });

    // 清空按钮
    $('#btn_clean').click(function () {
        common.cleanForm('queryForm');
        $("#visitDateBegin").val(dateVal);
        $("#visitDateEnd").val(dateVal);
        reloadTable();
    });

    function reloadTable() {
        var queryParams = common.serializeObject($('#queryForm'));
        queryParams.guidingTableId = queryParams.guidingTableId ? queryParams.guidingTableId : "";
        queryParams.patientName = queryParams.patientName ? queryParams.patientName : "";
        table.reload('guidingPatientCall_table', {where: queryParams});
    }

    function getTableHight() {
        return ($('body').height() - $('#queryForm').height() - 65);
    }

    //回车触发查询
    $("#q_keyWord").keydown(function (event) {
        if (event.keyCode == 13) {
            $('#btn_query').click();
            return false;
        }
    });
});



