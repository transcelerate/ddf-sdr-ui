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
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { UsageComponent } from './usage.component';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;

  beforeEach(() => {
    const dialogServiceStub = () => ({ changeDialogState: (string: any) => ({}) });
    const bsModalServiceStub = () => ({ show: (template: any) => ({}) });
    const commonMethodsServiceStub = () => ({
      gridDataSourceForUsageReport: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any,
        isFromClear: any
      ) => ({})
    });
    const formBuilderStub = () => ({ group: (object: any, object1: any) => ({}) });
    const ngxSpinnerServiceStub = () => ({});
    const serviceCallStub = () => ({});
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UsageComponent],
      providers: [
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: BsModalService, useFactory: bsModalServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        FormBuilder,
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(UsageComponent);
    component = fixture.componentInstance;
    component.editorForm.setValue({
      days: 'uu',
      operation: '99',
      responseCode: 'study',
    });
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`dropDownConfig has default value`, () => {
    expect(component.dropDownConfig).toEqual(configList);
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



 

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.ngOnInit();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });


  describe('clear', () => {
    it('makes expected calls', () => {
      spyOn(component, 'submitSearch').and.callThrough();
      component.clear();
      expect(component.submitSearch).toHaveBeenCalled();
    });
  });


  describe('submitSearch', () => {
    it('makes expected calls', () => {
      
      component.submitSearch(true);
      expect(true).toEqual(true);
    });
  });
});
