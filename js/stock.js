// Declaraciones
const inputProd = document.querySelector("#inputProd");
const prLista = document.querySelector("#prLista");
const prVenta = document.querySelector("#prVenta");
const cant = document.querySelector("#cant");
const btnAgregar = document.querySelector("#btnAgregar");
const msgErrPr = document.querySelector("#msgErrPr");
const inputSearch = document.querySelector("#inputSearch");
const trTable = document.querySelector("#trTable");

let productos;
if (JSON.parse(localStorage.getItem("productos"))) {
    productos = JSON.parse(localStorage.getItem("productos"));
} else {
    productos = [];
};

// FUNCIONES
function cargarGasto(obj){
    productos.push(obj);
};

function guardarLS(arr){
    localStorage.setItem("productos", JSON.stringify(arr));
};

function errorMsgHTML(){
    if(inputProd.value == "" && prLista.value == "" && prVenta.value == ""){
        return msgErrPr.innerHTML="¡Todos los campos deben completarse!";
    };
};

function recuperarLS(key){
    return JSON.parse(localStorage.getItem(key));
};

function limpiarCampos(){
    inputProd.value = "";
    prLista.value = "";
    prVenta.value = "";
    cant.value = "";
};

function cuadroHTML(arr){
    tableBody.innerHTML = "";

    let html = "";
    for (const item of arr) {
        html = `<tr>
                 <td>${item.nombre}</td>
                 <td>${item.precioLista}</td>
                 <td>${item.precioVenta}</td>
                 <td>${item.cantidad}</td>
                 <td><button class="btn btn-primary bg-danger text-white border-danger" id="${item.nombre}">Borrar</button></td>
             </tr>`;
        tableBody.innerHTML += html;
    };

    const arrayBotones = document.querySelectorAll('td .btn');
    arrayBotones.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      productos = productos.filter(el => el.nombre != btn.id);
      guardarLS(productos);
      cuadroHTML(productos);
    })
  });
};

class Producto {
    constructor(nmProd, prDeList, prDeVta, canti) {
        this.nombre = nmProd,
        this.precioLista = prDeList,
        this.precioVenta = prDeVta,
        this.cantidad = canti;
    }
};

function filtrar(arr, filtro) {
    return arr.filter((el) => {
        return el.nombre.toLowerCase().includes(filtro);
    });
};

// Ejecucion Funciones
guardarLS(productos);
cuadroHTML(productos);

// Listeners
btnAgregar.addEventListener("click", (e)=>{
    e.preventDefault();

    const newProduct = new Producto(inputProd.value, prLista.value, prVenta.value, cant.value);

    if(inputProd.value == "" && prLista.value == "" && prVenta.value == ""){
        msgErrPr.innerHTML="¡Todos los campos deben completarse!";
    }else{
        msgErrPr.innerHTML="";
        cargarGasto(newProduct);
        guardarLS(productos);
        cuadroHTML(productos);
        limpiarCampos();

        let counter = 0;
        setInterval(()=>{
            counter ++
            if(counter <= 3){
                trTable.classList.add("bgGrey")
                setTimeout(()=>{
                    trTable.classList.remove("bgGrey")
                }, 300)
                
            }
        }, 600)
    };
});

inputSearch.addEventListener("input", () => {
    let nuevoFiltro = filtrar(productos, inputSearch.value.toLowerCase());
    cuadroHTML(nuevoFiltro);
});
