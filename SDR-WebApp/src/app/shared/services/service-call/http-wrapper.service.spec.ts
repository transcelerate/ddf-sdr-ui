import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpWrapperService } from './http-wrapper.service';

describe('HttpWrapperService', () => {
  let service: HttpWrapperService;

  beforeEach(() => {
    const ngxSpinnerServiceStub = () => ({ hide: () => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpWrapperService,
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub }
      ]
    });
    spyOn(HttpWrapperService.prototype, 'getDefaultHttpOptions');
    service = TestBed.inject(HttpWrapperService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(
        HttpWrapperService.prototype.getDefaultHttpOptions
      ).toHaveBeenCalled();
    });
  });

  describe('getDefaultHttpOptions', () => {
    it('makes expected calls', () => {
      spyOn(service, 'getHTTPHeaders').and.callThrough();
      (<jasmine.Spy>service.getDefaultHttpOptions).and.callThrough();
      service.getDefaultHttpOptions();
      expect(service.getHTTPHeaders).toHaveBeenCalled();
    });
  });
});
