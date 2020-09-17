/**
 * 绘制产程图
 */
function deliveryProcess(selector, opt) {
    this.svg;
    this.selector = selector;
    this.defaultOpt = {
        width: 760, // 整体表格默认宽度
        height: 600, // 整体表格默认高度
        //totalCellHeight: 550,//表格高度
        hCellNum: 24, // 横向格子数
        vCellNum: 11, // 纵向格子数
        cellWidth: 25, // 格子宽度
        cellHeight: 50, // 格子高度
        yAxisX: 70, // 刻度线的X轴偏移量
        firstCellX: 150, // 第一列格子的X值
        openMin: 0, //最小开口值
        openMax: 10, //最大开口值
        headDownMin: -5, //最小儿头下降值
        headDownMax: 5, //最小儿头下降值

        lineC: 'black', // 线条默认颜色
        lineW: 1, // 线条默认宽度
        circleLineW: 1,  // 线条两点之间默认宽度
        circleR: 5, // 每个圆点的直径
        openColor: 'blue',  // 开宫口显示颜色
        headDownColor: 'red',  // 儿头下降显示颜色
        bottomConfig: {}
    }

    $.extend(this.defaultOpt, opt);
    this.defaultOpt.cellBottomY = this.defaultOpt.cellHeight * this.defaultOpt.vCellNum;
    this.defaultOpt.cellRightX = this.defaultOpt.firstCellX + this.defaultOpt.cellWidth * this.defaultOpt.hCellNum;
    this.opt = this.defaultOpt;
}

//初始化体温单
deliveryProcess.prototype.initDelivery = function () {
    var svg = d3.select(this.selector).append('svg');
    var opt = this.opt;
    console.log(opt);
    svg.attr('width', opt.width).attr('height', opt.height);
    // 第一条横向线
    svg.append('line').attr({
        x1: 1,
        y1: 1,
        x2: opt.cellRightX,
        y2: 1
    }).style({
        stroke: opt.lineC,
        'stroke-width': opt.lineW
    });
    // 最后条横向线
    svg.append('line').attr({
        x1: 1,
        y1: opt.cellBottomY,
        x2: opt.cellRightX,
        y2: opt.cellBottomY
    }).style({
        stroke: opt.lineC,
        'stroke-width': opt.lineW
    });

    // 第一条纵向线
    svg.append('line').attr({
        x1: 1,
        y1: 1,
        x2: 1,
        y2: opt.cellBottomY
    }).style({
        stroke: opt.lineC,
        'stroke-width': opt.lineW
    });

    // 刻度线
    svg.append('line').attr({
        x1: opt.yAxisX,
        y1: 0,
        x2: opt.yAxisX,
        y2: opt.cellBottomY
    }).style({
        stroke: opt.lineC,
        'stroke-width': opt.lineW
    });

    // 最后列纵线
    svg.append('line').attr({
        x1: opt.cellRightX - 1,
        y1: 0,
        x2: opt.cellRightX - 1,
        y2: opt.cellBottomY
    }).style({
        stroke: opt.lineC,
        'stroke-width': opt.lineW
    });

    // 格子纵线
    for (var i = 0; i < opt.hCellNum; i++) {
        svg.append('line').attr({
            x1: opt.firstCellX + i * opt.cellWidth,
            y1: 0,
            x2: opt.firstCellX + i * opt.cellWidth,
            y2: opt.cellBottomY
        }).style({
            stroke: opt.lineC,
            'stroke-width': opt.lineW
        });
    }

    // 格子横线
    for (var i = 1; i <= opt.vCellNum; i++) {
        svg.append('line').attr({
            x1: opt.firstCellX,
            y1: i * opt.cellHeight,
            x2: opt.cellRightX,
            y2: i * opt.cellHeight
        }).style({
            stroke: opt.lineC,
            'stroke-width': opt.lineW
        });
    }

    // 刻度线--刻度值
    for (var i = 0; i < opt.vCellNum; i++) {
        //刻度横线
        svg.append('line').attr({
            x1: opt.yAxisX - 10,
            y1: opt.cellBottomY - i * opt.cellHeight,
            x2: opt.yAxisX + 10,
            y2: opt.cellBottomY - i * opt.cellHeight
        }).style({
            stroke: opt.lineC,
            'stroke-width': opt.lineW
        });
        //开宫口刻度值
        svg.append('text').text(opt.openMin + i).attr({
            x: opt.yAxisX - 30,
            y: opt.cellBottomY - i * opt.cellHeight,
        });
        //儿头下降刻度值
        svg.append('text').text(opt.headDownMin + i).attr({
            x: opt.yAxisX + 20,
            y: opt.cellBottomY - i * opt.cellHeight,
        });
    }
    //开宫口文本
    svg.append('text').text('宫开口（厘米）').attr({
        x: opt.yAxisX - 50,
        y: 150,
        style: 'writing-mode: tb;'
    });
    //开宫口颜色（蓝）
    svg.append('circle').attr({cx: opt.yAxisX - 50, cy: 300, fill: opt.openColor, r: opt.circleR});
    //儿头下降文本
    svg.append('text').text('儿头下降（厘米）').attr({
        x: opt.yAxisX + 50,
        y: 150,
        style: 'writing-mode: tb;'
    });
    //儿头下降颜色(红）
    svg.append('circle').attr({cx: opt.yAxisX + 50, cy: 300, fill: opt.headDownColor, r: opt.circleR});
    //横坐标-指标
    svg.append('text').text('时间（小时）').attr({
        x: 0,
        y: opt.cellBottomY + 20
    });
    //横坐标-刻度
    for (var i = 0; i <= 6; i++) {
        svg.append('text').text(i * 4).attr({
            x: opt.firstCellX + i * 4 * opt.cellWidth - 5,
            y: opt.cellBottomY + 20,
        });
    }

    this.svg = svg;
    return this;
}

