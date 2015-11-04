$(function() {
  var matchList = $('#matches');

  $.ajax({
    url: '/users',
    method: 'get',
    dataType: 'json'
  }).done(populateMatchList);

  var newMatchForm = $('#new-match');

  newMatchForm.on('submit', function (event){
    event.stopImmediatePropagation();
    $.ajax({
      url: newMatchForm.attr('action'),
      method: newMatchForm.attr('method'),
      data: newMatchForm.serialize()
    })
    .done(addUsers)
    .done(appendMatch)
    .done(function (){
      newMatchForm[0].reset();
    });
    return false;
  });

  $('#match_button').on('click', function(e){
    e.stopImmediatePropagation()
    var matches = createMatch(matching)
    renderMatches(matches)
  });

  var matching = []
  function addUsers(){
    user = $('#person_name').val();
    matching.push(user)
  }

  function createMatch(matching){
   shuffled_users = _.shuffle(matching)
   return _.chunk(shuffled_users, 2);
  }

  function renderMatches(matches){
    var matchlist = matches.map(function(match){
      return '<li>' +match[0]+ ' &#x2764 ' +match[1]+ '</li>'
    }).join('')
    $('#matches').html(matchlist)
  }

  function populateMatchList(users) {
    users.forEach(appendMatch);
  }

  function appendMatch(user){
    $('<li>')
      .data('id', user.id)
      .text(user.name)
      .appendTo(matchList);
  }

});
