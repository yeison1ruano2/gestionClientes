import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';

const routes: Routes = [
  {path: '', redirectTo:'/clientes', pathMatch:'full'},
  {path:'directivas',component:DirectivaComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/page/:page',component:ClientesComponent},
  {path:'clientes/form', component:FormComponent},
  {path:'clientes/form/:id', component:FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
