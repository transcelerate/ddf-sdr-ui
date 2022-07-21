import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { environment } from '../../../../environments/environment';
import { ApiUrlList } from '../../constants/api-url-constants';
import * as dropDownJson from 'src/app/shared/constants/search-form-master-data.json';
//import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceCall {
  constructor(private httpWrapperService:HttpWrapperService) { 
  }
  
  getStudyElement(studyId:any ,versionId:any) { 
   // return this.httpWrapperService.getData('https://apim-sdr-dev-eastus.azure-api.net/api/v1/studydefinitions/9085f2c7-1f7a-4f71-8b48-5d24592b6f17?version=2');
    return this.httpWrapperService.getData(environment.BASE_URL  +  ApiUrlList.ELEMENT + studyId + '?version=' + (versionId||''));
  }
  getAuditTrail(studyId:any) { 
    //return this.httpWrapperService.getData('https://apim-sdr-qa-eastus.azure-api.net/studydefinitionrepository/v1/audittrail/%7bstudy%7d');
    return this.httpWrapperService.getData(environment.BASE_URL  + ApiUrlList.AUDITTRAIL + studyId );
   }
  getSearchResult(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.SEARCHRESULT, reqObj);
  }
  getSearchResultLight(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.SEARCHRESULTLIGHT, reqObj);
  }
  getAllGroups(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.ALLGROUPS, reqObj);
  }
  postGroup(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.POSTGROUP, reqObj);
  }
  checkGroup(groupName:any){
    return this.httpWrapperService.getData(environment.BASE_URL + ApiUrlList.CHECKGROUP + groupName);
  }
  getAllUsers(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.ALLUSERS, reqObj);
  }
  getUsageReport(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.USAGEREPORT, reqObj);
  }
  postUser(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.POSTUSERS, reqObj);
  }
  getAllGroupList(){
    return this.httpWrapperService.getData(environment.BASE_URL + ApiUrlList.GETGROUPLIST);
  }
  getAllUserList(){
    return this.httpWrapperService.getData(environment.BASE_URL + ApiUrlList.GETUSERLIST);
  }

  readConfigFile() {
    return dropDownJson;
  }
  
}
