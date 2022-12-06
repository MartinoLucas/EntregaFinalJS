// QuerySelectors
const btnAgregar = document.querySelector("#btnAgregar"),
inputNombre = document.querySelector("#inputGasto"),
tipoDato = document.querySelector("#tipoDato"),
importe = document.querySelector("#inputImporte"),
tableBody = document.querySelector("#tableBody"),
msgErrorGst = document.querySelector("#msgErrorGst"),
btnTotal = document.querySelector("#btnTotal"),
h3Gastos= document.querySelector("#h3Gastos");

let gastos;
// JSON.parse(localStorage.getItem("usuarios")) ? (usuarios = JSON.parse(localStorage.getItem("usuarios"))) : (usuarios = [])
if (JSON.parse(localStorage.getItem("gastos"))) {
    gastos = JSON.parse(localStorage.getItem("gastos"));
} else {
    gastos = [];
};

// FUNCIONES
function cargarGasto(obj){
    gastos.push(obj);
};

function guardarLS(arr){
        localStorage.setItem("gastos", JSON.stringify(arr));
};

function errorMsgHTML(){
    if(inputNombre.value == "" && tipoDato.value == "" && importe.value == ""){
        divMsg.innerHTML="¡Todos los campos deben completarse!";
    };
};

function recuperarLS(key){
    return JSON.parse(localStorage.getItem(key));
};

function limpiarCampos(){
    inputNombre.value = "";
    tipoDato.value = "";
    importe.value = ""
};

function cuadroHTML(arr){
    tableBody.innerHTML = "";

     let html = "";
     for (const item of arr) {
        html = `<tr>
                 <td>${item.nombre}</td>
                 <td>${item.tipo}</td>
                 <td>${item.importe}</td>
                 <td><button class="btn btn-primary bg-danger text-white border-danger" id="${item.nombre}">Borrar</button></td>
             </tr>`;
        tableBody.innerHTML += html;
    };

    const arrayBotones = document.querySelectorAll('td .btn');
    arrayBotones.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      gastos = gastos.filter(el => el.nombre != btn.id);
      guardarLS(gastos);
      cuadroHTML(gastos);
    })
  });
};

class Gasto {
    constructor(nomGst, tipGst, importGst) {
        this.nombre = nomGst,
        this.tipo = tipGst,
        this.importe = importGst;
    }
};

function HTMLTotal(num){
    h3Gastos.innerHTML=`El total de tus gastos es de $${num}.000`;
};

// EJECUTO FunCTIONS
guardarLS(gastos);
cuadroHTML(gastos);

// Listeners
btnAgregar.addEventListener("click", (e)=>{
    e.preventDefault();

    const newGasto = new Gasto(inputNombre.value, tipoDato.value, importe.value)

    cargarGasto(newGasto);
    errorMsgHTML();
    guardarLS(gastos);
    cuadroHTML(gastos);
    limpiarCampos();
});

btnTotal.addEventListener("click", (e)=>{
    e.preventDefault()

    let gastosLS = recuperarLS("gastos")
    
    let gastosImporte = gastosLS.reduce((acc, el)=>{
        return acc + parseInt(el.importe)
    }, 0); 
    
    HTMLTotal(gastosImporte);
})