import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanLoad {
  constructor() {}
  canLoad(): boolean {
    if(localStorage.getItem('isAdmin') == 'true'){
      return true;
    }
    return false;
  }
}
