$.slideSelect = function(box1,box2){
	box1.css('left','-100%');
	box2.css('left','0');
	mHistory.addState({pop:1});
	history.pushState({pop:1},null,null);
}

$.slideSelectBack = function(box1,box2,box3,box4){
	box1.css('left','0');
	box2.css('left','100%');
	if(box3){
		box3.css('left','100%');
	}
	if(box4){
		box4.css('left','100%');
	}
	history.go(-1);
}