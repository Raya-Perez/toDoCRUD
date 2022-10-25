const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrougt = 'line-Through';


let id = 0;



//creacion de fecha actualizada
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es', {
    weekday: 'long', 
    month: 'short', 
    day: 'numeric'
});



//Funcion agregar tarea 

function agregarTarea(tarea, id, realizado, eliminado) {
    
    if(eliminado){return}
    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrougt : '';

    const elemento = `
                    <li id="elemento">
                        <i class="far ${REALIZADO} co" 
                        data="realizado" 
                        id="${id}"
                        >
                        </i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de"
                            data="eliminado" 
                            id="${id}"
                            >
                            </i>

                    </li>
                `

     lista.insertAdjacentHTML("beforeend", elemento);                   
};

//funcion tarea realizada
function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrougt)

}

//funcion tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
}

//Crear eventos para el clic y el enter 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value;

    if (tarea){
        agregarTarea(tarea, id, false, false);
    }
    
});

document.addEventListener('keyup', function(event) {
    if(event.key == 'Enter'){
        const tarea = input.value;

        if (tarea){
            agregarTarea(tarea, id, false, false);

            input.value = '';
            id++;
        }

    }

});

//Evento cambiar estado de la tarea y eliminar tareas 
lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;

    if(elementData == 'realizado'){
        tareaRealizada(element);
    }
    else if(elementData == 'eliminado'){
        tareaEliminada(element);

    }
});
