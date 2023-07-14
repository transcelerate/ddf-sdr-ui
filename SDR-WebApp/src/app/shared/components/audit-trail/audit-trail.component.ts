import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from '../../services/service-call/service-call.service';
import * as moment from 'moment';
import { StudyElementDescriptionComponent } from '../study-element-description/study-element-description.component';
@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss'],
})
/**
 *Audit Trail component
 */
export class AuditTrailComponent implements OnInit {
  studyId: any;
  versionA: any;
  versionB: any;
  disableButton = true;
  showError = false;
  studyVersion: any;
  usdmVerA: any;
  usdmVerB: any;
  public overlayNoRowsTemplate = '<span></span>';
  columnDefs: ColDef[] = [
    {
      headerName: 'Date',
      field: 'entryDateTime',
      suppressSizeToFit: false,
      width: 150,
    },

    {
      headerName: 'SDR Upload Version',
      field: 'SDRUploadVersion',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'Compare A',
      field: '',
      cellRenderer: this.generateCompareA.bind(this),
      suppressSizeToFit: false,
      width: 150,
      sortable: false,
    },
    {
      headerName: 'Compare B',
      field: '',
      cellRenderer: this.generateCompareB.bind(this),
      suppressSizeToFit: false,
      width: 156,
      sortable: false,
    },
    {
      headerName: 'studyId',
      field: '',
      hide: true,
    },
  ];

  rowData: {
    tag: string;
    status: string;
    entryDateTime: string;
    SDRUploadVersion: any;
  }[];
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: { sortable: boolean; resizable: boolean };
  icons = {
    sortAscending:
      '<img src="../../../../assets/Images/alpine-icons/asc.svg" class="imgStyle">',
    sortDescending:
      '<img src="../../../../assets/Images/alpine-icons/desc.svg" class="imgStyle">',
  };
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService,
    private _elementRef: ElementRef,
    private parentComponent: StudyElementDescriptionComponent
  ) {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };
    this.parentComponent.checkLocationPath(false);
  }
  /**
   *get the studyId from study details page
   */
  ngOnInit(): void {
    var view = this;
    this.route.params.subscribe((params) => {
      this.versionA = '';
      this.versionB = '';
      this.disableButton = true;
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
        this.studyVersion = params['studyVersion'];
      }
    });
    this.studyId = this.studyId
      ? this.studyId
      : localStorage.getItem('studyId');
    this.spinner.show();
    // this.serviceCall.getAuditTrailWithVersion(this.studyId, this.usdmVersion, this.getURL()).subscribe({
    this.serviceCall.getAuditTrail(this.studyId).subscribe({
      next: (audit: any) => {
        //this.userExists = true;
        this.spinner.hide();
        this.rowData = audit.revisionHistory.map((elem: any) => {
          elem.entryDateTime = moment
            .utc(elem.entryDateTime)
            .local()
            .format('YYYY-MM-DD HH:mm:ss');
          return elem;
        });
        this.studyId = audit.studyId;
      },
      error: (error) => {
        this.showError = true;
        this.rowData = [];
        this.spinner.hide();
        setTimeout(() => {
          Array.from(
            document.getElementsByClassName(
              'alert'
            ) as HTMLCollectionOf<HTMLElement>
          ).forEach((element) => {
            element.style.width = '95%';
          });
        }, 0);
      },
    });
  }

  /**
   *Logic to generate radio button html element for A column
   * @param params   ag grid value for each row with data.
   */
  generateCompareA(params: any) {
    const eDiv = document.createElement('div');
    const self = this;
    eDiv.innerHTML =
      '<label class="container-radio"><input type="radio" name="compareA" class="radioA ' +
      params.data?.SDRUploadVersion +
      'A"> <span class="checkmark"></span></label>';
    eDiv.addEventListener('click', () => {
      self.setRadio(params.data, 'A');
    });

    return eDiv;
  }
  /**
   *Logic to generate radio button html element for B column
   * @param params   ag grid value for each row with data.
   */
  generateCompareB(params: any) {
    const eDiv = document.createElement('div');
    const self = this;
    eDiv.innerHTML =
      '<label class="container-radio"><input type="radio"  name="compareB" class="radioB ' +
      params.data?.SDRUploadVersion +
      'B"><span class="checkmark"></span></label>';
    eDiv.addEventListener('click', () => {
      self.setRadio(params.data, 'B');
    });

    return eDiv;
  }
  /* istanbul ignore next */
  // @SONAR_STOP@
  /**
   *This method will be called on initialization of ag grid
   * @param params   ag grid value for each row with data.
   */
  onGridReady(params: {
    api: { sizeColumnsToFit: () => void };
    columnApi: any;
  }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    var defaultSortModel = [
      {
        colId: 'entryDateTime',
        sort: 'desc',
        sortIndex: 0,
      },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }
  /* istanbul ignore end */
  // @SONAR_START@
  /**
   *on selection of radio button, we disable the corresponding other radio button to revent using same version for comparison.
   *@param selectedVal : radio button selected
   *@param from : from which column button is selected
   */
  setRadio(selectedVal: any, from: string) {
    let disableField = from === 'A' ? 'B' : 'A';
    if (from == 'A') {
      this.versionA = selectedVal.SDRUploadVersion;
      this.usdmVerA = selectedVal.usdmVersion;
      localStorage.setItem(
        this.studyId + '_' + this.versionA + '_links',
        JSON.stringify(selectedVal.links)
      );
    } else {
      this.versionB = selectedVal.SDRUploadVersion;
      this.usdmVerB = selectedVal.usdmVersion;
      localStorage.setItem(
        this.studyId + '_' + this.versionB + '_links',
        JSON.stringify(selectedVal.links)
      );
    }
    let domElement = this._elementRef.nativeElement.getElementsByClassName(
      'radio' + disableField
    );
    for (var i = 0; i < domElement.length; i++) {
      domElement[i].removeAttribute('disabled');
    }
    if (
      this._elementRef.nativeElement.getElementsByClassName(
        selectedVal.SDRUploadVersion + disableField
      )[0]
    )
      this._elementRef.nativeElement
        .getElementsByClassName(selectedVal.SDRUploadVersion + disableField)[0]
        .setAttribute('disabled', true);
    //this.disableButton = ! (typeof(this.versionA) == 'number' && typeof(this.versionB) == 'number')
    this.disableButton = this.versionA === '' || this.versionB === '';
  }
  /**
   *on clcik of version compare this method will be triggered which will redirect to version compare page
   */
  versionCompare() {
    this.router.navigate(
      [
        'compare',
        {
          studyId: this.studyId,
          verA: this.versionA,
          verB: this.versionB,
          usdmVerA: this.usdmVerA,
          usdmVerB: this.usdmVerB,
        },
      ],
      { relativeTo: this.route }
    );
  }
}
