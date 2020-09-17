(async () => {
    // 全局变量
    let istrue = true

    let _$ = (dom) => {
        return document.querySelector(dom)
    }
    // 渲染echarts
    let renderEcharts = (myChart,option) => {
        myChart.setOption(option)
    }

    let echarts_shiduanfenbu = () => {
        let option = {
            // title: {
            //     // text:'当日挂号人数时段分布',
            //     textStyle: {
            //         fontSize: 16,
            //         color: '#3e3e3e'
            //     }
            // },
            grid:{
                top: '10%',
                left: '5%',
                bottom: '10%',
                right: '10%',
                width: '80%'
            },
            xAxis: {
                type: 'category',
                data: ['1', '2','3','4','5','6','7','8','9','10','11','12'],
                splitLine:{show: false},
                axisLabel: {
                    color: '#3e3e3e'
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(0,0,0,0.3)',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#3e3e3e'
                },
                splitLine:{show: false},
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(0,0,0,0.3)',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
            },
            series: [{
                // itemStyle : { normal: {label : {show: true,fontSize: 15}}},
                // lineStyle: {normal: {color: ''}},
                symbolSize: 15,
                color: '#ff4b1e',
                data: [1,1,1,1,1,1,1,1,1,1,1,1],
                type: 'line'
            }]
        };
        console.log(_$('#echarts_shiduanfenbu'));
        let mychart = echarts.init(_$('#echarts_shiduanfenbu'))
        renderEcharts(mychart,option)
    }
    let table_shiduanqingkuang = () => {
        console.log(tableHeight);
        layui.use(['table'], function() {
            let table = layui.table
            let object = {
                elem: '#table_shiduanqingkuang',
                height: tableHeight,
                url: '',
                toolbar: '#toolbarDemo',
                defaultToolbar: [{
                    title: '排序',
                    layEvent: 'sort',
                    icon: 'layui-icon-triangle-d'
                },{
                    title: '全屏',
                    layEvent: 'fullscreen',
                    icon: 'layui-icon-screen-full'
                }],
                page: true,
                cellMinWidthL: 80,
                cols: [[
                    {
                        field: 'consultatName',
                        title: '诊室名称',
                    },
                    {
                        field: 'doctorName',
                        title: '医生姓名',
                    },
                    {
                        field: 'timeArea',
                        title: '时段',
                    },
                    {
                        field: 'registNum',
                        title: '挂号人数',
                    }
                ]],
                data:[
                    {
                        "consultatName": "测试诊室",
                        "doctorName": "测试医生",
                        "timeArea": "8",
                        "registNum": "1"
                    },
                    {
                        "consultatName": "测试诊室",
                        "doctorName": "测试医生",
                        "timeArea": "9",
                        "registNum": "1"
                    },
                ]
            }
            table.render(object)


            table.on('toolbar(test)', function(obj){
                console.log(obj);
                var checkStatus = table.checkStatus(obj.config.id);
                switch(obj.event){
                    case 'sort':
                        if(istrue){
                            object.cols[0].forEach(item => {
                                item.sort = true
                            })
                            table.render(object)
                            istrue = !istrue
                            layer.msg('显示排序');
                        }else {
                            object.cols[0].forEach(item => {
                                item.sort = false
                            })
                            table.render(object)
                            istrue = !istrue
                            layer.msg('取消排序');
                        }
                        break;
                    case 'fullscreen':
                        if(istrue){
                            _$('.echarts_charts').style.display = 'none'
                            _$('.echarts_table').style.width = '100%'
                            object.defaultToolbar[1].icon = 'layui-icon-screen-restore'
                            table.render(object)
                            istrue = !istrue
                        }else {
                            _$('.echarts_charts').style.display = 'flex'
                            _$('.echarts_table').style.width = '50%'
                            object.defaultToolbar[1].icon = 'layui-icon-screen-full'
                            table.render(object)
                            istrue = !istrue
                        }
                        break;
                    case 'update':
                        layer.msg('编辑');
                        break;
                };
            })
        })
    }
    table_shiduanqingkuang()
    echarts_shiduanfenbu();



    (() => {
        let data = [{
            name: '门诊人次',
            value: '1人',
        },{
            name: '急诊人次',
            value: '1人',
        },{
            name: '健康体检人次',
            value: '1人',
        },{
            name: '门诊人次',
            value: '1人',
        },{
            name: 'B超使用人次',
            value: '1人',
        },{
            name: 'CT使用人次',
            value: '1人',
        }]


        data.forEach(item => {
            let domDiv = document.createElement('div')
            domDiv.innerHTML = `${item.name}：${item.value}`
            _$('.huanzhe_info').appendChild(domDiv)
        })
    })()

})()