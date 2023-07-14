import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { MsalService } from '@azure/msal-angular';
import { ServiceCall } from '../../services/service-call/service-call.service';
import { Attribute } from './model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from '../../services/common-methods.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StudyElementDescriptionComponent } from './study-element-description.component';
import { of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

describe('StudyElementDescriptionComponent', () => {
  let component: StudyElementDescriptionComponent;
  let fixture: ComponentFixture<StudyElementDescriptionComponent>;
  const study = {
    study: {
      studyTitle: '1. Study Number two',
      studyType: 'INTERVENTIONAL',
      interventionModel: 'PARALLEL',
      studyPhase: 'PHASE_1_TRIAL',
      status: 'New',
      tag: '1.0Draft',
      studyIdentifiers: [
        {
          id: '421a7150-162b-4f59-a095-80a809cc46df',
          orgCode: '2.16.840.12',
          name: 'SponsorNo',
          idType: 'SPONSOR_ID',
        },
      ],
      investigationalInterventions: [
        {
          id: '9fc6d5d3-be21-422f-9ae2-c1fa7ffda11e',
          description: 'Ibuprofen 200mg',
          interventionType: 'DRUG',
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
      studyDesigns: [
        {
          studyDesignId: 'cf01b7ff-7efd-4c79-943d-f4fcdf1284d5',
          plannedWorkflows: [
            {
              id: 'b502ea15-6287-496b-801e-024ee93c2b4a',
              description: 'Planned Workflow for Study ACME001',
              startPoint: {
                id: '4c63cd35-0a03-4ee6-9706-5959447c7330',
                type: 'SCREENING',
                subjectStatusGrouping: 'In Screening',
                startDate: '2022-JAN-09',
                endDate: '2022-JAN-19',
              },
              endPoint: {
                id: 'f3df433b-9f94-4578-a35a-2544c0b1f528',
                type: 'SCREENING',
                subjectStatusGrouping: 'In Screening',
                startDate: '2022-JAN-09',
                endDate: '2022-JAN-19',
              },
              transitions: [
                {
                  id: 'ad4e4e10-5ad0-4b37-9272-1219a883f065',
                  description:
                    'go to next when subject has systolic blood pressure below 130 mmHg',
                  fromPointInTime: {
                    id: '1b0c3bfd-a059-470f-9025-13680c012b80',
                    type: 'SCREENING',
                    subjectStatusGrouping: 'In Screening',
                    startDate: '2022-JAN-09',
                    endDate: '2022-JAN-19',
                  },
                  toPointInTime: {
                    id: '77cd004a-c8d6-4c9a-8019-59cc1d86fc1f',
                    type: 'SCREENING',
                    subjectStatusGrouping: 'In Screening',
                    startDate: '2022-JAN-09',
                    endDate: '2022-JAN-19',
                  },
                  transitionRule: {
                    id: '57ff5c31-2ff6-47f4-848f-113afe125ba2',
                    description: 'Textual description of the rule',
                    coding: [
                      {
                        code: 'test transition rule in Python',
                        codeSystem: 'Python',
                        codeSystemVersion: '1.0',
                        decode: '???',
                      },
                    ],
                  },
                  describedBy: '',
                  transitionCriteria: [
                    {
                      id: '46eddb3d-28d0-483e-9a76-9b275f328067',
                      type: 'RANDOMIZATION',
                      description: 'This is some criterion',
                      specificationIds: ['', ''],
                      domain: '',
                      dictionary: '',
                      testName: '',
                      numericMinValue: '0.00',
                      numericMinValueInclusive: '0.0',
                      numericMaxValue: '100.00',
                      valueUnit: '',
                      textualResult: '',
                      timing: '',
                      timingDetail: '',
                      timingGap: '',
                      timingDays: 10,
                      route: '',
                      numericaMaxValueInclusive: '100.00',
                      criterionDetails: ['A', ''],
                    },
                  ],
                  studyProtocolCriterionTransitionNumber: 5,
                },
              ],
            },
          ],
          studyPopulations: [
            {
              id: '27c30bba-5be0-4f07-912f-926a5667eba8',
              description: 'healthy volunteers of age between 18 and 65',
            },
          ],
          studyCells: [
            {
              id: 'f1702a66-1989-4da3-9eae-5798c779b8f7',
              studyElements: [
                {
                  id: '671a6f78-9041-451a-8d94-62a7d56503b9',
                  name: 'washout after treatment element',
                  description:
                    'This element is for washout after treatment with either active ingredient or placebo',
                  startRule: {
                    id: '1522f1da-83f5-4edc-b67e-66670e6e025b',
                    description: 'Textual description of the rule',
                    coding: [
                      {
                        code: 'test transition rule in Python',
                        codeSystem: 'Python',
                        codeSystemVersion: '1.0',
                        decode: '???',
                      },
                    ],
                  },
                  endRule: {
                    id: 'd4c4635a-d31a-4705-8978-e81479bebe77',
                    description: 'Textual description of the rule',
                    coding: [
                      {
                        code: 'test transition rule in Perl',
                        codeSystem: 'Perl',
                        codeSystemVersion: '1.0',
                        decode: '???',
                      },
                    ],
                  },
                },
              ],
              studyArm: {
                description: '200mg Ibuprofen active comparator arm',
                id: 'afac8f2d-4b9e-4c87-aad5-8d35fe3dcf12',
                studyArmType: 'ACTIVE_COMPARATOR_ARM',
                studyOriginType: 'INTERNAL',
                studyArmOrigin: 'HISTORICAL',
                name: 'My Comparator Arm',
              },
              studyEpoch: {
                id: '88e5d3c7-03a2-42d1-8b29-a3c025665316',
                epochType: 'SCREENING',
                name: 'First treatment epoch',
                description: 'First treatment epoch with low dose',
                sequenceInStudy: 2,
              },
            },
          ],
        },
      ],
      objectives: [
        {
          description: 'Example trial objective',
          id: '6f8b62d2-c733-4773-9d9e-4d8b2a3cc748',
          level: 'PRIMARY',
          endpoints: [
            {
              description:
                'Cumulative incidence of virus detection in sputum samples among participants up to...',
              purpose: 'EFFICACY',
              id: '7e4e73bd-2fdd-4bc0-a5bc-b7dba1e498cf',
              outcomeLevel: 'PRIMARY',
            },
            {
              description:
                'Cumulative incidence of virus detection in sputum samples among participants up to...',
              purpose: 'EFFICACY',
              id: 'f91dca39-2a25-48ed-a865-b6fa197a13d0',
              outcomeLevel: 'PRIMARY',
            },
          ],
        },
      ],
      studyIndications: [
        {
          id: '7e7697fb-03c7-4daf-aa38-122c0f83c367',
          description: "ZAlzheimer's disease",
          coding: [
            {
              code: 'test transition rule in Python',
              codeSystem: 'Python',
              codeSystemVersion: '1.0',
              decode: '???',
            },
          ],
        },
      ],
      studyProtocol: {
        amendments: [
          {
            amendmentDate: '',
            version: '',
          },
        ],
        protocolId: '17aaf27a-a11f-4d72-9801-1eadabf0494b',
        briefTitle: 'ZDDR Targeting Agents in ABTC',
        officialTitle:
          'DDR-Umbrella Study of DDR (DNA-Damage Response) Targeting Agents in Advanced Biliary Tract Cancer',
        publicTitle: 'Umbrella ABTC Study',
        version: '1.0',
        sections: ['aa', 'n1'],
      },
      studyId: '5a30e364-fe76-481c-adf6-5c6c308f23ac',
    },
    auditTrail: {
      entryDateTime: '2022-FEB-16',
      entrySystemId: 'Viswesh_localHost',
      SDRUploadVersion: 2,
      usdmVersion: '2.0',
    },
    links: {
      studyDefinitions:
        '/v1/studydefinitions/5a30e364-fe76-481c-adf6-5c6c308f23ac?sdruploadversion=3',
      revisionHistory:
        '/studydefinitions/5a30e364-fe76-481c-adf6-5c6c308f23ac/revisionhistory',
      studyDesigns: [
        {
          studyDesignId: '8efadbb7-7a59-4e88-b1a2-fd8040648031',
          studyDesignLink:
            '/v1/studydesigns?study_uuid=5a30e364-fe76-481c-adf6-5c6c308f23ac&sdruploadversion=1',
        },
      ],
      SoA: null,
    },
  };

  const links = {
    links: {
      studyDefinitions:
        '/v2/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e?sdruploadversion=0',
      revisionHistory:
        '/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e/revisionhistory',
      SoA: '/v2/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e/studydesigns/soa',
    },
  };

  beforeEach(() => {
    const elementRefStub = () => ({});
    const msalBroadcastServiceStub = () => ({});
    const msalServiceStub = () => ({});
    const serviceCallStub = () => ({
      getStudyElement: (studyId: any, versionId: any) => ({ subscribe: {} }),
      getStudyElementWithVersion: (usdmVersion: any, url: any) => ({
        subscribe: {},
      }),
      getStudyLinks: (studyId: any, versionId: any) => ({ subscribe: {} }),
    });

    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({}),
    });
    const commonMethodsServiceStub = () => ({
      getSponsorDetails: (studyelement: any) => ({ versionId: {} }),
      getStudyLink: (
        studyId: any,
        version: any,
        linkName: string,
        callback: (url: any) => {},
        errorCallback: (err: any) => {}
      ) => ({ showError: true }),
    });
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const activatedRouteStub = () => ({
      params: { subscribe: (f: (arg0: {}) => any) => f({}) },
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StudyElementDescriptionComponent],
      providers: [
        { provide: ElementRef, useFactory: elementRefStub },
        { provide: MsalBroadcastService, useFactory: msalBroadcastServiceStub },
        { provide: MsalService, useFactory: msalServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
      ],
    });
    fixture = TestBed.createComponent(StudyElementDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`cloginDisplay has default value`, () => {
    expect(component.cloginDisplay).toEqual(false);
  });

  it(`tablecontent has default value`, () => {
    expect(component.tablecontent).toEqual([]);
  });

  it(`dataSource has default value`, () => {
    expect(component.dataSource).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);
      spyOn<ServiceCall, any>(
        serviceCallStub,
        'getStudyElement'
      ).and.returnValue({ subscribe: () => {} });

      spyOn(component, 'getstudyelement').and.callThrough();

      //  spyOn(serviceCallStub, 'getStudyElement').and.returnValue({ subscribe: () => {} });;
      component.studyId = '1';
      component.versionId = '1';
      component.ngOnInit();
      // expect(component.heading).toEqual('Study Details');
      expect(component.getstudyelement).toHaveBeenCalled();
    });
  });

  describe('getstudyelement', () => {
    it('makes expected calls', () => {
      const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);
      const ngxSpinnerServiceStub: NgxSpinnerService =
        fixture.debugElement.injector.get(NgxSpinnerService);
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      spyOn(component, 'createAttribute').and.callThrough();
      spyOn(component, 'createsubAccordian').and.callThrough();
      spyOn(component, 'showTableContent').and.callThrough();
      spyOn(component, 'getSoALink').and.callThrough();

      spyOn<ServiceCall, any>(
        serviceCallStub,
        'getStudyElementWithVersion'
      ).and.callFake(() => {
        return of(study); // or return a list of bookings in case you want to test the first part of the if statement
      });

      spyOn<ServiceCall, any>(serviceCallStub, 'getStudyLinks').and.callFake(
        () => {
          return of(links);
        }
      );

      spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      spyOn(commonMethodsServiceStub, 'getSponsorDetails').and.callThrough();
      spyOn(commonMethodsServiceStub, 'getStudyLink').and.callFake((query) =>
        query.callback('Study URL')
      );
      //component.backButtonClicked();
      component.getstudyelement();
      //expect(serviceCallStub.getStudyElement).toHaveBeenCalled();
      expect(serviceCallStub.getStudyElementWithVersion).toHaveBeenCalled();
      //expect(serviceCallStub.getStudyElement).toHaveBeenCalled();
      expect(component.getSoALink).toHaveBeenCalled();
      expect(component.createAttribute).toHaveBeenCalled();
      expect(component.createsubAccordian).toHaveBeenCalled();
      expect(component.showTableContent).toHaveBeenCalled();

      expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
      expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
      expect(commonMethodsServiceStub.getSponsorDetails).toHaveBeenCalled();
      expect(commonMethodsServiceStub.getStudyLink).toHaveBeenCalled();
    });

    it('error call ', () => {
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);
      const errorSubject = new Subject();
      spyOn<ServiceCall, any>(
        serviceCallStub,
        'getStudyElementWithVersion'
      ).and.callFake(() => errorSubject);
      spyOn(commonMethodsServiceStub, 'getStudyLink').and.callFake((query) =>
        query.callback('Study URL')
      );
      errorSubject.error('error');
      component.getstudyelement();
      expect(component.showError).toEqual(true);
    });
  });

  describe('setHighLighted', () => {
    it('makes expected calls', () => {
      let param = [
        {
          accordianName: 'studyIdentifiers',
          attributeList: [],
          subAccordianList: [
            {
              accordianName: '0',
              attributeList: [
                {
                  name: 'id',
                  value: 'f3e61d97-60d2-499c-bbbc-4f3996385627',
                },
                {
                  name: 'orgCode',
                  value: '2.16.840.1',
                },
                {
                  name: 'name',
                  value: 'SponsorNo',
                },
                {
                  name: 'idType',
                  value: 'SPONSOR_ID',
                },
              ],
              subAccordianList: [],
              isSelected: false,
              isShow: false,
              isHighlighted: false,
            },
            {
              accordianName: '1',
              attributeList: [
                {
                  name: 'id',
                  value: '7f6d988e-507f-4898-b7aa-b25d93ef26d9',
                },
                {
                  name: 'orgCode',
                  value: '2.16.840.1',
                },
                {
                  name: 'name',
                  value: 'SponsorNo',
                },
                {
                  name: 'idType',
                  value: 'SPONSOR_ID',
                },
              ],
              subAccordianList: [],
              isSelected: false,
              isShow: false,
              isHighlighted: false,
            },
          ],
          isSelected: false,
          isShow: false,
          isHighlighted: false,
        },
      ];

      spyOn(component, 'setHighLighted').and.callThrough();
      component.setHighLighted(param);
      expect(component.setHighLighted).toHaveBeenCalled();
    });
  });

  describe('auditTrail', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.studyId = 1;
      component.versionId = 2;
      component.auditTrail();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('create Attribute', () => {
    it('makes expected calls', () => {
      let param = ['studyTitle', 'Study Number two 2nd'];
      let val = component.createAttribute(param);
      let result: Attribute = new Attribute();
      result.name = 'studyTitle';
      result.value = 'Study Number two 2nd';
      expect(val).toEqual(result);
    });
  });
  describe('createsubAccordian', () => {
    it('makes expected calls', () => {
      let param = [
        'studyIdentifiers',
        [
          {
            id: 'e80e4bd8-cf20-466f-b0c2-508353fb4fcc',
            orgCode: '2.16.840.1',
            name: 'SponsorNo',
            idType: 'SPONSOR_ID',
          },
        ],
      ];
      let val = component.createsubAccordian(param);
      let result = {
        accordianName: 'studyIdentifiers',
        attributeList: [],
        subAccordianList: [
          {
            accordianName: '0',
            attributeList: [
              { name: 'id', value: 'e80e4bd8-cf20-466f-b0c2-508353fb4fcc' },
              { name: 'orgCode', value: '2.16.840.1' },
              { name: 'name', value: 'SponsorNo' },
              { name: 'idType', value: 'SPONSOR_ID' },
            ],
            subAccordianList: [],
            isSelected: false,
            isShow: false,
            isHighlighted: false,
          },
        ],
        isSelected: false,
        isShow: false,
        isHighlighted: false,
      };
      expect(JSON.stringify(val)).toEqual(JSON.stringify(result));
    });
  });
  describe('showTableContent', () => {
    it('makes expected calls', () => {
      let val = {
        accordianName: 'studyProtocol',
        attributeList: [
          { name: 'protocolId', value: '17aaf27a-a11f-4d72-9801-1eadabf0494b' },
          { name: 'briefTitle', value: 'ZDDR Targeting Agents in ABTC' },
          {
            name: 'officialTitle',
            value:
              'DDR-Umbrella Study of DDR (DNA-Damage Response) Targeting Agents in Advanced Biliary Tract Cancer',
          },
          { name: 'publicTitle', value: 'Umbrella ABTC Study' },
          { name: 'version', value: '1.0' },
        ],
        subAccordianList: [
          {
            accordianName: 'amendments',
            attributeList: [],
            subAccordianList: [
              {
                accordianName: '0',
                attributeList: [
                  { name: 'amendmentDate', value: '' },
                  { name: 'version', value: '' },
                ],
                subAccordianList: [],
                isSelected: false,
                isShow: false,
                isHighlighted: false,
              },
            ],
            isSelected: false,
            isShow: false,
            isHighlighted: false,
          },
          {
            accordianName: 'sections',
            attributeList: [
              { name: '0', value: 'aa' },
              { name: '1', value: 'n1' },
            ],
            subAccordianList: [],
            isSelected: true,
            isShow: false,
            isHighlighted: false,
          },
        ],
        isSelected: false,
        isShow: true,
        isHighlighted: true,
      };
      let field = {
        accordianName: 'Study Number two 2nd',
        attributeList: [
          { name: 'studyTitle', value: 'Study Number two 2nd' },
          { name: 'studyType', value: 'INTERVENTIONAL' },
          { name: 'interventionModel', value: 'PARALLEL' },
          { name: 'studyPhase', value: 'PHASE_1_TRIAL' },
          { name: 'status', value: 'Draft' },
          { name: 'tag', value: '1.0Draft' },
          { name: 'studyId', value: '6f2c8329-7363-408a-b0e6-bf1ead6d6ae9' },
          { name: 'studyVersion', value: '2' },
        ],
        subAccordianList: [
          {
            accordianName: 'studyIdentifiers',
            attributeList: [],
            subAccordianList: [
              {
                accordianName: '0',
                attributeList: [
                  { name: 'id', value: 'e80e4bd8-cf20-466f-b0c2-508353fb4fcc' },
                  { name: 'orgCode', value: '2.16.840.1' },
                  { name: 'name', value: 'SponsorNo' },
                  { name: 'idType', value: 'SPONSOR_ID' },
                ],
                subAccordianList: [],
                isSelected: false,
                isShow: false,
                isHighlighted: false,
              },
            ],
            isSelected: false,
            isShow: false,
            isHighlighted: false,
          },
          {
            accordianName: 'investigationalInterventions',
            attributeList: [],
            subAccordianList: [
              {
                accordianName: '0',
                attributeList: [
                  { name: 'id', value: '4d6c5472-9595-470a-8691-9a05c5915f85' },
                  { name: 'description', value: 'Ibuprofen 1000mg' },
                  { name: 'interventionType', value: 'DRUG' },
                ],
                subAccordianList: [
                  {
                    accordianName: 'coding',
                    attributeList: [],
                    subAccordianList: [
                      {
                        accordianName: '0',
                        attributeList: [
                          { name: 'code', value: '26929004' },
                          { name: 'codeSystem', value: 'SNOMED-CT' },
                          { name: 'codeSystemVersion', value: '4.6.4' },
                          {
                            name: 'decode',
                            value: "Alzheimer's disease (disorder)",
                          },
                        ],
                        subAccordianList: [],
                        isSelected: false,
                        isShow: false,
                        isHighlighted: false,
                      },
                    ],
                    isSelected: false,
                    isShow: false,
                    isHighlighted: false,
                  },
                ],
                isSelected: false,
                isShow: false,
                isHighlighted: false,
              },
            ],
            isSelected: false,
            isShow: false,
            isHighlighted: false,
          },
          {
            accordianName: 'objectives',
            attributeList: [],
            subAccordianList: [
              {
                accordianName: '0',
                attributeList: [
                  { name: 'description', value: 'Example trial objective' },
                  { name: 'id', value: 'f0241338-573a-46c6-845d-06191a454bb6' },
                  { name: 'level', value: 'SECONDARY' },
                ],
                subAccordianList: [
                  {
                    accordianName: 'endpoints',
                    attributeList: [],
                    subAccordianList: [
                      {
                        accordianName: '0',
                        attributeList: [
                          {
                            name: 'description',
                            value:
                              'Cumulative incidence of virus detection in sputum samples among participants up to...',
                          },
                          { name: 'purpose', value: 'VIEW' },
                          {
                            name: 'id',
                            value: 'ac461641-eb6e-4a0d-808d-9efd0e3a8c4a',
                          },
                          { name: 'outcomeLevel', value: 'PRIMARY' },
                        ],
                        subAccordianList: [],
                        isSelected: false,
                        isShow: false,
                        isHighlighted: false,
                      },
                      {
                        accordianName: '1',
                        attributeList: [
                          {
                            name: 'description',
                            value:
                              'Cumulative incidence of virus detection in sputum samples among participants up to...',
                          },
                          { name: 'purpose', value: 'CLEAR' },
                          {
                            name: 'id',
                            value: '5209dd17-553f-4025-833e-d7a56fed4955',
                          },
                          { name: 'outcomeLevel', value: 'SECONDARY' },
                        ],
                        subAccordianList: [],
                        isSelected: false,
                        isShow: false,
                        isHighlighted: false,
                      },
                    ],
                    isSelected: false,
                    isShow: false,
                    isHighlighted: false,
                  },
                ],
                isSelected: false,
                isShow: false,
                isHighlighted: false,
              },
              {
                accordianName: '1',
                attributeList: [
                  { name: 'description', value: 'Example trial objective 2' },
                  { name: 'id', value: 'cbf927b7-2d12-4fb9-86bc-c0c2f66062b3' },
                  { name: 'level', value: 'SECONDARY' },
                ],
                subAccordianList: [
                  {
                    accordianName: 'endpoints',
                    attributeList: [],
                    subAccordianList: [
                      {
                        accordianName: '0',
                        attributeList: [
                          {
                            name: 'description',
                            value:
                              '1 Cumulative incidence of virus detection in sputum samples among participants up to...',
                          },
                          { name: 'purpose', value: 'VIEW#' },
                          {
                            name: 'id',
                            value: 'd6474e1f-e53a-4545-9351-ff0f0749c2e3',
                          },
                          { name: 'outcomeLevel', value: 'PRIMARY' },
                        ],
                        subAccordianList: [],
                        isSelected: false,
                        isShow: false,
                        isHighlighted: false,
                      },
                      {
                        accordianName: '1',
                        attributeList: [
                          {
                            name: 'description',
                            value:
                              '1 Cumulative incidence of virus detection in sputum samples among participants up to...',
                          },
                          { name: 'purpose', value: 'CLEAR#' },
                          {
                            name: 'id',
                            value: '47c89838-6a27-4541-96f2-57e76248062a',
                          },
                          { name: 'outcomeLevel', value: 'SECONDARY' },
                        ],
                        subAccordianList: [],
                        isSelected: false,
                        isShow: false,
                        isHighlighted: false,
                      },
                    ],
                    isSelected: false,
                    isShow: false,
                    isHighlighted: false,
                  },
                ],
                isSelected: false,
                isShow: false,
                isHighlighted: false,
              },
            ],
            isSelected: false,
            isShow: false,
            isHighlighted: false,
          },
        ],
        isSelected: false,
        isShow: false,
        isHighlighted: false,
      };
      let fromTitle = false;
      component.showTableContent(val, fromTitle, field);
      let result = [
        { name: 'protocolId', value: '17aaf27a-a11f-4d72-9801-1eadabf0494b' },
        { name: 'briefTitle', value: 'ZDDR Targeting Agents in ABTC' },
        {
          name: 'officialTitle',
          value:
            'DDR-Umbrella Study of DDR (DNA-Damage Response) Targeting Agents in Advanced Biliary Tract Cancer',
        },
        { name: 'publicTitle', value: 'Umbrella ABTC Study' },
        { name: 'version', value: '1.0' },
      ];
      expect(component.tablecontent).toEqual(result);
    });
  });
});
function getstudyelement(serviceCallStub: ServiceCall, getstudyelement: any) {
  throw new Error('Function not implemented.');
}
function errorResponse(errorResponse: any): any {
  throw new Error('Function not implemented.');
}
