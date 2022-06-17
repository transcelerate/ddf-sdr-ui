import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanLoad {
  constructor(private router: Router) {}
  canLoad(): boolean {
    const loggedIn: boolean = localStorage.getItem('isAdmin') == 'true';
    // if not, redirect to /login
    if (!loggedIn) {
      this.router.navigate(['']);
    }
    return loggedIn;
  }
}
