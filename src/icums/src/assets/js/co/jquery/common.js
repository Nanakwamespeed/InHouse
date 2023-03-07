var brakepoint_wide = 1210,
    brakepoint_web = 992,
    brakepoint_tablet = 810,
    brakepoint_mobile = 640;

var dragScrolls = function(el, options) {
    $element            = $(el);
    this.element        = el;
    this.options        = options;

    last_known_scroll_position = 0;
    ticking = false;

    this.pnLeft = $element.find(".nav__button.nav__prev");
    this.pnRight = $element.find(".nav__button.nav__next");
    this.pnWrap = $element.find(".nav__tab-body");
    this.pnContents = $element.find(".nav__group");


    this.pnLeft.on("click", $.proxy(this.Left, this));
    this.pnRight.on("click", $.proxy(this.Right, this));
    this.pnContents.on("transitionend", $.proxy(this.transitionContents, this));
    this.apply();

};

dragScrolls.DEFAULTS = {
    navBarTravelling: false,
    navBarTravelDirection: "",
    navBarTravelDistance: 150,

};

dragScrolls.prototype.apply = function() {
    $(this.pnWrap).scrollLeft(0);
    $(this.pnContents).css('transform' , 'translateX(0px)');
    this.setWidth();
    this.pnWrap.attr("data-overflowing", this.determineOverflow(this.pnContents, this.pnWrap));
};


dragScrolls.prototype.Left = function() {

	var resolution = 1024
	var windowWidth =  $(window).width();
	var windowHeight = $(window).height();

	if(windowWidth == resolution || windowHeight == resolution){
		this.options.navBarTravelling = false;
	}

    if (this.options.navBarTravelling === true) {
        return;
    }
    if (this.determineOverflow(this.pnContents, this.pnWrap) === "left" || this.determineOverflow(this.pnContents, this.pnWrap) === "both") {
        var availableScrollLeft = $(this.pnContents).offset().left;
        var scrollLeft = ($(this.pnContents).offset().left + this.options.navBarTravelDistance);

        if ( -(availableScrollLeft) < this.options.navBarTravelDistance) {
            $(this.pnContents).css('transform' , 'translateX(0px)');
        } else {
            $(this.pnContents).css('transform' , 'translateX(' + scrollLeft + 'px)');
        }
        this.pnContents.removeClass("nav-no-transition");
        this.options.navBarTravelDirection = "left";
        this.options.navBarTravelling = true;
    }

};

dragScrolls.prototype.Right = function() {

	var resolution = 1024
	var windowWidth =  $(window).width();
	var windowHeight = $(window).height();

	if(windowWidth == resolution || windowHeight == resolution){
		this.options.navBarTravelling = false;
	}

    if (this.options.navBarTravelling === true) {
        return;
    }
    if (this.determineOverflow(this.pnContents, this.pnWrap) === "right" || this.determineOverflow(this.pnContents, this.pnWrap) === "both") {
        var navBarRightEdge = this.pnContents[0].getBoundingClientRect().right;
        var navBarScrollerRightEdge = this.pnWrap[0].getBoundingClientRect().right;

        var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);

        var scrollRight;
        if (availableScrollRight < this.options.navBarTravelDistance ) {
            scrollRight = ($(this.pnContents).offset().left - availableScrollRight);
            $(this.pnContents).css('transform' , 'translateX(' + scrollRight + 'px)');

        } else {
            scrollRight = ($(this.pnContents).offset().left - this.options.navBarTravelDistance);
            $(this.pnContents).css('transform' , 'translateX(' + scrollRight + 'px)');
        }

        this.pnContents.removeClass("nav-no-transition");
        this.options.navBarTravelDirection = "right";
        this.options.navBarTravelling = true;
    }
};

dragScrolls.prototype.transitionContents = function() {
    var styleOfTransform = window.getComputedStyle(this.pnContents[0], null);
    var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");

    $(this.pnContents).addClass("nav-no-transition");

    this.pnWrap.attr("data-overflowing", this.determineOverflow(this.pnContents, this.pnWrap));

    this.options.navBarTravelling = false;
};

