import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/shared/services/communication.service';
import { groupConfigList } from './group-management-config';
import { Group, GroupFilter } from './group.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckboxRenderer } from './checkbox-renderer.component';
import {
  CellClassParams,
  ColDef,
  GridOptions,
  RowSpanParams,
} from 'ag-grid-community';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  public gridOptions: GridOptions;
  permissionList: string[];
  group = new Group();
  groupList = new GroupFilter();
  filterFieldList: string[];
  isSearchSelected: any = undefined;
  filterFieldValueList: any;
  modalRef?: BsModalRef;
  content: string = '';
  showContent: boolean;
  searchList: any = [];
  noRowsTemplate: string;
  public gridApi: any;
  public gridColumnApi: any;

  public columnDefs: any;
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
  public isRowSelectable: any;
  BLOCK_SIZE: number = configList.BLOCK_SIZE;
  showGrid: boolean;
  icons: { sortAscending: string; sortDescending: string };
  editorForm: FormGroup;
  constructor(
    public _formBuilder: FormBuilder,
    private ds: DialogService,
    private modalService: BsModalService,
    private commonMethod: CommonMethodsService
  ) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
    };
    this.gridOptions.columnDefs = [
      {
        cellRendererFramework: CheckboxRenderer,
        width: 10,
      },
      {
        headerName: 'Study Title',
        field: 'clinicalStudy.studyTitle',
        checkboxSelection: true,
        tooltipField: 'clinicalStudy.studyTitle',
        headerTooltip: configList.STUDY_TITLE,
        cellRenderer: this.getStudyVersionGrid.bind(this),
      },

      // {
      //   headerName: 'SDR Upload Version',
      //   field: 'auditTrail.studyVersion',
      //   tooltipField: 'auditTrail.studyVersion',
      //   headerTooltip: configList.SDR_UPLOAD_VERSION,
      // },

      {
        headerName: 'Tag',
        field: 'clinicalStudy.studyTag',
        tooltipField: 'clinicalStudy.studyTag',
        headerTooltip: configList.TAG,
      },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      checkboxSelection: true,
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
    this.gridOptions.context = {
      componentParent: this,
    };
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
  }

  ngOnInit(): void {
    this.ds.changeDialogState('Group Management');
    this.permissionList = groupConfigList.PERMISSIONLIST;
    this.filterFieldList = groupConfigList.FILTER_FIELD;
    // groupConfigList.FILTER_FIELD.forEach((field) => {
    //   let groupList = new GroupFilter();
    //   groupList.groupFieldName = field;
    //   this.group.groupFilter.push(groupList);
    // });
  }
  filterFieldSelected() {
    this.isSearchSelected =
      this.groupList.groupFieldName.toLowerCase() === 'search';
    if (!this.isSearchSelected) {
      // let key = Object.keys(this.groupList.groupFieldName.replace(/\s/g, '').toUpperCase());
      this.filterFieldValueList =
        groupConfigList[
          this.groupList.groupFieldName
            .replace(/\s/g, '')
            .toUpperCase() as keyof typeof groupConfigList
        ];
    }
  }
  updateChecked(option: string, $event: any) {
    debugger;
    if (!this.groupList.groupFilterValues.includes(option)) {
      //checking weather array contain the id
      this.groupList.groupFilterValues.push(option); //adding to array because value doesnt exists
    } else {
      this.groupList.groupFilterValues.splice(
        this.groupList.groupFilterValues.indexOf(option),
        1
      ); //deleting
    }
  }
  addRule() {
    if (this.isSearchSelected === true) {
      let groupFilterValues: any = [];
      this.searchList.forEach((element: { studyId: any }) => {
        groupFilterValues.push(element.studyId);
      });
      let searchObj = {
        groupFieldName: 'search',
        groupFilterValues: groupFilterValues,
      };
      this.group.groupFilter.push(searchObj);
    } else {
      this.group.groupFilter.push(this.groupList);
    }

    this.showContent = true;
  }
  openModal(template: TemplateRef<any>) {
    this.content = JSON.stringify(this.group.groupFilter);
    this.modalRef = this.modalService.show(template);
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0];
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
      const eDiv = document.createElement('span');
      // tslint:disable-next-line:no-this-assignment
      const self = this;
      eDiv.innerHTML =
        '<span class="linkSpan">' +
        params.data?.clinicalStudy.studyTitle +
        '</span>';

      return eDiv;
    }
  }

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

    //this.gridApi.addEventListener('failCallback', this.onServerFailCallback);
  }
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
  /**
   *Validate date and fetch search results
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

  getSelectSearch(params: any) {
    if (params.value) {
      this.searchList.push({
        studyId: params.data.clinicalStudy.studyId,
        studyTitle: params.data.clinicalStudy.studyTitle,
        studyVersion: params.data.auditTrail.studyVersion,
      });
    } else {
      this.searchList = this.searchList.filter((elem: any) => {
        return !(
          elem.studyId === params.data.clinicalStudy.studyId &&
          elem.studyVersion === params.data.auditTrail.studyVersion
        );
      });
    }
    console.log(this.searchList);
  }
  delete(params: any) {
    this.searchList = this.searchList.filter((elem: any) => {
      return !(
        elem.studyId === params.studyId &&
        elem.studyVersion === params.studyVersion
      );
    });
  }
}
