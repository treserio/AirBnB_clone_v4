const amList = {};
setTimeout(() => {
  $('input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      amList[$(this).data('id')] = $(this).data('name');
    } else {
      delete amList[$(this).data('id')];
    }
    if (amList.length == 0) {
      $('.amenities h4').text(String.fromCharCode(160));
    } else {
      $('.amenities h4').text(Object.values(amList).sort().join(', '));
    }
  });
  $('button').click(() => {
    drawArticles(1);
  });
}, 200);

$(() => {
  drawArticles(0);
});

$.get('http://127.0.0.1:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

function drawArticles(click) {
  // using the places_search endpoint to collect the correct data based on selected amenities
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({ amenities: Object.keys(amList) }),
    dataType: 'json',
    success: (res) => {
      if (click) {
        $('.places').empty();
      }
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
            </div>
            </article>`);
        });
      }
    }
  });
}
