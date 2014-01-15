/*********************
	Add By 2013/03/28 
*********************/

$(function() {
//Datagrid 高度控制
	$(".datagrid-wrap").height($(document).height() - 110);

/* 载入初始化 */
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	$("#nav").load("nav.html",NavEvent);
	$(window).load(fixheight);
	$(window).resize(fixheight);

/* 所有系统 */
$("a.popup-system,.popup-categories").hover(function(){
		$(this).parent("li").addClass("hover");
	},function(){
		$(this).parent("li").removeClass("hover");
	})
$(".popup-system").each(function(i,k){
	$(k).powerFloat({
		edgeAdjust:false,
		position:"5-7",
		width:"440",
		showCall:function(){
			$(".mycategories .viewport").css("height","226px");
			$('.mycategories .scrollpanel').tinyscrollbar({sizethumb:20,size:210,wheel:40})
		}
	});
})
/* 我的分类 */
$(".popup-categories").each(function(i,k){
	$(k).powerFloat({
		edgeAdjust:false,
		position:"5-7",
		width:"160",
		showCall:function(){
			$(".mycategories .viewport").css("height","226px");
			$('.mycategories .scrollpanel').tinyscrollbar({sizethumb:20,size:210,wheel:40})
		}
	});
})
	
})

/* 加载 */
function loader(val){
	var LoaderHtml = '<div class="loader"><em class="l"></em><div class="transdiv"></div><img src="themes/default/images/loader.gif" class="ico-loading" alt="'+val+'" /><span>'+val+'...</span><em class="r"></em></div>';
	return LoaderHtml;
}

/* 内容区域高度控制 */
	function fixheight(){
		if($(window).height() < 664){
			$(".fixheight").css("height","510px");
		}else{
			$(".fixheight").css("height",$(window).height()-$("#header").height()-$("#footer").height()-$("#nav").height()-12);
		}
	}

/* 主导航效果 */
function NavEvent(){
	$(".has-children").hover(function(){
		$('body').append("<div id='maskbody' style='position:absolute;background:transparent url(themes/default/images/blank.gif);width:100%;height:"+ $(window).height() +"px;top:0;left:0;z-index:8'></div>");
		$(this).children(".children-a").addClass("parent-active").next(".sub-menu").css('min-height',$(this).parent().parent().height()).show();
		$(".panel").each(function (){
			if($(this).find(".datebox-calendar-inner").length > 0){
				$(this).hide();
			}
		});
	},function(){
		$("#maskbody").remove();
		$(this).children(".children-a").removeClass("parent-active").next(".sub-menu").hide();
	})
	$(".sub-menu ol").each(function(i,k){
		$(k).children("li:first").addClass("first");
		$(k).children("li:last").addClass('last');
	})
		
	SystemType(".sub-menu-box","#mainbox","#content")
}

/* 滚动区域 */
function fixScrollHeight(){
	if($(window).height() < 664){
		$(".viewport").css("height","406px");
	}else{
		$(".viewport").css("height",$(window).height()-$("#header").height()-$("#footer").height()-$("#nav").height()-$(".system-type").height()-4);
	}
}

/* 滚动条 */
function Itemscroll(){
	$('.scrollpanel').tinyscrollbar({sizethumb:20,size: $(".viewport").height()-18,wheel:40})
}

/* 系统鼠标经过效果 */
function ItemHover(){
	$('.system-item').find("a").hover(function(){
		$(this).parent("li").addClass("hover");
	},function(){
		$(this).parent("li").removeClass("hover");
	})
}

/*系统分类*/
function SystemType(itemAction,loadObj,fn){
	$(itemAction).find("a.loadPage").each(function (i,k){
		$(k).mouseover(function(){
			$(k).parent("li").addClass("hover");
		}).mouseout(function(){
			$(this).parent("li.li-type").removeClass("hover");
		})
		$(k).click(
			function(){
				$(itemAction+" li").removeClass("hover").addClass("li-type");
				$(this).parent("li").removeClass("li-type").addClass("hover");
				
				new Dialog(loader(LoadingText),{
					time:1000,
					showTitle:false,
					afterClose:function(){
						$(loadObj).load($(k).attr("href"),function(){fixScrollHeight();ItemHover();Itemscroll();})
						if(fn){
							$(fn).removeClass().height("auto");
						}
					}
				})
				.show();
			return false
			}
		);
	});
}