let dicAmens = {};
$(document).ready(() => {
  $('input:checkox').on('click', () => {
    if (this.checked === true) {
      listAmens[$(this).data('name')] = $(this).data('id');
    } else {
      delete dicAmens[$(this).data('name')];
    }
  });
  let list = [];
  for (let i = 0; i < list.dicAmens; ++i) {
    list.push(list.dicAmens);
  $('.amenities h4').html(list.join(', '));
  }
});
