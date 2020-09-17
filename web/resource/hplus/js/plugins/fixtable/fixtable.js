/*==================================================固定table的行和列=====================================================================*/
(function ($) {
    "use strict";
    /*====固定table的行和列=====*/
    $.fn.fixTable = function (options) {
		// 计算整个表格宽度
		$(this).width(((!options.tableWidth) ? $(document).width() : options.tableWidth));

        var defaults = {
            fixColumn: 0,
            width: 0,
            height: 0,
            fixColumnWidth: 0,
            fixTheadHeight: 0,
			trBackgroundColor: '#f5f5f6'
        };
        var opts = $.extend(defaults, options);
        $(this)._fixTable(defaults);
    };
    /*====固定table的行=====*/
    $.fn.fixThead = function (options) {
        var defaults = {
            ixFixHeader: true,
            height: 0,
            fixTheadHeight: 0
        };
        $.extend(defaults, options);
        $(this)._fixTable(defaults);
    };
    /*====固定table的列=====*/
    $.fn.fixColumn = function (options) {
        var defaults = {
            fixColumn: 0,
            fixColumnWidth: 0,
        };
        $.extend(defaults, options);
        $(this)._fixTable(defaults);
    };
    /*====内部使用=====*/
    $.fn._fixTable = function (options) {
        var defaults = {
            isDebug: true,
            ixFixHeader: false,
            fixColumn: 0,
            width: 0,
            height: 0,
            fixColumnWidth: 0,
            fixTheadHeight: 0
        };
        try {
            $.extend(defaults, options);
            var _this = $(this);
            if (_this.size() != 1) { alert("固定行列功能运行错误，执行对象应该是单个table"); return; }
            //如果当前元素已经执行过此方法，则清空还原
            var _top = _this.parent().parent();
            var _topId = _top.attr("id");
            if (!!_topId && _topId && _topId.indexOf("_fixTable") > -1) {
                _this.parent().nextAll().remove();
                _this.unwrap();
                _this.unwrap();
            }
            //兼容，移动头信息
            if (_this.children("thead").size() == 0) {
                _this.prepend("<thead></thead>");
                _this.children("tbody").find("th").parent().prependTo(_this.children("thead:eq(0)"));
            }
            if (defaults.isDebug) { console.log('固定table的行和列，ID：' + _this.attr("id")); }
            //如果是用%来布局的，则不需设置值，其值默认取其父元素的宽度
            if (defaults.width == 0) { defaults.width = _this.parent().width(); }
            if (defaults.height == 0) { defaults.height = _this.parent().height(); }
            //如果table宽度和高度都小于设定值，则不需要固定行和列
            if (defaults.width >= _this.width() && defaults.height >= _this.height()) {
                if (defaults.isDebug) { console.log('不需要固定行和列'); }
                return;
            }
            //如果table宽度+滚动条（17px）小于设定宽度，则将其值设置为设定宽度度
            var scroll_x = true;
            if (defaults.width > _this.width() + 8) {
                defaults.width = _this.width() + 8;
                scroll_x = false;
                if (defaults.isDebug) { console.log('不需要横向滚动条'); }
            }
            //如果table高度+滚动条高度（20px）小于设定高度，则将其值设置为设定高度
            var scroll_y = true;
            if (defaults.height > _this.height() + 12) {
                defaults.height = _this.height() + 12;
                scroll_y = false;
                if (defaults.isDebug) { console.log('不需要纵向滚动条'); }
            }
            //不需要固定行和列
            if (scroll_x == false && scroll_y == false) {
                if (defaults.isDebug) { console.log('不需要固定行和列'); }
                return;
            }

            //求解列宽行头高
            if (defaults.fixColumnWidth == 0) {
                var _fixColumnWidth = 0;
                _this.find("thead tr:eq(0)").find("th:lt(" + defaults.fixColumn + ")").each(function () {
                    _fixColumnWidth += $(this).width() + 18;
                });

                //_fixColumnWidth = _fixColumnWidth + (defaults.fixColumn * 16)
                //兼容
                if (_fixColumnWidth < 40) { _fixColumnWidth = defaults.fixColumn * 90 + 10; }
                defaults.fixColumnWidth = _fixColumnWidth;
            }
            if (defaults.fixTheadHeight == 0) {
                var _fixTheadHeight = _this.find("thead").height() + 3;
                if (_fixTheadHeight < 35) {
                    var trcount = _this.children("thead").children("tr").size();
                    _fixTheadHeight = trcount * 35 + 3;
                }
                defaults.fixTheadHeight = _fixTheadHeight;
            }
            //定义ID名称
            var _randomCode = new Date().valueOf();
            var _id = _this.attr("id");
            var _idBody = "_fixTableBody" + _randomCode;
            var _idTop = "_fixTableTop" + _randomCode;

            //增加原table外层的div，滚动条的宿主
            _this.wrap(function () {
                return $("<div id='" + _idBody + "' style='overflow:auto;position:relative;z-index:100;width:100%;'></div>");
            });
            $("#" + _idBody).css({ "height": defaults.height });

            //增加最外层的div
            $("#" + _idBody).wrap(function () {
                return $("<div id='" + _idTop + "' style='overflow:hidden;position:relative;'></div>");
            });
            $("#" + _idTop).css({ "width": defaults.width });
            $("#" + _idTop).css({ "height": defaults.height });

            if (defaults.fixFixHeader || scroll_y) {
                var _idHeader = "_fixTableHeader" + _randomCode;
                var _cloneHeader = _this.clone();
                $(_cloneHeader).attr("id", _id + _idHeader);

                $("#" + _idTop).append("<div id='" + _idHeader + "' style='overflow:hidden;position:absolute;width:calc(100% - 8px);top:0;z-index:100;'></div>");
                $("#" + _idHeader).css({ "width": defaults.width - 8 });
                $("#" + _idHeader).css({ "height": defaults.fixTheadHeight });
                $("#" + _idHeader).append(_cloneHeader);
                $("#" + _idBody).scroll(function (e) {
                    $("#" + _idHeader).scrollLeft($(this).scrollLeft());
                });
            }

            if (defaults.fixColumn > 0 && scroll_x) {
                var _idColumn = "_fixTableColumn" + _randomCode;
                var _idColumnHeader = "_fixTableColumnHeader" + _randomCode;
                var _idColumnBody = "_fixTableColumnBody" + _randomCode;

                var _columnHeaderClone = _this.clone();
                $(_columnHeaderClone).attr("id", _id + _idColumnHeader);
                var _columnBodyClone = _this.clone();
                $(_columnBodyClone).attr("id", _id + _idColumnBody);

                $("#" + _idTop).append("<div id='" + _idColumn + "' class='freeze-warpp'></div>");
                $("#" + _idColumn).css({
                    "width": defaults.fixColumnWidth,
                    "height": defaults.height - 12
                });

                $("#" + _idColumn).append("<div id='" + _idColumnHeader + "' class='freeze-header'></div>");
                $("#" + _idColumnHeader).css({
                    "width": defaults.fixColumnWidth,
                    "height": defaults.fixTheadHeight
                });
                $("#" + _idColumnHeader).append(_columnHeaderClone);

                $("#" + _idColumn).append("<div id='" + _idColumnBody + "' class='freeze-content'></div>");
                $("#" + _idColumnBody).css({
                    "width": defaults.fixColumnWidth,
                    "height": defaults.height - 12
                });
                $("#" + _idColumnBody).append(_columnBodyClone);
                $("#" + _idBody).scroll(function (e) {
                    $("#" + _idColumnBody).scrollTop($(this).scrollTop());
                });

				var currentTableTr = $(this).find('tbody > tr');
				var cloneTableTr = $(_columnBodyClone).find('tbody > tr');
				$(cloneTableTr).mouseover(function(){
					$(this).find('td').css('background-color', defaults.trBackgroundColor);
					$(currentTableTr).eq($(this).index()).find('td').css('background-color', defaults.trBackgroundColor);
				});
				$(cloneTableTr).mouseout(function(){
					$(this).find('td').css('background-color', '');
					$(currentTableTr).eq($(this).index()).find('td').css('background-color', '');
				});
				
				$(currentTableTr).mouseover(function(){
					$(this).find('td').css('background-color', defaults.trBackgroundColor);
					$(cloneTableTr).eq($(this).index()).find('td').css('background-color', defaults.trBackgroundColor);
				});
				$(currentTableTr).mouseout(function(){
					$(this).find('td').css('background-color', '');
					$(cloneTableTr).eq($(this).index()).find('td').css('background-color', '');
				});

				//alert($(".fix-Table").length);
            }

        } catch (e) {
            console.log(e);
        }
    }
})(jQuery);