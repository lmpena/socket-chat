var socket = io();

// Recuperamos información del usuario de la URL (GET)
var params = new URLSearchParams(window.location.search);

// Si no viene el nombre no permitimos continuar
if (!params.has('nombre') || !params.has('sala')) {
    // redirigimos a pagina inicio
    window.location = 'index.html';
    // Lanzamos error
    throw new Error(' El nombre y la sala son obligatorios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {

    // Cominico al servidor quien soy
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios ', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


socket.on('listaPersona', function(personas) {

    console.log(personas);

});

// Mensajes privados
socket.on('mensajePrivado', function(msg) {

    console.log('Mensaje Privado: ', msg);

});