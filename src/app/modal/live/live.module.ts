import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivePageRoutingModule } from './live-routing.module';

import { LivePage } from './live.page';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivePageRoutingModule,
    SwiperModule
  ],
  declarations: [LivePage]
})
export class LivePageModule {}
