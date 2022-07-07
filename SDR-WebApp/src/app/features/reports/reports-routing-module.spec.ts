import { TestBed } from '@angular/core/testing';
import { ReportsRoutingModule } from './reports-routing-module';

describe('ReportsRoutingModule', () => {
  let pipe: ReportsRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ReportsRoutingModule] });
    pipe = TestBed.get(ReportsRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
