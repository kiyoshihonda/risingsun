/*
-----------------------------------------------------------------
-----------------------------------------------------------------
risingSun 0.8beta  	jQuery plugin
written by Kiyoshi Honda

Copyright (c) 2015 Kiyoshi Honda (http://hondakiyoshi.com/risingsun )
Released under the MIT license
http://opensource.org/licenses/mit-license.php

Built for jQuery library
http://jquery.com
-----------------------------------------------------------------
-----------------------------------------------------------------
*/

(function($){
$.fn.RisingSun = function(options){
	initScrollAnime();
	this.each(function(i,elem) {
		var $this = $(elem);
		var Default={
			mode:"school",timer:-1,animetime:500,x:0,y:0,scale:1.0,ease:"linear",startPosition:0.5,wipe:false,fadeStart:0,fadeEnd:1.0,popanime:false,onWakeup:function(){},onComplete: function(){},replay:true,onReplay: function(){}
		};
		var s = $.extend(Default, options);
		if(s.timer==-1){
			_setScrollObj($this,s.animetime,s.x,s.y,s.scale,s.ease,s.startPosition,s.wipe,s.fadeStart,s.fadeEnd,-9999,s.popanime,s.onWakeup,s.onComplete,s.replay,s.onReplay);
		}else{
			_setTimerObj(s.timer,$this,s.animetime,s.x,s.y,s.scale,s.ease,s.wipe,s.fadeStart,s.fadeEnd,s.popanime,s.onWakeup,s.onComplete,false/*replay*/,s.onReplay);
		}
	});
};
})(jQuery);

var scrObj= new Array();
var _startScrollFlag=false;
function initScrollAnime(){
	$(window).scroll(changeScrollAnimeLoop);
	if(!_startScrollFlag){
		if( !pluginExists( "easing" ) ){
			alert("RisingSun needs jquery easing plug-In");
		}
		_startScrollFlag=true;$(window).scroll(changeScrollAnimeLoop);
	}
}
function changeScrollAnimeLoop(){
	scr=$(window).scrollTop();
	wh=$(window).height();
	scrollObj();
}
//--------------------------------------------------------------Scroll Obj

function setRSscrollObj(obj,setting){
	var scrollObjDefault={
	animetime:500,x:0,y:0,scale:1.0,ease:"linear",startPosition:0.5,wipe:false,fadeStart:0,fadeEnd:1.0,popanime:false,onWakeup:function(){},onComplete: function(){},replay:false,onReplay: function(){}
	};
	var s = $.extend(scrollObjDefault, setting);
	_setScrollObj(obj,s.animetime,s.x,s.y,s.scale,s.ease,s.startPosition,s.wipe,s.fadeStart,s.fadeEnd,-9999,s.popanime,s.onWakeup,s.onComplete,s.replay,s.onReplay);
}
//--------------------------------------------------------------TimerObj

