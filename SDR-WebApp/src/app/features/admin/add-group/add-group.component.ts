import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/shared/services/communication.service';
import { groupConfigList } from './group-management-config';
import { Group, GroupFilter } from './group.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CheckboxRenderer } from './checkbox-renderer.component';
import {
  CellClassParams,
  ColDef,
  GridOptions,
  RowSpanParams,
} from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  state$: Observable<object>;
  public gridOptions: GridOptions;
  permissionList: string[];
  group = new Group();
  groupList = new GroupFilter();
  filterFieldList: any;
  isSearchSelected: any = undefined;
  filterFieldValueList: any;
  modalRef?: BsModalRef;
  content: string = '';
  showContent: boolean;
  showAddButton = false;
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
  initialForm: FormGroup;
  showError: boolean;
  groupError: boolean;
  saveSuccess: boolean;
  isEdit: boolean;
  constructor(
    public _formBuilder: FormBuilder,
    private ds: DialogService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public serviceCall: ServiceCall,
    private commonMethod: CommonMethodsService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
    };
    this.gridOptions.columnDefs = [
      {
        headerName: 'Select',
        cellRendererFramework: CheckboxRenderer,
        width: 10,
        sortable: false,
      },
      {
        headerName: 'Study Title',
        field: 'study.studyTitle',

        tooltipField: 'study.studyTitle',
        headerTooltip: configList.STUDY_TITLE,
        cellRenderer: this.getStudyVersionGrid.bind(this),
      },

      // {
      //   headerName: 'SDR Upload Version',
      //   field: 'auditTrail.SDRUploadVersion',
      //   tooltipField: 'auditTrail.SDRUploadVersion',
      //   headerTooltip: configList.SDR_UPLOAD_VERSION,
      // },

      // {
      //   headerName: 'Tag',
      //   field: 'study.studyTag',
      //   tooltipField: 'study.studyTag',
      //   headerTooltip: configList.TAG,
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
    this.gridOptions.context = {
      componentParent: this,
    };
    this.editorForm = this._formBuilder.group(
      {
        studyTitle: [''],
        fromDate: [''],
        toDate: [''],
      },
      { validators: this.atLeastOneValidator }
    );
    this.initialForm = this._formBuilder.group({
      groupName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      groupPermission: new FormControl('', [Validators.required]),
      groupFieldName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.ds.changeDialogState('Admin');
    this.permissionList = groupConfigList.PERMISSIONLIST;
    this.filterFieldList = groupConfigList.FILTER_FIELD.map((elem) => {
      return elem;
    });
    const selectedGroup = history.state.data;
    if (selectedGroup) {
      this.isEdit = true;
      this.group = selectedGroup;
      this.initialForm.get('groupName')?.patchValue(this.group.groupName);
      this.initialForm.get('groupName')?.disable();
      this.initialForm.value.groupPermission = this.group.permission;
      this.initialForm
        ?.get('groupFieldName')
        ?.patchValue(history.state.selected);

      this.filterFieldSelected();
      let index = this.group.groupFilter.findIndex(
        (elem) =>
          elem.groupFieldName.replace(/\s/g, '').toUpperCase() === 'STUDY'
      );
      if (index != -1) {
        this.searchList = this.group.groupFilter[index].groupFilterValues;
      }
      this.checkSave();
    }
  }

  filterFieldSelected() {
    let fieldName = this.initialForm.get('groupFieldName')?.value;
    this.isSearchSelected = fieldName.toLowerCase() === 'study';
    let index = this.findIndex();
    this.showAddButton = false;

    // this.groupList.groupFieldName.toLowerCase() === 'search';
    if (!this.isSearchSelected) {
      // let key = Object.keys(this.groupList.groupFieldName.replace(/\s/g, '').toUpperCase());
      this.filterFieldValueList = groupConfigList[
        fieldName
          .replace(/\s/g, '')
          .toUpperCase() as keyof typeof groupConfigList
      ].map((elem) => ({
        isSelected:
          index === -1
            ? false
            : this.group.groupFilter[index].groupFilterValues.filter(
                (filterValue) => {
                  return filterValue.title == elem;
                }
              ).length > 0
            ? true
            : false,
        value: elem,
      }));
      if (
        index != -1 &&
        this.group.groupFilter[index].groupFilterValues.length > 0
      ) {
        this.groupList = this.group.groupFilter[index];
      }
    } else {
    }
  }
  findIndex() {
    let index = this.group.groupFilter.findIndex(
      (elem) =>
        elem.groupFieldName.replace(/\s/g, '').toUpperCase() ===
        this.initialForm.value.groupFieldName.replace(/\s/g, '').toUpperCase()
    );
    return index;
  }
  updateChecked(option: string) {
    let index = this.findIndex();
    if (index == -1) {
      this.group.groupFilter.push(this.groupList);
      index = this.group.groupFilter.length - 1;
    }
    let selectedValue = { id: option, title: option };
    if (
      this.group.groupFilter[index].groupFilterValues.filter((value) => {
        return value.id == option;
      }).length > 0
    ) {
      //checking weather array contain the id
      this.group.groupFilter[index].groupFilterValues = this.group.groupFilter[
        index
      ].groupFilterValues.filter((elem) => {
        return elem.id != option;
      });
    } else {
      this.group.groupFilter[index].groupFilterValues.push(selectedValue); //adding to array because value doesnt exists
      //deleting
    }

    this.groupList.groupFieldName = 'studyType';
    this.checkSave();
  }
  addRule() {
    let index = this.findIndex();

    if (this.isSearchSelected === true) {
      let groupFilterValues: any = [];

      let searchObj = {
        groupFieldName: 'study',
        groupFilterValues: this.searchList,
      };
      if (index == -1) {
        this.group.groupFilter.push(searchObj);
        index = this.group.groupFilter.length - 1;
      } else {
        this.group.groupFilter[index] = searchObj;
      }
    }
    this.checkSave();
  }
  checkSave() {
    this.showContent = false;
    for (let i = 0; i < this.group.groupFilter.length; i++) {
      if (this.group.groupFilter[i].groupFilterValues.length > 0) {
        this.showContent = true;
      } else {
        this.group.groupFilter.splice(i, 1);
        i--;
      }
    }
  }
  saveGroup() {
    if (!this.isEdit) {
      this.group.groupCreatedOn = new Date().toISOString().slice(0, 10);
      this.group.groupEnabled = true;
      this.group.groupName = this.initialForm.value?.groupName;
    }

    this.group.permission = this.initialForm.value?.groupPermission;

    //this.group.groupCreatedOn = "2022-MAY-24";
    this.group.groupModifiedOn = new Date().toISOString().slice(0, 10);

    let response = this.commonMethod.postGroup(this.group, this);
  }
  getAllGroups() {
    this.saveSuccess = true;
  }
  onClosed() {
    this.router.navigateByUrl('/admin');
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openSearchData(template: TemplateRef<any>) {
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
        '<span class="linkSpan">' + params.data?.study.studyTitle + '</span>';
      eDiv.addEventListener('click', () => {
        self.setSelectedValue(params.data);
      });
      return eDiv;
    }
  }

  /** istanbul ignore next */
  onGridReady(params: any) {
    this.showGrid = false;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    var defaultSortModel = [
      {
        colId: 'study.studyTitle',
        sort: 'desc',
        sortIndex: 0,
      },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
    if (this.editorForm.valid) {
      const reqObj = this.editorForm.value;
      reqObj.sortOrder = 'desc';
      reqObj.sortBy = 'studyTitle';
      reqObj.groupByStudyId = 1;
      this.commonMethod.gridDataSourceForSearchLightStudy(
        reqObj,
        this.gridApi,
        this.BLOCK_SIZE,
        this
      );
      this.showGrid = true;
    }

    //this.gridApi.addEventListener('failCallback', this.onServerFailCallback);
  }
  /** istanbul ignore end */
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
        alert('To Date must be greater than From Date');
        return;
      }
    }
    if (this.showGrid && this.editorForm.valid) {
      const reqObj = this.editorForm.value;
      reqObj.groupByStudyId = 1;
      this.commonMethod.gridDataSourceForSearchLightStudy(
        reqObj,
        this.gridApi,
        this.BLOCK_SIZE,
        this
      );
    }
    this.showGrid = true;
  }
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
      { relativeTo: this.activatedRoute }
    );
  }
  getSelectSearch(params: any) {
    if (params.data.selected) {
      if (
        this.searchList.some(
          (elem: { id: any }) => elem.id === params.data.study.studyId
        )
      ) {
        return;
      }
      this.searchList.push({
        id: params.data.study.studyId,
        title: params.data.study.studyTitle,
      });
    } else {
      this.searchList = this.searchList.filter((elem: any) => {
        return !(elem.id === params.data.study.studyId);
      });
    }
    // let index = this.group.groupFilter.findIndex(
    //   (elem) => elem.groupFieldName.replace(/\s/g, '').toUpperCase() === 'STUDY'
    // );
    // if (index !== -1) {
    //   this.addRule();
    // }

    // this.showAddButton = this.isSearchSelected && this.searchList.length > 0;
    // console.log(this.searchList);
    this.addRule();
  }
  delete(params: any) {
    this.searchList = this.searchList.filter((elem: any) => {
      return !(elem.id === params.id);
    });
    this.gridOptions?.api?.forEachNode((elem) => {
      if (elem?.data?.study?.studyId === params.id) {
        // arbitrarily update some data
        var updated = elem.data;
        updated.selected = false;

        // directly update data in rowNode
        elem.setData(updated);
      }
    });
    // let index = this.group.groupFilter.findIndex(
    //   (elem) => elem.groupFieldName.replace(/\s/g, '').toUpperCase() === 'STUDY'
    // );
    // if (index !== -1) {
    //   this.addRule();
    // }
    // this.showAddButton = this.isSearchSelected && this.searchList.length > 0;
    this.addRule();
  }
  validateGroupName(event: any) {
    if (event.target.value === '') {
      return;
    }
    this.groupError = false;
    this.spinner.show();
    this.serviceCall.checkGroup(event.target.value).subscribe({
      next: (data: any) => {
        this.spinner.hide();

        if (data.isExists) {
          this.groupError = true;
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showError = true;
      },
    });
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
  confirm() {
    this.modalRef?.hide();
    this.onClosed();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
