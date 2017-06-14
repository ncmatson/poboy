
$('#btn-submit').click(function(){
  console.log('clicked...')
  var name = $('#name-box').val()
  var state = false
  if($('#button-on').is(':checked')){
      state = true
  }
  console.log(name)
  console.log(state)
  $.post('http://localhost:3000/stuff',{
    name:name,
    state:state
  })
})
