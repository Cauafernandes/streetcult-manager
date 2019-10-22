//---------------------------------------------------------------------------------------------------------------------
// INSERINDO O TOKEN NO HEADER
$("#formLogin").submit(function(event){
  event.preventDefault();
  var post_url = $(this).attr("action"); 
  var request_method = $(this).attr("method"); 
  var form_data = $(this).serialize();
  sessionStorage.clear();

  $.ajax({
    url : post_url,
    type: request_method,
    data : form_data,
    dataType: 'json',
    cache: false
  }).done(function(data){
    if ( data != undefined && data != null) {
      localStorage.setItem('xTokenx', data.access_token);
      window.location.href = window.location.protocol + "//" + window.location.host + "/";
      console.log('Token inserido.');
    }
    else {
      console.log('Erro ao adicionar o token');
    }
  });
});

// QUEBRANDO O TOKEN E REDIRECIONANDO
$("#logout").on('click', function(){
  localStorage.removeItem('xTokenx');
  window.location.href = window.location.protocol + "//" + window.location.host + "/admin/login";
});

// VERIFICAÇÃO SE JÁ ESTÁ LOGADO
$(document).ready(function() {
  var token = localStorage.getItem('xTokenx');

  if (window.location.href.indexOf('/login') != "-1" && token != null) {
    $.ajax({
      url : '/admin/login/authenticatetoken',
      type: 'post',
      dataType: 'text',
      headers: {
        "Authorization": 'bearer ' + localStorage.getItem('xTokenx')
      },
      error: function (request, status, error) {
        if (request.status == 401){
          $('#token401').append("Por favor, logue-se novamente.");
        }
      }
    }).done(function(data){
      window.location.href = window.location.protocol + "//" + window.location.host + "/";
    });
  }

  function parseJwt () {
    var token = localStorage.getItem('xTokenx');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
  parseJwt();
  console.log('parseJwt - ', parseJwt());
});

//---------------------------------------------------------------------------------------------------------------------
console.log("JavaScript Iniciado");