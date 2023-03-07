//side menus
$(function(){
    var menu = $(".side-menu__list");
    var navDepth1 = menu.find(" > li");

    navDepth1.each(function() {
        var thisLength = $(this).find("> ul").length;
        if(thisLength){
            $(this).addClass("has-children");
        }
    });

    navDepth1.find(" > a").on("click",function(event){
        var thisItem = $(this).parent("li"),
            thisLength = $(this).next("ul").length;
        if(thisLength){
            event.preventDefault();
            if (!thisItem.hasClass("active")){
                navDepth1.not(thisItem).find(".side-menu__depth2").slideUp();
                navDepth1.not(thisItem).removeClass("active");
                $(this).siblings().slideDown();
                $(this).parent().addClass("active");
            }  else {
                $(this).siblings().slideUp();
                $(this).parent().removeClass("active");
            }
        }
    });
});



//side tab
$(function(){
    var sideTab = "[data-button='sidetab']";
    $(document).on("click", sideTab, function (e) {
        e.preventDefault();
        $(sideTab).each(function () {
            var $this       = $(this),
                options = $(this).data(),
                $target = $(options.target);
            $this.removeClass("active");
            $target.removeClass("active");
        });

        var $element       = $(this),
        options = $(this).data();
        isActive = $element.hasClass("active");
        if (isActive){
            return;
        }
        $element.addClass("active");
        $(options.target).addClass("active");

    });
});

//content width
$(function(){
    var resizeContent =  {
        body : $(".container"),
        button : $(".sub-content__wrap .side-close"),
        activeClass : "resize-content"
    };
    resizeContent.button.on("click", function () {
        resizeContent.body.toggleClass( resizeContent.activeClass );
        $(this).toggleClass("open");
        var openYn = $(this).is(".open") == true ? true : false;
        $.cookie('EXTER_SIDEMENU_OPEN_YN',openYn,{ path : '/' });
    });
});



//달력 픽커 :: calendar picker 
$(document).ready(function(){
    $('.datepicker').each(function(){
        $(this).datepicker({
            showOn: "both",
            buttonImage: "/images/calendar.png",
            buttonImageOnly: false,
            buttonText: "Choose",
            changeMonth: true,
            changeYear: true,
        });

    });

/*
const divMainElem = document.querySelector('div.main-content__wrap');
const resizeMainObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      if($('.main-content__wrap').height()+100 > $('.side').height()) {
        $('.footer').css('position','static');
        $('.side').height($('.main-content__wrap').height()+120);
      } else {
        // console.log('.side Main height default');
      }
    } else {
      // console.log('entry.contentBoxSize1 else...');
    }
  }
});
if(divMainElem != null) resizeMainObserver.observe(divMainElem);

const divElem = document.querySelector('article');
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      if($('article.sub-content').height()+100 > $('.side').height()) {
        $('.footer').css('position','static');
        $('.side').height($('article.sub-content').height()+70);
      } else {
        // console.log('.side SubPage height default');
      }
    } else {
      // console.log('entry.contentBoxSize2 else...');
    }
  }
});
if(divElem != null) resizeObserver.observe(divElem);
*/

});

/* new Left Menu lnb */
(function($){

  var lnbUI = {
    click : function (target, speed) {
      var _self = this,
          $target = $(target);
      _self.speed = speed || 300;

      $target.each(function(){
        if(findChildren($(this))) {
          return;
        }
        $(this).addClass('noDepth');
      });

      function findChildren(obj) {
        return obj.find('> ul').length > 0;
      }

      $target.on('click','a', function(e){
          e.stopPropagation();
          var $this = $(this),
              $depthTarget = $this.next(),
              $siblings = $this.parent().siblings();

        $this.parent('li').find('ul li').removeClass('on');
        $siblings.removeClass('on');
        $siblings.find('ul').slideUp(250);

        if($depthTarget.css('display') == 'none') {
          _self.activeOn($this);
          $depthTarget.slideDown(_self.speed);
        } else {
          $depthTarget.slideUp(_self.speed);
          _self.activeOff($this);
        }

      })

    },
    activeOff : function($target) {
      $target.parent().removeClass('on');
    },
    activeOn : function($target) {
      $target.parent().addClass('on');
    }
  };

  // Call lnbUI
  $(function(){
    lnbUI.click('#lnb li', 300)
  });

}(jQuery));

// Window resize event
(function() {

  window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();

       // The actualResizeHandler will execute at a rate of 15fps
       }, 66);
    }
  }

  var fwQuickVal = 0;
  function actualResizeHandler() {
    // handle the resize event
    if($("#fwQuick").length) {
      var offset = $("#fwQuick").offset();
      $("#fwQuick-modal").css({
           "top" : offset.top+32,
           "left" : offset.left-300
      });
    }
    if($(document).width() < 993) {
        if($("#fwQuick-modal").css('display') != 'none') {
            $("#fwQuick-modal").hide();
            fwQuickVal = 1;
        }
    }
    if($(document).width() > 992) {
        if(fwQuickVal == 1) {
            $("#fwQuick-modal").show();
            fwQuickVal = 0;
        }
    }
  }

}());