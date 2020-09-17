var layer;

//layui 弹窗 图标类型值
var iconType = {
    warn: 0,
    success: 1,
    error: 2,
    tips: 3,
    locked: 4,
    said: 5,
    smile: 6
}


/** 消息状态码 */
var responseCode = {
    SUCCESS: 0,
    FAIL: -1
};
var common = {
    //红字必填的提示文字
    mustHit: '<span class="must-red font-14">( 红字为必填 )</span>',
    /*
     * msg提示信息; exeComand 点确定后执行的方法
     */
    confirm: function (msg, exeComand, cancelComand, btns, endComand) {
        //询问框
        layer.confirm(msg, {
            btn: btns ? btns : ['确定', '取消'],
            skin: 'layui-layer-molv',
            end: endComand
        }, function (index, layero) {
            exeComand(index, layero);
            layer.close(index);
        }, function (index) {
            if (cancelComand) {
                cancelComand();
            }
            layer.close(index);
        });
    },
    /**
     * msg提示信息
     * iconType对应的值  0：警告；1:成功；2：错误；3：提示；4：提示锁住；5：难过表情；6：微笑表情；其他值默认为警告
     * options 值，{btn1: function(index, layero){layer.close(index);},btn1: function(index, layero){layer.close(index);} }
     * //btn1，第一个按钮的回调函数，btn2，第二个按钮的回调函数
     */
    callFun: function (msg, iconType, options) {
        var opt = {
            icon: iconType,
            btn: ['确定', '取消'],
            skin: 'layui-layer-molv'
        }
        $.extend(opt, options);
        //询问框
        layer.confirm(msg, opt);

    },
    /**
     * msg提示信息
     * iconType对应的值  0：警告；1:成功；2：错误；3：提示；4：提示锁住；5：难过表情；6：微笑表情；其他值默认为警告
     */
    alert: function (msg, iconType) {
        layer.alert(msg, {icon: iconType, skin: 'layui-layer-molv'});
    },
    /**
     * msg提示信息，点按钮后执行回调
     * iconType对应的值  0：警告；1:成功；2：错误；3：提示；4：提示锁住；5：难过表情；6：微笑表情；其他值默认为警告
     */
    alertCall: function (msg, iconType, exeComand) {
        //layer.msg(msg, { icon: 1, time: 3});
        layer.alert(msg, {icon: iconType, skin: 'layui-layer-molv'}, function (index) {
            exeComand();
            layer.close(index);
        });
    },
    /**
     * msg提示信息，点按钮后执行回调
     * iconType对应的值  0：警告；1:成功；2：错误；3：提示；4：提示锁住；5：难过表情；6：微笑表情；其他值默认为警告
     */
    msg: function (msg, iconType, exeComand) {
        layer.msg(msg, {icon: iconType, time: 5000, closeBtn: 1}, function () {
            if (exeComand) {
                exeComand();
            }
        });
    },
    msgSuccess: function (content) {
        common.msg(content, iconType.success);
    },
    alertError: function (content) {
        common.alert(content, iconType.error);
    },
    /**
     * 打开加载层
     */
    openLoad: function () {
        if (parent.layer && parent.common.closeLoad) {
            parent.common.closeLoad();
        } else {
            common.closeLoad();
        }
        if(!layer) return ;
        //加载层-风格4
        return layer.msg('加载中', {
            icon: 16
            , time: 0
            , shade: 0.01
        });
    },
    /**
     * 打开加载层
     */
    openProcessLoad: function () {
        if (parent.layer && parent.common.closeLoad) {
            parent.common.closeLoad();
        } else {
            common.closeLoad();
        }
        //加载层-风格4
        return layer.msg('处理中', {
            icon: 16
            , time: 0
            , shade: 0.01
        });
    },
    /**
     * 关闭加载层
     */
    closeLoad: function (index) {
        if(!layer) return ;
        index ? layer.close(index) : layer.closeAll('dialog'); //关闭信息框
    },
    /** 打开新窗口（iframe） */
    open: function (url, title, options) {
        var opt = {
            id: 'win',
            type: 2,
            move: '.layui-layer-title',
            title: title,
            shadeClose: false,
            shade: 0.5,
            maxmin: true,
            area: ['100%', '100%'],
            content: [url, ((options.scroll == undefined || options.scroll == "") ? 'no' : options.scroll)]
        }
        $.extend(opt, options);
        return layer.open(opt);
    },
    /** 打开html内容层 */
    openHtml: function (content, title, options) {
        var opt = {
            type: 1,
            shade: 0,
            id: "winContent",
            title: title,
            shadeClose: false,
            closeBtn: 1,
            offset: '100px',
            area: ['100%', '100%'],
            skin: 'layui-layer-nobg', //没有背景色
            content: content
        }
        $.extend(opt, options);
        return layer.open(opt);
    },
    /** 弹出tab窗口 */
    tab: function (url, title, options, tab) {
        var opt = {
            id: 'win',
            type: 2,
            move: false,
            title: title,
            shadeClose: false,
            shade: 0.5,
            maxmin: false,
            area: ['100%', '100%'],
            content: [url, ((options.scroll == undefined || options.scroll == "") ? 'no' : options.scroll)]
        }
        $.extend(opt, options);
        opt.data = tab;
        layer.tab(opt);
    },
    // 清空表单
    cleanForm: function (formId) {
        var $formObj = $("#" + formId);
        $formObj.find("input[type=text]").val("");
        $formObj.find("select").val('');
        $formObj.find("input[type=radio]").prop('checked', false);
        $formObj.find("input[type=checkbox]").prop('checked', false);
        layui.form.render();//重新渲染表单
        //$formObj.find("select").trigger("chosen:updated");
        //$formObj.find("input[type=radio]").iCheck('uncheck');
        //$formObj.find("input[type=checkbox]").iCheck('uncheck');
    },

    // 序列化表单,form:表单对象；arrayDateId：日期范围控件ID数组
    serializeObject: function (form, arrayDateId, nullFlag) {
        var o = {};
        $.each(form.serializeArray(), function (index) {
            if (this['value'] == "") {
                if (!nullFlag) {
                    return true;
                }
            }
            if (o[this['name']]) {
                o[this['name']] = o[this['name']] + "," + this['value'];
            } else {
                o[this['name']] = this['value'];
            }
        });

        // 处理日期查询条件
        if (arrayDateId && arrayDateId.length > 0) {
            var obj = {};
            for (var i = 0; i < arrayDateId.length; i++) {
                var dateEle = $(form).find('#' + arrayDateId[i]);
                if (!dateEle || dateEle.val() == '') {
                    continue;
                }

                var tag = dateEle.attr('tag').split(',');
                var arrayDate = dateEle.val().split(" - ");
                obj[tag[0]] = ((arrayDate[0] != "" && arrayDate[0] != undefined) ? arrayDate[0] : "");
                obj[tag[1]] = ((arrayDate[1] != "" && arrayDate[1] != undefined) ? arrayDate[1] : "");
            }
            $.extend(o, obj);
        }
        return o;
    },
    //将对象转成url请求的参数串
    objToParamStr: function (obj) {
        var paramJson = JSON.stringify(obj);
        var paramStr = paramJson.replace(/"|}/g, '').replace(/:/g, '=').replace(/,/g, '&').replace(/{/g, '?');
        return paramStr;
    },

    // 提交后端服务
    post: function (url, params, callBack) {
        $.post(url, params, function (result) {
            callBack(result)
        }, 'json').error(function (e) {
            jqueryPostError(e)
        });
    },
    // 提交后端服务
    requestServer: function (url, params, callBack) {
        var index = common.openLoad();
        $.post(url, params, function (result) {
            common.closeLoad(index);
            callBack(result)
        }, 'json').error(function (e) {
            jqueryPostError(e)
        }).complete(function () {
            common.closeLoad(index);
        });
    },
    // 提交后端服务
    requestServerHandler: function (url, params, msg, done) {
        $.post(url, params, function (result) {
            if (result.code === '0') {
                common.msg(msg, 1, function () {
                    if (done) {
                        done(result);
                    }
                });
            } else {
                common.alert(result.msg, 2);
            }
        }, 'json').error(function (e) {
            jqueryPostError(e)
        });
    },
    // 提交后端服务(返回html内容)
    requestHtml: function (url, params, callBack) {
        $.post(url, params, function (result) {
            callBack(result)
        }, 'html').error(function (e) {
            jqueryPostError(e)
        });
    },
    // 同步请求
    requestSync: function (url, params, callBack) {
        $.ajax({
            url: url,
            type: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: params,
            async: false, // 同步
            success: function (result) {
                callBack(result);
            },
            error: function (result) {
                common.alert('请求出错', 2);
            }
        });
    },
    // 响应基本处理
    responseAtcion: function (responseResult) {
        var result = responseResult;
        responseResult.msg = responseResult.msg ? responseResult.msg : '操作成功';
        if (result.code == responseCode.SUCCESS) {
            common.msgSuccess(result.msg);
        } else {
            common.alertError(result.msg);
        }
    },

    // 获取表格单行或多行数据，tableId 为表格ID；isMultiSelect为true表示获取多行，否则单行
    getTableSelectRow: function (table, tableId) {
        var checkStatus = table.checkStatus(tableId);
        return checkStatus.data;
    },

    // 获取表格单行或多行数据，table 为表格对象；tableId 为表格ID, field为字段
    getTableSelectRowField: function (table, tableId, field) {
        var checkStatus = table.checkStatus(tableId);
        if (!checkStatus.data || checkStatus.data.length <= 0) {
            return "";
        }
        var result = [];
        $.each(checkStatus.data, function (i, val) {
            result.push(val[field]);
        });
        return result.join(',');
    },
    // 移除头部的多选框(取消全选和反选功能)
    removeHeadCheckbox: function (field) {
        $('th[data-field="' + field + '"]').find('input').remove();
        $('th[data-field="' + field + '"]').find('div.layui-form-checkbox').remove();
    },
    //传入一个jquery对象，将对象下的表单元素设置为只读
    setFormReadOnly: function ($Ele) {
        $Ele.find('input').attr('readonly', true);
        $Ele.find('input[type=radio],input[type=checkbox]').attr('disabled', true);
        $Ele.find('select').attr('disabled', true).next().find('.layui-select-title').unbind("click");
        $Ele.find('textarea').attr('readonly', true);
    },

    // 计算两个时间差，结果单位由第三个参数决定
    timeDifference: function (endDate, beginDate, unit) {
        var ed = new Date(Date.parse(endDate));
        var bd = new Date(Date.parse(beginDate));
        //相差的毫秒数
        var TotalMilliseconds = Math.abs(ed.getTime() - bd.getTime());
        if (unit == "d") {
            return parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24);
        }
        if (unit == "h") {
            return parseInt(TotalMilliseconds / 1000 / 60 / 60);
        }
        if (unit == "m") {
            return parseInt(TotalMilliseconds / 1000 / 60);
        }
        if (unit == "s") {
            return parseInt(TotalMilliseconds / 1000);
        }
    },
    // 下载文件
    downLoadFile: function (iframeId, affixFlag, fileId) {
        common.confirm("确定要下载该文件吗？", function () {
            $('#' + iframeId).attr('src', contextPath + '/affix/download.do?serviceId=' + affixFlag + '&fileId=' + fileId);
        });
    },
    // 删除文件
    deleteFile: function (fileId, affixFlag) {
        common.confirm("确定要删除该文件吗？", function () {
            $.post(contextPath + '/affix/delete.do',
                {fileId: fileId, serviceId: affixFlag},
                function (result) {
                    if (result == "ok") {
                        $('#' + fileId).remove();
                    } else {
                        common.alert(result, 2);
                    }
                },
                'text').error(function (e) {
                jqueryPostError(e)
            });
        });
    },
    //将行单元格中的输入框value转为json格式
    buildTrInputJSON: function (element) {
        var array = [];
        $(element).find("tr").each(function () {
            var obj = {};
            $(this).find("input").each(function () {
                if (this.name) obj[this.name] = this.value;
            });
            $(this).find("textarea").each(function () {
                obj[this.name] = this.value;
            });
            $(this).find("select").each(function () {
                obj[this.name] = $(this).find('option:selected').val();
                obj[this.name + 'Text'] = $(this).find('option:selected').text().replace(/[\r\n]/g, "").trim();
                ;
            });
            array.push(obj);
        });
        return array;
    },
    seriElemObject: function (element) {
        var obj = {};
        var container = $(element);
        container.find("input").each(function () {
            if (this.name) obj[this.name] = this.value;
        });
        container.find("textarea").each(function () {
            obj[this.name] = this.value;
        });
        container.find("select").each(function () {
            obj[this.name] = $(this).find('option:selected').val();
            obj[this.name + 'Text'] = $(this).find('option:selected').text().replace(/[\r\n]/g, "").trim();
            ;
        });
        return obj;
    },
    // 获取表格所有行数据
    getAllTrData: function (element) {
        var arrayParams = [];
        $(element).find('tr').each(function () {
            var params = {};
            $(this).find('td > input, select, textarea').each(function () {
                if (!$(this).val()) {
                    return true;
                }
                if ($(this).attr('type') == 'checkbox') {
                    if ($(this).is(':checked')) {
                        $(this).val('1')
                    } else {
                        $(this).val('0')
                    }
                }
                params[$(this).attr('name')] = $(this).val();
            });
            if (!$.isEmptyObject(params)) {
                arrayParams.push(params);
            }
        });
        return arrayParams;
    },
    // 获取表格单行数据
    getSingleTrData: function (element) {
        var params = {};
        $(element).find('td > input, select, textarea').each(function () {
            if (!$(this).val()) {
                return true;
            }
            if ($(this).attr('type') == 'checkbox' && !$(this).is(':checked')) {
                $(this).val('0')
            }
            params[$(this).attr('name')] = $(this).val();
        });
        return params;
    },
    /**begin 判断表格行是否有编辑 */
    // 该方法用于临时存储编辑前的数据（目的主要是标识当前行是否有修改行数据）
    trData: {},
    getTrTempData: function (trEle) {
        var name = $(trEle).attr('name');
        var field = name + '_' + $(trEle).index();
        if (common.trData[field]) {
            return;
        }
        var data = common.getSingleTrData(trEle);
        common.trData[field] = JSON.stringify(data);
    },
    // 判断是否有编辑数据
    hasEditData: function (trEle, data) {
        var name = $(trEle).attr('name');
        var field = name + '_' + $(trEle).index();
        if (!common.trData[field]) {
            return false;
        }
        return common.trData[field] == JSON.stringify(data);
    },
    /**end 判断表格行是否有编辑 */
    isExistChina: function (str) {
        return /.*[\u4e00-\u9fa5]+.*$/.test(str);
    },
    /**字符串截取指定长度，超出的部分使用指定字符代替 */
    strLimit: function (str, len, replaceChar) {
        var resultStr = '';
        if (!str) {
            return resultStr;
        }
        if (str.length > len) {
            resultStr = str.substring(0, len) + replaceChar;
        } else {
            return str;
        }
        return resultStr;
    },
    /**字符串去除指定结尾的字符 */
    toMoney: function (money, len) {
        len = len ? len : 1;
        money = parseFloat(money + '');
        money = money.toFixed(len);
        money = money.toLocaleString();
        return money;
    },

    /**字符串去除指定结尾的字符 */
    clearLastChar: function (sourceStr, lastChar) {
        var reg = new RegExp(lastChar + "$", "gi");
        return sourceStr.replace(reg, "");
    },
    /**补全时间格式 */
    fullDateTime: function (jsonObj) {
        $('.layer-date').each(function (index) {
            var date = $(this).val();
            if (!date) return false;
            if (date.length >= 16) {
                jsonObj[$(this).attr('name')] = date + ':00';
            }
        });
    },
    //laytable复选框列实现单选功能与单击勾选复选框功能
    isChecked: function (tr) {
        tr.toggleClass('layui-table-click').siblings().removeClass('layui-table-click');//选中行样式
        var result = tr.hasClass("layui-table-click");
        //获取所有tr同胞元素内选中的的取消勾选
        tr.find("input[name='layTableCheckbox']").prop("checked", result).closest("tr").siblings().find("input[name='layTableCheckbox']:checked").prop("checked", false);
        return result;
    }
    //移除table 全选复选框
    , removeLayTableAllChoose: function (talbe) {
        var layTableAllChoose = talbe.elem.next().find("input[lay-filter='layTableAllChoose']");
        layTableAllChoose.next().remove();
        layTableAllChoose.remove();
    },
    /**
     * table done回调中为checked添加选中样式
     */
    checkedRowAddClass: function (talbe) {
        talbe.elem.next().find("input[name='layTableCheckbox']:checked").closest("tr").addClass('layui-table-click')
    },
    /**
     * 单击行勾选复选框和取消勾选复选框
     */
    clickRowChecked: function (tr) {
        tr.toggleClass('layui-table-click')//选中行样式
        var result = tr.hasClass("layui-table-click");
        tr.find("input[name='layTableCheckbox']").prop("checked", result)
        return result;
    },
    /**
     * 刷新表格回调后选择行
     * tableId:<table id="">
     * field: 列名
     * fieVal: 列数据
     *
     */
    tableCheck: function (tableId, field, fieVal) {
        $("#" + tableId).next().find('td[data-field=' + field + ']').filter(function () {
            return $(this).text() == fieVal;
        }).parent("tr").click();
    },
    /**
     * 校验radio和checkbox控件
     * @param form
     */
    verify: function (form) {
        if (!form) {
            return;
        }
        form.verify({
            reqRedio: function (value, item) { //value：表单的值、item：表单的DOM对象
                var name = $(item).attr('name');
                var checkMsg = $(item).attr('check-msg');
                if ($(item).parents('.layui-form').find('input[name=' + name + ']:checked').size() == 0) {
                    //获取焦点
                    $(item).next().find('i').attr("tabIndex", "1").attr("hidefocus", "true").css("outline", "0").blur(function () {
                        $(this).css(($(item).attr('type') == 'radio') ? 'color' : 'border-color', '');
                    }).focus(function () {
                        $(this).css(($(item).attr('type') == 'radio') ? 'color' : 'border-color', "#FF5722");
                    }).focus();

                    if (checkMsg) {
                        return checkMsg;
                    }
                    return checkMsg;
                }
            }
        });
    },
    //转成人民币大写金额形式
    cmycurd: function (num) {
        var str1 = '零壹贰叁肆伍陆柒捌玖';  //0-9所对应的汉字
        var str2 = '万仟佰拾亿仟佰拾万仟佰拾元角分'; //数字位所对应的汉字
        var str3;    //从原num值中取出的值
        var str4;    //数字的字符串形式
        var str5 = '';  //人民币大写金额形式
        var i;    //循环变量
        var j;    //num的值乘以100的字符串长度
        var ch1;    //数字的汉语读法
        var ch2;    //数字位的汉字读法
        var nzero = 0;  //用来计算连续的零值是几个

        num = Math.abs(num).toFixed(2);  //将num取绝对值并四舍五入取2位小数
        str4 = (num * 100).toFixed(0).toString();  //将num乘100并转换成字符串形式
        j = str4.length;      //找出最高位
        if (j > 15) {
            return '溢出';
        }
        str2 = str2.substr(15 - j);    //取出对应位数的str2的值。如：200.55,j为5所以str2=佰拾元角分

        //循环取出每一位需要转换的值
        for (i = 0; i < j; i++) {
            str3 = str4.substr(i, 1);   //取出需转换的某一位的值
            if (i != (j - 3) && i != (j - 7) && i != (j - 11) && i != (j - 15)) {    //当所取位数不为元、万、亿、万亿上的数字时
                if (str3 == '0') {
                    ch1 = '';
                    ch2 = '';
                    nzero = nzero + 1;
                } else {
                    if (str3 != '0' && nzero != 0) {
                        ch1 = '零' + str1.substr(str3 * 1, 1);
                        ch2 = str2.substr(i, 1);
                        nzero = 0;
                    } else {
                        ch1 = str1.substr(str3 * 1, 1);
                        ch2 = str2.substr(i, 1);
                        nzero = 0;
                    }
                }
            } else { //该位是万亿，亿，万，元位等关键位
                if (str3 != '0' && nzero != 0) {
                    ch1 = "零" + str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                } else {
                    if (str3 != '0' && nzero == 0) {
                        ch1 = str1.substr(str3 * 1, 1);
                        ch2 = str2.substr(i, 1);
                        nzero = 0;
                    } else {
                        if (str3 == '0' && nzero >= 3) {
                            ch1 = '';
                            ch2 = '';
                            nzero = nzero + 1;
                        } else {
                            if (j >= 11) {
                                ch1 = '';
                                nzero = nzero + 1;
                            } else {
                                ch1 = '';
                                ch2 = str2.substr(i, 1);
                                nzero = nzero + 1;
                            }
                        }
                    }
                }
            }
            if (i == (j - 11) || i == (j - 3)) {  //如果该位是亿位或元位，则必须写上
                ch2 = str2.substr(i, 1);
            }
            str5 = str5 + ch1 + ch2;

            if (i == j - 1 && str3 == '0') {   //最后一位（分）为0时，加上"整"
                str5 = str5 + '整';
            }
        }
        if (num == 0) {
            str5 = '零元整';
        }
        return str5;
    },

    /**
     * 将行政区域ID转为数组
     * @param value
     * @param n
     * @returns {Array}
     */
    strToRegionIdArray: function (value, n) {
        var result = [];
        var divNum = value.length / n;
        var remNum = value.length % n;
        for (var i = 1; i <= divNum; i++) {
            var item = value.slice(0, n * i);
            result.push(item);
        }
        if (remNum > 0) {
            result.push(value.slice(0, (n * divNum) + remNum));
        }
        return result;
    },
    // 设置表格点击行可以选中该行，并选中radio
    setTableRadioSelect: function (obj, layui, tableName) {
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');//选中行样式
        obj.tr.find('input[lay-type="layTableRadio"]').prop("checked", true);
        var index = obj.tr.data('index');
        var thisData = layui.table.cache[tableName];//tableName 表名
        //重置数据单选属性
        layui.each(thisData, function (i, item) {
            if (index === i) {
                item.LAY_CHECKED = true;
            } else {
                delete item.LAY_CHECKED;
            }
        });
        layui.form.render('radio');
    }
}

