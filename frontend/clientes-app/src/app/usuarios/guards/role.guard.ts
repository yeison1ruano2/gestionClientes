import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService:AuthService,
              private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.isAuthenticated()){
        if(this.isTokenExpirado()){
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      let role = route.data['role'] as string;
      if(this.authService.hasRole(role)){
        return true;
      }
      swal.fire('Acceso denegado',`${this.authService.usuario.nombre} no tienes acceso a este recurso!`,'warning');
      this.router.navigate(['/clientes']);
      return false;
  }

  isTokenExpirado():boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token!);
    let now = new Date().getTime()/1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }
}
