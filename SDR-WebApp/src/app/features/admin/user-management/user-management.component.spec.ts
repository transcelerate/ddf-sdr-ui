import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonMethodsService } from "src/app/shared/services/common-methods.service";
import { DialogService } from "src/app/shared/services/communication.service";
import { ServiceCall } from "src/app/shared/services/service-call/service-call.service";
import { UserManagementComponent } from "./user-management.component";
import { configList } from "src/app/shared/components/study-element-description/config/study-element-field-config";

describe("UserManagementComponent", () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    const activatedRouteStub = () => ({});
    const bsModalServiceStub = () => ({ show: (content: any, object: any) => ({}) });
    const ngxSpinnerServiceStub = () => ({});
    const commonMethodsServiceStub = () => ({
      postUser: (selectedUser: any, arg1: any) => ({}),
      gridDataSourceForUser: (
        object: any,
        gridApi: any,
        gridOptions: any,
        bLOCK_SIZE: any,
        arg3: any
      ) => ({})
    });
    const dialogServiceStub = () => ({ changeDialogState: (string: any) => ({}) });
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
        { provide: ServiceCall, useFactory: serviceCallStub }
      ]
    });
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`BLOCK_SIZE has default value`, () => {
    expect(component.BLOCK_SIZE).toEqual(configList.BLOCK_SIZE);
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      const dialogServiceStub: DialogService = fixture.debugElement.injector.get(
        DialogService
      );
      spyOn(dialogServiceStub, "changeDialogState").and.callThrough();
      component.ngOnInit();
      expect(dialogServiceStub.changeDialogState).toHaveBeenCalled();
    });
  });

  describe("confirm", () => {
    it("makes expected calls", () => {
      const commonMethodsServiceStub: CommonMethodsService = fixture.debugElement.injector.get(
        CommonMethodsService
      );
      spyOn(commonMethodsServiceStub, "postUser").and.callThrough();
      component.confirm();
      expect(commonMethodsServiceStub.postUser).toHaveBeenCalled();
    });
  });

  describe("getAllUsers", () => {
    it("makes expected calls", () => {
      const commonMethodsServiceStub: CommonMethodsService = fixture.debugElement.injector.get(
        CommonMethodsService
      );
      spyOn(
        commonMethodsServiceStub,
        "gridDataSourceForUser"
      ).and.callThrough();
      component.getAllUsers();
      expect(commonMethodsServiceStub.gridDataSourceForUser).toHaveBeenCalled();
    });
  });
});
