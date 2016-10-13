
$(function() {
	
	//轮播图插件的调用
	$(".myplug").xcarousel({
		type: "fade",
		width: 1263,
		height: 400,
		buttons: false,
		stopPlay: true
	});
	

	var topvebanner = $("#topve-banner");
	//	//生成分级菜单
	//	$.ajax({
	//		url: "json/index_list.json",
	//		success: function(res) {
	//			//遍历一级菜单
	//			$.each(res, function(idx, ele) {
	//				var $list = $("<div/>").addClass("list");
	//				var $dl = $("<dl/>").html("<dt>" + ele.title + "</dt>");
	//				$.each(ele.option, function(idx, ele) {
	//					if(ele.red) {
	//						$("<dd/>").html(ele.cont).addClass("LETTER-RED").appendTo($dl);
	//					} else {
	//						$("<dd/>").html(ele.cont).appendTo($dl);
	//					}
	//				});
	//
	//				//二级菜单
	//				$.each(ele.secondOption, function(idx, ele) {
	//					var $twoList = $("<div/>").addClass("two-list");
	//					var $dl2 = $("<dl/>");
	//					$("<dt/>").html(ele.title).appendTo($dl2);
	//					var $s_list = $("<div/>").addClass("s-list");
	//					$.each(ele.cont, function(idx, ele) {
	//						$("<dd/>").html(ele.cont).appendTo($s_list);
	//					});
	//					$dl2.append($s_list);
	//					$("<div/>").attr("id", "clear").appendTo($dl2);
	//					$dl2.appendTo($twoList);
	//					$twoList.appendTo($dl);
	//				});
	//				$("<div/>").attr("id", "clear").appendTo($dl);
	//				$list.append($dl).appendTo(topvebanner);
	//			});
	//		}
	//	});

	//移动激活二级菜单
	$(".list").hover(function() {
		console.log(1111);
		$(this).css("background", "white").find(".two-list").css("display", "block")
	}, function() {
		$(this).css("background", "rgb(248,248,248)").find(".two-list").css("display", "none")
	})

	//	topvebanner.on("mouseenter", ".list", function() {
	//		$(this).css("background", "white").find(".two-list").css("display", "block")
	//	}).on("mouseleave", ".list", function() {
	//		$(this).css("background", "rgb(248,248,248)").find(".two-list").css("display", "none")
	//	});
	
	
	//加载底下的商品
	$.ajax({
		url: "json/index.json",
		success: function(res) {
			var $flashsale = $(".flash-sale");
			$.each(res, function(idx, ele) {
				var $salegoods = $("<div/>").addClass("sale-goods");
				var $countdown = $("<div/>").addClass("count-down").html("<p class=count-head>剩余<span class=hour>18</span>小时<span class=minute>35</span>分<span class=second>14</span>秒</p>");
				$("<img/>").attr("src", ele.imgURL).appendTo($countdown);
				$("<h4/>").html(ele.title).appendTo($countdown);
				$countdown.appendTo($salegoods);
				$("<div/>").addClass("push").html("<span>￥" + ele.price + "</span>").appendTo($salegoods);
				$("<div/>").addClass("alreadybuy").html("<span>" + ele.buy + "</span>人已购买").appendTo($salegoods);
				$salegoods.appendTo($flashsale);
			});
		}
	});

	//经过时边框变色
	$(".flash-sale").on("mouseenter", ".sale-goods", function() {
		$(this).find(".count-down").css("border", "solid red 1px");
	}).on("mouseleave", ".sale-goods", function() {
		$(this).find(".count-down").css("border", "solid #e4e4e4 1px");
	})
	
	//倒计时
	var hours = 0,
		minutes = 0,
		seconds = 0;
	//设定过期时间
	var d2 = new Date("2016-10-16");

	var timer = setInterval(function() {
		//现在的时间对象
		var d1 = new Date();
		//相差的毫秒数
		var nums = d2.getTime() - d1.getTime();
		//时
		hours = parseInt(nums / (3600 * 1000));
		$(".hour").html(hours);
		//分
		minutes = parseInt(nums / (60 * 1000) % 60);
		$(".minute").html(minutes);
		//秒
		seconds = ((nums / 1000) % 60).toFixed(1);
		$(".second").html(seconds);

	}, 100);

});