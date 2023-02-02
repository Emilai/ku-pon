import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { VerifypipePipe } from './verifypipe.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    VerifypipePipe
  ],
  exports: [
    FiltroPipe,
    VerifypipePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
