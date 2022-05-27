import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';


import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { SliderComponent } from './slider/slider.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    SliderComponent,
  ],

  exports: [
    HeaderComponent,
    CardComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    PipesModule
  ]

})
export class ComponentsModule { }
