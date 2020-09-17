/**
 *
 */
function babyTemperature(selector, opt) {
    this.svg;
    this.selector = selector;
    this.defaultOpt = {
        width: 773, // 整体表格默认宽度
        height: 1200, // 整体表格默认高度
        hMinCellNum: 42, // 水平小格子数
        vMinCellNum: 46, // 垂直小格子数
        painCellNum: 15, // 疼痛纵向格子数
        topRowTextY: 20, // 单元格文本Y轴偏移量
        topRowTextX: 25, // 日期文本Y轴偏移量
        topRowHeight: 35, // 头部行高度
        topRowNum: 2, //头部行高度
        bottomRowHeight: 30, // 底部行高
        lineC: 'gray', // 线条默认颜色
        lineW: 1, // 线条默认宽度
        circleLineW: 1,  // 线条两点之间默认宽度
        circleX: 0, // 每个圆点水瓶座标偏移量
        circleR: 5, // 每个圆点的直径
        pointOffsetX: -6, // 标点Y轴偏移量
        pointOffsetY: 4, // 标点Y轴偏移量
        maxTemp: 43,  // 体温显示最最大值
        minTemp: 33.8,  // 体温显示最小值
        tempScale: 0.2,
        tempColor: 'blue',  // 体温显示颜色
        maxBreath: 50,  // 呼吸显示最最大值
        minBreath: 4,  // 呼吸显示最小值
        breathColor: 'green', // 呼吸显示颜色
        maxPul: 200, // 脉搏显示最大值
        minPul: 16, // 脉搏显示最小值
        pulseColor: 'red',  // 脉搏显示颜色
        maxBoxTemp: 40,// 箱温显示最小值
        minBoxTemp: 21.6,// 箱温显示最大值
        boxColor: 'orange',
        cell: 16,// 每个小单元格默认的宽高
        minTime: 2,  // 时间显示最小值
        timeOffsetY: 10, // 时间高度偏移量
        timeTextY: 20, // 时间文本Y轴偏移量
        timeTextX: 40, // 时间文本X轴偏移量
        timeRowHeight: 30, // 时间行高
        cellBeginX: 100, // 时间起始位置纵线
        textCell: 5, // 每行标题偏移量
        rowOffsetY: 2, // 每行高度偏移量（根据cell变量来计算）
        measureOffsetX: 5.5,// 刻度值X轴偏移量
        measureOffsetY: 0,// 刻度值Y轴偏移量
        mTitleOffsetX: 12,// 标题Y轴偏移量
        iconOffsetY: 50,// 指标图标Y轴偏移量
        bottomOffsetY: 20, // 底部表格第一列标题的Y轴偏移量
        bottomOffsetX: 8, // 底部表格第一列标题的X轴偏移量
        bottomValueX: 25, // 底部表格数据值的X轴偏移量
        bottomValueY: 20, // 底部表格数据值的Y轴偏移量
        bottomConfig: {}
    }

    $.extend(this.defaultOpt, opt);
    this.defaultOpt.timeBeginY = this.defaultOpt.topRowHeight * this.defaultOpt.topRowNum;
    this.defaultOpt.cellBeginY = this.defaultOpt.topRowHeight * this.defaultOpt.topRowNum + this.defaultOpt.timeRowHeight;
    this.defaultOpt.tpCellNum = this.defaultOpt.tpCellNum + (this.defaultOpt.painCellNum && this.defaultOpt.painCellNum > 0 ? this.defaultOpt.painCellNum : 0);
    this.defaultOpt.cellEndY = this.defaultOpt.cellBeginY + (this.defaultOpt.cell * this.defaultOpt.vMinCellNum);
    this.defaultOpt.dayWidth = this.defaultOpt.cell * 6;
    this.defaultOpt.tempScale = (this.defaultOpt.maxTemp - this.defaultOpt.minTemp) / this.defaultOpt.vMinCellNum;
    this.defaultOpt.pulseScale = (this.defaultOpt.maxPul - this.defaultOpt.minPul) / this.defaultOpt.vMinCellNum;
    this.defaultOpt.breathScale = (this.defaultOpt.maxBreath - this.defaultOpt.minBreath) / this.defaultOpt.vMinCellNum;
    this.defaultOpt.boxTempScale = (this.defaultOpt.maxBoxTemp - this.defaultOpt.minBoxTemp) / this.defaultOpt.vMinCellNum;
    this.opt = this.defaultOpt;
}

