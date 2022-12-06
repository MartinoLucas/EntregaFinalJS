let inputNombreProducto = document.querySelector("#inputNombreProducto").value,
inputPrecioLista = document.querySelector("#inputPrecioLista").value,
inputCostosVariables = document.querySelector("#inputCostosVariables").value,
inputCostosFijos = document.querySelector("#inputCostosFijos").value,
inputMargen = document.querySelector("#inputMargen").value,
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

    const precioProduct1 = new CalcularPrecio(inputNombreProducto, inputPrecioLista, inputCostosVariables, inputCostosFijos, inputMargen);
    precioProduct1.calcularPrecio();
    console.log(inputNombreProducto, inputPrecioLista, inputCostosVariables, inputCostosFijos, inputMargen)
    HTMLPrecio(precioProduct1);
    // limpiarCampos();
})
