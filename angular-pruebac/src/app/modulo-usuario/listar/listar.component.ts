import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { usuarioService } from '../../usuario.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  usuario : Usuario[] =[];
  mensaje : boolean = false;
  constructor(private usuarioService : usuarioService,    private snackbar: MatSnackBar) { }
  titulo :string= "Listado de Usuario";
  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(
      data=>
      {this.usuario=data
        console.log(this.usuario)
      }
   
    )
 
  }
  durationInSeconds = 5;
  titulo2 :string= "Listado de Usuarios";
delete(Usuario : Usuario):void{
  this.usuarioService.delete(Usuario.id).subscribe(
rest=>this.usuarioService.getAll().subscribe(
  response=>this.usuario=response
)
  );
  this.openSnackBar("Usuario Eliminado", "info");
}



/**
   * Tomado de internet 
   * Mensaje tipo material snack bar
   * @param message Contenido del mensaje
   * @param sbStyle tipo de estilo (info,warn, error)
   * @param duration Duración del mensaje en milisegundos
   * @param action Acción del snackbar
   */

 public openSnackBar(message: string = "", sbStyle: string = 'info', duration: number = 10000, action: string = ""): void {
  duration = (duration == 10000 && sbStyle != 'info') ? 20000 : duration;
  let panelStyle;
  switch(sbStyle){
    case 'info':
      panelStyle = 'snackStyleInfo';
      break;
    case 'warn':
      panelStyle = 'snackStyleWarning';
      break;
    case 'warning':
        panelStyle = 'snackStyleWarning';
        break;
    default :
        panelStyle = 'snackStyleError';
  }
  if (message != null && message.length > 1) {
    this.snackbar.open(message, action, {
      duration: duration, panelClass: panelStyle, horizontalPosition: 'center'
    });
  }
  else {
    this.snackbar.dismiss();
  }
}


}
