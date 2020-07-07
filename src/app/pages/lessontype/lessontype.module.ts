import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessontypePageRoutingModule } from './lessontype-routing.module';

import { LessontypePage } from './lessontype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessontypePageRoutingModule
  ],
  declarations: [LessontypePage]
})
export class LessontypePageModule {}
