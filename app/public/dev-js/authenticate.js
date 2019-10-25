$(document).ready(function(){  
    $.ajax({
        url : '/login/authenticatetoken',
        type: 'post',
        dataType: 'text',
        headers: {
            "Authorization": 'bearer ' + localStorage.getItem('xTokenx')
        },
        error: function (request, status, error) {
            console.log("Erro no Authenticate", error);
            window.location.href='/login';
        }
    }).done(function(data){
        if(data != undefined){
            console.log("Token Validado");
        }
    });
});