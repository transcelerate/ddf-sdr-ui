import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { BtnCellRenderer } from './button-renderer.component';

describe('BtnCellRenderer', () => {
  let component: BtnCellRenderer;
  let fixture: ComponentFixture<BtnCellRenderer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BtnCellRenderer],
    });
    fixture = TestBed.createComponent(BtnCellRenderer);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
