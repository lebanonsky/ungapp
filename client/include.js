$(window).scroll(function(){
  var header = $('.header.ungapp'),
      scroll = $(window).scrollTop();
  if (scroll >= 100) { 
    //header.sticky('refresh');
    header.addClass('fixed sticky top');
    $('#ui_logo').attr('src','/img/hjalp_vertical.png')
  } 
  else {
    header.removeClass('fixed sticky top');
    $('#ui_logo').attr('src','/img/hjalp_logo.png')

  }
});


  $('.content.segment a').click(function () { 
     $('#render-target').animate({left: '+='+sliderWidth}, 500);
    });

          
