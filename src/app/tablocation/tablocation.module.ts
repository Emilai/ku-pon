import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablocationPageRoutingModule } from './tablocation-routing.module';

import { TablocationPage } from './tablocation.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablocationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TablocationPage]
})
export class TablocationPageModule {}
