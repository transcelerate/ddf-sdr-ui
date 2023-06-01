import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  refreshStatus = false;

  // getStatus(){ return this.refreshStatus; }
  // setStatus(value:boolean){ this.refreshStatus = value }
  public dialog = new BehaviorSubject<string>('Not Clicked');
  dialogObservable = this.dialog.asObservable();

  public showExit = new BehaviorSubject<boolean>(false);
  getExitBool = this.showExit.asObservable();

  public clearBool = new BehaviorSubject<boolean>(false);
  callClearBool = this.clearBool.asObservable();

  changeDialogState(value: string): void {
    this.dialog.next(value);
    //console.log(value);
  }

  sendExitBool(msg: any): void {
    this.showExit.next(msg);
  }

  sendClearBool(msg: any): void {
    this.clearBool.next(msg);
  }
}
