import  swal  from 'sweetalert2';
import { HttpClient, HttpEvent, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable,tap,throwError} from 'rxjs';
import { Cliente } from '../clientes/cliente';
import { Router } from '@angular/router';
import { Region } from '../clientes/region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint:string='http://localhost:8080/api/clientes';

  constructor(private http:HttpClient,private router:Router) { }


  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlEndpoint}/regiones`)
  }

  getClientes(page:number):Observable<any>{
    return this.http.get<Cliente[]>(`${this.urlEndpoint}/page/${page}`).pipe(
      tap((response:any)=>{
       (response.content as Cliente[]).forEach(cliente=>{
       })
      }),
      map((response:any)=>{
        (response.content as Cliente[]).map(cliente=>{
          cliente.nombre=cliente.nombre?.toUpperCase();
          //cliente.fecha=formatDate(cliente.fecha!, 'mediumDate','en-US');
          //cliente.fecha!=this.datePipe.transform(cliente.fecha!,'dd/MM/yyyy');
          return cliente;
         });
         return response;
      })
    )
  }

  create(cliente:Cliente):Observable<Cliente> {
    return this.http.post(`${this.urlEndpoint}`,cliente).pipe(
      map((response:any) =>response.cliente as Cliente),
      catchError(e=>{
        if(e.status==400) {
          return throwError(e);
        }
        if(e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getCliente(id:number):Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    );
  }

  updateCliente(cliente:Cliente):Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`,cliente).pipe(
      catchError(e=>{
        if(e.status==400) {
          return throwError(e);
        }
        if(e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  deleteCliente(id:number):Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`);
  }

  subirFoto(archivo:File, id:any) :Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST',`${this.urlEndpoint}/upload`,formData,{
      reportProgress:true
    });
    return this.http.request(req);
  }


}
