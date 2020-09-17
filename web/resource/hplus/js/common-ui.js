/**
 * 通用方法封装处理
 * Copyright (c) 2018 ruoyi
 */
(function ($) {
    $.extend({
      // 表单封装处理
      form: {
             // 获取选中复选框项
             selectCheckeds: function(name) {
              var checkeds = "";
              $('input:checkbox[name="' + name + '"]:checked').each(function(i) {
                  if (0 == i) {
                   checkeds = $(this).val();
                  } else {
                   checkeds += ("," + $(this).val());
                  }
              });
              return checkeds;
             },
             // 获取选中下拉框项
             selectSelects: function(name) {
              var selects = "";
              $('#' + name + ' option:selected').each(function (i) {
                  if (0 == i) {
                   selects = $(this).val();
                  } else {
                   selects += ("," + $(this).val());
                  }
              });
              return selects;
             },
             //获取对象数组中指定属性的数组
             getArrObjIds : function(objArr,idField) {
                 var ids = '';
                 if (objArr.constructor != Array) {
                   return ids; 
                 }
                 if (objArr.length == 0) {
                     return ids; 
                 }
                 
                 $(objArr).each(function(index, data) {
                    ids += data[idField] + ',';
                 }); 
                 ids = ids.substring(0,ids.length-1);
                 return ids;
             }
         },  
     // 弹出层封装处理
    	modal: { 
         // 显示图标
         icon: function(type) {
                var icon = "";
                if (type == modal_status.WARNING) {
                    icon = 0;
                } else if (type == modal_status.SUCCESS) {
                    icon = 1;
                } else if (type == modal_status.FAIL) {
                    icon = 2;
                } else {
                    icon = 3;
                }
                return icon;
         },
    	    // 弹出提示
         alert: function(content, type) {
          layer.alert(content, {
              icon: $.modal.icon(type),
              title: "系统提示",
              btn: ['确认'],
              btnclass: ['btn btn-primary'],
          });
         },
    	    close: function () {
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
         },
         msg: function(content, type) {
             if (type != undefined) {
                    layer.msg(content, { icon: $.modal.icon(type), time: 1000, shift: 5 });
                } else {
                    layer.msg(content);
                }
         },
         // 成功消息
         msgSuccess: function(content) {
          $.modal.msg(content, modal_status.SUCCESS);
         },
         // 错误提示
         alertError: function(content) {
          $.modal.alert(content, modal_status.FAIL);
         },
         // 打开遮罩层
         loading: function (cssType) { 
             cssType = cssType? cssType : '2';
             layer.load(cssType); 
         },
         closeLoading : function (message) {
             layer.closeAll('loading');
         },
         
     },
     // 通用方法封装处理
    	common: {
    		// 判断字符串是否为空
            isEmpty: function (value) {
                if (value == null || this.trim(value) == "") {
                    return true;
                }
                return false;
            },
            // 空格截取
            trim: function (value) {
                if (value == null) {
                    return "";
                }
                return value.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "");
            },
            // 指定随机数返回
            random: function (min, max) {
                return Math.floor((Math.random() * max) + min);
            }
        },
     // 操作封装处理
     operate: {
      // 提交数据
        submit: function(url, type, dataType, data) {
         $.modal.loading("正在处理中，请稍后...");
            var config = {
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                success: function(result) {
                    $.operate.ajaxSuccess(result);
                }
            };
            $.ajax(config)
         },
         // post请求传输
         post: function(url, data) {
          $.operate.submit(url, "post", "json", data);
         },
         // 删除信息
         remove: function(id) {
          $.modal.confirm("确定删除该条" + $.table._option.modalName + "信息吗？", function() {
           var url = $.common.isEmpty(id) ? $.table._option.removeUrl : $.table._option.removeUrl.replace("{id}", id);
           var data = { "ids": id };
           $.operate.submit(url, "post", "json", data);
          });
         },
         // 批量删除信息
         batRemove: function() {
       var rows = $.common.isEmpty($.table._option.id) ? $.table.selectFirstColumns() : $.table.selectColumns($.table._option.id);
       if (rows.length == 0) {
        $.modal.alertWarning("请至少选择一条记录");
        return;
       }
       $.modal.confirm("确认要删除选中的" + rows.length + "条数据吗?", function() {
        var url = $.table._option.removeUrl;
        var data = { "ids": rows.join() };
        $.operate.submit(url, "post", "json", data);
       });
         },
         // 添加信息
         add: function(id) {
          var url = $.common.isEmpty(id) ? $.table._option.createUrl : $.table._option.createUrl.replace("{id}", id);
             $.modal.open("添加" + $.table._option.modalName, url);
         },
         // 修改信息
         edit: function(id) {
          var url = $.table._option.updateUrl.replace("{id}", id);
          $.modal.open("修改" + $.table._option.modalName, url);
         },
         // 添加信息 全屏
         addFull: function(id) {
          var url = $.common.isEmpty(id) ? $.table._option.createUrl : $.table._option.createUrl.replace("{id}", id);
             $.modal.openFull("添加" + $.table._option.modalName, url);
         },
         // 修改信息 全屏
         editFull: function(id) {
          var url = $.table._option.updateUrl.replace("{id}", id);
          $.modal.openFull("修改" + $.table._option.modalName, url);
         },
         // 保存信息
         save: function(url, data) {
          $.modal.loading("正在处理中，请稍后...");
          var config = {
              url: url,
              type: "post",
              dataType: "json",
              data: data,
              success: function(result) {
               $.operate.saveSuccess(result);
              }
          };
          $.ajax(config)
         },
         // 保存结果弹出msg刷新table表格
         ajaxSuccess: function (result) {
          if (result.code == web_status.SUCCESS) {
              $.modal.msgSuccess(result.msg);
           $.table.refresh();
             } else {
              $.modal.alertError(result.msg);
             }
          $.modal.closeLoading();
         },
         // 保存结果提示msg
         saveSuccess: function (result) {
          if (result.code == web_status.SUCCESS) {
           $.modal.msgReload("保存成功,正在刷新数据请稍后……", modal_status.SUCCESS);
             } else {
              $.modal.alertError(result.msg);
             }
          $.modal.closeLoading();
         }
     },
     layoutModel : {
         init : function() {
            var interval =  setInterval(function() {
                if ($('#container').height()>0) {
                    $('#container').layout({
                        south__size: 350//pane的大小 
                       ,togglerContent_open: "<div style='background:#6cbbd4;line-height: 9px;'>▼</div>"//pane打开时，边框按钮中需要显示的内容可以是符号"<"等。需要加入默认css样式.ui-layout-toggler .content   
                       ,togglerContent_closed: "<div style='background:#6cbbd4;line-height: 9px;'>▲</div>"//pane关闭时，同上。  
                       ,spacing_open:8//边框的间隙 
                    });
                    clearInterval(interval );//停止
                    $.layoutModel.hideSouth();
                }
            }, 10);
        },
        //显示south底部窗口
        showSouth :function () {
            var southDisplay = $(".ui-layout-resizer-south .content-open").css("display");
            if (southDisplay == 'none'){
                $('.ui-layout-south').removeClass('layui-hide');
                $(".ui-layout-resizer-south .content-open").trigger('click');
            }
        },
        //隐藏south底部窗口
        hideSouth :function () {
            $(".ui-layout-resizer-south .content-open").trigger('click');
        }
     }
     
     
     
     
     
    });
})(jQuery);

/** 消息状态码 */
web_status = {
    SUCCESS: 0,
    FAIL: 500
};

/** 弹窗状态码 */
modal_status = {
    SUCCESS: "success",
    FAIL: "error",
    WARNING: "warning"
};