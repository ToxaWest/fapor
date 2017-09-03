$(document).ready(function() {
  $('.feedback__comments').slick();

  $('.icon-menu').click(function () {
    $(this).toggleClass('active');
    $('.navigation').toggleClass('active');
  });
  $('#email').keypress(function() {
  var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,10}\.)?[a-z]{2,10}$/i,
      params = {
        true: {
            border: '1px solid green',
        },
        false: {
            border: '1px solid #ff0000',
        }
      };
    param = params[pattern.test($(this).val())];
    $(this).css({'border' : param.border});
  });

})
