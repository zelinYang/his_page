(async () => {
    // 全局变量
    let istrue = true

    let _$ = (dom) => {
        return document.querySelector(dom)
    }
    // 渲染echarts
    let renderEcharts = (dom,option) => {
        let myChart = echarts.init(_$(dom))
        myChart.setOption(option)
    };


    // 当日挂号次数
    (() => {
        let option = {
            title: {
                text:'当日挂号次数',
                textStyle: {
                    fontSize: 16,
                    color: '#3e3e3e'
                }
            },
            tooltip: {
                formatter: '{a} <br/>{b} : {c}'
            },
            toolbox: {
                show: false,
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '当日挂号次数',
                    type: 'gauge',
                    detail: {formatter: '{value}'},
                    data: [{value: 20}],
                    radius: '90%',
                    axisLine: {
                        lineStyle: {
                            color: [[0.2,'#1EE0FF'],[0.8,'#1E8FFF'],[1,'#EDE12E']]
                        }
                    }
                }
            ]
        };
        renderEcharts('#guahao_echart',option)
    })();



    // 当日收费次数
    (() =>{
        let option = {
            title: {
                text:'当日收费次数',
                textStyle: {
                    fontSize: 16,
                    color: '#3e3e3e'
                }
            },
            tooltip: {
                formatter: '{a} <br/>{b} : {c}'
            },
            toolbox: {
                show: false,
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '当日收费次数',
                    type: 'gauge',
                    detail: {formatter: '{value}'},
                    data: [{value: 40}],
                    radius: '90%',
                    axisLine: {
                        lineStyle: {
                            color: [[0.2,'#1EE0FF'],[0.8,'#1E8FFF'],[1,'#EDE12E']]
                        }
                    }
                }
            ]
        };
        renderEcharts('#shoufei_echart',option)
    })();


    // 就诊等待时间
    (() =>{
        let option = {
            title: {
                text:'就诊等待时间',
                textStyle: {
                    fontSize: 16,
                    color: '#3e3e3e'
                }
            },
            tooltip: {
                formatter: '{a} <br/>{b} : {c}'
            },
            toolbox: {
                show: false,
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '就诊等待时间',
                    type: 'gauge',
                    detail: {formatter: '{value}'},
                    data: [{value: 90}],
                    radius: '90%',
                    axisLine: {
                        lineStyle: {
                            color: [[0.2,'#1EE0FF'],[0.8,'#1E8FFF'],[1,'#EDE12E']]
                        }
                    }
                }
            ]
        };
        renderEcharts('#waitTime_echart',option)
    })();

    (() => {
        let arrName = []
        let arrvalue = []
        for(let index = 1;index <= 20;index ++){
            arrName.push(index>9?index:`0${index}`)
            let num = Math.random()*(100000-10000+1)+10000
            let obj = {
                name: index>9?index:`0${index}`,
                value: num
            }
            arrvalue .push(obj)
        }

        let option = {
            title: {
                text: '医疗收入构成图',
                left: 10
            },
            tooltip: {
                trigger: 'item',
                formatter(value){
                    // console.log(value);
                    return `类型编码：${value.data.name}<br/>收入（合计）：${Math.floor(value.data.value)}`
                }
            },
            legend: {
                type: 'scroll',
                orient: 'horizontal',
                bottom: 5,
                right: 100,
                left: 100,
                data: arrName,
            },
            series: [
                {
                    name: '类型编码',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: arrvalue,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        renderEcharts('#shourugc',option)
    })();


    (() => {
        let arrName = []
        let arrvalue = []
        for(let index = 1;index <= 20;index ++){
            arrName.push(index>9?index:`0${index}`)
            let num = Math.random()*(100000-10000+1)+10000
            let obj = {
                name: index>9?index:`0${index}`,
                value: num
            }
            arrvalue .push(obj)
        }

        let option = {
            title: {
                text: '门诊收入统计图',
                left: 10
            },
            legend:{
                data: ['月度收入（万元）'],
                right: 20,
                top: 10,
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [8.20, 9.32, 9.01, 9.34, 12.90, 13.30, 13.20,12.00],
                type: 'line',
                name: '月度收入（万元）',
                itemStyle: { normal: {label : {show: true,fontSize: 15}}},
            }]
        };

        renderEcharts('#menzhensrtj',option)
    })();

})()