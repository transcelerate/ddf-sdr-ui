import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from '../../shared/services/service-call/service-call.service';
import { tabs } from './sample-data';
@Component({
  selector: 'app-soa',
  templateUrl: './soa.component.html',
  styleUrls: ['./soa.component.scss'],
})
export class SoaComponent implements OnInit {
  studyId: any;
  versionId: any;
  usdmVersion: string;
  tabs = tabs;
  selectedTab: boolean = false;
  activeStudyDesignId: string = 'SD01';
  activeWorkFlowId: string = 'WF01';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        this.versionId = params['versionId'];
        this.usdmVersion = params['usdmVersion'];
      }
    });
  }

  getStudyDesignData(tab: any) {
    this.activeStudyDesignId = tab.studyDesignId;
  }

  getWorkFlowData(item: any) {
    this.activeWorkFlowId = item.workFlowId;
  }
}
