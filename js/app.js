//Variables y Selectores

 const formulario = document.querySelector("#agregar-gasto")
const gastoListado = document.querySelector("#gastos ul")

// Eventos

eventListeners()

function eventListeners(){
    document.addEventListener("DOMContentLoaded",preguntarPresupuesto)
    formulario.addEventListener("submit",agregarGasto)
}







// Classes

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto)
        this.gastos = []


    }

 nuevoGasto(gasto){
    this.gastos = [...this.gastos,gasto]
   this.calcularRestante()
   

 }
 
 calcularRestante(){

const gastado = this.gastos.reduce( (total, gasto)=> total + gasto.cantidad,0)
 this.restante = this.presupuesto - gastado

     
}
eliminarGasto(id){

    this.gastos = this.gastos.filter(gasto => gasto.id !== id)
    ui.agregarDatosLista(this.gastos)
    this.calcularRestante()
    ui.actualizarRestante(this.restante)
    ui.comprobarCantidad(presupuesto)

    
    



}
 



}


class UI{
    insertarPresupuesto(cantidad){
        const { presupuesto , restante} = cantidad
        document.querySelector("#total").textContent = presupuesto
        document.querySelector("#restante").textContent = restante

    }
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement("div")
        divMensaje.classList.add("text-center","alert")
        if(tipo === "error"){

            divMensaje.classList.add("alert-danger")
            


        }
        else{
            divMensaje.classList.add("alert-success")
    
        }

        divMensaje.textContent = mensaje
     document.querySelector(".primario").insertBefore(divMensaje,formulario)
     setTimeout(() => {

        divMensaje.remove()
        
     }, 3000);

     return
    }
    agregarDatosLista(gastos){

        this.limpiarHTML()
        
        gastos.forEach(gasto => {

            const { nombre, cantidad,id} = gasto
            const nuevoGasto = document.createElement("li")
            nuevoGasto.className = "list-group-item d-flex justify-content-between align-items-center"
            nuevoGasto.dataset.id = id
            nuevoGasto.innerHTML = `

            ${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>


            `
            const bntborrar = document.createElement("button")
            bntborrar.classList.add("btn","btn-danger","borrar-gasto")
            bntborrar.textContent = "Borrar x"
            bntborrar.onclick = () =>{
                presupuesto.eliminarGasto(id)
            }


            nuevoGasto.appendChild(bntborrar)


            gastoListado.appendChild(nuevoGasto)


           



            
        });

        
    

        
        
    }
    limpiarHTML(){
        while(gastoListado.firstChild)
       gastoListado.removeChild(gastoListado.firstChild)

    }
    actualizarRestante(restante){
        document.querySelector("#restante").textContent = restante



    }
    comprobarCantidad(objeto){
        const { presupuesto,restante} = objeto

        const restanteDiv = document.querySelector(".restante")

   if( presupuesto / 4 > restante ){
    restanteDiv.classList.remove("alert-success","alert-warning")
    restanteDiv.classList.add("alert-danger")
  
    }
    else if(presupuesto / 2 > restante ){
    restanteDiv.classList.remove("alert-success","alert-danger")
    restanteDiv.classList.add("alert-warning")

    }
    else{
        restanteDiv.classList.remove("alert-warning","alert-danger")
        restanteDiv.classList.add("alert-success")
    }

    if(restante <= 0){
        ui.imprimirAlerta("El presupuesto se ha agotado","error")
        formulario.querySelector(".btn-primary").disabled = true
    }
    else if(restante > 0){
        formulario.querySelector(".btn-primary").disabled = false
    }

    


   }
 


    }


//Instanciar
let presupuesto;
const ui = new UI()

// Funciones

function preguntarPresupuesto(){
    
    const preguntarUsuario = prompt("¿Cual es tu presupuesto")

    //console.log(preguntarUsuario)

    if(preguntarUsuario === "" || preguntarUsuario === null || isNaN(preguntarUsuario) || preguntarUsuario <= 0){
        window.location.reload()
    }
    else{

        presupuesto = new Presupuesto(preguntarUsuario)


         ui.insertarPresupuesto(presupuesto)
    }
}

function agregarGasto(){
const nombre = document.querySelector("#gasto").value
const cantidad = Number(document.querySelector("#cantidad").value);


if( nombre == ""  || cantidad ==""){

    ui.imprimirAlerta("Todos los campos son obligatorios","error")

}
else if(cantidad <= 0 || isNaN(cantidad)){


    ui.imprimirAlerta("La cantidad no es valida","error")

}

else{

    const gasto = {nombre,cantidad,id: Date.now()
    } 


    presupuesto.nuevoGasto(gasto)

   formulario.reset()

    ui.imprimirAlerta("Agregando Datos","success")

    const {gastos,restante} = presupuesto

    ui.agregarDatosLista(gastos)

    ui.actualizarRestante(restante)
    ui.comprobarCantidad(presupuesto)

    

}

}


