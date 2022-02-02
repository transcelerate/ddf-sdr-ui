import { Component, OnInit,OnDestroy ,Inject} from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject < void > ();

    constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private authService: MsalService, private msalBroadcastService: MsalBroadcastService) {
  
    }
  ngOnInit(): void {
    
     this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$.pipe(filter((status: InteractionStatus) => status === InteractionStatus.None), takeUntil(this._destroying$)).subscribe(() => {
        this.setLoginDisplay();
    });
  }
setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    }



  login(){
      
    //   console.log('interactionType',this.msalGuardConfig.interactionType);
  if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
    // console.log('authRequest',this.msalGuardConfig.authRequest);
        if (this.msalGuardConfig.authRequest) {

            this.authService.loginPopup({
                    ...this.msalGuardConfig.authRequest
                }as PopupRequest).subscribe((response: AuthenticationResult) => {
                this.authService.instance.setActiveAccount(response.account);
            });
            
        } else {
        
            this.authService.loginPopup().subscribe((response: AuthenticationResult) => {
                this.authService.instance.setActiveAccount(response.account);
            });
        }
    } else {
    // console.log('inredirect',this.msalGuardConfig.authRequest);
        if (this.msalGuardConfig.authRequest) {
          //  console.log('inif',this.msalGuardConfig.authRequest);

         //   await this.authService.instance.handleRedirectPromise();

// const accounts = this.authService.instance.getAllAccounts();
// if (accounts.length === 0) {

            // this.authService.instance.handleRedirectPromise().then(authResult=>{
            //     // Check if user signed in 
            //     const account =  this.authService.instance.getActiveAccount();
            //     if(!account){
             // console.log('beforeredirect');
            this.authService.loginRedirect({
                    ...this.msalGuardConfig.authRequest
                }as RedirectRequest);
        //     }
        // }).catch(err=>{
        //   // TODO: Handle errors
        //   console.log(err);
        // });
            //}
        
        } else {
           // console.log('redirect',this.msalGuardConfig.authRequest);
            this.authService.loginRedirect();
         
        }
    }
}
}


// this.authService.instance.handleRedirectPromise().then(
//   res=>{
//     if(res!=null && res.account!=null)
//     {
//       this.authService.instance.setActiveAccount(res.account);
//     }
//   }
// )