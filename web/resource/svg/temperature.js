/**
 * 
 */
function temperature(selector, opt) {
    this.svg;
    this.selector = selector;
    this.defaultOpt = {
            width: 768, // 整体表格默认宽度
            height: 1350, // 整体表格默认高度 
            tCellNum: 43, // 体温脉搏横向格子数
            tpCellNum: 45, // 体温脉搏纵向格子数
            painCellNum: 15, // 疼痛纵向格子数
            dateTextY: 20, // 日期文本Y轴偏移量
            dateTextX: 40, // 日期文本Y轴偏移量
            dateHeight: 45, // 头部日期高度
            lineC:'gray', // 线条默认颜色
            lineW: 1, // 线条默认宽度
            circleLineW: 1,  // 线条两点之间默认宽度
            circleX: 7.5, // 每个圆点水瓶座标偏移量
            circleR: 5, // 每个圆点的直径
            maxTem: 43,  // 体温显示最最大值 
            minTem: 33.8,  // 体温显示最小值 
            tempColor: 'blue',  // 体温显示颜色
            maxPul: 200, // 脉搏显示最大值
            minPul: 16, // 脉搏显示最小值
            pulsColor: 'red',  // 体温显示颜色
            breathColor: 'green', // 呼吸显示颜色
            cell: 16,// 每个小单元格默认的宽高
            minTime: 2,  // 时间显示最小值
            timeOffsetY: 10, // 时间高度偏移量
            timeTextY: 13, // 时间文本Y轴偏移量
            timeTextX: 40, // 时间文本X轴偏移量
            cellBeginLeft: 95, // 时间起始位置纵线
            textCell: 5, // 每行标题偏移量
            rowOffsetY: 2, // 每行高度偏移量（根据cell变量来计算）
            ptLineX: 50,// 脉搏和温度值分割线
            pOffsetX: 0,// 脉搏标题X轴偏移量
            pOffsetY: 20,// 脉搏标题Y轴偏移量
            tOffsetX: -3,// 温度标题X轴偏移量
            maxPain: 15, // 疼痛最大数值
            painOffsetX: 10,// 疼痛标题X轴偏移量
            painColor: "#9ACD32",// 疼痛显示颜色
            tOffsetY: 20,// 温度标题Y轴偏移量
            bottomOffsetX: 8, // 底部表格第一列标题的X轴偏移量
            bottomValueX: 15, // 底部表格数据值的X轴偏移量
            bottomConfig: {}
    }

    $.extend(this.defaultOpt, opt);
    this.defaultOpt.timeHeight = this.defaultOpt.dateHeight * 2 - this.defaultOpt.timeOffsetY;
    this.defaultOpt.bottomTextCell = this.defaultOpt.cell - this.defaultOpt.textCell;
    this.defaultOpt.insideW = this.defaultOpt.cellBeginLeft + this.defaultOpt.cell * (this.defaultOpt.tCellNum - 1);
    this.defaultOpt.tpCellNum = this.defaultOpt.tpCellNum + (this.defaultOpt.painCellNum && this.defaultOpt.painCellNum > 0 ? this.defaultOpt.painCellNum : 0);
    this.defaultOpt.breathHeight = this.defaultOpt.timeHeight + (this.defaultOpt.cell * this.defaultOpt.tpCellNum) + (this.defaultOpt.cell * 3);
    this.defaultOpt.painHeight = this.defaultOpt.timeHeight + (this.defaultOpt.cell * (this.defaultOpt.tpCellNum - this.defaultOpt.painCellNum)) + this.defaultOpt.cell;
    this.opt = this.defaultOpt;
}

