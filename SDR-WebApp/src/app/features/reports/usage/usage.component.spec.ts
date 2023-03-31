import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DebugElement,
  EventEmitter,
  inject,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/shared/services/communication.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { UsageComponent } from './usage.component';
import { By } from '@angular/platform-browser';
import { async, of, Subject } from 'rxjs';
import * as moment from 'moment';
import { ModalComponentComponent } from 'src/app/shared/components/modal-component/modal-component.component';
describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;
  let el: DebugElement;
  let modalService: BsModalService;
  let modalRef: BsModalRef;
  let usageData = [
    {
      emailId: 'viswesh.mb@accenture.com',
      userName: 'Mb, Viswesh',
      operation: 'PUT',
      api: '/api/v2/studydefinitions',
      requestDate: '2023-03-03T07:34:14.0380071Z',
      callerIpAddress: '157.51.44.213',
      responseCode: '201',
      responseCodeDescription: '201 - Created',
    },
    {
      emailId: 'viswesh.mb@accenture.com',
      userName: 'Mb, Viswesh',
      operation: 'GET',
      api: '/api/v2/studydefinitions/fd027f34-ea71-411d-b121-b151734017bb',
      requestDate: '2023-03-03T07:33:47.6748578Z',
      callerIpAddress: '157.51.44.213',
      responseCode: '200',
      responseCodeDescription: '200 - OK',
    },
  ];
  beforeEach(() => {
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const bsModalServiceStub = () => ({ show: () => ({}), hide: () => ({}) });
    const commonMethodsServiceStub = () => ({
      gridDataSourceForUsageReport: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any,
        isFromClear: any
      ) => ({}),
      sendErrorBoolean: {
        subscribe: (f: (arg0: {}) => any) => f({}),
        next: () => ({}),
      },
    });
    const formBuilderStub = () => ({
      group: (object: any, object1: any) => ({}),
    });
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({}),
    });
    const serviceCallStub = () => ({
      getUsageReport: () => {},
    });
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
    modalService = TestBed.inject(BsModalService);
    modalRef = modalService.show(ModalComponentComponent);
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

  it('ngOnInit makes expected calls', () => {
    const dialogServiceStub: DialogService =
      fixture.debugElement.injector.get(DialogService);
    spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
    component.ngOnInit();
    expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
  });

  it('clear function is called', () => {
    spyOn(component, 'submitSearch').and.callThrough();
    component.clear();
    expect(component.submitSearch).toHaveBeenCalled();
  });

  it('submitSearch is called', () => {
    component.submitSearch(true);
    expect(true).toEqual(true);
  });

  it('check date validations if correct dates are given', () => {
    let fromDate = '2023-03-02T18:30:00.000Z';
    let toDate = '2023-03-03T09:42:00.000Z';
    spyOn(window.console, 'log');
    component.checkValidationsOfDates(fromDate, toDate);
    expect(window.console.log).toHaveBeenCalledWith(
      'Both the dates are correct'
    );
  });

  it('check date validations if incorrect dates are given', () => {
    let fromDate = '2023-03-02T18:30:00.000Z';
    let toDate = '2023-03-03T17:30:00.000Z';
    let currentDate = moment(new Date()).utc(true).toISOString().slice(0, 16);
    spyOn(window, 'alert');
    component.checkValidationsOfDates(fromDate, toDate);
    if (fromDate > currentDate) {
      expect(window.alert).toHaveBeenCalledWith(configList.VALID_FROM_DATE);
    } else if (toDate > currentDate) {
      expect(window.alert).toHaveBeenCalledWith(configList.VALID_TO_DATE);
    } else if (fromDate >= toDate) {
      expect(window.alert).toHaveBeenCalledWith(
        configList.FROM_DATE_MORE_THAN_TO_DATE
      );
    }

    fixture.detectChanges();
    fromDate = '2023-01-01T00:00';
    toDate = '2023-03-03T15:12';
    component.checkValidationsOfDates(fromDate, toDate);
    expect(window.alert).toHaveBeenCalledWith(configList.EXCEED_DATE_INFO);

    fixture.detectChanges();
    fromDate = '2022-01-01T00:00';
    toDate = '2023-03-03T15:12';
    component.checkValidationsOfDates(fromDate, toDate);
    expect(window.alert).toHaveBeenCalledWith(configList.EXCEED_DATE_INFO);
  });

  it('check if usage data is called', async () => {
    const reqObj = {
      filterByTime: true,
      fromDateTime: '2023-03-02T18:30:00.000Z',
      operation: '',
      pageSize: 20,
      recordNumber: 0,
      responseCode: 0,
      sortBy: 'requestdate',
      sortOrder: 'desc',
      toDateTime: '2023-03-03T10:57:00.000Z',
    };
    const ngxSpinnerServiceStub: NgxSpinnerService =
      fixture.debugElement.injector.get(NgxSpinnerService);
    const serviceCallStub: ServiceCall =
      fixture.debugElement.injector.get(ServiceCall);
    const bsModalServiceStub: BsModalService =
      fixture.debugElement.injector.get(BsModalService);
    spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
    spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
    spyOn(serviceCallStub, 'getUsageReport').and.callFake(() => {
      return of(usageData);
    });
    const onCloseSpy = jasmine.createSpy().and.returnValue(of({}));
    const contentMock = { passEntry: onCloseSpy };
    const modalfixture = TestBed.createComponent(ModalComponentComponent);
    // spy on event emitter
    const modalcomponent = modalfixture.componentInstance;
    modalRef.content = modalcomponent;
    spyOn(modalRef.content.passEntry, 'emit');

    spyOn(bsModalServiceStub, 'show').and.returnValue({
      id: 1,
      content: modalcomponent,
      hide: () => {},
      setClass: () => {},
      onHide: new EventEmitter(),
      onHidden: new EventEmitter(),
    });
    component.getUsageData();
    modalRef.content.passEntry.subscribe(() => {
      expect(component.downloadCSV).toHaveBeenCalled();
    });
    expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
    expect(serviceCallStub.getUsageReport).toHaveBeenCalled();
    expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
  });

  it('check if error scenario is called when search is clicked', () => {
    const reqObj = {
      filterByTime: true,
      fromDateTime: '2023-03-07T18:30:00.000Z',
      operation: '',
      pageSize: 20,
      recordNumber: 0,
      responseCode: 0,
      sortBy: 'requestdate',
      sortOrder: 'desc',
      toDateTime: '2023-03-08T07:30:00.000Z',
    };
    const commonMethodsServiceStub: CommonMethodsService =
      fixture.debugElement.injector.get(CommonMethodsService);
    const serviceCallStub: ServiceCall =
      fixture.debugElement.injector.get(ServiceCall);
    const errorSubject = new Subject();
    spyOn<ServiceCall, any>(serviceCallStub, 'getUsageReport').and.callFake(
      () => errorSubject
    );
    spyOn(
      commonMethodsServiceStub,
      'gridDataSourceForUsageReport'
    ).and.callFake((query) => errorSubject);
    errorSubject.error('error');
    fixture.detectChanges();
    component.submitSearch();
  });
});
