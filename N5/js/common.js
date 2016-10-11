//头部购物车
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

//声明一个公共的数组来存购物车的信息
//每次添加删除  则改变数组
var shopcar_list = [];

//头部获取用户名cookie
//如果已经登录,则头部显示用户名
function getHeadname(){
	var getname = getCookie("username");
	if(getname){
		var headName = $("#headName").html("<b style='color: red;'>            "+getname+"            </b>");
	}
}

