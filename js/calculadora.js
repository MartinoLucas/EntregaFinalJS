const inputNombreProducto = document.querySelector("#inputNombreProducto");
const inputPrecioLista = document.querySelector("#inputPrecioLista");
const inputCostosVariables = document.querySelector("#inputCostosVariables");
const inputCostosFijos = document.querySelector("#inputCostosFijos");
const inputMargen = document.querySelector("#inputMargen");
const btnCalcular = document.querySelector("#btnCalcular");
const h4Calculadora = document.querySelector("#h4Calculadora");

// FUNCIONES
class CalcularPrecio{

    constructor(nombreProducto, precioDeLista, costosVariables, costosFijos, margenDeGanancia){
        this.nombreProducto = nombreProducto;
        this.precioDeLista = precioDeLista;
        this.costosVariables = costosVariables;
        this.costosFijos = costosFijos;
        this.margenDeGanancia = margenDeGanancia;
        this.precio = 0;
    };

    calcularPrecio(){
       this.precio = parseInt((this.costosFijos + this.costosVariables + this.precioDeLista) * this.margenDeGanancia);
    }
};
function precioProducto(obj){
    obj.calcularPrecio();
};

function HTMLPrecio(obj){
    h4Calculadora.innerHTML = `El precio de ${obj.nombreProducto} debe ser: $${obj.precio}`;
}

function limpiarCampos(){
    inputNombreProducto = ""; 
    inputPrecioLista = ""; 
    inputCostosVariables = ""; 
    inputCostosFijos = ""; 
    inputMargen = "";
};

// LISTENERS
btnCalcular.addEventListener("click", (e)=>{
    e.preventDefault();

    const namePr = inputNombreProducto.value;
    const prLista = parseInt(inputPrecioLista.value);
    const ctVar = Number(inputCostosVariables.value);
    const ctFij = Number(inputCostosFijos.value);
    const marg = Number(inputMargen.value);

    const precioProduct1 = new CalcularPrecio(namePr, prLista, ctVar, ctFij, marg);
    precioProduct1.calcularPrecio();

    console.log(precioProduct1);
    console.log(inputNombreProducto, prLista, ctVar, ctFij, marg);

    HTMLPrecio(precioProduct1);
    // limpiarCampos();
})
