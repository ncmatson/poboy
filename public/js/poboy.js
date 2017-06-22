console.log('hey');

$(document).on("click", ":button", function(){
    var name   = $(this).attr('id');
    if ($(this).val() == "true") {
      $(this).html('off');
      $(this).val("false");
    }
    else {
      $(this).html('on');
      $(this).val("true");
    }
    var status = $(this).val();

    $.ajax({
      url: '/update_device',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({NAME: name, STATUS: status})
    })
  }
);
