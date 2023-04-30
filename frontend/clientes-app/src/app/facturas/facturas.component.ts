import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { FacturaService } from '../services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {
  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();
  autoCompleteControl = new FormControl('');
  productos: string[] = [];
  productosFiltrados!: Observable<Producto[]>;

  constructor(
    private clienteServices: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = Number(params.get('clienteId'));
      this.clienteServices.getCliente(clienteId).subscribe((cliente) => {
        this.factura.cliente = cliente;
      });
    });
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      map((value: any) => (typeof value == 'string' ? value : value.nombre)),
      flatMap((value) => (value ? this._filter(value || '') : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.cargarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    let nuevoItem = new ItemFactura();
    nuevoItem.producto = producto;
    this.factura.items?.push(nuevoItem);
    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }
}