dragScrolls.prototype.determineOverflow = function(content, container) {
    var containerMetrics = container[0].getBoundingClientRect();
    var containerMetricsRight = Math.floor(containerMetrics.right);
    var containerMetricsLeft = Math.floor(containerMetrics.left);
    var contentMetrics = content[0].getBoundingClientRect();
    var contentMetricsRight = Math.floor(contentMetrics.right);
    var contentMetricsLeft = Math.floor(contentMetrics.left);


    if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
    } else if (contentMetricsRight > containerMetricsRight) {
        return "right";
    } else {
        return "none";
    }
};

dragScrolls.prototype.setWidth = function() {
    if ($(window).width() > brakepoint_web) {
        var pathRealWidth = $element.find(".nav__list").outerWidth();
        this.pnContents.css("width", pathRealWidth);
    } else{
        this.pnContents.css({
            "width" : "",
            "transform" : ""
        });
        this.pnContents.removeClass("nav-no-transition");

    }
};

function dragScrollsPlugin(option){
    var $this = $(this);
    var data  = $this.data("dragscrolls");
    var options = $.extend({}, dragScrolls.DEFAULTS, $this.data(), typeof option === 'object' && option);
    if (data) $this.data('dragscrolls', (data = new dragScrolls(this, options)));
    if (typeof option === 'string') data[option]()

}
$.fn.DragScrolls       = dragScrollsPlugin;

$(window).on("load resize",function(){
    $("[data-dragscrolls='dragscrolls']").each(function () {
        var $this = $(this);   //버튼::button
        var option = $this.data();
        dragScrollsPlugin.call($this, option);
    });
});


var webMenu = function () {
    $(".depth2, .depth3, .depth4").hide();
    $(".nav__wrap, .nav__backdrop").css("right","");

    var webNavList = $(".navigator .nav__list");
    webNavList.find("ul").css("display", "");
    webNavList.find(" a").off();

    function depthReset(){
        webNavList.find(" > li").css("height", "");
        webNavList.find(" a ").removeClass("active");
        webNavList.find(" ul ").css("display", "");
    }

    webNavList.find(" > li > a").on('click',function(event){
        depthReset();
        var depth2_has = $(this).siblings("ul").length;
        if(depth2_has > 0){
            event.preventDefault();
        }
        var webOpen=$(this).hasClass('active');
        if(webOpen !== true){
            depthReset();
            $(this).siblings("ul").show();
            $(this).addClass("active");
            var itemHeight = $(this).siblings(".depth2").find("> li").length;
            itemHeight = (itemHeight * 30) + 53;
            $(this).parent("li").css("height", itemHeight + 50);
        }
    });

    webNavList.find(" > li").on('mouseleave',function(event){
        depthReset();
    });
};

var mobileMenu = function () {
    var navList = $(".navigator .nav__list"),
        depth1 = navList.find(".nav__item");
        navList.find(" a ").removeClass('active').off();
        navList.find(" > li").off();
        navList.find("ul").css("display", "");
        navList.find(" > li").css("height", "");

    navList.find(" a ").on('click',function(event){
        var depth_has = $(this).siblings("ul").length;

        if(depth_has > 0){
            event.preventDefault();
        }
        var m_open=$(this).hasClass('active');
        if(m_open === true){
            $(this).siblings().stop().slideUp();
            $(this).removeClass('active');
            $(this).siblings("ul").find("ul").hide();
            $(this).siblings("ul").find(".active").removeClass('active');

        }else{
            var depthFist= $(this).parent("li").hasClass("nav__item");
            if(depthFist){
                depth1.find("> ul").stop().slideUp();
                depth1.find("a").removeClass('active');
                depth1.find("ul").hide();
            }
            $(this).siblings().stop().slideDown();
            $(this).addClass('active')
        }
    });
};

