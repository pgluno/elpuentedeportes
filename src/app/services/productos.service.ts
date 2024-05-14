import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from './constantes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient, private router : Router) {

  }


  getProductos(page : any | null, nombre : any | null, categoria : any | null, talla : any | null, color : any | null, tipo_uniforme : any | null, tipo_manga : any | null) {

    if (page == 'NULL') {

      return this.http.get(Constantes.apiUrl + '/productos');

    } else {

      if(nombre == null && categoria == null && talla == null && color == null && tipo_uniforme == null && tipo_manga == null){
        return this.http.get(Constantes.apiUrl + '/productos?page=' + page);
      }else{
        return this.http.get(Constantes.apiUrl + '/productos/'+nombre+'/'+categoria+'/'+talla+'/'+color+'/'+tipo_uniforme+'/'+tipo_manga+'?page=' + page );
      }

    }

  }

  procesarPedido(datosCarrito: any[]): void {
    let headers = { 'Content-Type': 'application/json' };

    // Realizar una solicitud POST para procesar el pedido con los datos del carrito
    this.http.post(Constantes.apiUrl + '/subir-pedido', datosCarrito, { headers: headers })
      .subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor según sea necesario
          console.log(response);

          // Limpiar el carrito después de procesar el pedido
          localStorage.removeItem('carrito');

          // Redirigir o realizar otras acciones según tu lógica de la aplicación
          // Ejemplo:
          alert('El pedido ha sido procesado');
          this.router.navigate(['/productos']);
        },
        (error: any) => {
          console.log(error);
          // Manejar el error del servidor según sea necesario
        }
      );
  }

}
