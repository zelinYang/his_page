var oNode = null;
var thePlugins = 'sdetemplate';
function generateTextHtml(data) {
    var json = {
        ID: data.className + '_' + data.fieldName,
        TYPE: 'text',
        NAME: data.modelName,
        TAG: data.labelName,
        DESCNAME: data.description,
        VERIFYTYPE: data.verifyType,
        VALUE: "",
        COLOR: "000000",
        REQUIRED: data.requiredType,
        READONLY: data.readonlyType
    };
    var html = makeTextHtml(json);
    if (!oNode) {
        try {
            oNode = createElement('span', json.ID);
            oNode.setAttribute('title', json.NAME);
            oNode.setAttribute('sde-model', JSON.stringify(json));
            oNode.setAttribute("contenteditable", "false");
            oNode.setAttribute('class', 'sde-bg');
            oNode.innerHTML = html; //todo:具体需要实现

            editor.execCommand('insertHtml', "<span> </span>" + oNode.outerHTML + "<span> </span>");
        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        oNode.setAttribute('title', json.NAME);
        oNode.setAttribute('id', json.ID);
        oNode.setAttribute('sde-model', JSON.stringify(json));
        oNode.innerHTML = html;
        delete UE.plugins[thePlugins].editdom;
    }
}

function makeTextHtml(json) {
    var isClear = 1,
        show = json.DESCNAME == '' ? ' ' : json.DESCNAME;
    if (json.VALUE != '') {
        show = json.VALUE;
        isClear = 0;
    }
    if (json.READONLY == 1)
        isClear = 0;
    var html = '<span class="sde-left" style="color:' +
        ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false">[</span><span  title="' + json.DESCNAME + '"  style="color:#' + json.COLOR + ';"  class="sde-value" ' +
        ((json.READONLY == 1) ? ' contenteditable="false" ' : ' contenteditable="true" ') +
        '>' + show + '</span><span style="color:' +
        ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false" class="sde-right">]</span>';
    return html;
}

function generateTextareaHtml(data) {
    var json = {
        ID: data.className + '_' + data.fieldName,
        TYPE: 'textarea',
        NAME: data.modelName,
        TAG: data.labelName,
        DESCNAME: data.description,
        VALUE: '',
        REQUIRED: data.requiredType,
        READONLY: data.readonlyType,
        COLOR: data.fontColor
    };
    var html = makeTextareaHtml(json);
    if (!oNode) {
        try {
            oNode = createElement('span', json.ID);
            oNode.setAttribute('title', json.NAME);
            oNode.setAttribute('sde-model', JSON.stringify(json));
            oNode.setAttribute("contenteditable", "false");
            oNode.classList.add('sde-ctrl-textarea');
            oNode.classList.add('sde-bg');
            oNode.innerHTML = html; //todo:具体需要实现

            editor.execCommand('insertHtml', oNode.outerHTML);
        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        oNode.setAttribute('title', json.NAME);
        oNode.setAttribute('id', json.ID);
        oNode.setAttribute('sde-model', JSON.stringify(json));
        oNode.innerHTML = html;
        delete UE.plugins[thePlugins].editdom;
    }
}

function makeTextareaHtml(json) {
    var isClear = 1,
        show = json.DESCNAME == '' ? ' ' : json.DESCNAME;
    if (json.VALUE != '') {
        show = json.VALUE;
        isClear = 0;
    }
    if (json.READONLY == 1)
        isClear = 0;
    var html = '<div  title="' + json.DESCNAME + '"  style="color:#' + json.COLOR + ';"  class="sde-value" ' +
        ((json.READONLY == 1) ? ' contenteditable="false" ' : ' contenteditable="true" ') +
        '>' + show + '</div>';
    return html;
}

function generateDateHtml(data) {
    var json = {
        ID: data.className + '_' + data.fieldName,
        TYPE: 'date',
        NAME: data.modelName,
        TAG: data.labelName,
        DESCNAME: data.description,
        MAX: '',
        MIN: '',
        FORMAT: data.dateFormat,
        VALUE: '',
        REQUIRED: data.requiredType,
        READONLY: data.readonlyType,
        COLOR: data.fontColor
    };
    var html = makeDateHtml(json);
    if (!oNode) {
        try {
            oNode = createElement('span', json.ID);
            oNode.setAttribute('title', json.NAME);
            oNode.setAttribute('sde-model', JSON.stringify(json));
            oNode.setAttribute("contenteditable", "false");
            oNode.setAttribute('class', 'sde-bg');
            oNode.innerHTML = html; //todo:具体需要实现

            editor.execCommand('insertHtml', "<span> </span>" + oNode.outerHTML + "<span> </span>");
        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        oNode.setAttribute('title', json.NAME);
        oNode.setAttribute('id', json.ID);
        oNode.setAttribute('sde-model', JSON.stringify(json));
        oNode.innerHTML = html;
        delete UE.plugins[thePlugins].editdom;
    }
}

function makeDateHtml(json) {
    var isClear = 1,
        show = json.DESCNAME == '' ? ' ' : json.DESCNAME;
    if (json.VALUE != '') {
        show = json.VALUE;
        isClear = 0;
    }
    if (json.READONLY == 1)
        isClear = 0;
    var html = '<span class="sde-left" style="color:' +
        ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false">[</span><span  title="' + json.DESCNAME + '"  style="color:#' + json.COLOR + ';"  class="sde-value" ' +
        // ((json.READONLY == 1) ? ' contenteditable="false" ' : ' contenteditable="true" ') +
        ' contenteditable="false" ' +
        '>' + show + '</span><span style="color:' +
        ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false" class="sde-right">]</span>';
    return html;
}

function generateSelectHtml(data) {
    console.log(JSON.stringify(data));
    var json = {
        ID: data.className + '_' + data.fieldName,
        TYPE: 'select',
        NAME: data.modelName,
        TAG: data.labelName,
        DESCNAME: data.description,
        REQUIRED: data.requiredType,
        FREEINPUT: data.freeInput,
        COLOR: data.fontColor,
        VALUE: '',
        TEXT: '',
        REMOTEURL: data.remoteUrl, //url
        BINDINGDATA: JSON.parse(data.bindingData) //数据
    };
    var html = makeSelectHtml(json);
    if (!oNode) {
        try {
            oNode = createElement('span', json.ID);
            oNode.setAttribute('title', json.NAME);
            oNode.setAttribute('sde-model', JSON.stringify(json));
            // if (json.READONLY == 1) {
            //     oNode.setAttribute("contenteditable", "false");
            // }
            oNode.setAttribute("contenteditable", "false");
            oNode.setAttribute('class', 'sde-bg');
            oNode.innerHTML = html; //todo:具体需要实现
            // oNode.onmousemove = function() {
            //     alert('onmousemove')
            // };
            editor.execCommand('insertHtml', "<span> </span>" + oNode.outerHTML + "<span> </span>");

        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        oNode.setAttribute('title', json.NAME);
        oNode.setAttribute('id', json.ID);
        oNode.setAttribute('sde-model', JSON.stringify(json));
        oNode.innerHTML = html;
        delete UE.plugins[thePlugins].editdom;
    }
}

function makeSelectHtml(json) {
    var isClear = 1,
        show = json.DESCNAME == '' ? ' ' : json.DESCNAME;
    if (json.VALUE != '') {
        show = json.TEXT;
        isClear = 0;
    }
    if (json.READONLY == 1)
        isClear = 0;
    var html = '<span class="sde-left" style="color:#0000FF' +
        // ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false">[</span><span title="' + json.DESCNAME + '" style="color:#' + json.COLOR + ';"  class="sde-value" ' +
        ((json.FREEINPUT == 0) ? ' contenteditable="false" ' : ' contenteditable="true" ') + //是否允许自由输入
        '>' + show + '</span><span style="color:' +
        ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false" class="sde-right">]</span>';
    return html;
}

function generateCheckboxHtml(data) {
    var json = {
        ID: data.className + '_' + data.fieldName,
        TYPE: 'checkbox',
        NAME: data.modelName,
        TAG: data.labelName,
        DESCNAME: data.description,
        COLOR: data.fontColor,
        VALUE: '',
        REMOTEURL: data.remoteUrl, //url
        BINDINGDATA: JSON.parse(data.bindingData) //数据
    };
    var html = makeCheckboxHtml(json);
    if (!oNode) {
        try {
            oNode = createElement('span', json.ID);
            oNode.setAttribute('title', json.NAME);
            oNode.setAttribute('sde-model', JSON.stringify(json));
            oNode.setAttribute("contenteditable", "false");
            oNode.setAttribute('class', 'sde-bg');
            oNode.innerHTML = html; //todo:具体需要实现
            editor.execCommand('insertHtml', "<span> </span>" + oNode.outerHTML + "<span> </span>");
        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        oNode.setAttribute('title', json.NAME);
        oNode.setAttribute('id', json.ID);
        oNode.setAttribute('sde-model', JSON.stringify(json));
        oNode.innerHTML = html;
        delete UE.plugins[thePlugins].editdom;
    }
}

function makeCheckboxHtml(json) {
    var show = [];
    if (json.BINDINGDATA && json.BINDINGDATA.length > 0) {
        for (var i = 0, l = json.BINDINGDATA.length; i < l; i++) {
            var temp = json.BINDINGDATA[i];
            show.push('<label><input type="checkbox" ' + ((temp.CHECKED != undefined && temp.CHECKED == 1) ? ' checked="checked" ' : '') + '  value="' + temp.VALUE + '" text="' + temp.TEXT + '"/>' + temp.TEXT + '</label>');
        }
    }
    var html = '<span class="sde-left" style="color:#0000FF' +
        // ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false">[</span><span title="' + json.DESCNAME + '" style="color:#' + json.COLOR + ';"  class="sde-value" ' +
        ' contenteditable="false" >' + show.join('') + '</span><span style="color:#0000FF' +
        '" contenteditable="false" class="sde-right">]</span>';
    return html;
}

function generateRadioHtml(data) {
    var json = {
        ID: data.className + '_' + data.fieldName,
        TYPE: 'radio',
        NAME: data.modelName,
        TAG: data.labelName,
        DESCNAME: data.description,
        COLOR: data.fontColor,
        VALUE: '',
        REMOTEURL: data.remoteUrl, //url
        BINDINGDATA: JSON.parse(data.bindingData) //数据
    };
    var html = makeRadioHtml(json);
    if (!oNode) {
        try {
            oNode = createElement('span', json.ID);
            oNode.setAttribute('title', json.NAME);
            oNode.setAttribute('sde-model', JSON.stringify(json));
            oNode.setAttribute("contenteditable", "false");
            oNode.setAttribute('class', 'sde-bg');
            oNode.innerHTML = html; //todo:具体需要实现
            editor.execCommand('insertHtml', "<span> </span>" + oNode.outerHTML + "<span> </span>");
        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        oNode.setAttribute('title', json.NAME);
        oNode.setAttribute('id', json.ID);
        oNode.setAttribute('sde-model', JSON.stringify(json));
        oNode.innerHTML = html;
        delete UE.plugins[thePlugins].editdom;
    }
}

function makeRadioHtml(json) {
    var show = [];
    if (json.BINDINGDATA && json.BINDINGDATA.length > 0) {
        for (var i = 0, l = json.BINDINGDATA.length; i < l; i++) {
            var temp = json.BINDINGDATA[i];
            show.push('<label><input type="radio" name="' + json.ID + '" ' + ((temp.CHECKED != undefined && temp.CHECKED == 1) ? ' checked="checked" ' : '') + '  value="' + temp.VALUE + '" text="' + temp.TEXT + '"/>' + temp.TEXT + '</label>');
        }
    }
    var html = '<span class="sde-left" style="color:#0000FF' +
        // ((json.READONLY == 1) ? '#808080' : '#0000FF') +
        '" contenteditable="false">[</span><span title="' + json.DESCNAME + '" style="color:#' + json.COLOR + ';"  class="sde-value" ' +
        ' contenteditable="false" >' + show.join('') + '</span><span style="color:#0000FF' +
        '" contenteditable="false" class="sde-right">]</span>';
    return html;
}

function generateAreaHtml(data) {
    if (!oNode) {
        try {
            oNode = createElement('div', data.className + '_' + data.fieldName);
            oNode.setAttribute('title', data.modelName);
            oNode.setAttribute('sde-model', data.bindingData);
            oNode.setAttribute('contenteditable', false);
            oNode.classList.add('sde-area');
            oNode.classList.add('sde-area-mode-normal');
            oNode.innerHTML = '<div contenteditable="true">' + $G('txtVALUE').value + '</div>'; //todo:具体需要实现
            editor.execCommand('insertHtml', oNode.outerHTML);
        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        oNode.setAttribute('title', data.modelName);
        oNode.setAttribute('id', data.className + '_' + data.fieldName);
        oNode.setAttribute('sde-model', data.bindingData);
        oNode.innerHTML = '<div contenteditable="true"></div>';
        delete UE.plugins[thePlugins].editdom;
    }
}