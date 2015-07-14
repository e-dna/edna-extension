var colors = ['rgb(15, 157, 88)', 'rgb(219, 68, 55)', 'rgb(66, 133, 244)', 'rgb(244, 180, 0)'];
var index = 0;
$(document).ready(function(){
  $('.recommended-stories li').on('click', function(e){
    index = index + 1;
    if( index == 4){index = 0}
    e.preventDefault();
    var url = $(this).children().data('url');
    $('.grid-frames').css('background', colors[index]);
    $('.grid-frames').html(url);
  });
});
