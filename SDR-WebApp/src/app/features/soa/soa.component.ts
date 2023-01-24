import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { ServiceCall } from '../../shared/services/service-call/service-call.service';
// import { tabs } from './sample-data';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';

@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss'],
})
export class SoaComponent implements OnInit {
  studyId: any;
  versionId: any;
  tabs: any;
  selectedTab: boolean = false;
  activeStudyDesignId: string = 'SD01';
  activeWorkFlowId: string = 'WF01';
  usdmVersion: any;
  showError = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService,
    private commonMethods: CommonMethodsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        this.versionId = params['versionId'];
        this.usdmVersion = params['usdmVersion'];
      }
    });

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

  getStudyDesignData(tab: any) {
    this.activeStudyDesignId = tab.studyDesignId;
  }

  getWorkFlowData(item: any) {
    this.activeWorkFlowId = item.workFlowId;
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
}
