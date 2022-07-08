import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCompareComponent } from './study-compare.component';

describe('StudyCompareComponent', () => {
  let component: StudyCompareComponent;
  let fixture: ComponentFixture<StudyCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
