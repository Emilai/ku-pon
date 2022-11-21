import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablocationPage } from './tablocation.page';

const routes: Routes = [
  {
    path: '',
    component: TablocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablocationPageRoutingModule {}
