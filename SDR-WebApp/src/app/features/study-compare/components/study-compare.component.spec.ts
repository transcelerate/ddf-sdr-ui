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
    const dialogServiceStub = () => ({ changeDialogState: (string: any) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StudyCompareComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: DialogService, useFactory: dialogServiceStub }
      ]
    });
    fixture = TestBed.createComponent(StudyCompareComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      spyOn(component, 'setModel').and.callThrough();
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.ngOnInit();
      expect(component.setModel).toHaveBeenCalled();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
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
});
