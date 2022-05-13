import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';


import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { SliderComponent } from './slider/slider.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    SliderComponent,
    CategoriesComponent
  ],

  exports: [
    HeaderComponent,
    CardComponent,
    SliderComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ]

})
export class ComponentsModule { }
