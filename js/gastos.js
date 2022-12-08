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

function recuperarLS(key){
    return JSON.parse(localStorage.getItem(key));
};

function limpiarCampos(){
    inputNombre.value = "";
    tipoDato.value = "";
    importe.value = "";
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


    if(inputNombre.value == "" || tipoDato.value == "" || importe.value == ""){
        msgErrorGst.innerHTML="¡Todos los campos deben completarse!";
    }else{
        const newGasto = new Gasto(inputNombre.value, tipoDato.value, importe.value)

        cargarGasto(newGasto);
        guardarLS(gastos);
        cuadroHTML(gastos);
        limpiarCampos();
        msgErrorGst.innerHTML="";
    };

    
});

btnTotal.addEventListener("click", (e)=>{
    e.preventDefault()

    let gastosLS = recuperarLS("gastos")
    
    let gastosImporte = gastosLS.reduce((acc, el)=>{
        return acc + parseInt(el.importe)
    }, 0); 
    
    HTMLTotal(gastosImporte);
})

//Fetch
const cardsContainer = document.querySelector("#cardsContainer");

fetch("../datos/gastos.json")
    .then( (res) => res.json())
    .then((datos)=>{
        datos.forEach(dato => {
            const div = document.createElement("div");
            div.innerHTML=`
            <div class="card m-4" style="width: 18rem;">
                <img src="${dato.imgSrc}" class="card-img-top" alt="${dato.alt}">
                <div class="card-body">
                    <p class="card-text">${dato.description}</p>
                    <p class="card-text">${dato.subDescription}</p>
                </div>
            </div>`
            cardsContainer.append(div)
        });
    });