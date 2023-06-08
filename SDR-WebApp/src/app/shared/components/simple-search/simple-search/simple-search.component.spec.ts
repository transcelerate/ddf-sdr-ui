import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const bsModalServiceStub = () => ({
      show: (modalComponentComponent: any, initialState: any) => ({}),
    });
    const commonMethodsServiceStub = () => ({
      getSponsorIdGrid: { bind: () => ({}) },
      gridDataSourceForSearchLightStudy: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any
      ) => ({}),
    });
    const formBuilderStub = () => ({
      group: (object: any, object1: any) => ({}),
    });
    const ngxSpinnerServiceStub = () => ({});
    const serviceCallStub = () => ({});
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SimpleSearchComponent],
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
    fixture = TestBed.createComponent(SimpleSearchComponent);
    component = fixture.componentInstance;
    window.history.pushState({ data: { from: 'search1' } }, '', '');
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

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService =
        fixture.debugElement.injector.get(DialogService);
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

  describe('submitSearch', () => {
    it('makes expected calls', () => {
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      spyOn(
        commonMethodsServiceStub,
        'gridDataSourceForSearchLightStudy'
      ).and.callThrough();
      component.showGrid = true;
      component.editorForm.patchValue({
        fromDate: '02/02/2023',
        toDate: '03/03/2023',
      });
      component.submitSearch();
      expect(
        commonMethodsServiceStub.gridDataSourceForSearchLightStudy
      ).toHaveBeenCalled();
    });
  });
  describe('getSelectSearch', () => {
    it('makes expected calls', () => {
      let params = {
        data: {
          study: {
            studyId: '1a9aee0f-a43d-447d-b15f-4c8a557c41fd',
            studyTitle: 'Study On Parkinson disease',
            studyType: 'INTERVENTIONAL',
            studyPhase: 'PHASE_1_TRIAL',
            studyStatus: 'Draft',
            studyTag: '2.0Draft',
            studyIdentifiers: [
              {
                id: 'd645f5cc-6866-4a82-bb03-e8d57c7f9c68',
                orgCode: '2.16.840.1.113883.3.1982',
                name: 'ClinicalTrials.gov',
                idType: 'REGISTRY_STUDY',
              },
              {
                id: '1f46b767-65d5-463e-ba1a-3cfcea1e4d78',
                orgCode: '2.16.840.1.113883.3.1152',
                name: 'ClinicalTrials.gov',
                idType: 'SPONSOR_ID',
              },
            ],
            studyProtocolReferences: null,
            studyDesigns: [
              {
                studyDesignId: null,
                trialIntentType: null,
                trialType: null,
                plannedWorkflows: null,
                studyPopulations: null,
                studyCells: null,
                investigationalInterventions: [
                  {
                    id: 'ecf1daaa-b8b4-4c59-8d5c-504836cb0244',
                    description: 'Ibuprofen 200mg',
                    interventionModel: 'SEQUENTIAL',
                    status: 'A Status',
                    coding: [
                      {
                        code: '26929004',
                        codeSystem: 'SNOMED-CT',
                        codeSystemVersion: '4.0.6.4',
                        decode: "Alzheimer's disease (disorder)",
                      },
                    ],
                  },
                ],
              },
            ],
            objectives: null,
            studyIndications: [
              {
                id: '8a09a40e-8049-43c3-9652-1db196c12e8f',
                description: "Alzheimer's disease",
                coding: [
                  {
                    code: '26929004',
                    codeSystem: 'SNOMED-CT',
                    codeSystemVersion: '4.0.6.4',
                    decode: "Alzheimer's disease (disorder)",
                  },
                ],
              },
            ],
          },
          auditTrail: {
            entryDateTime: '2022-JUN-20',

            SDRUploadVersion: 1,
          },
          selected: true,
        },
      };
      component.getSelectSearch(params);
      expect(component.selectedValue).toEqual(params.data);
    });
  });
  describe('setSelectedValue', () => {
    it('should redirect the user to the details page', () => {
      let router = TestBed.get(Router);
      let spy = spyOn(router, 'navigate');
      let param = {
        study: {
          studyId: 1,
        },
        auditTrail: {
          SDRUploadVersion: 1,
        },
      };
      component.setSelectedValue(param);
      expect(spy).toHaveBeenCalledWith(
        ['details', { studyId: 1, versionId: 1, usdmVersion: undefined }],
        { relativeTo: {} }
      );
    });
  });
  describe('restrictChar', () => {
    it('makes expected calls', () => {
      const event = document.createEvent('KeyboardEvent');
      let val = component.restrictChar(event);
      expect(val).toEqual(false);
    });
  });
  describe('getToday', () => {
    it('makes expected calls', () => {
      let val = component.getToday();
      // component.ngAfterViewInit();
      expect(typeof val).toEqual('string');
    });
  });
  describe('getStudyVersionGrid', () => {
    it(`getStudyVersionGrid has default value`, () => {
      let val1 = component.getStudyVersionGrid({});
      expect(val1).toEqual('');
    });
    it(`getStudyVersionGrid has default value`, () => {
      let val = component.getStudyVersionGrid({
        data: {
          study: {
            studyIdentifiers: [
              {
                id: 'f3e61d97-60d2-499c-bbbc-4f3996385627',
                orgCode: '2.16.840.1',
                name: 'SponsorNo',
                idType: 'SPONSOR_ID',
              },
              {
                id: '7f6d988e-507f-4898-b7aa-b25d93ef26d9',
                orgCode: '2.16.840.1',
                name: 'SponsorNo',
                idType: 'SPONSOR_ID',
              },
            ],
          },
          auditTrail: {
            entryDateTime: '2022-FEB-07',
            entrySystemId: 'Viswesh_localHost',

            SDRUploadVersion: 1,
          },
        },
      });
      expect(val).not.toEqual('');
    });
  });
});
