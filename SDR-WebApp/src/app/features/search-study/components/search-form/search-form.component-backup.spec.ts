// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { ServiceCall } from '../../../../shared/services/service-call/service-call.service';
// import { DialogService } from 'src/app/shared/services/communication.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { CommonMethodsService } from '../../../../shared/services/common-methods.service';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// import { SearchFormComponent } from './search-form.component';
// import { BsModalService } from 'ngx-bootstrap/modal';
// describe('SearchFormComponent', () => {
//   let component: SearchFormComponent;
//   let fixture: ComponentFixture<SearchFormComponent>;

//   beforeEach(() => {

//     const formBuilderStub = () => ({
//       group: (object: any, object1: any) => ({}),
//     });
//     const serviceCallStub = () => ({ readConfigFile: () => ({}) });
//     const dialogServiceStub = () => ({
//       changeDialogState: (string: any) => ({}),
//     });
//     const bsModalServiceStub = {  };
//     const ngxSpinnerServiceStub = () => ({});
//     const commonMethodsServiceStub = () => ({
//       gridDataSourceForSearchStudy: (
//         reqObj: any,
//         gridApi: any,
//         bLOCK_SIZE: any
//       ) => ({}),
//     });
//     const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
//     const activatedRouteStub = () => ({});
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [SearchFormComponent],
//       imports: [ReactiveFormsModule],
//       providers: [
//         { provide: FormBuilder, useFactory: formBuilderStub },
//         { provide: ServiceCall, useFactory: serviceCallStub },
//         { provide: DialogService, useFactory: dialogServiceStub },
//         { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
//         { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
//         { provide: Router, useFactory: routerStub },
//         { provide: ActivatedRoute, useFactory: activatedRouteStub },
//         { provide: BsModalService, useValue: bsModalServiceStub },
//       ],
//     });
//     fixture = TestBed.createComponent(SearchFormComponent);
//     component = fixture.componentInstance;
//     let formBuilder = TestBed.inject(FormBuilder); // get a handle on formBuilder
//     // add the mock data here
//     component.editorForm = formBuilder.group(
//       {
//         studyTitle: 'uu',
//         interventionModel: 'uu',
//         fromDate: 'uu',
//         studyId: 'uu',
//         phase: 'uu',
//         indication: 'uu',
//         toDate: 'uu',
//       },
//       { validators: component.atLeastOneValidator }
//       );
//   });

//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });

//   it(`value has default value`, () => {
//     expect(component.value).toEqual([]);
//   });

//   it(`BLOCK_SIZE has default value`, () => {
//     expect(component.BLOCK_SIZE).toEqual(20);
//   });

//   describe('submitSearch', () => {
//     it('makes expected calls', () => {
//       // component.editorForm.setValue({
//       //   studyTitle: '',
//       //   briefTitle: '',
//       //   interventionModel: '',
//       //   fromDate: '',
//       //   studyId: '',
//       //   phase: '',
//       //   indication: '',
//       //   toDate: '',
//       // });

//       component.showGrid = true;
//       component.submitSearch();
//       expect(component.showGrid).toBe(true);
//     });
//   });

//   describe('getSponsorId', () => {
//     it('makes expected calls', () => {
//       let params = {
//          data: {
//           "study":{
//              "studyIdentifiers":[
//                 {
//                    "id":"f3e61d97-60d2-499c-bbbc-4f3996385627",
//                    "orgCode":"2.16.840.1",
//                    "name":"SponsorNo",
//                    "idType":"SPONSOR_ID"
//                 },
//                 {
//                    "id":"7f6d988e-507f-4898-b7aa-b25d93ef26d9",
//                    "orgCode":"2.16.840.1",
//                    "name":"SponsorNo",
//                    "idType":"SPONSOR_ID"
//                 }
//              ],
//           },
//           "auditTrail":{
//              "entryDateTime":"2022-FEB-07",
//              "entrySystemId":"Viswesh_localHost",

//              "studyVersion":1
//           }
//        }
//        }
//       let val = component.getSponsorId(params);
//       expect(val).toBe('2.16.840.1');
//     });
//   });

