import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/shared/services/communication.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AddGroupComponent } from './add-group.component';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';

describe('AddGroupComponent', () => {
  let component: AddGroupComponent;
  let fixture: ComponentFixture<AddGroupComponent>;

  beforeEach(() => {
    const dialogServiceStub = () => ({ changeDialogState: (string: any) => ({}) });
    const bsModalServiceStub = () => ({ show: (template: any) => ({}) });
    const commonMethodsServiceStub = () => ({
      postGroup: (group: any, arg1: any) => ({}),
      gridDataSourceForSearchStudy: (reqObj: any, gridApi: any, bLOCK_SIZE: any, arg2: any) => ({})
    });
    const formBuilderStub = () => ({ group: (object: any, object1: any) => ({}) });
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({})
    });
    const serviceCallStub = () => ({
      checkGroup: (value: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddGroupComponent],
      providers: [
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: BsModalService, useFactory: bsModalServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(AddGroupComponent);
    component = fixture.componentInstance;
    let somevalue = {"groupId":"b9f848b8-9af7-46c1-9a3c-2663f547cc7a","groupName":"AlzheimerReadWrite","groupDescription":"Detailed description of group","permission":"READ_WRITE","groupFilter":[{"groupFieldName":"studyType","groupFilterValues":[{"id":"INTERVENTIONAL","title":"INTERVENTIONAL"},{"id":"EXPANDED_ACCESS","title":"EXPANDED_ACCESS"}],"groupName":"AlzheimerReadWrite","permission":"READ_WRITE","groupId":"b9f848b8-9af7-46c1-9a3c-2663f547cc7a"},{"groupFieldName":"study","groupFilterValues":[{"id":"studyId1","title":"Study Number Two"},{"id":"studyId2","title":"StudyTitle1-Tag3"}],"groupId":"b9f848b8-9af7-46c1-9a3c-2663f547cc7a"}],"groupModifiedOn":"2022-JUN-01","groupModifiedBy":"yuvarani.nagarajan@accenture.com","groupCreatedOn":"2022-MAY-10","groupCreatedBy":"admin1@SDR.com","groupEnabled":true};
    window.history.pushState({ data: somevalue, selected:'studyType'}, '', '');
    // component.initialForm.setValue({
    //   "groupName":"",
    //   "groupPermission":"",
    //   "groupFieldName":""
    // });
 
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isSearchSelected has default value`, () => {
    expect(component.isSearchSelected).toEqual(undefined);
  });

  it(`showAddButton has default value`, () => {
    expect(component.showAddButton).toEqual(false);
  });

  it(`searchList has default value`, () => {
    expect(component.searchList).toEqual([]);
  });

  it(`value has default value`, () => {
    expect(component.value).toEqual([]);
  });

  it(`tooltipShowDelay has default value`, () => {
    expect(component.tooltipShowDelay).toEqual(0);
  });

  it(`BLOCK_SIZE has default value`, () => {
    expect(component.BLOCK_SIZE).toEqual(configList.BLOCK_SIZE);
  });

  describe('openModal', () => {
    it('makes expected calls', () => {
      const templateRefStub: any = <any>{};
      const bsModalServiceStub: BsModalService = fixture.debugElement.injector.get(
        BsModalService
      );
      spyOn(bsModalServiceStub, 'show').and.callThrough();
      component.openModal(templateRefStub);
      expect(bsModalServiceStub.show).toHaveBeenCalled();
    });
  });

  describe('openSearchData', () => {
    it('makes expected calls', () => {
      const templateRefStub: any = <any>{};
      const bsModalServiceStub: BsModalService = fixture.debugElement.injector.get(
        BsModalService
      );
      spyOn(bsModalServiceStub, 'show').and.callThrough();
      component.openSearchData(templateRefStub);
      expect(bsModalServiceStub.show).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      spyOn(component, 'filterFieldSelected').and.callThrough();
      spyOn(component, 'checkSave').and.callThrough();
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.initialForm.setValue({
          "groupName":"uu",
          "groupPermission":"99",
          "groupFieldName":""
        });
      component.ngOnInit();
      expect(component.filterFieldSelected).toHaveBeenCalled();
      expect(component.checkSave).toHaveBeenCalled();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });

  describe('filterFieldSelected', () => {
    it('makes expected calls', () => {
      spyOn(component, 'findIndex').and.callThrough();
      component.filterFieldSelected();
      expect(component.findIndex).toHaveBeenCalled();
    });
  });

  describe('addRule', () => {
    it('makes expected calls', () => {
      spyOn(component, 'findIndex').and.callThrough();
      spyOn(component, 'checkSave').and.callThrough();
      component.addRule();
      expect(component.findIndex).toHaveBeenCalled();
      expect(component.checkSave).toHaveBeenCalled();
    });
  });

  describe('saveGroup', () => {
    it('makes expected calls', () => {
      const commonMethodsServiceStub: CommonMethodsService = fixture.debugElement.injector.get(
        CommonMethodsService
      );
      spyOn(commonMethodsServiceStub, 'postGroup').and.callThrough();
      component.saveGroup();
      expect(commonMethodsServiceStub.postGroup).toHaveBeenCalled();
    });
  });

  describe('onClosed', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.onClosed();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });

  describe('submitSearch', () => {
    it('makes expected calls', () => {
      const commonMethodsServiceStub: CommonMethodsService = fixture.debugElement.injector.get(
        CommonMethodsService
      );
      spyOn(
        commonMethodsServiceStub,
        'gridDataSourceForSearchStudy'
      ).and.callThrough();
      component.showGrid = true;
      component.submitSearch();
      expect(
        commonMethodsServiceStub.gridDataSourceForSearchStudy
      ).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onClosed').and.callThrough();
      component.confirm();
      expect(component.onClosed).toHaveBeenCalled();
    });
  });
});
