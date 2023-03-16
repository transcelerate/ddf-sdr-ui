import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      root: {},
      routeConfig: { data: {}, path: {} },
      snapshot: { params: {} },
      firstChild: {},
    });
    const routerStub = () => ({
      events: { pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) },
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
      ],
    });
    spyOn(BreadcrumbComponent.prototype, 'buildBreadCrumb');
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(BreadcrumbComponent.prototype.buildBreadCrumb).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      (<jasmine.Spy>component.buildBreadCrumb).calls.reset();
      component.ngOnInit();
      expect(component.buildBreadCrumb).toHaveBeenCalled();
    });
  });
});
