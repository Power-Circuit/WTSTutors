import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloudlessonsPage } from './cloudlessons.page';

const routes: Routes = [
  {
    path: '',
    component: CloudlessonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloudlessonsPageRoutingModule {}
