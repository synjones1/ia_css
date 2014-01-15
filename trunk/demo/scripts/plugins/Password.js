/*
* @ auth	hdg
* @ email	hdg1988@gmail.com
* @ date	2010-3-18
* desc:密码输入组件，校验确认密码是否正确，校验密码的强度
*
*
*/
(function($){
	var options={
		passwordInput:'',
		checkInput:'',
		strengthInfoText:'',
		strengthInfoBar:'',
		checkInfoText:'',
		mustInput:true,
		verdects:["弱","中","强"],
		colors:["#f00","#ff9933","#3c0"],
		infoBarBackground:'Gray',
		scores:[10,25],
		common:["123456","12345678"],
		minLength:6
	}
	$.fn.password=function(params){
		//1. 获得参数
		$.getOptions(params);
		//2.判断参数是否正确
		if(!$.checkParams()){
			alert("参数不正确");
			return;
		}
		//3.添加必须输入标志
		$.mustInput();
		//4.密码强度事件
		$.passwordStrength();
		//5.核对事件
		$("#"+options.checkInput).bind("keyup",$.checkPassword);
		$("#"+options.passwordInput).bind("keyup",$.checkPassword);
	}
	$.passwordStrength=function(){
		if(document.getElementById(options.passwordInput)==null)
			return;
		$("#"+options.passwordInput).bind("keyup",$.checkStrength);
	}
	$.checkPassword=function(){
		var passwordInput = $("#"+options.passwordInput);
		var checkInfoText = $("#"+options.checkInfoText);
		var passwordInput = $("#"+options.passwordInput);
		var checkInput = $("#"+options.checkInput);
		if(passwordInput.attr("value").length == 0 || checkInput.attr("value").length == 0)
			return false;
		if(passwordInput.attr("value").length<options.minLength){
			checkInfoText.html("密码长度小于最小长度"+options.minLength+"，请重新输入！");
			checkInfoText.addClass("pw_info_error");
			checkInfoText.removeClass("pw_info_right");
			return false;
		}
		if(passwordInput.attr("value")!=checkInput.attr("value") &&options.checkInfoText!=""){
			checkInfoText.html("密码与确认密码不匹配，请重新输入确认密码！");
			checkInput.addClass("input_error");
			checkInfoText.addClass("pw_info_error");
			checkInfoText.removeClass("pw_info_right");
			return false;
		}else{
			checkInfoText.html("");
			checkInfoText.addClass("pw_info_right");
			checkInfoText.removeClass("pw_info_error");
			checkInput.removeClass("input_error");
		}
		return true;
	}
	$.checkStrength=function(){
		var value = $('#'+options.passwordInput).attr("value");
		var score=$.getValue(value);
		//分数怎么和表现关联
		var text=null;
		var color=null;
		var barLength=null;
		if(score<0){
			text="太短啦";
			color="gray";
			barLength='0%';
		}else if(score>=0 && score<options.scores[0]){
			text=options.verdects[0];
			color=options.colors[0];
			barLength='33%';
		}else if(score>=options.scores[0] && score<options.scores[1]){
			text=options.verdects[1];
			color=options.colors[1];
			barLength='66%';
		}else if(score>=options.scores[1]){
			text=options.verdects[2];
			color=options.colors[2];
			barLength='100%';
		}
		if(options.strengthInfoText!="")
			$("#"+options.strengthInfoText).html(text).css({
				color:color
			});
		if(options.strengthInfoBar!="")
			$("#"+options.strengthInfoBar).css({
				width:barLength,
				backgroundColor:color
			});
	}
	$.getValue=function(_value){
		var score = 0;
		var num=$.countCharNum(_value);
		// 如果是普通密码则设置为0
		for(var i=0;i<options.common.length;i++){
			if(_value==options.common[i])
				return 0;
		}
		if(_value.length<options.minLength)
			return -100;
		else
			score+=(_value.length-options.minLength)*2;
		score+=num*2;
		// 有小写字母有数字
		if(_value.match(/[a-z]/) && _value.match(/\d+/)){score+=5}
		// 有大写字母有数字
		if(_value.match(/[A-Z]/) && _value.match(/\d+/)){score+=7}
		// 有小写字母和大写字母
		if(_value.match(/[A-Z]/) && _value.match(/[a-z]/)){score+=7}
		if(_value.match(/[a-z]/) && _value.match(/\d+/) && _value.match(/[A-Z]/)){score+=10}
		// 一个特殊字符
		if(_value.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)){score+=5}
		// 两个以上特殊符号
		if(_value.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){score+=15}
		return score;
	}
	$.countCharNum=function(_value){
		var charValue=[];
		for(var i=0;i<_value.length;i++){
			if(charValue.join().indexOf(_value.charAt(i))!=-1)
				continue;
			charValue.push(_value.charAt(i));
		}
		return charValue.length;
	}
	$.checkParams=function(){
		if(document.getElementById(options.checkInput)==null || 
			document.getElementById(options.passwordInput)==null)
			return false;
		return true;
	}
	$.mustInput=function(){
		if(!options.mustInput)return;
		$("#"+options.passwordInput).after("<span class='mustinput'>&nbsp;*</span>");
		$("#"+options.checkInput).after("<span class='mustinput'>&nbsp;*</span>");
	}
	$.getOptions=function(params){
		for(var property in params){
			options[property]=params[property];
		}
	}
})(jQuery)