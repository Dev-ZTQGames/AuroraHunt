/*
 * File       : js/main.js
 * SUMMARY:
 * 1) INIT
 * 2) ON LOAD
 * 3) FUNCTIONS
 *
 */



jQuery(function($) {


/* **************************************** *
 * INIT
 * **************************************** */
var main_visual_progress = null;

 // kill main visual progress bar
if( main_visual_progress != null ) {
    main_visual_progress.kill();
    main_visual_progress = null;
}

cookie_popup();

focus_on_tab_only();

fixed_header();
custom_cursor();
scroll_top();
sticky_btn();

main_visual_slider();
game_filter();
event_slider();
notice_slider();

guide_tooltip();
attend_check();

mypage_game_slide();

page_body_class();

current_menu();
mob_menu();
selectric_init();
email_select();
custom_scroll_init();
sweet_alert_init()
multi_file();
notification_open()
sub_tab_menu();

fullclick();

input_num_only();
mypage_chage_select();
textarea_count()

location_map();

iframe_check();
lang_select_change();

game_view_slide();
game_view_slide_popup();
//game_view_intro_popup();

youtube_play();
videobgEnlarge();

game_view_nft_slide();
game_view_nft_popup();
nft_sub_menu();
nft_story_slide();
stacking_effect();
nft_story_popup();
nft_event();
nft_filter_accordion();
nft_filter_popup();
//reward_light();
reward_light2();

clipboard();

wallet();
global_util_menu();
tabs();
accordion();
rwd_slider();

galaxy_wallet();
nfts_utility_popup();
nfts_mint();
nfts_filter()

/* **************************************** *
* ON LOAD
* **************************************** */
$(window).load(function() {

    match_height($('.certify_select_item, .quick_menu_item, .has_cash_box'));
    
    if( $(window).width() < 861 ) { 
        match_height($('.main_visual_content'));
    } else {
        $('.main_visual_content').css('height','100%');
    }

});


/* **************************************** *
* ON RESIZE
* **************************************** */
// INITIALIZE RESIZE

function init_resize(){

    sticky_btn();
    nft_sub_menu();
    nfts_filter();

    match_height($('.certify_select_item, .quick_menu_item, .has_cash_box'));

    if( $(window).width() < 861 ) { 
        match_height($('.main_visual_content'));
        $('.global_menu_util_submenu').removeClass('active');
    } else {
        $('.main_visual_content').css('height','100%');
    }


}

// Init resize on reisize
$(window).on('resize',init_resize);


/* **************************************** *
 * FUNCTIONS
 * **************************************** */

function custom_cursor(){

	var $cursor = $('.custom_cursor')
	     //$follower = $(".cursor-follower");

	function moveCircle(e) {
		
		TweenLite.to($cursor, 0.3, {
			css: {
			  left: e.clientX ,
			  top: e.clientY
			}
		});
/*
		TweenLite.to($follower, 0.6, {
			css: {
			  left: e.pageX,
			  top: e.pageY
			}
		});
*/
		$("a, button").on("mouseenter", function() {
			$cursor.addClass("active");
			//$follower.addClass("active");
		});
		$("a, button").on("mouseleave", function() {
			$cursor.removeClass("active");
			//$follower.removeClass("active");
		});
	}

    if($('html').hasClass('desktop')){
	    $(window).on('mousemove', moveCircle);
        //$('iframe').contents().find('html').on('mousemove',moveCircle);
	    //$('iframe').on('mousemove',moveCircle);
	}

    if( $('#myframe_charge').length ){ 
        function bindIFrameMousemove(iframe){
            iframe.contentWindow.addEventListener('mousemove', function(event) {
                var clRect = iframe.getBoundingClientRect();
                var evt = new CustomEvent('mousemove', {bubbles: true, cancelable: false});
        
                evt.clientX = event.clientX + clRect.left;
                evt.clientY = event.clientY + clRect.top;
        
                iframe.dispatchEvent(evt);
            });

            $('iframe').contents().find("a, button").on("mouseenter", function() {
                $cursor.addClass("active");
            });
            $('iframe').contents().find("a, button").on("mouseleave", function() {
                $cursor.removeClass("active");
            });
        };

        bindIFrameMousemove(document.getElementById('myframe_charge'))
    }

}



function scroll_top(){

    var $window = $(window);
    var $document = $(document);
    var $footer = $('#footer');
    var $scrollBtn = $('#go_top');

    $scrollBtn.on('click',function(){
		$("html, body").stop().animate({
			scrollTop: 0
		}, 600);
        return false;
    });

}


function sticky_btn(){

    var $window = $(window);
    var $document = $(document);
    var $footer = $('#footer');
    var $scrollBtn = $('.go_randombox, #go_top');
	var win_height = $window.height();

	if(window.screen.height === window.innerHeight){
	    win_height = window.screen.height;
	}else{
		win_height = window.innerHeight;
	}

    $window.on('scroll', function() {
        if ($window.scrollTop() < $document.height() - win_height - $footer.outerHeight() ) {
            $scrollBtn.addClass('sticky_btn_fix');
        } else {
            $scrollBtn.removeClass('sticky_btn_fix');
        }


        if ($window.scrollTop() < $window.height() / 2) {
            $scrollBtn.addClass('sticky_btn_hide');
        } else {
            $scrollBtn.removeClass('sticky_btn_hide');
        }

    });


}

function cookie_popup() {

	var setCookie = function(name, value, exp) {
		var date = new Date();
		date.setTime(date.getTime() + 365*24*60*60*1000); 
		document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
	};
 
	cookiedata = document.cookie; 

    if ( cookiedata.indexOf("cookie_use=agree") < 0 ){
        document.getElementById('cookie_popup').style.display = "block";
    } else {
        document.getElementById('cookie_popup').style.display = "none"; 
    }

    $('.cookie-popup button').on('click',function(){
		setCookie("cookie_use", "agree", '1');	
        document.getElementById('cookie_popup').style.display = "none";
    })
 
}

function main_visual_slider(){

	if($('.main_visual').length <= 0) return;

    var $visual = $('.main_visual_wrap');
    var $state = $visual.find('.swiper_play_state');
	var $slideList = $('.main_visual_slider');
	var $total = $slideList.children( "li" ).length;
	var $progress = $('.swiper_progress');

    var main_visual = new Swiper('.main_visual', {
        init: false,
        loop: true,
        speed: 1200,
        //autoplay: {
        //    delay: 5000,
        //  },
        lazy: {
            loadOnTransitionStart: true,
        },
        //direction: 'vertical',
		effect: 'fade',
		fadeEffect: { crossFade: false },
		parallax: true,
        navigation: {
            nextEl: '.main_visual .swiper-button-next',
            prevEl: '.main_visual .swiper-button-prev'
        },
        pagination: {
            el: '.main_visual .swiper-pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<span lang="en" class="' + currentClass + '"></span>' +
                    '<span class="swiper_progress_hidden_space"></span>' +
                    '<span lang="en" class="' + totalClass + '"></span>';
            }
        }
    });

    main_visual.on('init', function(){
	    main_visual_transition(true);
        TweenLite.fromTo($('.swiper-slide-active .main_visual_content'), 1, {autoAlpha: 0,ease: Power3.easeOut}, {autoAlpha: 1});
        setTimeout(function(){
            control_position();
            TweenLite.fromTo($('.main_visual_state'), 0.1, {autoAlpha: 0,ease: Power3.easeOut}, {autoAlpha: 1});
        },2500);
	});

    main_visual.init();

    main_visual.on('slideChange', function(){
		progress_motion();
        main_visual_transition(false);
        control_position();

	});

	function progress_motion(){
		TweenMax.killTweensOf( $progress );
		TweenMax.set( $progress, { width: "0%" });
		TweenMax.to( $progress, 5, { width: "100%", ease:Power0.easeIn,
			onStart: function(){
				$state.removeClass('progress_max');
			},
			onComplete:function(){
				$state.addClass('progress_max');
				if($state.hasClass('play') && typeof $('.main_visual_wrap')[0] != "undefined"){
					$('.main_visual_wrap')[0].swiper.slideNext();
				}
			}
		});
	}


    // Play, Pause
    $state.on('click', function(){
        if($state.hasClass('play')){
            main_visual.autoplay.stop();
            $state.removeClass('play').addClass('pause');
            $state.find('.swiper_state_play').focus();
        } else {
            main_visual.autoplay.start();
            $state.removeClass('pause').addClass('play');
            if( $state.hasClass('progress_max') ){ main_visual.slideNext(); }
            $state.find('.swiper_state_pause').focus();
        }
    });


    //state position
    function control_position(){
        var $control_pos = $('.main_visual_content').offset().top;
        if( $(window).width() < 861 ) { 
            $('.main_visual_state').css({'top':$control_pos - $('#header').height() + 30, 'bottom':'auto'});
            console.log($control_pos)
        } else {
            $('.main_visual_state').removeAttr('style');
        }
    }

    setTimeout(function(){
        control_position();
    },300);

    $(window).resize(control_position);
}


//

// main visual slider helper
function main_visual_transition(flag){

    var main_visual = $('.main_visual')[0].swiper;
	var $curr = $(main_visual.slides[main_visual.activeIndex]);

	if( ( !!$curr.find('iframe').length && !$('html').hasClass('ie10') ) || !!$curr.find('video').length ) {
		if( main_visual_progress != null ) {
			main_visual_progress.kill();
			TweenMax.set($('.main_visual_wrap').find('.swiper_progress'), {width: '0%'});
		}

	} else {
		main_visual_state(6000);
	}

}


function main_visual_state(speed){

    // progress
	var $state = $('.main_visual_wrap').find('.swiper_play_state');
	var $progress = $('.main_visual_wrap').find('.swiper_progress');

	if( main_visual_progress != null ) { main_visual_progress.kill(); }

	main_visual_progress = TweenMax.fromTo($progress, parseInt(speed/1000), {
		width: '0%'
	}, {
		width: '100%',
		ease: Power0.easeNone,
		onStart: function(){
			$state.removeClass('progress_max');
		},
		onComplete: function(){
			$state.addClass('progress_max');

			if($state.hasClass('play')){
				$('.main_visual')[0].swiper.slideNext();
			}
		}
	});

}



function game_filter(){

	$grid = $('.game_list');

	$grid.isotope({
	  itemSelector: '.game_item',
      layoutMode: 'fitRows'
	});

    if( $('.game_item').length ){
        $('.main_game_wrap .no_list').addClass('active');
    } else {
        $('.main_game_wrap .no_list').removeClass('active');
    }

	// filter items on button click
	$('.main_game_tab_list, .game_tab_menu').on( 'click', 'li', function() {
	  var filterValue = $(this).attr('data-filter');
	  $grid.isotope({ filter: filterValue });
	  $('.main_game_tab_list li, .game_tab_menu li').removeClass('active');
	  $(this).addClass('active')

      if( $('.game_list').height() == 0 ){
         $('.main_game_wrap .no_list').removeClass('active');
      } else {
         $('.main_game_wrap .no_list').addClass('active');
      }

      //setTimeout(function(){
          //if( $( ".game_item:hidden" ).length ){
          /*if( $( "li.game_pc" ).hasClass('active') || $( "li.game_mobile" ).hasClass('active') ){
              $('.main_game_wrap .no_list').css({'visibility':'visible', 'display':'block'})
          } else {
              $('.main_game_wrap .no_list').css({'visibility':'hidden', 'display':'none'})
          }*/
      //},700);

	});

	$grid.imagesLoaded().progress(function(){
		$grid.isotope();
	})

}



function event_slider(){

	var $slider = $('.event_slider');

    if( !$slider.length ){ return; }

	var event_slider = new Swiper($slider, {
		slidesPerView: 3,
		spaceBetween: 30,
		freeMode: false,
		speed : 800,
		parallax: true,
		//grabCursor: true,
		navigation: {
            nextEl: '.event_slide_wrap .swiper-button-next',
            prevEl: '.event_slide_wrap .swiper-button-prev'
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
        },
		  breakpoints: {
			1023: {
			  slidesPerView: 2,
			},
			860: {
			  slidesPerView: 2,
			},
		    680: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			},
		    540: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			}
		  }
    });

    if($('.event_item').length <= 3){
        $('.event_slide_wrap .swiper_navigation').remove();
    }

}



function notice_slider(){

	var $slider = $('.notice_slider');

    if( !$slider.length ){ return; }

	var notice_slider = new Swiper($slider, {
        direction: 'vertical',
        loop: true,
        speed:1000,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.notice_slider .swiper-button-next',
            prevEl: '.notice_slider .swiper-button-prev',
        },
    });

}


function guide_tooltip() {

         $(document).on('click', '.guide_tooltip_btn', function(){
            $(this).toggleClass('active');
            return false;
        } );

        $(document).on('click', '.guide_tooltip_box .btn_tooltip_close', function(){
            $(this).closest('.guide_tooltip').find('.guide_tooltip_btn').removeClass('active');
            return false;
        });

}

function attend_check() {

    $('.form_ahd .attend_check input').change(function() {
		var $this = $(this)
		if ($this.prop('checked') == true) {
			$(this).parents('.form_ahd').addClass('acitve');
			$('.form_ahd .form_basic_body').slideDown();
		} else {
		    $(this).parents('.form_ahd').removeClass('acitve');
			$('.form_ahd .form_basic_body').slideUp();
		}
	});

}



/* current menu active */
function current_menu() {

	var url = window.location.href.split('?')[0];

    if(url.indexOf('nfts_launchpad_view.htm') !== -1){
		url = window.location.origin+'/sub/nfts_launchpad.htm'
	}else if(url.indexOf('cs_notice_view.htm') !== -1){
		url = window.location.origin+'/sub/cs_notice_list.htm'+'?'+window.location.href.split('?')[1].split('&')[0];
	}else if(url.indexOf('cs_help_view.htm') !== -1){
		url = window.location.origin+'/sub/cs_help_list.htm'+'?'+window.location.href.split('?')[1].split('&')[0];
	}else if(url.indexOf('game_view.htm') !== -1){
		url = window.location.origin+'/sub/game.htm'
	}


    $('#menu a').each(function () {
        var link_page = this.href;

        if (url == link_page) {
            $(this).parents('li').addClass('active').find('> ul').show();
        }

		var sub_link = $('.sub_tab_menu li.active a').attr('href');

		if(  $('.sub_tab_menu li').hasClass('active') ){
			$('#menu a[href$="' + sub_link + '"]').parents('li').addClass('active').find('> ul').show();
		}

    });


    $('.global_menu_util a').each(function () {
        var link_page = this.href;

        if(url.indexOf('login.htm') !== -1){
            url = window.location.origin+'/extern/sso/login.htm'+'?'+window.location.href.split('?')[1].split('&')[0];
        }

        if (url == link_page) {
            $('.btn_global_login').addClass('active');
        }
    });

}


