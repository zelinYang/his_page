$(document).ready(function () {

    //*****全局公共*****//
    //复选框、单选美化
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    //弹出浏览页
    $('a.show_tabs').on('click', function () {
        layer.open({
            type: 2,
            title: false,
            shadeClose: false,
            shade: 0.6,
            move: false,
            area: ['98.6%', '97%'],
            content: ['show_tabs.html','no'] //iframe的url
        });
    });

    //弹出审核页
    $('button#btn_audi').on('click', function () {
        layer.open({
            type: 2,
            title: '审核',
            shadeClose: false,
            shade: 0.6,
            move: false,
            area: ['98.6%', '97%'],
            content: ['audi.html','no'] //iframe的url
        });
    });

    //弹出选项卡页
    $('button#btn_tabs').on('click', function () {
        layer.open({
            type: 2,
            title: false,
            shadeClose: false,
            shade: 0.6,
            move: false,
            area: ['98.5%', '96.5%'],
            content: ['tabs.html','no'] //iframe的url
        });
    });


    /*laydate 时间*/
    laydate.render({
        elem: '.dateG1' //指定元素
        ,type: 'date'
        ,range: '~'
        ,format: 'yyyy-MM-dd'
        ,min: -15 //15天前
        ,max: 15 //15天后
    });
    laydate.render({
        elem: '.dateG2' //指定元素
        ,type: 'date'
        ,range: '~'
        ,format: 'yyyy-MM-dd'
        ,min: -15 //15天前
        ,max: 15 //15天后
    });
    laydate.render({
        elem: '.dateG3' //指定元素
        ,type: 'date'
        ,range: '~'
        ,format: 'yyyy-MM-dd'
        //,min: -15 //15天前
        //,max: 15 //15天后
    });

    laydate.render({
        elem: '.date1' //指定元素
        ,type: 'date'
        ,format: 'yyyy-MM-dd'
        //,min: -15 //15天前
        // ,max: 15 //15天后
    });

    laydate.render({
        elem: '.date2' //指定元素
        ,type: 'date'
        ,format: 'yyyy-MM-dd'
        //,min: -15 //15天前
        // ,max: 15 //15天后
    });
    laydate.render({
        elem: '.date3' //指定元素
        ,type: 'date'
        ,format: 'yyyy-MM-dd'
        //,min: -15 //15天前
        // ,max: 15 //15天后
    });
    laydate.render({
        elem: '.date4' //指定元素
        ,type: 'date'
        ,format: 'yyyy-MM-dd'
        //,min: -15 //15天前
        // ,max: 15 //15天后
    });


    laydate.render({
        elem: '.time1' //指定元素
        ,type: 'datetime'
        ,format: 'yyyy-MM-dd HH:mm'
    });

    laydate.render({
        elem: '.time2' //指定元素
        ,type: 'datetime'
        ,format: 'yyyy-MM-dd HH:mm:ss'
    });


});






