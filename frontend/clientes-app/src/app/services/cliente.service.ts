import  swal  from 'sweetalert2';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable,tap,throwError} from 'rxjs';
import { Cliente } from '../clientes/cliente';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint:string='http://localhost:8080/api/clientes';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient,private router:Router) { }

  getClientes(page:number):Observable<any>{
    return this.http.get<Cliente[]>(`${this.urlEndpoint}/page/${page}`).pipe(
      tap((response:any)=>{
       (response.content as Cliente[]).forEach(cliente=>{
        console.log(cliente.nombre);
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
    return this.http.post(`${this.urlEndpoint}`,cliente,{headers:this.httpHeaders}).pipe(
      map((response:any) =>response.cliente as Cliente),
      catchError(e=>{
        if(e.status==400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

  getCliente(id:number):Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

  updateCliente(cliente:Cliente):Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

  deleteCliente(id:number):Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }
}
