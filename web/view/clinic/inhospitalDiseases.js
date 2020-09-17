layui.config({
    base: '/resource/layuiadmin/'   //静态资源所在路径
}).use(['element', 'table', 'form', 'layer', 'laydate', 'util'], function () {
    var table = layui.table,
        laydate = layui.laydate,
        element = layui.element,
        form = layui.form,
        util = layui.util;


    function getDic(dicMapNames){
        var data = {}
        $.ajax({
            type: "POST",
            url: '../../doc/getDicBorrowFlag.jo',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: {"dicMapNames": dicMapNames},
            dataType: "json",
            async: false,
            success: function (returl) {
                data =  returl.dicMap;
            }})
        return data;
    }
    var dicSex = getDic("dicSex")
    var dicRegStatus = getDic("dicRegStatus")
    var dicPatientAttribute = getDic("dicPatientAttribute")
    var dicPaymentMethod = getDic("dicPaymentMethod")
    var dicRegisterType = getDic("dicRegisterType")


    function getOfficMap(unitId){
        var data = {}
        $.ajax({
            type: "POST",
            url: '../../sys/queryDepByUnitId.jo',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: {"outpatientOfficeId": unitId},
            dataType: "json",
            async: false,
            success: function (returl) {
                $.each(returl, function(index, item){
                    data[item.orgId] = item.name;
                })
            }})
        return data;
    }
    var  officeMap = getOfficMap("unitId")
    // console.log(officeMap)
    //获取开单科室
    function loadOffice(name, dicMap) {
        $('select[name="' + name + '"]').empty();
        var options = $.map(dicMap, function (key, value) {
            return '<option value="' + value + '">' + key + '</option>';
        })
        options.unshift('<option value=""></option>')
        $('select[name="' + name + '"]').html(options.join(''));
        form.render();
    }
    loadOffice('outpatientOfficeId', officeMap)


    //获取支付方式
    function loadCheckbox(name, dicMap) {
        var checkboxs = $.map(dicMap, function (key, value) {
            return '<input type="checkbox" name="' + name + '"lay-skin="primary" value="'+ value +'" title="' + key + '">';
        })
        $(':checkbox[name="' + name + '"]').replaceWith(checkboxs.join(''));
        form.render();
    }
    loadCheckbox('selfPayInWay', dicPaymentMethod)

    //列表
    table.render({
        elem : '#basDiseaseListGrid',
        url : '../../clinic/clinicPatientPathListStatisticsData.jo',//数据接口 ,
        limit : 20,
        method:'post',
        cellMinWidth: 130,
        cols : [ [
            {
                title : '序号',
                type : 'numbers',
            },
            {
                field : 'inhospitalNo',
                title : '患者住院号',
                width : 75
            },
            {
                field : 'currentBedNo',
                title : '床号',
                width : 75
            },
            {
                field : 'patientName',
                title : '患者姓名',
                width : 75
            },
            {
                field : 'patientSex',
                title : '性别',
                width : 75
            },
            {
                field : 'patientKind',
                title : '费别',
                width : 75
            },
            {
                field : 'inPathTime',
                title : '入科时间',
                width: 160,
                templet: function (row) {
                    return util.toDateString(row.inPathTime);
                }
            },
            {
                field : 'inDiseaseName',
                title : '临床路径病种',
                minWidth : 200
            },
            {
                field : 'visitOfficeName',
                title : '所在科室',
                width : 110 ,
            },
            {
                field : 'managerDoctorName',
                title : '主治医生',
                width : 110
            },
            {
                field : 'groupLeaderName',
                title : '诊疗组长',
                width : 110
            },
            {
                field : 'archiaterDoctorName',
                title : '主任医生',
                width : 110
            },
            {
                title : '患者版',
                width : 110 ,
                fixed: 'right',
                align: 'center',
                toolbar: '#look'
            },
            {
                title : '操作',
                width : 110 ,
                fixed: 'right',
                align: 'center',
                toolbar: '#lookDetail'
            }
        ] ],
        page : true,
        height : getTableHgt(),
        request : {
            pageName : 'pageNumber' //页码的参数名称，默认：page
            ,
            limitName : 'pageSize' //每页数据量的参数名，默认：limit
        },
        done : function() {
        }
    });


    // 获取表格高度
    function getTableHgt() {
        return ($('body').height() - $('.layui-form').height() - $('#topTools').height() - $('#statisticsChart').height() - 5 - 10)
    }


    // 重置表格高度
    $(window).resize(function () {
        var height = getTableHgt()
        table.reload('basDiseaseListGrid', {
            height: height
        })
    })

    //监听搜索
    $('#btn_query').on('click', function () {
        table.reload('basDiseaseListGrid',{
            where: getQueryParams()
        })
    });

    function getQueryParams() {
        var params = $.extend({
            feeBillNo:'',
            visitCardNo:'',
            outpatientOfficeId:'',
            patientName:'',
            chargeDate:'',
        }, common.serializeObject($('#patient_queryForm')));
        var chargeDate = $('#chargeDate').val();
        if (chargeDate) {
            var chargeDates = chargeDate.split(' - ');
            params.settlementTimeBegin = chargeDates[0];
            params.settlementTimeEnd = chargeDates[1];
        }
        return params;
    }

    //监听行双击事件
    // table.on('rowDouble(basDiseaseListGrid)', function(obj){
    //
    //     var data = obj.data;
    //     window.outpatientOfficeId = data.outpatientOfficeId
    //     top.common.open( '../../report/outpatient/rpOutpatientFeeItem.html?outpatientOfficeId=' + data.outpatientOfficeId, '门诊业务详情（' + data.outpatientOfficeName + '）', {
    //         area: ['90%', '90%'],
    //         scroll: true
    //     })
    // });

    //新增事件
    $('#btn_add').click(function() {
        var title = '导出数据'
        var iframeEnvironment = 'I402880460168db4bdb4bec6b0168dcd649c523f8';
        var content = diResource + iframeEnvironment
        //true 执行
        common.open(content, title, {
            area : [ '1660px', '80%' ],
            scroll:'yes'
        });
    });

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('statisticsChart'));

    // 构建图形
    function buildChart(countNum, dataName, dataNum) {
        // 指定图表的配置项和数据
        var option = {
            // 全局调色盘。
            color: ['#378ec2'],
            title: {
                x: 'center',
                text: '当前在院临床路径患者数情况',
                subtext: countNum + '组数据',
                textAlign:'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                x: 'left',
                data: [ '在院临床路径患者数']
            },
            grid: {
                left: '3%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: dataName,
                axisLabel: { //坐标轴刻度标签的相关设置。
                    formatter: function(params) {
                        var newParamsName = ""; // 最终拼接成的字符串
                        var paramsNameNumber = params.length; // 实际标签的个数
                        var provideNumber = 7; // 每行能显示的字的个数
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                        /**
                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                         */
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                            /** 循环每一行,p表示行 */
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = ""; // 表示每一次截取的字符串
                                var start = p * provideNumber; // 开始截取的位置
                                var end = start + provideNumber; // 结束截取的位置
                                // 此处特殊处理最后一行的索引值
                                if (p == rowNumber - 1) {
                                    // 最后一次不换行
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    // 每一次拼接字符串并换行
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr; // 最终拼成的字符串
                            }

                        } else {
                            // 将旧标签的值赋给新标签
                            newParamsName = params;
                        }
                        //将最终的字符串返回
                        return newParamsName
                    }
                }
            },
            series: [
                {
                    name: '在院临床路径患者数',
                    type: 'bar',
                    data: dataNum
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option, true);
    }

    // 按病种统计
    function getCountByDisease(){
        $.ajax({
            type: "POST",
            url: '../../clinic/clinicPatientPathStatisticsByDisease.jo',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: null,
            dataType: "json",
            async: false,
            success: function (returl) {
                console.log(returl.data[0][1])
                var countNum = returl.count;
                var dataName = [];
                var dataNum = [];

                $.each(returl.data, function(index, item){
                    if (item[1]) {
                        dataName.push(item[1]);
                        dataNum.push(item[2]);
                    }
                });
                buildChart(countNum, dataName, dataNum);
            }
        });
    }

    // 按科室统计
    function getCountByOffice(){
        $.ajax({
            type: "POST",
            url: '../../clinic/clinicPatientPathStatisticsByOffice.jo',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: null,
            dataType: "json",
            async: false,
            success: function (returl) {
                buildChart(returl.size, returl.officeName, returl.countNum);
            }
        });
    }

    form.on('radio(count)', function (data) {
        if ($('input[name="count"]:checked ').val() == "0") {
            getCountByOffice();
        } else if ($('input[name="count"]:checked ').val() == "1"){
            getCountByDisease();
        }
        form.render();
    });

    getCountByOffice();

});