import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewlessonPage } from './viewlesson.page';

const routes: Routes = [
  {
    path: '',
    component: ViewlessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewlessonPageRoutingModule {}
