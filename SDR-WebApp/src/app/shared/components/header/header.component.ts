import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DialogService } from '../../services/communication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private ds: DialogService, private authService: MsalService) {}
  refreshStatus = false;
  ngOnInit(): void {
    this.ds.dialogObservable.subscribe((dialogState) => {
      this.refreshStatus = dialogState !== 'Not Clicked';
    });
    window.addEventListener('unload', function () {});
    window.addEventListener(
      'pagehide',
      (event) => {
        // if (event.persisted) {
        //   /* the page isn't being discarded, so it can be reused later */
        // }
      },
      false
    );
  }
}
