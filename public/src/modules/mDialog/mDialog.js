;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['mHistory'], function(mh){
			factory(mh)
		});
	}else{
		factory(root.mHistory);
	}
}(window, function(mHistory) {
	$.popPosition = function(popWin) {
		var scrollH = $('body').scrollTop() || $('html').scrollTop();
		//var winX = $(window).width();
		//var winY = $(window).height();
		var winX = document.documentElement.clientWidth;
		var winY = window.innerHeight || document.documentElement.clientHeight;

		var popY = popWin.height();
		var popX = popWin.width();

		var top = (winY - popY)/2 + scrollH;
		var left = (winX - popX)/2;
		popWin.css({top:top + 'px',left:left + 'px',marginTop:'-10px'});
	}


	$.showTip = function(msg) {
		var pop = $('#commonTipBox');
//                var y = window.scrollY;
//                window.scroll(0,y);
		if(pop.length > 0){
			pop.html(msg).css('display','block');
		}else{
			pop = $('<div id="commonTipBox" class="common-tip-shadow">'+msg+'</div>');
			$('body').append(pop);
		}
		$.popPosition(pop);
		setTimeout(function(){
			pop.css('display','none');
		},2000);
	}


	$.hidePopUp = function() {
		var pop = $('.common-popup'),
			bottomPop = $('.common-bottom-popup');
		var wrapper = $('#transWrapper');
		if(bottomPop.length){
			bottomPop.css('bottom','-'+bottomPop.height()+'px');
		}
		if(wrapper.length > 0){
			wrapper.remove();
		}
		if(pop){
			pop.remove();
		}
	}

	$.showLoading = function() {
		var pop = $('#loadingWrapper');
//                var y = window.scrollY;
//                window.scroll(0,y);
		if(pop.length > 0){
			pop.css('display','block');
		}else{
			pop = $('<div id="loadingWrapper" class="common-loading"><img src="http://www.immomo.com/static/a2/img/loading.gif" /></div>');
			$('body').append(pop);
		}
		$.popPosition(pop);
	}

	$.hideLoading = function() {
		var pop = $('#loadingWrapper');
		pop.css('display','none');
	}
	$.showWrapper = function(callback){
		var wrapper = $('#transWrapper');
		var _H = $(document).height();
		var winH = window.screen.height;
		//var winH = $(window).height();
		//alert(window.screen.height+','+window.screen.availHeight+','+$(window).height()+','+window.innerHeight+','+document.documentElement.clientHeight+','+document.body.clientHeight)
		if(_H < winH) _H = winH;
		if(!wrapper.length){
			wrapper = $('<div id="transWrapper" class="normal-pop-wrapper"></div>');
			$('body').append(wrapper);
		}else{
			wrapper.css('display','block');
		}
		wrapper.css('height',_H + 'px');

		wrapper.on('click',function(){
			$.hidePopUp();
			history.go(-1);
			if (callback && typeof callback == 'function'){ callback()}
		});
	}

	//底部选择列表
	$.bottomSelect = function(){
		if(!arguments.length) return false;
		var obj = arguments[0];

		var til,btn,html = '',
			option = obj.option || '',
			val = obj.value || option,
			type = obj.type || 1,
			popClass = obj.popClass || '',
			pop = $('.common-bottom-popup');
		obj.title == 0 ? til = obj.title : til = obj.title || '请选择';
		obj.btn == 0 ? btn = obj.btn : btn = obj.btn || '取消';
		til == 0 ? html = '<ul>' : html = '<ul><li class="common-bottom-popup-title">'+til+'</li>';
		for(var i = 0;i < option.length;i++){
			html += '<li class="common-bottom-popup-option" data-value="'+ val[i] +'">' + option[i] + '</li>';
		}
		til == 0 ? html += '</ul>' : html += '</ul><div class="common-bottom-popup-cancel-btn">'+ btn +'</div>';

		if(pop.length > 0){
			pop.html(html).attr('id','bottomSelectListPop').addClass(popClass);
		}else{
			pop = $('<div id="bottomSelectListPop" class="common-bottom-popup '+ popClass +'">'+html+'</div>');
			$('body').append(pop);
		}

		$.showWrapper(obj.finish);
		pop.css('bottom','0');
		mHistory.addState({pop:1});
		history.pushState({pop:1},null,null);

		$('#bottomSelectListPop .common-bottom-popup-option').on('click',function(){
			var $this = $(this);
			var val = $this.attr('data-value'),
				option = $this.html();

			$.hidePopUp();
			history.go(-1);

			if(val === 'openAlbum'){
				if (typeof window.MomoBridge == 'object')  {
					MomoBridge.ready(function(BRG){
						BRG.invoke('readImage', {
							//id: 'imgPreview_0',
							id:$this.attr('_imgid'),
							method:1,
							type:'base64'
						},function(id,data,size,type){
							if(!data) return false;
							$('#'+id)[0].src="data:image/jpeg;base64,"+data;
							var src = $('#'+id)[0].src;
							if(window.setImageCallback) setImageCallback(id,src,data);

						})
					})
				} else {
					momo_btn_controller.controller_init_callback=function(){
						momo_btn_controller.readImage(JSON.stringify({
							//id: 'imgPreview_0',
							id:$this.attr('_imgid'),
							method:1,
							type:'base64'
						}));
					};
					momo_btn_controller.momo_btn_controller_init();
				}
			}else if(val === 'openCamera'){
				if (typeof window.MomoBridge == 'object')  {
					MomoBridge.ready(function(BRG){
						BRG.invoke('readImage', {
							//id: 'imgPreview_0',
							id:$this.attr('_imgid'),
							method:2,
							type:'base64'
						},function(id,data,size,type){
							if(!data) return false;
							$('#'+id)[0].src="data:image/jpeg;base64,"+data;
							var src = $('#'+id)[0].src;
							if(window.setImageCallback) setImageCallback(id,src,data);

						})
					})
				} else {
					momo_btn_controller.controller_init_callback=function(){
						momo_btn_controller.readImage(JSON.stringify({
							//id: 'imgPreview_0',
							id:$this.attr('_imgid'),
							method:2,
							type:'base64'
						}));
					};
					momo_btn_controller.momo_btn_controller_init();
				}
			} else {
				if(typeof obj.callback === 'function'){
					switch(type){
						case 1:
							obj.callback(val);
							break;
						case 2:
							obj.callback(option);
							break;
						case 3:
							obj.callback(val,option);
							break;
					}
				}
			}

			if(typeof obj.finish === 'function'){obj.finish();}

		})

		pop.find('.common-bottom-popup-cancel-btn').on('click',function(){
			$.hidePopUp();
			history.go(-1);
			if(typeof obj.cancel === 'function'){obj.cancel();}
		})



		return pop.find('.common-bottom-popup-option');

	}


	//类confirm弹窗
	$.confirm = function(){
		if(!arguments.length) return false;
		var obj = arguments[0];

		var b1 = obj.btn1 || '取消';
		var b2 = obj.btn2 || '确定';
		var tit = obj.title || '提示';
		var popClass = obj.popClass || '';
		var pop = $('.common-popup');

		var html = '<div class="title">'+tit+'</div><div class="content">'+obj.content+'</div>';
		html += '<div class="btns mt55 clearfix"><div class="panel-col-50"><a class="btn metrobtn btn1 confirm-btn-left">'+b1+'</a></div><div class="panel-col-50"><a class="btn metrobtn last btn2 confirm-btn-right" ">'+b2+'</a></div></div>';


		setTimeout(function(){
			if(pop.length > 0){
				pop.html(html).attr('id','confirmPop').css('display','block');
			}else{
				pop = $('<div id="confirmPop" class="common-popup '+ popClass +'">'+html+'</div>');
				$('body').append(pop);
			}
			$.showWrapper(obj.finish);
			$.popPosition(pop);

			console.log('add')
			console.log(mHistory.state)
			mHistory.addState({pop:1});
			history.pushState({pop:1},null,null);

			$('#confirmPop .confirm-btn-right').on('click',function(){
				var $this = $(this);
				history.go(-1);
				if(typeof obj.callback === 'function'){obj.callback.call($this);}
				if(typeof obj.success === 'function'){obj.success.call($this);}
				if(typeof obj.finish === 'function'){obj.finish();}
				$.hidePopUp();
			});
			$('#confirmPop .confirm-btn-left').on('click',function(){
				var $this = $(this);
				history.go(-1);
				if(typeof obj.callback2 === 'function'){obj.callback2.call($this);}
				if(typeof obj.fail === 'function'){obj.fail.call($this);}
				if(typeof obj.finish === 'function'){obj.finish();}
				$.hidePopUp();
			});
		},200)


	}

	//类alert弹窗
	$.alert = function(){
		if(!arguments.length) return false;
		var obj = arguments[0];

		var b = obj.btn || '确定';
		var til = obj.title || '提示';
		var popClass = obj.popClass || '';
		var pop = $('.common-popup');
		var html = '<div class="title">'+til+'</div><div class="content">'+obj.content+'</div>';
		html+= '<div class="btns mt55"><a href="javascript:;" class="btn metrobtn only close-alert-pop">'+b+'</a></div>';

		setTimeout(function(){
			if(pop.length > 0){
				pop.html(html).attr('id','alertPop').css('display','block');
			}else{
				pop = $('<div id="alertPop" class="common-popup '+ popClass +'">'+html+'</div>');
				$('body').append(pop);
			}
			$.showWrapper(obj.finish);
			$.popPosition(pop);
			mHistory.addState({pop:1});
			history.pushState({pop:1},null,null);

			$('#alertPop .close-alert-pop').on('click',function(){
				var $this = $(this);
				history.go(-1);
				if(typeof obj.callback === 'function'){obj.callback.call($this);}
				if(typeof obj.finish === 'function'){obj.finish();}
				$.hidePopUp();
			});
		},200)
	}
}));