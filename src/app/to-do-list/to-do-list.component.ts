import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Task } from '../models/task';
import { ModalService } from '../modals/modal.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {

  tarefas: Task[] = []

  taskNull: Task = {descricao: '', checked: false, dataFinalizacao: new Date()}

  tarefasFinalizadas: Task[] = [];

  formulario: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private serviceModal: ModalService
    ){

  }

  ngOnInit(){

    this.formulario = this.formBuilder.group({
      novaTarefa: [null]
    });

  }

  onChangeTask(taskChanged: any){

    if(taskChanged.checked){

      const index = this.tarefas.findIndex(task => task.descricao === taskChanged.describ);

      var TaskRemoved = this.tarefas.splice(index, 1);

      var taskMove: Task = {descricao: TaskRemoved[0].descricao, checked: !TaskRemoved[0].checked, dataFinalizacao: TaskRemoved[0].dataFinalizacao};

      this.tarefasFinalizadas.push(taskMove);

    }
  }

  adicionar() {

    this.serviceModal.showModal(this.taskNull, 'adicionar', null).subscribe((novaTarefa: any) => {

      this.tarefas.push(novaTarefa);

    });

  }
  
  onTarefaEditada(editedTask: any) {

    const index = editedTask.index;
    this.tarefas.splice(index, 1, editedTask);
    
  }

  deletar(describ:string){

    const index = this.tarefas.findIndex(task => task.descricao === describ);

    this.tarefas.splice(index, 1);

  }

}
