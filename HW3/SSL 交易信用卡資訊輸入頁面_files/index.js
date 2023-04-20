//中文

$(function(){
    countTime();
});
function countTime(){
    var $el = $('#time__count'),
        time = 900;
    var interval = setInterval(function () {
        time--;
        var min = parseInt(time / 60),
            sec = time % 60;
        min = min < 10 ? '0' + min.toString() : min.toString();
        sec = sec < 10 ? '0' + sec.toString() : sec.toString();
        $el.text(min + ':' + sec);
        if (time <= 0) {
            $(".time_end").show();
            $(".time__box").hide();
            $('.time_end').find('span').html("此筆訂單已逾時，無法進行交易，請返回商店重新結帳");
            $('#time__count').html('00:00');
            //time = 5;
            //var $btn = $('#w01').find('.actionArea >.btn');
            //$btn.removeAttr('data-fancybox');
            //$btn.removeAttr('data-src');
            //$btn.attr('disabled', true);
            //$btn.css({ 'opacity': '.65', 'cursor':'not-allowed'});
            //$btn.click(function () {
            //    return false;
            //    //$(this).remove();
            //    //$('.time_end').html("此筆訂單已逾時，無法進行交易，請返回商店重新結帳");
            //})  
            //$btn.click(function () {         
                //$(this).remove();
                //$('.time_end').html("此筆訂單已逾時，無法進行交易，請返回商店重新結帳");
            //})  
            clearInterval(interval);
        }
    }, 1000);   
  }