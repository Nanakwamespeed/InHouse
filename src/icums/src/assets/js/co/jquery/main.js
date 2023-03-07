$(document).ready(function(){
    //비주얼 팝업 :: visual pop up
    $visual = $(".visual");
    $visual_list = $visual.find(".visual__list");
    $visual_autoplay = true;

    $visual_list.on('init', function(event, slick){
        var $items = slick.$dots;
        var addTag = "<li class=\"autoplay\"><button type=\"button\" class=\"pause\">pause visual</button></li>";
        addTag += "<li class=\"autoplay\"><button type=\"button\" class=\"play\">play visual</button></li>";
        $items.append(addTag);
    });


    $visual_list.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay:true,
        autoplaySpeed: 3000,
        fade: false,
        variableWidth: true,
        prevArrow : $visual.find('.prev'),
        nextArrow : $visual.find('.next'),
        dots: true,
        dotsClass: 'visual__dots',
        responsive: [
            /* {
                 breakpoint: 1200,
                 settings: {
                     slidesToShow: 1,
                     autoplay:false,
                 }
             },*/

        ]
    });

    $visual_pause = $visual.find(".pause");
    $visual_play = $visual.find(".play");
    $visual_play.hide();

    $visual_pause.on('click', function() {
        $visual_pause.hide();
        $visual_play.show().focus();
        $visual_list
            .slick('slickPause')
            .slick('slickSetOption', true);
    });
    $visual_play.on('click', function() {
        $visual_pause.show().focus();
        $visual_play.hide();
        $visual_list
            .slick('slickPlay')
            .slick('slickSetOption', true);
    });
});

$(document).ready(function(){
    //공지사항영역 :: announcement details area
    tabOn('.news',1,'text');
});


//팝업존 :: pop up zone 
$(document).ready(function(){
    $popup = $(".popup");
    $popup_list = $popup.find(".popup__list");
    $popup_autoplay = true;
    $popup_list.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay:true,
        autoplaySpeed: 9000,
        prevArrow : $popup.find('.prev'),
        nextArrow : $popup.find('.next'),
        draggable: false,

    });

    $popup_pause = $popup.find(".pause");
    $popup_play = $popup.find(".play");
    $popup_pause.on('click', function() {
        $popup_list
            .slick('slickPause')
            .slick('slickSetOption', true);
    });
    $popup_play.on('click', function() {
        $popup_list
            .slick('slickPlay')
            .slick('slickSetOption', true);
    });
});


/* shortcuts */
$(document).ready(function(){
    $shortcuts = $(".shortcuts");
    $shortcuts_list = $shortcuts.find(".shortcuts__list");
    $shortcuts_list.slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: false,
        //variableWidth: true,
        responsive: [
            {
                breakpoint: 9999,
                settings: 'unslick',
            },
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true,
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                }
            }
        ]
    });
    $(window).on("resize orientationchange", function(){
        var mq = window.matchMedia( "(max-width: 641px)" );
        var st = $shortcuts.find(".shortcuts__list").hasClass("slick-initialized");
        if(mq.matches && !st){
            $shortcuts_list.slick('init');
        }
        if(mq.matches){
            $shortcuts_list.slick('resize');
        }
        if(!mq.matches && st){
            $shortcuts_list.slick('resize');
        }
    });
});

$(function(){
    $(document).on('click', '.shortcuts__item', function(){
        $(".shortcuts__item").removeClass("active");
        target = $(this).closest(".shortcuts__item");

        if(target.hasClass("active")){
            target.removeClass("active")
        } else{
            target.addClass("active")
        }
    });
    $(".shortcuts").on("mouseleave",function () {
        $(".shortcuts__item").removeClass("active")
    });
    $(".sitelink select, .popup a, .popup button").on("focus",function () {
        $(".shortcuts__item").removeClass("active")
    });
});

/* 사이트 이동 :: move site */
$(".sitelink .sitelink__go").on("click",function(){
    var link = $(".sitelink__select option:selected").val();
    if(link){
        window.open(link, '_blank');
    } else{
        alert("select site");
    }
});

$(function(){
       var btn = function (element) {
           this.element = $(element);
       };
         $(".main-login__link.readonly").on("click", function (k) {
           k.preventDefault();

       });
    });
