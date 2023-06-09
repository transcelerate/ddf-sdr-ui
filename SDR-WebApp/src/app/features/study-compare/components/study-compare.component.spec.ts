import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/communication.service';
import { StudyCompareComponent } from './study-compare.component';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('StudyCompareComponent', () => {
  let component: StudyCompareComponent;
  let fixture: ComponentFixture<StudyCompareComponent>;
  let ds: DialogService;
  beforeEach(() => {
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const commonMethodsServiceStub = () => ({
      getSponsorIdGrid: { bind: () => ({}) },
      gridDataSourceForSearchLightStudy: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any
      ) => ({}),
      restrictChar: (event: any) => ({}),
      getToday: () => ({}),
    });
    const bsModalServiceStub = () => ({
      show: (modalComponentComponent: any, initialState: any) => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StudyCompareComponent],
      providers: [
        { provide: BsModalService, useFactory: bsModalServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        DialogService,
        FormBuilder,
      ],
    });
    ds = TestBed.get(DialogService);
    fixture = TestBed.createComponent(StudyCompareComponent);
    component = fixture.componentInstance;
    window.history.pushState({ from: 'search1' }, '', '');
    ds.sendClearBool(true);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit makes expected calls', () => {
    const dialogServiceStub: DialogService =
      fixture.debugElement.injector.get(DialogService);
    spyOn(component, 'setModel').and.callThrough();
    spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
    const data = {
      auditTrail: {
        SDRUploadVersion: 2,
        entryDateTime: '2023-02-02T11:30:10.606Z',
        usdmVersion: '1.0',
      },
      study: {
        studyTitle: 'Umbrella Study of Cancers test',
        studyId: '49a1c2da-49f6-454e-b1a7-6f68e9f3df64',
      },
      links: {
        SoA: null,
        revisionHistory:
          '/studydefinitions/49a1c2da-49f6-454e-b1a7-6f68e9f3df64/revisionhistory',
        studyDefinitions:
          '/v1/studydefinitions/49a1c2da-49f6-454e-b1a7-6f68e9f3df64?sdruploadversion=2',
        studyDesigns: {
          studyDesignId: '833f8b1c-7042-42ad-8ed9-9fe727f733fb',
          studyDesignLink:
            '/v1/studydesigns?study_uuid=49a1c2da-49f6-454e-b1a7-6f68e9f3df64&sdruploadversion=2',

          selected: true,
        },
      },
    };
    let searchData = {
      data: data,
      from: 'search1',
      navigationId: 4,
    };
    window.history.state.data = data;
    component.ngOnInit();
    expect(component.setModel).toHaveBeenCalled();
    expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    window.history.state.from = searchData.from;
    component.ngOnInit();
  });

  it('versionCompare makes expected calls', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigate').and.callThrough();
    component.versionCompare();
    expect(routerStub.navigate).toHaveBeenCalled();
  });

  it('clear makes expected calls', () => {
    component.clear();
    component.versionCompare();
    expect(component.studyTwoTitle).toEqual('');
  });

  it('clear makes expected calls', () => {
    component.redirect('search1');
    expect(component.from).toEqual('search1');
  });

  it('setModel makes expected calls', () => {
    let response = {
      study: {
        studyId: 1,
        studyTitle: 'Test',
      },
      auditTrail: {
        SDRUploadVersion: 1,
      },
    };
    localStorage.setItem('search1', JSON.stringify(response));
    localStorage.setItem('search2', '');
    component.setModel();
    expect(component.toolTipOne).toEqual('Test_Version1');
    localStorage.setItem('search2', JSON.stringify(response));
    localStorage.setItem('search1', '');
    component.setModel();
    expect(component.toolTipTwo).toEqual('Test_Version1');
  });

  it('restrictChar makes expected calls', () => {
    const event = document.createEvent('KeyboardEvent');
    const commonMethodsServiceStub: CommonMethodsService =
      fixture.debugElement.injector.get(CommonMethodsService);
    spyOn(commonMethodsServiceStub, 'restrictChar').and.callThrough();

    component.restrictChar(event);
    expect(commonMethodsServiceStub.restrictChar).toHaveBeenCalled();
  });

  it('getToday makes expected calls', () => {
    const commonMethodsServiceStub: CommonMethodsService =
      fixture.debugElement.injector.get(CommonMethodsService);
    spyOn(commonMethodsServiceStub, 'getToday').and.callThrough();
    let val = component.getToday();
    expect(commonMethodsServiceStub.getToday).toHaveBeenCalled();
  });

  it(`getStudyVersionGrid getStudyVersionGrid has default value`, () => {
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

  it('setSelectedValue should redirect the user to the details page', () => {
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

  it('getSelectSearch makes expected calls', () => {
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

  it('submitSearch makes expected calls', () => {
    const commonMethodsServiceStub: CommonMethodsService =
      fixture.debugElement.injector.get(CommonMethodsService);
    spyOn(
      commonMethodsServiceStub,
      'gridDataSourceForSearchLightStudy'
    ).and.callThrough();
    component.showGrid = true;
    component.editorForm.patchValue({
      fromDate: '02/06/2023',
      toDate: '03/06/2023',
    });
    component.submitSearch();
    expect(
      commonMethodsServiceStub.gridDataSourceForSearchLightStudy
    ).toHaveBeenCalled();
  });
});
