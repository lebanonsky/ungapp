/*** Slide **/

$(document).ready(function() {
  $('.ungapp .segment').click(function () { 
    console.log('slide')
    $('#render-target').animate({left: '+=500'});
    });
  
});

/*** animate logo ***/
$(window).scroll(function(){
  var header = $('.header.ungapp'),
      scroll = $(window).scrollTop();
  if (scroll >= 70) { 
    //header.sticky('refresh');
    header.addClass('fixed sticky top');
    $('#ui_logo').attr('src','/img/hjalp_vertical.png')
  } 
  else {
    header.removeClass('fixed sticky top');
    $('#ui_logo').attr('src','/img/hjalp_logo.png')

  }
});