function setRStimerObj(obj,setting){
	var timerObjDefault={
	timer:0,animetime:500,x:0,y:0,scale:1.0,ease:"linear",startPosition:0.5,wipe:false,fadeStart:0,fadeEnd:1.0,popanime:false,onWakeup:function(){},onComplete: function(){},replay:false,onReplay: function(){}
};
	var s = $.extend(timerObjDefault, setting);
	_setTimerObj(s.timer,obj,s.animetime,s.x,s.y,s.scale,s.ease,s.wipe,s.fadeStart,s.fadeEnd,s.popanime,s.onWakeup,s.onComplete,s.replay,s.onReplay);
}
//-----------------------------------------------------------------------------
function _setTimerObj(timer,obj,animetime,left,top,scale,ease,wipe,fadeStart,fadeEnd,popanime,onWakeup,onComplete,onReplay){
	if(timer<=0){timer=1;}
	_setScrollObj(obj,animetime,left,top,scale,ease,0,wipe,fadeStart,fadeEnd,timer,popanime,onWakeup,onComplete,onReplay);
}
function _setScrollObj(obj,animetime,left,top,scale,ease,startPosition,wipe,fadestart,fadeend,autostart,popanime,onWakeup,onComplete,replay,onReplay){
	var as = autostart || -9999;

	if(popanime==true){popanime=1.1;}
	if(obj.css("display")=="none"){
		obj.css("opacity",0);
		obj.css("display","block");
	}
	scrObj.push( { obj:obj,animetime:animetime,positionLeft:obj.position().left,positionTop:obj.position().top,top:top,left:left,scale:scale,ease:ease,oiginaltop:(obj.offset().top),oiginalleft:obj.offset().left,pos:obj.position(),done:false,width:obj.width(),height:obj.height(),startPosition:startPosition,fadeStart:fadestart,fadeEnd:fadeend,wipe:wipe,autostart:as,popanime:popanime,onWakeup:onWakeup,onComplete:onComplete,replay:replay,onReplay:onReplay} );
	resetObject(scrObj[scrObj.length-1]);
}
var timerOver = function(e) {
   animeObjStart(this);
};
function resetObject(obj){
	ratio = obj.height / obj.width;
	sw=obj.width*obj.scale;
	sh=obj.width*ratio*obj.scale;
	//if(obj.obj.css("position")=="static"){obj.obj.css("position","absolute");};
	obj.obj.css("left",Number(obj.positionLeft+obj.left- ((sw-obj.width )>>1) ));
	obj.obj.css("top",Number(obj.positionTop+obj.top- ((sh-obj.height )>>1) ));

	if(obj.wipe=="LR"){
		obj.obj.wrapInner("<div style='width:"+(obj.width+1)+"px;'></div>");
		obj.obj.css("width",0);
		obj.obj.css("overflow","hidden");
	}else if(obj.wipe=="TB"){
		obj.obj.css("height",0);
		obj.obj.css("overflow","hidden");
	}else{
		obj.obj.find("img").each(function (i) {
			if($(this).css("width").match(/[%]/)!="%"){
			imgw=$(this).css("width").match(/[0-9]+/);
			imgh=$(this).css("height").match(/[0-9]+/);
			$(this).css("width",100*imgw/obj.width+"%");
			$(this).css("height",100*imgh/obj.height+"%");
			}

		}); 
		obj.obj.css("width",sw);
		obj.obj.css("height",sh);
	}
	obj.obj.css("opacity",obj.fadeStart);
	obj.done=false;
	if(obj.autostart!=-9999){
		obj.done=true;
		setTimeout(timerOver.bind(obj, ''), obj.autostart);
	}
}
function scrollObj(){
	for(var i=0;i<scrObj.length;i++){
		if(scrObj[i].done==false ){
			if(scr > Number(scrObj[i].oiginaltop-wh*scrObj[i].startPosition + scrObj[i].height/2 ) ){
				animeObjStart(scrObj[i]);
			}
		}else if(scrObj[i].replay){
			if(scr+wh < Number(scrObj[i].oiginaltop ) ){
				resetObject(scrObj[i]);
				scrObj[i].onReplay();
			}
		}else{
			scrObj.splice(i, 1);
			i--;
		}
	}
}
function animeObjStart(obj) {
	obj.done=true;
	obj.onWakeup();
	if(!obj.popanime){
		obj.obj.stop(false).animate(
		{
			opacity: obj.fadeEnd,
			left:obj.pos.left,
			top:obj.pos.top,
			width: obj.width,
			height: obj.height
		},
		{'complete': endAnime.bind(obj, ''),
		'duration':obj.animetime,'easing':obj.ease});
	}else{
		obj.obj.stop(false).animate(
		{
			opacity: obj.fadeEnd,
			left:obj.pos.left-((obj.width*obj.popanime-obj.width)>>1),
			top:obj.pos.top-((obj.height*obj.popanime-obj.height)>>1),
			width: obj.width*obj.popanime,
			height: obj.height*obj.popanime
		},
		{'complete': endPopanime.bind(obj, ''),
		'duration':obj.animetime*0.7,'easing':obj.ease});
	}
}
var endAnime= function(e) {
	this.onComplete();
}
var endPopanime= function(e) {
	this.obj.stop(false).animate(
	{
		opacity: this.fadeEnd,
		left:this.pos.left,
		top:this.pos.top,
		width: this.width,
		height: this.height
	},
	this.animetime*0.3,'easeOutCubic');
	this.onComplete();
};
function pluginExists( pluginName ){
	return [pluginName] || $.fn[pluginName] ? true : false;
}
