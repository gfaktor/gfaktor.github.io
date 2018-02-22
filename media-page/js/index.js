var scaling = 1.50;
//count
var currentSliderCount = 0;
var videoCount = $(".slider-container").children().length;
var showCount = 4;
var sliderCount = videoCount / showCount;
var controlsWidth = 30;
var scollWidth = 0;
    

$(document).ready(function(){
    //$('.slider-container .slide:nth-last-child(-n+4)').prependTo('.slider-container');
    init();

    $(".item a").attr('target', '_blank'); 

    // change body class
    $(".menu-bg").find("li").click(function(){
        var cl = $(this).attr("rel");
        $(".menu-bg").find("li").removeClass("active");
        $(this).addClass("active");
        $("body").attr('class', cl);
    });
    // sorting category media
    $(".menu-category").find("li").click(function(){
        var cat = $(this).attr('data-sorting'),
            container =  $(".media-grid"),
            divs = $(".media-grid").find(".item");
        $(".menu-category").find("li").removeClass("active");
        $(this).addClass("active");
        if(cat!='all') {
            divs.hide();
            container.find("[data-category='" + cat + "']").show();
        } else {
            divs.show();
        }
        $('html, body').animate({scrollTop: $("#explore-our-media").offset().top}, 400); 
    });

});
$( window ).resize(function() {
    init();
});

function init(){
    // elements
    var win = $(window);
    var sliderFrame = $(".slider-frame");
    var sliderContainer = $(".slider-container");
    var slide = $(".slide");
    
    //counts
    var scollWidth = 0;
    
    //sizes
    var windowWidth = win.width();
    var frameWidth = win.width() - 80;
     if(windowWidth >= 0 && windowWidth <= 414){
       showCount = 2;
   }else if(windowWidth >= 414 &&  windowWidth <= 768){
       showCount = 3;
   }else{
       showCount = 4;
   }
    var videoWidth = ((windowWidth - controlsWidth * 2) / showCount );
    var videoHeight = Math.round(videoWidth / (16/9) + 30);
    
    var videoWidthDiff = (videoWidth * scaling) - videoWidth;
    var videoHeightDiff = (videoHeight * scaling) - videoHeight;
      
    //set sizes
    sliderFrame.width(windowWidth);
    sliderFrame.height(videoHeight * scaling);
    
    //sliderFrame.css("top", (videoHeightDiff / 2));
    
    sliderContainer.height(videoHeight * scaling);
    sliderContainer.width((videoWidth * videoCount) + videoWidthDiff);
    sliderContainer.css("top", (videoHeightDiff / 2));
    sliderContainer.css("margin-left", (controlsWidth));
    
    slide.height(videoHeight);
    slide.width(videoWidth);
    
    //hover effect
    $(".slide").mouseover(function() {
        $(this).css("width", videoWidth * scaling);
        $(this).css("height", videoHeight * scaling);
        $(this).css("top", -(videoHeightDiff / 2));
        if($(".slide").index($(this)) == 0 || ($(".slide").index($(this))) % 4 == 0){
          // do nothing
        }
        else if(($(".slide").index($(this)) + 1) % 4 == 0 && $(".slide").index($(this)) != 0){
            $(this).parent().css("margin-left", -(videoWidthDiff - controlsWidth));
        }
        else{
            $(this).parent().css("margin-left", - (videoWidthDiff / 2));
        }
    }).mouseout(function() {
        $(this).css("width", videoWidth * 1);
        $(this).css("height", videoHeight * 1);
        $(this).css("top", 0);
        $(this).parent().css("margin-left", controlsWidth);
    });
    
    // controls
    controls(frameWidth, scollWidth);
}
function controls(frameWidth, scollWidth){
    var prev = $(".prev");
    var next = $(".next");

    prev.hide();
    next.hide();

    if(sliderCount>1) next.show();

    next.on("click", function(){
        console.log(currentSliderCount);
        console.log(sliderCount);
        scollWidth = scollWidth + frameWidth;
        $('.slider-container').animate({
            left: - scollWidth
        }, 300, function(){ 
            if(currentSliderCount >= sliderCount-1){
                $(".slider-container").css("left", 0);
                currentSliderCount = 0;
                scollWidth = 0;
            }else{
                currentSliderCount++;
            }
        });
        prev.show();
        $(this).hide();       
    });
    prev.on("click", function(){
        scollWidth = scollWidth - frameWidth;
        $('.slider-container').animate({
            left: + scollWidth
        }, 300, function(){ 
            currentSliderCount--;
        });
        next.show();
        $(this).hide();          
        //$(".slider-container").css("left", scollWidth);
    });
};