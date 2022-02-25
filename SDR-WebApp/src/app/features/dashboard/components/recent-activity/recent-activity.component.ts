import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IGetRowsParams } from 'ag-grid';
import * as moment from 'moment';
import { configList } from '../../../../shared/components/study-element-description/config/study-element-field-config';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ServiceCall } from '../../../../shared/services/service-call/service-call.service';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { DialogService } from '../../../../shared/services/communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from '../../../../shared/services/common-methods.service';
import { environment } from 'src/environments/environment';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent {
  public gridApi: any;
  public gridColumnApi: any;

  public columnDefs;
  public defaultColDef;
  public rowBuffer: any;
  public rowSelection;
  public rowModelType;
  public cacheBlockSize;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;
  public maxBlocksInCache;
  public rowData: any;
  public value: any = [];
  BLOCK_SIZE: number = configList.BLOCK_SIZE;
  @ViewChild(MenuComponent) menu: MenuComponent;
  studyId: any;
  versionId: any;
  private readonly _destroying$ = new Subject<void>();
  showStudyElement: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private ref: ChangeDetectorRef,
    public serviceCall: ServiceCall,
    private ds: DialogService,
    private _elementRef: ElementRef,
    private commonMethod: CommonMethodsService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.columnDefs = [
      {
        headerName: 'Recent Activity',
        width: 500,
        //valueGetter: this.gridValueMerge,
        cellRenderer: this.getStudyVersionGrid.bind(this),
        tooltipField: 'studyTitle',
      },
      {
        headerName: 'Last Modified Date',
        field: 'auditTrail.entryDateTime',
        width: 100,
      },
    ];

    this.defaultColDef = {
      resizable: true,
    };

    this.rowBuffer = 0;
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.cacheBlockSize = this.BLOCK_SIZE;
    this.cacheOverflowSize = 1;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 1000;
  }
  ngOnInit() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: any) => {
        // Do something with event payload here
        console.log(result);

        if (result?.payload?.accessToken){
          localStorage.setItem('token', result?.payload?.accessToken);
          localStorage.setItem('homeAccountId', result?.payload?.account?.homeAccountId);
        }

      });
    this.ds.changeDialogState('Home');
  }
  getStudyVersionGrid(params: any) {
    if (!params.data) {
      return '';
    } else {
      console.log(params);
      const eDiv = document.createElement('div');
      // tslint:disable-next-line:no-this-assignment
      const self = this;
      eDiv.innerHTML =
        '<span class="linkSpan"><a>' +
        params.data?.clinicalStudy.studyTitle +
        '&nbsp;<span>_Version ' +
        params.data?.auditTrail.studyVersion +
        '</span> </a></span>';
      eDiv.addEventListener('click', () => {
        self.setSelectedValue(params.data);
      });

      return eDiv;
    }
  }
  setSelectedValue(val: any) {
    this.showStudyElement = true;
    this.router.navigate(
      [
        'details',
        {
          studyId: val.clinicalStudy.studyId,
          versionId: val.auditTrail.studyVersion,
        },
      ],
      { relativeTo: this.route }
    );

    // this._elementRef.nativeElement.querySelector('#myGrid').style.display =
    //   'none';
  }
  showGrid(event: any) {
    if (event) {
      // this._elementRef.nativeElement.querySelector('#myGrid').style.display =
      //   'block';
      this.showStudyElement = false;
    }
  }
  ngAfterViewInit() {
    //this.ds.setStatus(true);
    this.showStudyElement = false;
  }
  gridValueMerge(params: any) {
    if (params && params.data) {
      return {
        studyId: params.data.studyId,
        version: params.data.version || 'NA',
        studyTitle: params.data.studyTitle,
      };
    } else {
      return '';
    }
  }
/* istanbul ignore next */
  onGridReady(params: any) {  //NOSONAR
    this.gridApi = params.api;  //NOSONAR
    this.gridColumnApi = params.columnApi;  //NOSONAR
    params.api.sizeColumnsToFit();  //NOSONAR
    let reqObj = {  //NOSONAR
      fromDate: moment().subtract(30, 'days'),  //NOSONAR
      toDate: moment(),  //NOSONAR
    };  //NOSONAR
    this.commonMethod.gridDataSourceForSearchStudy(  //NOSONAR
      reqObj,  //NOSONAR
      this.gridApi,  //NOSONAR
      this.BLOCK_SIZE  //NOSONAR
    );  //NOSONAR
  }  //NOSONAR
  /* istanbul ignore end */
}