/**
 * layui Table 分页表格的基本参数设置对象
 */
var basePageTable = {page: true, limit: 20, request: {pageName: 'pageNumber', limitName: 'pageSize'}};

/**
 * layui Table 对象的基本参数设置对象
 * 无分页
 */
var singlePageTable = {page: false, limit: 1000000};

//扩展Date的format方法
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

Date.prototype.addDay = function (dayNum) { //author: meizz
    var times = this.getTime() + dayNum * (1000 * 60 * 60 * 24);
    var calcDate = new Date(times);
    return calcDate;
}

/**
 *转换日期对象为日期字符串
 * @param date 日期对象
 * @param isFull 是否为完整的日期数据,
 * 为true时, 格式如"2000-03-05 01:05:04"
 * 为false时, 格式如 "2000-03-05"
 * @return 符合要求的日期字符串
 */
function getSmpFormatDate(date, isFull) {
    var pattern = "";
    if (isFull == true || isFull == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    } else {
        pattern = "yyyy-MM-dd";
    }
    return getFormatDate(date, pattern);
}

/**
 *转换当前日期对象为日期字符串
 * @param date 日期对象
 * @param isFull 是否为完整的日期数据,
 * 为true时, 格式如"2000-03-05 01:05:04"
 * 为false时, 格式如 "2000-03-05"
 * @return 符合要求的日期字符串
 */
