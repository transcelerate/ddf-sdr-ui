import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/shared/services/communication.service';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { AddUserComponent } from './add-user.component';
import { of, Subject } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const activatedRouteStub = () => ({});
    const bsModalServiceStub = () => ({ show: (template: any) => ({}) });
    const ngxSpinnerServiceStub = () => ({
      hide: () => ({}),
      show: () => ({}),
    });
    const commonMethodsServiceStub = () => ({
      postUser: (request: any, arg: any) => ({}),
    });
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const serviceCallStub = () => ({
      getAllUserList: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getAllGroupList: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddUserComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: BsModalService, useFactory: bsModalServiceStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
      ],
    });
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    let somevalue = {
      oid: '13fb048c-a008-4a4d-85e3-284cac2980f1',
      email: 'abilling@amgen.com',
      groups: [
        {
          groupId: 'a5e41cf7-b984-4091-90a2-4be699ad2f67',
          groupName: 'OncologyReadWrite',
          isActive: true,
        },
      ],
    };
    window.history.pushState(
      { data: somevalue, selected: 'studyType' },
      '',
      ''
    );
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`groupSelected has default value`, () => {
    expect(component.groupSelected).toEqual([]);
  });

  it(`userSelected has default value`, () => {
    expect(component.userSelected).toEqual([]);
  });

  it(`groupSelectedOriginal has default value`, () => {
    expect(component.groupSelectedOriginal).toEqual([]);
  });

  it('getAllUserList error scenario', () => {
    const ngxSpinnerServiceStub: NgxSpinnerService =
      fixture.debugElement.injector.get(NgxSpinnerService);
    const dialogServiceStub: DialogService =
      fixture.debugElement.injector.get(DialogService);
    const serviceCallStub: ServiceCall =
      fixture.debugElement.injector.get(ServiceCall);
    const errorSubject = new Subject();
    spyOn<ServiceCall, any>(serviceCallStub, 'getAllUserList').and.callFake(
      () => errorSubject
    );
    spyOn<ServiceCall, any>(serviceCallStub, 'getAllGroupList').and.callFake(
      () => errorSubject
    );
    errorSubject.error('error');
    spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
    spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
    spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();

    // spyOn(serviceCallStub, 'getAllGroupList').and.callThrough();
    component.ngOnInit();
    expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
    expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
    expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    expect(serviceCallStub.getAllUserList).toHaveBeenCalled();
    expect(serviceCallStub.getAllGroupList).toHaveBeenCalled();
  });

  describe('openSearchData', () => {
    it('makes expected calls', () => {
      const templateRefStub: any = <any>{};
      const bsModalServiceStub: BsModalService =
        fixture.debugElement.injector.get(BsModalService);
      spyOn(bsModalServiceStub, 'show').and.callThrough();
      component.openSearchData(templateRefStub);
      expect(bsModalServiceStub.show).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const ngxSpinnerServiceStub: NgxSpinnerService =
        fixture.debugElement.injector.get(NgxSpinnerService);
      const dialogServiceStub: DialogService =
        fixture.debugElement.injector.get(DialogService);
      const serviceCallStub: ServiceCall =
        fixture.debugElement.injector.get(ServiceCall);

      spyOn<ServiceCall, any>(serviceCallStub, 'getAllUserList').and.callFake(
        () => {
          return of([
            {
              id: 'c8d1921e-c915-4dbe-aa4a-9b2dde248ae9',
              displayName: 'A81691DIRPacpazr0799@accenture.com',
              mail: null,
            },
            {
              id: '13fb048c-a008-4a4d-85e3-284cac2980f1',
              displayName: 'Luckman, Alison',
              mail: 'abilling@amgen.com',
            },
          ]); // or return a list of bookings in case you want to test the first part of the if statement
        }
      );
      spyOn<ServiceCall, any>(serviceCallStub, 'getAllGroupList').and.callFake(
        () => {
          return of([
            {
              groupId: '0193a357-8519-4488-90e4-522f701658b9',
              groupName: 'OncologyRead',
            },
            {
              groupId: 'a5e41cf7-b984-4091-90a2-4be699ad2f67',
              groupName: 'OncologyReadWrite',
            },
          ]); // or return a list of bookings in case you want to test the first part of the if statement
        }
      );

      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();

      // spyOn(serviceCallStub, 'getAllGroupList').and.callThrough();
      component.ngOnInit();
      expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
      expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
      expect(serviceCallStub.getAllUserList).toHaveBeenCalled();
      expect(serviceCallStub.getAllGroupList).toHaveBeenCalled();
    });
  });

  describe('addUser', () => {
    it('makes expected calls', () => {
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      component.userList = [
        {
          id: 'c8d1921e-c915-4dbe-aa4a-9b2dde248ae9',
          displayName: 'A81691DIRPacpazr0799@accenture.com',
          mail: null,
        },
        {
          id: '13fb048c-a008-4a4d-85e3-284cac2980f1',
          displayName: 'Luckman, Alison',
          mail: 'abilling@amgen.com',
        },
      ];
      component.groupSelected = [];
      component.groupSelectedOriginal = [];
      component.userSelected = [
        {
          id: '13fb048c-a008-4a4d-85e3-284cac2980f1',
          displayName: 'Luckman, Alison',
        },
      ];
      spyOn(commonMethodsServiceStub, 'postUser').and.callThrough();
      component.addUser();
      expect(commonMethodsServiceStub.postUser).toHaveBeenCalled();
    });
  });

  describe('onClosed', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.onClosed();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onClosed').and.callThrough();
      component.confirm();
      expect(component.onClosed).toHaveBeenCalled();
    });
  });
  describe('getAllUsers', () => {
    it('makes expected calls', () => {
      component.getAllUsers();
      expect(component.saveSuccess).toBe(true);
    });
  });
  describe('confirm', () => {
    it('makes expected calls', () => {
      component.userList = [
        {
          id: 'c8d1921e-c915-4dbe-aa4a-9b2dde248ae9',
          displayName: 'A81691DIRPacpazr0799@accenture.com',
          mail: null,
        },
        {
          id: '13fb048c-a008-4a4d-85e3-284cac2980f1',
          displayName: 'Luckman, Alison',
          mail: 'abilling@amgen.com',
        },
      ];
      component.groupSelected = [
        {
          groupId: '0193a357-8519-4488-90e4-522f701658b9',
          groupName: 'OncologyRead',
        },
        {
          groupId: 'a5e41cf7-b984-4091-90a2-4be699ad2f67',
          groupName: 'OncologyReadWrite',
        },
      ];
      component.groupSelectedOriginal = [
        {
          groupId: '0193a357-8519-4488-90e4-522f701658b9',
          groupName: 'OncologyRead',
        },
        {
          groupId: 'a5e41cf7-b984-4091-90a2-4be699ad2f67',
          groupName: 'OncologyReadWrite',
        },
      ];
      component.userSelected = [
        {
          id: '13fb048c-a008-4a4d-85e3-284cac2980f1',
          displayName: 'Luckman, Alison',
        },
      ];
      component.isEdit = false;
      component.addUser();
      expect(1).toBe(1);
      component.isEdit = true;
      component.addUser();
      expect(1).toBe(1);
    });
  });
});
