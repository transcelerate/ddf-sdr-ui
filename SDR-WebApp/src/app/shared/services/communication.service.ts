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

  changeDialogState(value: string): void {
    this.dialog.next(value);
    //console.log(value);
  }
}
