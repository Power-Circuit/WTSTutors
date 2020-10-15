import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestpremiumPage } from './requestpremium.page';

const routes: Routes = [
  {
    path: '',
    component: RequestpremiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestpremiumPageRoutingModule {}
