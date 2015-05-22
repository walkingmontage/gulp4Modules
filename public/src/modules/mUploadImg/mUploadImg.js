//=========上传图片=============
;(function (root, factory) {
	if (typeof define === 'function' && define.amd){
		define(['zepto'], factory);
	}else{
		factory(Zepto);
	}
}(window, function($) {
	$(function(){

		FastClick.attach(document.body);//防止“点透”

		var uploadMark = $('[role="upload-img"]');
		if(uploadMark.length == 0) return false;

		$('[role="upload-img"]').delegate('img,i','click',function(e){
			e.stopPropagation();
			var wrapper = $(this).parents('[role="upload-img"]');
			var default_img_url = wrapper.attr('default-img-url');
			if($(this).hasClass('img-preview') && !wrapper.hasClass('has-img')){
				//alert(1)
				var ops = $.showOptions({option:['相册','拍照'],value:['openAlbum','openCamera']});
				ops.eq(0).attr('_imgid',$(this).attr('id'));
				ops.eq(1).attr('_imgid',$(this).attr('id'));
			}else if($(this).hasClass('icon-del-img') && $(this).attr('role') === 'del-upload-img'){
				var id = $(this).attr('_for');
				var delImg = wrapper.find('#'+id);
				delImg.attr('src',default_img_url);
				wrapper.removeClass('has-img').find('input[name="'+id+'"]').val('');
			}
		})
	})
}));