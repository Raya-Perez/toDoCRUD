const app = new Vue({
    el: '#app' ,
    data: {
        title: 'Tareas del proyecto con Vue', 
        sesion: 16,
        profesores: {
            'nombre': 'Juan',
            'modulo': '4'
        },
        tareas:[],
        nuevaTarea:'',

    },

    methods: {
        agregarTarea(){
            this.tareas.push({
                nombre: this.nuevaTarea,
                estado:false,
            });
            this.nuevaTarea= '';
        },

        editarTarea(index){
            if(this.tareas[index].estado){
                this.tareas[index].estado = false;

            }else{
                this.tareas[index].estado = true;

            }

        },

        eliminarTarea(){
            if(!this.tareas[index].estado){
            this.tareas.splice(index, 1);

            }
        },

    },

    computed: {

    },

    beforeCreate(){

    },
    created(){

    },
});