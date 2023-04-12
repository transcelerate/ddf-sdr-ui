import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from '../../services/service-call/service-call.service';
import { AuditTrailComponent } from './audit-trail.component';
import { of, throwError } from 'rxjs';
import { StudyElementDescriptionComponent } from '../study-element-description/study-element-description.component';
import { CommonMethodsService } from '../../services/common-methods.service';

describe('AuditTrailComponent', () => {
  let component: AuditTrailComponent;
  let fixture: ComponentFixture<AuditTrailComponent>;

  beforeEach(() => {
    const elementRefStub = () => ({
      nativeElement: {
        getElementsByClassName: () => ({
          length: {},
          removeAttribute: () => ({}),
          setAttribute: () => ({}),
        }),
      },
    });
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const activatedRouteStub = () => ({
      params: { subscribe: (f: (arg0: {}) => any) => f({}) },
    });
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({}),
    });
    const serviceCallStub = () => ({
      getAuditTrail: (studyId: any) => ({
        subscribe: (f: (arg0: {}) => any) => f({}),
      }),
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
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AuditTrailComponent],
      providers: [
        { provide: ElementRef, useFactory: elementRefStub },
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        StudyElementDescriptionComponent,
      ],
    });
    fixture = TestBed.createComponent(AuditTrailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`disableButton has default value`, () => {
    expect(component.disableButton).toEqual(true);
  });

  it(`columnDefs has default value`, () => {
    expect(component.columnDefs.length).toEqual(5);
  });

  // it(`rowData has default value`, () => {
  //   expect(typeof(component.rowData)).toEqual(undefined);
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
  //       NgxSpinnerService
  //     );
  //     const serviceCallStub: ServiceCall = fixture.debugElement.injector.get(
  //       ServiceCall
  //     );
  //     spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
  //     spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
  //     spyOn(serviceCallStub, 'getAuditTrail').and.callThrough();
  //     component.ngOnInit();
  //     expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
  //     expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
  //     expect(serviceCallStub.getAuditTrail).toHaveBeenCalled();
  //   });
  // });

  describe('versionCompare', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.versionCompare();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('generateCompareA', () => {
    it('makes expected calls', () => {
      let param = {
        data: {
          tag: '1.0Draft',
          status: 'New',
          entryDateTime: '2022-FEB-15',
          entrySystemId: 'Viswesh_localHost',
          entrySystem: 'Viswesh',
          studyVersion: 3,
        },
      };
      let val = component.generateCompareA(param);
      let val1 = component.generateCompareB(param);
      expect(isHTML(val)).toBe(false);
      expect(isHTML(val1)).toBe(false);
    });
  });

  describe('setRadio', () => {
    it('makes expected calls', () => {
      let selectedVal = {
        tag: '1.0Draft',
        status: 'New',
        entryDateTime: '2022-FEB-15',
        entrySystemId: 'Viswesh_localHost',
        entrySystem: 'Viswesh',
        studyVersion: 3,
      };

      let val = component.setRadio(selectedVal, 'A');
      let val1 = component.setRadio(selectedVal, 'B');
      expect(component.disableButton).toBe(false);
    });
    describe('ngOnInit', () => {
      it('makes expected calls', () => {
        const serviceCallStub: ServiceCall =
          fixture.debugElement.injector.get(ServiceCall);

        spyOn<ServiceCall, any>(serviceCallStub, 'getAuditTrail').and.callFake(
          () => {
            return of({
              studyId: '9c950391-550a-495a-9f17-1eea216f1cd7',
              revisionHistory: [
                {
                  tag: '1.0Draft',
                  status: 'New',
                  entryDateTime: '2022-FEB-15',
                  entrySystemId: 'Viswesh_localHost',
                  entrySystem: 'Viswesh',
                  studyVersion: 3,
                },
                {
                  tag: '1.0Draft',
                  status: 'New',
                  entryDateTime: '2022-FEB-15',
                  entrySystemId: 'Viswesh_localHost',
                  entrySystem: 'Viswesh',
                  studyVersion: 2,
                },
                {
                  tag: '1.0Draft',
                  status: 'New',
                  entryDateTime: '2022-FEB-15',
                  entrySystemId: 'Viswesh_localHost',
                  entrySystem: 'Viswesh',
                  studyVersion: 1,
                },
              ],
            }); // or return a list of bookings in case you want to test the first part of the if statement
          }
        );

        //  spyOn(serviceCallStub, 'getStudyElement').and.returnValue({ subscribe: () => {} });;
        component.studyId = '1';

        component.ngOnInit();
        // expect(component.heading).toEqual('Study Details');
        expect(serviceCallStub.getAuditTrail).toHaveBeenCalled();
      });
      it('error call ', () => {
        const serviceCallStub: ServiceCall =
          fixture.debugElement.injector.get(ServiceCall);
        spyOn<ServiceCall, any>(
          serviceCallStub,
          'getAuditTrail'
        ).and.returnValue(throwError(errorResponse));
        component.ngOnInit();
        expect(component.showError).toEqual(true);
      });
    });
  });
  function isHTML(str: any) {
    var a = document.createElement('div');
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
  }
});
function errorResponse(errorResponse: any): any {
  throw new Error('Function not implemented.');
}
