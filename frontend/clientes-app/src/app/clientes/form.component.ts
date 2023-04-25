import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: { display: { dateInput: 'YYYY-MM-DD' } } },
    { provide: MomentDateAdapter }
  ]
})
export class FormComponent implements OnInit {

  public cliente:Cliente=new Cliente();
  regiones!:Region[];
  public titulo:string="Crear Cliente";
  public errores:string[]=[];
  public miDatepick:any;

  constructor(private clienteService:ClienteService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.cargarCliente();
    this.cargarRegiones();
  }

  cargarRegiones():void{
    this.clienteService.getRegiones().subscribe(regiones=>this.regiones=regiones);
  }


  cargarCliente():void {
    this.activatedRoute.params.subscribe(params=> {
      let id=params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente)=> this.cliente=cliente)
      }
    })
  }

  updateCliente():void {
    this.clienteService.updateCliente(this.cliente).subscribe(json=>{
      this.router.navigate(['/clientes']);
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${json.mensaje}: ${json.cliente.nombre}`,
        showConfirmButton: false,
        timer: 1500
      })
    },
    err=>{
      this.errores=err.error.errors as string[];
    })
  }

  create():void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `El cliente ${cliente.nombre} ha sido creado con éxito`,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/clientes'])
      },
      err=>{
        this.errores=err.error.errors as string[];
      }
    )
  }

  compararRegion(o1:Region,o2:Region):boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1==null || o2==null? false: o1.id===o2.id;
  }

}
