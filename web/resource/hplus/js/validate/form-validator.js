/**
 * 调用说明：调用该插件校验表单时，必须引入jquery插件，且必须放在该插件的引入之前
 * 调用步骤：1.初始化（validate.init($('#editForm'));）2.调用校验（validate.valid(callSuccess， callError)）
 * 
 * 
 * 校验器(adapter)包含：required,range,min,max,minLen,maxLen,int,number,float,reg,equal,email,idCard
 * 每个校验器必有错误提示信息属性，且格式为：校验器-msg（如：required-msg='必填'）
 * range（范围校验器），必须有的属性：min和max
 * min（最小值校验器），必须有的属性：min
 * max（最大值校验器），必须有的属性：max
 * minLen（最小长度校验器），必须有的属性：minLen
 * maxLen（最大长度校验器），必须有的属性：maxLen
 * int（整数校验器）
 * number（数字校验器）
 * float（浮点数校验器）,必须的属性：scale 即小数点位数
 * equal（两个控件值一致校验器），必须有的属性：equal（如： equal='另外个控件的ID'）
 * reg（正则校验器），必须有的属性：reg 值为正则表达式
 * email（邮箱校验器）
 * idCard （身份证校验器）
 * 
 * 
 */
var validate = {
        // 当前正在校验的控件元素
        curEle: {},
        // 所有要校验的控件元素
        eleArray:[],
        // 初始化获取要验证的控件
        init: function (fromContainer){
            $(fromContainer).find("input, textarea, select").each(function (){
               if ($(this).attr('adapter')) {
                   validate.eleArray.push(this);
               }
            });
        },

        // 校验所有控件
        valid: function (success, error) {
            var reuslt = "";
            var validFunction = "";
            var len = validate.eleArray.length;
            for (var i = 0; i < len; i++) {
                validate.curEle = validate.eleArray[i];
                var validAdapter = $(validate.curEle).attr('adapter');
                if (validAdapter == "" || validAdapter == undefined) {
                    continue ;
                }
                
                reuslt = validate.validEle(validAdapter);
                if (reuslt == "") {
                    continue ;
                } else {
                    if($(validate.curEle).attr(reuslt + '-msg')) {
                        error($(validate.curEle).attr(reuslt + '-msg'), validate.curEle);
                    } else {
                        error($(validate.curEle).attr('name') + "校验不通过！", validate.curEle);
                    }

                    break;
                }
            }
            // 根据验证结果调响应的回调函数
            if (reuslt == "") {
                success();
            }
            
        },

        // 校验控件的所有校验器
        validEle: function(validAdapter) {
            var validFunction = "";
            var adapterArray = validAdapter.split(",");
            var adapterCount = adapterArray.length;
            for (var i = 0; i < adapterCount; i++) {
                validFunction = "validate." + adapterArray[i] + '(\'' + escape($(validate.curEle).val()) + '\')';
                // 根据校验器，校验控件值是否有效，有效继续校验下个校验器，否则跳出循环，不在继续校验其他控件
                if (reuslt = eval(validFunction)) {
                    continue;
                } else {
                    return adapterArray[i];
                }
            }
            return "";
        },

        // 非空校验  
        required: function (v){
            return (v !="" && v != undefined);
        },
        // radio是否选择校验
        check: function (v){
            var elementName = $(validate.curEle).attr('name');
            return ($('input[name="' + elementName + '"]:checked').length > 0);
        },
        // 范围校验
        range: function (v){
            var min = $(validate.curEle).attr('min');
            var max = $(validate.curEle).attr('max');
            if (min == "" || min == undefined || max == "" || max == undefined) {
                return true;
            }
            return (v >= parseInt(min) && v <= parseInt(max));
        },
        
        // 最小值校验
        min: function (v){
            var min = $(validate.curEle).attr('min');
            if (min == "" || min == undefined ) {
                return true;
            }
            return (v >= parseInt(min));
        },
        
        // 最大值校验
        max: function (v){
            var max = $(validate.curEle).attr('max');
            if (max == "" || max == undefined) {
                return true;
            }
            return (v <= parseInt(max));
        },
        
        // 最小长度校验
        minLen: function (v){
            var minLen = $(validate.curEle).attr('minLen');
            if (minLen == "" || minLen == undefined) {
                return true;
            }

            return (v.length >= parseInt(minLen));
        },
        
        // 最大长度校验
        maxLen: function (v){
            var maxLen = $(validate.curEle).attr('maxLen');
            if ( maxLen == "" || maxLen == undefined) {
                return true;
            }
            return (v.length <= parseInt(maxLen));
        },
        
        // 整数
        int: function (v){
            return validate.regValid(v, /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/);
        },
        
        // 数字校验
        number: function (v){
            return validate.regValid(v, /^(0|[1-9][0-9]*)$/);
        },
        
        // 浮点数校验
        float: function (v){
            var scale = $(validate.curEle).attr('scale');
            if (scale == "" || scale == undefined) {
                return true;
            }
            var item = v.split("\.");
            if (item.length == 1) {
                return true;
            }
            if (item.length > 2) {
                return false;
            }
            if (!validate.int(item[0])) {
                return false
            }
            if (!validate.number(item[1])) {
                return false
            }
            return (item[1].length <= parseInt(scale));
        },
        
        // 正则校验
        reg: function (v){
            var reg = $(validate.curEle).attr('reg');
            return validate.regValid(v, reg);
        },
        
        // 两个元素值一致校验
        equal: function (v){
            var equalId = $(validate.curEle).attr('equal');
            var equalValue = $('#' + equalId).val();
            return (v == equalValue);
        },
        
        // 邮箱验证
        email: function (v){
            if (v == "" || v == undefined) {
                return true;
            }
            return validate.regValid(v, /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/);
        },
        //身份证校验
        idCard: function (v){
            if (v == "" || v == undefined) {
                return true;
            }
            //字符正则
            if (!validate.regValid(v, /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/)) {
                console.log(v + ":身份证号正则检查不通过！");
                return false;
            }
            //检查校验位
            code = v.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                console.log(v + ":身份证号的校验码检查不通过！");
                return false;
            }
            return true;

        },
        // 正则校验
        regValid: function (v, r){
            return r.test(v);
        },
}