import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent {

  @Input() value: string = '';
  @Input() describ: string = '';
  @Input() check: boolean = false;
  @Input() dataFinalizacao: any;

  @Output() taskChange = new EventEmitter();
  @Output() taskCheck = new EventEmitter();
  @Output() taskDelete = new EventEmitter();

  task: Task = {descricao: '', dataFinalizacao: new Date(), checked: false}

  taskAlterd: any = {id:'', checked: false, describ: ''}

  tarefaAtrasada: boolean = false;

  constructor(
    private modalService: ModalService
  ){}

  onChangeValue(event: any, descricao: string){

    this.taskAlterd.id = event.target.value;
    this.taskAlterd.checked = event.target.checked;
    this.taskAlterd.describ = descricao

    this.taskCheck.emit(this.taskAlterd);
  }

  removerItem(descricao:string){
    this.modalService.showModalConfirm();

    this.modalService.getConfirmation().subscribe((confirmation) => {
      if(confirmation){
        this.taskDelete.emit(descricao)
      }
    });

  }

  editarItem(dataFinalizacao: any, descricao: string){

    this.task.descricao = descricao
    this.task.dataFinalizacao = dataFinalizacao

    this.modalService.showModal(this.task, 'editar', this.value).subscribe((editedTask: any) => {
      this.taskChange.emit(editedTask);
    });

  }

  verificaPrazo(){

    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    
    if(this.dataFinalizacao < dataAtual){
      this.tarefaAtrasada = true;
    }
    
    return this.tarefaAtrasada;

  }

}
