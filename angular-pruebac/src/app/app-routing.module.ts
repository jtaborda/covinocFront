import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './modulo-usuario/registro/registro.component';
import { ListarComponent } from './modulo-usuario/listar/listar.component';
const routes: Routes = [{
  path: 'registro/:id',
  component: RegistroComponent
},

{
  path: 'listado',
  component: ListarComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
