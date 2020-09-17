var thePlugins = 'sdectrltext',
    ctrl, opt, domCtrl;

function generateTextHtml(data) {
    console.log(JSON.stringify(data));
    var newOpt = opt || {};
    newOpt.desc = data.description;
    newOpt.required = data.requiredType ? 1 : 0;
    newOpt.strictverify = data.strictverifyType ? 1 : 0;
    newOpt.notdel = data.notdelType ? 1 : 0;
    newOpt.verify = data.verifyType;
    newOpt.mode = data.modeType;
    domCtrl = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-ctrl',
        contenteditable: false,
        id: data.className + '_' + data.fieldName,
        'sde-type': 'text',
        'sde-right': '.'
    });
    var domValue = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-value',
        contenteditable: (data.mode === "EDITOR"),
        'sde-left': '[',
        'sde-right': ']'
    });
    domValue.innerHTML = newOpt.desc;
    domCtrl.appendChild(domValue);
    domValue.style.color = '#' + data.fontColor;
    domValue.style.backgroundColor = '#' + data.backgroundColor;
    //新建
    editor.execCommand('insertControl', domCtrl, newOpt)
}

function generateTextareaHtml(data) {

}

function generateDateHtml(data) {
    var newOpt = opt || {};
    newOpt.desc = data.description;
    newOpt.required = data.requiredType ? 1 : 0;
    newOpt.strictverify = data.strictverifyType ? 1 : 0;
    newOpt.notdel = data.notdelType ? 1 : 0;
    newOpt.mode = data.modeType;
    newOpt.min = '';
    newOpt.max = '';
    newOpt.format = data.dateFormat;
    newOpt.defvalue = '';
    //新增
    domCtrl = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-ctrl',
        contenteditable: false,
        id: data.className + '_' + data.fieldName,
        'sde-type': 'date',
        'sde-right': '.',
    });
    var domValue = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-value',
        contenteditable: (data.mode === "EDITOR"),
        'sde-left': '[',
        'sde-right': ']',
    });
    domValue.innerHTML = newOpt.desc;
    domCtrl.appendChild(domValue);
    domValue.style.color = '#' + data.fontColor;
    domValue.style.backgroundColor = '#' + data.backgroundColor;
    editor.execCommand('insertControl', domCtrl, newOpt);
}

function generateSelectHtml(data) {
    var newOpt = opt || {};
    newOpt.desc = data.description;
    newOpt.required = data.requiredType ? 1 : 0;
    newOpt.multi = data.multiType ? 1 : 0;
    newOpt.notdel = data.notdelType ? 1 : 0;
    newOpt.mode = data.modeType;
    newOpt.bindingdata = data.bindingData;
    if (data.remoteUrl) {
        newOpt.remotedata = {
            'url': data.remoteUrl,
            'method': 'get',
            'headers': '',
            'data': ''
        };
    }
    domCtrl = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-ctrl',
        contenteditable: false,
        id: data.className + '_' + data.fieldName,
        'sde-type': 'select',
        'sde-right': '.',
    });
    var domValue = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-value',
        contenteditable: (data.mode === "EDITOR"),
        'sde-left': '[',
        'sde-right': ']',
    });
    domValue.innerHTML = newOpt.desc;
    domCtrl.appendChild(domValue);
    domValue.style.color = '#' + data.fontColor;
    domValue.style.backgroundColor = '#' + data.backgroundColor;
    //新建
    editor.execCommand('insertControl', domCtrl, newOpt);
}

function generateCheckboxHtml(data) {
    var newOpt = opt || {};
    newOpt.desc = data.description;
    newOpt.required = data.requiredType ? 1 : 0;
    newOpt.notdel = data.notdelType ? 1 : 0;
    newOpt.mode = data.modeType;
    newOpt.bindingdata = data.bindingData;
    if (data.remoteUrl) {
        newOpt.remotedata = JSON.parse(data.remoteUrl);
        if (!newOpt.remotedata.url) {
            newOpt.remotedata = null;
        }
    }
    domCtrl = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-ctrl',
        contenteditable: false,
        id: data.className + '_' + data.fieldName,
        'sde-type': 'checkbox',
        'sde-right': '.',
    });
    var domValue = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-value',
        contenteditable: (data.mode === "EDITOR"),
        'sde-left': '[',
        'sde-right': ']',
    });
    domValue.innerHTML = newOpt.desc;
    domCtrl.appendChild(domValue);
    domValue.style.color = '#' + data.fontColor;
    domValue.style.backgroundColor = '#' + data.backgroundColor;
    //新建
    editor.execCommand('insertControl', domCtrl, newOpt)
}

function generateRadioHtml(data) {
    var newOpt = opt || {};
    newOpt.desc = data.description;
    newOpt.required = data.requiredType ? 1 : 0;
    newOpt.notdel = data.notdelType ? 1 : 0;
    newOpt.mode = data.modeType;
    newOpt.bindingdata = data.bindingData;
    if (data.remoteUrl) {
        newOpt.remotedata = JSON.parse(data.remoteUrl);
        if (!newOpt.remotedata.url) {
            newOpt.remotedata = null;
        }
    }
    domCtrl = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-ctrl',
        contenteditable: false,
        id: data.className + '_' + data.fieldName,
        'sde-type': 'radio',
        'sde-right': '.',
    });
    var domValue = UE.dom.domUtils.createElement(document, 'span', {
        class: 'sde-value',
        contenteditable: (data.mode === "EDITOR"),
        'sde-left': '[',
        'sde-right': ']',
    });
    domValue.innerHTML = newOpt.desc;
    domCtrl.appendChild(domValue);
    domValue.style.color = '#' + data.fontColor;
    domValue.style.backgroundColor = '#' + data.backgroundColor;
    //新建
    editor.execCommand('insertControl', domCtrl, newOpt);
}
