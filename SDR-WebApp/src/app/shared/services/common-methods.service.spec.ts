import { TestBed } from '@angular/core/testing';

import { CommonMethodsService } from './common-methods.service';

describe('CommonMethodsService', () => {
  let service: CommonMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