function mob_menu () {

    var $body = $('body'),
        $header = $('#header'),
        $menu_container = $('.global_menu_nav_wrap'),
        $menu_overlay = $('.mob_menu_overlay')

    // open menu
    $('.mob_menu').on('click', function(){
        scroll_top = $(window).scrollTop();

        $body.addClass('open_menu');
        $header.removeAttr('style');


        // add class and scroll pos tracker
        $body.attr('data-scrolltop',scroll_top)
                 .css({'position':'fixed','width': '100%'});


        // active menu check
        $('#menu > li').each(function(){

            if($(this).hasClass('current_page_item') && !$('.article').hasClass('inquiry_page')){
                var $this = $(this);
                $('#menu > li.current_page_item').find('.menu-depth-1 > .view_all').addClass('view_all_page');
            }

            if($(this).hasClass('current-menu-ancestor') || $(this).hasClass('current-menu-item')){
                var $this = $(this);
                // 2depth
                $this.addClass('active').find('> ul').show();

                // 3depth
                $this.find('> ul > li.current-menu-ancestor').each(function(){
                    $(this).addClass('active').find('> ul').show();
                })

                $this.find('> ul > li.current-menu-item').each(function(){
                    $(this).addClass('active').find('> ul').show();
                })
                return false;
            }
        });

        // open
        TweenLite.to($menu_overlay, .3, {autoAlpha: 1,onStart: function() {$menu_overlay.css('display', 'block');}});
        TweenLite.fromTo($menu_container, .3, {x: '0%'}, {
            x: '-100%',
            onStart: function() {
                $menu_container.css('display', 'block');
            }
        });


        //active menu position scroll
        var $el;

        if(!!$('.small_menu_container_inner').length){
            $el = $('.small_menu_container_inner');
        }

        if( $el != undefined && $el.find('li.current-menu-item').length > 0 ) {
            var $active = $el.find('li.current-menu-item');
            $el.scrollTop($active.position().top - 100);
        }

        $('.global_menu_nav > ul').height($(window).innerHeight() - $('.global_menu_util').height() );

    });


    // menu top level link
    if( $('html').hasClass('mobile') && $(window).width() < 1024 ) {
        $menu_container.on('click', '#menu > li.has_submenu > a', function(e){

            e.preventDefault();

            var $parent = $(this).closest('ul');
            var $li = $(this).closest('li');

            if( !$parent.hasClass('sub_menu') ) { // 2depth

                if($(this).closest('li').hasClass('active')) { // 열려있는 menu 클릭시 닫기

                    $(this).closest('li').removeClass('active').find('> ul').stop().slideUp();

                } else {

                    $('#menu > li').removeClass('active').find('> ul').stop().slideUp();

                    $li.addClass('active');
                    $li.find('> ul').stop().slideDown();

                }

            }

        });
    }

    


    // close menu
    $('.mob_menu_close, .mob_menu_overlay').on('click',function(){

        TweenLite.to($menu_overlay, .0, {autoAlpha: 0,onComplete: function() {$menu_overlay.css('display', 'none');}});
        TweenLite.to($menu_container, .0, {
            x: '100%',
            onComplete: function() {
                $body.removeClass('open_menu');
                $('.global_menu_util_submenu').removeClass('active');
                $menu_container.removeAttr('style');
                $('#menu').removeAttr('style');
                //$menu_container.css('display', 'none');
                $('.small_screen_menu > li').removeClass('active').find('> ul').stop().hide();
            }
        });

        // restore scroll top
        var scroll_top = $body.attr('data-scrolltop');
        $body.removeAttr('style');
        window.scrollTo(0, scroll_top);

    });

    function style_refresh(){
        if( $(window).width() < 861 ) { 
           setTimeout(function(){    
               $('body, .global_menu_nav_wrap, .mob_menu_overlay, #menu, .sub_menu').removeAttr('style'); 
           },100)
        }

        if( $(window).width() > 1023 ) {
            $body.removeClass('open_menu');
            $menu_container.removeAttr('style');
            $('#menu').removeAttr('style');
            $('.mob_menu_overlay').removeAttr('style');
        }
    }

    $(window).resize(style_refresh);

}



/* selectbox custom plugin init  */
function selectric_init() {

    $('.selectric').each(function() {
        $selectric = $(this);

        $selectric.selectric({
            disableOnMobile: false,
            nativeOnMobile: true,
        });
    });

    //select label
    $('.first_noactive_select .selectric').on('selectric-before-close', function() {
        if($('.first_noactive_select .selectric-items li').not(':first').hasClass('selected')){
            $('.first_noactive_select .selectric span').addClass('active')
        } else {
            $('.first_noactive_select .selectric span').removeClass('active') 
        }  
    })

    $('.first_noactive_select select').change(function(){
        $(this).find(':selected').addClass('selected').siblings('option').removeClass('selected');
    });


    //swap
    $('.swap_select_container select').each(function() {
        $selectric = $(this)
        $selectric_container = $selectric.parents('.swap_select_container');

        $selectric_container.addClass($selectric_container.find('option:selected').val())

        $selectric.on('change', function(){
            $selectric.find('option').each(function() {
                $selectric_container.addClass($(this).val());
                $selectric_container.removeClass($(this).not('option:selected').val());
            });
        });
    });

}


/* 추천 이메일 도메인 선택 */
function email_select(){

    $('.select_email').on( 'change', function () {
        var $this = $( this );
        var $target = $this.closest('.email_wrap').find('.input_email_domain');
        var value = $this.val();

        $target.val( value );
    });

}


/* add page body class  */
function page_body_class() {

	var $body = $('body');
	var container_class_str = $('#container').attr('class');

    if(typeof container_class_str != 'undefined'){
		var container_class = container_class_str.split(/\s+/);

		$.each(container_class,function(index,val){
			 $body.addClass('body_'+val+'')
		});
    }
}



function sweet_alert_init() {

	var lang = window.location.host.substr(0, 2);
	//console.log(lang);

	//폼 등록 팝업
	if (lang == 'ko'){
		$('.btn_find_idpw').click(function(e){ 
			e.preventDefault();
			swal({
				text: '이메일이 발송되었습니다.',
				buttons: '확인',
			})
		});
	} else if (lang == 'tw'){
		$('.btn_find_idpw').click(function(e){ 
			e.preventDefault();
			swal({
				text: '已發送E-mail',
				buttons: '確認',
			})
		});
	} else {
		$('.btn_find_idpw').click(function(e){ 
			e.preventDefault();
			swal({
				text: 'E-Mail sent',
				buttons: 'OK',
			})
		});
	}

	if (lang == 'ko'){
		$('.btn_contents_delet').click(function(e){ 
			e.preventDefault();
			swal({
			  text: '현재 작성 중이던 내용을 모두 삭제 하시겠습니까?',
			  buttons: true,
			  buttons: ['취소', '삭제'],
			}).then(function(isConfirm) {
			  if (isConfirm) {
				  window.location.href = 'cs_inquiry.htm';
			  }
			})
		});
	} else if (lang == 'tw'){
		$('.btn_contents_delet').click(function(e){ 
			e.preventDefault();
			swal({
			  text: '確定要將現在輸入的內容全部刪除嗎？',
			  buttons: true,
			  buttons: ['取消', '刪除'],
			}).then(function(isConfirm) {
			  if (isConfirm) {
				  window.location.href = 'cs_inquiry.htm';
			  }
			})
		});
	} else {
		$('.btn_contents_delet').click(function(e){ 
			e.preventDefault();
			swal({
			  text: 'Are you sure you want to delete all the entered content?',
			  buttons: true,
			  buttons: ['cancel', 'delete'],
			}).then(function(isConfirm) {
			  if (isConfirm) {
				  window.location.href = 'cs_inquiry.htm';
			  }
			})
		});
	}  
}


/* element height matching function */
function match_height($item){

    // kill if not required
	if($item.length <= 0) return;

	// init
    equal_height();

    // Add closures to keep the $item alive
    function equal_height(){

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;

        $item.each(function() {
            $el = $(this);
            $el.height('auto');
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }

            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });

    } //equal_height()

}



function focus_on_tab_only(){

    var $body = $('body');

    $body.on('mousedown', function(){

        $body.addClass('use_mouse');

    }).on('keydown', function() {

        $body.removeClass('use_mouse');

    });

}



function custom_scroll_init() {

	//if($('html').hasClass('desktop')){
       $('.scrollbar-inner').scrollbar();
	//}

}



function multi_file() {
    $('.multi_file').MultiFile({
		max: 3, //업로드 최대 파일 갯수 (지정하지 않으면 무한대)
		accept: 'txt|log|jpg|png|gif|bmp|zip|hwp|doc|xls|ppt|pdf', //허용할 확장자(지정하지 않으면 모든 확장자 허용)
		maxfile: 2048, //각 파일 최대 업로드 크기
        maxsize: 6144,  //전체 파일 최대 업로드 크기
	    list: '.file_list',
		STRING: {
            remove : "삭제",
			duplicate : "$file 은 이미 선택된 파일입니다.", 
            denied : "$ext 는(은) 업로드 할수 없는 파일확장자입니다.",
            selected:'$file 을 선택했습니다.', 
            toomuch: "업로드할 수 있는 최대크기를 초과하였습니다.($size)", 
            toomany: "업로드할 수 있는 최대 갯수는 $max개 입니다.",
            toobig: "$file 은 크기가 매우 큽니다. (max $size)"
	    }
	  });

    //multiple select remove
    $('.form_file input[type=file]').removeAttr('multiple');
}



