import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MercadoModalPage } from './mercado-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MercadoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MercadoModalPageRoutingModule {}
