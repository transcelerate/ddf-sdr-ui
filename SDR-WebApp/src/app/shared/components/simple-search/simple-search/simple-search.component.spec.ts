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
import { SimpleSearchComponent } from './simple-search.component';
import { configList } from '../../study-element-description/config/study-element-field-config';

describe('SimpleSearchComponent', () => {
  let component: SimpleSearchComponent;
  let fixture: ComponentFixture<SimpleSearchComponent>;

  beforeEach(() => {
    const dialogServiceStub = () => ({ changeDialogState: (string: any) => ({}) });
    const bsModalServiceStub = () => ({ show: (template: any) => ({}) });
    const commonMethodsServiceStub = () => ({
      gridDataSourceForSearchLightStudy: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any
      ) => ({})
    });
    const formBuilderStub = () => ({ group: (object: any, object1: any) => ({}) });
    const ngxSpinnerServiceStub = () => ({});
    const serviceCallStub = () => ({});
    const activatedRouteStub = () => ({});
    const routerStub = () => ({
      navigate: (array: any, object: any) => ({}),
      navigateByUrl: (string: any) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SimpleSearchComponent],
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
    fixture = TestBed.createComponent(SimpleSearchComponent);
    component = fixture.componentInstance;
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
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.ngOnInit();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.submit();
      expect(routerStub.navigate).toHaveBeenCalled();
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
        'gridDataSourceForSearchLightStudy'
      ).and.callThrough();
      component.submitSearch();
      expect(
        commonMethodsServiceStub.gridDataSourceForSearchLightStudy
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
