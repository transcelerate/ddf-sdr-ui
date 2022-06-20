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
import { of } from 'rxjs';

describe('AddGroupComponent', () => {
  let component: AddGroupComponent;
  let fixture: ComponentFixture<AddGroupComponent>;

  beforeEach(() => {
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const bsModalServiceStub = () => ({ show: (template: any) => ({}) });
    const commonMethodsServiceStub = () => ({
      postGroup: (group: any, arg1: any) => ({}),
      gridDataSourceForSearchStudy: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any,
        arg2: any
      ) => ({}),
    });
    const formBuilderStub = () => ({
      group: (object: any, object1: any) => ({}),
    });
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({}),
    });
    const serviceCallStub = () => ({
      checkGroup: (value: any) => ({
        subscribe: (f: (arg0: {}) => any) => f({}),
      }),
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
        FormBuilder,
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
      ],
    });
    fixture = TestBed.createComponent(AddGroupComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    let somevalue = {
      groupId: 'b9f848b8-9af7-46c1-9a3c-2663f547cc7a',
      groupName: 'AlzheimerReadWrite',
      groupDescription: 'Detailed description of group',
      permission: 'READ_WRITE',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: [
            { id: 'INTERVENTIONAL', title: 'INTERVENTIONAL' },
            { id: 'EXPANDED_ACCESS', title: 'EXPANDED_ACCESS' },
          ],
          groupName: 'AlzheimerReadWrite',
          permission: 'READ_WRITE',
          groupId: 'b9f848b8-9af7-46c1-9a3c-2663f547cc7a',
        },
        {
          groupFieldName: 'study',
          groupFilterValues: [
            { id: 'studyId1', title: 'Study Number Two' },
            { id: 'studyId2', title: 'StudyTitle1-Tag3' },
          ],
          groupId: 'b9f848b8-9af7-46c1-9a3c-2663f547cc7a',
        },
      ],
      groupModifiedOn: '2022-JUN-01',
      groupModifiedBy: 'yuvarani.nagarajan@accenture.com',
      groupCreatedOn: '2022-MAY-10',
      groupCreatedBy: 'admin1@SDR.com',
      groupEnabled: true,
    };
    window.history.pushState(
      { data: somevalue, selected: 'studyType' },
      '',
      ''
    );
    component.initialForm.setValue({
      groupName: 'uu',
      groupPermission: '99',
      groupFieldName: 'study',
    });
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
      const bsModalServiceStub: BsModalService =
        fixture.debugElement.injector.get(BsModalService);
      spyOn(bsModalServiceStub, 'show').and.callThrough();
      component.openModal(templateRefStub);
      expect(bsModalServiceStub.show).toHaveBeenCalled();
    });
  });

  describe('openSearchData', () => {
    it('makes expected calls', () => {
      const templateRefStub: any = <any>{};
      const bsModalServiceStub: BsModalService =
        fixture.debugElement.injector.get(BsModalService);
      spyOn(bsModalServiceStub, 'show').and.callThrough();
      component.openSearchData(templateRefStub);
      expect(bsModalServiceStub.show).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService =
        fixture.debugElement.injector.get(DialogService);
      spyOn(component, 'filterFieldSelected').and.callThrough();
      spyOn(component, 'checkSave').and.callThrough();
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.initialForm.setValue({
        groupName: 'uu',
        groupPermission: '99',
        groupFieldName: 'study',
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
  describe('updateChecked', () => {
    it('makes expected calls', () => {
      spyOn(component, 'checkSave').and.callThrough();
      component.updateChecked('EXPANDED_ACCESS');
      expect(component.checkSave).toHaveBeenCalled();
    });
  });
  describe('delete', () => {
    it('makes expected calls', () => {
      spyOn(component, 'addRule').and.callThrough();
      let params = {
        data: {
          clinicalStudy: {
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
            entrySystem: 'entrySystem',
            studyVersion: 1,
          },
          selected: true,
        },
      };
      component.delete(params);
      expect(component.addRule).toHaveBeenCalled();
    });
  });
  describe('getSelectSearch', () => {
    it('makes expected calls', () => {
      spyOn(component, 'addRule').and.callThrough();
      let params = {
        data: {
          clinicalStudy: {
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
            entrySystem: 'entrySystem',
            studyVersion: 1,
          },
          selected: true,
        },
      };
      component.getSelectSearch(params);
      expect(component.addRule).toHaveBeenCalled();
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
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
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
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      spyOn(
        commonMethodsServiceStub,
        'gridDataSourceForSearchStudy'
      ).and.callThrough();
      component.showGrid = true;
      component.editorForm.patchValue({
        fromDate: '02/02/2022',
        toDate: '03/03/2022',
      });
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

  describe('validateGroupName', () => {
    it('makes expected calls', () => {
      const ngxSpinnerServiceStub: NgxSpinnerService =
        fixture.debugElement.injector.get(NgxSpinnerService);

      const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);

      spyOn<ServiceCall, any>(serviceCallStub, 'checkGroup').and.callFake(
        () => {
          return of({ groupName: 'iii', isExists: false }); // or return a list of bookings in case you want to test the first part of the if statement
        }
      );

      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();

      // spyOn(serviceCallStub, 'getAllGroupList').and.callThrough();
      let event = {
        target: {
          value: 'iii',
        },
      };
      component.validateGroupName(event);

      expect(serviceCallStub.checkGroup).toHaveBeenCalled();
    });
  });
});