var mobileMenuControl = function () {
    var lnb = $('.nav__wrap, .nav__backdrop'),
        mobileMenuOpen      = $('.nav__m-button .open'),
        mobileMenuClose     = $('.nav-close .close'),
        ////mobileMenuBackdrop  = $('.nav__backdrop'),
        bodyFrame           = $( 'body, html' );

    mobileMenuStaus=false;

    mobileMenuOpen.click(function() {
        lnb.addClass("active");
        lnb.animate({ right : 0 },  500);
        //mobileMenuBackdrop.animate(  { right : 0 },  500);
        bodyFrame.css("overflow",'hidden');
    });
    mobileMenuClose.click(function() {
        lnb.removeClass("active");
        lnb.animate({ right : -150 + "%" },  500);
        //mobileMenuBackdrop.animate(  { right : -150 + "%" },  500);
        bodyFrame.css('overflow', '' );
        lnb.find(".nav__list").find('a').removeClass("active");
        lnb.find(".nav__list").find(" ul ").css("display", "");
    });
};


function menuFunction(){
    if(window.matchMedia("(min-width: "+ brakepoint_web +"px)").matches){
        if(menuStaus !== "web"){
            webMenu();
            menuStaus = "web";
        }
    }else{
        if(menuStaus !== "mobile"){
            mobileMenu();
            menuStaus = "mobile";
        }
    }
}

var menuStaus;
window.addEventListener('DOMContentLoaded', function(){
    mobileMenuControl();
    menuFunction();
});
window.addEventListener('resize', menuFunction);
window.addEventListener('orientationchange', menuFunction);



// 메인공지사항 탭 :: main announcements tab
function tabOn(tab,num,img) {
    var $tab,$tab_btn;
    var tabid=tab, n=num-1, btn_img=img;

    $tab = $(tabid+'> ul > li');
    $tab_btn = $(tabid+'> ul > li > a');

    $tab_btn.siblings().hide();
    $tab.eq(n).addClass('active');
    $tab.eq(n).children('a').siblings().show();

    if(btn_img =='img'){
        var btn = $tab.eq(n).children('a').find("img");
        btn.attr("src",btn.attr("src").replace("_off","_on"));
    }

    $tab_btn.on("click",function(event){
        var realTarget = $(this).attr('href');

        if(realTarget != "#"){
            return
        }
        if(btn_img =='img'){
            for(var i=0;i<$tab.size();i++){
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src",btn.attr("src").replace("_on","_off"));
            }
            var active = $(this).parent().attr('class');
            if(active != 'active'){
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src =  btn_img_off.src.replace('_off','_on');
            }
        }
        $tab_btn.siblings().hide();
        $tab_btn.parent().removeClass('active');

        $(this).siblings().show();
        $(this).parent().addClass('active');

        event.preventDefault();
    });
}



/**
 * dropdown
 */

var toggle   = "[data-button='dropdown'], [data-dropdown='true']";
var Dropdown = function (element) {
    $(element).on("click.p-dropdown", this.toggle);
};

Dropdown.prototype.toggle = function (e) {
    var $parent  = $(this).parent(),
        options = $(this).data(),
        isActive = $parent.hasClass("open");
    dropdownClear();
    if (options.position && !$parent.hasClass(options.position)){
        $parent.addClass(options.position);
    }
    if (options.arrow && !$parent.hasClass("arrow")){
        $parent.addClass("arrow");
    }
    if (options.width){

        var width_target = options.width_target;
        if(!options.width_target){
            width_target = "p-dropdown__list";
        }
        $parent.find("." + width_target).css("width", options.width);
    }
    if (!isActive) {
        if (e.isDefaultPrevented()) { return; }
        $parent.toggleClass("open");
        if(options.target){
            $(options.target).toggleClass("open");
        }
    }
    return false;
};

/**
 * clear
 */
function dropdownClear() {
    $(toggle).each(function () {
        var $parent       = $(this).parent(),
            options = $(this).data(),
            relatedTarget = { relatedTarget: $(this) },
            $target = $(options.target);
        if (!$parent.hasClass("open")) { return; }
        if (!$target.hasClass("open")) { return; }
        $parent.removeClass("open").trigger("hidden.dropdown", relatedTarget);
        $target.removeClass("open");
    });
}

$(document)
    .on("click.p-dropdown", dropdownClear)
    .on("click.p-dropdown", toggle, Dropdown.prototype.toggle);



