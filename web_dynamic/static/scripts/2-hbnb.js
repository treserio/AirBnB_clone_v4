const amList = [];
setTimeout(() => {
  $('input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      amList.push($(this).data('name'));
    } else {
      amList.splice(amList.indexOf($(this).data('name')), 1);
    }
    // if get h4 of parent's, parent's, parent's, parent?
    if (amList.length == 0) {
      $('.amenities h4').text(String.fromCharCode(160));
    } else {
      $('.amenities h4').text(amList.sort().join(', '));
    }
  });
}, 200);

$(() => {
  $.ajax({
    url: 'http://172.25.88.2:5001/api/v1/status/',
    type: 'get',
    data: 'a'
  }).done(function (data, statusText, xhr) {
    var status = xhr.status;                //200
    console.log(status);
    // var head = xhr.getAllResponseHeaders(); //Detail header info
  });
});
