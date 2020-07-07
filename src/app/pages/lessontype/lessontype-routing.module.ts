import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessontypePage } from './lessontype.page';

const routes: Routes = [
  {
    path: '',
    component: LessontypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessontypePageRoutingModule {}
