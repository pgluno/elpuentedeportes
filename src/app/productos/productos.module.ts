import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../services/productos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    HttpClientModule,
  ],
  providers : [
    ProductosService
  ],
  declarations: [ProductosPage]
})
export class ProductosPageModule {}
