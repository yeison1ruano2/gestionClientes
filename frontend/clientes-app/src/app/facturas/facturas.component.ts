import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {
  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();
  autoCompleteControl = new FormControl('');
  productos: string[] = [
    'Mesa',
    'Tablet',
    'Sony',
    'Samsung',
    'Tv LG',
    'Bicicleta',
  ];
  productosFiltrados!: Observable<string[]>;

  constructor(
    private clienteServices: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = Number(params.get('clienteId'));
      this.clienteServices.getCliente(clienteId).subscribe((cliente) => {
        this.factura.cliente = cliente;
      });
    });
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
