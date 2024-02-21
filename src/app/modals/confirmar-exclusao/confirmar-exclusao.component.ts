import { Component} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-confirmar-exclusao',
  templateUrl: './confirmar-exclusao.component.html',
  styleUrls: ['./confirmar-exclusao.component.scss']
})
export class ConfirmarExclusaoComponent {

  constructor(
    private modalRef: BsModalRef, 
    private modalService: ModalService
  ){}

  confirm(){
    this.modalService.comfirmModal(true);
    this.modalRef.hide();
  }

  decline(){
    this.modalService.comfirmModal(false);
    this.modalRef.hide()
  }

}
