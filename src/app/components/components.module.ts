import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';


import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { SliderComponent } from './slider/slider.component';
import { PipesModule } from '../pipes/pipes.module';
import { LivekuponsComponent } from './livekupons/livekupons.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    SliderComponent,
    LivekuponsComponent
  ],

  exports: [
    HeaderComponent,
    CardComponent,
    SliderComponent,
    LivekuponsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    PipesModule,
    FormsModule
  ]

})
export class ComponentsModule { }
