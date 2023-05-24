import { Component, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { ServiceCall } from '../../shared/services/service-call/service-call.service';
// import * as mockJson from './sample-data.json';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss'],
})
export class SoaComponent implements OnInit {
  @ViewChildren('tabset2') tabset2: any;
  studyId: any;
  versionId: any;
  tabs: any;
  selectedTab: boolean = false;
  usdmVersion: any;
  showError = false;
  bsModalRef?: BsModalRef;
  headerColumns = [
    {
      key: 'encounterName',
      label: 'Encounter (Planned Time)',
    },
    {
      key: 'timingValue',
      label: 'Timing',
    },
    {
      key: 'timingWindow',
      label: 'Window',
    },
    {
      key: 'activity',
      label: 'Activity',
    },
  ];
  activityFootnotes: any[] = [];
  procedureFootnotes: any[] = [];
  activeTab: any;
  activeNestedTab: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService,
    private commonMethods: CommonMethodsService,
    private modalService: BsModalService,
    private parentComponent: StudyElementDescriptionComponent
  ) {
    this.parentComponent.checkLocationPath(true);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        this.versionId = params['versionId'];
        this.usdmVersion = params['usdmVersion'];
      }
    });
    this.tabset2 = this.tabset2?.toArray();
    this.getSoADetails();
  }

  getSoADetails() {
    this.spinner.show();
    this.commonMethods.getStudyLink({
      studyId: this.studyId,
      version: this.versionId,
      linkName: configList.SOA_LINK,
      callback: (url: any) => this.getSoADetailsUsingLink(url),
      errorCallback: (err: any) => {
        this.showError = true;
        this.spinner.hide();
      },
    });
  }

  getSelectedTab(event?: any) {
    this.activityFootnotes = [];
    this.procedureFootnotes = [];

    if (event) {
      this.activeTab = event.id;
    } else {
      this.activeTab = this.tabs?.studyDesigns[0].studyDesignId;
    }

    this.tabset2?.toArray().forEach((eachStudyDesign: any) => {
      eachStudyDesign.tabs[0].active = true;
    });
    this.getSelectedNestedTab();
  }

  getSelectedNestedTab(event?: any) {
    this.activityFootnotes = [];
    this.procedureFootnotes = [];

    if (event) {
      let spl = event.id.split(this.activeTab + '_').pop();
      this.activeNestedTab = spl;
    } else {
      this.activeNestedTab =
        this.tabs?.studyDesigns[0].studyScheduleTimelines[0].scheduleTimelineId;
    }
    this.addFootnoteids();
  }

  getSoADetailsUsingLink(url: any): void {
    this.serviceCall.getSoAMatrix(this.usdmVersion, url).subscribe({
      next: (soa: any) => {
        this.spinner.hide();
        this.tabs = soa;
        this.getSelectedTab();
        // To-DO: Call binding logic here
      },
      error: (error) => {
        this.showError = true;
        this.spinner.hide();
      },
    });
  }

  addFootnoteids() {
    this.tabs?.studyDesigns?.forEach((eachStudyDesign: any) => {
      if (eachStudyDesign.studyDesignId === this.activeTab) {
        eachStudyDesign?.studyScheduleTimelines?.forEach(
          (eachTimeline: any) => {
            if (eachTimeline.scheduleTimelineId === this.activeNestedTab) {
              let activityIndex = 1;
              let procedureIndex = 1;

              eachTimeline?.scheduleTimelineSoA?.orderOfActivities?.forEach(
                (eachActivity: any) => {
                  if (eachActivity.activityIsConditional) {
                    eachActivity.footnoteId = 'A' + activityIndex;
                    activityIndex++;
                    let footNoteObj = {
                      footnoteId: '',
                      footnoteDescription: '',
                    };
                    footNoteObj.footnoteId = eachActivity.footnoteId;
                    footNoteObj.footnoteDescription =
                      eachActivity.footnoteDescription;
                    this.activityFootnotes.push(footNoteObj);
                  }

                  eachActivity?.definedProcedures?.forEach(
                    (eachProcedure: any) => {
                      if (eachProcedure.procedureIsConditional) {
                        eachProcedure.footnoteId = 'P' + procedureIndex;
                        procedureIndex++;
                        let footNoteObj = {
                          footnoteId: '',
                          footnoteDescription: '',
                        };
                        footNoteObj.footnoteId = eachProcedure.footnoteId;
                        footNoteObj.footnoteDescription =
                          eachProcedure.footnoteDescription;
                        this.procedureFootnotes.push(footNoteObj);
                      }
                    }
                  );
                }
              );
            }
          }
        );
      }
    });
  }

  // for the present data no duplicate data will be found so fn is nt executed but kept for ref.
  findDuplicate(
    index: number,
    eachActivity: string,
    activitiesArray: string[]
  ) {
    return activitiesArray.find((checkColor, checkIndex) => {
      let isDuplicate = checkIndex != index && eachActivity == checkColor;
      return isDuplicate;
    });
  }

  redirectToTimeline(timelineId: any) {
    this.tabset2.forEach((eachStudyDesign: any) => {
      eachStudyDesign.tabs.forEach((eachTimeline: any) => {
        if (eachTimeline.id === timelineId) {
          eachTimeline.active = true;
        }
      });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

  createTooltip(encounter: any) {
    let tooltipString = '';
    if (encounter.encounterName && encounter.encounterScheduledAtTimingValue) {
      tooltipString =
        encounter.encounterName +
        '(' +
        encounter.encounterScheduledAtTimingValue +
        ')';
    } else {
      tooltipString = encounter.encounterName;
    }
    return tooltipString;
  }
}
