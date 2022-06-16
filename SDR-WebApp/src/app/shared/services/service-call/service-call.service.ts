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
   //return this.httpWrapperService.getData('https://apim-sdr-dev2-eastus.azure-api.net/sdr/697/elements');
   return this.httpWrapperService.getData(environment.BASE_URL  +  ApiUrlList.ELEMENT + studyId + '?version=' + (versionId||''));
  }
  getAuditTrail(studyId:any) { 
    //return this.httpWrapperService.getData('https://apim-sdr-qa-eastus.azure-api.net/studydefinitionrepository/v1/audittrail/%7bstudy%7d');
    return this.httpWrapperService.getData(environment.BASE_URL  + ApiUrlList.AUDITTRAIL + studyId );
   }
  getSearchResult(reqObj:any){
    return this.httpWrapperService.postData(environment.BASE_URL + ApiUrlList.SEARCHRESULT, reqObj);
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
