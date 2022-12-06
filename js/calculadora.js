const inputNombreProducto = document.querySelector("#inputNombreProducto"),
inputPrecioLista = document.querySelector("#inputPrecioLista"),
inputCostosVariables = document.querySelector("#inputCostosVariables"),
inputCostosFijos = document.querySelector("#inputCostosFijos"),
inputMargen = document.querySelector("#inputMargen"),
btnCalcular = document.querySelector("#btnCalcular"),
h4Calculadora = document.querySelector("#h4Calculadora");

// FUNCIONES
class CalcularPrecio{

    constructor(nombreProducto, precioDeLista, costosVariables, costosFijos, margenDeGanancia){
        this.nombreProducto = nombreProducto;
        this.precioDeLista = parseInt(precioDeLista);
        this.costosVariables = parseInt(costosVariables);
        this.costosFijos = parseInt(costosFijos);
        this.margenDeGanancia = parseFloat(margenDeGanancia);
        this.precio = 0;
    };

    calcularPrecio(){
       return this.precio = parseInt((this.costosFijos + this.costosVariables + this.precioDeLista) * this.margenDeGanancia);
    }
};
function precioProducto(obj){
    obj.calcularPrecio();
};

function HTMLPrecio(obj){
    h4Calculadora.innerHTML=`El precio de ${obj.nombreProducto} debe ser: $${obj.precio}`;
}

function limpiarCampos(){
    inputNombreProducto.value = "", 
    inputPrecioLista.value = "", 
    inputCostosVariables.value = "", 
    inputCostosFijos.value = "", 
    inputMargen.value = "";
};

// LISTENERS
btnCalcular.addEventListener("click", ()=>{
    const precioProduct1 = new CalcularPrecio(inputNombreProducto.value, inputPrecioLista.value, inputCostosVariables.value, inputCostosFijos.value, inputMargen.value);
    precioProduct1.calcularPrecio();
    HTMLPrecio(precioProduct1);
    limpiarCampos();
})