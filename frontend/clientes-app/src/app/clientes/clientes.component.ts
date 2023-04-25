import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[]=[];
  paginador:any;
  clienteSeleccionado!:Cliente;

  constructor(private clienteSrvice:ClienteService,
    private activatedRoute:ActivatedRoute,
    private modalService:ModalService,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params =>{
      let page=Number(params.get('page'));
      if(!page) {
        page=0;
      }
      this.clienteSrvice.getClientes(page).pipe(
        tap((response:any) =>{
          (response.content as Cliente[]).forEach(cliente => {
          });
        })
      ).subscribe(
        response=> {
          this.clientes=response.content as Cliente[];
          this.paginador=response;
        }
      );
    })

    this.modalService.notificarUpload.subscribe(cliente=>{
      this.clientes=this.clientes.map(clienteOriginal=>{
        if(cliente.id==clienteOriginal.id){
          clienteOriginal.foto=cliente.foto;
        }
        return clienteOriginal;
      })
    });
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

  abrirModal(cliente:Cliente) {
    this.clienteSeleccionado=cliente;
    this.modalService.abrirModal();
  }

}
