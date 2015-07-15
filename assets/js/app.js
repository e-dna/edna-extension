var colors = ['rgb(15, 157, 88)', 'rgb(219, 68, 55)', 'rgb(66, 133, 244)', 'rgb(244, 180, 0)'];
var index = 0;


$(document).ready(function(){
  load_trending_topics();
});

function first(obj) {
  for (var a in obj) return a;
}

function load_trending_topics(){
  var url = 'http://edna-trending.herokuapp.com/trending/';
  var $story_container = $('.recommended-stories');
  $story_container.html('');

  $.ajax({
    url: url,
  }).done(function(datas) {
    var data = datas['1'];
    for ( i = 0; i < 19; i++ ){
      var story_el = generate_trends_template(data, i);
      $story_container.append(story_el);
    }
    $('.recommended-stories li').on('click', function(e){
      clicked_recommended(e, this);
    });
  });
}

function clicked_recommended(e, self){
  e.preventDefault();
  index = index + 1;
  index == 4 ? index = 0 : index;

  var keyword = $(self).data('keyword');
  var url = 'http://edna-trending.herokuapp.com/parsely/' + encodeURIComponent(keyword);
  var datas = [];


  $('.grid-frames *').fadeOut();
  $.ajax({
    url: url,
  }).done(function(datas) {
    // keyword = keyword.split(' ');
    // keyword = keyword.join('+');
    do_on_parsely_return(datas, keyword)
  });
}

function generate_trends_template(datas, elN){
  var template = '<li data-keyword="' + datas[elN] + '"><a href="#"><span class="block-list-label">' + elN + '</span></strong>' + datas[elN] + '</a></li>';
  return template;
}

function generate_recirc_template(response, elN){
  var datas = response['response']['data'];
  console.log('datas', datas[elN]);
  var image = datas[elN]['image_url'];
  var postDate = datas[elN]['pub_date'];
  postDate = postDate.split('T');
  if (image == ''){ image = 'http://www.newyorker.com/wp-content/assets/dist/img/cartoon-404.png' }
  var template = '<div class="grid-content"><div class=" card"><a href="' + datas[elN]['url'] + '"><img src="' + image + '"><div class="card-section"><h5 class="subtitle">' + postDate + '</h5><h4>' + datas[elN]['title'] + '</h4></div></a></div></div>';
  return template;
}

function do_on_parsely_return(datas, keyword){
  recirculation = '<div class="grid-block ng-scope"><h1 class="grid-content">' + keyword + '</h1></div>';
  recirculation = recirculation + '<div class="grid-block grid-content small-up-1 medium-up-3 ng-scope text-center"><iframe class="" style="  margin: 0 auto; background: white; height: 370px; width: 100%" src="http://www.google.com/trends/fetchComponent?q=' + keyword + '&cid=TIMESERIES_GRAPH_0&export=5" frameBorder="0"></iframe></div>';
  recirculation = recirculation + '<div class="grid-block ng-scope"><h3 class="grid-content">EDNA Recommends</h3></div>';
  recirculation = recirculation + '<div class="grid-block small-up-1 medium-up-3 ng-scope">';
  for(i = 0; i < 3; i++){
    recirculation = recirculation + generate_recirc_template(datas, i);
  }
  recirculation = recirculation + '</div>';

  template = recirculation;

  $('.grid-frames').css('background', '#eee');
  $('.grid-frames').html(template);
}
