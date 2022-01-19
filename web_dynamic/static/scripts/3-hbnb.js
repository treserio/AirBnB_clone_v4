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
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

$.ajax({
  method: 'POST',
  url: 'http://127.0.0.1:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}',
  success: (res) => {
    for (const place of res) {
      $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, (usrData) => {
        $('.places').append(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${(place.max_guest === 1) ? '' : 's'}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms === 1) ? '' : 's'}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms === 1) ? '' : 's'}</div>
        </div>
        <div class="user">
          <b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
        </div>
        <div class="description">
          ${place.description}
        </div>`);
      });
    }
  }
});
