import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminrequestsPage } from './adminrequests.page';

const routes: Routes = [
  {
    path: '',
    component: AdminrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminrequestsPageRoutingModule {}
