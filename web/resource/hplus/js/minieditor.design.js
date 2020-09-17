(function(win, doc) {
    var miniEditor;
    /***************************************************************************
     * 调用控件minieditor.design v1.0
     *
     * @param container 内容容器(必填)
     * @param opt 其他参数
     */
    function minieditorDesign(container, opt) {
        var self = this;
        this.saveUrl = opt.saveUrl;
        this.initData = opt.initData;
        this.hospitalName = opt.hospitalName;
        this.baseFormParams = opt.baseFormParams;
        this.dicEmrClassNameKeyField = opt.dicEmrClassNameKeyField;
        this.emrTlpClassifyId = opt.emrTlpClassifyId;
        this.rootUrl = opt.rootUrl;
        this.doctorSign = opt.doctorSign;

        if (!container) {
            return null;
        }

        // 初始化遍历数据对象的主键值且将主键属性命名为id（后端用id属性来查询对应的对象）
        if (this.initData && this.dicEmrClassNameKeyField) {
            if (!this.baseFormParams) { this.baseFormParams = {} }
            $.each(this.initData, function (k, v){
                var primaryKey = self.dicEmrClassNameKeyField[k];
                if (primaryKey && v[primaryKey]) {
                    if (!self.baseFormParams[k]) { self.baseFormParams[k] = {}; }
                    self.baseFormParams[k].id = v[primaryKey];
                }
            });
        }

        //ueditor参数配置
        var ueditor_config = {
            wordCount: false,//关闭字数统计
            allowDivTransToP: false,
            elementPathEnabled: false,//关闭elementPath
            autoClearinitialContent: false,
            printType: opt.printType
        };
        // 非设计模式不显示上方功能菜单
        if (opt.modelType !== 'design') {
            ueditor_config.toolbars = [];
        }
        var patientHospitalEmrId = this.baseFormParams.PatientHospitalEmr && this.baseFormParams.PatientHospitalEmr.patientHospitalEmrId? this.baseFormParams.PatientHospitalEmr.patientHospitalEmrId: '';
        miniEditor = win.miniEditor = this.miniEditor = new MiniEditor({
            id: container,
            modelType: opt.modelType? opt.modelType: 'design',
            outhtmlWidth: opt.outhtmlWidth? opt.outhtmlWidth: '800px',
            height: opt.outhtmlHeight? opt.outhtmlHeight: '',
            fontSize: opt.fontSize,
            footerFlag: opt.emrTlpClassifyId !== '2',
            editor: ueditor_config,
            patientHospitalEmrId: patientHospitalEmrId,
            traceUrl: opt.rootUrl + '/patientHospitalEmrTrace/getEmrTrace.jo?patientHospitalEmrId='
        });

        // 编辑器初始化完成之后调用，可用于插入控件内容
        miniEditor.ready(function () {
            if (miniEditor.getTraceFlag()) {
                console.log('留痕不刷新数据');
                return;
            }
            console.log('ready');
            $('#hospitalName', $("#ueditor_0").contents()).html(self.hospitalName);
            if (opt.modelType === 'design') {
                design();
            } else {
                other();
                var refreshListener = document.getElementById("ueditor_0").contentWindow.refreshListener;
                if ( opt.modelType === 'readonly' && refreshListener ) {
                    document.getElementById( "ueditor_0" ).contentWindow.refreshListener(opt.modelType);
                }
            }
            $('#' + container).show();
            layui.use(['layer'], function(){
                var layer = layui.layer;
                layer.closeAll();
            });
            if (opt.modelType === 'print') {
                console.log($("#ueditor_0").contents().find('body'));
                $("#ueditor_0").contents().find('body').addClass('print').height('auto');
                $("#ueditor_0").contents().find('html').height('auto');
            }
        });

        function design() {
            // 保存
            $('#btn_save').click(function() {
                var controls = miniEditor.getControlById();
                var classMap = {};
                for (var i = 0; i < controls.length; i++) {
                    var id = controls[i].getCtrlId();
                    var opt = controls[i].getOpt();
                    if(!(/^[A-Z][A-z0-9]*$/).test(id)){
                        continue;
                    }
                    if (id.indexOf('EmrPatientOtherData') < 0 && id.indexOf('EmrPatientDicData') < 0) {
                        classMap[id.substring(0, (id.indexOf('_') > 0 ? id.indexOf('_') : (id.length)))] = 1;
                    }
                    if (opt.initField) {
                        var initFields = opt.initField.split(',');
                        for (var j = 0, jLen = initFields.length; j < jLen; j++) {
                            if (initFields[j].indexOf('EmrPatientOtherData') < 0 && initFields[j].indexOf('EmrPatientDicData') < 0) {
                                classMap[initFields[j].substring(0, (initFields[j].indexOf('_') > 0 ? initFields[j].indexOf('_') : (initFields[j].length)))] = 1;
                            }
                        }
                    }
                }
                var classNames = [];
                for(var key in classMap){
                    classNames.push(key);
                }
                self.baseFormParams.emrTlpClassId = classNames.join(',');
                self.baseFormParams.emrTlpContent = miniEditor.getContent();
                $.post(self.saveUrl, self.baseFormParams,
                    function(result) {
                        if (result.code === "0") {
                            common.msg(result.msg,1);
                        } else {
                            common.alert(result.msg,2);
                        }
                    }, 'json');
            });
            /**
             * addListener 注册事件监听器
             * afterExecCommand 运行命令之后会触发该命令事件
             * autosubmit 提交表单，快捷键  ctrl+Enter
             */
            miniEditor.editor.addListener('afterExecCommand', function (type, event) {
                if(event === "autosubmit"){
                    $('#btn_save').click();
                }
            });

            //addshortcutkey(Object keyset) 为编辑器的编辑命令提供快捷键 这个接口是为插件扩展提供的接口,主要是为新添加的插件，如果需要添加快捷键，所提供的接口
            // ctrl + o 打开电子病历控件模板
            miniEditor.editor.addshortcutkey({
                "minitemplate": "ctrl+79"
            });
        }


        function other() {
            console.log(self.initData);
            // 初始化控制值
            // 获取所有控件
            var controls = miniEditor.getControlById();
            for (var i = 0; i < controls.length; i++) {
                // 包含控件的控件和可编辑表格不设置值
                if (controls[i].hasCtrols() && controls[i].getTypeName() !== 'edittable') {
                    continue;
                }
                var id = $(controls[i].getCtrlElement()).attr("id");
                var ctrlOpt = controls[i].getOpt();
                var data;
                // 是否是列表数据
                var isList = false;
                var dataItem = id.split('_');
                // objName是类名，objField是字段名
                var objName = dataItem[0], objField=dataItem[1];
                // 获取这个了的数据对象
                var objData = self.initData[objName];
                // 如果没有这个类的数据就不设置
                if (!objData || (objField && !objData[objField] && objData[objField] !== 0)) {
                    if (!ctrlOpt.initField) {
                        if (opt.modelType === 'print') {
                            console.log(controls[i].getDom());
                            $(controls[i].getDom()).remove();
                        }
                        continue;
                    } else {
                        var initFields = ctrlOpt.initField.split(',');
                        var initData = [];
                        for (var k = 0, kLen = initFields.length; k < kLen; k++) {
                            var fields = initFields[k].split('_');
                            if (fields.length !== 2) {
                                continue;
                            }
                            var initValue = self.initData[fields[0]];
                            if (initValue) {
                                if (Array.isArray(initValue)) {
                                    for (var l = 0, lLen = initValue.length; l < lLen; l++) {
                                        initData[k] = initData[k]? initData[k] + (l + 1) +'、' + initValue[l][fields[1]]: (l + 1) +'、' + initValue[l][fields[1]];
                                    }
                                } else {
                                    initData[k] = initValue[fields[1]]? initValue[fields[1]]: '';
                                }
                            } else {
                                initData[k] = '';
                            }
                        }

                        if (ctrlOpt.fieldName) {
                            data = {};
                            var fieldNames = ctrlOpt.fieldName.split(',');
                            for (var j = 0, jLen = fieldNames.length; j < jLen; j++) {
                                data[fieldNames[j]] = initData[j]? initData[j]: '';
                            }
                        } else {
                            data = initData[0];
                        }
                        if (data === '') {
                            if (opt.modelType === 'print') {
                                console.log(controls[i].getDom());
                                $(controls[i].getDom()).remove();
                            }
                            continue;
                        }
                    }
                } else {
                    // 判断是否列表数据和字段数据
                    if (Array.isArray(objData)) {
                        if (dataItem.length < 2) {
                            data = objData;
                        } else {
                            var tempData = [];
                            for (var k = 0, kLen = objData.length; k < kLen; k++) {
                                tempData.push((objData[k].hasOwnProperty(objField) ? objData[k][objField] : ''))
                            }
                            data = tempData.join(',');
                        }
                    } else {
                        if (ctrlOpt.fieldName) {
                            var fieldNames = ctrlOpt.fieldName.split(',');
                            data = {};
                            for (var j = 0, jLen = fieldNames.length; j < jLen; j++) {
                                data[fieldNames[j]] = objData[fieldNames[j]]? objData[fieldNames[j]]: '';
                            }
                            if (opt.doctorSign && opt.doctorSign >= ctrlOpt.signLevel) {
                                data['signFlag'] = '1';
                            }
                        }  else{
                            data = (objData.hasOwnProperty(objField) ? objData[objField] : objData);
                        }
                    }
                }
                // 判断是否列表数据和字段数据
                var selectedValue = [];
                if (!data && objData[objField] !== 0) {
                    if (opt.modelType === 'print') {
                        console.log(controls[i].getDom());
                        $(controls[i].getDom()).remove();
                    }
                    continue;
                }
                switch (controls[i].getTypeName()) {
                    case 'text':
                        controls[i].setValue(data, true);
                        break;
                    case 'clickarea':
                    case 'select':
                        // console.log(data);
                        controls[i].setValue(data, true);
                        break;
                    case 'date':
                        if (data) {
                            controls[i].setValue(data, true);
                        }
                        break;
                    case 'checkbox':
                    case 'radio':
                        controls[i].setValue(data, true);
                        break;
                    case 'list':
                        controls[i].setValue(data, true);
                        break;
                    case 'clicktable':
                        controls[i].setValue(data, true);
                        break;
                    case 'edittable':
                        console.log(data);
                        controls[i].setValue(data, true, '', opt.manageNurseFlag);
                        break;
                    case 'medicalformula':
                        controls[i].setValue(data, true);
                        break;
                    default:
                        controls[i].setValue(data, true);
                }
            }
            var refreshListener = document.getElementById("ueditor_0").contentWindow.refreshListener;
            if ( refreshListener ) {
                document.getElementById( "ueditor_0" ).contentWindow.refreshListener('', {type: 'medicalformula'})
            }
        }

    }

    /**
     * 设置编辑器的内容
     * @param o
     */
    minieditorDesign.prototype.setContent = function(content) {
        return miniEditor.setContent(content);
    }

    /**
     * 设获取编辑器的内容
     * @param o
     */
    minieditorDesign.prototype.getContent = function() {
        return miniEditor.getContent();
    }

    /**
     * 设置控件值
     * @param o
     */
    minieditorDesign.prototype.setValue = function(o) {
        return miniEditor.getControlById(o.id).setValue(o.value, true);
    }

    /**
     * 获取控件值
     */
    minieditorDesign.prototype.getValue = function(id) {
        var value = "";
        if(miniEditor.getControlById(id).length > 0){
            value = miniEditor.getControlById(id)[0].getValue();
        }
        return value;
    }

    /**
     * 将控件的基础参数
     */
    minieditorDesign.prototype.getBaseParams = function() {
        return this.baseFormParams;
    }

    /**
     * 将控件外的参数追加到基础参数对象中，保存时一起提交到后端
     */
    minieditorDesign.prototype.addParams = function(params) {
        $.extend(this.baseFormParams, params);
    }

    /**
     * 保存控件值
     */
    minieditorDesign.prototype.save = function (url,callBack) {
        if (this.miniEditor.getTraceFlag() === '1') {
            common.msg('留痕模式不能保存', 2);
            return;
        }
        var result;
        var params = this.baseFormParams;
        var content = {};
        var traceContent = [];
        var controls = miniEditor.getControlById();
        var self = this;
        if (!this.miniEditor.validateForm()) {
            if (self.saveSuccess) {
                self.saveSuccess({});
            }
            return;
        }
        $.each(controls,function(i,v){
            var id = v.getDom().id;
            var value = v.getValue();
            var opt = v.getOpt();
            if(opt.saveFlag == "1"){//saveFlag  1=不保存，0=保存
                return true;
            }
            var typeName = v.getTypeName();
            var labelValue = '';
            var newValue = '';
            var objItem = id.split('_');
            if(!objItem || objItem[0].search("[^0-9a-zA-Z_]") >= 0){
                return true;
            }
            if (typeName === 'select' || typeName === 'checkbox' || typeName === 'radio') {
                var labelArray = [];
                var valueArray = [];
                for (var i = 0; i < value.length; i++) {
                    valueArray.push(value[i].value);
                    labelArray.push(value[i].label);
                }
                newValue = valueArray.join(',');
                labelValue = labelArray.join(',');
            } else if(typeName === 'list'){
                return true;
            } else {
                newValue = value;
            }
            if (objItem.length === 1){
                if(objItem[0] && newValue){
                    if(params[objItem[0]]){
                        $.extend(params[objItem[0]], newValue);
                    } else {
                        params[objItem[0]] = newValue;
                    }
                }
            } else if (objItem.length === 2) {
                if (!objItem[0]) {
                    return true;
                }
                var objName = params[objItem[0]] ? params[objItem[0]] : {};
                if (!objItem[1]) {
                    return true;
                }
                params[objItem[0]] = objName;
                switch (objItem[0]) {
                    case "EmrPatientOtherData":
                        if (typeName === 'text' && opt.fieldName) {
                            var fieldNames = opt.fieldName.split(',');
                            newValue = value[fieldNames[0]];
                        }
                        var data = {
                            patientOtherDataId: $(v.getCtrlElement()).attr('patientOtherDataId')? $(v.getCtrlElement()).attr('patientOtherDataId'): '',
                            dataElementId: opt.dataElementId,
                            elementName: opt.elementName,
                            elementEnName: opt.elementEnName,
                            tempValue: newValue
                        };
                        objName[objItem[1]] = data;
                        break;
                    case "EmrPatientDicData":
                        // var data = {
                        //     patientDicDataId: $(v.getCtrlElement()).attr('patientDicDataId')? $(v.getCtrlElement()).attr('patientDicDataId'): '',
                        //     dicTypeId: opt.dicTypeId,
                        //     dicTypeName: opt.dicTypeName,
                        //     dicName: opt.dicName,
                        //     dicCode: opt.dicCode,
                        //     modelName: opt.modelName,
                        //     dataValueStr: opt.dataValueStr,
                        //     dataValueScore: opt.dataValueScore,
                        //     dataElementId: opt.dataElementId
                        // };
                        objName[objItem[1]] = value;
                        break;
                    default:
                        if (typeName === 'text') {
                            if (opt.fieldName && value) {
                                var fieldNames = opt.fieldName.split(',');
                                for (var i = 0; i < fieldNames.length; i++) {
                                    objName[fieldNames[i]] = value[fieldNames[i]];
                                }
                                newValue = value[fieldNames[0]];
                            } else {
                                objName[objItem[1]] = newValue;
                                // if (opt.otherFieldName) {
                                //     var otherFieldNames = opt.otherFieldName.split('.');
                                //     if (otherFieldNames.length === 1) {
                                //         objName[opt.otherFieldName] = newValue;
                                //     } else {
                                //         params[otherFieldNames[0]][otherFieldNames[1]] = newValue;
                                //     }
                                // } else {
                                //     objName[objItem[1]] = newValue;
                                // }
                            }
                        } else {
                            objName[objItem[1]] = newValue;
                        }
                }
                if (typeName === 'text' || typeName === 'radio' || typeName === 'select' || typeName === 'date' || typeName === 'checkbox' || typeName === 'clickarea'&& !v.hasCtrols()) {
                    var oldValue = v.getOldValue();
                    var currentValue = newValue;
                    var ctrlValue = newValue;
                    if (typeName === 'date' && oldValue) {
                        oldValue = new Date(parseInt(oldValue)).Format(v.getOpt().format);
                        ctrlValue = currentValue = new Date(newValue).Format(v.getOpt().format);
                    }
                    if (objItem[0] != 'EmrPatientOtherData' && objItem[0] != 'EmrPatientDicData' && (typeName === 'radio' || typeName === 'select' || typeName === 'checkbox') ) {
                        ctrlValue = labelValue;
                        objName[objItem[1]+'Name'] = labelValue;
                    }
                    if (oldValue !== currentValue && !opt.formulaFlag) {
                        traceContent.push({
                            ctrlId: id,
                            ctrlValue: ctrlValue,
                            ctrlType: opt.type,
                            traceFlag: (typeName === 'text' && !opt.fieldName)? '1': '0',
                            oldValue: newValue
                        });
                    }
                }
            }
        });
        for (var key in params) {
            if (JSON.stringify(params[key]) === '{}') {
                delete params[key];
            }
        }
        params.traceContent = traceContent;
        if (params.PatientHospitalEmr) {
            params.PatientHospitalEmr.emrHtmlContent = this.miniEditor.getContent();
        }
        //提交
        //var commonParams = {};
        //var emrParams = {emrJsonData: JSON.stringify(params)};
        console.log(params);
        var requestUrl = url ? url : self.saveUrl;
        var index = layer.load(1);
        $.post(requestUrl, {emrJsonData: JSON.stringify(params)}, function (res){
            layer.close(index);
            if(res.code === "0") {
                self.miniEditor.setOpt({patientHospitalEmrId: res.data['PatientHospitalEmr_patientHospitalEmrId']});
                $('#patientHospitalEmrId').val(res.data['PatientHospitalEmr_patientHospitalEmrId']);
                for (var id in res.data) {
                    var ctrl = self.miniEditor.getControlById(id);
                    if (ctrl.length > 0) {
                        ctrl[0].setCtrlDataIds(res.data[id]);
                        delete res.data[id];
                    }
                }
                common.msg('已保存', 1, function (){
                    for (var i = 0; i < traceContent.length; i++) {
                        var ctrl = self.miniEditor.getControlById(traceContent[i].ctrlId);
                        ctrl[0].setOldValue(traceContent[i].oldValue);
                    }
                    if (self.saveSuccess) {
                        self.saveSuccess(res);
                    }
                });
                if(callBack){
                    callBack(res);
                }
            } else {
                console.log(layer);
                layer.alert(res.msg? res.msg: '系统异常', {icon: 2});
                // common.alert(res.msg, 2);
            }
        }, 'json').error(function(res) {
            layer.close(index);
            layer.alert(res.msg? res.msg: '系统异常', {icon: 2});
        });
    }

    win.minieditorDesign = minieditorDesign;
})(window, document);