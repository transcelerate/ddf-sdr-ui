import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
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
import { ModalComponentComponent } from 'src/app/shared/components/modal-component/modal-component.component';
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
  usdmVersionList: any;
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
  public tooltipShowDelay = 0;
  BLOCK_SIZE: number = configList.BLOCK_SIZE;
  showGrid: boolean;
  icons: { sortAscending: string; sortDescending: string };
  studyId: any;
  versionId: any;
  showStudyElement: boolean;
  noRowsTemplate: string;
  showError = false;
  bsModalRef?: BsModalRef;
  enableSearch: boolean = false;
  enableSearchMessage = configList.ENABLE_SEARCH_MESSAGE;
  // _formBuilder: FormBuilder = new FormBuilder();
  constructor(
    public _formBuilder: FormBuilder,
    public serviceCall: ServiceCall,
    private ds: DialogService,
    private spinner: NgxSpinnerService,
    private commonMethod: CommonMethodsService,
    public router: Router,
    public route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.noRowsTemplate = '<span>No Study Matches the search keywords</span>';
    this.editorForm = this._formBuilder.group(
      {
        studyTitle: [''],
        interventionModel: [''],
        fromDate: [''],
        sponsorId: [''],
        phase: [''],
        indication: [''],
        toDate: [''],
        usdmVersion: [''],
      },
      { validators: this.atLeastOneValidator }
    );

    this.columnDefs = [
      {
        headerName: 'Study Title',
        field: 'study.studyTitle',
        tooltipField: 'study.studyTitle',
        headerTooltip: configList.STUDY_TITLE,
        cellRenderer: this.getStudyVersionGrid.bind(this),
      },
      {
        headerName: 'Sponsor ID',
        cellRenderer: this.commonMethod.getSponsorIdGrid.bind(this, 'sponsor'),
        headerTooltip: configList.SPONSOR_ID,
      },
      {
        headerName: 'SDR Upload Version',
        field: 'auditTrail.SDRUploadVersion',
        tooltipField: 'auditTrail.SDRUploadVersion',
        headerTooltip: configList.SDR_UPLOAD_VERSION,
      },
      {
        headerName: 'Last Modified Date',
        field: 'auditTrail.entryDateTime',
        tooltipField: 'auditTrail.entryDateTime',
        headerTooltip: configList.LAST_MODIFIED_DATE,
      },

      // {
      //   headerName: 'Tag',
      //   field: 'study.studyTag',
      //   tooltipField: 'study.studyTag',
      //   headerTooltip: configList.TAG,
      // },
      // {
      //   headerName: 'Status',
      //   field: 'study.studyStatus',
      //   tooltipField: 'study.studyStatus',
      //   headerTooltip: configList.STATUS,
      // },
      {
        headerName: 'Indication',

        headerTooltip: configList.INDICATION,
        cellRenderer: this.commonMethod.getSponsorIdGrid.bind(
          this,
          'indication'
        ),
      },
      {
        headerName: 'Intervention Model',
        // headerTooltip: 'Intervention Model',
        // valueGetter: this.getIntervention,
        cellRenderer: this.commonMethod.getSponsorIdGrid.bind(
          this,
          'intervention'
        ),
        headerTooltip: configList.INTERVENTION,
      },
      {
        headerName: 'Phase',
        field: 'study.studyPhase.decode',
        tooltipField: 'study.studyPhase.decode',
        headerTooltip: configList.PHASE,
      },
      {
        headerName: 'USDM Version',
        field: 'auditTrail.usdmVersion',
        tooltipField: 'auditTrail.usdmVersion',
        headerTooltip: configList.USDM_VERSION,
        sortable: false,
      },
      // {
      //   headerName: 'Last Modified by System',
      //   field: 'auditTrail.entrySystem',
      //   tooltipField: 'auditTrail.entrySystem',
      //   headerTooltip: configList.LAST_MODIFIED_SYSTEM,
      // },
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

  /**
   * Modal for multiple sponsor id and interventional model
   * @param val   ag grid value of that particular row for which link is clicked.
   * @param type  Denotes for which value is the link clicked either for sponsor id or interventional model.
   */
  openModal(val: any, type: any) {
    let title;
    switch (type) {
      case 'sponsor':
        title = 'Sponsor Id List';
        break;
      case 'indication':
        title = 'Indication List';
        break;
      case 'intervention':
        title = 'Intervention Model List';
        break;
    }
    const initialState: ModalOptions = {
      initialState: {
        list: val,
        title: title,
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalComponentComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  /**
   * Construct Study Version Grid
   * @param params   ag grid value for each row with data.
   * @returns Return Html Link tag.
   */
  getStudyVersionGrid(params: any) {
    if (!params.data) {
      return '';
    } else {
      const eDiv = document.createElement('a');
      // tslint:disable-next-line:no-this-assignment
      const self = this;
      eDiv.innerHTML =
        '<span class="linkSpan">' + params.data?.study.studyTitle + '</span>';
      eDiv.addEventListener('click', () => {
        self.setSelectedValue(params.data);
      });

      return eDiv;
    }
  }

  /**
   * Redirect to details page on click of Study Title link
   * @param val   ag grid value of that particular row for which link is clicked.
   */
  setSelectedValue(val: any) {
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

  /* istanbul ignore next */
  // @SONAR_STOP@
  /**
   *  Validation to enable search button
   * @param control Formgroup object
   */
  public atLeastOneValidator: any = (control: FormGroup): any => {
    let controls = control.controls;
    if (controls) {
      let theOne = Object.keys(controls).findIndex(
        (key) => controls[key].value !== ''
      );
      if (theOne === -1) {
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
  /**
   *Validate date and fetch search results
   */
  submitSearch() {
    if (this.editorForm?.value?.fromDate && this.editorForm?.value?.toDate) {
      const fromDate = new Date(this.editorForm.value.fromDate);
      const toDate = new Date(this.editorForm.value.toDate);

      if (fromDate && toDate && fromDate > toDate) {
        alert('To Date must be greater than From Date');
        return;
      }
    }
    if (this.showGrid && this.editorForm.valid && this.enableSearch) {
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
  /**
   * On click of clear button clear search value
   */
  clearSearch() {
    //nosonar
    this.editorForm.setValue({
      //nosonar
      studyTitle: '', //nosonar     //nosonar
      interventionModel: '', //nosonar
      fromDate: '', //nosonar
      sponsorId: '', //nosonar
      phase: '', //nosonar
      indication: '', //nosonar
      toDate: '', //nosonar
      usdmVersion: '', //nosonar
    }); //nosonar
    this.showGrid = false; //nosonar
    this.enableSearch = false;
  } //nosonar
  /* istanbul ignore end */
  /**
   * Get today's date
   */
  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  /**
   *  Logic to form dropdowns for studyphase, intervention Model
   */
  ngOnInit(): void {
    var versions = localStorage.getItem('versions');
    if (versions) {
      this.usdmVersionList = JSON.parse(versions);
    }
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
  /**
   *  Logic to form dropdowns for studyphase, intervention Model
   */
  ngAfterViewInit() {
    this.editorForm.patchValue({
      studyTitle: '',
    });
  }
  /**
   *  Filter logic to show relevant value in the drop down as user types
   *  @param value Value typed in the textfield.
   *  @param type Denotes which type Phase or intervention model.
   *  @param arrayValue List of all values for the type.
   *  @return Return filtered array value which match the keywords typed in textfield.
   */
  public _filter(value: any, type: string, arrayValue: any) {
    if (value) {
      const filterValue = value[type]?.toLowerCase();
      return arrayValue.filter((option: string) =>
        option.toLowerCase().includes(filterValue)
      );
    } else {
      return arrayValue;
    }
  }
  /**
   *  Logic to restrict special char on typing
   *  @param event Keyboard event on typing.
   */
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
  /**
   *  Method is called on ag grid server rendering failure
   *  @param params ag grid value for each row with data.
   */
  onServerFailCallback = (params: any) => {
    console.error('onServerFailCallback', params);
  };
  /* istanbul ignore next */
  // @SONAR_STOP@
  /**
   *  This method is triggered on ag grid initialization.
   *  @param params ag grid value for each row with data.
   */
  onGridReady(params: any) {
    this.showGrid = false;
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
    if (this.editorForm.valid && this.enableSearch) {
      this.commonMethod.gridDataSourceForSearchStudy(
        reqObj,
        this.gridApi,
        this.BLOCK_SIZE,
        this
      );
      this.showGrid = true;
    }
    this.gridApi.addEventListener('failCallback', this.onServerFailCallback);
  }
  /* istanbul ignore end */
  // @SONAR_START@

  checkValidations() {
    var isValidform = false;
    Object.keys(this.editorForm.controls).forEach((key: string) => {
      const abstractControl = this.editorForm.get(key);
      if (key !== 'usdmVersion') {
        if (abstractControl?.value !== '') {
          isValidform = true;
          return;
        }
      }
    });

    if (this.editorForm.value.usdmVersion && isValidform) {
      this.enableSearch = true;
    } else {
      this.enableSearch = false;
    }
  }
}
