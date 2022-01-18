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

$.get('http://127.0.0.1:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    console.log(data);
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});
