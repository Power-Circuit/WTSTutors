import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChalkboardPage } from './chalkboard.page';

const routes: Routes = [
  {
    path: '',
    component: ChalkboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChalkboardPageRoutingModule {}
