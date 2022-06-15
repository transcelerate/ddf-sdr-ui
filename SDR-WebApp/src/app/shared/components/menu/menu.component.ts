import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DialogService } from '../../services/communication.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuList = [
    {
      name: 'Home',
      link: 'home',
      isSelected: true,
    },
    {
      name: 'Search Study Definitions',
      link: 'search',
      isSelected: false,
    },
   
  ];

  constructor(private ds: DialogService, private authService: MsalService) {}

  refreshStatus: boolean;
  /*
  To notify other components on click of menu
  */
  ngOnInit() {
    this.ds.dialogObservable.subscribe((dialogState) => {
      this.refreshStatus = dialogState !== 'Not Clicked';
      if(this.menuList.length == 2 && localStorage.getItem('isAdmin') == 'true' ){
        this.menuList.push( {
          name: 'Group Management',
          link: 'admin',
          isSelected: false,
        },
        {
          name: 'User Management',
          link: 'admin/userMap',
          isSelected: false,
        },);
      }
      this.changeActive(dialogState);
    });
  }
  changeActive(selectedName: String) {
    this.menuList = this.menuList.map((elem) => {
      elem.isSelected = elem.name == selectedName;
      return elem;
    });
  }
     /*
  Logout logic 
  */
  async logout() {
    //this.authService.logoutRedirect();
    localStorage.setItem('isAdmin', 'false');
    let homeAccountId:any = localStorage.getItem('homeAccountId');
    const currentAccount:any = this.authService.instance.getAccountByHomeId(
      homeAccountId
    );
    await this.authService.instance.logout({ logoutHint: currentAccount?.idTokenClaims.login_hint});
  }
}
