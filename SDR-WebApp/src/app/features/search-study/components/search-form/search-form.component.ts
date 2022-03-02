import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import * as moment from 'moment';
import { ServiceCall } from '../../../../shared/services/service-call/service-call.service';
import { DialogService } from 'src/app/shared/services/communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMethodsService } from '../../../../shared/services/common-methods.service';
import { Router, ActivatedRoute } from '@angular/router';
import { configList } from '../../../../shared/components/study-element-description/config/study-element-field-config';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  editorForm: FormGroup;
  dropDownValues: { studyPhase: string[]; interventionModel: string[] };
  today: any;
  phaseList: any;
  phaseDropDown: string[];
  interventionDropDown: string[];
  interventionList: any;

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
  showGrid: boolean;
  icons: { sortAscending: string; sortDescending: string };
  studyId: any;
  versionId: any;
  showStudyElement: boolean;
  noRowsTemplate: string;
  showError = false;
  // _formBuilder: FormBuilder = new FormBuilder();
  constructor(
    public _formBuilder: FormBuilder,
    public serviceCall: ServiceCall,
    private ds: DialogService,
    private spinner: NgxSpinnerService,
    private commonMethod: CommonMethodsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.noRowsTemplate = '<span>No Study Matches the search keywords</span>';
    this.editorForm = this._formBuilder.group(
      {
        studyTitle: [''],
        briefTitle: [''],
        interventionModel: [''],
        fromDate: [''],
        studyId: [''],
        phase: [''],
        indication: [''],
        toDate: [''],
      },
      { validators: this.atLeastOneValidator }
    );

    this.columnDefs = [
      {
        headerName: 'Study Title',
        field: 'clinicalStudy.studyTitle',
        tooltipField: 'clinicalStudy.studyTitle',
        headerTooltip: 'Study Title',
        cellRenderer: this.getStudyVersionGrid.bind(this),
      },
      {
        headerName: 'Brief Title',
        field: 'clinicalStudy.studyProtocol.briefTitle',
        tooltipField: 'clinicalStudy.studyProtocol.briefTitle',
        headerTooltip: 'Brief Title',
      },
      // {
      //   headerName: 'Study ID',
      //   field:'clinicalStudy.studyId',
      //   tooltipField: 'clinicalStudy.studyId',
      //   headerTooltip: 'Study ID'
      // },
      {
        headerName: 'Sponsor ID',
        valueGetter: this.getSponsorId,
      },
      {
        headerName: 'Tag',
        field: 'clinicalStudy.tag',
        tooltipField: 'clinicalStudy.tag',
        headerTooltip: 'Tag',
      },
      {
        headerName: 'Status',
        field: 'clinicalStudy.status',
        tooltipField: 'clinicalStudy.status',
        headerTooltip: 'Status',
      },
      {
        headerName: 'Indication',

        headerTooltip: 'Indication',
        valueGetter: this.getIndication,
      },
      {
        headerName: 'Intervention Model',
        field: 'clinicalStudy.interventionModel',
        tooltipField: 'clinicalStudy.interventionModel',
        headerTooltip: 'Intervention Model',
      },
      {
        headerName: 'Phase',
        field: 'clinicalStudy.studyPhase',
        tooltipField: 'clinicalStudy.studyPhase',
        headerTooltip: 'Phase',
      },
      {
        headerName: 'Last Modified Date',
        field: 'auditTrail.entryDateTime',
        tooltipField: 'auditTrail.entryDateTime',
        headerTooltip: 'Last Modified Date',
      },
      {
        headerName: 'Last Modified by System',
        field: 'auditTrail.entrySystem',
        tooltipField: 'auditTrail.entrySystem',
        headerTooltip: 'Last Modified by System',
      },
      {
        headerName: 'SDR Version',
        field: 'auditTrail.studyVersion',
        tooltipField: 'auditTrail.studyVersion',
        headerTooltip: 'SDR Version',
      },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };
    (this.icons = {
      sortAscending:
        '<img src="../../../../assets/Images/alpine-icons/asc.svg" class="imgStyle">',
      sortDescending:
        '<img src="../../../../assets/Images/alpine-icons/desc.svg" class="imgStyle">',
    }),
      (this.rowBuffer = 0);
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.cacheBlockSize = this.BLOCK_SIZE;
    this.cacheOverflowSize = 1;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 1000;
  }
  getIndication(params: any) {
    let val = '';
    if (
      params.data &&
      params?.data?.clinicalStudy?.studyIndications &&
      params?.data?.clinicalStudy?.studyIndications.length > 0
    ) {
      val = params?.data?.clinicalStudy?.studyIndications[0].description || '';
    }
    return val;
  }
  getSponsorId(params: any) {
    if (params.data) {
      let value = params.data.clinicalStudy.studyIdentifiers.filter(
        (obj: { [x: string]: string }) => {
          return obj['idType'] === configList.SPONSORKEY;
        }
      )
      if(value.length>0){
        return value[0][configList.SPONSORID_KEY];
      } else {
        return '';
      }
    }
  }
  getStudyVersionGrid(params: any) {
    if (!params.data) {
      return '';
    } else {
      console.log(params);
      const eDiv = document.createElement('a');
      // tslint:disable-next-line:no-this-assignment
      const self = this;
      eDiv.innerHTML =
        '<span class="linkSpan">' +
        params.data?.clinicalStudy.studyTitle +
        '</span>';
      // '<span class="linkSpan"><a>Study ' +
      // params.data?.studyId +
      // '&nbsp;<span> Version ' +
      // params.data?.version +
      // '</span> </a></span> <br><div class="studyTitleContent">' +
      // params.data?.studyTitle +
      // '</div>';
      eDiv.addEventListener('click', () => {
        console.log('button clicked');
        self.setSelectedValue(params.data);
      });

      return eDiv;
    }
  }
  setSelectedValue(val: any) {
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
  showGridUpdate(event: any) {
    if (event) {
      // this._elementRef.nativeElement.querySelector('#myGrid').style.display =
      //   'block';
      this.showStudyElement = false;
    }
  }
  /* istanbul ignore next */
// @SONAR_STOP@
  public atLeastOneValidator: any = (control: FormGroup): any => {
    let controls = control.controls;
    console.log(controls);
    if (controls) {
      let theOne = Object.keys(controls).findIndex(
        (key) => controls[key].value !== ''
      );
      if (theOne === -1) {
        console.log(theOne);
        return {
          atLeastOneRequired: {
            text: 'At least one should be selected',
          },
        };
      }
    }
  };
  /* istanbul ignore end */
// @SONAR_START@
  submitSearch() {
    if (this.editorForm?.value?.fromDate && this.editorForm?.value?.toDate) {
      const fromDate = new Date(this.editorForm.value.fromDate);
      const toDate = new Date(this.editorForm.value.toDate);

      if (fromDate && toDate && fromDate > toDate) {
        alert('FromDate is greater than toDate...');
        return;
      }
    }
    if (this.showGrid) {
      const reqObj = this.editorForm.value;
      this.commonMethod.gridDataSourceForSearchStudy(
        reqObj,
        this.gridApi,
        this.BLOCK_SIZE,
        this
      );
    }
    this.showGrid = true;
  }
  /* istanbul ignore next */

  clearSearch() {  //nosonar
    this.editorForm.setValue({  //nosonar
      studyTitle: '',     //nosonar
      briefTitle: '',      //nosonar
      interventionModel: '',   //nosonar
      fromDate: '',      //nosonar
      studyId: '',      //nosonar
      phase: '',        //nosonar
      indication: '',    //nosonar
      toDate: '',        //nosonar
    });             //nosonar
    this.showGrid = false;     //nosonar
  }         //nosonar
  /* istanbul ignore end */

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.ds.changeDialogState('Search Study Definitions');
    this.dropDownValues = this.serviceCall.readConfigFile();
    this.phaseDropDown = this.phaseList = this.dropDownValues.studyPhase;
    this.phaseList = this.editorForm.valueChanges?.pipe(
      startWith(''),
      map((value) => this._filter(value, 'phase', this.phaseDropDown))
    );
    this.interventionDropDown = this.dropDownValues.interventionModel;
    this.interventionList = this.editorForm.valueChanges?.pipe(
      startWith(''),
      map((value) =>
        this._filter(value, 'interventionModel', this.interventionDropDown)
      )
    );
  }
  ngAfterViewInit() {
    this.editorForm.patchValue({
      studyTitle: '',
    });
  }
  public _filter(value: any, type: string, arrayValue: any) {
    const filterValue = value[type]?.toLowerCase();

    return arrayValue.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  restrictChar(event: {
    charCode: number;
    which: number;
    preventDefault: () => void;
  }) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      k == 46 ||
      (k >= 48 && k <= 57)
    );
  }
  onServerFailCallback = (params: any) => {
    console.error('onServerFailCallback', params);
  };
  /* istanbul ignore next */
// @SONAR_STOP@
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    var defaultSortModel = [
      {
        colId: 'auditTrail.entryDateTime',
        sort: 'desc',
        sortIndex: 0,
      },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
    const reqObj = this.editorForm.value;
    reqObj.asc = false;
    reqObj.header = 'entryDateTime';

    this.commonMethod.gridDataSourceForSearchStudy(
      reqObj,
      this.gridApi,
      this.BLOCK_SIZE,
      this
    );

    this.gridApi.addEventListener('failCallback', this.onServerFailCallback);
  }
  /* istanbul ignore end */
// @SONAR_START@
}
