$(document).ready(function(){
  $('.child-img').each(function() {
    if ($(this).find('img').length) {
        // there is an image in this div, do something...
        $(this).closest('.cards-header').addClass('p-text-shadow');
    }

});

$('#toilet-check').click(function() {
    if( $(this).prop('checked')) {
        $(".toilet-code").css('visibility', 'visible');
    }
    else  {
      $(".toilet-code").css('visibility', 'hidden');
    }
});
});
