import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { FacturaService } from '../services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';
import swal from 'sweetalert2';

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
    private facturaService: FacturaService,
    private router: Router
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
    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }
    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto?.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto?.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto?.id) {
        ++item.cantidad;
      }
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter(
      (item: ItemFactura) => id != item.producto?.id
    );
  }

  create(): void {
    this.facturaService.create(this.factura).subscribe((factura) => {
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Factura ${factura.descripcion} creada con éxito!`,
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/clientes']);
    });
  }
}
