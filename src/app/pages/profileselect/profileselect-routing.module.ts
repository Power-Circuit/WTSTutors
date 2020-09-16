import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileselectPage } from './profileselect.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileselectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileselectPageRoutingModule {}
