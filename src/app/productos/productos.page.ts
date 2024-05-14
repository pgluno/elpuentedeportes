import { Component, Injector, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {


  carrito: any[] | null = [];

  productos: any;
  nombre : any;
  categoria : any;
  talla : any;
  color : any;
  tipo_uniforme : any;
  tipo_manga : any;

  cantidad_carrito : any;
  talla_carrito : any;
  color_carrito : any;
  sucursal_carrito : any;
  id_producto_carrito : any;
  nombre_producto_carrito : any;
  id_existencia : any;

  total_carrito : any;

  parametrosActuales : any;

  titulos: any[] = [];

  productos_iniciales : any;

  constructor(private injector: Injector, private activatedRoute: ActivatedRoute, private alertController: AlertController, private router: Router, private route: ActivatedRoute) {


    // Obtener los parámetros actuales de la URL y almacenarlos en el objeto
    this.route.params.subscribe(params => {
      this.parametrosActuales = params;
    });

    this.activatedRoute.queryParams.subscribe(params => {
      var page = this.activatedRoute.snapshot.paramMap.get('page');
      var nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
      var categoria = this.activatedRoute.snapshot.paramMap.get('categoria');
      var talla = this.activatedRoute.snapshot.paramMap.get('talla');
      var color = this.activatedRoute.snapshot.paramMap.get('color');
      var tipo_uniforme = this.activatedRoute.snapshot.paramMap.get('tipo_uniforme');
      var tipo_manga = this.activatedRoute.snapshot.paramMap.get('tipo_manga');
      console.log(page);


      if(nombre == null || nombre == '-' || nombre == 'undefined'){
        this.nombre = '';
      }

      if(color == null || color == '-' || color == 'undefined'){
        this.color = '';
      }

      if(categoria == null){
        this.categoria = '-';
      }else{
        this.categoria = categoria;
      }

      if(talla == null){
        this.talla = '-';
      }else{
        this.talla = talla;
      }


      if(tipo_uniforme == null){
        this.tipo_uniforme = '-';
      }else{
        this.tipo_uniforme = tipo_uniforme;
      }

      if(tipo_manga == null){
        this.tipo_manga = '-';
      }else{
        this.tipo_manga = tipo_manga;
      }

      // Se no se tienen parametros se puede llanar directamente al servicio sin la suscripcion de la ruta

      const productosService = this.injector.get(ProductosService)

      this.productos = productosService.getProductos(page, nombre, categoria, talla, color, tipo_uniforme, tipo_manga);


      $('.titulo_sucursal').each(function(index, element){
        if(index != 0){
          $(element).css('display', 'none');
        }else{
          $(element).css('border', '1px solid red');
        }
      })

    });


  }


  navegarPagina(numeroPagina: number) {
    // Construir la nueva URL con los parámetros almacenados en el objeto
    const url = `/productos/${numeroPagina}/${this.parametrosActuales.nombre || '-'}/${this.parametrosActuales.categoria || '-'}/${this.parametrosActuales.talla || '-'}/${this.parametrosActuales.color || '-'}/${this.parametrosActuales.tipo_uniforme || '-'}/${this.parametrosActuales.tipo_manga || '-'}`;

    // Navegar a la nueva URL
    this.router.navigateByUrl(url);
  }

  buscar_productos() {
    if( this.nombre != '' ){
      this.nombre = this.nombre;
    }else{
      this.nombre = '-';
    }

    if( this.color != '' ){
      this.color = this.color;
    }else{
      this.color = '-';
    }

    if( this.categoria != '-' ){
      this.categoria = this.categoria;
    }

    if( this.talla != '-' ){
      this.talla = this.talla;
    }

    if( this.tipo_uniforme != '-' ){
      this.tipo_uniforme = this.tipo_uniforme;
    }

    if( this.tipo_manga != '-' ){
      this.tipo_manga = this.tipo_manga;
    }


    // alert('/productos/1/nombre'+this.nombre+'/catgoria'+this.categoria+'/talla'+this.talla+'/color'+this.color+'/tipo_uniforme'+this.tipo_uniforme+'/tipo_manga'+this.tipo_manga);

    this.router.navigate(['/productos/1/'+this.nombre+'/'+this.categoria+'/'+this.talla+'/'+this.color+'/'+this.tipo_uniforme+'/'+this.tipo_manga]);

    if(this.nombre == '-'){
      this.nombre = '';
    }
    if(this.color == '-'){
      this.color = '';
    }

  }


  ngOnInit() {
    const self = this;

    // Usar una bandera para evitar múltiples clics
    let btnAgregarHabilitado = true;

    $('body').off('click', '.btn-agregar').on('click', '.btn-agregar', function(event) {
      event.preventDefault();

      if (btnAgregarHabilitado) {
        btnAgregarHabilitado = false;

        // Obtener los valores
        const cantidad_carrito = $(this).closest('ion-row').find('.cantidad').val();
        const talla_carrito = $(this).closest('ion-row').find('.talla_nombre').text();
        const color_carrito = $(this).closest('ion-row').find('.color_nombre').text();
        const id_producto_carrito = $(this).closest('ion-row').find('.id_producto').text();
        const nombre_producto_carrito = $(this).closest('ion-row').find('.nombre_producto').text();
        const id_existencia_carrito = $(this).closest('ion-row').find('.id_existencia').text();
        const sucursal_carrito = $(this).closest('ion-row').find('.sucursal_nombre').text();
        const tipo_uniforme_carrito = $(this).closest('ion-row').find('.tipo_uniforme_nombre').text();
        const tipo_manga_carrito = $(this).closest('ion-row').find('.tipo_manga_nombre').text();

        // Crear un objeto con los valores
        const producto = {
          cantidad: cantidad_carrito,
          talla: talla_carrito,
          color: color_carrito,
          id_producto: id_producto_carrito,
          nombre_producto: nombre_producto_carrito,
          id_existencia: id_existencia_carrito,
          sucursal: sucursal_carrito,
          tipo_uniforme: tipo_uniforme_carrito,
          tipo_manga: tipo_manga_carrito,
        };

        // Recuperar el array actual del localStorage o crear uno vacío si no existe
        const carritoString = localStorage.getItem('carrito');
        const carrito = carritoString ? JSON.parse(carritoString) : [];

        // Agregar el nuevo producto al array
        carrito.push(producto);

        // Almacenar el array actualizado en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar el array del componente
        self.carrito = carrito;

        console.log(carrito);

        // Calcular el total_carrito
        self.total_carrito = 0;
        carrito.forEach((element: any) => {
          self.total_carrito += parseInt(element.cantidad);
        });

        // Actualizar la visualización del carrito
        $('.carrito span').html(self.total_carrito);

        // Habilitar el botón después de un breve retraso
        setTimeout(() => {
          btnAgregarHabilitado = true;
        }, 500);
      }
    });
  }



  ngAfterViewChecked(): void {
        this.titulos = []; // Initialize the titulos array

    $('.titulo_sucursal').each((index: number, element: HTMLElement) => {


      if(this.titulos.includes($(element).text())){
        $(element).css('display', 'none');
      }else{
        $(element).css('display', 'block');
      }

      this.titulos.push( $(element).text() );


      // Obtener datos del localStorage y asignar a productos_iniciales
      const localStorageData = localStorage.getItem('carrito');
      this.productos_iniciales = localStorageData ? JSON.parse(localStorageData) : [];

      // Actualizar el total_carrito
      this.total_carrito = 0;
      this.productos_iniciales.forEach((element: any) => {
        this.total_carrito += parseInt(element.cantidad);
      });

      $('.carrito span').html(this.total_carrito);




    });

  }



}
