import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StudyElementDescriptionComponent } from './components/study-element-description/study-element-description.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AuditTrailComponent } from './components/audit-trail/audit-trail.component';
import { ModalComponentComponent } from './components/modal-component/modal-component.component';
import { VersionComparisonComponent } from './components/version-comparison/version-comparison.component';
import { DialogService } from './services/communication.service';
import { CustomPipe } from './pipes/custom.pipe';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AgGridModule } from 'ag-grid-angular';
// import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatMenuModule } from '@angular/material/menu';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
export class SharedModuleConstants {
  static MODULE_IMPORTS = [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    MonacoEditorModule,
    ModalModule,
    MatMenuModule,
    NgMultiSelectDropDownModule.forRoot(),
  ];
  static MODULE_COMPONENTS = [
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    BreadcrumbComponent,
    AuditTrailComponent,
    VersionComparisonComponent,
    StudyElementDescriptionComponent,
    CustomPipe,
    ErrorComponentComponent,
    ModalComponentComponent,
  ];
  static MODULE_PROVIDERS = [];

  static MODULE_EXPORTS = [
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
    CommonModule,
    MenuComponent,
    StudyElementDescriptionComponent,
    BreadcrumbComponent,
    AuditTrailComponent,
    VersionComparisonComponent,
    NgxSpinnerModule,
    MatAutocompleteModule,
    ErrorComponentComponent,
    ModalComponentComponent,
    MatMenuModule,
  ];

  static ENTRY_COMPONENTS = [];
}
