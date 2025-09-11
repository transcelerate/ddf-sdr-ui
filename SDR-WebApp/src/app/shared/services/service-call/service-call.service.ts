import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { environment } from '../../../../environments/environment';
import { CommonApiUrlList } from '../../constants/api-url-constants';
import * as dropDownJson from 'src/app/shared/constants/search-form-master-data.json';
import { IHTTPOptions } from './http-wrapper.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceCall {
  constructor(private httpWrapperService: HttpWrapperService) {}

  getApiBaseUrl(): string {
    // Look first in the .env variable, which, if running in our Docker container, will expose a
    // run-time-configurable API base URL, provided by environment variable of same name    
    if ((window as any).env && (window as any).env.APP_API_BASE_URL) {
      return (window as any).env.APP_API_BASE_URL;
    } else {
      // If run-time value was not available, return the build-time value for base URL
      return environment.API_BASE_URL;
    }
  }

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
    if (studyURL.startsWith('/')) {
      studyURL = studyURL.substring(1);
    }
    return this.httpWrapperService.getData(
      this.getApiBaseUrl() + studyURL,
      this.getHttpOptions(usdmVersion)
    );
  }
  getStudyLinks(studyId: any, versionId: any) {
    return this.httpWrapperService.getData(
      this.getApiBaseUrl() +
        CommonApiUrlList.STUDYLINKS.replace('{studyId}', studyId) +
        '?sdruploadversion=' +
        versionId
    );
  }
  getAuditTrail(studyId: any) {
    return this.httpWrapperService.getData(
      this.getApiBaseUrl() +
        CommonApiUrlList.REVISIONHISTORY.replace('{studyId}', studyId)
    );
  }

  getSoAMatrix(usdmVersion: any, soaURL: string) {
    if (soaURL.startsWith('/')) {
      soaURL = soaURL.substring(1);
    }

    return this.httpWrapperService.getData(
      this.getApiBaseUrl() + soaURL,
      this.getHttpOptions(usdmVersion)
    );
  }

  getSearchResult(reqObj: any) {
    return this.httpWrapperService.postData(
      this.getApiBaseUrl() + CommonApiUrlList.SEARCHRESULT,
      reqObj
    );
  }
  getVersions() {
    return this.httpWrapperService.getData(
      this.getApiBaseUrl() + CommonApiUrlList.VERSIONSURL
    );
  }
  getSearchResultLight(reqObj: any) {
    return this.httpWrapperService.postData(
      this.getApiBaseUrl() + CommonApiUrlList.SEARCHRESULTLIGHT,
      reqObj
    );
  }
  readConfigFile() {
    return dropDownJson;
  }
}