//初始化体温单
temperature.prototype.initTemp = function(footData){
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

    /********日期********/
    // 日期横线
    svg.append('line').attr({
        x1: 0,
        y1: this.opt.dateHeight,
        x2: this.opt.insideW,
        y2: this.opt.dateHeight
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    // 日期标题
    svg.append('text').text('日期').attr({
        x: this.opt.dateTextX,
        y: this.opt.dateHeight - this.opt.dateTextY,
    });
    // 日期列
    for (var i = 0; i < 8; i++) {
        var range = i * this.opt.cell * 6;
        // 纵线
        svg.append('line').attr({
            x1: this.opt.cellBeginLeft + range,
            y1: 0,
            x2: this.opt.cellBeginLeft + range,
            y2: this.opt.dateHeight
        }).style({
            stroke: this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
    }

    /*************时间行*****************/
    // 时间横线
    svg.append('line').attr({
        x1: 0,
        y1: this.opt.timeHeight,
        x2:  this.opt.insideW,
        y2: this.opt.timeHeight
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    // 时间标题
    svg.append('text').text('时间').attr({
        x: this.opt.timeTextX,
        y: this.opt.timeHeight - this.opt.timeTextY,
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
     
     
    /****  纵向线 ******/
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
        x1: this.opt.width,
        y1: 0,
        x2: this.opt.width,
        y2: this.opt.height
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });

    // 脉搏体温分割纵线
    svg.append('line').attr({
        x1: this.opt.ptLineX,
        y1: this.opt.timeHeight,
        x2: this.opt.ptLineX,
        y2: this.defaultOpt.painHeight
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    // 脉搏 体温 标题
    svg.append('text').text('脉搏').attr({
        x: this.opt.ptLineX/4 + this.opt.pOffsetX,
        y: this.opt.timeHeight + this.opt.pOffsetY
    }).style({fill: this.opt.pulsColor});
    svg.append('text').text('体温').attr({
        x: this.opt.ptLineX + this.opt.ptLineX/4 + this.opt.tOffsetX,
        y: this.opt.timeHeight + this.opt.tOffsetY,
    }).style({fill: this.opt.tempColor});

    // 时间纵线
    var  t = this.opt.minTime;
    for (var i = 0; i < this.opt.tCellNum; i++) {
        var range = i * this.opt.cell;
        var day = i % 6 === 0;
        // 纵线
        svg.append('line').attr({
            x1: this.opt.cellBeginLeft + range,
            y1: this.opt.dateHeight,
            x2:this.opt. cellBeginLeft + range,
            y2: day ? this.opt.height : this.opt.breathHeight
        }).style({
            stroke: day && i != 0 && i != 42 ? 'red' : this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
        if (i === 42) { continue; }
        t = day ? this.opt.minTime : (t + 4);
        // 时间
        svg.append('text').text(t).attr({
            x: this.opt.cellBeginLeft + 5 + range - (t > 9 ? 4 : 0),
            y: this.opt.timeHeight - 10,
        }).attr({"font-size":"13px"});
    }

    // 温度摄氏度横线
    var c = this.opt.maxTem, p = this.opt.maxPul, pa = this.opt.maxPain, tpPainCell = this.opt.tpCellNum - this.opt.painCellNum;
    for (var i = 0; i < (this.opt.tpCellNum + 1); i++) {
        var range = i * this.opt.cell;
        var interval = i % 5 === 0;
        // 横线线
        svg.append('line').attr({
            x1: this.opt.cellBeginLeft,
            y1: this.opt.timeHeight + range,
            x2:  this.opt.insideW,
            y2: this.opt.timeHeight + range
        }).style({
            stroke: interval ? 'black' : this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
        
        if (interval && i > 0 && i <= tpPainCell) {
            c -= 1;
            p -= 20;
            // 摄氏度数值
            svg.append('text').text(c + '℃').attr({
                x: this.opt.ptLineX + this.opt.ptLineX/4 + this.opt.tOffsetX,
                y: this.opt.timeHeight + range + 5,
            }).style({fill: this.opt.tempColor});
            // 脉搏数值
            svg.append('text').text(p).attr({
                x: this.opt.ptLineX/4 + this.opt.pOffsetX + (p < 100 ? 8 : 0),
                y: this.opt.timeHeight + range + 5,
            }).style({fill: this.opt.pulsColor});
        } else if(interval && i > tpPainCell) {
            pa -= 5;
            // 疼痛数值
            svg.append('text').text(pa).attr({
                x: this.opt.ptLineX + this.opt.ptLineX/4 + this.opt.painOffsetX + (pa < 10 ? 8 : 0),
                y: this.opt.timeHeight + range + 5,
            }).style({fill: this.opt.painColor});
        }
        if (i >= this.opt.tpCellNum) {break; }
    }

    if (this.opt.painCellNum > 0) {
        svg.append('line').attr({
            x1: 0,
            y1: this.defaultOpt.painHeight,
            x2:  this.opt.insideW,
            y2: this.defaultOpt.painHeight,
        }).style({
            stroke: this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
        
        // 摄氏度数值
        svg.append('text').text("疼 痛").attr({
            x: this.opt.cellBeginLeft / 2 - this.opt.cell,
            y: this.defaultOpt.painHeight + this.opt.cell * 2
        }).style({fill: this.opt.painColor});
    }

    /*************呼吸*********************/
    // 呼吸上方线
    svg.append('line').attr({
        x1: 0,
        y1: this.opt.timeHeight + (this.opt.cell * this.opt.tpCellNum) + this.opt.cell,
        x2:  this.opt.insideW,
        y2: this.opt.timeHeight + (this.opt.cell * this.opt.tpCellNum) + this.opt.cell,
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    // 呼吸下方线
    svg.append('line').attr({
        x1: 0,
        y1: this.opt.breathHeight,
        x2:  this.opt.insideW,
        y2: this.opt.breathHeight,
    }).style({
        stroke: this.opt.lineC,
        'stroke-width': this.opt.lineW
    });
    //呼吸文本标题
    svg.append('text').text('呼吸（次/分）').attr({
        x: this.opt.bottomOffsetX,
        y: this.opt.breathHeight - this.opt.bottomTextCell,
    }).style({fill: this.opt.breathColor});

    //底部方格('大便次数', '血压mmHg', '身高cm', '体重kg', '总入量ml', '总出量ml', '引流量ml', '药物过敏')
    var bc = 1;
    for (k in this.opt.bottomConfig) {
        var d = this.opt.bottomConfig[k];
        d['index'] = bc;
        // 横线高度
        var bh = this.opt.breathHeight + this.opt.cell * bc * this.opt.rowOffsetY;
        svg.append('line').attr({
            x1: 0,
            y1: bh,
            x2:  this.opt.insideW,
            y2: bh,
        }).style({
            stroke: this.opt.lineC,
            'stroke-width': this.opt.lineW
        });
        svg.append('text').text(d.title).attr({
            x: this.opt.bottomOffsetX,
            y: bh - this.opt.bottomTextCell,
        });
        bc++;
    }
    this.svg = svg;
    return this;
}

// 填充数据
temperature.prototype.initData = function(data){
    var svg = this.svg, x1, y1, px, py, index = 0;
    for (k in data) {
        // 日期*********************/
        svg.append('text').text(k).attr({
            x: this.opt.cellBeginLeft + this.opt.cell * 6 * index + 10,
            y: this.opt.dateHeight - 20,
        });

        var d = data[k];
        for (var i = 0; i < d.lineData.length; i++) {
            var v = d.lineData[i];
            var tLocaly = this.opt.timeHeight + (this.opt.cell * 5 * (this.opt.maxTem - v.temp));
            var localX = this.opt.cellBeginLeft + (this.opt.cell/4 * v.time) + this.opt.cell * 6 * index;
            var pLocaly = this.opt.timeHeight + (this.opt.cell * 5 / 20 * (this.opt.maxPul - v.pulse));
            /**************画体温折线*****************/
            if(v.temp >= this.opt.minTem && v.temp <= this.opt.maxTem){
                if (!x1 && !y1) {
                    x1 = localX, y1 = tLocaly;
                    // 体温折线的第一个圆点
                    svg.append('circle').attr({cx: x1 + this.opt.circleX, cy: y1, fill: 'blue', r: this.opt.circleR});
                } else {
                    var x2 = localX, y2 = tLocaly;
                    // 体温两个点之间的线条
                    svg.append('line').attr({x1: x1 + this.opt.circleX, y1: y1, x2: x2 + this.opt.circleX, y2: y2}).style({stroke: 'blue', 'stroke-width': this.opt.circleLineW});
                    // 体温两点间的第二个圆点
                    x1 = x2, y1 = y2;
                    svg.append('circle').attr({cx: x1 + this.opt.circleX, cy: y1, fill: 'blue', r: this.opt.circleR});
                }
            }
            /**************画脉搏折线*****************/
            if(v.pulse >= this.opt.minPul && v.pulse <= this.opt.maxPul){
                if (!px && !py) {
                    px = localX, py = pLocaly;
                    // 脉搏折线的第一个圆点
                    svg.append('circle').attr({cx: px + this.opt.circleX, cy: py, fill: 'red', r: this.opt.circleR});
                } else {
                    var px2 = localX, py2 = pLocaly;
                    // 脉搏两个点之间的线条
                    svg.append('line').attr({
                        x1: px + this.opt.circleX, y1: py, x2: px2 + this.opt.circleX, y2: py2}).style({stroke: 'red', 'stroke-width': this.opt.circleLineW});
                    // 脉搏两点间的第二个圆点
                    px = px2, py = py2;
                    svg.append('circle').attr({cx: px + this.opt.circleX, cy: py, fill: 'red', r: this.opt.circleR});
                }
            }

            /*** 呼吸（次/分）*********************/
            svg.append('text').text(v.breath).attr({
                x: localX - this.opt.cell / 2,
                y: this.opt.timeHeight + (this.opt.cell * this.opt.tpCellNum) + this.opt.cell * (i % 2 === 0 ? 1.9 : 2.8),
            }).style({fill: this.opt.breathColor});
        }

        // 底部其他数据值填充
        for (bk in this.opt.bottomConfig) {
            var item = this.opt.bottomConfig[bk];
            var value = d[bk];
            svg.append('text').text(value).attr({
                x: this.opt.cellBeginLeft + this.opt.cell * 6 * index + this.opt.bottomValueX,
                y: this.opt.breathHeight + this.opt.cell * item.index * this.opt.rowOffsetY - this.opt.bottomTextCell,
            });
        }
        index++;
    }
    return this;
}