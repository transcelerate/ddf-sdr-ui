import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DialogService } from '../../services/communication.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    const msalServiceStub = () => ({ logout: () => ({}) });
    const dialogServiceStub = () => ({
      dialogObservable: { subscribe: (f: (arg0: {}) => any) => f({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [
        { provide: MsalService, useFactory: msalServiceStub },
        { provide: DialogService, useFactory: dialogServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`refreshStatus has default value`, () => {
    expect(component.refreshStatus).toEqual(false);
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const msalServiceStub: MsalService = fixture.debugElement.injector.get(
        MsalService
      );
      spyOn(msalServiceStub, 'logout').and.callThrough();
      component.logout();
      msalServiceStub.logout();
      expect(msalServiceStub.logout).toHaveBeenCalled();
    });
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      // const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
      //   DialogService
      // );
      // spyOn(dialogServiceStub, "changeDialogState").and.callThrough();
      // component.ngOnInit();
      // expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
      component.ngOnInit();
      expect(component.refreshStatus).toEqual(true);
    });
  });
});


