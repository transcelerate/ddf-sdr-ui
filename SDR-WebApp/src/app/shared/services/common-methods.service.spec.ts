import { TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from './service-call/service-call.service';
import { CommonMethodsService } from './common-methods.service';
import { AgGridModule } from 'ag-grid-angular';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CommonMethodsService', () => {
  let service: CommonMethodsService;

  beforeEach(() => {
    const bsModalServiceStub = {  };
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({})
    });
    const serviceCallStub = () => ({
      getSearchResult: (reqObj: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        CommonMethodsService,
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: BsModalService, useValue: bsModalServiceStub },
      ],
      imports: [
        AgGridModule.withComponents([])
    ]
    });
    service = TestBed.inject(CommonMethodsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getSponsorDetails', () => {
    it('getSponsorDetails should return studyId and versionId', () => {
      let studyElement = {
        "clinicalStudy":{
           "studyIdentifiers":[
              {
                 "id":"f3e61d97-60d2-499c-bbbc-4f3996385627",
                 "orgCode":"2.16.840.1",
                 "name":"SponsorNo",
                 "idType":"SPONSOR_ID"
              },
              {
                 "id":"7f6d988e-507f-4898-b7aa-b25d93ef26d9",
                 "orgCode":"2.16.840.1",
                 "name":"SponsorNo",
                 "idType":"SPONSOR_ID"
              }
           ],
        },
        "auditTrail":{
           "entryDateTime":"2022-FEB-07",
           "entrySystemId":"Viswesh_localHost",
           
           "studyVersion":1
        }
     };
     let returnValue = service.getSponsorDetails(studyElement);
     expect (returnValue).toEqual({
      'studyId':'2.16.840.1',
      'versionId':1
     })
    });
  });
  // describe('getHeaderName', () => {
  //   it('tests studyTitle', () => {
  //     expect(service.getHeaderName('clinicalStudy.studyTitle')).toEqual('studyTitle');
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
  //     expect(service.getHeaderName('clinicalStudy.studyPhase')).toEqual('Phase');
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
  //     expect(service.getHeaderName('clinicalStudy.studyStatus')).toEqual('status');
  //   });
  //   it('tests tag', () => {
  //     expect(service.getHeaderName('clinicalStudy.studyTag')).toEqual('tag');
  //   });
  // });
  // describe('gridDataSourceForSearchStudy',() => {
  //   let reqObj = {"studyTitle":"","briefTitle":"","interventionModel":"","fromDate":"2022-02-01","studyId":"","phase":"","indication":"","toDate":"","asc":false,"header":"entryDateTime"};
  //   let gridApi = new GridOptions();
  //   service.gridDataSourceForSearchStudy(reqObj,gridApi,5);
  //   it('tests gridDataSourceForSearchStudy', () => {
  //     expect(service.getHeaderName('clinicalStudy.studyTitle')).toEqual('studyTitle');
  //   });
  // });
});
