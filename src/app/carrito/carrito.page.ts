import { Component, Injector, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  total_carrito: any;
  productos: any;




  constructor(private injector: Injector) {}

  ngOnInit() {



    // Obtener datos del localStorage y asignar a productos
    const localStorageData = localStorage.getItem('carrito');
    this.productos = localStorageData ? JSON.parse(localStorageData) : [];

    // Actualizar el total_carrito
    this.actualizarTotalCarrito();
  }

  eliminar_producto(idExistencia: string) {
    // Filtrar los productos para excluir el que se desea eliminar
    this.productos = this.productos.filter(
      (producto: any) => producto.id_existencia !== idExistencia
    );

    // Actualizar el localStorage con la nueva lista de productos
    this.actualizarLocalStorage();
  }

  private actualizarTotalCarrito() {
    this.total_carrito = this.productos.reduce(
      (total: number, producto: any) => total + parseInt(producto.cantidad),
      0
    );
  }

  procesarPedido() {



    // Obtener una instancia del servicio en el método
    const productosService = this.injector.get(ProductosService);

    // Actualizar el valor del 'carrito' en el localStorage
    this.actualizarLocalStorage();

    // Convertir la propiedad 'cantidad' de todos los productos a cadena
    this.productos.forEach((producto: any) => {
      producto.cantidad = producto.cantidad.toString();
    });


  // Obtener todas las claves del localStorage
  const keys = Object.keys(localStorage);

  // Crear un array para almacenar los pares clave-valor
  const localStorageArray: any[] = [];

  // Iterar sobre las claves y agregar los pares clave-valor al array
  keys.forEach(key => {
    localStorageArray.push({ key, value: localStorage.getItem(key) });
  });

  // Mostrar los elementos obtenidos en formato de array
  console.log(localStorageArray);

    // Llamar al método de procesarPedido del servicio
    productosService.procesarPedido(localStorageArray)
  }

  private actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }





}
