//=========时间选择控件=============
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto', 'mHistory'], factory);
	}else{
		factory(Zepto, root.mHistory);
	}
}(window, function($, mHistory) {
	$(function(){
		var trigger = $('[role="show-datepicker"]');
		if(!trigger.length) return false;
		var html = '<div class="momo-mobile-datepicker" id="mobileDatePicker" role="momo-mobile-datepicker">'+
			'<a class="btn common-blue-btn save-date-picker" id="saveDatePicker">确定</a>'+
			'<div class="time-select-box">'+
			'<section class="year-box">'+
			'<a class="icon-time-btn"><i class="icon icon-point-up" data-time-type="y+"></i></a>'+
			'<input id="input-year" value="" readonly>'+
			'<a class="icon-time-btn"><i class="icon icon-point-down" data-time-type="y-"></i></a>'+
			'<span class="unit">年</span>'+
			'</section>'+
			'<section class="month-box">'+
			'<a class="icon-time-btn"><i class="icon icon-point-up" data-time-type="m+"></i></a>'+
			'<input id="input-month" value="" readonly>'+
			'<a class="icon-time-btn"><i class="icon icon-point-down" data-time-type="m-"></i></a>'+
			'<span class="unit">月</span>'+
			'</section>'+
			'<section class="day-box">'+
			'<a class="icon-time-btn"><i class="icon icon-point-up" data-time-type="d+"></i></a>'+
			'<input id="input-date"  value="" readonly>'+
			'<a class="icon-time-btn"><i class="icon icon-point-down" data-time-type="d-"></i></a>'+
			'<span class="unit">日</span>'+
			'</section>'+
			'<input type="hidden" id="datepicker-form-data" name="" value="">'+
			'</div></div>';
		$('body').append($(html));

		var datePicker = $('[role="momo-mobile-datepicker"]');
		var $input = $('#datepicker-form-data');

		//初始化
		var oTime = new Date();
		if(!oTime){
			console.log('init time error');
			return false;
		}
		var $y = $('#input-year').prop('value', oTime.getFullYear());
		var $m = $('#input-month').prop('value', oTime.getMonth() + 1);
		var $d = $('#input-date').prop('value', oTime.getDate());
		$input.prop('value',$y.val()+'-'+$m.val()+'-'+$d.val());

		datePicker.delegate('.icon-time-btn','click',function(e){
			var type= $(e.target).attr('data-time-type');
			switch(type){
				case 'y+':
					oTime.setFullYear(oTime.getFullYear() + 1);
					break;
				case 'y-':
					oTime.setFullYear(oTime.getFullYear() - 1);
					break;
				case 'm+':
					oTime.setMonth(oTime.getMonth() + 1);
					break;
				case 'm-':
					oTime.setMonth(oTime.getMonth() - 1);
					break;
				case 'd+':
					oTime.setDate(oTime.getDate() + 1);
					break;
				case 'd-':
					oTime.setDate(oTime.getDate() - 1);
					break;
			}
			var year = oTime.getFullYear();
			var month = oTime.getMonth() + 1;
			var date = oTime.getDate();
			$y.prop('value',year);
			$m.prop('value',month);
			$d.prop('value',date);
			$input.prop('value',year+'-'+month+'-'+date);
		});

		//显示时间控件
		trigger.on('click',function(e){
			var src = $(this).attr('_for');
			if(datePicker.hasClass('up')){
				datePicker.css('bottom','-100%').removeClass('up');
				history.go(-1);
			}else{
				datePicker.attr('_from',src);
				datePicker.css('bottom','0').addClass('up');
				mHistory.addState({pop:1});
				history.pushState({pop:1},null,null);
			}
		});

		//选择时间后点击确定
		datePicker.delegate('#saveDatePicker','click',function(){
			var src = datePicker.attr('_from');
			var input = $('input#'+src);
			var showBox = $('[show-time="'+src+'"]');
			var val = $input.val();
			datePicker.css('bottom','-100%');
			datePicker.removeClass('up');
			history.go(-1);
			if(val != ''){
				input.val($input.val());
				showBox.html($input.val());
			}
		});
	});
}));