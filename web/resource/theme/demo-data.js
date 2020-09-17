$(document).ready(function () {
    (function(document, window, $) {
        'use strict';
        // Example Bootstrap Table From Data
        // ---------------------------------
        (function() {
            var bt_data = [{
                "Tid": "AFASF4353",
                "col_1": "张伟",
                "col_2": "男",
                "col_3": "25",
                "zc": "安全工程师",
                "mobile": "13712345678",
                "tel": "4616816",
                "fax": "5146116",
                "col_4": " - ",
                "col_5": "胃",
                "col_6": "CT",
                "col_7": "李白",
                "col_8": "2017-12-01",
                "col_9": "赵方芳",
                "col_10": "2018-01-12",
                "col_11": "47",
                "col_12": "3",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
            },
            {
                "Tid": "ASFRT43534",
                "col_1": "胡婷",
                "col_2": "女",
                "col_3": "35",
                "zc": "工程师",
                "mobile": "13212345678",
                "tel": "56745",
                "fax": "74554745634",
                "col_4": "",
                "col_5": "颈",
                "col_6": "CT",
                "col_7": "李白",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
            },
            {
                "Tid": "ASFA5F543",
                "col_1": "蒋经国",
                "col_2": "男",
                "col_3": "65",
                "zc": "工程师",
                "mobile": "456365346",
                "tel": "8768354",
                "fax": "32636434",
                "col_4": "",
                "col_5": "腹",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "AFS5654645",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "1782686186",
                "tel": "61231634",
                "fax": "169644",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "C53534463446",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "zc": "工程师",
                "mobile": "412964513451",
                "tel": "1343434",
                "fax": "8768261",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "D45344634743",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "605134316",
                "tel": "2165314",
                "fax": "13654042",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "E6745645",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "314133282",
                "tel": "13314134",
                "fax": "136534414",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "E8567654",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "zc": "工程师",
                "mobile": "137634143541",
                "tel": "49264137",
                "fax": "138134124",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "E3454564",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "31896415424",
                "tel": "134634124",
                "fax": "13535451324",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "R664553342",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "266327137",
                "tel": "3164324",
                "fax": "13653424",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "C7443543",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "zc": "工程师",
                "mobile": "65131717158",
                "tel": "4574563",
                "fax": "63543453",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "C644356756",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "355124145",
                "tel": "567124345",
                "fax": "1543134",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "D576452465",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "135613413",
                "tel": "1415341",
                "fax": "4134341",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "G45375445",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "zc": "工程师",
                "mobile": "5315727524",
                "tel": "134324124",
                "fax": "4135441",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "J54742352",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "zc": "工程师",
                "mobile": "1389671771",
                "tel": "51376745",
                "fax": "16414214",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "K5462344235",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "A4474653",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "FY4252343",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "VWF464573",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "B3F342D43",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "B43C23432",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "FUC545V344",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "6B324C3",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "B245CC234",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "JV76V3443",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "5N6B354C",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "C5Y43C53",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "BN652C42",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "C4T52346",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "N563543232",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "DHX34T63453",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "45N753C23",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "B3V6C3X23X4523",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "C353564353V",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "4B65C34",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "B65C3C56 34",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "B63X32452",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "JC74V64453",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "CJ754V6455643",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "C635345B63",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "B65CX243",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "NB62VC43C2",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "BW45BEH4",
                "col_1": "李丽莎",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "X2546546",
                "col_1": "刘燕秋",
                "col_2": "女",
                "col_3": "30",
                "col_4": "",
                "col_5": "腹",
                "col_6": "DX",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            },
            {
                "Tid": "6C5336",
                "col_1": "杨丽芳",
                "col_2": "女",
                "col_3": "25",
                "col_4": "",
                "col_5": "膝盖",
                "col_6": "CT",
                "col_7": "赵芳",
                "col_8": "2017-12-01",
                "col_9": "杨希",
                "col_10": "2017-12-10",
                "col_11": "9",
                "col_12": "5",
                "col_13": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' title='文件' class='edit'><i class='fa fa-file-text-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_14": "<a href='javascript:void(0)' title='修改' class='edit'><i class='fa fa-pencil-square-o edit'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_15": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a><a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"
                ,"col_16": "<a href='javascript:void(0)' title='查看' class='details'><i class='fa fa-eye'></i></a>"
                ,"col_17": "<a href='javascript:void(0)' value='删除'><i class='fa fa-minus-circle del'></i></a>"

            }
            ];


            $('#exampleTableFromData').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: true,
                pageNumber: true,
                //height: "626",
                pageSize: "12"
            });
            $('#exampleTableFromData1').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: true,
                pageNumber: true,
                pageSize: "9"
            });
            $('#exampleTableFromData2').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });
            $('#exampleTableFromData3').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });
            $('#exampleTableFromData4').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });
            $('#exampleTableFromData5').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });
            $('#exampleTableFromData6').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });
            $('#exampleTableFromData7').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });
            $('#exampleTableFromData8').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });
            $('#exampleTableFromData9').bootstrapTable({
                data: bt_data,
                // mobileResponsive: true,
                pagination: false,
                pageNumber: false
            });

        })();




    })(document, window, jQuery);


});
