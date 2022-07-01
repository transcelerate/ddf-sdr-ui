import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';
import { AuditTrailComponent } from 'src/app/shared/components/audit-trail/audit-trail.component';
import { VersionComparisonComponent } from 'src/app/shared/components/version-comparison/version-comparison.component';
import { StudyCompareComponent } from './components/study-compare.component';
import { SearchFormComponent } from '../search-study/components/search-form/search-form.component';
import { SimpleSearchComponent } from 'src/app/shared/components/simple-search/simple-search/simple-search.component';
const studyCompareModuleRoutes: Routes = [
  {
    path: '',
    component: StudyCompareComponent,
    data: {
      breadcrumb: 'Compare',
    },
    children: [
      {
        path: 'studyCompare',
        component: VersionComparisonComponent,
        data: {
          breadcrumb: 'Study Version Comparison',
        },
      },
    ],
  },
  {
    path: 'search',
    component: SimpleSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(studyCompareModuleRoutes)],
  exports: [RouterModule],
})
export class StudyCompareRoutingModule {}
