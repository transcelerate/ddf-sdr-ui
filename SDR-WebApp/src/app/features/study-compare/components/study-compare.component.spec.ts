import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/communication.service';
import { StudyCompareComponent } from './study-compare.component';

describe('StudyCompareComponent', () => {
  let component: StudyCompareComponent;
  let fixture: ComponentFixture<StudyCompareComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StudyCompareComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: DialogService, useFactory: dialogServiceStub },
      ],
    });
    fixture = TestBed.createComponent(StudyCompareComponent);
    component = fixture.componentInstance;
    window.history.pushState({ from: 'search1' }, '', '');
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
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
        clinicalStudy: {
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
  });

  describe('versionCompare', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.versionCompare();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('makes expected calls', () => {
      component.clear();
      component.versionCompare();
      expect(component.studyTwoTitle).toEqual('');
    });
  });
  describe('redirect', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.redirect(['/comparison/search']);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('setModel', () => {
    it('makes expected calls', () => {
      let response = {
        clinicalStudy: {
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
  });
});