function notification_open(){

	var $noti_open_btn = $('.btn_notification'),
		$noti_close_btn = $('.notification_view_close'),
		$noti_overlay = $('#notification_view_overlay'),
	    $noti_view = $('#notification_view');

	// open
	$noti_open_btn.on('click', function(e){
		e.preventDefault();

		$('body').addClass('open_menu');

		TweenLite.to($noti_overlay, .3, {autoAlpha: 1,onStart: function() {$noti_overlay.css('display', 'block');}});
        TweenLite.fromTo($noti_view, .3, {x: '100%'}, {
            x: '0%',
            onStart: function() {
                $noti_view.css('display', 'block');
            }
        });


	});

	// close
	$('.notification_view_close, #notification_view_overlay').on('click', function(e){
		e.preventDefault();

		TweenLite.to($noti_overlay, .5, {autoAlpha: 0,onComplete: function() {$noti_overlay.css('display', 'none');}});
        TweenLite.to($noti_view, .5, {
            x: '100%',
            onComplete: function() {
				$('body').removeClass('open_menu');
            }
        });

	});

}



function fixed_header() {

    var $window = $(window);
	var $header = $('#header');
    var didScroll     = null;
    var currentScroll = 0;
    var lastScroll    = 0;
    var moveScroll    = 10;

	$window.on('scroll', function() {
        didScroll = true;

		if ($window.scrollTop() > $header.height()) {
			$header.addClass('fixed');
		} else {
			$header.removeClass('fixed');
		}
	});

    setInterval(function() {

        if (didScroll && !$('body').hasClass('open_menu')) {
            hasScrolled();
            didScroll = false;
        }

    }, 50);

    function hasScrolled(){

        currentScroll = $(this).scrollTop();

        // Make sure they scroll more than moveScroll
        if(Math.abs(lastScroll - currentScroll) <= moveScroll) return;

        if(currentScroll > lastScroll){ // ScrollDown
            if(currentScroll > $(window).height()){
                TweenMax.to( $header, 0.4, { autoAlpha:0, y: -$header.outerHeight(), ease: Power3.easeOut });
                TweenMax.to( $('.nft-sub-menu__wrap'), 0.4, { force3D: true, y: -$header.outerHeight(), ease: Power3.easeOut });
            }
        }
        else { // ScrollUp
            TweenMax.to( $header, 0.4, { autoAlpha:1, y: 0, ease: Power3.easeOut });
            TweenMax.to( $('.nft-sub-menu__wrap'), 0.4, { force3D: true, y: 0, ease: Power3.easeOut });
        }

        lastScroll = currentScroll;

    }

}



function mypage_game_slide() { 
    var swiper = new Swiper('.my_game', {
      slidesPerView: 3,
      spaceBetween: 15,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
        },
      }
    });    
}


function sub_tab_menu(){

    var $el;

    if(!!$('.sub_tab_menu').length){
        $el = $('.sub_tab_menu');
    }

    if( $el != undefined && $el.find('> li.active').length > 0 ) {
        var $active = $el.find('> li.active');

        var current_item_width = $active.outerWidth();
        var current_item_pos = $active.offset().left + current_item_width;

        if(current_item_pos >= $(window).width()){
            $el.scrollLeft($active.offset().left - ($active.width()/2) );
        }
    }

}


function fullclick() {

	if($('.basic_table').find('a') ) {
		$('.basic_table tr').on('click', function(e){

			e.stopPropagation();

			var target = e.target;

			var url = $(this).find('a:first').attr('href');
			if(url != undefined){
				window.location.href = url;
			}

		});
	}

}


function input_num_only() {

	$('input.num_only').on('keyup', function(e){

        if( $(this).val() != null && $(this).val() != '' ) {

            var tmps = parseInt($(this).val().replace(/[^0-9]/g, '')) || 0;

            var tmps2 = tmps.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

            $(this).val(tmps2);

        }

    });
}



function mypage_chage_select() {
	$('.has_cash_charge .has_cash_box .cash').each(function(){
		var $this = $(this)
		$this.on('click', 'button', function(){
			$(this).parent('.cash').addClass('active').siblings('.cash').removeClass('active');
			$(this).parents('.has_cash_box').siblings('div').find('.cash').removeClass('active');
		})
    });

}


function textarea_count() {

	$('.form_field_item').each( function() {
        var $this = $(this);
        var $textarea =  $this.find('textarea.form_field');
        var $form =  $textarea.parents('.form_field_item');

		$textarea.keyup(function(){
            if($this.find('.textarea_count').length) {
                var content = $textarea.val();
                $this.find('.textarea_count span').html(content.length);
            }
        });
	});

}



function location_map(){

	if( !$('.company_location_map').length ) { return; }

	if(typeof google == "undefined"){
		var map_url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDbOU7S18ODFxZrqq5SvlpUu7xbF5QgG_k";
		$.getScript( map_url ).done(function() {
			init();
		});
	}else{
		init();
	}

	function init(){

		$('.company_location_map').each(function(){

			var $this   = $(this);
			var id      = $this.attr('id');
			var lat     = parseFloat($this.attr('data-lat'));
			var lng     = parseFloat($this.attr('data-lng'));
			var zoom    = parseInt($this.attr('data-zoom'));

			var mapOptions = {
				zoom            : zoom,
				center          : new google.maps.LatLng(lat, lng),
				scrollwheel     : false,
				mapTypeControl  : false
			};

			var map = new google.maps.Map(document.getElementById(id), mapOptions);

			var marker = new google.maps.Marker({
				map      : map,
				position : map.getCenter()
			});

			// 반응형
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});

		}); 

	}

}

function iframe_check(){

    if( !$('#myframe_charge').length ){ return; }

    $('iframe').each(function() {

        var $this = $(this)
       
        $(this).load(function(){
            var $iframe = $(this)
            var iframe_height = $iframe.contents().find('html').height();

            $iframe.css('height',iframe_height);
            iframe_bottom_space();
            
            var myIframe = document.getElementById("myframe_charge");
            var script = myIframe.contentWindow.document.createElement("script");

            script.type = "text/javascript";
            script.src = '../js/vendors/iframe/iframeResizer.contentWindow.min.js';
            myIframe.contentWindow.document.body.appendChild(script);

            iFrameResize();

            //아이프레임 커서
			custom_cursor();

            //아이프레임 새로고침
            $iframe.contents().find('html').keyup(function(e){
		       if (e.keyCode == 116 || e.keyCode == 82) {
					location.reload();
				}
		    });

            //아이프레임 서브메뉴 클릭시 이벤트
            $iframe.contents().find('.sub_tab_menu li').on('click', function(e){
                if ($(this).is("#fillup")){
                    window.parent.location.href="/sub/mypage_charge.htm";
                } else if ($(this).is("#purchase")){
                    window.parent.location.href="/sub/mypage_use.htm";
                } else if ($(this).is("#coupon")){
                    window.parent.location.href="/sub/charge_coupon.htm";
                } else if ($(this).is("#marble_charge")){
                    window.parent.location.href="/sub/charge_marble.htm";
                } else if ($(this).is("#game_cash_charge")){
                    window.parent.location.href="/sub/charge_gamecash.htm";
                }
			})

        });
        
    });

    function iframe_bottom_space(){
        if( $(window).width() < 861 && $(window).width() > 540 ){
            var iframe_bottom = 120
        } else if( $(window).width() < 541 ){
            var iframe_bottom = 80
        } else {
            var iframe_bottom = 180    
        }
        $('iframe').contents().find('#container').css('padding-bottom', iframe_bottom)
    }
    $(window).resize(iframe_bottom_space);

}



function lang_select_change(){

    $('.lang-container').addClass($('.lang-select option:selected').val())

	$('.lang-container select').on('change', function(){

        $('.lang-select option').each(function() {
            $('.lang-container').addClass($(this).val());
            $('.lang-container').removeClass($(this).not('option:selected').val());
        });

	});
}



function game_view_slide() {

    var swiper = new Swiper(".game_view_slide_container", {
            slidesPerView: "auto",
            navigation: {
              nextEl: ".game_view_slide .swiper-button-next",
              prevEl: ".game_view_slide .swiper-button-prev",
            }
    });

}


