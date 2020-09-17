layui.config({
    base: '../../../resource/layuiadmin/'
}).extend({
    index: 'lib/index'
}).use(['index', 'form', 'table', 'laytpl'], function () {
    var $ = layui.$, form = layui.form, table = layui.table, laytpl = layui.laytpl
    var pathName = window.document.location.pathname;
    //获取带"/"的项目名，如：/cloud_his
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    getSysOrgData();

    $("input[name=guidingModeFlag][value=1]").prop("checked", true); //导诊模式   1=诊室排号（勾选）， 2=科室排号
    $("input[name=showNameFlag][value=0]").prop("checked", true);  //显示姓名     0=不显示（勾选）、 1=显示
    $("input[name=scrollFlag][value=0]").prop("checked", true);  //是否滚动显示   0=否（勾选） 1=是
    form.render('radio'); //重新渲染单选框

    //票据领用表列表
    table.render($.extend(basePageTable, {
        elem: '#guidingTableListGrid',
        height: getTableHight(),
        cellMinWidth: 100,
        url: projectName + '/guiding/guidingTableListData.jo',
        cols: [[{
            type: 'numbers',
            title: '序号',
            align: 'center',
            fixed: 'left'
        }, {
            unresize: false,
            field: 'guidingTableName',
            title: '分诊台名称',
            align: 'center',
            width: 180,
            fixed: 'left'
        }, {
            unresize: false,
            field: 'guidingTableLoction',
            title: '分诊台位置',
            align: 'center',
            width: 180,
            fixed: 'left'
        }, {
            field: 'guidingTableDesc',
            title: '分诊台说明',
            align: 'center',
            width: 180,
            unresize: false
        }, {
            unresize: false,
            field: 'guidingModeFlag',
            title: '导诊模式',
            align: 'center',
            templet: function (row) {
                var flag = row.guidingModeFlag;
                if (flag == "1") {
                    return "诊室排号";
                } else if (flag == "2") {
                    return "科室排号";
                }
            }
        }, {
            unresize: false,
            field: 'showNameFlag',
            title: '显示姓名',
            align: 'center',
            templet: function (row) {
                var flag = row.showNameFlag;
                if (flag == "0") {
                    return "不显示";
                } else if (flag == "1") {
                    return "显示";
                }
            }
        }, {
            unresize: false,
            field: 'guidingTableIp',
            title: '导诊台机器IP',
            align: 'center',
        }, {
            unresize: false,
            field: 'scrollFlag',
            title: '是否滚动显示',
            align: 'center',
            templet: function (row) {
                var flag = row.scrollFlag;
                if (flag == "0") {
                    return "否";
                } else if (flag == "1") {
                    return "是";
                }
            }
        }, {
            title: '操作',
            unresize: false,
            width: 140,
            align: 'center',
            fixed: 'right',
            toolbar: '#operatebar'
        }]],
        done: function () {
            this.where = {}//清除查询条件
        }
    }));

    form.verify({
        checkIp: [
            /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
            , 'IP地址不符合规则'
        ]
    });

    //操作栏操作按钮的事件
    table.on('tool(guidingTableListGrid)', function (obj) {
        var row = obj.data
        switch (obj.event) {
            case 'btn_show':
                gotoEdit(row, 'show');
                break;
            case 'btn_edit':
                gotoEdit(row, 'edit');
                break;
            case 'btn_delete':
                common.confirm('确定要删除吗？', function () {
                    common.requestServer(projectName + '/guiding/delGuidingTable.jo', {ids: row.guidingTableId}, function (result) {
                        if (result.code == '0') {
                            reloadGrid();
                            refreshOffice(0); //删除之后更新页面，参数guidingTableId设为0，即无对应的科室
                        } else {
                            common.alert(result.msg, 0);
                        }
                    });
                });
                break;
        }
    });

    //修改
    function gotoEdit(row, type) {
        common.requestServer(projectName + '/guiding/findGuidingTableById.jo', {
            guidingTableId: row.guidingTableId}, function (result) {
            if (result.code == '0') {
                $('#guidingTableId').val(result.data.guidingTableId);
                $('#validFlag').val(result.data.validFlag);
                $('#guidingTableName').val(result.data.guidingTableName);
                $('#guidingTableLoction').val(result.data.guidingTableLoction);
                $('#guidingTableDesc').val(result.data.guidingTableDesc);
                $('#guidingTableIp').val(result.data.guidingTableIp);
                $("input[name=guidingModeFlag][value=" + result.data.guidingModeFlag + "]").prop("checked", true);
                $("input[name=showNameFlag][value=" + result.data.showNameFlag + "]").prop("checked", true);
                $("input[name=scrollFlag][value=" + result.data.scrollFlag + "]").prop("checked", true);
                form.render('radio'); //重新渲染单选框
                //展示的话隐藏保存按钮
                if ('show' == type) {
                    $('#bottonDiv').hide();
                }
                if ('edit' == type) {
                    $('#bottonDiv').show();
                }
            } else {
                common.alert(result.msg, 0);
            }
        });
        refreshOffice(row.guidingTableId);
    }

    //更新科室列表
    function refreshOffice(guidingTableId) {
        common.requestServer(projectName + '/guiding/guidingAllOfficeListData.jo', {
            guidingTableId: guidingTableId
        }, function (result) {
            if (result.code == 0) {
                $("input[name=sysOrdName]").removeAttr("disabled").prop("checked", false);
                //当前医院（即所有分诊台）所勾选的科室集合，勾选置灰
                for (var i = 0; i < result.data.allOfficeList.length; i++) {
                    var row = result.data.allOfficeList[i];
                    $("input[name=sysOrdName][value=" + row.officeId + "]").attr("disabled", "disabled")
                }
                //当前分诊台所勾选的科室集合，去掉置灰
                for (var i = 0; i < result.data.guidingTableOfficeList.length; i++) {
                    var row = result.data.guidingTableOfficeList[i];
                    $("input[name=sysOrdName][value=" + row.officeId + "]").removeAttr("disabled").prop("checked", true);
                }
            } else {
                common.alert(result.msg, 0);
            }
            form.render('checkbox'); //重新渲染单选框
            var newHeight = $(window).height() - $("#bottonDiv").offset().top;
            if (newHeight >= 48) {
                $("#bottonDiv").height(newHeight - 10); //保存按钮的高度为38px；再减10px调整
            }
        });
    }

    // 查询按钮
    $('#btn_query').click(function () {
        reloadGrid();
    });

    function reloadGrid() {
        var queryParams = common.serializeObject($('#queryForm'));
        queryParams.guidingTableName = queryParams.guidingTableNameQuery;
        queryParams.guidingTableIp = queryParams.guidingTableIpQuery;

        //执行重载
        table.reload('guidingTableListGrid', {
            where: queryParams,
            height: getTableHight()
        });
    }

    // 清空按钮
    $('#btn_clean').click(function () {
        $('#guidingTableNameQuery').val('');
        $('#guidingTableIpQuery').val('');
        table.reload('guidingTableListGrid');
    });

    // 新增按钮
    $('#btn_add').click(function () {
        $('#guidingTableId').val('');
        $('#guidingTableName').val('');
        $('#guidingTableLoction').val('');
        $('#guidingTableDesc').val('');
        $('#guidingTableIp').val('');
        refreshOffice(0);//参数guidingTableId设为0，即无对应的科室
        $('#bottonDiv').show();
    });

    //监听保存
    form.on('submit(save)', function (data) {
        var sysOrgIdList = [];
        $('input[name="sysOrdName"]:checked:not(:disabled)').each(function (index, domEle) {
            sysOrgIdList.push($(this).val());
        });
        data.field.sysOrgIdList = sysOrgIdList;

        $.ajax({
            url: projectName + '/guiding/saveGuidingTable.jo',
            type: 'get',
            data: data.field,
            traditional: true, //是否使用传统的方式浅层序列化,若有数组参数或对象参数需要设置true
            dataType: 'json',
            success: function (result) {
                if (result.code == '0') {
                    layer.msg('保存成功', {time: 1000}, function () {
                        reloadGrid();
                        //guidingTableId为空，是新增操作
                        if (data.field.guidingTableId == '') {
                            refreshOffice(0);//参数guidingTableId设为0，即无对应的科室
                        } else {
                            refreshOffice(result.data.guidingTableId); //页面显示对应勾选的科室
                        }
                    });
                } else {
                    common.alert(result.msg, 0);
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    function getTableHight() {
        return ($('body').height() - $('#queryForm').height() - 65);
    }

    $(window).resize(function () {
        reloadGrid();
    });

    //获取科室的名称和id
    function getSysOrgData() {
        $.ajax({
            url: projectName + '/sys/queryDepByUnitId.jo',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var sysOrg = data[i];
                        $("#sysOrd").append("<div class='layui-input-inline layui-col-sm3'><input type='checkbox' name='sysOrdName' lay-skin='primary' value= " + sysOrg.orgId + " title=" + sysOrg.name + "></div>");
                    }
                    form.render('checkbox');
                    refreshOffice(0);//初始进入页面，参数guidingTableId设为0，即无对应的科室

                } else {
                    console.log('没有找到对应的科室数据');
                }
            }
        });
    }
});

function checkNameIsRepeat() {
    var guidingTableId = $('#guidingTableId').val();
    if (guidingTableId != '') {
        return;
    }
    var guidingTableName = $('#guidingTableName').val();
    $.ajax({
        url: '../../../guiding/findGuidingTable.jo',
        type: 'get',
        data: {
            guidingTableNameEqu: guidingTableName,
            validFlag: '1'
        },
        dataType: 'json',
        success: function (result) {
            if (result.code == '0') {
                layer.msg('该分诊台名称已存在');
                $('#guidingTableName').val("");
            }
        }
    });
}