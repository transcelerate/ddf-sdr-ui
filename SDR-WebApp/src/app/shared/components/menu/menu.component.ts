import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DialogService } from '../../services/communication.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menuItems = [
    {
      text: 'Home',
      link: 'home',
      name: 'Home',
      isSelected: true,
    },
    {
      text: 'Study Definitions',
      isSelected: false,
      name: 'Search Study Definitions',
      subMenu: [
        { text: 'SEARCH', link: 'search', name: 'Search Study Definitions' },
        {
          text: 'COMPARE',
          link: 'comparison',
          name: 'Search Study Definitions',
        },
      ],
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
      if (
        this.menuItems.length == 2 &&
        localStorage.getItem('isAdmin') == 'true'
      ) {
        this.menuItems.push(
          {
            text: 'Reports',
            isSelected: false,
            name: 'Reports',
            subMenu: [{ text: 'SYSTEM USAGE', link: 'reports', name: 'Usage' }],
          },
          {
            text: 'MANAGE',
            isSelected: false,
            name: 'Admin',
            subMenu: [
              { text: 'USER', link: 'admin/userMap', name: 'User Management' },
              { text: 'GROUP', link: 'admin', name: 'Group Management' },
            ],
          }
        );
      }
      this.changeActive(dialogState);
    });
    localStorage.setItem('search1', '');
    localStorage.setItem('search2', '');
  }
  changeActive(selectedName: String) {
    this.menuItems = this.menuItems.map((elem: any) => {
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
    let homeAccountId: any = localStorage.getItem('homeAccountId');
    const currentAccount: any =
      this.authService.instance.getAccountByHomeId(homeAccountId);
    await this.authService.instance.logout({
      logoutHint: currentAccount?.idTokenClaims.login_hint,
    });
  }
}
