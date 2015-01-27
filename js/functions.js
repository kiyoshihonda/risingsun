var MINWIDTH=980;
var MINHEIGHT=600;
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― ready
$(document).ready(function(){

	smoothScroll();
	function resizeContainer(e) {
		resizeWin();
	}
	$(window).bind("resize", resizeContainer);
	resizeWin();
	$(window).scroll(changeScroll);

	//window.onload = function(){
		$("h1").RisingSun({
			timer:300,animetime:300,scale:0.1,popanime:true,ease:"easeOutCubic"
		});
		$("#sun").RisingSun({
			timer:550,y:20,animetime:400,ease:"easeOutCubic"
		});
		$("h4").RisingSun({
			timer:800,wipe:"LR",animetime:500,ease:"linear"
		});
		$("#dot").RisingSun({
			timer:700,animetime:300,scale:3.0,fadeIn:1.0,ease:"easeOutCubic"
		});
		$("#auther").RisingSun({
			timer:1500,animetime:300,fadeIn:1.0,ease:"easeOutCubic"
		});
		$("#download").RisingSun({
			timer:1300,wipe:"TB",animetime:300,ease:"easeOutCubic"
		});
		$("#down").RisingSun({
			timer:1500,animetime:300,ease:"easeOutCubic"
		});
		$("#fadein").RisingSun({animetime:300,startPosition:0.65});
		$("#scalein").RisingSun({animetime:500,scale:0.1,ease:"easeInCubic",startPosition:0.6});
		$("#movein").RisingSun({animetime:800,x:50,y:100,ease:"easeOutCubic",startPosition:0.55});
		$("#popin").RisingSun({
			animetime:300,scale:0.1,popanime:true,ease:"easeOutCubic"
		});
		$("#wipein").RisingSun({
			animetime:1200,wipe:"LR",ease:"easeInOutCubic",startPosition:0.6
		});
		$("#timerclick").RisingSun({
			animetime:300,scale:0.1,popanime:true,startPosition:0.7,ease:"easeOutCubic"
		});

		$("#sceneHowto h2").RisingSun({
			animetime:900,wipe:"LR",startPosition:0.7,ease:"easeOutCubic"
		});
		$("#scene1 h2").RisingSun({
			animetime:900,wipe:"LR",startPosition:0.7,ease:"easeOutCubic"
		});
		$("#scene2 h2").RisingSun({
			animetime:900,wipe:"LR",startPosition:0.7,ease:"easeOutCubic"
		});
		$("#reference h2").RisingSun({
			animetime:900,wipe:"LR",startPosition:0.7,ease:"easeOutCubic"
		});
		$(".textbox").RisingSun({
			animetime:400,startPosition:0.7,wipe:"LR"
		});
		
	//}
});
function clickTimer(){
	$("#timerclick").fadeOut(100);
	$("#timer").RisingSun({
		timer:1500,animetime:300,scale:0.1,popanime:true,startPosition:0.7,ease:"easeOutCubic",
		onComplete:function(){
			$("#callback1").RisingSun({timer:0,animetime:300,scale:0.1,popanime:true,ease:"easeOutCubic"});
			$("#callback2").RisingSun({timer:100,animetime:300,scale:0.1,popanime:true,ease:"easeOutCubic"});
			$("#callback3").RisingSun({timer:200,animetime:300,scale:0.1,popanime:true,ease:"easeOutCubic"});
		}
	});
}
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― resize
function resizeWin(){
	w=$(window).width()
	h=$(window).height()
	STwidth=(w>MINWIDTH)?w:MINWIDTH;	
	STheight=(h>MINHEIGHT)?h:MINHEIGHT;
	$("#topArea").height(STheight);
	$("#down").css("top",STheight-50);
}
function changeScroll(){
	scr=$(window).scrollTop();
	wh=$(window).height();
	if(scr>0){
		$("#down").fadeOut(300);
	}else{
		$("#down").fadeIn(300);
	}
}

