import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadlessonPage } from './uploadlesson.page';

const routes: Routes = [
  {
    path: '',
    component: UploadlessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadlessonPageRoutingModule {}
