import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { ServiceCall } from '../../shared/services/service-call/service-call.service';
import { SoaComponent } from './soa.component';
import { of, Subject } from 'rxjs';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';

describe('SoaComponent', () => {
  let component: SoaComponent;
  let fixture: ComponentFixture<SoaComponent>;
  const links = {
    links: {
      studyDefinitions:
        '/v2/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e?sdruploadversion=0',
      auditTrail:
        '/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e/audittrail',
      SoA: '/v2/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e/studydesigns/soa',
    },
  };
  beforeEach(() => {
    const routerStub = () => ({});
    const activatedRouteStub = () => ({ params: { subscribe: () => {} } });
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({}),
    });
    const commonMethodsServiceStub = () => ({
      getStudyLink: (
        studyId: any,
        version: any,
        linkName: string,
        callback: (url: any) => {},
        errorCallback: (err: any) => {}
      ) => ({ showError: true }),
    });
    const serviceCallStub = () => ({
      getSoAMatrix: (usdmVersion: any, url: any) => ({ subscribe: () => {} }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SoaComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        StudyElementDescriptionComponent,
      ],
    });
    fixture = TestBed.createComponent(SoaComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('showError has default value', () => {
    expect(component.showError).toEqual(false);
  });

  it('test if true is send when duplicates are found', () => {
    let index = 2,
      eachActivity = 'Hospitalization',
      activityArray = [
        'Hospitalization',
        'Ensure availability of medication X',
        'Hospitalization',
        'Weight',
        'Vital signs',
      ];

    component.findDuplicate(index, eachActivity, activityArray);
    expect(component.findDuplicate).toBeTruthy();
  });

  it('getSoADetails makes expected calls', () => {
    const ngxSpinnerServiceStub: NgxSpinnerService =
      fixture.debugElement.injector.get(NgxSpinnerService);
    const commonMethodsServiceStub: CommonMethodsService =
      fixture.debugElement.injector.get(CommonMethodsService);
    const serviceCallStub: ServiceCall =
      fixture.debugElement.injector.get(ServiceCall);

    spyOn(component, 'getSoADetailsUsingLink').and.callThrough();
    spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
    spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
    // spyOn(commonMethodsServiceStub, 'getStudyLink');
    spyOn(commonMethodsServiceStub, 'getStudyLink').and.callFake((query) =>
      query.callback('Study URL')
    );
    spyOn(serviceCallStub, 'getSoAMatrix').and.callFake(() => {
      return of(links);
    });
    component.getSoADetails();
    expect(component.getSoADetailsUsingLink).toHaveBeenCalled();
    expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
    expect(commonMethodsServiceStub.getStudyLink).toHaveBeenCalled();
    expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
  });

  it('getSoADetails error call ', () => {
    const commonMethodsServiceStub: CommonMethodsService =
      fixture.debugElement.injector.get(CommonMethodsService);
    const serviceCallStub: ServiceCall =
      fixture.debugElement.injector.get(ServiceCall);
    const errorSubject = new Subject();
    spyOn<ServiceCall, any>(serviceCallStub, 'getSoAMatrix').and.callFake(
      () => errorSubject
    );
    spyOn(commonMethodsServiceStub, 'getStudyLink').and.callFake((query) =>
      query.callback('Study URL')
    );
    errorSubject.error('error');
    component.getSoADetails();
    expect(component.showError).toEqual(true);
  });
});
