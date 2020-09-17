layui.define(["jquery","laydate"],function(exports) {
    "use strict";

    var $ = layui.jquery,laydate = layui.laydate,
        classList = new Array(),
        Class = function () {
        };

    Class.prototype.render = function(options){
        var othis = this;
        othis.cacheOptions = options;
        othis.id = options.id;
        othis.callback = options.callback;
        var dataTableDOM = $(options.id).next().find('div.layui-table-body table')[0];
        if('select' === options.type){
            var tdDOM = $(dataTableDOM).find("td[data-field='"+options.field+"']");
            othis.select(options,tdDOM);
        }else if('date' === options.type){
            var tdDOM = $(dataTableDOM).find("td[data-field='"+options.field+"']");
            othis.date(tdDOM);
        }else if('tdSelect' === options.type){
            othis.data = options.data;
            othis.tdSelect(othis.cacheOptions.element);
        }
    };

    Class.prototype.date = function(tdDOM){
        var othis = this;
        othis.cacheOptions.dateType =  othis.isEmpty(othis.cacheOptions.dateType) ? "datetime":othis.cacheOptions.dateType;
        tdDOM.bind('click',function (e) {
            var that = this;
            var thisTrIndex = $(that).parent().data('index');
            var thisField = $(that).data('field');
            var oldTrIndex = $(othis.td).parent().data('index');
            var oldField = $(othis.td).data('field');
            if((thisTrIndex+thisField) !== (oldTrIndex+oldField)){
                othis.deleteDate();
            }
            othis.td = that;
            if ($(that).find('input').length>0) {
                return;
            }
            var input = $('<input class="layui-input layui-table-select-input" type="text" id="thisDate">');
            $(that).append(input);
            var icon = $('<i class="layui-icon layui-table-select-edge">&#x1006;</i>');
            $(that).append(icon);
            icon.bind('click',function () {
                layui.stope();
                othis.deleteDate();
            });
            //日期时间选择器
            laydate.render({
                elem: '#thisDate'
                ,type: othis.cacheOptions.dateType
                ,done:function (value, date) {
                    othis.deleteDate();
                    if(othis.callback){
                        othis.callback({value:value,td:that});
                    }
                }
            });
        });
    };

    Class.prototype.isEmpty = function(dataStr){
        if(typeof dataStr === 'undefined' || dataStr === null || dataStr.length <= 0){
            return true;
        }else {
            return false;
        }
    };

    Class.prototype.deleteDate = function(){
        $("#thisDate").next().remove();
        $("#thisDate").remove();
        $("div.layui-laydate").remove();
    };

    Class.prototype.select = function(options,tdDOM){
        var othis = this;
        if(!options.data){
            $.getJSON(options.url,options.where,function (result) {
                if(options.parseData){
                    othis.data = options.parseData(result.data);
                }else {
                    othis.data = result.data;
                }
                tdDOM.each(function () {
                    var text = $(this).find("div.layui-table-cell").eq(0).text();
                    text = othis.getOption(text);
                    $(this).find("div.layui-table-cell").eq(0).text(text);
                });
            });
        }else {
            othis.data = options.data;
            tdDOM.each(function () {
                var text = $(this).find("div.layui-table-cell").eq(0).text();
                text = othis.getOption(text);
                $(this).find("div.layui-table-cell").eq(0).text(text);
            });
        }

        tdDOM.bind('click',function (e) {
            othis.register(this);
        });
    };

    Class.prototype.register = function(that){
        var othis = this;
        othis.td = that;
        if(!othis.deleteAll(that)){
            return;
        }
        var input = $('<input class="layui-input layui-table-select-input" placeholder="关键字搜索">');
        var icon = $('<i class="layui-icon layui-table-select-edge" data-td-text="'+$(that).find("div.layui-table-cell").eq(0).text()+'" >&#xe625;</i>');
        $(that).append(input);
        $(that).append(icon);
        input.focus();
        input.bind('input propertychange', function(){
            var val = this.value;
            if(othis.cacheOptions.enabled === true){
                var ul = $('div.layui-table-select-div').find('ul.ul-edit-data').eq(0);
                if(val === null || val === '' || val.length === 0){
                    return;
                }
                var searchDDs = [];
                $(ul).find('li').each(function () {
                    var thisValue = $(this).data('value');
                    thisValue = othis.isEmpty(thisValue)?"":thisValue;
                    if(thisValue.indexOf(val) > -1){
                        var classText = $(this).attr("class");
                        var backgroundColor = "";
                        if(classText.indexOf("li-checked") > -1){
                            backgroundColor = "background-color: #60b979";
                        }
                        searchDDs.push('<li class="'+$(this).attr("class")+'" data-name="'+$(this).data('name')+'" data-value="'+thisValue+'"><div class="define-edit-checkbox" lay-skin="primary"><span>'+thisValue+'</span><i style="'+backgroundColor+'" class="layui-icon layui-icon-ok"></i></div></li>');
                        $(this).remove();
                    }
                });
                ul.prepend(searchDDs.join(" "));
                othis.liClick(that);
            }else {
                var dl = $('div.layui-table-select-div').find('dl').eq(0);
                var searchDDs = [];
                if(val === null || val === '' || val.length === 0){
                    searchDDs = othis.createHtml(othis.data);
                }else {
                    searchDDs = othis.searchHtml(othis.data,val);
                }
                dl.html("");
                dl.prepend(searchDDs.join(" "));
                othis.ddClick(that);
            }
            //重新注册鼠标移动事件
            $(window).unbind('mousemove'); //解绑注册事件
            othis.registerMousemove(that,tdInfo.type); //注册事件
        });
        icon.bind('click',function () {
            layui.stope();
            othis.deleteAll();
        });
        //layui.stope(input);
        var thisY = that.getBoundingClientRect().top; //y坐标
        var thisX = that.getBoundingClientRect().left; //x坐标
        var tdHeight = that.offsetHeight;
        var tdWidth = that.offsetWidth;
        var tdInfo = {
            x:thisX,
            y:thisY,
            width:tdWidth,
            height:tdHeight,
            type:'',
            td:that
        };
        var winHeight = $(window).height();
        //当前y坐标大于窗口0.55倍的高度则往上延伸，否则往下延伸。
        if(thisY+tdHeight > 0.55*winHeight){
            //往上延伸
            tdInfo.type = 'up';
        }else {
            //往下延伸
            tdInfo.type = 'down';
        }
        othis.dynamicGenerationSelect(othis.data,tdInfo);
        othis.registerMousemove(that,tdInfo.type);
    };

    Class.prototype.tdSelect = function(element){
        var ohtis = this;
        $(element).bind('click',function () {
            ohtis.register(this);
        });
    };

    //给下拉列表注册点击事件
    Class.prototype.ddClick = function(){
        var othis = this;
        $('div.layui-table-select-div').find('dd').bind('click',function (e) {
            layui.stope(e);
            var name = $(this).attr('lay-value');
            othis.deleteAll();
            if(othis.callback){
                var update = {name:name,value:$(this).text()};
                var thisObj = {
                    select:update,
                    td:othis.td,
                    update:function () {
                        $(this.td).find("div.layui-table-cell").eq(0).text(update.value);
                    }
                };
                othis.callback(thisObj);
            }
        });
    };

    //给下拉列表注册点击事件
    Class.prototype.liClick = function(){
        $('div.layui-table-select-div').find('li').unbind('click');
        $('div.layui-table-select-div').find('li').bind('click',function (e) {
            layui.stope(e);
            var icon = $(this).find("i");
            var liClass = $(this).attr("class");
            if(liClass && liClass.indexOf("li-checked") > -1){
                icon.css("background-color","#fff");
                $(this).removeClass("li-checked");
            }else {
                icon.css("background-color","#60b979");
                $(this).addClass("li-checked");
            }
        });
    };


    //生成下拉选择框的html代码
    Class.prototype.createHtml = function(selectData,data){
        if(!data)data = [];
        selectData.forEach(function (e) {
            data.push('<dd lay-value="'+e.name+'" class="layui-table-select-dd">'+e.value+'</dd>');
        });
        return data;
    };
    //生成根据关键字搜索的下拉选择框
    Class.prototype.searchHtml = function(selectData,search,data){
        if(!data)data = [];
        selectData.forEach(function (e) {
            if((e.value+'').indexOf(search)>-1){
                data.push('<dd lay-value="'+e.name+'" class="layui-table-select-dd">'+e.value+'</dd>');
            }
        });
        return data;
    };


    //生成下拉选择框的html代码
    Class.prototype.createHtmlLi = function(selectData,data){
        if(!data)data = [];
        selectData.forEach(function (e) {
            data.push('<li class="define-edit-checkbox" data-name="'+e.name+'" data-value="'+e.value+'"><div class="define-edit-checkbox" lay-skin="primary"><span>'+e.value+'</span><i class="layui-icon layui-icon-ok"></i></div></li>');
        });
        return data;
    };

    //获取一个下拉框的数据
    Class.prototype.getOption = function(value){
        var othis = this;
        var dataArr = othis.data;
        if(!dataArr)return '';
        for(var i=0;i<dataArr.length;i++){
            var e = dataArr[i];
            if((e.name+'') === (value+'')){
                return e.value;
            }
        }
        return '无数据';
    };

    //删除所有删除下拉框和input和div
    Class.prototype.deleteAll = function(td){
        var othis = this;
        othis.deleteDate();
        var divDom = $('div.layui-table-select-div');
        if(divDom.length == 0){
            return true;
        }
        divDom = divDom[0];
        if(othis.getKey(td) === $(divDom).data('key')){
            //同一个td元素不动态生成下拉列表
            return false;
        }else {
            $('div.layui-table-body').find('td').each(function () {
                var icon = $(this).find('i.layui-table-select-edge');
                if(icon.length === 0){
                    return;
                }
                $(this).find('input.layui-table-select-input').blur();
                $(this).find('input.layui-table-select-input').remove();
                icon = icon.eq(0);
                var text = icon.attr('data-td-text');
                $(this).find("div.layui-table-cell").eq(0).text(text);
                icon.remove();
            });

            $(divDom).remove();
            return true;
        }
    };

    //动态生成下拉框
    Class.prototype.dynamicGenerationSelect = function(data,tdInfo){
        var othis = this;
        var domArr = [];
        var winHeight = $(window).height();
        var type = tdInfo.type === 'up'?'top:auto;bottom: '+(winHeight-tdInfo.y)+'px;':'bottom:auto;top:'+(tdInfo.y+tdInfo.height)+'px;';
        var width = tdInfo.width;
        var left = tdInfo.x;
        if(othis.cacheOptions.enabled === true){
            othis.createDivli(domArr,tdInfo,width,left,type);
        }else {
            domArr.push('<div class="layui-table-select-div div-style" data-key="'+othis.getKey(tdInfo.td)+'" style="z-index: 19910908;'+type+' width:'+width+'px;position: absolute; left: '+left+'px;">');
                domArr.push('<dl>');
                    if(data){
                        othis.createHtml(data,domArr);
                    }else {
                        domArr.push('<dd lay-value="" class="">无数据</dd>');
                    }
                domArr.push('</dl>');
            domArr.push('</div>');
            $('body').append(domArr.join(" "));
            othis.ddClick();
        }
    };

    Class.prototype.createDivli = function(domArr,tdInfo,width,left,type){
        var othis = this;
        domArr.push('<div class="layui-table-select-div" data-key="'+othis.getKey(tdInfo.td)+'" style="z-index: 19910908;'+type+' width:'+width+'px;position: absolute; left: '+left+'px;">');
            domArr.push('<div><spn style="text-align: left"><button type="button" id="selectAll" class="layui-btn layui-btn-sm layui-btn-primary">全选</button></spn><span style="float: right"><button id="confirmBtn" type="button" class="layui-btn layui-btn-sm layui-btn-primary">确定</button></span></div>');
                domArr.push('<div style="margin:0;background-color: #93f3ff;border: 1px solid #d2d2d2;max-height: 290px;overflow-y: auto;font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;">');
                domArr.push('<ul class="ul-edit-data" >');
                    if(othis.data){
                        othis.createHtmlLi(othis.data,domArr);
                    }else {
                        domArr.push('<li>无数据</li>');
                    }
                domArr.push('</ul>');
            domArr.push('</div>');
        domArr.push('</div>');
        $('body').append(domArr.join(" "));
        othis.liClick();
        othis.btnClick();
    };

    Class.prototype.btnClick = function(){
        var othis = this;
        $('#confirmBtn').bind('click',function (e) {
            var dataList = new Array();
            $("div.layui-table-select-div").find("div li").each(function (e) {
                var liClass = $(this).attr("class");
                if(!liClass || liClass.indexOf("li-checked") <= -1){
                    return;
                }
                var name = $(this).data("name");
                var value = $(this).data("value");
                var update = {name:name,value:value};
                dataList.push(update);
            });
            othis.deleteAll();
            if(othis.callback){
                var thisObj = {
                    select:dataList,
                    td:othis.td,
                    update:function () {
                        var text = '';
                        dataList.forEach(function (e) {
                            text += ','+e.value;
                        });
                        if(text.length > 0){
                            text = text.substr(1);
                        }
                        $(this.td).find("div.layui-table-cell").eq(0).text(text);
                    }
                };
                othis.callback(thisObj);
            }
        });

        $('#selectAll').bind('click',function () {
            var btn = this;
            var status = $(this).attr('data-status');
            $('ul.ul-edit-data').find('li').each(function (e) {
                var icon = $(this).find("i");
                if(othis.isEmpty(status) || status === 'false'){
                    icon.css("background-color","#60b979");
                    $(this).addClass("li-checked");
                    $(btn).attr("data-status","true");
                }else {
                    icon.css("background-color","#fff");
                    $(this).removeClass("li-checked");
                    $(btn).attr("data-status","false");
                }
            });
        });
    };

    //生成key -> 表id+行索引+列索引，中间以“-”相连，用于识别是否是点击同一个单元格。
    Class.prototype.getKey = function (that) {
        var othis = this;
        return othis.id+'-'+$(that).parent().data('index')+$(that).data('key');
    };

    //注册鼠标移动事件
    Class.prototype.registerMousemove = function (that,type) {
        var othis = this;
        var divDom = $('div.layui-table-select-div')[0];
        var divHeight = divDom.offsetHeight;
        var thisY = that.getBoundingClientRect().top; //y坐标
        var thisX = that.getBoundingClientRect().left; //x坐标
        var tdHeight = that.offsetHeight;
        var tdWidth = that.offsetWidth;
        var maxY,maxX,minY,minX;
        //计算出最大y坐标、最小y坐标、最大x坐标，最小x坐标。
        if('down' === type){
            //往下延伸
            maxY = thisY+tdHeight+divHeight;
            maxX = thisX + tdWidth;
            minY = thisY;
            minX = thisX;
        }else {
            //往上延伸
            maxY = thisY+tdHeight;
            maxX = thisX + tdWidth;
            minY = thisY-divHeight;
            minX = thisX;
        }
        //再次绑定鼠标移动事件
        $(window).bind('mousemove',function (e) {
            e = e || window.event;
            if(e.pageX || e.pageY) {
                var xy = {x:e.pageX,y:e.pageY};
                if(xy.x > maxX || xy.x < minX || xy.y > maxY || xy.y < minY){
                    //此范围内删除所有下拉框和input
                    othis.deleteAll();
                    //取消绑定的鼠标移动事件
                    $(window).unbind('mousemove');
                }
            }
        });
    };

    var active = {
        render:function (options) {
            var thisClass = new Class();
            classList.push(thisClass);
            thisClass.render(options);
        },
        reload:function (tableId) {
            classList.forEach(function (e) {
                if(e.id === tableId){
                    e.render(e.cacheOptions);
                }
            });
        }
    };
    console.log(layui.cache.base)
    layui.link(layui.cache.base + 'css/layuiTableColumnEdit.css');
    exports('layuiTableColumnEdit', active);
});