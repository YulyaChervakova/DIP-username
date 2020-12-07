// $(document).ready(function() {
//     $(".slider").each(function () { // обрабатываем каждый слайдер
//      var obj = $(this);
//      $(obj).append("<div class='nav1'></div>");
//      $(obj).find("li").each(function () {
//       $(obj).find(".nav1").append("<span rel='"+$(this).index()+"'></span>"); // добавляем блок навигации
//       $(this).addClass("slider"+$(this).index());
//      });
//      $(obj).find("span").first().addClass("on"); // делаем активным первый элемент меню
//     });
//    });
//    function sliderJS (obj, sl) { // slider function
//     var ul = $(sl).find("ul"); // находим блок
//     var bl = $(sl).find("li.slider"+obj); // находим любой из элементов блока
//     var step = $(bl).width(); // ширина объекта
//     $(ul).animate({marginLeft: "-"+step*obj}, 500); // 500 это скорость перемотки
//    }
//    $(document).on("click", ".slider .nav1 span", function() { // slider click navigate
//     var sl = $(this).closest(".slider"); // находим, в каком блоке был клик
//     $(sl).find("span").removeClass("on"); // убираем активный элемент
//     $(this).addClass("on"); // делаем активным текущий
//     var obj = $(this).attr("rel"); // узнаем его номер
//     sliderJS(obj, sl); // слайдим
//     return false;
//    });

//    ///////
   // create pager list items
var sliderImage = $('.slider__images-image');

sliderImage.each(function (index) {
    $('.js__slider__pagers').append('<li>'+(index+1)+'</li>');
});

// set up vars
var sliderPagers       = 'ol.js__slider__pagers li',
    sliderPagersActive = '.js__slider__pagers li.active',
    sliderImages       = '.js__slider__images',
    sliderImagesItem   = '.slider__images-item',
    sliderControlNext  = '.slider__control--next',
    sliderControlPrev  = '.slider__control--prev',
    sliderSpeed        = 5000,
    lastElem           = $(sliderPagers).length-1,
    sliderTarget;

// add css heigt to slider images list
function checkImageHeight() {
    var sliderHeight = $('.slider__images-image:visible').height(); 
    $(sliderImages).css('height', sliderHeight+'px');
};

sliderImage.on('load', function() {
    checkImageHeight();
    $(sliderImages).addClass('loaded')
});
$(window).resize(function(){
    checkImageHeight();
});

// set up first slide
$(sliderPagers).first().addClass('active');
$(sliderImagesItem).hide().first().show();

// transition function
function sliderResponse(sliderTarget) {
    $(sliderImagesItem).fadeOut(300).eq(sliderTarget).fadeIn(300);
    $(sliderPagers).removeClass('active').eq(sliderTarget).addClass('active');
}

// pager controls
$(sliderPagers).on('click', function() {
    if ( !$(this).hasClass('active') ) {
        sliderTarget = $(this).index();
        sliderResponse(sliderTarget);
        resetTiming();
    }
});

// next/prev controls
$(sliderControlNext).on('click', function() {
    sliderTarget = $(sliderPagersActive).index();
    sliderTarget === lastElem ? sliderTarget = 0 : sliderTarget = sliderTarget+1;
    sliderResponse(sliderTarget);
    resetTiming();
});
$(sliderControlPrev).on('click', function() {
    sliderTarget = $(sliderPagersActive).index();
    lastElem = $(sliderPagers).length-1;
    sliderTarget === 0 ? sliderTarget = lastElem : sliderTarget = sliderTarget-1;
    sliderResponse(sliderTarget);
    resetTiming();
});

// slider timing
function sliderTiming() {
    sliderTarget = $(sliderPagersActive).index();
    sliderTarget === lastElem ? sliderTarget = 0 : sliderTarget = sliderTarget+1;
    sliderResponse(sliderTarget);
}

// slider autoplay
var timingRun = setInterval(function() {
    sliderTiming();
}, sliderSpeed);

function resetTiming() {
    clearInterval(timingRun);
    timingRun = setInterval(function() {
      sliderTiming();
    }, sliderSpeed);
}