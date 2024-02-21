import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cadastro-tarefa',
  templateUrl: './cadastro-tarefa.component.html',
  styleUrls: ['./cadastro-tarefa.component.scss'],
  preserveWhitespaces:true
})
export class CadastroTarefaComponent {

  @Input() modo: 'adicionar' | 'editar' | any;
  @Input() descricao = '';
  @Input() dataFinal: any;
  @Input() index: any;

  @Output() newTask = new EventEmitter();

  formulario: FormGroup | any;

  taskEdit = {descricao:'', dataFinalizacao: new Date(), index: ""};

  constructor(private formBuilder: FormBuilder,private modalRef: BsModalRef) {

    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],
      dataFinalizacao: [null, Validators.required]
    });

  }

  onClose(){
    this.modalRef.hide()
  }

  emitirTarefa(index: any){

    if(this.modo === 'adicionar'){
      
      this.newTask.emit(this.formulario.value);

    } else {
      
      const editedTask = {

        descricao: this.formulario.get('descricao').value,
        dataFinalizacao: this.formulario.get('dataFinalizacao').value,
        index:  index

      };

      this.newTask.emit(editedTask);

    }

    this.onClose();

  }

}
