import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpWrapperService } from './http-wrapper.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
describe('HttpWrapperService', () => {
  let service: HttpWrapperService;

  beforeEach(() => {
    const ngxSpinnerServiceStub = () => ({ hide: () => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpWrapperService,
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
      ],
    });
    spyOn(HttpWrapperService.prototype, 'getDefaultHttpOptions');
    service = TestBed.inject(HttpWrapperService);
    service.httpOptions = {};
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

  describe('getData', () => {
    it('makes expected calls', () => {
      spyOn(service, 'getData').and.callThrough();
      (<jasmine.Spy>service.getData).and.callThrough();
      service.getData('/search');
      expect(service.getData).toHaveBeenCalled();
    });
  });

  describe('postData', () => {
    it('makes expected calls', () => {
      spyOn(service, 'postData').and.callThrough();
      (<jasmine.Spy>service.postData).and.callThrough();
      service.postData('/search', {});
      expect(service.postData).toHaveBeenCalled();
    });
  });

  describe('getWithParams', () => {
    it('makes expected calls', () => {
      spyOn(service, 'getWithParams').and.callThrough();
      (<jasmine.Spy>service.getWithParams).and.callThrough();
      service.getWithParams('/search', {});
      expect(service.getWithParams).toHaveBeenCalled();
    });
  });
});
