// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ElementRef } from '@angular/core';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// import { MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ServiceCall } from '../../services/service-call/service-call.service';
// import { VersionComparisonComponent } from './version-comparison.component';

// describe('VersionComparisonComponent', () => {
//   let component: VersionComparisonComponent;
//   let fixture: ComponentFixture<VersionComparisonComponent>;

//   beforeEach(() => {
//     const elementRefStub = () => ({
//       nativeElement: {
//         getElementsByClassName: () => ({ length: {}, prepend: () => ({}) })
//       }
//     });
//     const routerStub = () => ({});
//     const activatedRouteStub = () => ({ params: { subscribe: (f: (arg0: {}) => any) => f({}) } });
//     const monacoEditorLoaderServiceStub = () => ({
//       isMonacoLoaded$: { pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) }
//     });
//     const ngxSpinnerServiceStub = () => ({
//       show: () => ({}),
//       hide: () => ({})
//     });
//     const serviceCallStub = () => ({
//       getStudyElement: (studyId: any, arg1: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
//     });
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [VersionComparisonComponent],
//       providers: [
//         { provide: ElementRef, useFactory: elementRefStub },
//         { provide: Router, useFactory: routerStub },
//         { provide: ActivatedRoute, useFactory: activatedRouteStub },
//         {
//           provide: MonacoEditorLoaderService,
//           useFactory: monacoEditorLoaderServiceStub
//         },
//         { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
//         { provide: ServiceCall, useFactory: serviceCallStub }
//       ]
//     });
//     setTimeout(() => {
//     fixture = TestBed.createComponent(VersionComparisonComponent);
//     component = fixture.componentInstance;
//   }, 1000);
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//   });

//   it("Should create component", async() => {
//     setTimeout(() => {
//       expect(component).toBeTruthy();
//     }, 2000);
//   });

//   // describe('ngOnInit', () => {
//   //   it('makes expected calls', () => {
//   //     const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
//   //       NgxSpinnerService
//   //     );
//   //     const serviceCallStub: ServiceCall = fixture.debugElement.injector.get(
//   //       ServiceCall
//   //     );
//   //     spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
//   //     spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
//   //     spyOn(serviceCallStub, 'getStudyElement').and.callThrough();
//   //     component.ngOnInit();
//   //     expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
//   //     expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
//   //     expect(serviceCallStub.getStudyElement).toHaveBeenCalled();
//   //   });
//   // });
// });
