//日历组件
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(factory);
	}else{
		root.calendar = factory();
	}
}(window, function(exports) {
	function calendar(o){
		o = o ? o : {};
		this.showPast= o.showPast ||false;//true|false 已过期/未到的时间是否显示
		this.type= o.type || 0;//0｜1|2  0:区域选择 1:多选 2:单选
		this.startDay= o.startDay || new Date();  //当前日期，默认是今天，格式 2015-5-5
		this.endDay = o.endDay; //结束时间
		this.page= o.page;  //2 | xx  显示几页
		this.startWeek = o.startWeek || '7'; //起始位置星期
		this.item = o.item || $('.common-calendar-container'); //父级dom
		this.resultInput; //结果
		this.setContent = o.setContent;
		this.callback = o.callback;

		//函数内部使用
		this.result = [];
		this.active = [];
		this.init();

	}
	calendar.prototype = {
		init: function(){
			var _this = this;
			//初始化startDay
			this.startDay = this.getDayTime(this.startDay);
			//初始化endDay
			if (this.endDay) {
				this.endDay = this.getDayTime(this.endDay);
				//存在endDay，且未设置月份数量，根据起始日期计算
				if (!this.page) {
					this.page = (this.endDay.year - this.startDay.year) + (parseInt(this.endDay.month) - parseInt(this.startDay.month)) +1;
				}
			}
			//初始化当天
			this.today = this.getDayTime(new Date());
			//初始化特殊内容设置
			if (this.setContent) {
				if (!$.isArray(this.setContent)) {
					this.setContent = [this.setContent];
				}
				this.setContent.forEach(function(item,i,array){
					if (!(typeof item.date == 'string')) {
						array[i].date = _this.getDayTime(array[i].date).str;
					}
				})
			}
			//初始化dom
			var dom = this.outputDom(_this.startDay,1);
			this.item.append(dom).append('<input type="hidden" class="common-calender-result" val="" />').addClass('common-calendar-container');
			this.resultInput = this.item.find('.common-calender-result'); //结果
			//初始化方法
			var selArr = [this.areaSelect, this.someSelect, this.onlySelect];
			var dayFun = selArr[this.type];
			this.curDay = null;

			//绑定touch事件
			this.item.on('touchstart',function(e){
				var touch=e.touches[0];
				_this.item.startY = touch.screenY;
			})

			this.item.on('touchend','li',function(e){
				var endY = e.changedTouches[0].screenY - _this.item.startY;
				if (Math.abs(endY) > 5) {
					return;
				}
				dayFun.call(_this,this);
			});
			//执行回调
			this.callback && this.callback.call(this, _this.result);

		},
		//区域选择
		areaSelect: function(cur){
			var $cur = $(cur);
			var curTime = $cur.attr('time');
			var curDayTime = this.curDay? this.curDay.attr('time') : null;

			if (!$cur.has('i').length) return;
			//如果选中初始日期，取消全部选中状态
			if (curDayTime && curTime == curDayTime) {
				this.clearActive();
				this.result.splice(0);
				this.curDay = null;
				this.resultInput.val(this.result);
				return;
			}

			switch(this.result.length){
				case 0: this.result.push(curTime);
					this.curDay = $cur;
					$cur.addClass('active');
					this.active.push($cur);
					break;
				case 1: this.result.push(curTime);
					this.result.sort(); //从小到大排列
					this.putArea();
					break;
				case 2: this.result.forEach(function(item,i,array){
					if (item != curDayTime) {
						array.splice(i,1);
					}
				})
					this.result.push(curTime);
					this.result.sort();
					this.putArea();
					break;
			}
			this.resultInput.val(this.result);
		},
		//多选
		someSelect: function(cur){
			var $cur = $(cur);
			var curTime = $cur.attr('time');
			var index = this.result.indexOf(curTime);

			if (index > -1) {
				this.result.splice(index,1);
			}else{
				this.result.push(curTime);
			}
			$cur.toggleClass('active');
			this.resultInput.val(this.result);
		},
		//单选
		onlySelect: function(cur){
			var $cur = $(cur);
			this.clearActive();
			this.active.push($cur);
			this.result.splice(0);
			this.result.push($cur.attr('time'))
			$cur.addClass('active');
			this.resultInput.val(this.result);
		},
		//清除选中区域
		clearActive: function(){
			this.active.forEach(function(item){
				item.removeClass('active');
			})
			this.active.splice(0);
		},
		//渲染选中区域
		putArea: function(){
			var _this = this;
			_this.clearActive();
			this.item.find('li').each(function(){
				if ($(this).attr('time') >= _this.result[0] && $(this).attr('time')<=_this.result[1]) {
					$(this).addClass('active');
					_this.active.push($(this));
				}
			})
		},
		getDayTime: function(obj){
			if (typeof obj == 'string') {
				obj = new Date(obj);
			}
			var arr = [obj.getFullYear(),
				(obj.getMonth() + 1),
				obj.getDate()];

			var str = this.getDayToStr(arr);
			return {
				str:str,
				year:arr[0],
				month:arr[1],
				date:arr[2],
				week:obj.getDay(),
				dateObj:obj
			};
		},
		getDayToStr: function(arr){
			arr.forEach(function(item,i,array){
				item = item+'';
				if (item.length <2) {
					array[i] = '0'+item;
				}
			});
			return arr.join('-');
		},
		outputDom:function(oDate,curPage){
			var year = oDate.year,
				month = oDate.month,
				date = oDate.date,
				firstWeek = oDate.week,
				dayLen = 0;

			//重置首元素星期
			if (date > 1) {
				var firstDay = new Date(year+'-'+month+'-01');
				firstWeek = firstDay.getDay();
			}
			var week = this.showPast? firstWeek : oDate.week;
			week += (this.startWeek > 5? 7:0) - this.startWeek;
			firstWeek += (this.startWeek > 5? 7:0) - this.startWeek;
			month = parseInt(month);
			date = parseInt(date);

			//设置title
			var dateText = (oDate.year == this.today.year && oDate.month == this.today.month) ? parseInt(this.today.date) +'日':'';
			var html = '<h3 class="month">'+year+'年'+month+'月'+dateText+'</h3>';
			html += '<ul>';

			//计算天数
			var laMonth = [1,3,5,7,8,10,12];
			if (month == 2) {
				dayLen = 28;
			}else if(laMonth.indexOf(month)>-1){
				dayLen = 31;
			}else{
				dayLen = 30;
			}
			//1日前空白li
			for (var i = 1; i <= week; i++) {
				html += '<li></li>';
			}
			//正文li
			var endStr = this.endDay ? this.endDay.str : '99999999';
			var j = this.showPast ? 1 : date;
			for (j; j <= dayLen; j++) {
				var txt = j;
				var newDay = this.getDayToStr([year,month,j]);
				this.setContent.forEach(function(item){
					if (item.date == newDay) {
						txt = item.text;
					}
				})
				html += '<li time="'+newDay+'">';
				html += (newDay >= this.startDay.str && newDay <= endStr) ? '<i class="day">'+txt+'</i>' : txt;
				html += '</li>';

				if (!this.showPast && newDay == endStr) {
					break;
				}
			}

			//填充尾部空白li
			var moreDay = dayLen;
			if (!this.showPast && this.endDay && this.page == curPage) {
				moreDay = parseInt(this.endDay.date);
			}

			moreDay = (moreDay + firstWeek)%7;

			if (moreDay != 0) {
				moreDay = 7 - moreDay;
				for (var i = 1; i <= moreDay; i++) {
					html += '<li></li>';
				}
			}

			html += '</ul>';

			//执行page次
			if (this.page > 1 && curPage < this.page) {
				var nextTime = oDate.dateObj.getTime() + (dayLen-date+1)*86400000;
				var nextDate = new Date(nextTime)
				nextDate = this.getDayTime(nextDate);
				html += this.outputDom(nextDate, ++curPage);
			}
			return html;
		}
	}
	return calendar;
}));