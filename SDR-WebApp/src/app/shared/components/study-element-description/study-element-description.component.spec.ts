import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyElementDescriptionComponent } from './study-element-description.component';

describe('StudyElementDescriptionComponent', () => {
  let component: StudyElementDescriptionComponent;
  let fixture: ComponentFixture<StudyElementDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyElementDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyElementDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