function game_view_slide_popup(){

    $('.game_view_slide_link').magnificPopup({
        type: 'image',
        closeOnContentClick : false,
        mainClass: 'game_view_slide_popup',
        fixedContentPos: true,
        fixedBgPos: true,
        gallery: {
            enabled:true,
            navigateByImgClick: false,
        },
        image: {
        markup: '<div class="mfp-figure">'+
                    '<div class="mfp-close"></div>'+
                    '<div class="mfp-img"></div>'+
                '</div>',
        },
        callbacks: {
            buildControls: function() {
              // re-appends controls inside the main container
              this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
            },
            open: function() {
                $('body').addClass('mfp-popup-open');
                $('html').css('overflow-y','hidden');
            },
            afterClose: function() {
                $('body').removeClass('mfp-popup-open');
                $('html').removeAttr('style');
            }
        },
        midClick: true
    })

}



/*function game_view_intro_popup(){

    $('.game_view_intro_button').magnificPopup({
        type: 'inline',
        mainClass: 'game_view_intro_popup',
        fixedContentPos: true,
        fixedBgPos: true,
        callbacks: {
            open: function() {
                $('body').addClass('mfp-popup-open');
                $('html').css('overflow-y','hidden');
            },
            afterClose: function() {
                $('body').removeClass('mfp-popup-open');
                $('html').removeAttr('style');
            }
        },
        midClick: true
    })

}*/



function youtube_play(){

    // load youtube if necessary
	if($('.video-youtube').length <= 0) return;

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";

	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// if youtube api ready do your stuff
	window.onYouTubeIframeAPIReady = function() {

        var $id = $('#video-youtube-player').attr('data-id');

        new YT.Player( 'video-youtube-player' , {
            videoId : $id,
            playerVars: {
                'autoplay': 1,
                'mute': 1,
                'controls': 0,           
                'showinfo': 0,
                'rel': 0,
                'loop': 1,
                'autohide':1
            },
            events: {
                'onReady': function(event){
                    event.target.playVideo();
                    event.target.setPlaybackQuality('hd1080');
                },
                'onStateChange':  function(event){
                    if (event.data == YT.PlayerState.ENDED) {
                      event.target.seekTo(0);
                      event.target.playVideo();
                    }
                }
            }
        });
	}
    

}



function videobgEnlarge(){

    if( !$('.body_page_game_view').length ){ return; }

    var timeoutId;
    var $videoBgAspect = $(".video-aspect");
    var $videoBgWidth = $(".video-width");
    var videoAspect = $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth();

    windowAspect = ($(window).height() / $(window).width());
    //documentAspect = ($(document).height() / $(document).width());

    if( $(window).width() > 1023 ){
        var num = 100;
    } else if( $(window).width() > 1023 ){
        var num = 100;
    } else {
        var num = 100;
    }

    if(windowAspect > videoAspect) {
        $videoBgWidth.width((windowAspect / videoAspect) * num + '%');
    }else{
        $videoBgWidth.width(num + "%")
    }

    $(window).resize(function() {
        if( $(window).width() > 1023 ){
            var num = 100;
        } else {
            var num = 100;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(videobgEnlarge, 100);
    });
}


//nft
function game_view_nft_slide() {

    var swiper = new Swiper(".nft_list_container", {
            slidesPerView: 4,
            spaceBetween: 40,
            navigation: {
              nextEl: ".nft_list_slide .swiper-button-next",
              prevEl: ".nft_list_slide .swiper-button-prev",
            },
            breakpoints: {
              540: {
                slidesPerView: "auto",
                spaceBetween: 35,
              },
              860: {
                slidesPerView: 2,
                spaceBetween: 35,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 35,
              },
              1280: {
                spaceBetween: 35,
              },
            },
            on: {
              beforeResize() {
               if (window.innerWidth <= 540) {
                 swiper.slides.css('width', '');
               }
             }
            }
    });

    swiper.on('slideNextTransitionEnd slideResetTransitionEnd',function(){
        if($(".nft_list_slide .swiper-button-next").hasClass("swiper-button-disabled")){
            $(".nft_list_slide .swiper-button-next").on('click', function(){
                window.location.href = 'nft_game_view.htm';
            })            
        }
    });

}


function game_view_nft_popup(){

    if( !$('.page_game_view').length ){ return; }

    $('.nft_item_link').magnificPopup({
        type: 'inline',
        gallery: {
            enabled: true,
            navigateByImgClick: false,
            preload: [0,1]
        },
        mainClass: 'game_view_nft_popup',
        fixedContentPos: true,
        fixedBgPos: true,
        callbacks: {
            open: function() {
                $('body').addClass('mfp-popup-open');
                $('html').css('overflow-y','hidden');

                /* arrow event */
                var mfp = $.magnificPopup.instance;
                var proto = $.magnificPopup.proto;

                // extend function that moves to next item
                mfp.next = function() {

                    // if index is not last, call parent method
                    if(mfp.index < mfp.items.length - 1) {
                        proto.next.call(mfp);
                    } else {
                        window.location.href = 'nft_game_view.htm';
                    }
                };

                // same with prev method
                mfp.prev = function() {
                    if(mfp.index > 0) {
                        proto.prev.call(mfp);
                    }
                };
            },
            afterClose: function() {
                $('body').removeClass('mfp-popup-open');
                $('html').removeAttr('style');
            },
            buildControls: function() {
                // re-appends controls inside the main container
                this.arrowLeft.appendTo(this.contentContainer);
                this.arrowRight.appendTo(this.contentContainer);
            }
        },
        midClick: true
    })

}



function nft_sub_menu(){

    // inquiry sticky
	if(!$('.nft-sub-menu__wrap').length) return;

    var $nft_sub_menu = $('.nft-sub-menu__wrap');
    var $nft_sub_menu_container = $('.page_game_view .tabs_panels');
    
    
    $(window).on('scroll', function() {

        var $header_height = $('#header').height();
        if($(window).width() > 1023){
            if( $(window).scrollTop() > $nft_sub_menu_container.offset().top - $header_height){  //
                $nft_sub_menu.addClass('minimize');
            } else {
                $nft_sub_menu.removeClass('minimize');
            }
        }

    });


    ///////
    var lastId,
        topMenu = $('.nft-sub-menu__wrap'),
        topMenuHeight = topMenu.outerHeight()+40,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr('href'));
          if (item.length) { return item; }
        });

    menuItems.click(function(e){
      e.preventDefault();

      var item = $($(this).attr('href'));

      if(item.length > 0){
        var offsetTop = $('.nft-sub-menu__wrap').outerHeight() + 30;

        if($(window).scrollTop() > item.offset().top - offsetTop){
            offsetTop = offsetTop + $('#header').outerHeight();
        }

        $('html,body').animate({
            scrollTop : item.offset().top - offsetTop
        },800);
      }
    });

    //scroll
    $(window).on('scroll', function() {

        var fromTop = $(this).scrollTop()+topMenuHeight;

        if($(window).scrollTop() > menuItems.offset().top - fromTop){
            fromTop = fromTop + $('#header').outerHeight();
        }

       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active")
             .end().filter("[href='#"+id+"']").parent().addClass("active");
       }           

    });

}



function nft_story_slide(){

    var $slider = $('.nft-story-slide__container');

    if( !$slider.length ){ return; }

    // options
    swiper = new Swiper($slider, {
        slidesPerView: "auto",
        speed: 400,
        autoHeight: true, 
        centeredSlides: true,
        observer: true,
        //spaceBetween: 50,
        navigation: {
          nextEl: ".nft-story .swiper-button-next",
          prevEl: ".nft-story .swiper-button-prev",
        },
        pagination: {
            el: $('.nft-story .swiper-pagination'),
            clickable: true,
            renderBullet: function (index, className) {
                return '<button class="' + className + '"><span><i class="sr-only">' + (index + 1) + '</i></span></button>';
            }
        }
    });

    

}

function stacking_effect(){
    
    $('.btn-stacking-effect').on('click',function(){
        $('.stacking-effect__popup').show();
        setTimeout(function() {
            $('.stacking-effect__popup .mob-scroll-guide').fadeOut(150);
	    }, 3000);
    })

    $('.stacking-effect__close').on('click',function(){
        $('.stacking-effect__popup').hide();
    })

}


