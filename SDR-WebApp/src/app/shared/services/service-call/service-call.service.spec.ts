import { TestBed } from '@angular/core/testing';
import { HttpWrapperService } from './http-wrapper.service';
import { ServiceCall } from './service-call.service';

describe('ServiceCall', () => {
  let service: ServiceCall;

  beforeEach(() => {
    const httpWrapperServiceStub = () => ({
      getData: (arg: any) => ({}),
      postData: (arg: any, reqObj: any) => ({}),
    });
    TestBed.configureTestingModule({
      providers: [
        ServiceCall,
        { provide: HttpWrapperService, useFactory: httpWrapperServiceStub },
      ],
    });
    service = TestBed.inject(ServiceCall);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('call all services', () => {
    it('call getStudyElementWithVersion ', () => {
      service.getStudyElementWithVersion(2, 'URL');
    });
    it('call getAuditTrail ', () => {
      service.getAuditTrail(2);
    });
    it('call getSearchResult ', () => {
      let request = {};
      service.getSearchResult(request);
    });
    it('call readConfigFile ', () => {
      service.readConfigFile();
    });
    it('call getVersions ', () => {
      service.getVersions();
    });
  });
});
