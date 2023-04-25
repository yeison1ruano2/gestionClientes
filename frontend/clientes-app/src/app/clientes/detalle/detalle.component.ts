import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente!:Cliente;
  fotoSeleccionada!:File;
  public progreso:number=0;
  public titulo:string="Detalle cliente";
  constructor(private clienteService:ClienteService,
    public modalService:ModalService,
    public authService:AuthService) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event:any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso=0;
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal.fire('Error:','El archivo debe ser de tipo imagen','error');
      this.fotoSeleccionada = new File([], "");
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal.fire('Error upload: ', 'Debes seleccionar una foto',"error");
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id).subscribe(event=>{
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total!)*100);
        }else if (event.type === HttpEventType.Response){
          let response:any=event.body;
          this.cliente=response.cliente as Cliente;
          this.modalService.notificarUpload.emit(this.cliente);
          swal.fire('La foto se ha subido completamente','',"success");
        }
      })
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = new File([], "");
    this.progreso=0;
  }

}
