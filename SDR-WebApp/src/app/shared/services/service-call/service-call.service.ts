import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { environment } from '../../../../environments/environment';
import { CommonApiUrlList } from '../../constants/api-url-constants';
import * as dropDownJson from 'src/app/shared/constants/search-form-master-data.json';
import { IHTTPOptions } from './http-wrapper.service';
import { HttpHeaders } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ServiceCall {
  public routePrefix: string = environment.bypassAuth ? '' : 'api/ui';
  constructor(private httpWrapperService: HttpWrapperService) {}

  getHttpOptions(usdmVersion: any): IHTTPOptions {
    return {
      headers: this.getHTTPHeaders(usdmVersion),
      observe: 'body',
    };
  }
  getHTTPHeaders(usdmVersion: any): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Cache-control': 'no-store',
      usdmVersion: usdmVersion,
    });
  }

  getStudyElementWithVersion(usdmVersion: any, studyURL: string) {
    // return this.httpWrapperService.getData('https://apim-sdr-dev-eastus.azure-api.net/api/v1/studydefinitions/9085f2c7-1f7a-4f71-8b48-5d24592b6f17?version=2');
    if (environment.bypassAuth && studyURL.startsWith('/')) {
      studyURL = studyURL.substring(1);
    }
    return this.httpWrapperService.getData(
      environment.BASE_URL + this.routePrefix + studyURL,
      this.getHttpOptions(usdmVersion)
    );
  }
  getStudyLinks(studyId: any, versionId: any) {
    return this.httpWrapperService.getData(
      environment.BASE_URL +
        CommonApiUrlList.STUDYLINKS.replace('{studyId}', studyId) +
        '?sdruploadversion=' +
        versionId
    );
  }
  getAuditTrail(studyId: any) {
    //return this.httpWrapperService.getData('https://apim-sdr-qa-eastus.azure-api.net/studydefinitionrepository/v1/audittrail/%7bstudy%7d');
    return this.httpWrapperService.getData(
      environment.BASE_URL +
        CommonApiUrlList.REVISIONHISTORY.replace('{studyId}', studyId)
    );
  }

  getSoAMatrix(usdmVersion: any, soaURL: string) {
    // return this.httpWrapperService.getData('https://apim-sdr-dev-eastus.azure-api.net/api/ui/v2/studydefinitions/9352b5ba-4a94-46c9-8809-b8aeea0dd45e/studydesigns/soa');
    if (environment.bypassAuth && soaURL.startsWith('/')) {
      soaURL = soaURL.substring(1);
    }

    return this.httpWrapperService.getData(
      environment.BASE_URL + this.routePrefix + soaURL,
      this.getHttpOptions(usdmVersion)
    );
  }

  getSearchResult(reqObj: any) {
    return this.httpWrapperService.postData(
      environment.BASE_URL + CommonApiUrlList.SEARCHRESULT,
      reqObj
    );
  }
  getVersions() {
    return this.httpWrapperService.getData(
      environment.BASE_URL + CommonApiUrlList.VERSIONSURL
    );
  }
  getSearchResultLight(reqObj: any) {
    return this.httpWrapperService.postData(
      environment.BASE_URL + CommonApiUrlList.SEARCHRESULTLIGHT,
      reqObj
    );
  }
  getAllGroups(reqObj: any) {
    return this.httpWrapperService.postData(
      environment.BASE_URL + CommonApiUrlList.ALLGROUPS,
      reqObj
    );
  }
  postGroup(reqObj: any) {
    return this.httpWrapperService.postData(
      environment.BASE_URL + CommonApiUrlList.POSTGROUP,
      reqObj
    );
  }
  checkGroup(groupName: any) {
    return this.httpWrapperService.getData(
      environment.BASE_URL + CommonApiUrlList.CHECKGROUP + groupName
    );
  }
  getAllUsers(reqObj: any) {
    return this.httpWrapperService.postData(
      environment.BASE_URL + CommonApiUrlList.ALLUSERS,
      reqObj
    );
  }
  getUsageReport(reqObj: any) {
    return this.httpWrapperService.postData(
      environment.BASE_URL + CommonApiUrlList.USAGEREPORT,
      reqObj
    );
  }
  postUser(reqObj: any) {
    return this.httpWrapperService.postData(
      environment.BASE_URL + CommonApiUrlList.POSTUSERS,
      reqObj
    );
  }
  getAllGroupList() {
    return this.httpWrapperService.getData(
      environment.BASE_URL + CommonApiUrlList.GETGROUPLIST
    );
  }
  getAllUserList() {
    return this.httpWrapperService.getData(
      environment.BASE_URL + CommonApiUrlList.GETUSERLIST
    );
  }

  readConfigFile() {
    return dropDownJson;
  }
}
