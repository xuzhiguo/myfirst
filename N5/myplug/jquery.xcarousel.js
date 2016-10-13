;
(function($) {
	$.fn.extend({
	
		xcarousel : function(options) {
			// 默认参数
			var defaults = {
				width: 810,
				height: 320,
				page: true, //是否显示页码
				autoPlay: true, //是否自动轮播
				type: 'y', //动画类型：水平滚动x, 垂直滚动y, 渐现效果fade
				buttons: true, //是否显示前后按钮
				speed: 3000, //轮播图速度
				stopPlay: true //鼠标是否停止播放
			}
			var opt = $.extend({}, defaults, options);

			// 考虑this为多个元素的情况
			// 这里的this表示实例（jquery选择器得到的对象）
			this.each(function() {
				// 轮播图外框
				// 这里的this表示每一个dom节点元素
				var $self = $(this);

				// 获取当前对象下的ul
				// this.find('ul');
				var $ul = $('ul', $self);
				//图片添加一倍 , 实现无缝播放
				$ul.append($ul.html());
				var $firstImg = $ul.find('img').eq(0);
				var imgHeight, imgWidth;

				// 初始化
				var index = 0;
				var len = $ul.children().length;
				var $page;
				console.log(len);
				init();

				// 定时器：每个3s切换一张图片
				if(opt.autoPlay) {
					var timer = setInterval(function() {
						index++;
						showPic();
					}, opt.speed);

					if(!opt.stopPlay) {
						// 鼠标移入移出
						$self.on('mouseenter', function() {
								clearInterval(timer);
							}).on('mouseleave', function() {
								clearInterval(timer);
								timer = setInterval(function() {
									index++;
									showPic();
								}, opt.speed);
							})
							// 模拟事件（手动触发一个事件）
							.trigger('mouseleave');
					}
				}
				// 初始化
				function init() {
					// 生成页码
					if(opt.page) {
						$page = $('<div/>').addClass('page');
						for(var i = 1; i <= len / 2; i++) {
							var $span = $('<span/>');
							if(i == 1) {
								$span.addClass('active');
							}
							$span.text(i).appendTo($page);
						}
						$page.appendTo($self);

						// 点击页码切换
						$page.on('mouseover', 'span', function() {
							index = $(this).index();
							showPic();
						});
					}

					// 设置样式
					$self.addClass('xcarousel').css({
						height: opt.height,
						width: opt.width
					});
					$ul.css({
						height: opt.height
					});

					// 水平移动，需要设置ul的宽度
					if(opt.type === 'x') {
						$ul.addClass('type-x').css({
							width: opt.width * len
						});
					} else if(opt.type === 'fade') {
						$ul.addClass('type-fade').children().css({
							opacity: 0
						}).eq(index).css({
							opacity: 1
						});
					}

					// 左右按钮
					if(opt.buttons) {
						$('<div/>').html('&gt;').addClass('next').appendTo($self);
						$('<div/>').html('&lt;').addClass('previous').appendTo($self);
						$self.on('click', '.next', function() {
							index++;
							showPic();
						}).on('click', '.previous', function() {
							index--;
							showPic();
						});
					}
				}
				// 图片展示效果
				function showPic() {
					if(index > len / 2) { //当移动到  后来加上的第一张时  让index为第二张的索引  然后li移到 位置0 
						index = 1;
						$ul.css({
							left: 0,
							top: 0
						});
					} else if(index < 0) { //当移动到 最后一张(加上后)时   让index为最后一张的索引(加上之前) 然后移动到最后一张(加上之前)的位置 
						index = len / 2 - 1;
						if(opt.type === 'x') {
							$ul.css({
								left: opt.width * -len / 2
							});
						}
						if(opt.type === 'y') {
							$ul.css({
								top: opt.height * -len / 2
							});
						}

					}

					if(opt.type === 'x') {
						$ul.stop().animate({
							left: -opt.width * index
						});
					} else if(opt.type === 'y') {
						$ul.stop().animate({
							top: -opt.height * index
						});
					} else if(opt.type === 'fade') {
						$ul.children("li").stop().eq(index).animate({
							opacity: 1
						}).siblings('li').stop().animate({
							opacity: 0
						});
					}

					// 页码高亮效果
					if(opt.page) {
						$page.children().removeClass().eq(index).addClass('active');
					}
					if(index == len / 2) {
						$page.children().removeClass().eq(0).addClass('active');
					}
				}
			})

			return this;
		},
		
		//放大镜插件
		myZoomImg : function(options){//插件使用者传递的对象参数
			//插件默认参数
			var defaults = {
				_width:300,
				_height:300,
				gap:30,
				_position:"right",
				bgColor:"yellow"
			};
			//使用传递过来的参数扩展出一个新的参数
			var opt = $.extend({},defaults,options);
			//使用each遍历jquery实例对象
			this.each(function(){
				var $self = $(this);  //保留实例对象，方便使用
				//定义需要的全局变量（jquery对象）
				var $bigDiv , //大图外框
				    $bigImg , //大图
				    $minZoom , //放大镜模拟框
				    ratio;  //大图与小图的比例
				var $smallImg = $("img",$self);//获取小图
				$smallImg.css({width:opt._width});
				var bigUrl = $smallImg.attr('data-big') || $smallImg.attr('src'); //获取大图的路径
				
				$smallImg.load(function(){
					init();
				});
				//鼠标移入，移除与移动事件
				$self.on("mouseenter",function(){
					$bigDiv.appendTo('body');
					//将放大镜写入$self中
					$minZoom.css({width:opt._width/ratio,height:opt._height/ratio,background:opt.bgColor});
					$minZoom.appendTo($self);
				}).on("mouseleave",function(){
					$bigDiv.remove();
					$minZoom.remove();
				}).on("mousemove",function(e){
					// 设置$min的位置
					// pageX = clientX + scrollLeft
					// pageY = clientY + scrollTop
					var top = e.pageY - $smallImg.offset().top - $minZoom.outerHeight()/2;
					var left = e.pageX - $smallImg.offset().left - $minZoom.outerWidth()/2;
					// 防止放大镜移出小图区域
					if(left<0){
						left = 0;
					}else if(left > $smallImg.outerWidth() - $minZoom.outerWidth()){
						left = $smallImg.outerWidth() - $minZoom.outerWidth();
					}
					if(top < 0 ){
						top = 0;
					}else if(top > $smallImg.outerHeight() - $minZoom.outerHeight()){
						top = $smallImg.outerHeight() - $minZoom.outerHeight();
					}
					$minZoom.css({
						top:top,
						left:left
					});
					$bigImg.css({
						top:-top*ratio,
						left:-left*ratio
					});
				});
				//初始化函数
				function init(){
					$self.addClass("myZoomImg").css({width:opt._width,height:$smallImg.outerHeight()});
					// 创建大图
					$bigDiv = $('<div/>').addClass('myZoomImg-big');
					$bigDiv.css({width:opt._width,height:opt._height});
					$bigImg = $('<img/>').attr({src:bigUrl});
					// 把大图写入页面
					$bigDiv.append($bigImg).appendTo('body');
					$bigImg.load(function(){
						ratio = $bigImg.outerWidth()/$smallImg.outerWidth();
						$bigDiv.remove();
					});
					// 把大图默认显示在右边
					var pos = {
							left:$smallImg.offset().left + $smallImg.outerWidth() + opt.gap,
							top:$smallImg.offset().top
						}
					if(opt._position == 'bottom'){
						pos.left = $smallImg.offset().left;
						pos.top = $smallImg.offset().top + $smallImg.outerHeight() + opt.gap;
					}else if(opt._position == 'left'){
						pos.left = $smallImg.offset().left - $big.outerWidth() - opt.gap;
					}
					$bigDiv.css(pos);
					// 创建放大镜
					$minZoom = $('<span/>').addClass('myZoomImg-min');
				}
			});
			return this;
		}
	});
})(jQuery);