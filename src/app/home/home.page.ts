import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public loginForm : FormGroup;

  constructor(private injector: Injector, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router : Router) {

    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })

  }

  ngOnInit() {}




  doLogin(data : any | null) {


    const loginService = this.injector.get(LoginService)

    loginService.setLogin(data);


  }



}
