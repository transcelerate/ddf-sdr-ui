import { EventEmitter, Injectable, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { ServiceCall } from './service-call/service-call.service';
import { configList } from '../components/study-element-description/config/study-element-field-config';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponentComponent } from '../components/modal-component/modal-component.component';

export interface StudyQuery {
  studyId: any;
  version: any;
  linkName: string;
  callback: (url: any) => void;
  errorCallback: (err: any) => void;
}

@Injectable({
  providedIn: 'root',
})
export class CommonMethodsService {
  bsModalRef: BsModalRef;
  @Output() sendErrorBoolean: EventEmitter<any> = new EventEmitter();
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
        value = params?.data?.study?.studyIdentifiers?.filter((obj: any) => {
          const decode = obj['studyIdentifierScope']?.organisationType?.decode;
          if (
            configList.SPONSORKEYS.find(
              (p) => p.toLowerCase() === decode.toLowerCase()
            )
          ) {
            return obj['studyIdentifierScope'];
          }
        });
      } else if (type === 'intervention') {
        if (
          params.data &&
          params?.data?.study?.studyDesigns &&
          params?.data?.study?.studyDesigns.length > 0
        ) {
          value = [];
          let studyDesigns = params?.data?.study?.studyDesigns;
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
          params?.data?.study?.studyDesigns &&
          params?.data?.study?.studyDesigns.length > 0
        ) {
          value = [];
          let studyDesigns = params?.data?.study?.studyDesigns;
          studyDesigns.forEach((element: any) => {
            if (
              element.studyIndications &&
              element.studyIndications.length > 0
            ) {
              element.studyIndications.forEach((item: any) => {
                if (
                  item.indicationDescription &&
                  item.indicationDescription != ''
                ) {
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
            : value.map((elem: { indicationDescription: any }) => {
                return elem.indicationDescription;
              });
        val = [...new Set(val)];
      }
      if (val && val.length > 1) {
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
          if (type === 'sponsor') {
            val = value[0].studyIdentifierScope.organisationIdentifier || '';
          } else if (type === 'intervention') {
            val = value[0].decode || '';
          } else {
            val = value[0].indicationDescription || '';
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

        if (rowParams.sortModel.length > 0) {
          reqObj.header = this.getHeaderName(rowParams.sortModel[0].colId);
          reqObj.asc = rowParams.sortModel[0].sort === 'asc';
          console.log(rowParams.sortModel[0].colId);
        }

        this.spinner.show();

        this.serviceCall.getSearchResult(reqObj).subscribe({
          next: (data: any) => {
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              data = data.map((elem: any) => {
                elem.selected = false;
                elem.auditTrail.entryDateTime = moment
                  .utc(elem.auditTrail.entryDateTime)
                  .local()
                  .format('YYYY-MM-DD HH:mm:ss');
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
            if (error && error.error && error.error.statusCode == '404') {
              rowParams.successCallback([], rowParams.startRow);
              if (rowParams.startRow == 0) {
                gridApi.showNoRowsOverlay();
              }
            } else {
              view.showError = true;
              Array.from(
                document.getElementsByClassName(
                  'ag-cell'
                ) as HTMLCollectionOf<HTMLElement>
              ).forEach((element) => {
                element.style.border = 'none';
              });
            }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
  // @SONAR_STOP@
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
        if (reqObj.sortBy) {
          reqObj.sortBy = this.getHeaderNameLightStudy(reqObj.sortBy);
        }
        if (rowParams.sortModel.length > 0) {
          reqObj.sortBy = this.getHeaderNameLightStudy(
            rowParams.sortModel[0].colId
          );
          reqObj.sortOrder = rowParams.sortModel[0].sort;
        }
        // reqObj.sortBy = reqObj.sortBy === 'SDRVersion' ? 'Version' : reqObj.sortBy;
        this.spinner.show();

        this.serviceCall.getSearchResultLight(reqObj).subscribe({
          next: (data: any) => {
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              data = data.map((elem: { selected: boolean }) => {
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
            if (error && error.error && error.error.statusCode == '404') {
              rowParams.successCallback([], rowParams.startRow);
              if (rowParams.startRow == 0) {
                gridApi.showNoRowsOverlay();
              }
            } else {
              view.showError = true;
              Array.from(
                document.getElementsByClassName(
                  'ag-cell'
                ) as HTMLCollectionOf<HTMLElement>
              ).forEach((element) => {
                element.style.border = 'none';
              });
            }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
  // @SONAR_STOP@
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
            this.sendErrorBoolean.emit(false);
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              data = data.map((elem: any) => {
                elem.requestDate = moment
                  .utc(elem.requestDate)
                  .local()
                  .format('YYYY-MM-DD HH:mm:ss');
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
            this.sendErrorBoolean.emit(true);
            if (error && error.error && error.error.statusCode == '404') {
              rowParams.successCallback([], rowParams.startRow);
              if (rowParams.startRow == 0) {
                gridApi.showNoRowsOverlay();
              }
            } else {
              view.showError = true;
              rowParams.successCallback([], rowParams.startRow);
              if (rowParams.startRow == 0) {
                gridApi.showNoRowsOverlay();
              }
              Array.from(
                document.getElementsByClassName(
                  'ag-cell'
                ) as HTMLCollectionOf<HTMLElement>
              ).forEach((element) => {
                element.style.border = 'none';
              });
            }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
  // @SONAR_STOP@
  gridDataSourceForUser(
    reqObj: any,
    gridApi: any,
    gridOptions: any,
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
            if (error && error.error && error.error.statusCode == '404') {
              rowParams.successCallback([], rowParams.startRow);
              if (rowParams.startRow == 0) {
                gridApi.showNoRowsOverlay();
              }
            } else {
              view.showError = true;
              Array.from(
                document.getElementsByClassName(
                  'ag-cell'
                ) as HTMLCollectionOf<HTMLElement>
              ).forEach((element) => {
                element.style.border = 'none';
              });
            }
          },
        });
      },
    };
    gridApi.hideOverlay();
    gridApi.setDatasource(dataSourceVar);
  }
  getHeaderNameLightStudy(colId: any): any {
    switch (colId) {
      case 'study.studyTitle':
        return 'studyTitle';
      case '1':
        return 'SponsorId';
      case 'auditTrail.SDRUploadVersion':
        return 'version';
      case 'auditTrail.usdmVersion':
        return 'usdmVersion';
    }
  }
  /* istanbul ignore end */
  // @SONAR_START@
  getHeaderName(colId: any): any {
    switch (colId) {
      case 'study.studyTitle':
        return 'studyTitle';
      case 'study.studyProtocol.briefTitle':
        return 'briefTitle';
      case '0':
        return 'SponsorId';
      case '1':
        return 'Indication';
      case '2':
        return 'InterventionModel';
      case 'study.studyPhase.decode':
        return 'Phase';
      // case 'auditTrail.entrySystem':
      //   return 'LastModifiedBySystem';
      case 'auditTrail.entryDateTime':
        return 'LastModifiedDate';
      case 'auditTrail.SDRUploadVersion':
        return 'SDRVersion';

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
      case 'auditTrail.usdmVersion':
        return 'usdmVersion';
    }
  }
  getSponsorDetails(studyelement: any) {
    let sponsorObject;
    if (
      studyelement.auditTrail.usdmVersion === '1.0' ||
      studyelement.auditTrail.usdmVersion === '1.9'
    ) {
      sponsorObject = studyelement.clinicalStudy.studyIdentifiers;
    } else {
      sponsorObject = studyelement.study.studyIdentifiers;
    }
    sponsorObject.filter((obj: { [x: string]: string }) => {
      const decode = obj['idType']?.toLowerCase();
      return (
        configList.SPONSORKEYS.findIndex((p) => p.toLowerCase() === decode) > -1
      );
    });
    return {
      studyId:
        sponsorObject.length > 0
          ? sponsorObject[0][configList.SPONSORID_KEY]
          : '',
      versionId: studyelement.auditTrail.SDRUploadVersion,
    };
  }
  postGroup(reqObj: any, view: any) {
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
      },
    });
  }
  postUser(reqObj: any, view: any) {
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
      },
    });
  }
  getStudyLink(query: Required<StudyQuery>) {
    const localStorageKey = query.studyId + '_' + query.version + '_links';
    var links: any = localStorage.getItem(localStorageKey);
    if (!links) {
      this.serviceCall.getStudyLinks(query.studyId, query.version).subscribe({
        next: (p: any) => {
          localStorage.setItem(localStorageKey, JSON.stringify(p.links));
          query.callback(p.links[query.linkName]);
        },
        error: query.errorCallback,
      });
    } else {
      var parsedLinks = JSON.parse(links);
      query.callback(parsedLinks[query.linkName]);
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

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
}
