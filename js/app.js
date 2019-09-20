'use strict'

let presupuestoUsusario = document.getElementById("confirmar");
const formulario = document.querySelector('#agregar-gasto');
let cantidadPresupuesto;

class Presupuesto{
  constructor(presupuesto){
  this.presupuesto = Number(presupuesto);
  this.restante = Number(presupuesto);
  }
    presupuestoRestante(cantidad){
    return this.restante -= Number(cantidad);
  }
}

class Interfaz{
  insertarPresupuesto(cantidad){
    const presupuesto = document.querySelector('#total');
    const restante = document.querySelector('#restante');
   
    presupuesto.innerHTML = `${cantidad} $`;
    restante.innerHTML = `${cantidad} $`
  }
  imprimirMensaje(mensaje, tipo){
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');
    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-succes');
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    document.querySelector('.primario').insertBefore(divMensaje, formulario);
    //insertBefore toma dos parametros: el primero es lo que quieres ingresar y el segundo es antes de donde

    setTimeout(function(){
      document.querySelector('.primario .alert').remove();
      formulario.reset();
    },2000);
  }
  imprimirListadoDeGastos(nombreGasto, cantidadGasto){
    const gastosListado = document.querySelector('#gastos ul');
    const li = document.createElement('li');
    li.classList = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
    ${nombreGasto}:
    ${cantidadGasto}$
    `;
    gastosListado.appendChild(li);
  }
  presupuestoRestante(cantidad){
    const restante = document.querySelector('#restante');
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
    console.log(presupuestoRestanteUsuario)
    restante.innerHTML = `${presupuestoRestanteUsuario}`
    if(presupuestoRestanteUsuario < 0){
      const p = document.createElement('p');
      p.innerHTML = `Saldo negativo`;
      restante.appendChild(p);
    }

    this.comprobarPresupuesto();
  }
  comprobarPresupuesto(){
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;
    const restante = document.querySelector('.restante');

    if((presupuestoTotal / 4 ) > presupuestoRestante){
      restante.classList.remove('alert-success', 'alert-warning');
      restante.classList.add('alert-danger');
    }else if((presupuestoTotal / 2 ) > presupuestoRestante){
      restante.classList.remove('alert-success');
      restante.classList.add('alert-warning');
    }
  }
}

confirmar.addEventListener('click', function(){
    var input = document.getElementById("ingresos");
    var valor = Number(input.value);
   
if(valor === null || valor === ''){

}else{
 
  cantidadPresupuesto = new Presupuesto(valor)
  const ui = new Interfaz()
  ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
 }
})

formulario.addEventListener('submit', function(event){
event.preventDefault()
const gasto = document.querySelector('#gasto').value;
const cantidadGasto = document.querySelector('#cantidad').value;

const ui = new Interfaz()
if(gasto === '' || cantidadGasto === ''){
  ui.imprimirMensaje('Rellene los campos', 'error')
}else{
  ui.imprimirMensaje('Correcto', 'correcto')
  ui.imprimirListadoDeGastos(gasto, cantidadGasto)
  ui.presupuestoRestante(cantidadGasto)
}
})
