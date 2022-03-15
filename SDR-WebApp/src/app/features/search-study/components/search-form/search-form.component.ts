import { Component, OnInit, TemplateRef  } from '@angular/core';
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
  bsModalRef?: BsModalRef;
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
        headerName: 'Sponsor ID',
        cellRenderer: this.getSponsorIdGrid.bind(this,'sponsor'),
      },
      {
        headerName: 'Tag',
        field: 'clinicalStudy.studyTag',
        tooltipField: 'clinicalStudy.studyTag',
        headerTooltip: 'Tag',
      },
      {
        headerName: 'Status',
        field: 'clinicalStudy.studyStatus',
        tooltipField: 'clinicalStudy.studyStatus',
        headerTooltip: 'Status',
      },
      {
        headerName: 'Indication',

        headerTooltip: 'Indication',
        valueGetter: this.getIndication,
      },
      {
        headerName: 'Intervention Model',
        // headerTooltip: 'Intervention Model',
        // valueGetter: this.getIntervention,
        cellRenderer: this.getSponsorIdGrid.bind(this,'intervention'),
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
   /*
  Getting value for intervention model 
  */
  getIntervention(params: any) {
    let val = '';
    if (
      params.data &&
      params?.data?.clinicalStudy?.studyDesigns &&
      params?.data?.clinicalStudy?.studyDesigns.length > 0 &&
      params?.data?.clinicalStudy?.studyDesigns[0].investigationalInterventions &&
      params?.data?.clinicalStudy?.studyDesigns[0].investigationalInterventions.length > 0
    ) {
      val = params?.data?.clinicalStudy?.studyDesigns[0].investigationalInterventions[0].interventionModel || '';
    }
    return val;
  }
   /*
  Getting value for study indication
  */
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
   /*
  Modal for multiple sponsor id and interventional model
  */
  openModal(val:any, type: any) {
   
    const initialState: ModalOptions = {
      initialState: {
        list: val,
        title: type === 'sponsor' ? 'Sponsor Id List' : 'Intervention Model List'
      }
    };
    this.bsModalRef = this.modalService.show(ModalComponentComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
 /*
  Getting value for sponsor id
  */
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
   /*
  Construct Study Version Grid
  */
  getStudyVersionGrid(params: any) {
    if (!params.data) {
      return '';
    } else {
      const eDiv = document.createElement('a');
      // tslint:disable-next-line:no-this-assignment
      const self = this;
      eDiv.innerHTML =
        '<span class="linkSpan">' +
        params.data?.clinicalStudy.studyTitle +
        '</span>';
      eDiv.addEventListener('click', () => {
        self.setSelectedValue(params.data);
      });

      return eDiv;
    }
  }
   /*
  Construct multiple values for sponsor id and interventional model 
  */
  getSponsorIdGrid(type: any,params: any) {
    if (!params.data) {
      return '';
    } else {
      if(type === 'sponsor'){
        var value = params.data.clinicalStudy.studyIdentifiers.filter(
          (obj: { [x: string]: string }) => {
            return obj['idType'] === configList.SPONSORKEY;
          }
        )
        
      }
      else{
        var value:any= [];

        if (
          params.data &&
          params?.data?.clinicalStudy?.studyDesigns &&
          params?.data?.clinicalStudy?.studyDesigns.length > 0
        ) {
          let studyDesigns = params?.data?.clinicalStudy?.studyDesigns;
          studyDesigns.forEach((element: any) => {
            if(element.investigationalInterventions && element.investigationalInterventions .length>0 ){
              element.investigationalInterventions.forEach((item: any) => {
                if(item.interventionModel &&  item.interventionModel!= ''){
                  value.push(item);
                }
                
              });
              
            }
          });
         
        }
        
      }
      if(value && value.length>1){
       var val = type === 'sponsor' ? value.map((elem: { orgCode: any; })=>{return elem.orgCode}) : value.map((elem: { interventionModel: any; })=>{return elem.interventionModel});
        val = [...new Set(val)];
      }
      if(val && val.length>1){
        const eDiv = document.createElement('a');
        // tslint:disable-next-line:no-this-assignment
        const self = this;
        var htmlTag =  '<span class="linkSpan"> ' + val[0] + '</span>';
        eDiv.innerHTML = htmlTag;
          eDiv.addEventListener('click', () => {
            self.openModal(val,type);
          });
        return eDiv
      } else {
        if(value && value.length>0){
          if(type === 'sponsor'){
            return value[0][configList.SPONSORID_KEY] || '';
          } else {
           return value[0].interventionModel || '';
          }
        } else {
          return '';
        }
        
        
      }
      
     
     
     

    }
  }
   /*
  Redirect to details page
  */
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
   
  }
  showGridUpdate(event: any) {
    if (event) {
      
      this.showStudyElement = false;
    }
  }
  /* istanbul ignore next */
// @SONAR_STOP@
 /*
  Validation to enable search button
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
 /*
 Validate date and fetch search results
  */
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
 /*
  On click of clear button clear search value
  */
  clearSearch() {  //nosonar
    this.editorForm.setValue({  //nosonar
      studyTitle: '',     //nosonar     //nosonar
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
 /*
 Get today's date
  */
  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
   /*
  Logic to form dropdowns for studyphase, intervention Model
  */
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
   /*
  Logic to restrict char on text key
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