//初始化体温单
babyTemperature.prototype.initTemp = function (footData) {
    this.opt.bottomConfig = footData;
    var svg = d3.select(this.selector).append('svg');
    svg.attr('width', this.opt.width).attr('height', this.opt.height);
    // 第一条横向线
    svg.append('line').attr({
        x1: 0,
        y1: 1,
        x2: this.opt.width,
        y2: 1
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    // 底部最后一条横线
    svg.append('line').attr({
        x1: 0,
        y1: this.opt.height,
        x2: this.opt.width,
        y2: this.opt.height
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    // 最左边纵线
    svg.append('line').attr({
        x1: 1,
        y1: 0,
        x2: 1,
        y2: this.opt.height
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    //最右边纵线
    svg.append('line').attr({
        x1: this.opt.width - 1,
        y1: 0,
        x2: this.opt.width - 1,
        y2: this.opt.height
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });

    /********头部行********/
    // 头部行-纵线
    svg.append('line').attr({
        x1: this.opt.cellBeginX,
        y1: 0,
        x2: this.opt.cellBeginX,
        y2: this.opt.topRowHeight * this.opt.topRowNum
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    for (var i = 1; i < 8; i++) {
        svg.append('line').attr({
            x1: this.opt.cellBeginX + this.opt.dayWidth * i,
            y1: 0,
            x2: this.opt.cellBeginX + this.opt.dayWidth * i,
            y2: this.opt.topRowHeight * this.opt.topRowNum
        }).style({
            stroke: this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
    }
    var topRowTitles = ['日期','住院日数',''];
    // 头部行-横线、表头文本
    for (var i = 0; i < this.opt.topRowNum; i++){
        //横线
        svg.append('line').attr({
            x1: 0,
            y1: this.opt.topRowHeight * (i + 1),
            x2: this.opt.width,
            y2: this.opt.topRowHeight * (i + 1),
        }).style({
            stroke: this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
        //文本
        svg.append('text').text(topRowTitles[i]).attr({
            x: this.opt.topRowTextX,
            y: this.opt.topRowHeight * i + this.opt.topRowTextY,
        });
    }

    /*************时间行*****************/
    // 时间横线
    svg.append('line').attr({
        x1: 0,
        y1: this.opt.cellBeginY,
        x2: this.opt.width,
        y2: this.opt.cellBeginY
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    // 时间标题
    svg.append('text').text('时间').attr({
        x: this.opt.timeTextX,
        y: this.opt.topRowHeight * this.opt.topRowNum + this.opt.timeTextY,
    });

    /*************指标刻度分割纵线*****************/
    for (var i = 0; i < 4; i++) {
        svg.append('line').attr({
            x1: (this.opt.cellBeginX / 4) * i,
            y1: this.opt.cellBeginY,
            x2: (this.opt.cellBeginX / 4) * i,
            y2: this.defaultOpt.cellEndY
        }).style({
            stroke: this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
    }
    // 指标标题
    svg.append('text').text('呼吸').attr({
        x: this.opt.mTitleOffsetX,
        y: this.opt.cellBeginY + this.opt.measureOffsetY,
        style: 'writing-mode: tb;'
    }).style({fill: this.opt.breathColor});
    svg.append('text').text('脉搏').attr({
        x: (this.opt.cellBeginX / 4) + this.opt.mTitleOffsetX,
        y: this.opt.cellBeginY + this.opt.measureOffsetY,
        style: 'writing-mode: tb;'
    }).style({fill: this.opt.pulseColor});
    svg.append('text').text('体温').attr({
        x: (this.opt.cellBeginX / 4) * 2 + this.opt.mTitleOffsetX,
        y: this.opt.cellBeginY + this.opt.measureOffsetY,
        style: 'writing-mode: tb;'
    }).style({fill: this.opt.tempColor});
    svg.append('text').text('箱温').attr({
        x: (this.opt.cellBeginX / 4) * 3 + this.opt.mTitleOffsetX,
        y: this.opt.cellBeginY + this.opt.measureOffsetY,
        style: 'writing-mode: tb;'
    }).style({fill: this.opt.boxColor});
    // 各指标对应的标点图标
    svg.append('text').text("▲").attr({x:this.opt.measureOffsetX, y: this.opt.cellBeginY + this.opt.iconOffsetY, fill: this.opt.breathColor});
    svg.append('text').text("❤").attr({x:(this.opt.cellBeginX / 4) + this.opt.measureOffsetX, y: this.opt.cellBeginY + this.opt.iconOffsetY, fill: this.opt.pulseColor});
    svg.append('circle').attr({cx: (this.opt.cellBeginX / 4) * 2  + this.opt.measureOffsetX + 7, cy: this.opt.cellBeginY + this.opt.iconOffsetY - 4, fill: this.opt.tempColor, r: this.opt.circleR});
    svg.append('text').text("✖").attr({x: (this.opt.cellBeginX / 4) * 3 + this.opt.measureOffsetX, y: this.opt.cellBeginY + this.opt.iconOffsetY, fill: this.opt.boxColor});


    // 时间纵线
    var t = this.opt.minTime;
    for (var i = 0; i < this.opt.hMinCellNum; i++) {
        var range = i * this.opt.cell;
        var day = i % 6 === 0;
        // 纵线
        svg.append('line').attr({
            x1: this.opt.cellBeginX + range,
            y1: this.opt.timeBeginY, // 纵线从“时间”行开始
            x2: this.opt.cellBeginX + range,
            y2: day ? this.opt.height : this.opt.cellEndY
        }).style({
            stroke: day && i != 0 && i != 42 ? 'red' : this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
        t = day ? this.opt.minTime : (t + 4);
        // 时间
        svg.append('text').text(t).attr({
            x: this.opt.cellBeginX + 5 + range - (t > 9 ? 4 : 0),
            y: this.opt.timeBeginY + this.opt.timeTextY,
        }).attr({"font-size": "13px"});
    }

    // 小格子横线
    var b = this.opt.maxBreath, p = this.opt.maxPul, t = this.opt.maxTemp, bt = this.opt.maxBoxTemp;
    for (var i = 0; i < this.opt.vMinCellNum; i++) {
        var range = i * this.opt.cell;
        var interval = i % 5 === 0;
        // 横线线
        svg.append('line').attr({
            x1: this.opt.cellBeginX,
            y1: this.opt.cellBeginY + range,
            x2: this.opt.width,
            y2: this.opt.cellBeginY + range
        }).style({
            stroke: interval ? 'black' : this.opt.lineC,
            'stroke-width': this.opt.lineW
        });

        if (interval && i > 0 ) {
            t -= this.opt.tempScale * 5;
            p -= this.opt.pulseScale * 5;
            b -= this.opt.breathScale * 5;
            bt -= this.opt.boxTempScale * 5;
            // 呼吸刻度值
            svg.append('text').text(Math.round(b)).attr({
                x: this.opt.measureOffsetX,
                y: this.opt.cellBeginY + range + 5,
            }).style({fill: this.opt.breathColor});
            // 脉搏刻度值
            svg.append('text').text(Math.round(p)).attr({
                x: (this.opt.cellBeginX / 4) + this.opt.measureOffsetX - (p < 100 ? 0 : 5),
                y: this.opt.cellBeginY + range + 5,
            }).style({fill: this.opt.pulseColor});
            // 体温刻度值
            svg.append('text').text(Math.round(t)).attr({
                x: (this.opt.cellBeginX / 4) * 2 + this.opt.measureOffsetX ,
                y: this.opt.cellBeginY + range + 5,
            }).style({fill: this.opt.tempColor});
            // 箱温刻度值
            svg.append('text').text(Math.round(bt)).attr({
                x: (this.opt.cellBeginX / 4) * 3 + this.opt.measureOffsetX,
                y: this.opt.cellBeginY + range + 5,
            }).style({fill: this.opt.boxColor});
        }
    }

    //坐标图结束行
    svg.append('line').attr({
        x1: 0,
        y1: this.opt.cellEndY,
        x2: this.opt.width,
        y2: this.opt.cellEndY,
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });


    //底部方格('大便次数', '血压mmHg', '身高cm', '体重kg', '总入量ml', '总出量ml', '引流量ml', '药物过敏')
    var bc = 1;
    for (k in this.opt.bottomConfig) {
        var d = this.opt.bottomConfig[k];
        d['index'] = bc;
        // 横线高度
        var bottomY = this.opt.cellEndY + this.opt.bottomRowHeight * bc;
        svg.append('line').attr({
            x1: 0,
            y1: bottomY,
            x2: this.opt.width,
            y2: bottomY,
        }).style({
            stroke: this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
        svg.append('text').text(d.title).attr({
            x: this.opt.bottomOffsetX,
            y: bottomY - this.opt.bottomRowHeight + this.opt.bottomOffsetY,
        });
        bc++;
    }
    this.svg = svg;
    return this;
}

// 填充数据
babyTemperature.prototype.initData = function (data) {
    console.log(data);
    var svg = this.svg,bx, by, tx, ty, px, py, btx, bty, index = 0;
    for (k in data) {
        var d = data[k];

        // 日期*********************/
        svg.append('text').text(k).attr({
            x: this.opt.cellBeginX + this.opt.cell * 6 * index + 10,
            y: this.opt.topRowTextY,
        });
        // 住院天数
        svg.append('text').text(d.inhospitalDay + "天").attr({
            x: this.opt.cellBeginX + this.opt.cell * 6 * index + 30,
            y: this.opt.topRowHeight + this.opt.topRowTextY,

        });

        for (var i = 0; i < d.lineData.length; i++) {
            var v = d.lineData[i];
            debugger;
            var localX = this.opt.cellBeginX + this.opt.cell * 6 * index + (this.opt.cell  * v.time / 4);
            var bLocaly = this.opt.cellBeginY + (this.opt.maxBreath - v.breath) / this.opt.breathScale * this.opt.cell; //呼吸圆点Y轴值
            var tLocaly = this.opt.cellBeginY + (this.opt.maxTemp - v.temp) / this.opt.tempScale * this.opt.cell; // 体温圆点Y轴值
            var pLocaly = this.opt.cellBeginY + (this.opt.maxPul - v.pulse) / this.opt.pulseScale * this.opt.cell; // 脉搏圆点Y轴值
            var btLocaly = this.opt.cellBeginY + (this.opt.maxBoxTemp - v.boxTemp) / this.opt.boxTempScale * this.opt.cell; // 箱温圆点Y轴值
            /**************画体温折线*****************/
            if (v.temp && v.temp >= this.opt.minTemp && v.temp <= this.opt.maxTemp) {
                if (!tx && !ty) {
                    tx = localX, ty = tLocaly;
                    // 体温折线的第一个圆点
                    svg.append('circle').attr({cx: tx + this.opt.circleX, cy: ty, fill: this.opt.tempColor, r: this.opt.circleR});
                } else {
                    // 体温两个点之间的线条
                    svg.append('line').attr({
                        x1: tx + this.opt.circleX,
                        y1: ty,
                        x2: localX + this.opt.circleX,
                        y2: tLocaly
                    }).style({stroke: this.opt.tempColor, 'stroke-width': this.opt.circleLineW});
                    tx = localX, ty = tLocaly;
                    // 体温两点间的第二个圆点
                    svg.append('circle').attr({cx: tx + this.opt.circleX, cy: ty, fill: this.opt.tempColor, r: this.opt.circleR});
                }
            }
            /**************画脉搏折线*****************/
            if (v.pulse &&v.pulse >= this.opt.minPul && v.pulse <= this.opt.maxPul) {
                if (!px && !py) {
                    px = localX, py = pLocaly;
                    // 脉搏折线的第一个圆点
                    svg.append('text').text("❤").attr({x: px + this.opt.pointOffsetX, y: py + this.opt.pointOffsetY, fill: this.opt.pulseColor});
                } else {
                    // 脉搏两个点之间的线条
                    svg.append('line').attr({
                        x1: px, y1: py, x2: localX, y2: pLocaly
                    }).style({stroke: this.opt.pulseColor, 'stroke-width': this.opt.circleLineW});
                    px = localX, py = pLocaly;
                    // 脉搏两点间的第二个圆点
                    svg.append('text').text("❤").attr({x: px + this.opt.pointOffsetX, y: py + this.opt.pointOffsetY, fill: this.opt.pulseColor});
                }
            }
            /**************画呼吸折线*****************/
            if (v.breath && v.breath >= this.opt.minBreath && v.breath <= this.opt.maxBreath) {
                if (!bx && !by) {
                    bx = localX, by = pLocaly;
                    svg.append('text').text("▲").attr({x: bx + this.opt.pointOffsetX, y: by + this.opt.pointOffsetY, fill: this.opt.breathColor});
                } else {
                    svg.append('line').attr({
                        x1: bx, y1: by, x2: localX, y2: bLocaly
                    }).style({stroke: this.opt.breathColor, 'stroke-width': this.opt.circleLineW});
                    bx = localX, by = bLocaly;
                    svg.append('text').text("▲").attr({x: bx + this.opt.pointOffsetX, y: by + this.opt.pointOffsetY, fill: this.opt.breathColor});
                }
            }
            /**************画箱温折线*****************/
            if (v.boxTemp && v.boxTemp >= this.opt.minBoxTemp && v.boxTemp <= this.opt.maxBoxTemp) {
                if (!btx && !bty) {
                    btx = localX, bty = btLocaly;
                    // 箱温折线的第一个圆点
                    svg.append('text').text("✖").attr({x: btx + this.opt.pointOffsetX, y: bty + this.opt.pointOffsetY, fill: this.opt.boxColor});
                } else {
                    // 箱温两个点之间的线条
                    svg.append('line').attr({
                        x1: btx, y1: bty, x2: localX, y2: btLocaly
                    }).style({stroke: this.opt.boxColor, 'stroke-width': this.opt.circleLineW});
                    btx = localX, bty = btLocaly;
                    // 箱温两点间的第二个圆点
                    svg.append('text').text("✖").attr({x: btx + this.opt.pointOffsetX, y: bty + this.opt.pointOffsetY, fill: this.opt.boxColor});
                }
            }
        }

        // 底部其他数据值填充
        for (bk in this.opt.bottomConfig) {
            var item = this.opt.bottomConfig[bk];
            var value = d[bk];
            svg.append('text').text(value).attr({
                x: this.opt.cellBeginX + this.opt.cell * 6 * index + this.opt.bottomValueX,
                y: this.opt.cellEndY + (item.index - 1) * this.opt.bottomRowHeight + this.opt.bottomValueY,
            });
        }

        index++;
    }
    return this;
}