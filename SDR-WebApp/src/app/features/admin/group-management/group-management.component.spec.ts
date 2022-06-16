import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CellClassParams } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogService } from 'src/app/shared/services/communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupManagementComponent } from './group-management.component';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';

describe('GroupManagementComponent', () => {
  let component: GroupManagementComponent;
  let fixture: ComponentFixture<GroupManagementComponent>;

  beforeEach(() => {
    const bsModalServiceStub = () => ({
      show: (content: any, object: any) => ({}),
    });
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({}),
    });
    const serviceCallStub = () => ({
      getAllGroups: (reqObj: any) => ({
        subscribe: (f: (arg0: {}) => any) => f({}),
      }),
    });
    const commonMethodsServiceStub = () => ({
      postGroup: (arg: any, arg1: any) => ({}),
    });
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GroupManagementComponent],
      providers: [
        { provide: BsModalService, useFactory: bsModalServiceStub },
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
      ],
    });
    fixture = TestBed.createComponent(GroupManagementComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showError has default value`, () => {
    expect(component.showError).toEqual(false);
  });

  it(`suppressRowTransform has default value`, () => {
    expect(component.suppressRowTransform).toEqual(true);
  });

  it(`BLOCK_SIZE has default value`, () => {
    expect(component.BLOCK_SIZE).toEqual(configList.BLOCK_SIZE);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService =
        fixture.debugElement.injector.get(DialogService);
      spyOn(component, 'getAllGroups').and.callThrough();
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.ngOnInit();
      expect(component.getAllGroups).toHaveBeenCalled();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });

  describe('getAllGroups', () => {
    it('makes expected calls', () => {
      const ngxSpinnerServiceStub: NgxSpinnerService =
        fixture.debugElement.injector.get(NgxSpinnerService);
      const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);
      spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      spyOn(serviceCallStub, 'getAllGroups').and.callThrough();
      component.getAllGroups();
      expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
      expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
      expect(serviceCallStub.getAllGroups).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('makes expected calls', () => {
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      component.responseData = {
        groupId: 'c50ccb41-db9b-4b97-b132-cbbfaa68af5a',
        groupName: 'AmnesiaReadWrite',
        groupDescription: 'Group is for Amnesia',
        permission: 'READ_WRITE',
        groupFilter: [
          {
            groupFieldName: 'study',
            groupFilterValues: ['StudyTitle1-Tag6', 'StudyTitle1-Tag7'],
            groupName: 'AmnesiaReadWrite',
            permission: 'READ_WRITE',
            groupId: 'c50ccb41-db9b-4b97-b132-cbbfaa68af5a',
          },
        ],
        groupModifiedOn: '2022-MAY-19',
        groupModifiedBy: '',
        groupCreatedOn: '2022-MAY-11',
        groupCreatedBy: '',
        groupEnabled: false,
      };
      component.deleteGroup = {
        groupId: 'c50ccb41-db9b-4b97-b132-cbbfaa68af5a',
        groupName: 'AmnesiaReadWrite',
        groupDescription: 'Group is for Amnesia',
        permission: 'READ_WRITE',
        groupFilter: [
          {
            groupFieldName: 'study',
            groupFilterValues: ['StudyTitle1-Tag6', 'StudyTitle1-Tag7'],
            groupName: 'AmnesiaReadWrite',
            permission: 'READ_WRITE',
            groupId: 'c50ccb41-db9b-4b97-b132-cbbfaa68af5a',
          },
        ],
        groupModifiedOn: '2022-MAY-19',
        groupModifiedBy: '',
        groupCreatedOn: '2022-MAY-11',
        groupCreatedBy: '',
        groupEnabled: false,
      };
      spyOn(commonMethodsServiceStub, 'postGroup').and.callThrough();
      component.confirm();
      expect(commonMethodsServiceStub.postGroup).toHaveBeenCalled();
    });
  });
});