// 填充数据
deliveryProcess.prototype.initData = function (data) {
    var svg = this.svg, opt = this.opt, kx, ky, tx, ty;
    var showDate;
    console.log(data);
    for (var index = 0; index < data.length; index++) {
        var v = data[index];
        var createTime = getSmpFormatDateByLong(v.createTime, 'yyyy-MM-dd');
        var localX = opt.firstCellX + parseInt(v.currentTimeSort) * opt.cellWidth;
        //开宫口
        if (v.uterusOpened >= opt.openMin && v.uterusOpened <= opt.openMax) {
            var currKy = opt.cellBottomY - (v.uterusOpened - opt.openMin) * opt.cellHeight;
            if (!kx && !ky) {
                //画第一个点
                svg.append('circle').attr({cx: localX, cy: currKy, fill: opt.openColor, r: opt.circleR});
                kx = localX;
                ky = currKy;
            } else {
                //与上一个圆点连线
                svg.append('line').attr({
                    x1: kx,
                    y1: ky,
                    x2: localX,
                    y2: currKy
                }).style({
                    stroke: opt.openColor,
                    'stroke-width': this.opt.circleLineW
                });
                //画圆点
                svg.append('circle').attr({cx: localX, cy: currKy, fill: opt.openColor, r: opt.circleR});
                kx = localX;
                ky = currKy;
            }

        }

        //儿头下降
        if (v.babyHeadDown >= opt.headDownMin && v.babyHeadDown <= opt.headDownMax) {
            var currTy = opt.cellBottomY - (v.babyHeadDown - opt.headDownMin) * opt.cellHeight;
            if (!tx && !ty) {
                //画第一个点
                svg.append('circle').attr({cx: localX, cy: currTy, fill: opt.headDownColor, r: opt.circleR});
                tx = localX;
                ty = currTy;
            } else {
                //与上一个圆点连线
                svg.append('line').attr({
                    x1: tx,
                    y1: ty,
                    x2: localX,
                    y2: currTy
                }).style({
                    stroke: opt.headDownColor,
                    'stroke-width': this.opt.circleLineW
                });
                //画圆点
                svg.append('circle').attr({cx: localX, cy: currTy, fill: opt.headDownColor, r: opt.circleR});
                tx = localX;
                ty = currTy;
            }
        }
    }
    this.svg = svg;
    return this;
}