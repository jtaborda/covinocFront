import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl ,FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../empleado.service';
import { Empleado } from '../empleado';
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
  empleado : Empleado = new Empleado;
  titulo :string= "Registro del Empleado";
  titulo2 :string= "Edición del Empleado";
  mensaje : boolean = false;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  edicionRegistro:string="";
  fechaRegistro:string="";

  id: any;
  validateForm!: FormGroup;
  constructor(    private actRoute: ActivatedRoute,private activateRouter: ActivatedRoute, 
    private empleadoService : EmpleadoService, private fb: FormBuilder,   private router: Router, private snackbar: MatSnackBar
    ) 
  {
    this.actRoute.paramMap.subscribe((params) => {
      this.id = params.get("id");
     });    
   }

   dateFormat: string = 'dd/MM/yyyy';
   listOfPaises= ['Colombia', 'Ecuador','Estados Unidos', 'Francia'];
   listOfTiposId= ['Cedula', 'Tarjeta identidad', 'Pasaporte'];
   listOfTArea= ['Administración', 'Financiera','Compras', 'Infraestructura','Operación','Talento Humano','Servicios Varios'];
   estado : string ='ACTIVO';
   correoCompleto : string="";

  public idControl = {
    primer_apellido : new FormControl([Validators.maxLength(20),Validators.required]),
    primer_nombre : new FormControl('', [Validators.maxLength(20),Validators.required]),
    area : new FormControl('', [Validators.maxLength(20)]),
    correo : new FormControl('', []),
    estado : new FormControl('', []),
    fecha_hora_ingreso: new FormControl('', []),
    fecha_ingreso : new FormControl('', []),
    identificacion : new FormControl('', []),
    otros_nombres : new FormControl('', [Validators.maxLength(20)]),
    pais : new FormControl('', []),    
    segundo_apellido : new FormControl('', [Validators.maxLength(20)]),
    tipo_identificacion : new FormControl('', []),

  }

  todayWithPipe = null;
  ngOnInit(): void {
  

    this.listener();
    this.cargar();
    var today = new Date();
 
    // obtener la fecha y la hora
     this.fechaRegistro=today.toLocaleString();  
    this.validateForm = this.fb.group(
      {
        primer_apellido: this.idControl.primer_apellido,
        primer_nombre: this.idControl.primer_nombre,
        identificacion : this.idControl.identificacion,
      });

  }
  
  onSubmit()
  {}

  listener()
  {
    this.idControl.primer_nombre.valueChanges.subscribe( item => {

      if(item=="" || item==undefined)
      {
        this.correoCompleto=""
      }
      else
     { this.correoCompleto= this.idControl.primer_nombre.value+"."+this.idControl.primer_apellido.value+"@cidenet.com.co";}
     } );
  
  }

  // realiza EL Llamado al Crear

  create():void{

    if(this.validateForm.valid)
    {
    this.empleado.primer_apellido=this.idControl.primer_apellido.value
    this.empleado.primer_nombre=this.idControl.primer_nombre.value
  this.correoCompleto= this.idControl.primer_nombre.value+"."+this.idControl.primer_apellido.value+"@cidenet.com.co";
    this.empleado.correo=this.correoCompleto
    this.empleado.area=this.idControl.area.value
    this.empleado.segundo_apellido=this.idControl.segundo_apellido.value
    this.empleado.estado='ACTIVO'
    this.empleado.fecha_hora_ingreso=this.fechaRegistro
    this.empleado.fecha_ingreso=this.idControl.fecha_ingreso.value
    this.empleado.identificacion=this.idControl.identificacion.value
    this.empleado.otros_nombres=this.idControl.otros_nombres.value   
    this.empleado.pais=this.idControl.pais.value
    this.empleado.tipo_identificacion=this.idControl.tipo_identificacion.value
    this.empleado.otros_nombres=this.idControl.otros_nombres.value   
    this.openSnackBar("Empleado Creado", "info");
    this.empleadoService.create(this.empleado).subscribe(    
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


  empleados : Empleado[] =[];
// realiza EL Llamado al buscar por id
  cargar():void{

    this.empleadoService.getAll().subscribe(
      data=>
      {
        this.empleados=data
         let editar =this.empleados.find((p)=>{return p.id ==this.id });    
         this.idControl.primer_apellido.setValue(editar?.primer_apellido)
         this.idControl.identificacion.setValue(editar?.identificacion)      
         this.idControl.primer_nombre.setValue(editar?.primer_nombre)
         this.idControl.area.setValue(editar?.area)
         this.idControl.segundo_apellido.setValue(editar?.segundo_apellido)
         this.idControl.correo.setValue(editar?.correo)
         this.idControl.estado.setValue(editar?.estado)
         this.idControl.fecha_ingreso.setValue(editar?.fecha_ingreso)
         this.idControl.otros_nombres.setValue(editar?.otros_nombres)
         this.idControl.pais.setValue(editar?.pais)
         this.idControl.tipo_identificacion.setValue(editar?.tipo_identificacion)
         this.idControl.fecha_hora_ingreso.setValue(editar?.fecha_hora_ingreso)
      }
   
    )
  }

// realiza EL Llamado al Update

update():void{
  if(this.validateForm.valid)
  {
    this.mensaje=true;
    this.empleado.id=this.id;
    this.empleado.primer_apellido=   this.idControl.primer_apellido.value;
    this.empleado.identificacion=   this.idControl.identificacion.value;
    this.empleado.primer_nombre=   this.idControl.primer_nombre.value;
    this.empleado.area=   this.idControl.area.value;
    this.empleado.segundo_apellido=   this.idControl.segundo_apellido.value;
    this.empleado.correo=   this.idControl.correo.value;
    this.empleado.estado=   this.idControl.fecha_ingreso.value;
    this.empleado.otros_nombres=   this.idControl.otros_nombres.value;
    this.empleado.pais=   this.idControl.pais.value;
    this.empleado.tipo_identificacion=   this.idControl.tipo_identificacion.value;
    this.empleado.fecha_hora_ingreso=   this.idControl.fecha_hora_ingreso.value;
    this.empleadoService.update(this.empleado).subscribe(    
      res=> this.router.navigate(['../listado'])    
    )

    this.openSnackBar("Empleado Actualizado", "info");
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
