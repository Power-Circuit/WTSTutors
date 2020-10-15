import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyguidePage } from './studyguide.page';

const routes: Routes = [
  {
    path: '',
    component: StudyguidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyguidePageRoutingModule {}