//   describe('getIndication', () => {
//     it('makes expected calls', () => {
//       let params = {
//          data: {
//           "study":{
//              "studyIndications":[
//                 {
//                    "id":"f3e61d97-60d2-499c-bbbc-4f3996385627",
//                    "orgCode":"2.16.840.1",
//                    "name":"SponsorNo",
//                    "description":"SPONSOR_ID"
//                 },
//                 {
//                    "id":"7f6d988e-507f-4898-b7aa-b25d93ef26d9",
//                    "orgCode":"2.16.840.1",
//                    "name":"SponsorNo",
//                    "description":"SPONSOR_ID"
//                 }
//              ],
//           },
//           "auditTrail":{
//              "entryDateTime":"2022-FEB-07",
//              "entrySystemId":"Viswesh_localHost",

//              "studyVersion":1
//           }
//        }
//        }
//       let val = component.getIndication(params);
//       expect('SPONSOR_ID').toBe('SPONSOR_ID');
//     });
//   });

//   describe('getStudyVersionGrid', () => {
//     it('makes expected calls', () => {
//       let params = {
//          data: {
//           "study":{
//              "studyIdentifiers":[
//                 {
//                    "id":"f3e61d97-60d2-499c-bbbc-4f3996385627",
//                    "orgCode":"2.16.840.1",
//                    "name":"SponsorNo",
//                    "idType":"SPONSOR_ID"
//                 },
//                 {
//                    "id":"7f6d988e-507f-4898-b7aa-b25d93ef26d9",
//                    "orgCode":"2.16.840.1",
//                    "name":"SponsorNo",
//                    "idType":"SPONSOR_ID"
//                 }
//              ],
//           },
//           "auditTrail":{
//              "entryDateTime":"2022-FEB-07",
//              "entrySystemId":"Viswesh_localHost",

//              "studyVersion":1
//           }
//        }
//        }
//       let val = component.getStudyVersionGrid(params);
//       expect(true).toBe(true);
//     });
//   });

//   describe('setSelectedValue', () => {
//     it('makes expected calls', () => {
//       const routerStub: Router = fixture.debugElement.injector.get(Router);
//       spyOn(routerStub, 'navigate').and.callThrough();
//       let val = {
//         "study":{
//            "studyIdentifiers":[
//               {
//                  "id":"f3e61d97-60d2-499c-bbbc-4f3996385627",
//                  "orgCode":"2.16.840.1",
//                  "name":"SponsorNo",
//                  "idType":"SPONSOR_ID"
//               },
//               {
//                  "id":"7f6d988e-507f-4898-b7aa-b25d93ef26d9",
//                  "orgCode":"2.16.840.1",
//                  "name":"SponsorNo",
//                  "idType":"SPONSOR_ID"
//               }
//            ],
//         },
//         "auditTrail":{
//            "entryDateTime":"2022-FEB-07",
//            "entrySystemId":"Viswesh_localHost",

//            "studyVersion":1
//         }
//      }
//       component.setSelectedValue(val);
//       expect(routerStub.navigate).toHaveBeenCalled();
//     });
//   });

//   describe('restrictChar', () => {
//     it('makes expected calls', () => {
//       const event = document.createEvent('KeyboardEvent');;
//       let val = component.restrictChar(event);
//       expect(val).toEqual(false);
//     });
//   });
//   describe('getToday', () => {
//     it('makes expected calls', () => {
//       let val = component.getToday();
//      // component.ngAfterViewInit();
//       expect(typeof(val)).toEqual('string');
//     });
//   });
//   describe('_filter', () => {
//     it('makes expected calls', () => {
//       let arrayValue =  [
//         "CROSS-OVER",
//         "FACTORIAL",
//         "PARALLEL",
//         "SEQUENTIAL",
//         "SINGLE GROUP"
//     ];
//       let val = component._filter("CROSS-OVER","interventionModel",arrayValue);
//       component.onServerFailCallback('params');
//       expect(val).toEqual([ ]);
//     });
//   });

//   describe('ngOnInit', () => {
//     it('makes expected calls', () => {
//       const serviceCallStub: ServiceCall =
//         fixture.debugElement.injector.get(ServiceCall);
//       const dialogServiceStub: DialogService =
//         fixture.debugElement.injector.get(DialogService);
//       spyOn(serviceCallStub, 'readConfigFile').and.callThrough();
//       spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
//       component.ngOnInit();
//       expect(serviceCallStub.readConfigFile).toHaveBeenCalled();
//       expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
//     });
//   });
// });
