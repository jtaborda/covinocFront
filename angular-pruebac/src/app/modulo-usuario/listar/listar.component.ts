import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../../empleado.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  empleados : Empleado[] =[];
  mensaje : boolean = false;
  constructor(private empleadoService : EmpleadoService,    private snackbar: MatSnackBar) { }
  titulo :string= "Listado de Empleados";
  ngOnInit(): void {
    this.empleadoService.getAll().subscribe(
      data=>
      {this.empleados=data
        console.log(this.empleados)
      }
   
    )
 
  }
  durationInSeconds = 5;
  titulo2 :string= "Listado de Empleados";
delete(empleado : Empleado):void{
  this.empleadoService.delete(empleado.id).subscribe(
rest=>this.empleadoService.getAll().subscribe(
  response=>this.empleados=response
)
  );
  this.openSnackBar("Empleado Eliminado", "info");
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