function getSmpFormatNowDate(isFull) {
    return getSmpFormatDate(new Date(), isFull);
}

/**
 *转换long值为日期字符串
 * @param l long值
 * @param isFull 是否为完整的日期数据,
 * 为true时, 格式如"2000-03-05 01:05:04"
 * 为false时, 格式如 "2000-03-05"
 * @return 符合要求的日期字符串
 */
function getSmpFormatDateByLong(l, isFull) {
    return getSmpFormatDate(new Date(l), isFull);
}

/**
 *转换long值为日期字符串
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
function getFormatDateByLong(l, pattern) {
    return getFormatDate(new Date(l), pattern);
}

/**
 *转换日期对象为日期字符串
 * @param l long值
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
 * @return 符合要求的日期字符串
 */
function getFormatDate(date, pattern) {
    if (date == undefined) {
        date = new Date();
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return date.format(pattern);
}

//是否为手机号
function checkMobile(mobike) {
    var re = /^1[34578]\d{9}$/;
    return re.test(mobike);
}

//是否为电话号码
function checkPhone(phone) {
    var re = /^0\d{2,3}-?\d{7,8}$/;
    return re.test(phone);
}

//是否为身份证号码
function checkIDcard(IDCard) {
    var re = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
    return re.test(IDCard);
}

//是否符合日期格式 yyyy-mm-dd
function isDate(dateString) {
    if (dateString.trim() == "")
        return true;
    var r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[4]);
    var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    return (num != 0);
}

