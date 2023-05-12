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

  getSoADetailsUsingLink(url: any): void {
    this.serviceCall.getSoAMatrix(this.usdmVersion, url).subscribe({
      next: (soa: any) => {
        this.spinner.hide();
        this.tabs = soa;
        // To-DO: Call binding logic here
      },
      error: (error) => {
        this.showError = true;
        this.spinner.hide();
      },
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
