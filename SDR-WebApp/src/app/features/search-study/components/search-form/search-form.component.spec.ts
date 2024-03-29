import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { ServiceCall } from '../../../../shared/services/service-call/service-call.service';
import { DialogService } from 'src/app/shared/services/communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from '../../../../shared/services/common-methods.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SearchFormComponent } from './search-form.component';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { ModalComponentComponent } from 'src/app/shared/components/modal-component/modal-component.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let el: DebugElement;
  let modalService: BsModalService;
  let modalRef: BsModalRef;
  beforeEach(() => {
    const bsModalServiceStub = () => ({
      show: (modalComponentComponent: any, initialState: any) => ({}),
    });
    const formBuilderStub = () => ({
      group: (object: any) => ({}),
    });
    const serviceCallStub = () => ({ readConfigFile: () => ({}) });
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const ngxSpinnerServiceStub = () => ({});
    const commonMethodsServiceStub = () => ({
      getSponsorIdGrid: { bind: () => ({}) },
      gridDataSourceForSearchStudy: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any
      ) => ({}),
    });
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const activatedRouteStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchFormComponent],
      providers: [
        { provide: BsModalService, useFactory: bsModalServiceStub },
        FormBuilder,
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
      ],
    });
    fixture = TestBed.createComponent(SearchFormComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.editorForm.setValue({
      studyTitle: 'test',
      usdmVersion: '1.0',
      interventionModel: 't',
      fromDate: '2023-02-02',
      sponsorId: 't',
      phase: 't',
      indication: 't',
      toDate: '2023-02-27',
    });
    modalService = TestBed.inject(BsModalService);
    modalRef = modalService.show(ModalComponentComponent);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
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

  it(`showError has default value`, () => {
    expect(component.showError).toEqual(false);
  });

  it('submitSearch makes expected calls', () => {
    const commonMethodsServiceStub: CommonMethodsService =
      fixture.debugElement.injector.get(CommonMethodsService);
    spyOn(
      commonMethodsServiceStub,
      'gridDataSourceForSearchStudy'
    ).and.callThrough();
    component.showGrid = true;
    component.enableSearch = true;
    component.editorForm.patchValue({
      usdmVersion: '1.0',
      studyTitle: 'test',
    });
    component.submitSearch();
    expect(
      commonMethodsServiceStub.gridDataSourceForSearchStudy
    ).toHaveBeenCalled();
  });

  it('submitSearch makes error calls', () => {
    spyOn(window, 'alert');
    component.showGrid = true;
    component.editorForm.patchValue({
      fromDate: '12-08-2023',
      toDate: '12-05-2023',
    });
    component.submitSearch();
    expect(window.alert).toHaveBeenCalledWith(
      'To Date must be greater than From Date'
    );
  });

  it('ngOnInit makes expected calls', () => {
    const serviceCallStub: ServiceCall =
      fixture.debugElement.injector.get(ServiceCall);
    const dialogServiceStub: DialogService =
      fixture.debugElement.injector.get(DialogService);
    spyOn(component, '_filter').and.callThrough();
    spyOn(serviceCallStub, 'readConfigFile').and.callThrough();
    spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
    component.ngOnInit();

    expect(serviceCallStub.readConfigFile).toHaveBeenCalled();
    expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
  });

  it('check Validations for search for true scenario', () => {
    component.checkValidations();
    expect(component.enableSearch).toBeTrue();
  });

  it('check Validations for search for false scenario', () => {
    component.editorForm.setValue({
      studyTitle: 'test',
      usdmVersion: '',
      interventionModel: '',
      fromDate: '',
      sponsorId: '',
      phase: '',
      indication: '',
      toDate: '',
    });

    component.checkValidations();
    expect(component.enableSearch).toBeFalse();
  });

  it('openModal makes expected calls', () => {
    const bsModalServiceStub: BsModalService =
      fixture.debugElement.injector.get(BsModalService);
    const modalfixture = TestBed.createComponent(ModalComponentComponent);
    const list = ['test', 'list'];
    const modalcomponent = modalfixture.componentInstance;
    modalRef.content = modalcomponent;
    spyOn(modalRef.content.passEntry, 'emit');
    spyOn(bsModalServiceStub, 'show').and.returnValue({
      id: 1,
      content: modalcomponent,
      hide: function (): void {
        throw new Error('Function not implemented.');
      },
      setClass: function (newClass: string): void {
        throw new Error('Function not implemented.');
      },
    });
    component.openModal(list, 'sponsor');
    expect(bsModalServiceStub.show).toHaveBeenCalled();
  });
});
