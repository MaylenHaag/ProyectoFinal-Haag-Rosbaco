class Usuario {
    constructor(nombre, apellido, edad, sexo, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.sexo = sexo;
        this.dni = dni;
    }
}

function actualizarListaUsuarios(nuevoUsuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function guardarUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const sexo = document.querySelector('input[name="sexo"]').value;
    const dni = document.getElementById("dni").value;

    const usuario = new Usuario(nombre, apellido, edad, sexo, dni);
    
    const promesaGuardarUsuario = new Promise((resolve, reject) => {
        
        if (usuario.nombre != "" && usuario.apellido != "") {
            actualizarListaUsuarios(usuario);
            resolve("Usuario guardado con Éxito!");
        } else {
            reject("El usuario no pasó la validación, intente denuevo.");
        }
    });

    promesaGuardarUsuario
        .then(mostrarMensaje)
        .catch(mostrarMensaje);
}

function modificarDOM() {
    const usuariosJSON = localStorage.getItem("usuarios");
    const usuarios = JSON.parse(usuariosJSON);
    const lista = document.querySelector("#lista-usuarios ul");

    // Recorrer los usuarios y agregarlos a la lista
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        const li = document.createElement("li");
        li.textContent = usuario.nombre + " " + usuario.apellido;
        lista.appendChild(li);
    }
}

function mostrarMensaje(mensaje){
    const confirmacion = document.querySelector("#mensajes h6");
    confirmacion.textContent = mensaje;
}