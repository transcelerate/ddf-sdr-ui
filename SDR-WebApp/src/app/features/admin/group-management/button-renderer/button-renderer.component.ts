// app/button-cell-renderer.component.ts

import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'btn-cell-renderer',
  templateUrl: './button-renderer.html',
  styleUrls: ['./button-renderer.scss'],
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  componentParent: any;
  action: boolean;
  isFromUser: any;
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  public params!: ICellRendererParams;
  public paramData: any;

  agInit(params: ICellRendererParams): void {
    if (params?.data) {
      this.params = params;
      this.paramData = params.data.groupFilterValues || params.data.groups;
      this.isFromUser = params?.data?.groups;
      this.componentParent = params.context.componentParent;
      if (params.colDef?.cellRendererParams?.type) {
        this.action = params.colDef?.cellRendererParams?.type === 'action';
      }
    }
  }

  btnClickedHandler() {
    this.componentParent.openModal(
      this.params.data.groupFilterValues || this.params.data.groups
    );
  }
  delete() {
    this.componentParent.openDeleteConfirmation(this.params.data);
  }
  edit() {
    this.componentParent.edit(this.params.data);
  }
  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
