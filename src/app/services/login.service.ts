import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constantes } from './constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  datos_usuario : any;

  constructor(private http: HttpClient, private router: Router) {

  }

  setLogin(data: any | null) {


    let headers = { "Content-Type": "application/x-www-form-urlencoded" };

    const params = new HttpParams(
      {
        fromObject:
        {
          'email': data.email,
          'password': data.password,
        }
      }
    );


    this.http.post(Constantes.apiUrl + '/login', params, { headers: headers })
    .subscribe(
      (response: any) => {
        this.datos_usuario = response[0]; // Assuming response is an object

        console.log(this.datos_usuario);

        // Clear existing user data from localStorage
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('tipo_usuario');

        // Set user data in localStorage
        localStorage.setItem('id', this.datos_usuario['id']);
        localStorage.setItem('email', this.datos_usuario['email']);
        localStorage.setItem('name', this.datos_usuario['name']);
        localStorage.setItem('tipo_usuario', this.datos_usuario['tipo_usuario']);

        if (
          this.datos_usuario['tipo_usuario'] === 'ser_administrador' ||
          this.datos_usuario['tipo_usuario'] === 'ser_cliente'
        ) {
          this.router.navigate(['/productos']);
        } else {
          alert('Usuario o contraseña incorrectos');
          // Handle invalid user or password scenario
          // Depending on your application logic, you might want to handle this differently
          // For instance, displaying an error message or performing other actions.
        }
      },
      (error: any) => {
        console.log(error);
        alert('Usuario o contraseña incorrectos');
        // Handle the error response from the server (e.g., display an error message)
      }
    )};

}
