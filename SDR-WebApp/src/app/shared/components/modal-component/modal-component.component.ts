import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponentComponent {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef) {}

  passBackData() {
    this.passEntry.emit('Modal Closed');
  }
}
