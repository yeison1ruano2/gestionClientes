import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../facturas/models/factura';
import { Observable } from 'rxjs';
import { Producto } from '../facturas/models/producto';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private urlEndpoint: string = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) {}

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndpoint}/${id}`);
  }

  deleteFactura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndpoint}/${id}`);
  }

  cargarProductos(term: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.urlEndpoint}/cargar-productos/${term}`
    );
  }
}