//日期格式必须是  yyyy-mm-dd
function dateToLong(dateString) {
    var stringDate = dateString + " 00:00:00";
    return Date.parse(new Date(stringDate));
}

/*
 * 日期格式必须是  yyyy-mm-dd
 * 比较两个日期大小
 * 第一个日期 > 第二个日期 返回 true
 */
function compareDate(dateStringFirst, dateStringSecond) {
    return dateToLong(dateStringFirst) - dateToLong(dateStringSecond) > 0;
}

//检查输入的一串字符是否全部是数字
function checkNum(str) {
    return str.match(/\D/) == null;
}

//检查输入的一串字符是否为整型数据
function checkInteger(str) {
    if (str.match(/^[-+]?\d*$/) == null) {
        return false;
    } else {
        return true;
    }
}

//检查输入的固定电话号码是否正确
function checkTelephone(str) {
    if (str.match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/) == null) {
        return false;
    } else {
        return true;
    }
}

/**
 * 参数输入字符串的数值在指定区间
 * @param inputStr 输入值
 * @param min 最小值
 * @param max 最大值
 */
function checkNumInterval(inputStr, min, max) {
    var re = /(\d+)/g;
    while (re.exec(inputStr)) {
        var int = parseInt(RegExp.$1);
        if (int < min || int > max) return false;
    }
    return true;
}