function nft_story_popup(){
    
    $('.btn-nft-story').on('click',function(){
        $('.nft-story__popup').show();
            nft_story_slide();
            //setTimeout(function(){
            //swiper.update();
            //},1000);
    })

    $('.nft-story__close').on('click',function(){
        $('.nft-story__popup').hide();
    })

}


function nft_event() {
    //wish    
    $('.nft_item_wish, .nft_info_wish').on('click',function(){
        $(this).toggleClass('active');
    });

    //desc more
    $(".nft_desc_more").on('click',function(e){
        e.preventDefault();
        $(this).parent('div').addClass('more');
        $(this).remove();
    });

    //price input
    $('.nft_price li').on('click',function(e){
        if($(this).find('input').is(':checked')){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    //nft filter
    $('.nft_game_filter_title button').on('click',function(e){
        e.preventDefault();
        $('.nft_game_view_list_wrap').addClass('hide_filter');
    });

    $('.nft_filter_open').on('click',function(e){
        e.preventDefault();
        $('.nft_game_view_list_wrap').removeClass('hide_filter');
    });
}



function nft_filter_accordion() {

    $('.nft_game_filter_item').each(function(){
        if(!$(this).hasClass('nft_game_filter_item--active')) $(this).find('.filter_content').hide();
    });

	// Toggle the accordion
	$('.nft_game_filter_list').on('click', '.nft_game_filter_button', function(){
		var $item = $(this).parent('.nft_game_filter_item');

        if($item.hasClass('nft_game_filter_item--active')){ // close
            $item.removeClass('nft_game_filter_item--active');
            $item.find('.filter_content').slideUp();
        } else { // open
            $item.addClass('nft_game_filter_item--active');
			$item.siblings('.nft_game_filter_item').removeClass('nft_game_filter_item--active')
			//$item.siblings('.nft_game_filter_item').find('.filter_content').slideUp();
            $item.find('.filter_content').slideDown();
        }
		return false;
	});
}


function nft_filter_popup() {

    //mobile filter popup
    var $body = $('body'),
         $filter_popup_container = $('.filter_popup'),
         $filter_popup_overlay = $('.filter_popup_overlay');

    $('.nft_filter_button').on("click", function (e) {
        e.preventDefault();

        var contents = $('.nft_game_filter_list')[0].outerHTML
        TweenMax.to($filter_popup_overlay, .3, {autoAlpha: 1,onStart: function() {$filter_popup_overlay.css('display', 'block');}});
        TweenMax.fromTo($filter_popup_container, .3, {autoAlpha: 0}, {autoAlpha: 1, onStart: function() {$filter_popup_container.css('display', 'block');}});
        $('.filter_popup_content').prepend(contents);

        nft_filter_accordion();
    });    

    $('.filter_popup_close, .filter_popup_overlay').on('click',function(){
        filter_popup_close();
    });

    function filter_popup_close(){
        TweenMax.to($filter_popup_overlay, .3, {autoAlpha: 0,onComplete: function() {$filter_popup_overlay.css('display', 'none');}});
        TweenMax.to($filter_popup_container, .3, {
            autoAlpha: 0,
            onComplete: function() {
                $filter_popup_container.css('display', 'none');
                TweenMax.set($filter_popup_container, {autoAlpha: 1});
                $('.filter_popup_content').find('.nft_game_filter_list').remove();
            }
        });
    }

}



function reward_light(){

    if( !$('.nft-reward__light').length ){ return; }
    
    var idx = 0;
    var num = 0;
    var max = $('.nft-reward__light p').length+1;
    var rotate = 999999;
    var speed = 100;

    if( $(window).width() > 860 ){
    }
    if( $(window).width() < 861 ) {
        $('.nft-reward__light p:nth-child(n+33):nth-child(-n+44)').remove();
        //$(window).on('resize',change_time);
    }
    if( $(window).width() < 541 ) {
        console.log(55)
        $('.nft-reward__light p:nth-child(n+29):nth-child(-n+32)').remove();
    }

    function change() {

      //$('.nft-reward__light p').each(function(){

        if( $(window).width() > 860 ){
            var $el = $('.nft-reward__light p');
        }
        if( $(window).width() < 861 ) {
            $('.nft-reward__light p:nth-child(n+33):nth-child(-n+44)').remove();
            var $el = $('.nft-reward__light p');
            //$(window).on('resize',change_time);
        }
        if( $(window).width() < 541 ) {
            console.log(55)
            $('.nft-reward__light p:nth-child(n+29):nth-child(-n+32)').remove();
            var $el = $('.nft-reward__light p');
        }
        
          $el.eq(idx).toggleClass("on");
            
          idx++;

          if (idx == max) {
            idx = 0;
            num++;
          }
          if (num != rotate) {
            setTimeout(function() {
              change()
            }, speed);
          } else {
            $('.nft-reward__light p').removeClass("on");
            idx=0;
            num=0;
          }

    }

    function change_time(){
        setTimeout(function() {
            change()
        }, speed);
    }

    change_time()
}




function reward_light2(){


    if( !$('.nft-reward__light').length ){ return; }
 
    setInterval(change_light,1200)

    function change_light(){
        $('.nft-reward__light p').filter(":even").addClass("on");

        setTimeout(function() {
            $('.nft-reward__light p').filter(":even").removeClass("on");
        },300);

        setTimeout(function() {
            $('.nft-reward__light p').filter(":odd").addClass("on");
        },600);

        setTimeout(function() {
            $('.nft-reward__light p').filter(":odd").removeClass("on");
        },900);
    }
}


function clipboard() {

	if( !$('.clipboard').length ) { return; }

    $('.clipboard').each(function(){

	    if(typeof Clipboard != "undefined"){
        
            var $el = $(this);
            var clipboard = new Clipboard($el[0]);
        
            var $clipboard_tooltip = $el.next('.clipboard_copynote');
		    var $clipboard_tooltip_2 = $el.next('.clipboard_copynote_type2');

            $clipboard_tooltip.appendTo('#container');

            $el.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
            });

            clipboard.on('success', function(e) {
                e.clearSelection();
                TweenLite.fromTo($clipboard_tooltip, .2, {autoAlpha: 0}, {autoAlpha: 1});
                TweenLite.fromTo($clipboard_tooltip_2, .2, {autoAlpha: 0}, {autoAlpha: 1});

                setTimeout(function(){
                    TweenLite.fromTo($clipboard_tooltip, .2, {autoAlpha: 1}, {autoAlpha: 0});
                    TweenLite.fromTo($clipboard_tooltip_2, .2, {autoAlpha: 1}, {autoAlpha: 0});
                }, 1500);
            });
        
	    }
    })

}


function wallet(){
    
    $('.btn_create_wallet').on('click',function(e){
        e.preventDefault();
        TweenLite.fromTo($('.wallet_create_complete_box_wrap'), .3, {autoAlpha: 0}, {autoAlpha: 1});
    });

    //back
    $('.btn_back').on('click',function(){
        if( $('.bobby_wallet_wrap').hasClass('nft_collections_view')){
            $('.collections_list').addClass('active');
            $('.collections_view').removeClass('active');
            $('.bobby_wallet_wrap').removeClass('nft_collections_view');
            match_height($('.match_height'));
        } else {
            window.location.href = document.referrer;
        }
    })
    
    

    //receive popup
    $('.wallet_qr_popup_wrap').appendTo('#container');

    $('.wallet_function_receive').on('click',function(e){
        e.preventDefault();
        $('.wallet_qr_popup_wrap').show();
    });

    $('.wallet_qr_popup .btn_close, .wallet_qr_popup_wrap .overlay').on('click',function(e){
        e.preventDefault();
        $('.wallet_qr_popup_wrap').hide();
    });

    //swap
    $('.selectric-swap_select').addClass($('.swap_select option:selected').val())

	$('.selectric-swap_select select').on('change', function(){
        $('.swap_select option').each(function() {
            $('.selectric-swap_select').addClass($(this).val());
            $('.selectric-swap_select').removeClass($(this).not('option:selected').val());
        });
	});

    //send
    $('.selectric-send_select').addClass($('.send_select option:selected').val())

	$('.selectric-send_select select').on('change', function(){

        $('.send_select option').each(function() {
            $('.selectric-send_select').addClass($(this).val());
            $('.selectric-send_select').removeClass($(this).not('option:selected').val());
        });

	});

    //nfts list 
    $('.collections_list').addClass('active');

    /*$('.collections_item button').each(function(){
        var $this = $(this);

        $this.on('click', function(){
            $('.collections_list').removeClass('active');
            $('.collections_view').addClass('active');
            $('.bobby_wallet_wrap').addClass('nft_collections_view');
            match_height($('.match_height'));
        });
    })*/

    //nft view popup
    $('.nft_img_expand').magnificPopup({
        type: 'image',
        closeOnContentClick : false,
        mainClass: 'nft_img_expand_popup',
        fixedContentPos: true,
        fixedBgPos: true,
        image: {
        markup: '<div class="mfp-figure">'+
                    '<div class="mfp-close"></div>'+
                    '<div class="mfp-img"></div>'+
                '</div>',
        },
        callbacks: {
            open: function() {
                $('body').addClass('mfp-popup-open');
                $('html').css('overflow-y','hidden');
            },
            afterClose: function() {
                $('body').removeClass('mfp-popup-open');
                $('html').removeAttr('style');
            }
        },
        midClick: true
    })
        

}


function global_util_menu() {
    
    function global_util_menu_resize(){

        $('.global_menu_util > ul > li > button').on('click',function(){
            var $this = $(this);
            if($this.parent('li').find('.global_menu_util_submenu').hasClass('active')){
                $this.parent('li').find('.global_menu_util_submenu').removeClass('active');
            } else {
                $this.parent('li').find('.global_menu_util_submenu').addClass('active');
            }
            $this.parent('li').siblings().find('.global_menu_util_submenu').removeClass('active');
            match_height($('.match_height'));
        });


        $('.util_submenu_title button').on('click',function(){
            $('.util_submenu_popup_menu').toggleClass('active');
        });

        //mobile global util menu
        if($(window).width() < 1024){
            $('.global_menu_util_submenu').appendTo('#container');
            $('.global_menu_util_profile button').on('click',function(){
                menu_close();
                $('.global_menu_util_submenu_profile').addClass('active');
            });
            $('.global_menu_util_wallet button').on('click',function(){
                menu_close();
                $('.global_menu_util_submenu_wallet').addClass('active');
                match_height($('.match_height'));
            });
            $('.global_menu_util_galaxy_wallet button').on('click',function(){
                menu_close();
                $('.global_menu_util_submenu_galaxy_wallet').addClass('active');
                match_height($('.match_height'));
            });

            //popup close
            $('.global_menu_util_submenu_close').on('click',function(){
                TweenLite.to($('.mob_menu_overlay'), .5, {autoAlpha: 0,onComplete: function() {$('.mob_menu_overlay').css('display', 'none');}});
                $('.global_menu_util_submenu').removeClass('active');
            });

            function menu_close(){
                $menu_container = $('.global_menu_nav_wrap'),
                //$menu_overlay = $('.mob_menu_overlay')
                //TweenLite.to($menu_overlay, .5, {autoAlpha: 0,onComplete: function() {$menu_overlay.css('display', 'none');}});
                TweenLite.to($menu_container, .5, {
                    x: '100%',
                    onComplete: function() {
                        $('body').removeClass('open_menu');
                        $('.small_screen_menu > li').removeClass('active').find('> ul').stop().hide();
                    }
                });
            }

        } else {
            $('html').click(function(e) {   
                if($(e.target).parents('.global_menu_util').length < 1 ){
                    $('.global_menu_util_submenu').removeClass('active');
                    $('.util_submenu_popup_menu').removeClass('active');
                }
            }); 
        }
    }

    global_util_menu_resize();
    $(window).on('resize',global_util_menu_resize);

}


function tabs(){

    var $el = $('.tabs');

	$el.each(function(){

		var $this = $(this);
        var is_hash = ( $this.hasClass('tabs-hash') ) ? true : false;

		// Hide tabs if not already hidden
		$this.find('> div > div').css( {'visibility':'hidden', 'height':'0' } )
        $this.find('> div > div:first').css( {'visibility':'visible', 'height':'auto' } )
        $this.find('> ul > li:first').addClass('tabs_active');			

		// Add click event
		$this.find('> ul li').on('click',function(){
			var $that = $(this).find('a');
			var hash = $that.attr('href');
			$this.find('> ul li').removeClass('tabs_active');
			$that.parent().addClass('tabs_active');

			var target_index = $that.parent().index();
			$this.find('> div > div').css( {'visibility':'hidden', 'height':'0' } )
			$this.find('> div > div:eq('+target_index+')').css( {'visibility':'visible', 'height':'auto' } )

            if( $('.bobby_wallet_wrap').hasClass('nft_collections_view')){
                $('.collections_list').addClass('active');
                $('.collections_view').removeClass('active');
                $('.bobby_wallet_wrap').removeClass('nft_collections_view')
            }

            match_height($('.match_height'));

			return false;
		});

	});

}



function accordion(){
   
    /*var item_class = '.accordion-item';
    var content_class = '.accordion-content';

    // Add active class to the first row
    //$(item_class).first().addClass('accordion--active');
    //$(item_class).first().find(content_class).show();

    // Toggle the accordion
    $('.accordion').on('click', '.accordion-title', function(e){

        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);
        var $li = $(item_class);
        var $li_content = $li.find(content_class)
        var $current_li = $this.parent();
        var $current_content = $current_li.find(content_class);

        //$li.not($current_li).removeClass('accordion--close');
        $current_li.toggleClass('accordion--close');

        //$li_content.not($current_content).slideUp();
        $current_content.slideToggle(400, function(){

        });
    });*/


    $('.accordion-item').each(function(){
        if(!$(this).hasClass('accordion-item--active')) $(this).find('.accordion-content').hide();
    });

    // Toggle the accordion
    $('.accordion-list').on('click', '.accordion-title', function(){
  
        var $item = $(this).parent('.accordion-item');

        if($item.hasClass('accordion-item--active')){ // close
            $item.removeClass('accordion-item--active');
            $item.find('.accordion-content').slideUp();
        } else { // open
            $item.addClass('accordion-item--active');
            $item.siblings('.accordion-item').removeClass('accordion-item--active')
            $item.siblings('.accordion-item').find('.accordion-content').slideUp();
            $item.find('.accordion-content').slideDown();
        }
 
        return false;

    });

}



function rwd_slider(){

    if( !$('.rwd-slider__container').length ){ return; }

    $('.rwd-slider__container').each(function(){
        var $slider = $(this)

        var rwd_slide = "undefined";
        
        rwd_slider_resize = function(){
            if( matchMedia('screen and (min-width: 1024px)').matches ) {

                if(rwd_slide != "undefined"){
                    rwd_slide.destroy();
                    rwd_slide = "undefined";
                }

                $slider.find('.rwd-slider__wrapper').removeAttr('style').removeClass('swiper-wrapper');
                $slider.find('.rwd-slider__item').removeAttr('style').removeClass('swiper-slide');

            } else if ( matchMedia('screen and (max-width: 1023px)').matches && rwd_slide == "undefined") {

                $slider.find('.rwd-slider__wrapper').removeAttr('style').addClass('swiper-wrapper');
                $slider.find('.rwd-slider__item').removeAttr('style').addClass('swiper-slide');
                rwd_slide = new Swiper($slider, {
                    slidesPerView: 'auto',
                    preventInteractionOnTransition: true,
                    followFinger: true,
                    pagination: {
                        el: $slider.find('.swiper-pagination'),
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<button class="' + className + '"><span><i class="sr-only">' + (index + 1) + '</i></span></button>';
                        }
                    },
                });

            }
        }

        rwd_slider_resize();
        $(window).on('resize', rwd_slider_resize);
    });
}



