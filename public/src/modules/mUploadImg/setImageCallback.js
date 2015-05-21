window.setImageCallback = function(id,src,data){
	var _this = $('#'+id);
	var box = _this.parent();
	var str = box.attr('default-img-url');
	if(src.indexOf(str) >= 0) return false;
//    var delIcon = box.find('.icon-del-img');
//    delIcon.css('display','block');
	box.addClass('has-img');
	$('input[name="'+id+'"]').val(data);
//    $('input[name="'+id+'"]').val('1');
};