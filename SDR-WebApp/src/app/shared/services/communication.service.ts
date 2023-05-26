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

  private searchData = new BehaviorSubject<any>({});
  getSearchData = this.searchData.asObservable();

  private fromState = new BehaviorSubject<string>('');
  getFromState = this.fromState.asObservable();

  changeDialogState(value: string): void {
    this.dialog.next(value);
    //console.log(value);
  }

  sendSearchData(message: any) {
    this.searchData.next(message);
  }

  sendFromState(state: string) {
    this.fromState.next(state);
  }
}
