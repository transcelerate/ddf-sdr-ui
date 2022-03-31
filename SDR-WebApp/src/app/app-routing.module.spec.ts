import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule', () => {
  let pipe: AppRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AppRoutingModule] });
    pipe = TestBed.get(AppRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
