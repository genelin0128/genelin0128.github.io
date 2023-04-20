var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ieVer = navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1;
var str = navigator.appVersion;

var console = console || { "log": function () { } };

var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ltIE8 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 8;
var ie_version = detectIE();
//---------------------------------paypage調整加入的程式----------------------------
//isTouch
var isTouch = function () {
    return 'ontouchstart' in window        // works on most browsers 
        || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

var cleaveCustom = new Cleave('.input-cart-number', {
    blocks: [4, 4, 4, 4],
    delimiter: '-',
});
//------------------------------/paypage調整套版加入的程式----------------------------
function detectIE() {
  var ua = window.navigator.userAgent;   
    var msie = ua.indexOf('MSIE ');
    var ie11 = ua.indexOf("Trident");
    if (msie > 0 || ie11 > 0) {
        $('.fancyRadio').css('border-radius', '0');
        $('.btn').css('filter', 0);
        $('.loadingBall').hide();
        $('body').addClass('ie');
    }
    if (msie > 0) {      
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

// 表單驗證時需要加class
function formFailure(){
    $("select.error").parents(".select_style").addClass("error");
}
function showDetail(BalMoney, Term) {
    var isSelfMoney = $('input[name="Money"]:checked').val() * 1 === 0;
    var DeMoney = isSelfMoney ? $('#Self_money').val() : $('input[name="Money"]:checked').val();
    var CurPaidTemp = 0;
    var MRate = 1.4;
    var totalPaid = 0;
    var totalInt = 0;
    var BalMoney;
    var tbody = $('#equation-table tbody');
    $('.add__result').show();
    for (i = 1; i <= Term; i++) {
        BalMoney = BalMoney - CurPaidTemp;
        if (i == 1) {
            CurPaidTemp = DeMoney - Math.floor(DeMoney / Term * 10000 / 10000) * (Term - 1);
        } else {
            CurPaidTemp = Math.floor(DeMoney / Term * 10000 / 10000);
        }
        var Interest = Math.round(BalMoney * (MRate / 100) * 10000 / 10000);
        var CurPaid = CurPaidTemp + Interest
        totalPaid = totalPaid + CurPaidTemp;
        totalInt = totalInt + Interest;

        var strCurPaidTemp = (CurPaidTemp.toString());
        var strBalMoney = (BalMoney.toString());
        var strInterest = (Interest.toString());
        var strCurPaid = (CurPaid.toString());
        tbody.append(
            '<tr><td class="green">' + i + '</td><td>' + strCurPaidTemp + '</td><td>' + strBalMoney + '</td><td>' + strInterest + '</td><td>' + strCurPaid + '</td></tr>'
        );
    }
    var strTotalPaid = (totalPaid.toString());
    var strtotalInt = (totalInt.toString());
    $('#totalpaidLoan').html(strTotalPaid)
    $('#totalintLoan').html(strtotalInt)
}
function evenRound(num, decimalPlaces) {

    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8);
    var i = Math.floor(n), f = n - i;
    var e = 1e-8;
    var r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}

$(function() {
    var pageId;
    var pageTypeId;
    
    var tabID;
    var targetTab;
    //var urlName = location.search;
    var urlName;
    var urlID;
    //--------------------------- paypage調整加入的程式-----------------------------------------
      $('.input-cart-number').on('keyup',function(e){
     	  var op="";
     		var tmp = $(this).val().replace(/\D/g, "");
     		for (var i=0;i<tmp.length;i++)
     		{
     				if (i%4===0 && i>0)
     				{
     						op += "-" + tmp.charAt(i);
     				} else {
     						op += tmp.charAt(i);
     				}
     		}
     		$(this).val(op);
     });

    $('.input-cart-number').on('keyup change', function () {
        var card_number = '';
        $('.input-cart-number').each(function () {
            card_number += $(this).val() + ' ';

        });
        $('.card-front .number').html(card_number);
        $('span.input_num3').text(card_number);
    });

        $('.card-expiration-month, .card-expiration-year').change(function () {
            m = $('.card-expiration-month option').index($('.card-expiration-month option:selected'));
            m = (m < 10) ? '0' + m : m;
            y = $('.card-expiration-year :selected').val().substr(2, 2);
            y2 = $('.card-expiration-year').val();
            $('.card-expiration-date div').html(m + '/' + y);
            $('span.input_num4').text(m + '/' + y2);
        })
        $('.input-cart-number').on('focus', function () {
            $('.index_banner_card').removeClass('flipped');
        })
        $('.card-expiration-month, .card-expiration-year').change(function () {
            $('.index_banner_card').removeClass('flipped');
        })

        $('.card-ccv').on('focus', function () {
            $('.index_banner_card').addClass('flipped');
        }).on('keyup change', function () {
            $('.card-back .ccv div').html($(this).val());
        });

        //fancyform
        //$('select:not([multiple])').transformSelect({
        //    addDropdownToBody: true
        //});
        //$('select[multiple]').transformSelect({
        //    addDropdownToBody: true,
        //    showFirstItemInDrop: false
        //});
        $('#calculation_btn').bind("click", function () {

            var isSelfMoney = $('input[name="Money"]:checked').val() * 1 === 0;
            var DeMoney = isSelfMoney ? $('#Self_money').val() : $('input[name="Money"]:checked').val();
            var Term = $('input[name="Period"]:checked').val();


            if (DeMoney <= 0 || DeMoney >= 14001 || Term <= 0) {

            }
            else {
                //console.log(isSelfMoney);  
                //console.log(Term);
                showDetail(DeMoney, Term);
            }
            // console.log(`DeMoney:${DeMoney}`);
        });
        //$('select[multiple]').change(function () {
        //    var val = $(this).val();
        //    val = val ? val.toString() : $(this).children('option:first').text();
        //    var $container = $(this).next('.transformSelect').children('li').children('span');
        //    if ($container.length > 0) {
        //        $container.text(val);
        //    } else {
        //        var $prevSpan = $(this).prev('span');
        //        if($prevSpan)
        //            $prevSpan.text(val);
        //    }
        //});
        //$('input.transCheckbox').transformCheckbox({
        //    base: 'class',
        //    trigger: 'parent'
        //});
        $('[data-id="telLink"]').click(function () {
            if (isTouch()) {
                location.href = $(this).data('href');
            } else {
                return false;
            }
        });

        $('[data-id="js-collapse"]').on('click', function () {
            var $this = $(this);
            var $container = $(this).closest('.collapse');
            $this.toggleClass('on');
            $this.next('[data-content="collapse"]').slideToggle(300).toggleClass('open');
            // $container.siblings('.collapse').children('[data-content="collapse"]').slideUp(300).removeClass('open');
            // $container.siblings('.collapse').children('[data-id="js-collapse"]').removeClass('on');
            if ($this.hasClass('on')) {
                setTimeout(function () {
                    var offsetTop = $this.offset().top;
                    $('body, html').animate({ scrollTop: offsetTop - $('header').outerHeight() });
                }, 350);
            }
        }).each(function () {
            if ($(this).hasClass('on')) {
                var $container = $(this).closest('.collapse');
                $(this).next('[data-content="collapse"]').show().addClass('open');
            }
        });
        //fancyradio
        var fancyradio = {
            init: function () {
                $('.fancyRadio').each(function () {
                    var el = $(this);
                    var id = el.find('.fancyRadio__input:checked').attr('id');
                    var $content = $('[data-for="' + id + '"]');
                    if ($content.length) {
                        $('[data-for="' + id + '"]').show();
                        $(this).closest('.fancyRadio').addClass('open');
                    }
                })
            },
            binding: function () {
                $('.fancyRadio__label').click(function () {
                    var $container = $(this).closest('.fancyRadio');
                    var $target = $('[data-for="' + $(this).attr('for') + '"]');
                    var ISchecked = $(this).prev().prop('checked');
                    if (ISchecked) {
                        return false;
                    }
                    $container.siblings('.fancyRadio__content').slideUp(300);
                    $target.slideDown(300);
                    if ($target.length) {
                        $(this).closest('.fancyRadio').addClass('open');
                    } else {
                        $(this).closest('.fancyRadio').removeClass('open');
                    }
                });
            }
        };
        fancyradio.init();
        fancyradio.binding();
        if (!isTouch()) {
            $('input[type="date"]').each(function () {
                $(this).attr('type', 'text');
                $(this).parent().append('<span class="input-group-addon"></span>').datepicker({
                    format: "twy-mm-dd",
                    autoclose: true,
                    language: "zh-TW"
                });
            })
        }
        //form submit
        $('[data-id="submit"]').click(function () {
            $(this).siblings('input[type="submit"]').trigger('click');
        });
        //mobile/pc images resize event
    $(window).on('resize', function () {
        $('[data-img-mobile]').each(function () {
            var el = $(this),
                mobileSrc = $(this).data('img-mobile'),
                PCSrc = $(this).data('img-pc');
            if (Modernizr.mq('(min-width: 768px)')) {
                el.attr('src', PCSrc);
            } else {
                el.attr('src', mobileSrc);
            }
        })
        ////視窗縮放的時候把dropdown縮起來以防止縮放時下拉式選單被擠壓的問題
        //if ($('.transformSelectDropdown').length > 0) {
        //    $('.transformSelectDropdown').each(function (i, elem) {
        //        $(elem).css('display', 'none');
        //    });            
        //}
        ////縮起來時也把下拉選單的外框樣式拿掉
        //if ($('.transformSelect').length > 0) {
        //    $('.transformSelect').each(function (i, elem) {
        //        $(elem).find('li').removeClass('open');
        //    });
        //}
    });
    //.trigger('resize');

        //patchZero
        $('[data-id="patchZero"]').blur(function () {
            var val = $(this).val();
            if (val.length == 6) {
                $(this).val('0' + val);
            }
        });
//--------------------------- /paypage調整加入的程式-----------------------------------------

    
    var ComponentCard_Resize = function(){
        if($(".component_card").length<=0){
            return;
        }

        $(".component_card").each(function(){
            var scope = $(this);
            var maxH = 0;
            var containerW = scope.width();
            var itemW = $("li",scope).eq(0).width();
            var row = Math.floor(containerW / itemW);
            var gap = 25;
            var length = $("li",scope).length;
            $("li",scope).each(function(index){
                var r = index%row;
                // console.log('idx',idx,'r',r);
                if(r == 0 && index > 0){
                    var _start = index-row;
                    var _end = index;
                    // console.log('maxH+gap',maxH+gap)
                    $("li",scope).slice(_start,_end).css("height",maxH+gap);
                    maxH = 0;
                }
                var _h = $(".card_content",$(this)).height()+180;
                if(maxH < _h){
                    maxH = _h;
                }

                if (index == (length - 1)) {
                    var _start = index-r;
                    var _end = index+1;
                    // console.log('maxH+gap',maxH+gap)
                    // console.log('end',_end,'_start',_start,'r',r,maxH)
                    $("li",scope).slice(_start,_end).css("height",maxH+gap);
                }
            })
        })
    }

    var updatePosition = function(){
        var scrollTop = $(document).scrollTop();
        var bodyH = $(document).height();
        var windowH = $(window).height();
        var breakHeaderStickyH = 104;
        var breakBackToTopStickyH = bodyH - 200 - windowH;
        var breakQStickyH = breakHeaderStickyH;
        //
        if(scrollTop>breakHeaderStickyH){
            $("#header").addClass("sticky");
            $(".header_gap").remove();
            $("#header").after("<div class='header_gap' style='padding-top:146px;'></div>");
        }else{
            $("#header").removeClass("sticky");
            $(".header_gap").remove();
        }
        //

        // console.log(scrollTop,bodyH,breakBackToTopStickyH,windowH)

        // if(scrollTop>100 && scrollTop<breakBackToTopStickyH){

        //     if(!$(".back-to-top").hasClass("sticky")){
        //         $(".back-to-top").hide().addClass("sticky").fadeIn("fast");
        //     }
        // }else if(scrollTop>breakBackToTopStickyH || scrollTop < windowH){

        //     if($(".back-to-top").hasClass("sticky")){
        //         $(".back-to-top").removeClass("sticky");
        //     }
        // }

        var a = 100;
        var b = bodyH - windowH - 130;
        var c = bodyH - (scrollTop+windowH);
        if(scrollTop>a && scrollTop < b){
            $(".back-to-top").show().addClass("sticky").css("bottom",15);
            // console.log('show1');
        }else if(scrollTop<a){
            $(".back-to-top").hide()
            // console.log('hide');
        }else if(scrollTop>b){
            $(".back-to-top").show().addClass("sticky").css("bottom",160-c);
            // console.log('show2');
        }


        if(scrollTop>breakQStickyH){
            if(!$("#EcpWebChatEntryButton").hasClass("sticky")){
                $("#EcpWebChatEntryButton").addClass("sticky");
            }
        }else{
            if($("#EcpWebChatEntryButton").hasClass("sticky")){
                $("#EcpWebChatEntryButton").removeClass("sticky");
            }
        }
    }
    function checkMenuOpen(){
        pageId = $(".container").attr("id");
        pageTypeId = $(".container").attr("data-type-id");

        if(pageId !=""){
            // 取得頁面id後，將相對應的側欄選單按鈕加active

            //console.log("#btn_tab_side_menu_"+pageTypeId);
            //console.log("#btn_tab_side_menu_second_"+pageId);
            $(".side_menu").find("#btn_tab_side_menu_"+pageTypeId).addClass("active");
            $(".side_menu").find("#btn_tab_side_menu_second_"+pageId).addClass("active");

            // 第二層展開
            $(".side_menu").find("#btn_tab_side_menu_"+pageTypeId).next().show();

            // 判斷側邊選單是否有第二層
            $(".btn_tab_side_menu").each(function(){
                if($(this).next().hasClass("side_menu_second")){
                    $(this).addClass("btn_tab_side_menu_has_second");
                }
            });
        }else if($(".container").hasClass("has_tag_btn")){
            urlName = window.location.href.split("#")[1];
            urlID = urlName.replace(/-/, "_");
            $(".container").attr("id", pageTypeId + "_" + urlID);

            // 取得頁面id後，將相對應的側欄選單按鈕加active
            $(".side_menu").find("#btn_tab_side_menu_"+pageTypeId).addClass("active");
            $(".btn_tab_side_menu_second").removeClass("active");
            $("#btn_tab_side_menu_second" + "_" + pageTypeId + "_" + urlID ).addClass("active");

            // 第二層展開
            $(".side_menu").find("#btn_tab_side_menu_"+pageTypeId).next().show();


            $(".btn_tab").click(function(){
                var btnTabID = $(this).attr("id");
                var btnTabName = btnTabID.substr(7,btnTabID.length);
                $(".container").attr("id", pageTypeId + btnTabName);
                $(".btn_tab_side_menu_second").removeClass("active");

                checkMenuOpen();
            });
        }
        
    }
    checkMenuOpen();


    if (ie_version !== false) {
      if (ie_version < 10) {
        // ie8.9 表單要placeholder
        if(typeof $.fn.placeholder != 'undefined'){
            $("input, textarea").placeholder();
        }
        
        // ie8.9 文字text-shadow
        if(typeof $.fn.ieTextShadow != 'undefined'){
            $(".text_shadow").ieTextShadow();
        }
      }
    }

    // lightbox 捲軸
    /*$(".body_lightbox").mCustomScrollbar({
        scrollButtons:{
            enable:true
        }
    });*/

    // lightbox
    $(".fancybox").fancybox({

    });
            
    //$(".btn_fancybox_close").click(function(){
    //    $.fancybox.close(); 
    //    return false;
    //});

  



    /************************/
    /* setup main menu
    /************************/

    $("ul.first-level").addClass('column-' + $("ul.first-level>li").not('.border').length);
    //
    //
    $("ul.first-level>li").each(function () {
        if (!$(this).hasClass('.border')) {

            var len = Math.ceil($(this).find(".sf-sub li").length / 3);

            $(this).find(".sf-mega").addClass('column-' + len);

            if ($(this).find('figure.menu-banner').length > 0) {
                $(this).find(".sf-mega").addClass('hasBanner');
            }

            if ($(this).find(".sf-sub").length > 0) {
                //
                var $ul = $(this).find(".sf-sub");
                var $lis = $(this).find(".sf-sub").find('li');
                var length = $lis.length;
                //pull them off

                //make your new ul, to put the dom elements in
                for (var i = 0; i < len - 1; i++) {
                    //console.log(i*3,3);
                    var $last6lis = $($lis.splice(0, 3)).remove();

                    // console.log($last6lis);
                    var $newUl = $('<ul class="sub column-' + i + '"></ul>');
                    $ul.before($newUl.html($last6lis));
                }
                $ul.addClass('column-' + len);
                $ul.removeClass('sf-sub');
                $ul.addClass('sub');
                //html+='</ul>';
                //
            }

        }

        if ($(this).find('>a').length > 0) {

            var menu_w = $(this).outerWidth();

            var submenu_w = $(this).find(".sf-mega").outerWidth(true);

            var diff_menu_submenu_w = submenu_w - menu_w;
            var pos_x = $(this).offset().left - $(this).parent().offset().left;

            $(this).find(".sf-mega").css('left', -1);
            if (submenu_w + pos_x > $("#sub-menu .center").width()) {
                $(this).find(".sf-mega").css('right', -2).css('left', 'auto');
                if (diff_menu_submenu_w > pos_x) {
                    if (diff_menu_submenu_w / 2 + pos_x + menu_w > $("#sub-menu .center").width()) {
                        var add = diff_menu_submenu_w / 2 + pos_x + menu_w - $("#sub-menu .center").width();
                        $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2 - add);
                    } else if (pos_x - diff_menu_submenu_w / 2 < 0) {
                        var add = diff_menu_submenu_w - pos_x;
                        $(this).find(".sf-mega").css('left', -pos_x + 1);
                    } else {
                        $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2);
                    }
                }
            }
        }
    })

    //


    /************************/
    /* footer
    /************************/

    $(".back-to-top a").click(function () {
        TweenMax.to(window, .5, { scrollTo: { y: 0, ease: Sine.easeOut } });
    });

    $("#sitemap-open").click(function () {
        $(this).toggleClass('ed');
        if ($('.href-list').is(':not(:visible)')) {
            $('.href-list').slideDown(750);
        } else {
            $('.sitemap .href-list').slideUp(350);
        }

    });

    //$(window).bind("scroll", function (e) {
        //updatePosition();

    //});
    //----------------------------------------paypage 調整加入程式---------------------------
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > 100) {
            $('.gotop').fadeIn();
        } else {
            $('.gotop').fadeOut();
        }
    }).trigger('scroll');
    $('.gotop').click(function () {
        $('body,html').animate({ 'scrollTop': 0 })
    });
    //----------------------------------------paypage 調整加入程式---------------------------

    /* fix for ie8 */
    /*    if ($(".lt-ie9").length > 0) {
        setTimeout(function(){$("#sub-menu .first-level li .sf-mega").each(function (i, d) {
            d = $(d);
            var w = 1 + d.parent().outerWidth(); d.parent().css('padding-left').replace(/px|inherit|auto/, '') * 1 + d.parent().css('padding-right').replace(/px|inherit|auto/, '') * 1;
            var i = $("<i class='border-mask' />");
            i.width(w);
            i.appendTo(d.parent())
        });},1000)

    }*/

    ComponentCard_Resize();

    $("html").addClass("laptop-ver");


    
    /* side menu open, add by wan */
    var _tempSideMenu = null;
    $('.side_menu .btn_tab_side_menu_has_second').click(function (e) {
        var _link = $(this);
        var href = _link.attr('href');
        if (href == '' || href == '#') {
            e.preventDefault();

            if (_tempSideMenu) {
                _tempSideMenu.hide();
                _tempSideMenu = null;
            }
            
            _tempSideMenu = _link.siblings('ul.side_menu_second');
            _tempSideMenu.show();
        }
    });
});