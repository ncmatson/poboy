console.log('hey');

$(document).on("click", ":button.status_btn", function(){
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

$(function() {
    $("#dialog").dialog({
      title: "Really?",
      autoOpen: false,
      modal: true,
      show: "slideDown"
    });
  });

death = function(name){
  console.log(name);
  $.ajax({
    url: '/delete_device',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({NAME: name})
  })

  $(location.reload());
}

$(document).on("click", ":button.delete_btn", function(e) {
    e.preventDefault();

    var name = $(this).attr('id');
    $("#dialog").dialog({
      buttons : {
        "Confirm" : function() {
          death(name);
        },
        "Cancel" : function() {
          $(this).dialog("close");
        }
      }
    });

    $("#dialog").dialog("open");
  });
