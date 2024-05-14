import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosPage } from './productos.page';
import { CarritoPage } from '../carrito/carrito.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  },
  {
    path: ':page',
    component: ProductosPage
  },
  {
    path: ':page/:nombre/:categoria/:talla/:color/:tipo_uniforme/:tipo_manga',
    component: ProductosPage
  },
  {
    path: ':carito',
    component: CarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
