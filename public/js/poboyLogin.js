$(document).ready(function(){

  $("#check_register").change(function(){
    console.log("hi");
    if (this.checked) {
      console.log("check");
      $("#login").attr("action", "/register");
    }
    else {
      console.log("no check");
      $("#login").attr("action", "/login");
    }
  });
});