//TabMenu
$(function(){
    var tab = function (element) {
        this.element = $(element);
    };
    tab.prototype.show = function () {
        var $this    = this.element,
            $ul      = $this.closest("ul"),
            $target,
            $targetGroup,
            selector = $this.attr("href");
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""); // strip for ie7

        if ($this.parent("li").hasClass("active")) {
            return;
        }
        $target = $(selector);
        $targetGroup = $(selector).parent().closest("div");

        this.activate($this.closest("li"), $ul, "> .active");
        this.activate( $target, $targetGroup, ".active");
    };

    tab.prototype.activate = function (element, container, cts) {
        var $active    = container.find(cts);
        if ($active.hasClass("g-tab__body--slide")) {
            $active
                .stop()
                .hide()
//                .attr("title","hide")
                .removeClass("active")
                .end();
            element
                .stop()
//                .attr("title","open")
                .slideDown(500, function () {
                    $(this).addClass("active");
                });
        }
        else if ($active.hasClass("fade")) {
            $active
                .stop()
                .hide()
//                .attr("title","hide")
                .removeClass("active")
                .end();
            element
                .stop()
//                .attr("title","open")
                .fadeIn(300, function () {
                    $(this).addClass("active");
                });
        }
        else {
            $active
                .removeClass("active")
//                .attr("title","hide")
                .end();
            $active
                .removeClass("open");
            element
                .addClass("active")
//                .attr("title","open")
                .addClass("open");
                /*.children(".table-responsive").addClass("active");*/
        }
    };

    $(document).on("click", "[data-button='tab']", function (e) {
        if( !$(this).data("url") ){
            e.preventDefault();
            $(this).each(function () {
                var $this, data, option;
                $this = $(this);
                data = $this.data("tab");
                option = "show";
                if (!data) {
                    $this.data("tab", (data = new tab(this)));
                }

                if (typeof option === "string") {
                    data[option]();
                }
                this.options = $this.data();
                if(this.options.dropdown){
                    Dropdown(); // tab 내  dropdown 실행 :: proceed dropdown
                }
            });
        }
    });
});



