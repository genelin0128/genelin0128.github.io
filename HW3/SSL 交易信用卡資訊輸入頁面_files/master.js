$(document).ready(function() {
   



  


});




//--------------------loading--------------------
$(function(){
  $(window).load(function(){

  })
  
});

$(document).ready(function() {
    $('.item__box .input001').keyup(function (e) {
        var op = "";
        var tmp = $(this).val().replace(/\D/g, "");
        for (var i = 0; i < tmp.length; i++) {
            if (i % 4 === 0 && i > 0) {
                op += "-" + tmp.charAt(i);
            } else {
                op += tmp.charAt(i);
            }
        }
        $(this).val(op);
    });

     var swiper = new Swiper('.index_banner', {
      
         slidesPerView: 'auto',
         autoplay:3000
    });

     $(".reset").click(function(){
        // $(".uniform-input").val("");
        // $('select option:first-child').attr('selected', 'selected'); 
         location.reload();  
    });


     $('.input01').on('keyup change', function () {
         var card_number = '';
         $('.input01').each(function () {
             card_number += $(this).val() + ' ';

         })
  
  	$('.card .img .number').html(card_number);
  	$('span.input_num3').text(card_number);
	});
   

	$('.card-expiration-month, .card-expiration-year').change(function(){
	  m = $('.card-expiration-month option').index($('.card-expiration-month option:selected'));
	  m = (m < 10) ? '0' + m : m;
	  y = $('.card-expiration-year').val().substr(2,2);
	  y2 = $('.card-expiration-year').val();
	  $('.card .img .card-expiration-date div').html(m + '/' + y);
	  $('span.input_num4').text(m + '/' + y2);
	})

	$('.check_num').on('focus', function(){
		  $('.card .img2').addClass('on');
		  $('.card .img').removeClass('on');
	}).on('blur', function(){
		  $('.card .img2').removeClass('on');
		  $('.card .img').addClass('on');
	}).on('keyup change', function(){
	  $('.ccv label span').html($(this).val());

	});

    var num=$('.order_t .tt1').html();
    $('span.input_num').text(num);
    var num2=$('.order_t .tt2').html();
    $('span.input_num2').text(num2);

   
   


});







