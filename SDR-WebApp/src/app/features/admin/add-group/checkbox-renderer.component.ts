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
      *ngIf="!radio"
      type="checkbox"
      class="chkBox"
      [checked]="params.data?.selected"
      (change)="this.refresh(this.params)"
    />{{ params.selected }}
    <input
      *ngIf="radio"
      type="radio"
      class="chkBox"
      name="radAnswer"
      [checked]="params.data?.selected"
      (change)="this.refresh(this.params)"
    />{{ params.selected }}
  `,
  styleUrls: ['./add-group.component.scss'],
})
export class CheckboxRenderer implements AgRendererComponent {
  public params: any;
  radio: any;

  agInit(params: any): void {
    this.params = params;
    this.radio = params.context.componentParent.radioButton;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {}

  refresh(params: any): boolean {
    params.data.selected = !params.data?.selected;
    params.context.componentParent.getSelectSearch(params);
    return false;
  }
}
