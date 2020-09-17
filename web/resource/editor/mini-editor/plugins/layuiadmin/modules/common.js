/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */
 
layui.define(["form"],function(exports){
  var $ = layui.$
  ,layer = layui.layer
  ,laytpl = layui.laytpl
  ,setter = layui.setter
  ,view = layui.view
  ,admin = layui.admin
  ,form = layui.form
  
  //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
  
  
   
  //……
  
  
  
 /* //退出
  admin.events.logout = function(){
    //执行退出接口
    admin.req({
      url: layui.setter.base + 'json/user/logout.js'
      ,type: 'get'
      ,data: {}
      ,done: function(res){ //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行
        
        //清空本地记录的 token，并跳转到登入页
        admin.exit(function(){
          location.href = 'user/login.html';
        });
      }
    });
  };*/
  var common={
		  //laytable复选框列实现单选功能与单击勾选复选框功能 
		    isChecked: function (tr){
		    	 tr.toggleClass('layui-table-click').siblings().removeClass('layui-table-click');//选中行样式
		      	 var result= tr.hasClass("layui-table-click");
		      	//获取所有tr同胞元素内选中的的取消勾选
		      	 tr.find("input[name='layTableCheckbox']").prop("checked",result).closest("tr").siblings().find("input[name='layTableCheckbox']:checked").prop("checked",false);
		      	 form.render('checkbox');
		         return result;
	        }
  			//移除table 全选复选框
	        ,removeLayTableAllChoose: function (talbe){
	        	var layTableAllChoose=talbe.elem.next().find("input[lay-filter='layTableAllChoose']");
	      	  layTableAllChoose.next().remove();
	      	  layTableAllChoose.remove();
	        },
	        /**
	         * table done回调中为checked添加选中样式
	         */
	        checkedRowAddClass:function (talbe){
	        	  talbe.elem.next().find("input[name='layTableCheckbox']:checked").closest("tr").addClass('layui-table-click')
	              form.render('checkbox');
	         },
	        /**
	         * 单击行勾选复选框和取消勾选复选框
	         */
	        clickRowChecked:function (tr){ 
	         	 tr.toggleClass('layui-table-click')//选中行样式
	         	 var result= tr.hasClass("layui-table-click");
	         	 tr.find("input[name='layTableCheckbox']").prop("checked",result)
	         	 form.render('checkbox');
	            return result;
	         },
	        /**
	         * 刷新表格回调后选择行
	         * tableId:<table id="">
	         * field: 列名
	         * fieVal: 列数据
	         * 
	         */
	          tableCheck:function(tableId,field,fieVal){
	        	 $("#"+tableId).next().find('td[data-field='+field+']').filter(function(){ return $(this).text() ==fieVal;}).parent("tr").click();
	        },
	      //红字必填的提示文字
	        mustHit : '<span class="must-red font-14">( 红字为必填 )</span>',
	        /*
	         * msg提示信息; exeComand 点确定后执行的方法
	         */
	        confirm: function (msg, exeComand, cancelComand){
	            //询问框
	            layer.confirm(msg, {
	              btn: ['确定','取消'],
	              skin: 'layui-layer-molv'
	            }, function(index, layero){
	                exeComand(index, layero);
	                layer.close(index);
	            }, function(index){
	                if (cancelComand) {cancelComand();}
	                layer.close(index);
	            });
	        },
	        callFun: function (msg, btns, exeComand1, exeComand2){
	            //询问框
	            layer.confirm(msg, {
	              btn: btns,
	              btn1: function (index, layero){exeComand1(index, layero);},
	              btn2: function (index, layero){exeComand2(index, layero);},
	              skin: 'layui-layer-molv'
	            }, function(index){
	                layer.close(index);
	            });
	        },
	        /**
	         * msg提示信息
	         * iconType对应的值  0：警告；1:成功；2：错误；3：提示；4：提示锁住；5：难过表情；6：微笑表情；其他值默认为警告
	         */
	        alert: function (msg, iconType){
	            layer.alert(msg, { icon: iconType, skin: 'layui-layer-molv' });
	        },
	        /**
	         * msg提示信息，点按钮后执行回调
	         * iconType对应的值  0：警告；1:成功；2：错误；3：提示；4：提示锁住；5：难过表情；6：微笑表情；其他值默认为警告
	         */
	        alertCall: function (msg, iconType, exeComand){
	            //layer.msg(msg, { icon: 1, time: 3});
	            layer.alert(msg, {icon: iconType, skin: 'layui-layer-molv' }, function(index){ exeComand(); layer.close(index);});
	        },
	        /**
	         * msg提示信息，点按钮后执行回调
	         * iconType对应的值  0：警告；1:成功；2：错误；3：提示；4：提示锁住；5：难过表情；6：微笑表情；其他值默认为警告
	         */
	        msg: function (msg, iconType, exeComand){
	            layer.msg(msg, {icon: iconType, time: 2000}, function (){
	                if (exeComand) { exeComand() ;}
	            });
	        },
	        /** 打开新窗口（iframe） */
	        open: function (url, title, options){
	            var opt = {
	                    id: 'win',
	                    type: 2,
	                    move: '.layui-layer-title',
	                    title: title,
	                    shadeClose: false,
	                    shade: 0.5,
	                    maxmin: true,
	                    area: ['100%', '100%'],
	                    content: [url, ((options.scroll == undefined || options.scroll == "") ? 'no': options.scroll)]
	            }
	            $.extend(opt, options);
	            layer.open(opt);
	        },
	        /** 打开html内容层 */
	        openHtml: function (content, title, options){
	            var opt = {
	                    type: 1,
	                    shade: 0,
	                    id: "winContent",
	                    title: false,
	                    shadeClose: false,
	                    closeBtn: 1,
	                    offset: '100px',
	                    area: ['100%', '100%'],
	                    skin: 'layui-layer-nobg', //没有背景色
	                    content: content
	            }
	            $.extend(opt, options);
	            layer.open(opt);
	        },
	        /** 弹出tab窗口 */
	        tab: function (url, title, options, tab){
	            var opt = {
	                    id: 'win',
	                    type: 2,
	                    move: false,
	                    title: title,
	                    shadeClose: false,
	                    shade: 0.5,
	                    maxmin: false,
	                    area: ['100%', '100%'],
	                    content: [url, ((options.scroll == undefined || options.scroll == "") ? 'no': options.scroll)]
	            }
	            $.extend(opt, options);
	            opt.data = tab;
	            layer.tab(opt);
	        },
	        // 清空表单
	        cleanForm: function (formId){
	            var $formObj = $("#" + formId);
	            $formObj.find("input[type=text]").val("");
	            $formObj.find("select").val('');
	            $formObj.find("select").trigger("chosen:updated");
	            $formObj.find("input[type=radio]").iCheck('uncheck');
	            $formObj.find("input[type=checkbox]").iCheck('uncheck');
	        },
	        //将对象转成url请求的参数串
	        objToParamStr: function (obj){
	            var paramJson = JSON.stringify(obj);
	            var paramStr  = paramJson.replace(/"|}/g,'').replace(/:/g,'=').replace(/,/g,'&').replace(/{/g,'?'); 
	            return paramStr;
	        },
	        
	        // 提交后端服务
	        requestServer: function (url, params, callBack) {
	            $.post(url, params, function(result){
	                callBack(result)
	            }, 'json').error(function (e){jqueryPostError(e)});
	        },
	        //传入一个jquery对象，将对象下的表单元素设置为只读
	        setFormReadOnly : function($Ele) {
	            $Ele.find('input').attr('readonly',true);
	            $Ele.find('input[type=radio],input[type=checkbox]').attr('disabled',true);
	            $Ele.find('select').attr('disabled',true);
	            $Ele.find('textarea').attr('readonly',true);
	        }
	        
	    }
  
  //对外暴露的接口
  exports('common', common);
});