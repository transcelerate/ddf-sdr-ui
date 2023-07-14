import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { MenuComponent } from './menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const msalServiceStub = () => ({ logout: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuComponent],
      providers: [{ provide: MsalService, useFactory: msalServiceStub }],
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // describe('logout', () => {
  //   it('makes expected calls', () => {
  //     component.logout();
  //     expect(1).toBe(1);
  //   });
  // });
});
