import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

export interface IHTTPOptions {
  headers?: HttpHeaders;
  observe?: string;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: string;
  withCrdentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpWrapperService {
  public httpOptions: IHTTPOptions;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.httpOptions = this.getDefaultHttpOptions();
  }

  getDefaultHttpOptions(): IHTTPOptions {
    return {
      headers: this.getHTTPHeaders(),
      observe: 'body',
    };
  }
  getHTTPHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Cache-control': 'no-store',
    });
  }

  public getData<T>(url: string, options?: IHTTPOptions): Observable<T> {
    const httpOptions = options || this.httpOptions;
    httpOptions.headers = httpOptions.headers || this.getHTTPHeaders();

    return this.httpClient.get<T>(`${url}`, httpOptions as object).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public getWithParams<T>(
    url: string,
    data: any,
    options?: IHTTPOptions
  ): Observable<T> {
    const httpOptions = options || this.httpOptions;
    httpOptions.params = data;

    return this.getData<T>(url, httpOptions);
  }

  public postData<T>(
    url: string,
    body: any,
    options?: IHTTPOptions
  ): Observable<T> {
    const httpOptions = options || this.httpOptions;
    httpOptions.headers = this.getHTTPHeaders();

    return this.httpClient.post<T>(`${url}`, body, httpOptions as object).pipe(
      catchError((error) => {
        this.spinner.hide();
        //this.showErrorAlert(error);
        return throwError(error);
      })
    );
  }
}
