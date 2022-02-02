import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';

export interface IHTTPOptions{
  headers?:HttpHeaders;
  observe?:string;
  params?:HttpParams;
  reportProgress?:boolean;
  responseType?:string;
  withCrdentials?:boolean;
}

@Injectable({
  providedIn: 'root'
})

export class HttpWrapperService {
private httpOptions:IHTTPOptions;

  constructor(private httpClient:HttpClient, private spinner: NgxSpinnerService) {
    this.httpOptions=this.getDefaultHttpOptions();
   }

   getDefaultHttpOptions():IHTTPOptions{
     return{
       headers:this.getHTTPHeaders(),
       observe:'body',
     };
    }
   getHTTPHeaders(): HttpHeaders{
     return new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + localStorage.getItem('token'),
      'ocp-apim-subscription-key': environment.subscriptionKey,
     });
   }

   public getData<T>(url:string,options?:IHTTPOptions):Observable<T>
   {
     const httpOptions=options||this.httpOptions;
     httpOptions.headers=this.getHTTPHeaders();

     return this.httpClient.get<T>(`${url}`,httpOptions as object).pipe(
     catchError((error)=>{return throwError(error);
   })
   );
   }

   public getWithParams<T>(url:string,data:any,options?:IHTTPOptions):Observable<T>
   {
     const httpOptions=options||this.httpOptions;
     httpOptions.params=data;
     
    return this.getData<T>(url,httpOptions);
   }


   public postData<T>(url:string,body:any,options?:IHTTPOptions):Observable<T>
   {
     const httpOptions=options||this.httpOptions;
     httpOptions.headers=this.getHTTPHeaders();
     
     return this.httpClient.post<T>(`${url}`, body, httpOptions as object).pipe(
     catchError((error)=>{
      this.spinner.hide();
       //this.showErrorAlert(error);
       return throwError(error);
   })
   );
   }

   private showErrorAlert(httpErrorRes:HttpErrorResponse):void{
   let errMsg:string="";

    switch(httpErrorRes.status)
    {
      case 400:
      errMsg:httpErrorRes.error?httpErrorRes.error:'Bad Request';
      break;
      case 401:
      errMsg:'Unauthorized Access Denied';
      break;
      case 403:
      errMsg:httpErrorRes.error;
      break;
      case 404:
      errMsg:'Page not found';
      break;
      case 502:
      errMsg:'Request timed out';
      break;
      default:
      errMsg:'Http response error';
      break;
    }

    alert(errMsg);
   }
}
