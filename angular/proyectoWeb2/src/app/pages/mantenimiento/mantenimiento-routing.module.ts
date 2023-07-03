import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [{ path: 'index', component: MantenimientoComponent},{path: "cliente", component: ClientesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