//判断是否为double类型
function isDouble(str) {
    var reg = /^[-\+]?\d+(\.\d+)?$/;
    return reg.test(str);
}

//只允许输入数字（不带小数点的）
//<input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" >
//只允许输入数字（带小数点的）
//<input type="text" onkeyup="value=value.replace(/[^\d\.]/g,'')" >


//增加 Stirng对象的原型方法replaceAll
String.prototype.replaceAll = function (oldChar, newChar) {
    return this.replace(new RegExp(oldChar, "gm"), newChar);
}

//JQuery post 提交异常处理
//jqXHR:jquerypost返回的对象
function jqueryPostError(jqXHR) {
    common.closeLoad();
    var errorResult;
    try {
        var errorResult = $.parseJSON(jqXHR.responseText);
        console.log(errorResult);
    } catch (err) {
        //common.alert("转换json失败！ 错误信息：" + err.message, 2);
        console.log("转换json失败！ 错误信息：" + err.message + "\n\r err.stack: " + err.stack + "\n\r jqXHR.responseText:" + jqXHR.responseText);
    }
    if (errorResult && errorResult.msg) {
        var msgArray = errorResult.msg.split('^');
        if (msgArray && msgArray.length > 2 && msgArray[msgArray.length - 2] == "msg") {
            common.alert(msgArray[msgArray.length - 1], 2);
        } else {
            common.alert("服务器后台报告错误：" + errorResult.msg, 2);
        }
    } else {
        //console.log("postError,jqXHR:" + $.parseJSON(jqXHR));
        common.alert("请求失败!！", 2);
        return;
    }
}

