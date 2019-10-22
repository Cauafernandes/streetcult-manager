$(document).ready(function(){
    var arrUrl = window.location.href.split('/');    
    if(arrUrl[arrUrl.length-1]!='admin'){
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
                var user = sessionStorage.getItem('xUserx')
                $(".infosuser").append(user);
                console.log("Token Validado");
            }
        });    
    }
 });