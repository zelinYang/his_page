(function ($, window, document) {
	var defaults = {
		data: [], // 展示数据
		id: '', // 判定dom ID
		props: [], // 数据反显key
		index: 0, //默认当前选中
		sort: '', // 正序just，反序back, 其他表示不排序
		sortKey: '', //排序的参数key //为空时表示不排序
		activeColor: 'rgb(223, 251, 248)', // 默认颜色
		then: function () {

		}
	};

	var TimeAxis = function (options) {
		this.options = Object.assign(defaults, options);
		this.props = this.options.props;
		this.id = this.options.id;
		this.init();
	};

	TimeAxis.prototype = {

		// 组件初始化
		init: function () {
			// 生成时间轴盒子html
			this.setTimeBox();
		},

		// 生成时间轴盒子html
		setTimeBox: function () {
			var id = "#" + this.id;
			var html = '<ul class="cx-time-box"></ul>';
			$(id).empty().append(html);
			// 生成时间轴html
			this.setTimeAxisHtml();

			var self = this;
		},

		// 时间排序
		sortTime () {
			var list = this.options.data || [];
			var sort = this.options.sort;
			var key = this.options.sortKey;

			var num = 1;
			if(sort == 'just' && key){
				num = 1;
			}else if (sort == 'back' && key){
				num = -1;
			}else {
				return list;
			}

			list.sort(function (before, after) {
				return before[key] > after[key] ? num: -num
			})
			return list
		},

		// 生成时间轴html
		setTimeAxisHtml: function () {
			var list = this.sortTime();
			var html = '';
			var self = this;
			$.each(list, function (index, item) {
				html += '<li>';
				html += '<div class="cx-main-box cx-main-box'+index+'" data-index="'+index+'">';
				$.each(self.props, function(i, key){
					if(item[key]){
						html += '<div>'+self.formatChange(key,item[key])+'</div>';
					}
				});
				html += '</div>';
				html += '</li>';
			});
			var cls = "#" + this.id + ' ul';
			$(cls).empty().append(html);

			// 节点绑定点击事件
			$(cls + ' .cx-main-box').click(function (res) {
				self.options.index = $(this).data('index');

				// 点击事件回调
				var data = list[self.options.index];
				self.options.then(data);

				// 选择节点颜色
				self.activeColor();
			});

			// 选择节点颜色
			this.activeColor();
		},

		// 节点颜色
		activeColor () {
			var clsAll = '#' + this.id + ' .cx-main-box';
			$(clsAll).css({
				'background': '#f6f6f6',
				'border': '1px solid rgb(210, 239, 236)',
				'color': '#444'
			});
			$(clsAll).removeClass('active');

			var cls = clsAll + this.options.index;

			$(cls).css({
				'background': this.options.activeColor,
				'color': '#121212'
			});
			$(cls).addClass('active');
		},


		//数据格式化事件
		formatChange: function (key, val) {
			// 判断是否包含format 方法
			if(typeof(this.options.format) == "function"){
				return this.options.format(key, val);
			}
			return val;
		}
	};
	window.oTimeAxios = TimeAxis;
})(jQuery, window, document);
