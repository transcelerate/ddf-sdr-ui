import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ServiceCall } from '../../../../shared/services/service-call/service-call.service';
import { DialogService } from '../../../../shared/services/communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from '../../../../shared/services/common-methods.service';
import { MsalBroadcastService } from '@azure/msal-angular';
import { MsalService } from '@azure/msal-angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RecentActivityComponent } from './recent-activity.component';
import { AgGridModule } from 'ag-grid-angular';

describe('RecentActivityComponent', () => {
  let component: RecentActivityComponent;
  let fixture: ComponentFixture<RecentActivityComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({});
    const elementRefStub = () => ({});
    const serviceCallStub = () => ({});
    const dialogServiceStub = () => ({
      changeDialogState: (string: any) => ({}),
    });
    const ngxSpinnerServiceStub = () => ({});
    const commonMethodsServiceStub = () => ({
      gridDataSourceForSearchStudy: (
        reqObj: any,
        gridApi: any,
        bLOCK_SIZE: any
      ) => ({}),
    });
    const msalBroadcastServiceStub = () => ({
      msalSubject$: {
        pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      },
    });
    const msalServiceStub = () => ({});
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: (array: any, object: any) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecentActivityComponent],

      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ElementRef, useFactory: elementRefStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: DialogService, useFactory: dialogServiceStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: MsalBroadcastService, useFactory: msalBroadcastServiceStub },
        { provide: MsalService, useFactory: msalServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
      ],
    });
    fixture = TestBed.createComponent(RecentActivityComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`value has default value`, () => {
    expect(component.value).toEqual([]);
  });

  it(`BLOCK_SIZE has default value`, () => {
    expect(component.BLOCK_SIZE).toEqual(20);
  });

  it(`showStudyElement has default value`, () => {
    expect(component.showStudyElement).toEqual(false);
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

  describe('getStudyVersionGrid', () => {
    it(`getStudyVersionGrid has default value`, () => {
      let val1 = component.getStudyVersionGrid({});
      expect(val1).toEqual('');
    });
    it(`getStudyVersionGrid has default value`, () => {
      let val = component.getStudyVersionGrid({
        data: {
          study: {
            studyIdentifiers: [
              {
                id: 'f3e61d97-60d2-499c-bbbc-4f3996385627',
                orgCode: '2.16.840.1',
                name: 'SponsorNo',
                idType: 'SPONSOR_ID',
              },
              {
                id: '7f6d988e-507f-4898-b7aa-b25d93ef26d9',
                orgCode: '2.16.840.1',
                name: 'SponsorNo',
                idType: 'SPONSOR_ID',
              },
            ],
          },
          auditTrail: {
            entryDateTime: '2022-FEB-07',
            entrySystemId: 'Viswesh_localHost',

            SDRUploadVersion: 1,
            usdmVersion: '2.0',
          },
        },
      });
      expect(val).not.toEqual('');
    });
  });

  describe('setSelectedValue', () => {
    it('should redirect the user to the details page', () => {
      let router = TestBed.get(Router);
      let spy = spyOn(router, 'navigate');
      let param = {
        study: {
          studyId: 1,
        },
        auditTrail: {
          SDRUploadVersion: 1,
          usdmVersion: '2.0',
        },
      };
      component.setSelectedValue(param);
      expect(component.showStudyElement).toEqual(true);
      expect(spy).toHaveBeenCalledWith(
        ['details', { studyId: 1, versionId: 1, usdmVersion: '2.0' }],
        { relativeTo: {} }
      );
    });
  });
  describe('onGridReady', () => {
    it('ongridready', () => {
      let param = {
        columnApi: {
          studyVersion: 1,
        },
      };
      component.onGridReady(param);
      expect(true).toEqual(true);
    });
  });
});
