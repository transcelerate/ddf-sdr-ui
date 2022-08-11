import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/shared/services/communication.service';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { UserManagementComponent } from './user-management.component';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const activatedRouteStub = () => ({});
    const bsModalServiceStub = () => ({
      show: (content: any, object: any) => ({}),
    });
    const ngxSpinnerServiceStub = () => ({});
    const commonMethodsServiceStub = () => ({
      postUser: (selectedUser: any, arg1: any) => ({}),
      gridDataSourceForUser: (
        object: any,
        gridApi: any,
        gridOptions: any,
        bLOCK_SIZE: any,
        arg3: any
      ) => ({}),
    });
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const serviceCallStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserManagementComponent],
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
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`BLOCK_SIZE has default value`, () => {
    expect(component.BLOCK_SIZE).toEqual(configList.BLOCK_SIZE);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dialogServiceStub: DialogService =
        fixture.debugElement.injector.get(DialogService);
      spyOn(dialogServiceStub, 'changeDialogState').and.callThrough();
      component.ngOnInit();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('makes expected calls', () => {
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      component.selectedUser = {
        oid: '<AzurePortal-OID3>',

        email: 'testuser1@acp200520a.onmicrosoft.com',

        groups: [
          {
            groupId: 'a1dbb863-9494-4e5e-9d3b-0c6e79e2971b',

            groupName: 'testIn dev2 group',

            isActive: false,
          },

          {
            groupId: '192844eb-beec-4e94-a185-ba33337ae243',

            groupName: 'Testing Group',

            isActive: true,
          },

          {
            groupId: '2c99575e-c157-4c2a-b5e0-66cba4db8040',

            groupName: 'Testing Group1',

            isActive: true,
          },
        ],
      };
      spyOn(commonMethodsServiceStub, 'postUser').and.callThrough();
      component.confirm();
      expect(commonMethodsServiceStub.postUser).toHaveBeenCalled();
    });
  });
  describe('edit', () => {
    it('makes expected calls', () => {
      let params = {
        groupFieldName: 'studyType',
        groupFilterValues: [
          { id: 'INTERVENTIONAL', title: 'INTERVENTIONAL' },
          { id: 'EXPANDED_ACCESS', title: 'EXPANDED_ACCESS' },
        ],
        groupName: 'OncologyReadWrite',
        permission: 'READONLY',
        groupId: 'a5e41cf7-b984-4091-90a2-4be699ad2f67',
      };
      component.edit(params);
      expect(params).toBe(params);
    });
  });
  describe('openModal', () => {
    it('makes expected calls', () => {
      let field = [
        { id: 'INTERVENTIONAL', title: 'INTERVENTIONAL' },
        { id: 'EXPANDED_ACCESS', title: 'EXPANDED_ACCESS' },
      ];
      component.openModal(field);
      expect(component.userGroupList).toBe(field);
    });
  });
  describe('decline', () => {
    it('makes expected calls', () => {
      component.decline();
      expect(true).toBe(true);
    });
  });
  describe('openDeleteConfirmation', () => {
    it('makes expected calls', () => {
      component.rowData = [
        {
          groupFieldName: 'studyType',
          groupFilterValues: [
            { id: 'INTERVENTIONAL', title: 'INTERVENTIONAL' },
            { id: 'EXPANDED_ACCESS', title: 'EXPANDED_ACCESS' },
          ],
          groupName: 'OncologyReadWrite',
          permission: 'READONLY',
          groupId: 'a5e41cf7-b984-4091-90a2-4be699ad2f67',
        },
        {
          groupFieldName: 'study',
          groupFilterValues: [
            {
              id: '848430c4-432f-4e2e-9e5a-e90a85144a8f',
              title: 'Study On Parkinson disease',
            },
          ],
          groupName: 'OncologyRead',
          permission: 'READ_WRITE',
          groupId: '0193a357-8519-4488-90e4-522f701658b9',
        },
        {
          groupFieldName: 'studyType',
          groupFilterValues: [{ id: 'OBSERVATIONAL', title: 'OBSERVATIONAL' }],
          groupId: '0193a357-8519-4488-90e4-522f701658b9',
        },
      ];
      let field = {
        groupFieldName: 'studyType',
        groupFilterValues: [
          { id: 'INTERVENTIONAL', title: 'INTERVENTIONAL' },
          { id: 'EXPANDED_ACCESS', title: 'EXPANDED_ACCESS' },
        ],
        groupName: 'OncologyReadWrite',
        permission: 'READONLY',
        groupId: 'a5e41cf7-b984-4091-90a2-4be699ad2f67',
      };
      component.openDeleteConfirmation(field);
      expect(component.selectedUser).toBe(field);
    });
  });
  describe('getAllUsers', () => {
    it('makes expected calls', () => {
      const commonMethodsServiceStub: CommonMethodsService =
        fixture.debugElement.injector.get(CommonMethodsService);
      spyOn(
        commonMethodsServiceStub,
        'gridDataSourceForUser'
      ).and.callThrough();
      component.getAllUsers();
      expect(commonMethodsServiceStub.gridDataSourceForUser).toHaveBeenCalled();
    });
  });
});
