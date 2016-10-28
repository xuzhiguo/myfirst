
$(function(){
	//头部购物车经过时展开
	$("#page-cartbar").hover(function() {
		$(this).css({
			backgroundPosition: "0 -74px"
		});
		$("#head_shoplist").stop().css("display","block");
	}, function() {
		$(this).css({
			backgroundPosition: "0 -30px"
		});
		$("#head_shoplist").stop().css("display","none");
	})
});


	
//声明一个公共的数组来存购物车的信息
var shopcar_list = [];
var num1=0;
//头部获取用户名cookie
//如果已经登录,则头部显示用户名
function getHeadname(){
	var $headshoplist =$("#head_shoplist");	//头部购物车
	var getname = getCookie("username");
	if(getname){
		var headName = $("#headName").html("<b style='color: red;'>            "+getname+"            </b>");
	}
	
	
	//获取cookie 如果存在有  把当前对象存入数组
	var getgoods_list = getCookie("goods");
	if(getgoods_list){
		shopcar_list = JSON.parse(getgoods_list);
		
		$headshoplist.html(""); //先清空里面的内容
		for(var i=0;i<shopcar_list.length;i++){
			num1 += parseInt(shopcar_list[i].num);
			//生成样式
			var $div = $("<div/>").attr("id",shopcar_list[i].product_code).addClass("goods").html("<img src="+shopcar_list[i].imgurl+" width='100px' /><p class='delect'></p>");
			$("<div/>").addClass("goostitle").html("<h3>"+shopcar_list[i].title+"</h3><span>"+shopcar_list[i].price+"</span><b class='numX'>&times;"+shopcar_list[i].num+"</b>").appendTo($div);
			$div.appendTo($headshoplist);
		}
		console.log(shopcar_list);
		//把数量显示在购物车
		$("#shuliang").html(num1);
	}
	
	//点击删除按钮
	$headshoplist.on("click",".delect",function(){
		var numXXX = 0;
		for(var i=0;i<shopcar_list.length;i++){
			//原来数组中总的数量
			numXXX += shopcar_list[i].num;
		}
		//更新显示数量
		$("#shuliang").html(numXXX);
		
		var numXX = $(this).parent().find(".numX").html();//找到当前商品的数量
		$(this).parent().remove(); 	//删除本商品
		//减去数量再更新
		numXXX -= parseInt(numXX.charAt(1));
		$("#shuliang").html(numXXX);	//更新页面数量
		
		//var isTrue = false;
		//获取当前商品的ID
		var thisId = $(this).parent().attr("id");
		for(var i=0;i<shopcar_list.length;i++){
			if(thisId == shopcar_list[i].product_code)	{
				//删除数组中 本商品的记录
				shopcar_list.splice(i-1,1);
				//isTrue = true;
			}
		}
		//如果有删除  更新cookie
			updataCookie();
//		if(isTrue){
//		}
		
		if(numXXX==0){
			//为0时显示购物车空空如也
			$headshoplist.html("购物车中还没有商品快点抢购吧!");
		}
	});
}

function updataCookie(){
	//先删除之前的cookie
	var dd = new Date();
	setCookie("goods","",d,"/");
	
	//设置cookie
	//过期时间为当前时间后两天
	var d = new Date();
	d.setDate(d.getDate()+2);
	//序列化
	var serialize = JSON.stringify(shopcar_list);
	setCookie("goods",serialize,d,"/");
	
}
