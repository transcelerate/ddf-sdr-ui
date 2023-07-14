import { TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from './service-call/service-call.service';
import { CommonMethodsService } from './common-methods.service';
import { AgGridModule } from 'ag-grid-angular';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CommonMethodsService', () => {
  let service: CommonMethodsService;

  beforeEach(() => {
    const bsModalServiceStub = {};
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({}),
    });
    const serviceCallStub = () => ({
      getSearchResult: (reqObj: any) => ({
        subscribe: (f: (arg0: {}) => any) => f({}),
      }),
    });
    TestBed.configureTestingModule({
      providers: [
        CommonMethodsService,
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: BsModalService, useValue: bsModalServiceStub },
      ],
      imports: [AgGridModule.withComponents([])],
    });
    service = TestBed.inject(CommonMethodsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getSponsorDetails', () => {
    it('getSponsorDetails should return studyId and versionId', () => {
      let studyElement = {
        study: {
          studyId: '1206c8ea-acb3-481b-b9a7-a3fdf85f1bf4',
          studyTitle: 'Cancer study',
          studyType: {
            codeId: 'bff2ccc7-7f65-4f11-9722-331a8be6e73b',
            code: 'C98388',
            codeSystem: 'http://www.cdisc.org',
            codeSystemVersion: '2022-03-25',
            decode: 'OBSERVATIONAL',
          },
          studyIdentifiers: [
            {
              studyIdentifierId: '52e03c76-7a78-4a5d-b5f7-84cf8e6adb0c',
              studyIdentifier: 'CT-GOV-1234',
              studyIdentifierScope: {
                organisationId: 'bcbee624-6822-4dbb-9e3f-a65173451d91',
                organisationIdentifier: 'ET1.1-GOV',
                organisationIdentifierScheme: 'FDA',
                organisationName: 'ClinicalTrials.gov',
                organisationType: {
                  codeId: 'a811a5de-db41-46b0-ad6c-6aa2a503beb3',
                  code: 'C2365x',
                  codeSystem: 'http://www.cdisc.org',
                  codeSystemVersion: '1',
                  decode: 'Clinical Study Sponsor',
                },
              },
            },
            {
              studyIdentifierId: '3757c1d5-5b90-49f6-8c24-6621f58b267f',
              studyIdentifier: 'CT-GOV-1234',
              studyIdentifierScope: {
                organisationId: '2de8926f-6552-456f-a26f-54c8919cf467',
                organisationIdentifier: 'ET2-GOV',
                organisationIdentifierScheme: 'FDA',
                organisationName: 'ClinicalTrials.gov',
                organisationType: {
                  codeId: 'dbca874a-8838-4733-a831-8a7176709e85',
                  code: 'C2365x',
                  codeSystem: 'http://www.cdisc.org',
                  codeSystemVersion: '1',
                  decode: 'Regulatory Agency',
                },
              },
            },
          ],
          studyPhase: {
            codeId: 'f3f9b066-f975-433b-a761-81314162c932',
            code: 'C49686',
            codeSystem: 'http://www.cdisc.org',
            codeSystemVersion: '2022-03-25',
            decode: 'PHASE 0 TRIAL',
          },
          studyProtocolVersions: [
            {
              uuid: '3da9bc5b-5b19-4696-b4ea-e750743d35b7',
              briefTitle: 'Short',
              officialTitle: 'Very Official',
              protocolAmendment: 'Amendment',
              protocolEffectiveDate: '2022-01-01',
              protocolStatus: [
                {
                  uuid: '02eb3892-e681-4827-942b-14e61a7e35d8',
                  code: 'C1113x',
                  codeSystem: 'http://www.cdisc.org',
                  codeSystemVersion: '1',
                  decode: 'Draft',
                },
              ],
              protocolVersion: '1',
              publicTitle: 'Public Voice',
              scientificTitle: 'Incomprehensible',
            },
          ],
          studyDesigns: [
            {
              studyId: '9505e96b-25ab-4755-a78d-e82335198896',
              interventionModel: [
                {
                  codeId: '7dfa5ce8-a885-4a06-8d83-90a948522c63',
                  code: 'C82639',
                  codeSystem: 'http://www.cdisc.org',
                  codeSystemVersion: '2022-03-25',
                  decode: 'SEQUENTIAL',
                },
              ],
              trialIntentType: [
                {
                  uuid: '4b65d2b8-f099-421b-a2de-a14e60313bb4',
                  code: 'C15714',
                  codeSystem: 'http://www.cdisc.org',
                  codeSystemVersion: '2022-03-25',
                  decode: 'BASIC SCIENCE',
                },
              ],
              trialType: [
                {
                  uuid: '5655bd3d-2de0-4df1-bd3e-60148e782f53',
                  code: 'C158288',
                  codeSystem: 'http://www.cdisc.org',
                  codeSystemVersion: '2022-03-25',
                  decode: 'ADHESION PERFORMANCE',
                },
              ],
              studyIndications: [
                {
                  uuid: 'e0b58b2f-c38a-4ffe-ba1a-6952e26501d2',
                  indicationDescription: 'Something bad',
                  codes: [
                    {
                      uuid: 'edf72179-1c11-47bb-a45c-c940c6b95e6b',
                      code: 'C6666x',
                      codeSystem: 'http://www.cdisc.org',
                      codeSystemVersion: '1',
                      decode: 'BAD STUFF',
                    },
                  ],
                },
              ],
              studyInvestigationalInterventions: [
                {
                  uuid: '42e16c83-cb1e-4310-b971-2f396eb0dd2a',
                  interventionDesc: 'Intervention 1',
                  codes: [
                    {
                      uuid: 'e7f17d6e-570a-425c-8676-9911157fe82a',
                      code: 'C7639x',
                      codeSystem: 'http://www.cdisc.org',
                      codeSystemVersion: '1',
                      decode: 'MODEL 1',
                    },
                  ],
                },
              ],
              studyObjectives: [
                {
                  uuid: '90574e29-a724-4d03-bb53-cfe43401c1b9',
                  objectiveDesc: 'Objective Level 1',
                  objectiveLevel: [
                    {
                      uuid: '0f292975-b9ad-49e4-b131-e4cf210c1bd9',
                      code: 'C9844x',
                      codeSystem: 'http://www.cdisc.org',
                      codeSystemVersion: '1',
                      decode: 'Study Primary Objective',
                    },
                  ],
                  objectiveEndpoints: [
                    {
                      uuid: '546b06a2-ffcf-4cd7-a1fd-429eb55f0f23',
                      endpointDesc: 'Endpoint 1',
                      endpointPurposeDesc: 'level description',
                      endpointLevel: [
                        {
                          uuid: 'd12b8477-5a77-4f33-b39c-ab8f05603ac6',
                          code: 'C9834x',
                          codeSystem: 'http://www.cdisc.org',
                          codeSystemVersion: '1',
                          decode: 'Primary Endpoint',
                        },
                      ],
                    },
                  ],
                },
              ],
              studyPopulations: [
                {
                  uuid: '19c99439-90db-459a-bf50-16a50e757ba3',
                  population_desc: 'Population 1',
                },
              ],
              studyCells: [
                {
                  uuid: 'ef04350f-622e-4b51-9b06-f9b87880f741',
                  studyArm: {
                    uuid: '4ed9f252-3088-4efd-b846-507d39dc5445',
                    studyArmDataOriginDesc: 'Captured subject data',
                    studyArmDataOriginType: [
                      {
                        uuid: 'ef12f4cb-4c37-4456-9921-640577839d9d',
                        code: 'C6574y',
                        codeSystem: 'http://www.cdisc.org',
                        codeSystemVersion: '1',
                        decode: 'Historical Data',
                      },
                    ],
                    studyArmDesc: 'The Placebo Arm',
                    studyArmName: 'Placebo',
                    studyArmType: [
                      {
                        uuid: '2f88d3b1-5f7e-4e57-a392-7658d80e6d8d',
                        code: 'C174268',
                        codeSystem: 'http://www.cdisc.org',
                        codeSystemVersion: '2022-03-25',
                        decode: 'Placebo Control Arm',
                      },
                    ],
                  },
                  studyEpoch: {
                    uuid: '3f421b00-8058-44df-a16e-701c10deb642',
                    nextStudyEpochId: 'c0d6b66e-0831-4f7d-94a2-1e12b6b58500',
                    previousStudyEpochId:
                      'c0d6b66e-0831-4f7d-94a2-1e12b6b58501',
                    studyEpochDesc: 'The run in',
                    studyEpochName: 'Run In',
                    studyEpochType: [
                      {
                        uuid: '00a24648-5913-49ed-ad0d-747e90c45d93',
                        code: 'C98779',
                        codeSystem: 'http://www.cdisc.org',
                        codeSystemVersion: '2022-03-25',
                        decode: 'BASELINE',
                      },
                    ],
                  },
                  studyElements: [
                    {
                      uuid: 'c2e08840-d19b-41da-b511-2c2875f5af2f',
                      studyElementDesc: 'First element',
                      studyElementName: 'Element 1',
                      transitionStartRule: {
                        uuid: '928c9ad5-07e5-43e3-b8cb-3cbd4e3c9ba4',
                        transitionRuleDesc: 'Start Rule',
                      },
                      transitionEndRule: {
                        uuid: 'a668f96c-de13-4f06-b6a1-79f15b6a4e96',
                        transitionRuleDesc: 'End Rule',
                      },
                    },
                  ],
                },
              ],
              studyWorkflows: [
                {
                  workflowId: '4d816b00-2ef7-4b30-8b56-ba9b33752852',
                  workflowDesc: 'SampleDesc',
                  workflowItems: [
                    {
                      uuid: '661224bb-137c-4478-8883-526476d73d3e',
                      workflowItemDesc: 'Sample Item Desc',
                      workflowItemActivity: {
                        uuid: 'aa027c80-05e1-4a35-b6e1-bd9d236910fd',
                        activityDesc: 'Activity_1',
                        activityName: 'A1',
                        definedProcedures: [
                          {
                            uuid: 'e44d016f-f190-4e56-8472-eba127ad51c9',
                            procedureCode: [
                              {
                                uuid: '1b51eaa6-5a11-4346-84ca-562d5dd60d5f',
                                code: '767002',
                                codeSystem: 'SNOMED-CT',
                                codeSystemVersion: '2022-05-31',
                                decode: 'White blood cell count',
                              },
                            ],
                            procedureType: 'Specimen Collection',
                          },
                        ],
                        nextActivityId: 'c0d6b66e-0831-4f7d-94a2-1e12b6b58500',
                        previousActivityId:
                          'c0d6b66e-0831-4f7d-94a2-1e12b6b58501',
                        studyDataCollection: [
                          {
                            uuid: 'fc6f3998-14d5-45fc-8297-3fcfd9d1ad27',
                            studyDataName: 'Study Data 1',
                            studyDataDesc: 'Something',
                            crfLink: 'Link 1',
                          },
                        ],
                      },
                      workflowItemEncounter: {
                        uuid: 'e8a40e86-fe4c-4dba-8b6f-9e068de01a2d',
                        encounterContactMode: [
                          {
                            uuid: '00e0f606-6e32-47f6-8b3b-bd753a47dfbf',
                            code: 'C175574',
                            codeSystem: 'http://www.cdisc.org',
                            codeSystemVersion: '2022-03-25',
                            decode: 'IN PERSON',
                          },
                        ],
                        encounterDesc: 'desc',
                        encounterEnvironmentalSetting: [
                          {
                            uuid: '8efef4d9-356a-4210-8095-3479d01e4918',
                            code: 'C51282',
                            codeSystem: 'http://www.cdisc.org',
                            codeSystemVersion: '2022-03-25',
                            decode: 'CHILD CARE CENTER',
                          },
                        ],
                        encounterName: 'Encounter 1',
                        encounterType: [
                          {
                            uuid: '9d7e3cb1-b6a5-46bf-bf38-f2d0f2212681',
                            code: 'C7652x',
                            codeSystem: 'http://www.cdisc.org',
                            codeSystemVersion: '1',
                            decode: 'Visit',
                          },
                        ],
                        nextEncounterId: 'c0d6b66e-0831-4f7d-94a2-1e12b6b58500',
                        previousEncounterId:
                          'c0d6b66e-0831-4f7d-94a2-1e12b6b58501',
                        startRule: {
                          uuid: 'e4552af0-6d6c-49a8-85b9-14035bb40796',
                          transitionRuleDesc: 'Start Rule',
                        },
                        endRule: {
                          uuid: '730c914b-3ab4-46f3-b51b-0fc034e42a48',
                          transitionRuleDesc: 'End Rule',
                        },
                      },
                      nextWorkflowItemId:
                        'c0d6b66e-0831-4f7d-94a2-1e12b6b58500',
                      previousWorkflowItemId:
                        'c0d6b66e-0831-4f7d-94a2-1e12b6b58501',
                    },
                  ],
                },
              ],
              studyEstimands: [
                {
                  uuid: 'cb6d51ef-43da-49f6-9bc3-ad66d2675dc3',
                  treatment: {
                    uuid: 'eb7734c6-bc9c-4e99-be53-ef0e4d6e7ec5',
                    interventionDesc: 'Intervention 1',
                    codes: [
                      {
                        uuid: '7659820a-f76d-4c75-adc2-0bfe57818e73',
                        code: 'C7639x',
                        codeSystem: 'http://www.cdisc.org',
                        codeSystemVersion: '1',
                        decode: 'MODEL 1',
                      },
                    ],
                  },
                  summaryMeasure: 'TEST',
                  analysisPopulation: {
                    uuid: '0004145a-3b1b-48f5-a79a-600776f8b0c1',
                    population_desc: 'Population 1',
                  },
                  variableOfInterest: {
                    uuid: 'bcfa2fc8-58f3-457a-b9f3-0ed8f655233b',
                    encounterContactMode: [
                      {
                        uuid: '05e29077-cd17-4515-ba47-cadfa40d1705',
                        code: 'C175574',
                        codeSystem: 'http://www.cdisc.org',
                        codeSystemVersion: '2022-03-25',
                        decode: 'IN PERSON',
                      },
                    ],
                    encounterDesc: 'desc',
                    encounterEnvironmentalSetting: [
                      {
                        uuid: 'b941bc3b-b6b3-4e5f-9a6b-4b9a0d227d23',
                        code: 'C51282',
                        codeSystem: 'http://www.cdisc.org',
                        codeSystemVersion: '2022-03-25',
                        decode: 'SOCIAL SETTING',
                      },
                    ],
                    encounterName: 'Encounter 1',
                    encounterType: [
                      {
                        uuid: 'c806ec1c-d08a-4c12-805c-db1b8f40e81a',
                        code: 'C7652x',
                        codeSystem: 'http://www.cdisc.org',
                        codeSystemVersion: '1',
                        decode: 'Visit',
                      },
                    ],
                    nextEncounterId: 'c0d6b66e-0831-4f7d-94a2-1e12b6b58500',
                    previousEncounterId: 'c0d6b66e-0831-4f7d-94a2-1e12b6b58501',
                    startRule: {
                      uuid: 'd0819bea-92a6-455c-b087-89ef6767d71d',
                      transitionRuleDesc: 'Start Rule',
                    },
                    endRule: {
                      uuid: '2a4ef051-a9ff-4bdc-9468-d2501eeaed22',
                      transitionRuleDesc: 'End Rule',
                    },
                  },
                  interCurrentEvents: [
                    {
                      uuid: '83f15395-027c-444f-85e1-42f9c09971dd',
                      interCurrentEventDesc: 'Event 1 Desc',
                      interCurrentEventName: 'Event 1 Name',
                      strategy: [
                        {
                          uuid: '50e4eab2-0285-4fb6-a31b-14649159dd5a',
                          code: 'Cxxxx',
                          codeSystem: 'http://www.cdisc.org',
                          codeSystemVersion: '2022-03-25',
                          decode: 'Sample Strategy',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          studyVersion: '1',
        },
        auditTrail: {
          entryDateTime: '2022-07-28T07:15:10.094Z',
          SDRUploadVersion: 2,
        },
      };
      let returnValue = service.getSponsorDetails(studyElement);
      expect(returnValue).toEqual({
        studyId: undefined,
        versionId: 2,
      });
    });
  });
  // describe('getHeaderName', () => {
  //   it('tests studyTitle', () => {
  //     expect(service.getHeaderName('study.studyTitle')).toEqual('studyTitle');
  //   });
  //   it('tests SponsorId', () => {
  //     expect(service.getHeaderName('0')).toEqual('SponsorId');
  //   });
  //   it('tests Indication', () => {
  //     expect(service.getHeaderName('1')).toEqual('Indication');
  //   });
  //   it('tests InterventionModel', () => {
  //     expect(service.getHeaderName('2')).toEqual('InterventionModel');
  //   });
  //   it('tests Phase', () => {
  //     expect(service.getHeaderName('study.studyPhase')).toEqual('Phase');
  //   });
  //   // it('tests LastModifiedBySystem', () => {
  //   //   expect(service.getHeaderName('auditTrail.entrySystem')).toEqual('LastModifiedBySystem');
  //   // });
  //   it('tests LastModifiedDate', () => {
  //     expect(service.getHeaderName('auditTrail.entryDateTime')).toEqual('LastModifiedDate');
  //   });
  //   it('tests SDRVersion', () => {
  //     expect(service.getHeaderName('auditTrail.SDRUploadVersion')).toEqual('SDRVersion');
  //   });
  //   it('tests status', () => {
  //     expect(service.getHeaderName('study.studyStatus')).toEqual('status');
  //   });
  //   it('tests tag', () => {
  //     expect(service.getHeaderName('study.studyTag')).toEqual('tag');
  //   });
  // });
  // describe('gridDataSourceForSearchStudy',() => {
  //   let reqObj = {"studyTitle":"","briefTitle":"","interventionModel":"","fromDate":"2022-02-01","studyId":"","phase":"","indication":"","toDate":"","asc":false,"header":"entryDateTime"};
  //   let gridApi = new GridOptions();
  //   service.gridDataSourceForSearchStudy(reqObj,gridApi,5);
  //   it('tests gridDataSourceForSearchStudy', () => {
  //     expect(service.getHeaderName('study.studyTitle')).toEqual('studyTitle');
  //   });
  // });
});
