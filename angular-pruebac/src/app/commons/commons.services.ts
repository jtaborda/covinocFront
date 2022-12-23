import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class CommonService {


  //Escucha de progress bar
  public loadingConfig: BehaviorSubject<{ enable: boolean, mode: string }> = new BehaviorSubject<{ enable: boolean, mode: string }>({ enable: false, mode: "indeterminate" });

  /*Constructor de la clase CommonService. */
  constructor( private snackbar: MatSnackBar, ) {
  }


  /**
   * Tomado de internet
   * 
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
