import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { ServiceCall } from '../../shared/services/service-call/service-call.service';
import { SoaComponent } from './soa.component';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('SoaComponent', () => {
  let component: SoaComponent;
  let fixture: ComponentFixture<SoaComponent>;
  let route: ActivatedRoute;
  const links = {
    links: {
      studyDefinitions:
        '/v2/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e?sdruploadversion=0',
      revisionHistory:
        '/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e/revisionhistory',
      SoA: '/v2/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e/studydesigns/soa',
    },
  };
  const tabs = [
    {
      studyId: 'fdc86d35-dddb-4c2d-867d-544ff54ac4e0',
      studyTitle: 'Footnotest Test3',
      studyDesigns: [
        {
          studyDesignDescription: 'desc1',
          studyDesignId: 'test105',
          studyDesignName: 'First Study Design',
          studyScheduleTimelines: [
            {
              entryCondition: 'condition',
              scheduleTimelineDescription: 'First Timeline',
              scheduleTimelineId: 'TL01',
              scheduleTimelineName: 'Timeline1',
              scheduleTimelineSoA: {
                orderOfActivities: [
                  {
                    activityDescription: 'Activity_1',
                    activityId: 'ACT01',
                    activityIsConditional: true,
                    activityIsConditionalReason: 'test reason for activity 1',
                    activityName: 'Informed Consent',
                    activityTimelineId: 'TL02',
                    activityTimelineName: 'Timeline 2',
                    biomedicalConcepts: ['Diastolic Blood Pressure '],
                    definedProcedures: [
                      {
                        footnoteDescription:
                          'Name1 : This procedure is for taking the consent from the clinical trial patients',
                        footnoteId: 'P1',
                        procedureDescription:
                          'This procedure is for taking the consent from the clinical trial patients',
                        procedureId: 'test135',
                        procedureIsConditional: true,
                        procedureIsConditionalReason:
                          'This procedure is for taking the consent from the clinical trial patients',
                        procedureName: 'Name1',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ];
  beforeEach(() => {
    const routerStub = () => ({});
    const paramsSubject = new BehaviorSubject({
      studyId: 'cecc860e-a435-4f95-a2ce-9bc12869583d',
      versionId: 1,
      usdmVersion: 1.9,
    });
    const activatedRouteStub = () => ({ params: paramsSubject });
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
    const bsModalServiceStub = () => ({ show: (template: any) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SoaComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: CommonMethodsService, useFactory: commonMethodsServiceStub },
        { provide: ServiceCall, useFactory: serviceCallStub },
        { provide: BsModalService, useFactory: bsModalServiceStub },
        StudyElementDescriptionComponent,
      ],
    });
    fixture = TestBed.createComponent(SoaComponent);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    component.tabs = tabs;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('test route params on init', (done) => {
    route.params.subscribe((params) => {
      component.ngOnInit();
      expect(params['usdmVersion']).toBe(1.9);
      done();
    });
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
    spyOn(component, 'getSelectedTab');
    spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
    spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
    // spyOn(commonMethodsServiceStub, 'getStudyLink');
    spyOn(commonMethodsServiceStub, 'getStudyLink').and.callFake((query) =>
      query.callback('Study URL')
    );
    spyOn(serviceCallStub, 'getSoAMatrix').and.callFake(() => {
      return of(tabs);
    });
    component.getSoADetails();
    expect(component.getSoADetailsUsingLink).toHaveBeenCalled();
    expect(component.getSelectedTab).toHaveBeenCalled();
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
    spyOn(component, 'getSoADetailsUsingLink').and.callThrough();
    spyOn<ServiceCall, any>(serviceCallStub, 'getSoAMatrix').and.callFake(
      () => errorSubject
    );
    spyOn(commonMethodsServiceStub, 'getStudyLink').and.callFake((query) =>
      query.callback('Study URL')
    );
    errorSubject.error('error');
    component.getSoADetails();
    expect(component.showError).toEqual(true);
    expect(component.getSoADetailsUsingLink).toHaveBeenCalled();
  });

  it('openModal makes expected calls', () => {
    const templateRefStub: any = <any>{};
    const bsModalServiceStub: BsModalService =
      fixture.debugElement.injector.get(BsModalService);
    spyOn(bsModalServiceStub, 'show').and.callThrough();
    component.openModal(templateRefStub);
    expect(bsModalServiceStub.show).toHaveBeenCalled();
  });

  it('check if active tab is selected correctly', () => {
    component.tabs = tabs;
    const event = {
      id: 'test105',
      addClass: true,
      role: 'tabpanel',
    };
    spyOn(component, 'getSelectedNestedTab');
    component.getSelectedTab(event);
    expect(component.activeTab).toEqual('test105');
  });

  it('check if nested active tab is selected correctly', () => {
    const event = {
      id: 'test105_TL01',
      removable: false,
      role: 'tabpanel',
    };
    component.tabs = tabs;
    component.activeTab = 'test105';
    spyOn(component, 'addFootnoteids');
    component.getSelectedNestedTab(event);
    expect(component.activeNestedTab).toEqual('TL01');
    expect(component.addFootnoteids).toHaveBeenCalled();
  });

  it('check if check object makes expected calls', () => {
    const item = {
      scheduleTimelineDescription: 'Continuous from screening to follow-up',
      scheduleTimelineId: 'STID004',
      scheduleTimelineName: 'Continuous during study',
      scheduleTimelineSoA: {
        orderOfActivities: [
          {
            activityDescription: 'Pre-existing conditions',
            activityId: 'AID006',
            activityIsConditional: false,
            activityIsConditionalReason: 'MISSING',
            activityName: 'PREAE',
          },
          {
            activityDescription: 'Concomitant Medication',
            activityId: 'AID010',
            activityIsConditional: false,
            activityIsConditionalReason: 'MISSING',
            activityName: 'CONMED',
            activityTimelineId: '',
            activityTimelineName: '',
          },
        ],
      },
      searchBoolean: false,
    };
    const dataError = {
      elementRef: 'test',
    };

    component.checkObject(item, dataError);
    expect(item.searchBoolean).toEqual(false);

    fixture.detectChanges();
    const item1 = {
      scheduleTimelineDescription: 'Continuous from screening to follow-up',
      scheduleTimelineId: 'STID004',
      scheduleTimelineName: 'Continuous during study',
      scheduleTimelineSoA: null,
      searchBoolean: true,
    };
    const dataError1 = {
      elementRef: 'test',
    };
    component.checkObject(item1, dataError1);
    expect(item1.searchBoolean).toEqual(true);

    fixture.detectChanges();
    const item2 = {
      scheduleTimelineDescription: 'Continuous from screening to follow-up',
      scheduleTimelineId: 'STID004',
      scheduleTimelineName: 'Continuous during study',
      scheduleTimelineSoA: {
        orderOfActivities: [],
      },
      searchBoolean: true,
    };
    const dataError2 = {
      elementRef: 'test',
    };
    component.checkObject(item2, dataError2);
    expect(item2.searchBoolean).toEqual(true);
  });

  it('check tooltip value', () => {
    const item = {
      encounterId: 'VIS15',
      encounterName: 'CYCLE 1, TREATMENT 1',
      encounterScheduledAtTimingValue: 'Day 1',
    };
    let tooltip = component.createTooltip('encounter', item);
    expect(tooltip).toEqual('CYCLE 1, TREATMENT 1(Day 1)');
    fixture.detectChanges();
    const item1 = {
      footnoteDescription: 'Name : Reason',
      footnoteId: 'P1',
      procedureDescription: 'Desc',
      procedureId: 'f4e2',
      procedureIsConditional: true,
      procedureIsConditionalReason: 'Reason',
      procedureName: 'Name',
    };
    tooltip = component.createTooltip('procedure', item1);
    expect(tooltip).toEqual('Name:Desc');
    fixture.detectChanges();
    const item3 = {
      encounterId: 'VIS154',
      encounterName: 'CYCLE 1',
      encounterScheduledAtTimingValue: '',
    };
    tooltip = component.createTooltip('encounter', item3);
    expect(tooltip).toEqual('CYCLE 1');
    fixture.detectChanges();
    const item4 = {
      footnoteDescription: 'Name : Reason',
      footnoteId: 'P1',
      procedureDescription: '',
      procedureId: 'f4e2',
      procedureIsConditional: true,
      procedureIsConditionalReason: 'Reason',
      procedureName: 'NameRevisit',
    };
    tooltip = component.createTooltip('procedure', item4);
    expect(tooltip).toEqual('NameRevisit');
  });
});
