import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[]=[];
  paginador:any;

  constructor(private clienteSrvice:ClienteService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params =>{
      let page=Number(params.get('page'));
      if(!page) {
        page=0;
      }
      this.clienteSrvice.getClientes(page).pipe(
        tap((response:any) =>{
          console.log("ClienteService: tap 1");
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });
        })
      ).subscribe(
        response=> {
          this.clientes=response.content as Cliente[];
          this.paginador=response;
        }
      );
    })
  }

  deleteCliente(cliente:Cliente):void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteSrvice.deleteCliente(cliente.id!).subscribe(
          response=>{
            this.clientes=this.clientes.filter(cli=> cli !== cliente)
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Cliente ${cliente.nombre} eliminado con éxito`,
              showConfirmButton: false,
              timer: 1500
            })
          }
        )
      }
    })
  }

}
