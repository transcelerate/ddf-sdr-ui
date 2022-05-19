import { Component, OnDestroy } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import {
  IAfterGuiAttachedParams,
  ICellRendererParams,
} from 'ag-grid-community';
@Component({
  selector: 'checkbox-renderer',
  template: `
    <input
      type="checkbox"
      class="chkBox"
      [(ngModel)]="params.value"
      (change)="this.refresh(this.params)"
    />
  `,
  styleUrls: ['./add-group.component.scss'],
})
export class CheckboxRenderer implements AgRendererComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {}

  refresh(params: any): boolean {
    params.context.componentParent.getSelectSearch(params);
    return false;
  }
}