//모달 :: modal
$(function() {
  var Modal = function(btn, options) {
      this.options            = options;
      this.$body              = $(document.body);
      this.$button            = $(btn);
      this.href = this.$button.attr("href");
      this.$element           = $(this.options.target || (this.href && this.href.replace(/.*(?=#[^\s]+$)/, ""))); //button-target or a href
      this.backdropselector   = "modal__backdrop";
      this.widthtselector    = "modal__body";
      this.heightselector    = "modal__content";
      this.isShown            = null;
      if (this.options.title) {
          this.$element
              .find('.modal__title')
              .html(this.options.title);
      }
  };

  Modal.DEFAULTS = {
      backdrop    : true,
      show        : true,
      keyboard    : true,
      width: 600
  };

  Modal.prototype.show = function () {
      var element = this.$element,
          modalBtn = this.button,
          modalBodyWidth = this.options.width;

      var e    = $.Event('show.modal');
      this.$element.trigger(e);

      this.isShown = true;
      this.$body.addClass("modal__open");
      $("html").addClass("modal__open");


      //크기 조정 및 보이기 :: show and adjust the size 
      this.setSize();
      element.show();

      var transition = element.hasClass("fade");
      if (transition) {
          element[0].offsetWidth; // force reflow
      }

      element.addClass("active");

      //모달 뒤 검은 배경 :: black background behind the modal
      if(this.options.backdrop){
          this.backdrop();
      }


      //닫기 버튼 :: close button
      element.on('click.close', '[data-close=\'modal\']', $.proxy(this.hide, this));

      $(document)  //  모달 포커스 이동 :: move modal focus
          .off("focusin.modal") // guard against infinite focus loop
          .on("focusin.modal", function (e) {
              if (element[0] !== e.target && !element.has(e.target).length) {
                  element.trigger("focus");
              }
          });

      this.escape();

      //브라우저 리사이즈 :: browser resize
      this.resize();
  };

  Modal.prototype.hide = function(e){
      var element = this.$element,
          backdrop = "." + this.backdropselector,
          modalbtn = this.$button;

      e = $.Event('hide.modal');
      this.$element.trigger(e);

      this.isShown = false;

      if (e) e.preventDefault();
      element.hide().removeClass("active");
      $(document.body).removeClass("modal__open");
      $("html").removeClass("modal__open");

      element.find(backdrop).remove();
      modalbtn.trigger("focus");
      this.escape()
      //this.resize()
  };





  //검은 배경 :: black background 
  Modal.prototype.backdrop = function(){
      var element = this.$element,
          backdrop = $("<div class='" + this.backdropselector + "'></div>")
              .prependTo(element)
              .css("height", 0)
              .css("height", element[0].scrollHeight)
              .on("click", $.proxy(this.hide, this));

  };
  Modal.prototype.adjustBackdrop = function () {
      this.$element.find("."+this.backdropselector)
          .css('height', 0)
          .css('height', this.$element[0].scrollHeight)
  };
  Modal.prototype.setSize = function (width, height) {
      var element = this.$element,
          modalWidth = this.options.width,
          modalHeight = this.options.height;

      if( modalWidth > $(window).width() ){
          modalWidth = $(window).width() - 50;
      }
      element.find("." + this.widthtselector).css({
          width : modalWidth
      });

      if(modalHeight){
          element.find("." + this.heightselector).css({
              height : modalHeight
          });
      }
  };

  Modal.prototype.resize = function(){
      if (this.isShown) {
          $(window).on('resize.modal', $.proxy(this.adjustBackdrop, this))
      } else {
          $(window).off('resize.modal')
      }
  };

  Modal.prototype.escape = function () {

      if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup', $.proxy(function (e) {
              e.which == 27 && this.hide()
          }, this))
      } else if (!this.isShown) {
          this.$element.off('keydown')
      }
  };

  function modalPlugin(option){
      return this.each(function(){
          var $this = $(this);
          var data  = $this.data("modal");
          var href = $this.attr("href");
          var $target = $($this.attr("data-target") || (href && href.replace(/.*(?=#[^\s]+$)/, ""))); // strip for ie7

          var options = $.extend({remote: !/#/.test(href) && href }, Modal.DEFAULTS, $this.data(), $target.data(), typeof option === 'object' && option);
          if (!data) {
              $this.data("modal", (data = new Modal(this, options)));
          }
          //console.log(typeof option);

          if (typeof option === "string") {
              data[option]()
          }
          else if (options.show) {
              data.show()
          }
      });
  }

  function modalRemotePlugin(option){
      var $this = $(this);
      $.get(option.remote, function (data) {
          // $(option.target).addClass("loaded");

          checkData = data.split("\n");
          var contains = (checkData.indexOf("<body>") > -1);

          if(contains){
              data =  /<body[\s\S]*?>([\s\S]*?)<\/body>/.exec(data)[1];
          }
          //$(option.target + " .modal__content").html(data);
          $(option.container).html(data);
          $(option.target).addClass("loaded");
          modalPlugin.call($this, option);
      });
  }


  $.fn.madalPop             = modalPlugin;
  $.fn.madalRemotePop             = modalRemotePlugin;


  $(document).ready(function(){
      $(document).on("click.modal", "[data-button='modal']",function(e){
          e.preventDefault();
          var $this = $(this);   //버튼 :: button
          var option = $this.data();

          if ($this.is("button") || $this.is("a")) {
              e.preventDefault();
          }

          if(option.remote && !$(option.target).hasClass("loaded")){
              modalRemotePlugin.call($this, option);
          } else{
              modalPlugin.call($this, option);
          }
      });
  });

});



//table responsive
$(function() {
    var tableElement = function(table, options){
        var setDefault = {
            tabletype: "scroll",
            breakparent : "#container",
            addheadelement : "add-head",
            addwrapclass : "table-responsive",
            target: window,
            breakpoint : 640,
            breakstatus : false
        };
        this.element = $(table);
        this.options = $.extend({},setDefault,options);

        this.element.addClass(this.options.tabletype);
        this.$target = $(this.options.target)
            .on("resize", $.proxy(this.tableCheck, this));
        this.tableCheck();
    };

    tableElement.prototype.getState = function() {
        if($(window).innerWidth() > this.options.breakpoint){
            return "notRwd";
        } else {
            return "applyRwd";
        }
    };

    tableElement.prototype.getWidth = function() {
        this.element
            .css("width", this.options.breakpoint)
            .closest("." + this.options.addwrapclass).addClass("active")
            .addClass("mobile");
        this.options.breakstatus = true;
    };
    tableElement.prototype.removeWidth = function() {
        this.element
            .css("width", "")
            .closest("." + this.options.addwrapclass).removeClass("active")
            .removeClass("mobile");
        this.options.breakstatus = false;
    };

    tableElement.prototype.getWrap = function(classname) {
        var wrapElement = this.element,
            wrapClassName =  classname,
            addClassTarget;
        if(!wrapClassName) {
            wrapClassName = this.options.addwrapclass;
        }
        addClassTarget = wrapElement.closest("." + wrapClassName);
        if(!addClassTarget[0]) {
            wrapElement.wrap("<div class='" + wrapClassName + "' />");
        }
    };

    tableElement.prototype.getIcon = function() {
        addClassTarget = this.element.closest("." +this.options.addwrapclass);
        var hasClassName = this.hasClassName(addClassTarget, this.options.scrollguide);

        if(this.options.scrollguide ){
            var scrollBottomPosition =  ( this.element.offset().top  - $(window).outerHeight() ) <= $(window).scrollTop(),
                scrollTopPosition =   this.element.offset().top >= $(window).scrollTop();

            if (scrollBottomPosition && scrollTopPosition ) {
                if(!hasClassName){
                    addClassTarget
                        .removeClass("bounceout")
                        .addClass("bouncein " + this.options.scrollguide);
                    //아이콘 표시후 숨기기 :: hide after showing icon 
                    bounceTime = setTimeout($.proxy(function(){
                        this.bounceIcon();
                    }, this),3000);
                }
            }else{
                this.removeIcon()
            }
        }
    };
    tableElement.prototype.bounceIcon = function() {
        addClassTarget = this.element.closest("." +this.options.addwrapclass);
        if(this.options.scrollguide){
            addClassTarget
                .removeClass("bouncein")
                .addClass("bounceout");
        }
    };

    tableElement.prototype.removeIcon = function() {
        if(this.options.scrollguide){
            addClassTarget = this.element.closest("." +this.options.addwrapclass);
            var hasClassName = this.hasClassName(addClassTarget, this.options.scrollguide);
            if(hasClassName){
                addClassTarget.removeClass(this.options.scrollguide);
            }

        }
    };

    tableElement.prototype.hasClassName = function(el, className) {
        var name = el.hasClass(className);
        return name;
    };

    tableElement.prototype.getSimple = function() {
        var trs = this.element.find('tr');
        var trsChild;
        var grid = {};
        var cells;


        trs.each(function(index,item){
            if (!grid[index]) {
                grid[index] = {};
            }
            trsChild = item.childNodes;
            cells = 0;
            for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
                if(trsChild[index]){
                    grid[index][cells++] = trsChild[j];
                }

            }
            var tds = $(item).find("td");
            tds.wrapInner( "<span class='tds'></span>")  //셀내용 span 감싸기 :: cover span of the cell content 
        });

        var cellHeader = "";
        for (row in grid) {
            if (row == 0) {
                continue;
            }
            for (cell in grid[row]) {
                if (cell == 0) {
                    continue;
                }
                var cellHeader =  $(grid[0][cell]).html();
                var insertCellHeader = "<span class=" + this.options.addheadelement + ">" + cellHeader + "</span>";
                var insertCellHeader = "<span class=" + this.options.addheadelement + ">" + cellHeader + "</span>"; //두번처리 이유 : 한번의 경우 min.js 적용시 표시안됨 :: The reason of processing two times: In case of one time and min.js application, this will not show up
                $(insertCellHeader).prependTo(grid[row][cell]); //모바일 th추가건으로 인한 로딩 시간차 발생시 제거 여부 판단 필요 :: If loading time gap is made due to mobile th adding, you should determine wheter deletion is possible or not

            }
        }

    };

    tableElement.prototype.removeSimple = function(){
        this.element.find("." + this.options.addheadelement).remove();
        var tds = this.element.find(".tds");
        tds.contents().unwrap( ".tds")  //셀내용 span 감싸기 :: Cover cell content span

    };


    tableElement.prototype.tableCheck = function() {
        var tableStatus = this.getState();

        if(this.tableStatus !== tableStatus) {
            this.tableStatus = tableStatus;

            switch (this.options.tabletype) {
                case "simple" :
                    if (this.tableStatus === "applyRwd") {
                        this.getSimple();
                        this.element.addClass("mobile");
                    } else {
                        this.removeSimple();
                        this.element.removeClass("mobile");
                    }
                    break;
                case "block" :
                    if (this.tableStatus === "applyRwd") {
                        this.element.addClass("mobile");
                    } else {
                        this.element.removeClass("mobile");
                    }
                    break;
                default :
                    this.getWrap();  // table 감싸기 / className 전달 :: Cover/ Deliver className
                    if( this.tableStatus === "applyRwd") {
                        this.getWidth(); // table width  추가 :: Add
                        this.getIcon();
                        $(window).on('scroll', $.proxy(this.getIcon, this));

                    } else {
                        this.removeWidth();
                        this.removeIcon()
                    }
                    break;
            }
        }
    };

    function tableRwd(option){
        return this.each(function(){
            var $this = $(this);
            var data  = $this.data("rwd");
            var options = typeof option === "object" && option;

            if (!data) {
                $this.data("rwd", (data = new tableElement(this, options)));
            }
        });
    }


    $.fn.tableRwd             = tableRwd;


    $(document).ready(function(){
        $("[data-table=\"rwd\"]").each(function () {
            var allTableRwd = $(this);
            var data = allTableRwd.data();
            tableRwd.call(allTableRwd,data);
        });
    });
});


$(function(){
    var OpenWindow = function(element, options) {
        this.init(element, options)
    };
    OpenWindow.DEFAULTS = {
        resizable: "no",
        scrollbars: "yes",
        status: "yes",
        width: 1000,
        height: 650
    };

    OpenWindow.prototype.init = function(element, options){
        this.element        = $(element);
        this.options        = options;
        if(this.options.url){
            this.href       = this.options.url;
        } else{
            this.href        = this.element.attr("href");
        }
        var setWindow, windowLeft, windowTop;

        if(this.options.left){
            windowLeft = this.options.left;
        } else{
            var popWidth  = this.options.width; // 파업사이즈 너비 :: Width of Pop-up size
            var winWidth  = window.innerWidth || document.body.clientWidth;  // 현재창의 너비 :: Width of current screen
            var winX      = window.screenX || window.screenLeft || 0;// 현재창의 x좌표 :: X value of current screen
            windowLeft = winX + (winWidth - popWidth) / 2;
        }

        if(this.options.top){
            windowTop= (this.options.top + 130);
        } else{
            var popHeight = this.options.height; // 팝업사이즈 높이 :: Height of pop-up size
            var winHeight = window.innerHeight || document.body.clientHeight ; // 현재창의 높이 :: Height of current screen
            var winY      = window.screenY || window.screenTop || 0; // 현재창의 y좌표 :: Y value of current screen
            windowTop = (winY + (winHeight - popHeight) / 2) + 100;
        }

        setWindow = "menubar=no, ";
        setWindow += "location=no, ";
        setWindow += "resizable=" + this.options.resizable + ", ";
        setWindow += "scrollbars=" + this.options.scrollbars + ", ";
        setWindow += "status=" + this.options.status + ", ";
        setWindow += "width=" + this.options.width + ", ";
        setWindow += "height=" + this.options.height + ", ";
        setWindow += "left=" + windowLeft + ", ";
        setWindow += "top=" + windowTop;

        windowObjectReference = window.open(this.href, "", setWindow);
    };

    function openwindowPlugin(option){
        var $this = $(this);
        var data  = $this.data('openwindow');
        //var options = typeof option === 'object' && option;
        var options = $.extend({}, OpenWindow.DEFAULTS, $this.data(), typeof option === 'object' && option);
        $this.data('openwindow', (data = new OpenWindow(this, options)));
        if (typeof option === 'string') data[option]()
    }
    $.fn.checkOpenWindow             = openwindowPlugin;


    $(document).on("click", "[data-button='openwindow']",function(e){
        e.preventDefault();
        var $this = $(this);   //버튼::Button
        var option = $this.data();
        if ($this.is("button") || $this.is("a")) {
            e.preventDefault();
        }
        openwindowPlugin.call($this, option);
    });
});



$(document).ready(function(){
    $(".top").click(function(){
        return $("html, body").animate({scrollTop:0},300),!1})

    $(".top").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.top').fadeIn();
            } else {
                $('.top').fadeOut();
            }
        });
    });


    // portal : kow request 테스트 서버 구분 요청 :: Request to separate test server
    var strTest = "ex-test";
    //var strTest = "127";
   	if( location.host.indexOf( strTest ) > -1 ){ // "ex-test.unipassghana.com"
		$("div.side-log").append('<div class="test-server">TEST-SERVER</div>');
		if( location.href.indexOf("/subPortal.do") > -1 ){
			$("main.sub-content__wrap").css({ 	"background" : "url(/images/test_server_watermark.png) repeat" } );
		}
	}
});

