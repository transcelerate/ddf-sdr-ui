import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { configList } from '../../../../shared/components/study-element-description/config/study-element-field-config';
import { filter, Subject, takeUntil } from 'rxjs';
import { ServiceCall } from '../../../../shared/services/service-call/service-call.service';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { DialogService } from '../../../../shared/services/communication.service';
import { CommonMethodsService } from '../../../../shared/services/common-methods.service';
import { MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  showError = false;
  constructor(
    public serviceCall: ServiceCall,
    private ds: DialogService,
    private commonMethod: CommonMethodsService,
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
        headerName: 'Last Modified',
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
  /**
   * Called on initialization of component
   * To get 'homeAccountId' after login for silent logout
   */
  ngOnInit() {
    if (!environment.bypassAuth) {
      this.msalBroadcastService.msalSubject$
        .pipe(
          filter(
            (msg: EventMessage) =>
              msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
          ),
          takeUntil(this._destroying$)
        )
        .subscribe((result: any) => {
          if (result?.payload?.accessToken) {
            localStorage.setItem('token', result?.payload?.accessToken);
            localStorage.setItem(
              'homeAccountId',
              result?.payload?.account?.homeAccountId
            );
            let isAdmin: any =
              result?.payload?.account?.idTokenClaims?.roles?.indexOf(
                'org.admin'
              ) >= 0;
            localStorage.setItem('isAdmin', isAdmin);
            this.getVersions();
          }
          this.ds.changeDialogState('Home');
        });
    } else {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('token', 'DUMMY_TOKEN');
      localStorage.setItem('homeAccountId', 'DUMMY_ACCOUNT_ID');
      this.getVersions();
      this.ds.changeDialogState('Home');
    }
  }

  /**
   *Logic to form Studytitle with version as link
   *This method will be called for each row from ag grid
   * @param params   ag grid value for each row with data.
   * @returns Return Html Link tag.
   */
  getStudyVersionGrid(params: any) {
    if (!params.data) {
      return '';
    } else {
      const eDiv = document.createElement('div');
      // tslint:disable-next-line:no-this-assignment
      const self = this;

      eDiv.innerHTML =
        '<span class="linkSpan"><a>' +
        params.data?.study.studyTitle +
        '&nbsp;<span>_Version ' +
        params.data?.auditTrail.SDRUploadVersion +
        '</span> </a></span>';
      eDiv.addEventListener('click', () => {
        self.setSelectedValue(params.data);
      });

      return eDiv;
    }
  }

  /**
   *Gets trriggered on click of eack link in Recent activity widget row.
   *Redirect to details page on click of link.
   * @param val  study value for the selected row.
   */
  setSelectedValue(val: any) {
    this.showStudyElement = true;
    localStorage.setItem(
      val.study.studyId + '_' + val.auditTrail.SDRUploadVersion + '_links',
      JSON.stringify(val.links)
    );
    this.router.navigate(
      [
        'details',
        {
          studyId: val.study.studyId,
          versionId: val.auditTrail.SDRUploadVersion,
          usdmVersion: val.auditTrail.usdmVersion,
        },
      ],
      { relativeTo: this.route }
    );
  }

  /** istanbul ignore next */
  /**
   *This method will be called on initialization of ag grid
   * @param params   ag grid value for each row with data.
   */
  onGridReady(params: any) {
    //NOSONAR

    this.gridColumnApi = params.columnApi; //NOSONAR
    if (params.api) {
      this.gridApi = params.api; //NOSONAR
      params.api?.sizeColumnsToFit(); //NOSONAR
    }

    let reqObj = {
      //NOSONAR
      fromDate: moment().subtract(30, 'days'), //NOSONAR
      toDate: moment(), //NOSONAR
      validateUsdmVersion: false,
    }; //NOSONAR
    this.commonMethod.gridDataSourceForSearchStudy(
      //NOSONAR
      reqObj, //NOSONAR
      this.gridApi, //NOSONAR
      this.BLOCK_SIZE,
      this //NOSONAR
    ); //NOSONAR
  } //NOSONAR
  /** istanbul ignore end */

  getVersions(): void {
    this.serviceCall.getVersions().subscribe({
      next: (versionsObj: any) => {
        localStorage.setItem(
          'versions',
          JSON.stringify(versionsObj.SDRVersions)
        );
      },
      error: (error) => {
        this.showError = true;
      },
    });
  }
}