//数组是否包含元素
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}


//layui layui-card  body的隐藏与收缩
function cardBodyDispaly() {
    $('i[class*="display"]').click(function () {
        $(this).siblings('i').removeClass('display-n');
        $(this).addClass('display-n');
        if ($(this).hasClass('display-close')) {
            $(this).parent().parent().siblings('.layui-card-body').hide();
        } else if ($(this).hasClass('display-open')) {
            $(this).parent().parent().siblings('.layui-card-body').show();
        }
    });
}

function cardBodyDispalyHover() {
    $(".layui-card-header").mouseover(function () {
        $(this).find('.card-tool-hover').show();
    }).mouseout(function () {
        if ($(this).find('.layui-icon-right').not('.display-n').length > 0) {//如果是右箭头，表示收缩了内容，则不隐藏图标
            return false;
        }
        $(this).find('.card-tool-hover').hide();
    });
}
// num表示今天天数加上num天，str表示间隔
function getDay(num, str) {
    var today = new Date();
    var nowTime = today.getTime();
    var ms = 24*3600*1000*num;
    today.setTime(parseInt(nowTime + ms));
    var oYear = today.getFullYear();
    var oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    var oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
}

//四舍五入保留2位小数（若第二位小数为0，则保留一位小数）
function keepTwoDecimal(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        common.alert('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    return result;
}
//四舍五入保留2位小数（不够位数，则用0替补）
function keepTwoDecimalFull(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        common.alert('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

// layui行点击事件选中行，并选中radio
function clickTableByRow(obj, tableName) {
    obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');//选中行样式
    obj.tr.find('input[lay-type="layTableRadio"]').prop("checked", true);
    var index = obj.tr.data('index')
    var thisData = layui.table.cache[tableName];//tableName 表名
    //重置数据单选属性
    layui.each(thisData, function (i, item) {
        if (index === i) {
            item.LAY_CHECKED = true;
        } else {
            delete item.LAY_CHECKED;
        }
    });
    layui.form.render('radio');
}

//获取url中拼接的paramName参数值
function getUrlParam(paramName) {
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//使用同步方式获取字典数据(仅限html使用,vm从缓存中获取)
function getDictSync(dicMapNames) {
    if (null == dicMapNames || "" == dicMapNames) {
        common.alert("请提供字典名称", 2);
        return;
    }
    var returnData = {};
    var pathName = window.document.location.pathname;
    //获取带"/"的项目名，如：/cloud_his
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    $.ajax({
        type: "POST",
        url: projectName + "/sys/selectDicData.jo",
        data: {dicMapNames: dicMapNames},
        contentType: "application/x-www-form-urlencoded",
        traditional: true,
        dataType: "json",
        async: false,//同步
        success: function(result) {
            returnData = result.data;
        }
    });
    return returnData;
}

//页面初始化
$(document).ready(function () {
    cardBodyDispaly();
    cardBodyDispalyHover();
});
