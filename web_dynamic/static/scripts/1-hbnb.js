const amList = [];
setTimeout(() => {
  $('input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      amList.push($(this).data('name'));
    } else {
      amList.splice(amList.indexOf($(this).data('name')), 1);
    }
    if (amList.length == 0) {
      $('.amenities h4').text(String.fromCharCode(160));
    } else {
      $('.amenities h4').text(amList.sort().join(', '));
    }
  });
}, 200);
