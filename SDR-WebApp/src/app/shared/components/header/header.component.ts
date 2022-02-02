import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DialogService } from '../../services/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private ds: DialogService, private authService: MsalService) { }
  refreshStatus = false
  ngOnInit(): void {
    
    this.ds.dialogObservable
    .subscribe((dialogState) => {
           //add your logic here!! for now I'm just gonna console log the sate of the dialog
           console.log(dialogState);
           this.refreshStatus = dialogState !== 'Not Clicked';
       });
  }
  logout() {
    this.authService.logoutRedirect();
}

}
