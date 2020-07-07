import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewtutorialPage } from './viewtutorial.page';

const routes: Routes = [
  {
    path: '',
    component: ViewtutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewtutorialPageRoutingModule {}
