
//smoothScroll ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
function smoothScroll(hash){
  var defaults = {
    EASING : 'easeInOutCubic',	//easeInOutQuad
    SPEED : 2000
  }
  if(hash){
    smoothScrollAction(hash);
    return false;
  }else{
    $('a[href="#"],area[href="#"]').click(function(){
      $('html,body').stop(false).animate({scrollTop: 0},defaults.SPEED,defaults.EASING);
      return false;
    });
    $('a[href^="#"],area[href^="#"]').each(function(){
      var hash = $(this).attr('href');
      if(hash.match(/^#./)){
        $(this).click(function(){
          if($(hash).size() > 0){
            smoothScrollAction(hash);
          }
          return false;
        });
      }
    });
  }
  function smoothScrollAction(hash){
    var endPos = Math.round($(hash).offset().top);
    if(endPos != $(window).scrollTop()){
      $('html,body').stop(false).animate({scrollTop: endPos},defaults.SPEED,defaults.EASING);
    }
  }
}

function smartPhoneSize(w){
	var portraitWidth,landscapeWidth;
	$(window).bind("resize", function(){
		if(Math.abs(window.orientation) === 0){
			if(/Android/.test(window.navigator.userAgent)){
				if(!portraitWidth)portraitWidth=$(window).width();
			}else{
				portraitWidth=$(window).width();
			}
			$("html").css("zoom" , portraitWidth/w );
		}else{
			if(/Android/.test(window.navigator.userAgent)){
				if(!landscapeWidth)landscapeWidth=$(window).width();
			}else{
				landscapeWidth=$(window).width();
			}
			$("html").css("zoom" , landscapeWidth/w );
		}
	}).trigger("resize");
}
//smartRollover ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
function smartRollover(){
  $('[src*="_off."]').mouseover(function(){
    $(this).attr("src",$(this).attr("src").replace(/^(.+)_off(\.[a-z]+)$/,"$1_on$2"));
  }).mouseout(function(){
    $(this).attr("src",$(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/,"$1_off$2"));
  }).each(function(init){
    $("<img>").attr("src",$(this).attr("src").replace(/^(.+)_off(\.[a-z]+)$/,"$1_on$2"));
  })
}

function $$(string,flag){

  if(!$('#debug').size()){

    $('body').append('<textarea id="debug" cols="30" rows="50" style="width: 200px; height: 200px; position: fixed; top: 250px; left: 10px; filter: alpha(opacity=30); -moz-opacity:0.3; opacity:0.3; display: block; z-index: 9999;"></textarea>');

  }

  if(flag){

    $('#debug').val($('#debug').val()+'\n'+string);

  }else{

    $('#debug').val(string);

  }

}
//scrollToY ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
function scrollToY(sct,offset){
	if(!offset){
		offset=0;
	}
	var tosc=$("#"+sct).offset().top + offset;
	$('html,body').stop(false).animate({scrollTop: tosc},2000,'easeInOutQuad');
}
//getPageSize ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
function ___getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth; 
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = xScroll;		
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
};



