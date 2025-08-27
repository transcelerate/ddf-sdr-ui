import { Component, OnInit } from '@angular/core';
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

  constructor(private ds: DialogService) {}

  refreshStatus: boolean;
  /*
  To notify other components on click of menu
  */
  ngOnInit() {
    this.ds.dialogObservable.subscribe((dialogState) => {
      this.refreshStatus = dialogState !== 'Not Clicked';
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
}
