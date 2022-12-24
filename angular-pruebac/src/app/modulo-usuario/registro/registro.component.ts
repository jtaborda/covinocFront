import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl ,FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { usuarioService } from '../../usuario.service';
import { Usuario } from '../usuario';
import { Router,ActivatedRoute } from '@angular/router';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Console } from 'console';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario : Usuario = new Usuario;
  titulo :string= "Registro del Usuario";
  titulo2 :string= "Edición del Usuario";
  mensaje : boolean = false;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  edicionRegistro:string="";
  fechaRegistro:string="";

  id: any;
  validateForm!: FormGroup;
  constructor(    private actRoute: ActivatedRoute,private activateRouter: ActivatedRoute, 
    private usuarioService : usuarioService, private fb: FormBuilder,   private router: Router, private snackbar: MatSnackBar
    ) 
  {
    this.actRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
     });    
   }

   dateFormat: string = 'dd/MM/yyyy';
   correoCompleto : string="";
   listaGenero = [
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Masculino', value: 'Masculino' },
  ];
  public idControl = {
    nombre : new FormControl([Validators.maxLength(20),Validators.required]),
    correo : new FormControl('', []),
    fecha_hora_ingreso: new FormControl('', []),
    identificacion : new FormControl('', []),
    genero : new FormControl('', [Validators.required]),
    telefono : new FormControl('', [Validators.required]),
  }

  todayWithPipe = null;
  ngOnInit(): void {
    this.cargar();
    var today = new Date();
 
    // obtener la fecha y la hora
     this.fechaRegistro=today.toLocaleString();  
    this.validateForm = this.fb.group(
      {
        nombre: this.idControl.nombre,
        correo: this.idControl.correo,
        identificacion : this.idControl.identificacion,      
        fecha_hora_ingreso: this.idControl.fecha_hora_ingreso,     
        genero : this.idControl.genero,
        telefono :  this.idControl.telefono,

      });

  }
  
  onSubmit()
  {}

  // realiza EL Llamado al Crear

  create():void{

    if(this.validateForm.valid)
    {
    this.usuario.nombre=this.idControl.nombre.value
    this.usuario.correo=this.idControl.correo.value
     this.usuario.identificacion=this.idControl.identificacion.value
     this.usuario.genero=this.idControl.genero.value
     this.usuario.telefono=this.idControl.telefono.value

    this.openSnackBar("Usuario Creado", "info");
    this.usuarioService.create(this.usuario).subscribe(    
      res=> this.router.navigate(['../listado'])    
    )


    }
    else
    {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  usuarios : Usuario[] =[];
// realiza EL Llamado al buscar por id
  cargar():void{

    this.usuarioService.getAll().subscribe(
      data=>
      {
        this.usuarios=data
         let editar =this.usuarios.find((p)=>{return p.id ==this.id });    
         this.idControl.identificacion.setValue(editar?.identificacion)    
         this.idControl.correo.setValue(editar?.correo)
         this.idControl.telefono.setValue(editar?.telefono)    
         this.idControl.genero.setValue(editar?.genero)
         this.idControl.nombre.setValue(editar?.nombre)
      }
   
    )
  }

// realiza EL Llamado al Update

update():void{
  if(this.validateForm.valid)
  {
    this.mensaje=true;
    this.usuario.id=this.id;
    this.usuario.nombre=   this.idControl.nombre.value;
    this.usuario.identificacion=   this.idControl.identificacion.value;
    this.usuario.correo=   this.idControl.correo.value;
    this.usuario.telefono=   this.idControl.telefono.value;
    this.usuario.genero=   this.idControl.genero.value;
    this.usuarioService.update(this.usuario).subscribe(    
      res=> this.router.navigate(['../listado'])    
    )

    this.openSnackBar("Usuario Actualizado", "info");
  }
  else
  {
    Object.values(this.validateForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
  }



  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

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
