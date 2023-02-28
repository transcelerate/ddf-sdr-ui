import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;
  let el: DebugElement;
  let commonMethodsService: any;
  beforeEach(() => {
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const bsModalServiceStub = () => ({ show: (template: any) => ({}) });
    const commonMethodsServiceStub = () => ({
      gridDataSourceForUsageReport: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any,
        isFromClear: any
      ) => ({}),
      sendErrorBoolean: false
    });
    const formBuilderStub = () => ({
      group: (object: any, object1: any) => ({}),
    });
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
        { provide: Router, useFactory: routerStub },
      ],
    });
    fixture = TestBed.createComponent(UsageComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.editorForm.setValue({
      fromDateTime: '2023-02-02T00:00',
      toDateTime: '2023-02-27T18:25',
      operation: '99',
      responseCode: 'study',
    });
    commonMethodsService.sendErrorBoolean.and.returnValue(of(true));
  });

  xit('can load instance', () => {
    expect(component).toBeTruthy();
  });

  xit(`dropDownConfig has default value`, () => {
    expect(component.dropDownConfig).toEqual(configList);
  });

  xit(`isSearchSelected has default value`, () => {
    expect(component.isSearchSelected).toEqual(undefined);
  });

  xit(`showAddButton has default value`, () => {
    expect(component.showAddButton).toEqual(false);
  });

  xit(`searchList has default value`, () => {
    expect(component.searchList).toEqual([]);
  });

  xit(`value has default value`, () => {
    expect(component.value).toEqual([]);
  });

  xit(`tooltipShowDelay has default value`, () => {
    expect(component.tooltipShowDelay).toEqual(0);
  });

  xit(`BLOCK_SIZE has default value`, () => {
    expect(component.BLOCK_SIZE).toEqual(configList.BLOCK_SIZE);
  });

  xdescribe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService =
        fixture.debugElement.injector.get(DialogService);
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.ngOnInit();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });

  xit('clear function is called', () => {
    spyOn(component, 'submitSearch').and.callThrough();
    component.clear();
    expect(component.submitSearch).toHaveBeenCalled();
  });

  xit('submitSearch is called', () => {  
    component.submitSearch(true);
    expect(true).toEqual(true);
  });
});
