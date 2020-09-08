import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayvidPage } from './playvid.page';

const routes: Routes = [
  {
    path: '',
    component: PlayvidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayvidPageRoutingModule {}
