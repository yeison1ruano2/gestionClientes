import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo:string = "Login";
  usuario:Usuario;

  constructor(private router:Router,private authService:AuthService) {
    this.usuario=new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire('Login',`${this.authService.usuario.nombre} ya estas autenticado!`,'info');
      this.router.navigate(['/clientes']);
    }
  }

  login():void{
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Login','Username o password vacías!','error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      swal.fire('Login',`Bienvenido ${usuario.nombre}`,'success');
      this.router.navigate(['/clientes']);
    }
    ,error =>{
      if(error.status == 400){
        swal.fire('Error Login','Usuario o clave incorrectas!','error');
      }
    });
  }




}
