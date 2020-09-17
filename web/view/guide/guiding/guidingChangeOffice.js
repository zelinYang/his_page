//定义全局参数
var patParams = {}, dicVisitTimeFlag = {}, dicVisitTimeRange = {}, dicSysOrgName = {}, dicDoctorPost = {};
var visitOfficeIdVal = "", visitOfficeNameVal = "",
    consultingRoomIdVal = "", roomNameVal = "",
    visitDoctorIdVal = "", visitDoctorNameVal = "",
    arrangeDutyTypeVal = "";

//通过链接拿到需要传参的参数
buildPatParams();
//加载字典数据
loadDicData();

$(document).ready(function() {
    //判断是早上还是下午
    setArrangeDutyTypeVal();
});

function setArrangeDutyTypeVal() {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = currentTime.getDate();
    var dateStr = year + "-" + month + "-" + day;
    var amTimeLimit = dicVisitTimeRange["1"];
    var pmTimeLimit = dicVisitTimeRange["2"];

    var amTimeBegin = dateStr + " " + amTimeLimit.substring(0, amTimeLimit.indexOf("-")) + ":00";
    var amTimeEnd = dateStr + " " + amTimeLimit.substring(amTimeLimit.indexOf("-") + 1) + ":00";
    var pmTimeBegin = dateStr + " " + pmTimeLimit.substring(0, pmTimeLimit.indexOf("-")) + ":00";
    var pmTimeEnd = dateStr + " " + pmTimeLimit.substring(pmTimeLimit.indexOf("-") + 1) + ":00";
    amTimeBegin = new Date(amTimeBegin);
    amTimeEnd = new Date(amTimeEnd);
    pmTimeBegin = new Date(pmTimeBegin);
    pmTimeEnd = new Date(pmTimeEnd);

    if (currentTime >= amTimeBegin && currentTime <= amTimeEnd) {
        arrangeDutyTypeVal = "1";
        $("#q_visitTimeFlag").html("早上 " + amTimeLimit);
    }
    if (currentTime >= pmTimeBegin && currentTime <= pmTimeEnd) {
        arrangeDutyTypeVal = "2";
        $("#q_visitTimeFlag").html("下午 " + pmTimeLimit);
    }
}

//获取上一个html页面传过来的参数
function buildPatParams() {
    var url = location.href;
    var params = url.substring(url.indexOf("?") + 1);
    if (params) {
        var paramOneArr = params.split("&");
        for (var i = 0; i < paramOneArr.length; i++) {
            var paramOne = paramOneArr[i];
            var paramTwoArr = paramOne.split("=");
            patParams[paramTwoArr[0]] = paramTwoArr[1];
        }
    }
}

