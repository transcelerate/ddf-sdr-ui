import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionComparisonComponent } from './version-comparison.component';

describe('VersionComparisonComponent', () => {
  let component: VersionComparisonComponent;
  let fixture: ComponentFixture<VersionComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