function galaxy_wallet(){

    $('.principal_amount_input').each(function () {
        var $this = $(this)
        $this.keyup(function(e) {
            //placeholder
            if($this.val().length > 0 ){
                $this.parents('.principal_amount').addClass('active');
            } else {
                $this.parents('.principal_amount').removeClass('active');
            }
            //콤마
            $(this).val($(this).val().replace(/[^0-9]/gi, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'));
        })
    });

    //plug principalpopup
    $('.galaxy_wallet_btn').on('click',function(){
        $(this).parents('.wallet_panel').find('.plug_principal_popup').show();
    })
    $('.principal_btn_cancel').on('click',function(){
        $('.plug_principal_popup').hide();
    })

    //plug sign popup
    $('#plug_wallet .plug_principal_popup .principal_btn_send').on('click',function(){
        $(this).parents('.wallet_panel').find('.plug_sign_popup').show();
    })

    //confirm transaction popup
    $('#galaxy_wallet .plug_principal_popup .principal_btn_send').on('click',function(){
        $(this).parents('.wallet_panel').find('.confirm_transaction_popup').show();
        $(this).parents('.wallet_panel').find('.plug_principal_popup').hide();
    })

    $('.confirm_transaction_popup .btn_close').on('click',function(){
        $(this).parents('.wallet_panel').find('.confirm_transaction_popup').hide();
    })

}


function nfts_utility_popup(){

    //select
    $('.collections_view_item').each(function () {
        var $check_item = $(this).find('.nft_utility_select');
        //if( $check_item.find('input:checked') ){
        $check_item.find('input').change(function() {
            if(this.checked) {
                $check_item.parents('.collections_view_item').addClass('active');
            } else {
                $check_item.parents('.collections_view_item').removeClass('active');
            }
        });
    })


    $('.btn_nft_utility_popup_close').on('click',function(){
        $.magnificPopup.close();
    });


    $('.btn_nft_utility_open').magnificPopup({
        type: 'inline',
        closeOnContentClick : false,
        mainClass: 'game_view_slide_popup',
        fixedContentPos: true,
        fixedBgPos: true,
        callbacks: {
            open: function() {
                $('body').addClass('mfp-popup-open');
                $('html').css('overflow-y','hidden');
                nfts_utility_popup_slider();
            },
            afterClose: function() {
                $('body').removeClass('mfp-popup-open');
                $('html').removeAttr('style');
            }
        },
        midClick: true
    })

    
    function nfts_utility_popup_slider(){

        if( !$('.nft_utility_popup_guide').length ){ return; }

        //table slider
        $('.nft_utility_popup_guide').each(function () {

            var $slider = $(this);

            var nft_utility_slider = new Swiper($slider, {
                init: false,
                spaceBetween: 30,
                speed : 800,
                loop : true,
                loopedSlides: 1,
                observer: true,
                observeParents: true,
                parallax:true,
                simulateTouch:true,
                navigation: {
                    nextEl: $slider.find('.swiper-button-next'),
                    prevEl: $slider.find('.swiper-button-prev')
                },
            });

            nft_utility_slider.on('init', function () {
                //nft_rating
                if( $('.nft_utility_popup').data('rating') == 'normal' ){
                    nft_utility_slider.slideTo(1,false)
                } else if ( $('.nft_utility_popup').data('rating') == 'rare' ){
                    nft_utility_slider.slideTo(2,10)
                } else if ( $('.nft_utility_popup').data('rating') == 'epic' ){
                    nft_utility_slider.slideTo(3,false)
                } else if ( $('.nft_utility_popup').data('rating') == 'unique' ){
                    nft_utility_slider.slideTo(4,false)
                } else if ( $('.nft_utility_popup').data('rating') == 'legend' ){
                    nft_utility_slider.slideTo(5,false)
                }
            });

            nft_utility_slider.init();

        })

    }
        

}



function nfts_mint(){

    //progress bar
    $('.mint-progressbar__box:not(.mint-soldout)').each(function(){
        var $this = $(this)
        var progressbar_val = $this.find('.progressbar-item').attr('data-value');
        var soldout_val = $this.find('.progressbar-soldout').attr('data-value');
        var img_half = $this.find('figure').width() / 2

        $this.find('.progressbar-item').css('width', progressbar_val + '%');
        $this.find('figure').css('left', 'calc(' + progressbar_val + '%' + ' - ' + img_half + 'rem' + ')');
        $this.find('.progressbar-soldout').css('width', soldout_val + '%');
    });

    //mint popup
    $('.btn-mint').magnificPopup({
        type: 'inline',
        //mainClass: 'game_view_intro_popup',
        fixedContentPos: true,
        fixedBgPos: true,
        closeBtnInside: true,
        callbacks: {
            open: function() {
                $('body').addClass('mfp-popup-open');
                //$('html').css('overflow-y','hidden');
            },
            afterClose: function() {
                $('body').removeClass('mfp-popup-open');
                //$('html').removeAttr('style');
            }
        },
        midClick: true
    })


    //mint quantity
    $('.quantity').each(function(){

        var $this = $(this)
        
        $this.find('.count-up').click(function (e) {
            e.preventDefault();
            var inc_value = $this.find('.qty-input').val();
            var value = parseInt(inc_value, 10);
            value = isNaN(value) ? 0 : value;
            //if (value < 1000) {
                value++;
                $this.find('.qty-input').val(value);
           // }
        });

        $this.find('.count-down').click(function (e) {
            e.preventDefault();
            var dec_value = $this.find('.qty-input').val();
            var value = parseInt(dec_value, 10);
            value = isNaN(value) ? 0 : value;
            if (value > 1) {
                value--;
                $this.find('.qty-input').val(value);
            }
        });

    })

}



function nfts_filter(){
    
    if( $(window).width() < 1024 ) {

         //filter popup
        $('.nfts-filter-popup-open').magnificPopup({
            type: 'inline',
            //mainClass: 'game_view_intro_popup',
            fixedContentPos: true,
            fixedBgPos: true,
            closeBtnInside: true,
            callbacks: {
                open: function() {
                    $('body').addClass('mfp-popup-open');
                    
                    //mobile filter popup
                    if(!$('.nfts-filter-popup__body').find('.nfts-filter').length){
                        var contents = $('.nfts-filter')[0].outerHTML
                        $('.nfts-filter-popup__body').prepend(contents);
                    }

                },
                afterClose: function() {
                    $('body').removeClass('mfp-popup-open');

                    //$('.nfts-filter-popup__body').find('.nfts-filter').remove();
                }
            },
            midClick: true
        })

        $('.nfts-filter-popup__confirm').on('click',function(){
            $.magnificPopup.close();
        });



        /*
        //nft filter accordion
        $('.nfts-filter__item').each(function(){
            //if(!$(this).hasClass('nfts-filter__item--active')) $(this).find('.nfts-filter__content').hide();
            //if(!$(this).hasClass('nfts-filter__item--active')) $(this).find('.nfts-filter__content').hide();
        });

        // Toggle the accordion
        $('.nfts-filter').on('click', '.nfts-filter__button', function(){
            var $item = $(this).parent('.nfts-filter__item');

            if($item.hasClass('nfts-filter__item--active')){ // close
                $item.removeClass('nfts-filter__item--active');
                $item.find('.nfts-filter__content').slideUp();
            } else { // open
                $item.addClass('nfts-filter__item--active');
                //$item.siblings('.nfts-filter__item').removeClass('nfts-filter__item--active')
                //$item.siblings('.nfts-filter__item').find('.nfts-filter__content').slideUp();
                $item.find('.nfts-filter__content').slideDown();
            }
            return false;
        });*/
 
        
    } else {
        $.magnificPopup.close();
    }
}



}); // End jQuery


function setCookie(cname, cvalue, exdays) {
 const d = new Date();
 d.setTime(d.getTime() + (exdays*24*60*60*1000));
 let expires = "expires="+ d.toUTCString();
 const domain = ".aurorahunt.xyz";
 document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;" + "domain=" + domain + ";";
}


function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
	x = val[i].substr(0, val[i].indexOf('='));
	y = val[i].substr(val[i].indexOf('=') + 1);
	x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
	if (x == cookie_name) {
	  return unescape(y); // unescape로 디코딩 후 값 리턴
	}
  }
}

document.domain = "aurorahunt.xyz";