import { TestBed } from '@angular/core/testing';
import { HttpWrapperService } from './http-wrapper.service';
import { ServiceCall } from './service-call.service';

describe('ServiceCall', () => {
  let service: ServiceCall;

  beforeEach(() => {
    const httpWrapperServiceStub = () => ({
      // getData: arg => ({}),
      // postData: (arg, reqObj) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        ServiceCall,
        { provide: HttpWrapperService, useFactory: httpWrapperServiceStub }
      ]
    });
    service = TestBed.inject(ServiceCall);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
