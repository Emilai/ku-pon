import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivePageRoutingModule } from './live-routing.module';
import { ComponentsModule } from '../components/components.module';
import { LivePage } from './live.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivePageRoutingModule,
    ComponentsModule
  ],
  declarations: [LivePage]
})
export class LivePageModule {}
