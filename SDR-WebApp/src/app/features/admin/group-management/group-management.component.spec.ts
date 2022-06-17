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
import { of } from 'rxjs';

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
        const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);
      spyOn(component, 'getAllGroups').and.callThrough();
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      spyOn<ServiceCall, any>(serviceCallStub, 'getAllGroups').and.callFake(
        () => {
          return of([{"groupId":"a5e41cf7-b984-4091-90a2-4be699ad2f67","groupName":"OncologyReadWrite","groupDescription":"Detailed description of group","permission":"READONLY","groupFilter":[{"groupFieldName":"studyType","groupFilterValues":[{"id":"INTERVENTIONAL","title":"INTERVENTIONAL"},{"id":"EXPANDED_ACCESS","title":"EXPANDED_ACCESS"}]}],"groupModifiedOn":"2022-JUN-16","groupModifiedBy":"yuvarani.nagarajan@accenture.com","groupCreatedOn":"2022-JUN-14","groupCreatedBy":"viswesh.mb@accenture.com","groupEnabled":true},{"groupId":"0193a357-8519-4488-90e4-522f701658b9","groupName":"OncologyRead","groupDescription":"Detailed description of group","permission":"READ_WRITE","groupFilter":[{"groupFieldName":"study","groupFilterValues":[{"id":"848430c4-432f-4e2e-9e5a-e90a85144a8f","title":"Study On Parkinson disease"}]},{"groupFieldName":"studyType","groupFilterValues":[{"id":"OBSERVATIONAL","title":"OBSERVATIONAL"}]}],"groupModifiedOn":"2022-JUN-16","groupModifiedBy":"yuvarani.nagarajan@accenture.com","groupCreatedOn":"2022-MAY-10","groupCreatedBy":"admin1@SDR.com","groupEnabled":true}]); // or return a list of bookings in case you want to test the first part of the if statement
        }
      );
      component.ngOnInit();
      expect(component.getAllGroups).toHaveBeenCalled();
      expect(serviceCallStub.getAllGroups).toHaveBeenCalled();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });

  describe('getAllGroups', () => {
    it('makes expected calls', () => {
      const ngxSpinnerServiceStub: NgxSpinnerService =
        fixture.debugElement.injector.get(NgxSpinnerService);
      const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);
        spyOn<ServiceCall, any>(serviceCallStub, 'getAllGroups').and.callFake(
          () => {
            return of([{"groupId":"a5e41cf7-b984-4091-90a2-4be699ad2f67","groupName":"OncologyReadWrite","groupDescription":"Detailed description of group","permission":"READONLY","groupFilter":[{"groupFieldName":"studyType","groupFilterValues":[{"id":"INTERVENTIONAL","title":"INTERVENTIONAL"},{"id":"EXPANDED_ACCESS","title":"EXPANDED_ACCESS"}]}],"groupModifiedOn":"2022-JUN-16","groupModifiedBy":"yuvarani.nagarajan@accenture.com","groupCreatedOn":"2022-JUN-14","groupCreatedBy":"viswesh.mb@accenture.com","groupEnabled":true},{"groupId":"0193a357-8519-4488-90e4-522f701658b9","groupName":"OncologyRead","groupDescription":"Detailed description of group","permission":"READ_WRITE","groupFilter":[{"groupFieldName":"study","groupFilterValues":[{"id":"848430c4-432f-4e2e-9e5a-e90a85144a8f","title":"Study On Parkinson disease"}]},{"groupFieldName":"studyType","groupFilterValues":[{"id":"OBSERVATIONAL","title":"OBSERVATIONAL"}]}],"groupModifiedOn":"2022-JUN-16","groupModifiedBy":"yuvarani.nagarajan@accenture.com","groupCreatedOn":"2022-MAY-10","groupCreatedBy":"admin1@SDR.com","groupEnabled":true}]); // or return a list of bookings in case you want to test the first part of the if statement
          }
        );
      spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
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
      component.responseData = [{"groupId":"0193a357-8519-4488-90e4-522f701658b9","groupName":"OncologyRead","groupDescription":"Detailed description of group","permission":"READ_WRITE","groupFilter":[{"groupFieldName":"study","groupFilterValues":[{"id":"848430c4-432f-4e2e-9e5a-e90a85144a8f","title":"Study On Parkinson disease"}],"groupName":"OncologyRead","permission":"READ_WRITE","groupId":"0193a357-8519-4488-90e4-522f701658b9"},{"groupFieldName":"studyType","groupFilterValues":[{"id":"OBSERVATIONAL","title":"OBSERVATIONAL"}],"groupId":"0193a357-8519-4488-90e4-522f701658b9"}],"groupModifiedOn":"2022-JUN-15","groupModifiedBy":"viswesh.mb@accenture.com","groupCreatedOn":"2022-MAY-10","groupCreatedBy":"admin1@SDR.com","groupEnabled":true},{"groupId":"a5e41cf7-b984-4091-90a2-4be699ad2f67","groupName":"OncologyReadWrite","groupDescription":"Detailed description of group","permission":"READONLY","groupFilter":[{"groupFieldName":"studyType","groupFilterValues":[{"id":"INTERVENTIONAL","title":"INTERVENTIONAL"},{"id":"EXPANDED_ACCESS","title":"EXPANDED_ACCESS"}],"groupName":"OncologyReadWrite","permission":"READONLY","groupId":"a5e41cf7-b984-4091-90a2-4be699ad2f67"}],"groupModifiedOn":"2022-JUN-15","groupModifiedBy":"viswesh.mb@accenture.com","groupCreatedOn":"2022-JUN-14","groupCreatedBy":"viswesh.mb@accenture.com","groupEnabled":true}];
      component.deleteGroup = {"groupFieldName":"studyType","groupFilterValues":[{"id":"OBSERVATIONAL","title":"OBSERVATIONAL"}],"groupId":"0193a357-8519-4488-90e4-522f701658b9"};
      spyOn(commonMethodsServiceStub, 'postGroup').and.callThrough();
      component.confirm();    
      expect(commonMethodsServiceStub.postGroup).toHaveBeenCalled();
    });
  });
});
