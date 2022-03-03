import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from './service-call/service-call.service';
import { configList } from '../components/study-element-description/config/study-element-field-config';
@Injectable({
  providedIn: 'root',
})
export class CommonMethodsService {
  constructor(
    private spinner: NgxSpinnerService,
    public serviceCall: ServiceCall
  ) {}
   
// @SONAR_STOP@
  gridDataSourceForSearchStudy(
    reqObj: any,
    gridApi: any,
    BLOCK_SIZE: number,
    view: any

  ) {
    let dataSourceVar = {
      getRows: (rowParams: any) => {
        console.log(
          'asking for ' + rowParams.startRow + ' to ' + rowParams.endRow
        );

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
        console.log('req', reqObj);
        this.spinner.show();

        this.serviceCall.getSearchResult(reqObj).subscribe({
          next: (data: any) => {
            console.log(data);
            this.spinner.hide();
            if (data.length > 0) {
              gridApi.hideOverlay();
              data = data.map((elem: { clinicalStudy: any }) => {
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
            console.log(error);
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
      case 'auditTrail.studyVersion':
        return 'SDRVersion';
      case 'clinicalStudy.studyStatus':
        return 'status';
      case 'clinicalStudy.studyTag':
        return 'tag';
        
    }
  }
  getSponsorDetails(studyelement: any){
    let sponsorObject = studyelement.clinicalStudy.studyIdentifiers.filter((obj: { [x: string]: string; }) => {
      return obj['idType'] === configList.SPONSORKEY
    });
    return {
      'studyId':sponsorObject.length > 0 ? sponsorObject[0][configList.SPONSORID_KEY] : '',
      'versionId':studyelement.auditTrail.studyVersion
    }

  }
}
