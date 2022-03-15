import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from '../../services/service-call/service-call.service';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss'],
})
/*
Audit Trail component 
*/
export class AuditTrailComponent implements OnInit {
  studyId: any;
  versionA: any;
  versionB: any;
  disableButton = true;
  showError = false;
  public overlayNoRowsTemplate = '<span></span>';
  columnDefs: ColDef[] = [
    {
      headerName: 'Date',
      field: 'entryDateTime',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'System',
      field: 'entrySystem',
      suppressSizeToFit: false,
      width: 170,
    },
    {
      headerName: '(SDR) Record Version',
      field: 'studyVersion',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'Tag',
      field: 'studyTag',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'Status',
      field: 'studyStatus',
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
    studyVersion: any;
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
    private _elementRef: ElementRef
  ) {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };
  }
  /*
get the studyId from study details page
*/
  ngOnInit(): void {
    var view = this;
    this.route.params.subscribe((params) => {
      this.versionA = '';
      this.versionB = '';
      this.disableButton = true;
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
      }
    });
    this.studyId = this.studyId
      ? this.studyId
      : localStorage.getItem('studyId');
    this.spinner.show();
    this.serviceCall.getAuditTrail(this.studyId).subscribe({
      next: (audit: any) => {
        //this.userExists = true;
        this.spinner.hide();

        this.studyId = audit.studyId;
        this.rowData = audit.auditTrail;
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
  /*
Logic to generate radio button html element for A column
*/
  generateCompareA(params: any) {
    const eDiv = document.createElement('div');
    const self = this;
    eDiv.innerHTML =
      '<label class="container-radio"><input type="radio" name="compareA" class="radioA ' +
      params.data?.studyVersion +
      'A"> <span class="checkmark"></span></label>';
    eDiv.addEventListener('click', () => {
      self.setRadio(params.data, 'A');
    });

    return eDiv;
  }
  /*
Logic to generate radio button html element for B column
*/
  generateCompareB(params: any) {
    const eDiv = document.createElement('div');
    const self = this;
    eDiv.innerHTML =
      '<label class="container-radio"><input type="radio"  name="compareB" class="radioB ' +
      params.data?.studyVersion +
      'B"><span class="checkmark"></span></label>';
    eDiv.addEventListener('click', () => {
      self.setRadio(params.data, 'B');
    });

    return eDiv;
  }
  /* istanbul ignore next */
  // @SONAR_STOP@
  /*
AG Grid initialization for Audit table
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
  /*
on selection of radio button, we disable the corresponding other radio button to revent using same version for comparison.
@Param selectedVal : radio button selected
@Param from : from which column button is selected
*/
  setRadio(selectedVal: any, from: string) {
    let disableField = from === 'A' ? 'B' : 'A';
    if (from == 'A') {
      this.versionA = selectedVal.studyVersion;
    } else {
      this.versionB = selectedVal.studyVersion;
    }
    let domElement = this._elementRef.nativeElement.getElementsByClassName(
      'radio' + disableField
    );
    for (var i = 0; i < domElement.length; i++) {
      domElement[i].removeAttribute('disabled');
    }
    if (
      this._elementRef.nativeElement.getElementsByClassName(
        selectedVal.studyVersion + disableField
      )[0]
    )
      this._elementRef.nativeElement
        .getElementsByClassName(selectedVal.studyVersion + disableField)[0]
        .setAttribute('disabled', true);
    //this.disableButton = ! (typeof(this.versionA) == 'number' && typeof(this.versionB) == 'number')
    this.disableButton = this.versionA === '' || this.versionB === '';
  }
 /*
on clcik of version compare this method will be triggered which will redirect to version compare page
*/
  versionCompare() {
    this.router.navigate(
      [
        'compare',
        {
          studyId: this.studyId,
          verA: this.versionA,
          verB: this.versionB,
        },
      ],
      { relativeTo: this.route }
    );
  }
}
