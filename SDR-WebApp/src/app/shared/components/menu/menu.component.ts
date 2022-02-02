import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/communication.service'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
   menuList=[
    {
      name:'Home',
      link:'home',
      isSelected : true
    },
    {
      name:'Search Study Definitions',
      link:'search',
      isSelected : false
    },
    {
      name:'Study Versions Comparison',
      link:'home',
      isSelected : false
    }];
   
  constructor(private ds: DialogService) {
    
   }

   refreshStatus:boolean;

   ngOnInit() {
       

       this.ds.dialogObservable
       .subscribe((dialogState) => {
              //add your logic here!! for now I'm just gonna console log the sate of the dialog
              console.log(dialogState);
              this.refreshStatus = dialogState !== 'Not Clicked';
              this.changeActive(dialogState);
          });
   }  
  changeActive(selectedName: String){
    this.menuList = this.menuList.map(elem=>{
      elem.isSelected = elem.name == selectedName;
      return elem;
    })
  }
  
}
