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
    .done(appendMatch)
    .done(function (){
      newMatchForm[0].reset();
    });
    return false;
  });

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
