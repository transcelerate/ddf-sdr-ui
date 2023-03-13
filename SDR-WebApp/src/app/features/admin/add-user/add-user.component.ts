import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/shared/services/communication.service';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [
    './add-user.component.scss',
    '../add-group/add-group.component.scss',
  ],
})
export class AddUserComponent implements OnInit {
  groupList: any;

  groupSelected: any = [];
  userSelected: any = [];
  dropdownSettings: IDropdownSettings;
  dropdownSettingsUser: IDropdownSettings;
  userList: any;
  showError: boolean;
  saveSuccess: boolean;
  modalRef?: BsModalRef;
  isEdit: boolean;
  groupSelectedOriginal: any = [];
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService,
    private commonMethod: CommonMethodsService,
    private ds: DialogService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.ds.changeDialogState('Admin');
    this.serviceCall.getAllUserList().subscribe({
      next: (users: any) => {
        //this.userExists = true;
        this.spinner.hide();
        this.userList = users.map((elem: any) => {
          elem.toShow =
            (elem.mail !== null ? elem.mail : '') +
            '(' +
            elem.displayName +
            ')';
          return elem;
        });
        const selectedUser = history.state.data;
        if (selectedUser) {
          this.isEdit = true;
          this.groupSelected = selectedUser.groups;
          this.groupSelectedOriginal = this.groupSelected;
          this.userSelected = this.userList.filter((elem: { id: any }) => {
            return elem.id === selectedUser.oid;
          });
          this.userSelected = this.userSelected.map((elem: any) => {
            elem.toShow = (elem.mail || '') + '(' + elem.displayName + ')';
            return elem;
          });
        }
      },
      error: (error) => {
        this.showError = true;
        this.spinner.hide();
      },
    });
    this.spinner.show();
    this.serviceCall.getAllGroupList().subscribe({
      next: (users: any) => {
        //this.userExists = true;
        this.spinner.hide();
        this.groupList = users;
      },
      error: (error) => {
        this.showError = true;
        this.spinner.hide();
      },
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'groupId',
      textField: 'groupName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 300000,
      allowSearchFilter: true,
    };
    this.dropdownSettingsUser = {
      singleSelection: true,
      idField: 'id',
      textField: 'toShow',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 300000,
      allowSearchFilter: true,
    };
  }

  addUser() {
    let groups: any = [];
    let email = this.userList.filter((elem: { id: any }) => {
      return elem.id == this.userSelected[0].id;
    })[0];
    if (!this.isEdit) {
      groups = this.groupSelected.map((elem: any) => {
        elem.isActive = true;
        return elem;
      });
    } else {
      groups = this.groupSelectedOriginal.map((elem: any) => {
        elem.isActive = false;
        if (
          this.groupSelected.filter((val: any) => {
            return val.groupId === elem.groupId;
          }).length > 0
        ) {
          elem.isActive = true;
        }
        return elem;
      });
      const arr = this.groupSelected.filter(
        (o: any) => !groups.some((i: any) => i.groupId === o.groupId)
      );
      arr.forEach((element: any) => {
        element.isActive = true;
        groups.push(element);
      });
    }

    let request = {
      oid: email.id,
      email: email.mail || email.displayName,
      groups: groups,
    };

    this.commonMethod.postUser(request, this);
  }
  getAllUsers() {
    this.saveSuccess = true;
  }
  onClosed() {
    this.router.navigateByUrl('/admin/userMap');
  }
  openSearchData(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  confirm() {
    this.modalRef?.hide();
    this.onClosed();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
