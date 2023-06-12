import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/message.service';
import { ConversionService } from '../../services/conversion.service';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {
  conversiones = [];
  disabled:boolean=false;
  form: FormGroup;
  fechaActual:string;
  constructor(private fb:FormBuilder , private toastService:ToastService, private conversionService:ConversionService) { 
    this.fechaActual = this.getCurrentDate();
    this.form = this.fb.group({
      valor:['',[Validators.required]],
      fecha:['',[Validators.required]]
    })

  }

  ngOnInit(): void {
    this.conversionService.misConversiones().subscribe((res:any)=>{
      
        this.conversiones = res.data
        
    })
  }

  convertir(){
    this.disabled = true;
    if (this.form.valid) {
        
        this.conversionService.convertirUf(this.form.getRawValue()).subscribe({
          next:(res:any)=>{


            this.toastService.showSuccess ('Conversión realizada exitosamente')
            this.disabled = false;
            this.ngOnInit()

            
          },
          error:(error:any)=>{
            this.disabled = false;
          }
        })
    }else{
      this.disabled = false;

      this.toastService.showWarn("Debe completar todos los campos para realizar la conversion")
    }

  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
