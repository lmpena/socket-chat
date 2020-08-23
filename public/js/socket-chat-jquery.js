var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


// Funciones para renderizar 
// usuarios
function renderizarUsuarios(personas) {
    // Para generar automáticamente este código html:
    //<li>
    //<a href="javascript:void(0)" class="active"> Chat de <span> Juegos</span></a>
    //</li>    

    var html = '';
    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + sala + '</span></a>';
    html += '</li>';

    // Arreglo de personas
    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}

// mensajes
function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);

    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        // <li class="reverse">
        // <div class="chat-content">
        //     <h5>Steave Doe</h5>
        //     <div class="box bg-light-inverse">It’s Great opportunity to work.</div>
        // </div>
        // <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
        // <div class="chat-time">10:57 am</div>
        // </li>

        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '    <h5>' + mensaje.nombre + '</h5>';
        html += '    <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {
        // <li>
        // <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
        // <div class="chat-content">
        //     <h5>James Anderson</h5>
        //     <div class="box bg-light-info">Lorem Ipsum is simply dummy text of the printing & type setting industry.</div>
        // </div>
        // <div class="chat-time">10:56 am</div>
        // </li>

        html += '<li class="animated fadeIn">';

        if (mensaje.nombre != 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '<div class="chat-content">';
        html += '    <h5>' + mensaje.nombre + '</h5>';
        html += '    <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }


    divChatbox.append(html);
}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// listeners
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }

});


formEnviar.on('submit', function(e) {

    e.preventDefault();

    //console.log(txtMensaje.val());

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        //console.log('respuesta server: ', resp);

        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});