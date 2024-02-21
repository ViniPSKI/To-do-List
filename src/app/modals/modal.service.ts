import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CadastroTarefaComponent } from './cadastro-tarefa/cadastro-tarefa.component';
import { Observable, Subject, take } from 'rxjs';
import { ConfirmarExclusaoComponent } from './confirmar-exclusao/confirmar-exclusao.component';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) { }

  modalRef?: BsModalRef;
  private confirmationSubject = new Subject<boolean>();

  showModal(task: Task, modo: string, index: any): Observable<any> {
    
    this.modalRef = this.modalService.show(CadastroTarefaComponent);
    this.modalRef.content.descricao = task.descricao
    this.modalRef.content.dataFinal = task.dataFinalizacao
    this.modalRef.content.modo = modo
    this.modalRef.content.index = index

    return this.modalRef.content.newTask.pipe(take(1));

  }

  showModalConfirm(){
    this.modalRef = this.modalService.show(ConfirmarExclusaoComponent);
  }

  getConfirmation(): Observable<boolean> {
    return this.confirmationSubject.asObservable().pipe(take(1));
  }

  comfirmModal(confirmation: boolean){
    this.confirmationSubject.next(confirmation);
  }

}
