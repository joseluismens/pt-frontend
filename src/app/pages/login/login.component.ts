import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form :FormGroup;
  constructor(private fb:FormBuilder, private toastService:ToastService, private authService :AuthService, private router:Router) { 
    this.form = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login(){
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe({
        next:(res:any)=>{
          this.toastService.showSuccess("Sesión iniciada exitosamente!");
          this.router.navigate(['/conversion']);
          
        },
        error:((error:any)=>{
          console.log(error.message);
          
          //this.toastService.showError(error.message)
        })
      })
    }else{
      this.toastService.showInfo("Debes completar todos los campos");
    }
  }
}