function summernoteDraw(obj, flag) {
	if(flag || obj == '') {
		$("#summernote").summernote({
			height: 300,
			toolbar: [
				['control', ['undo', 'redo']],
				['style', ['bold', 'underline', 'clear', 'strikethrough']],
				['font', ['fontsize', 'color']],
				['insert', ['picture', 'video', 'table']]
			],
			callbacks : {
		   		onImageUpload: function(files, editor, welEditable) {
		   			for (var i = files.length - 1; i >= 0; i--) {
		   				sendFile(files[i], this);
		   			}
		   		}
			}
		});
	}
	function sendFile(file, el) {
		var form_data = new FormData();
		form_data.append('file', file);
		$.ajax({
			data: form_data,
			type: "POST",
			url: '/summernote/imageView.do',
			ache: false,
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			success: function(img_name) {
				$(el).summernote('editor.insertImage', img_name);
			}
		});
	}
	$("#summernote").html(ConvertHtmltoSystemSource(obj));
}
function summernotePost(){
	$("#summernoteHidden").val(ConvertSystemSourcetoHtml($("#summernote").summernote("code")));
}
function removeHtmlTag(str) {
	str = str.replace(/(<([^>]+)>)/ig,"");
	return str;
}
function ConvertHtmltoSystemSource(str){
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&quot;/g, '\"');
	str = str.replace(/&#39;/g, "\'");
	return str;
}
function ConvertSystemSourcetoHtml(str){
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/\"/g,"&quot;");
	str = str.replace(/\'/g,"&#39;");
	str = str.replace(/\n/g, "");
	return str;
}

//dataSortTable
function TableDataSortFilter(tableId, searchId, clearId) {

	$('#'+tableId).addClass('dataSortTable');

	$('#'+searchId).attr('disabled', false).removeClass('readonly').on('keyup', function(){
    	var value = $(this).val().toLowerCase().trim();
    	$('#'+tableId+' tr').not('tr:first').filter(function() {
           $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
    });

    $('#'+clearId).attr('disabled', false).removeClass('readonly').click(function() {
    	$('#'+searchId).val('');
    	$('#'+searchId).trigger("keyup");
    })

    // Sort Code
    $('#'+tableId+' th').each(function (column) {
        $(this).click(function() {
           if(!$(this).is('.sorting') && !$(this).is('.sorting_asc') && !$(this).is('.sorting_desc')) return;
           if($(this).is('.sorting_asc')) {
               $(this).removeClass('sorting_asc');
               $(this).addClass('sorting_desc');
               sortdir=-1;
           } else {
              $(this).addClass('sorting_asc');
              $(this).removeClass('sorting_desc');
              sortdir=1;
           }
           $(this).siblings().removeClass('sorting_asc');
           $(this).siblings().removeClass('sorting_desc');

           var rec = $('#'+tableId).find('tbody>tr').get();
           rec.sort(function (a, b) {
                var val1 = $(a).children('td').eq(column).text().toUpperCase().replace(/[$,. ]/gi, '');
                var val2 = $(b).children('td').eq(column).text().toUpperCase().replace(/[$,. ]/gi, '');
                if($.isNumeric(val1) && $.isNumeric(val2)) {
                	val1 *= 1;
                	val2 *= 1;
                }
                return (val1<val2)?-sortdir:(val1>val2)?sortdir:0;
           });
           $.each(rec, function(index, row) {
                $('#'+tableId+' tbody').append(row);
             });
       });
   });
} // end TableDataSortFilter function