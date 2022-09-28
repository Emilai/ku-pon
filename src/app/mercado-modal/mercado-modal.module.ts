import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MercadoModalPageRoutingModule } from './mercado-modal-routing.module';

import { MercadoModalPage } from './mercado-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MercadoModalPageRoutingModule
  ],
  declarations: [MercadoModalPage]
})
export class MercadoModalPageModule {}
