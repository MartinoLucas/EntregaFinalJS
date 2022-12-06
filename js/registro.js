// QuerySelectors
const user = document.querySelector("#inputUsername"),
email = document.querySelector("#inputEmail"),
pass = document.querySelector("#inputPassword"),
btnRegister = document.querySelector("#btnRegister"),
divMsg = document.querySelector("#msgError"),
divCreado = document.querySelector("#msgCreado");

// Guardar usuarios
let usuarios;
// JSON.parse(localStorage.getItem("usuarios")) ? (usuarios = JSON.parse(localStorage.getItem("usuarios"))) : (usuarios = [])
if (JSON.parse(localStorage.getItem("usuarios"))) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
} else {
    usuarios = [];
};

// Constructor de Usuario
function Usuario(user, email, pass) {
        this.user = user,
        this.email = email,
        this.pass = pass;
};

// Funciones
function cargarUser(obj){
    return usuarios.push(obj);
};

function guardarLS(arr){
    if(user.value != "" && email.value != "" && pass.value != ""){
        localStorage.setItem("usuarios", JSON.stringify(arr));
    }
};

function recuperarLS(key){
    return JSON.parse(localStorage.getItem(key));
};

function errorHTML(){
    if(user.value == "" || email.value == "" || pass.value == ""){
        divMsg.innerHTML="¡Todos los campos deben completarse!";
    }
};

function creadoHTML(){
    if(user.value != "" && email.value != "" && pass.value != ""){
        divCreado.innerHTML=`Usuario Creado con éxito, <a href="../index.html">accedé.</a>`;
    } 
};

function limpiarCampos(){
    user.value = "",
    email.value = "",
    pass.value = "";
}

guardarLS(usuarios);

// EVENTOS BTN
btnRegister.addEventListener("click", () => {
    const newUser = new Usuario(
        user.value,
        email.value,
        pass.value
    );
    
    cargarUser(newUser);
    errorHTML();
    creadoHTML();
    guardarLS(usuarios);
    limpiarCampos();

});