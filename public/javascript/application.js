$(function() {
  var matchList = $('#matches');
  var newMatchForm = $('#new-match');

  $.ajax({
    url: '/users',
    method: 'get',
    dataType: 'json'
  }).done(populateMatchList);

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

  matchList.on('click', 'button.remove', function (event){
    event.stopImmediatePropagation();
    var matchListPerson = $(this).closest('li');
    var name = matchListPerson.contents().first().text()
    var removeName = _.remove(matching, function(n) {
      return n == name;
    });
    $.ajax({
      method: 'delete',
      url: '/users/' + 'name',
      success: function (){
        matchListPerson.remove()
        removeName;
      }
    });
  });

// Returns randomized matches

  $('#match_button').on('click', function(e){
    e.stopImmediatePropagation()
    var matches = createMatch(matching)
    renderMatches(matches)
  });

  function populateMatchList(users) {
    users.forEach(appendMatch);
  }

  function appendMatch(user){
    $('<li>')
      .data('id', user.id)
      .text(user.name)
      .append($('<button>')
      .addClass('remove')
      .html('&#x2717;'))
      .appendTo(matchList);
  }

// Match building functionality

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

});
