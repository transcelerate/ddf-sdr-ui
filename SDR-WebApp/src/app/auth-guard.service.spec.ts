import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: Router, useFactory: routerStub },
      ],
    });
    service = TestBed.get(AuthGuardService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('canLoad', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.canLoad();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
