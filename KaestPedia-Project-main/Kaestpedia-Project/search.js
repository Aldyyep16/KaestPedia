$(document).ready(function() { 
function wikiSearch(value) {
  var query = $('input[type=text]').val();
  var url = "";
  if (value == 'random') {
    url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exchars=280&exlimit=max&grnnamespace=0&grnlimit=1&callback=?';
  } else {
    url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exchars=280&exlimit=max&gsrsearch=' + query + '&callback=?';  
  }
  console.log(url);
  $.ajax({
    type: "GET",
    url: url,
    async: false,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      var request = data.query.pages;
      var result = [];
      for (var page in request) {
        result.push({
          'title': request[page].title,
          'extract': request[page].extract,
          'pageUrl': 'https://en.wikipedia.org/?curid=' + request[page].pageid
        });
      }
      displayResults(result);
    }
  });

  function displayResults(result) {
    var $ul = $('.wiki-list');
    $ul.empty();
    result.forEach(function(item, index) {
      var $li = $('<li />', {
        'class': 'wikiItem'
      }).appendTo($ul);
      var $link = $('<a />', {
        'href': item.pageUrl,
        'target': '_blank'
      }).appendTo($li);
      $('<h1 />', {
        'text': item.title
      }).appendTo($link);
      $('<p />', {
        'text': item.extract
      }).appendTo($link);
    });
  }

}
$('input[type=text]').on("keypress", function(event) {
  if (event.which == 13) {
    $('#wiki-search').trigger('click');
  }
});
$('button').on('click', function(){
  if ($(this).is('#wiki-search') ) {
    var field = $('input[type=text]');
    if (field.val() == "") {
      $('.error').removeClass('hide');
    } else {
      $('.error').addClass('hide');
      wikiSearch();
    }
  } else {
    $('.error').addClass('hide');
    wikiSearch('random');
  }
});
});