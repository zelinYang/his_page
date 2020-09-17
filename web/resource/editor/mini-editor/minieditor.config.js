/**
 * minieditor完整配置项
 * 可以在这里配置整个编辑器的特性
 */

(function() {

  var URL = window.MINIEDITOR_HOME_URL || getUEBasePath();

  /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
  window.MINIEDITOR_CONFIG = {
      id: null, //querySelector满足的值，比如#id、.className、Element。可以是Element，也可以是#id等
      footer: '编辑器', //element或者string 表示底部显示内容
      iframe_css_src: null, //string/Array数组 扩展css
      iframe_js_src: null, //string/Array数组 扩展js
      outer_width: 816, //单位px，页面的外部宽度
      inner_width: 624, //单位px，页面的内部宽度
      page_height: 882, //内容页页高实际页高，footer_page_height会浮动，page_height
      page_start_num: 1, //页面起始页
      HOME_URL: URL,
      HOME_URL_DIALOGS: URL + 'dialogs/',
      EDITOR_URL: URL + 'js/sde-ie8-editor.js',
      total_page_height: 1000, //A4纸张总页高默认该值【不允许修改】
      mode: 'design', //默认为设计模式设计模式（DESIGN）、编辑模式（EDITOR）、严格模式STRICT、只读模式（READONLY）
      default_open_toolbar: 'sde-toolbar-editor',//默认开启的toolbar
      PAGE_CONFIG: [{//打印纸张定义
          name: 'A3',
          width: 1123,
          height: 1588,
          top: 72,
          right: 72,
          bottom: 72,
          left: 72
      }, {
          name: 'A4',
          width: 794,
          height: 1123,
          top: 72,
          right: 72,
          bottom: 72,
          left: 72
      }, {
          name: 'A5',
          width: 561.5,
          height: 794,
          top: 72,
          right: 72,
          bottom: 72,
          left: 72
      }],
      toolbars: [['combox','bold','button','dialog']]
  };

  function getUEBasePath(docUrl, confUrl) {
    return getBasePath(
      docUrl || self.document.URL || self.location.href,
      confUrl || getConfigFilePath()
    );
  }

  function getConfigFilePath() {
    var configPath = document.getElementsByTagName("script");

    return configPath[configPath.length - 1].src;
  }

  function getBasePath(docUrl, confUrl) {
    var basePath = confUrl;

    if (/^(\/|\\\\)/.test(confUrl)) {
      basePath =
        /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, "");
    } else if (!/^[a-z]+:/i.test(confUrl)) {
      docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, "");

      basePath = docUrl + "" + confUrl;
    }

    return optimizationPath(basePath);
  }

  function optimizationPath(path) {
    var protocol = /^[a-z]+:\/\//.exec(path)[0],
      tmp = null,
      res = [];

    path = path.replace(protocol, "").split("?")[0].split("#")[0];

    path = path.replace(/\\/g, "/").split(/\//);

    path[path.length - 1] = "";

    while (path.length) {
      if ((tmp = path.shift()) === "..") {
        res.pop();
      } else if (tmp !== ".") {
        res.push(tmp);
      }
    }

    return protocol + res.join("/");
  }
})();
