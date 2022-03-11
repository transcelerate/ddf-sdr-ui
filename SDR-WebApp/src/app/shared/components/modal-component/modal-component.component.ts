import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
  }
}
