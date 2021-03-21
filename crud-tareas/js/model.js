export default class Model {
    constructor() {
        this.view = null;
        this.toDos = JSON.parse(localStorage.getItem("toDos"));
        if (!this.toDos || this.toDos.lenght < 1) {
            this.toDos = [
                {
                    id: 0,
                    title: "Learn JS",
                    description: "Watch JS Tutorials",
                    completed: false,
                }
            ]
            this.currentId = 1;
        } else {
            this.currentId = this.toDos[this.toDos.length - 1].id + 1;
        }
    }

    setView(view) {
        this.view = view;
    }

    save(){
        localStorage.setItem("toDos", JSON.stringify(this.toDos));
    }

    getToDos() {
        return this.toDos;
    }

    findToDo(id){
        return this.toDos.findIndex((toDo) => toDo.id === id); //Busca el elemento que coincida con el id seleccionado para borrar
    }

    toggleCompleted(id) {
        const index = this.findToDo(id);
        const toDo = this.toDos[index];
        toDo.completed = !toDo.completed;
        this.save();
    }

    editToDo(id, values){
        const index = this.findToDo(id);
        Object.assign(this.toDos[index], values);
        this.save();
    }
  
    addToDo(title, description){
        const toDo = {
            id: this.currentId++,
            title, //Es lo mismo que title: title,
            description, //Es lo mismo que description:description,
            completed: false,
        }

        this.toDos.push(toDo);
        console.log(this.toDos); 
        this.save();

        return {...toDo}; //Es un clon de toDo
    }

    removeToDo(id){
        const index = this.findToDo(id);
        this.toDos.splice(index, 1); //Elimina el elemento de la lista
        this.save();
    }
}