const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrougt = 'line-Through';
let LIST;


let id;



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
    element.parentNode.querySelector('.text').classList.toggle(lineThrougt);
    LIST[element.id].realizado =LIST[element.id].realizado ? false : true;

}

//funcion tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}

//Crear eventos para el clic y el enter 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value;

    if (tarea){
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false,
        });
        localStorage.setItem('TODO', JSON.Stringify(LIST));

        input.value = '';
        id++;
    }
    
});

document.addEventListener('keyup', function(event) {
    if(event.key == 'Enter'){
        const tarea = input.value;

        if (tarea){
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false,
            });

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
    localStorage.setItem('TODO', JSON.Stringify(LIST));
});


//Get local storege 
let data = localStorage.getItem('TODO');

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);

} else{
    LIST = [];
    id = 0;
}

function cargarLista(array){
    array.forEach(function(item){
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
    });
}