//加载字典数据
function loadDicData() {
    $.ajax({
        type: "POST",
        url: "../../../sys/selectDicData.jo",
        data: {dicMapNames: "dicVisitTimeFlag,dicVisitTimeRange,dicSysOrgName,dicDoctorPost"},
        dataType: "json",
        async: false,//同步
        success: function (result) {
            if (result.code == "0") {
                var data = result.data;
                dicVisitTimeFlag = data["dicVisitTimeFlag"];
                dicVisitTimeRange = data["dicVisitTimeRange"];
                dicSysOrgName = data["dicSysOrgName"];
                dicDoctorPost = data["dicDoctorPost"];
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
}).use(['index', 'form', 'laydate', 'table', 'util'], function () {
    util = layui.util;
    var $ = layui.$, form = layui.form, laydate = layui.laydate, table = layui.table;

    //科室列表
    table.render($.extend({}, singlePageTable, {
        elem: '#arrangeDutyOfficeListGrid',
        url: '../../../register/officeRegisterTotalList.jo',
        where: getQueryParams(),
        data: [],
        cols: [[{
            type: 'radio',
            fixed: 'feft',
            title: '选择'
        }, {
            title: '科室名称',
            field: 'arrangeDutyOfficeId',
            fixed: 'feft',
            minWidth: 100,
            width: 160,
            templet: function (row) {
                return dicSysOrgName[row.arrangeDutyOfficeId] || ''
            }
        }, {
            field: 'limitCount',
            title: '限额',
            width: 70,
            templet: function (d) {
                return '<span style="' + (Boolean(d.limitCount) ? 'color: #FF5722;' : "") + '">' + d.limitCount + '</span>';
            }
        }, {
            field: 'registerCount',
            title: '已挂',
            width: 70,
            templet: function (d) {
                return '<span style="' + (Boolean(d.registerCount) ? 'color: #FF5722;' : "") + '">' + d.registerCount + '</span>';
            }
        }]], done: function (res) {
            tableReHeight(this, getInOfficeTableHgt);
        }
    }));

    //监听行单击事件
    table.on('row(arrangeDutyOfficeListGrid)', function (obj) {
        var data = obj.data;
        visitOfficeIdVal = data.arrangeDutyOfficeId;
        visitOfficeNameVal = dicSysOrgName[data.arrangeDutyOfficeId];
        setInOfficeData(data);
        clickRowSelectRadio(obj, true);
        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
    });

    // 设置科室数据
    function setInOfficeData(data) {
        if (data) {
            //当日值班医生
            table.reload('arrangeDutyDoctorListGrid', {
                url: '../../../outpatient/arrangeDutyDoctorListData.jo',
                where: {
                    doctorOfficeId: data.arrangeDutyOfficeId,
                    arrangeDutyDate: $("#q_arrangeDutyDate").data('value'),
                    arrangeDutyType: arrangeDutyTypeVal
                }
            });
        } else {
            table.reload('arrangeDutyDoctorListGrid', {url: ''});
        }
    }

    //单击行选中radio 与 点击radio选中行
    function clickRowSelectRadio(obj, flag) {
        if (flag) {
            obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');//选中行样式
            obj.tr.find('input[lay-type="layTableRadio"]').prop("checked", flag);
        } else {
            obj.tr.removeClass('layui-table-click');//选中行样式
            obj.tr.find('input[lay-type="layTableRadio"]').prop("checked", flag);
        }
        form.render('radio');
    }

    //医生列表
    table.render($.extend({}, singlePageTable, {
        elem: '#arrangeDutyDoctorListGrid',
        where: {},
        data: [],
        cols: [[{
            type: 'radio',
            fixed: 'feft'
        }, {
            field: 'doctorId',
            title: '医生姓名',
            fixed: 'feft',
            minWidth: 80,
            width: 100,
            templet: function (row) {
                return row.doctorName + ("0" == row.validFlag ? ' <span class="layui-badge">停诊</span>' : '');
            }
        }, {
            field: 'doctorPost',
            title: '职称',
            minWidth: 80,
            width: 120,
            templet: function (row) {
                return dicDoctorPost[row.doctorPost] || '';
            }
        }, {
            field: 'limitCount',
            title: '限额',
            width: 60
        }, {
            field: 'registerCount',
            title: '已挂',
            width: 60
        }, {
            field: 'consultingRoomName',
            title: '诊室',
            minWidth: 100
        }]], done: function () {
            tableReHeight(this, getInOfficeTableHgt);
        }
    }));

    //监听行单击事件
    table.on('row(arrangeDutyDoctorListGrid)', function (obj) {
        setInDoctorData(obj);
    });

    // 设置医生数据
    function setInDoctorData(obj) {
        var data = obj.data;
        if (data) {
            if (data.doctorId == patParams["visitDoctorId"]) {
                common.msg("转入医生和当前医生不能相同", 0);
                visitDoctorIdVal = null;
                visitDoctorNameVal = null;
                consultingRoomIdVal = null;
                roomNameVal = null;
                clickRowSelectRadio(obj, false);
                return;
            }
            visitDoctorIdVal = data.doctorId;
            visitDoctorNameVal = data.doctorName;
            consultingRoomIdVal = data.consultingRoomId;
            roomNameVal = data.consultingRoomName;
            clickRowSelectRadio(obj, true);
        } else {
            visitDoctorIdVal = null;
            visitDoctorNameVal = null;
            consultingRoomIdVal = null;
            roomNameVal = null;
            clickRowSelectRadio(obj, false);
        }
    }


    function tableReHeight(that, heightCallback) {
        // 动态重置表格高度
        $(window).resize(function () {
            that.elem.next('.layui-table-view').attr('style', ' ')
            that.height = heightCallback();
            table.resize(that.id);
        }).resize();
    }

    // 获取表格高度
    function getInOfficeTableHgt() {
        return $('.layui-fluid').height() - $('#inOffice_form').height() - $(".tool-bottom-fixed").height() - 100;
    }

    function getQueryParams() {
        $('#q_arrangeDutyDate').text(util.toDateString(patParams["registerTime"], 'yyyy-MM-dd')).data('value', util.toDateString(patParams["registerTime"], 'yyyy-MM-dd'));
        var params = {
            arrangeDutyDate: $("#q_arrangeDutyDate").data('value'),
            arrangeDutyType: arrangeDutyTypeVal
        };
        return params;
    }

    // 查询按钮
    $('#btn_save').click(function () {
        changeOffice();
    });

    //转科保存
    function changeOffice() {
        if (!patParams["registerId"]) {
            common.alertError("请选择患者");
            return;
        }
        if (!visitOfficeIdVal) {
            common.msg("请选择科室", 0);
            return;
        }
        if (!visitDoctorIdVal || !consultingRoomIdVal) {
            common.msg("请选择医生和科室", 0);
            return;
        }

        var params = {
            registerId: patParams["registerId"],
            visitOfficeId: visitOfficeIdVal,
            visitOfficeName: visitOfficeNameVal,
            consultingRoomId: consultingRoomIdVal,
            visitDoctorId: visitDoctorIdVal,
            visitDoctorName: visitDoctorNameVal,
            roomName: roomNameVal
        };

        $.ajax({
            type: "POST",
            url: "../../../guiding/changeOffice.jo",
            data: params,
            dataType: "json",
            success: function (result) {
                if ("0" == result.code) {
                    common.alertCall("转科成功!", 1, function (){
                        $('#btn_query', window.parent.document).click();
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        window.parent.reloadTable();
                    });
                } else {
                    common.alertError(result.msg);
                }
            },
            error: function (res) {
                jqueryPostError(res);
            }
        });
    }
});