import { TestBed } from '@angular/core/testing';
import { SearchStudyRoutingModule } from './search-study-routing-module';

describe('SearchStudyRoutingModule', () => {
  let pipe: SearchStudyRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SearchStudyRoutingModule] });
    pipe = TestBed.get(SearchStudyRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
