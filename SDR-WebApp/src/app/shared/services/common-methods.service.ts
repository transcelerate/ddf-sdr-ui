import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { ServiceCall } from './service-call/service-call.service';
import { configList } from '../components/study-element-description/config/study-element-field-config';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponentComponent } from '../components/modal-component/modal-component.component';
@Injectable({
  providedIn: 'root',
})
export class CommonMethodsService {
  bsModalRef: BsModalRef;
  constructor(
    private spinner: NgxSpinnerService,
    public serviceCall: ServiceCall,
    private modalService: BsModalService
  ) {}
  getSponsorIdGrid(type: any, params: any) {
    let value;
    let self = this;
    if (!params.data) {
      return '';
    } else {
      if (type === 'sponsor') {
        value = params?.data?.clinicalStudy?.studyIdentifiers?.filter(
          (obj: any) => {
            if (
              obj['studyIdentifierScope']?.organisationType?.decode ===
              configList.SPONSORKEY
            ) {
              return obj['studyIdentifierScope'];
            }
          }
        );
        console.log(value);
        console.log(type);
      } else if (type === 'intervention') {
        if (
          params.data &&
          params?.data?.clinicalStudy?.studyDesigns &&
          params?.data?.clinicalStudy?.studyDesigns.length > 0
        ) {
          value = [];
          let studyDesigns = params?.data?.clinicalStudy?.studyDesigns;
          studyDesigns.forEach((element: any) => {
            if (
              element.interventionModel &&
              element.interventionModel.length > 0
            ) {
              element.interventionModel.forEach((item: any) => {
                if (item.decode && item.decode != '') {
                  value.push(item);
                }
              });
            }
          });
        }
      } else if (type === 'indication') {
        if (
          params.data &&
          params?.data?.clinicalStudy?.studyDesigns &&
          params?.data?.clinicalStudy?.studyDesigns.length > 0
        ) {
          value = [];
          let studyDesigns = params?.data?.clinicalStudy?.studyDesigns;
          studyDesigns.forEach((element: any) => {
            if (
              element.studyIndications &&
              element.studyIndications.length > 0
            ) {
              element.studyIndications.forEach((item: any) => {
                if (item.indicationDesc && item.indicationDesc != '') {
                  value.push(item);
                }
              });
            }
          });
        }
      }
      if (value && value.length > 1) {
        var val =
          type === 'sponsor'
            ? value.map((elem: any) => {
                return elem.studyIdentifierScope.organisationIdentifier;
              })
            : type === 'intervention'
            ? value.map((elem: { decode: any }) => {
                return elem.decode;
              })
            : value.map((elem: { indicationDesc: any }) => {
                return elem.indicationDesc;
              });
        val = [...new Set(val)];
      }
      if (val && val.length > 1) {
        console.log(val);
        const eDiv = document.createElement('a');
        // tslint:disable-next-line:no-this-assignment
     let self = this;
        var htmlTag = '<span class="linkSpan"> ' + val[0] + '</span>';
        eDiv.innerHTML = htmlTag;
        eDiv.title = val[0];
        eDiv.addEventListener('click', () => {
          self.openModal(val, type);
        });
        return eDiv;
      } else {
        if (value && value.length > 0) {
          const eDiv = document.createElement('a');
          console.log(value);
          if (type === 'sponsor') {
            val = value[0].studyIdentifierScope.organisationIdentifier || '';
          } else if (type === 'intervention') {
            val = value[0].decode || '';
          } else {
            val = value[0].indicationDesc || '';
          }
          var htmlTag = '<span> ' + val + '</span>';
          eDiv.innerHTML = htmlTag;
          eDiv.title = val;
          return eDiv;
        } else {
          return '';
        }
      }
    }
  }
   /**
   * Modal for multiple sponsor id and interventional model
   * @param val   ag grid value of that particular row for which link is clicked.
   * @param type  Denotes for which value is the link clicked either for sponsor id or interventional model.
   */
    openModal(val: any, type: any) {
      const initialState: ModalOptions = {
        initialState: {
          list: val,
          title:
            type === 'sponsor' ? 'Sponsor Id List' : 'Intervention Model List',
        },
      };
      this.bsModalRef = this.modalService.show(
        ModalComponentComponent,
        initialState
      );
      this.bsModalRef.content.closeBtnName = 'Close';
    }
// @SONAR_STOP@
  gridDataSourceForSearchStudy(
    reqObj: any,
    gridApi: any,
    BLOCK_SIZE: number,
    view: any

  ) {
    let dataSourceVar = {
      getRows: (rowParams: any) => {
        // console.log(
        //   'asking for ' + rowParams.startRow + ' to ' + rowParams.endRow
        // );

        reqObj.pageSize = rowParams.endRow - rowParams.startRow;
        reqObj.pageNumber =
          rowParams.endRow / (rowParams.endRow - rowParams.startRow);
        if(reqObj.header){
          reqObj.header =  this.getHeaderName(reqObj.header);
        } 
        if (rowParams.sortModel.length > 0) {
          reqObj.header = this.getHeaderName(rowParams.sortModel[0].colId);
          reqObj.asc = rowParams.sortModel[0].sort === 'asc';
        }
        this.spinner.show();

        this.serviceCall.getSearchResult(reqObj).subscribe({
          next: (data: any) => {
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              data = data.map((elem: any) => {
                elem.selected = false;
                elem.auditTrail.entryDateTime = moment.utc(elem.auditTrail.entryDateTime).local().format('YYYY-MM-DD HH:mm:ss');
                return elem;
              });
              let lastRow = -1;
              if (data.length < BLOCK_SIZE) {
                lastRow = rowParams.startRow + data.length;
              }
              
              rowParams.successCallback(data, lastRow);
            }
          },
          error: (error) => {
            if(error && error.error && error.error.statusCode == "404"){
            rowParams.successCallback([], rowParams.startRow);
            if(rowParams.startRow == 0){
              gridApi.showNoRowsOverlay();
            }
          } else {
            view.showError = true;
            Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>).forEach(element => {
              element.style.border='none';
            });

          }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
  gridDataSourceForSearchLightStudy(
    reqObj: any,
    gridApi: any,
    BLOCK_SIZE: number,
    view: any

  ) {
    let dataSourceVar = {
      getRows: (rowParams: any) => {
        // console.log(
        //   'asking for ' + rowParams.startRow + ' to ' + rowParams.endRow
        // );

        reqObj.pageSize = rowParams.endRow - rowParams.startRow;
        reqObj.pageNumber =
          rowParams.endRow / (rowParams.endRow - rowParams.startRow);
        if(reqObj.sortBy){
          reqObj.sortBy =  this.getHeaderName(reqObj.sortBy);
        } 
        if (rowParams.sortModel.length > 0) {
          reqObj.sortBy = this.getHeaderName(rowParams.sortModel[0].colId);
          reqObj.sortOrder = rowParams.sortModel[0].sort;
        }
        reqObj.sortBy = reqObj.sortBy === 'SDRVersion' ? 'Version' : reqObj.sortBy;
        this.spinner.show();

        this.serviceCall.getSearchResultLight(reqObj).subscribe({
          next: (data: any) => {
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              data = data.map((elem: { selected: boolean; }) => {
                elem.selected = false;
                return elem;
              });
              let lastRow = -1;
              if (data.length < BLOCK_SIZE) {
                lastRow = rowParams.startRow + data.length;
              }
              
              rowParams.successCallback(data, lastRow);
            }
          },
          error: (error) => {
            if(error && error.error && error.error.statusCode == "404"){
            rowParams.successCallback([], rowParams.startRow);
            if(rowParams.startRow == 0){
              gridApi.showNoRowsOverlay();
            }
          } else {
            view.showError = true;
            Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>).forEach(element => {
              element.style.border='none';
            });

          }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
  gridDataSourceForUsageReport(
    reqObj: any,
    gridApi: any,
    BLOCK_SIZE: number,
    view: any,
    fromClear?: boolean

  ) {
    let dataSourceVar = {
      getRows: (rowParams: any) => {
        // console.log(
        //   'asking for ' + rowParams.startRow + ' to ' + rowParams.endRow
        // );

        reqObj.pageSize = rowParams.endRow - rowParams.startRow;
        reqObj.recordNumber = rowParams.startRow;

      if (rowParams.sortModel.length > 0) {
          reqObj.sortBy = this.getHeaderName(rowParams.sortModel[0].colId);
          reqObj.sortOrder = rowParams.sortModel[0].sort;
        }
        this.spinner.show();

        this.serviceCall.getUsageReport(reqObj).subscribe({
          next: (data: any) => {
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              data = data.map((elem: any) => {
                elem.requestDate = moment.utc(elem.requestDate).local().format('YYYY-MM-DD HH:mm:ss');
                return elem;
              });
              let lastRow = -1;
              if (data.length < BLOCK_SIZE) {
                lastRow = rowParams.startRow + data.length;
              }
              
              rowParams.successCallback(data, lastRow);
            }
          },
          error: (error) => {
            if(error && error.error && error.error.statusCode == "404"){
            rowParams.successCallback([], rowParams.startRow);
            if(rowParams.startRow == 0){
              gridApi.showNoRowsOverlay();
            }
          } else {
            view.showError = true;
            Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>).forEach(element => {
              element.style.border='none';
            });

          }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
  gridDataSourceForUser(
    reqObj: any,
    gridApi: any,
    gridOptions:any,
    BLOCK_SIZE: number,
    view: any

  ) {
    let dataSourceVar = {
      getRows: (rowParams: any) => {
        // console.log(
        //   'asking for ' + rowParams.startRow + ' to ' + rowParams.endRow
        // );
       // reqObj.sortOrder = 'asc';
        reqObj.pageSize = rowParams.endRow - rowParams.startRow;
        reqObj.pageNumber =
          rowParams.endRow / (rowParams.endRow - rowParams.startRow);
        // if(reqObj.header){
        //   reqObj.header =  this.getHeaderName(reqObj.header);
        // } 
        // if (rowParams.sortModel.length > 0) {
        //   reqObj.header = this.getHeaderName(rowParams.sortModel[0].colId);
        //   reqObj.asc = rowParams.sortModel[0].sort === 'asc';
        // }
        this.spinner.show();

        this.serviceCall.getAllUsers(reqObj).subscribe({
          next: (data: any) => {
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              
              let lastRow = -1;
              if (data.length < BLOCK_SIZE) {
                lastRow = rowParams.startRow + data.length;
              }
              
              rowParams.successCallback(data, lastRow);
            }
          },
          error: (error) => {
            if(error && error.error && error.error.statusCode == "404"){
            rowParams.successCallback([], rowParams.startRow);
            if(rowParams.startRow == 0){
              gridApi.showNoRowsOverlay();
            }
          } else {
            view.showError = true;
            Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>).forEach(element => {
              element.style.border='none';
            });

          }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
   /* istanbul ignore end */
// @SONAR_START@
  getHeaderName(colId: any): any {
    switch (colId) {
      case 'clinicalStudy.studyTitle':
        return 'studyTitle';
      case 'clinicalStudy.studyProtocol.briefTitle':
        return 'briefTitle';
      case '0':
        return 'SponsorId';
      case '1':
        return 'Indication';
      case '2':
        return 'InterventionModel';
      case 'clinicalStudy.studyPhase':
        return 'Phase';
      case 'auditTrail.entrySystem':
        return 'LastModifiedBySystem';
      case 'auditTrail.entryDateTime':
        return 'LastModifiedDate';
      case 'auditTrail.SDRUploadVersion':
        return 'SDRVersion';
      case 'clinicalStudy.studyStatus':
        return 'status';
      case 'clinicalStudy.studyTag':
        return 'tag';
        case 'operation':
        return 'operation';
        case 'api':
        return 'api';
        case 'requestDate':
        return 'requestdate';
        case 'callerIpAddress':
        return 'callerip';
        case 'responseCodeDescription':
        return 'responsecode';
        
    }
  }
  getSponsorDetails(studyelement: any){
    let sponsorObject = studyelement.clinicalStudy.uuidentifiers.filter((obj: { [x: string]: string; }) => {
      return obj['idType'] === configList.SPONSORKEY
    });
    return {
      'studyId':sponsorObject.length > 0 ? sponsorObject[0][configList.SPONSORID_KEY] : '',
      'versionId':studyelement.auditTrail.SDRUploadVersion
    }

  }
  postGroup(reqObj: any, view: any){
    console.log(reqObj);
    this.spinner.show();
    this.serviceCall.postGroup(reqObj).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        view.getAllGroups();
      },
      error: (error) => {
        this.spinner.hide();
        view.showError = true;
      //   if(error && error.error && error.error.statusCode == "404"){
      //   rowParams.successCallback([], rowParams.startRow);
      //   if(rowParams.startRow == 0){
      //     gridApi.showNoRowsOverlay();
      //   }
      // } else {
      //   view.showError = true;
      //   Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>).forEach(element => {
      //     element.style.border='none';
      //   });

      }
      
    });
  }
  postUser(reqObj: any, view: any){
    console.log(reqObj);
    this.spinner.show();
    this.serviceCall.postUser(reqObj).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        view.getAllUsers();
      },
      error: (error) => {
        this.spinner.hide();
        view.showError = true;
      //   if(error && error.error && error.error.statusCode == "404"){
      //   rowParams.successCallback([], rowParams.startRow);
      //   if(rowParams.startRow == 0){
      //     gridApi.showNoRowsOverlay();
      //   }
      // } else {
      //   view.showError = true;
      //   Array.from(document.getElementsByClassName('ag-cell') as HTMLCollectionOf<HTMLElement>).forEach(element => {
      //     element.style.border='none';
      //   });

      }
      
    });
  }
}
