import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  titulo: string = 'App Angular';

  constructor(public authService: AuthService) {}

  logout(): void {
    let nombre = this.authService.usuario.nombre;
    swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${nombre} has cerrado sesión con éxito!`,
      showConfirmButton: false,
      timer: 1500,
    });
    this.authService.logout();
    location.reload();
  }
}
