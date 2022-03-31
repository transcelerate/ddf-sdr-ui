import { TestBed } from '@angular/core/testing';
import { DashboardRoutingModule } from './dashboard-routing-module';

describe('DashboardRoutingModule', () => {
  let pipe: DashboardRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DashboardRoutingModule] });
    pipe = TestBed.get(DashboardRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
