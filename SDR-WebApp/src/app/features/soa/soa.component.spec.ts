import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SoaComponent } from './soa.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';

describe('SoaComponent', () => {
  let component: SoaComponent;
  let fixture: ComponentFixture<SoaComponent>;

  beforeEach(async () => {
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const activatedRouteStub = () => ({
      params: { subscribe: (f: (arg0: {}) => any) => f({}) },
    });
    const serviceCallStub = () => ({
      getStudyElement: (studyId: any, versionId: any) => ({ subscribe: {} }),
      getStudyElementWithVersion: (usdmVersion: any, url: any) => ({ subscribe: {} })
    });
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SoaComponent],
      providers: [
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});