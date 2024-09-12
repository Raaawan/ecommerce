import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {

  // Services
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router = inject(Router)

  // properties
  isLoading:boolean=false;
  msgError:string=""
  msgsuccess:boolean=false
  getRegisterSubscription!:Subscription

  // form group 
  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null,[Validators.required]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  },{
    validators:this.confirmPassword
  })
//   registerForm:FormGroup=new FormGroup({
//     name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
//     email:new FormControl(null,[Validators.required,Validators.email]),
//     password:new FormControl(null,[Validators.required,Validators.pattern(/^\[A-Z][a-z0-9]{6,10}$/)]),
//     rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^\[A-Z][a-z0-9]{6,10}$/)]),
//     phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

    
//   },this.confirmPassword
// );

// methods
  registerSubmit():void{
    if(this.registerForm.valid){
      // console.log(this.registerForm.value)
    // console.log(this.registerForm)
    this.isLoading=true;
    this.getRegisterSubscription=this._AuthService.setRegisterForm(this.registerForm.value).subscribe(
      {
        next:(res)=>{
          if(res.message=="success"){
            setTimeout(()=>{
              this.msgsuccess=true
          this._Router.navigate(['/login'])
            ,1000})
          }
          this.isLoading=false
          //login
        },
        error:(err)=>{
          this.msgError=err.error.message
          this.isLoading=false


        }
      }
    )

    }
    else{
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
    
  }
  ngOnDestroy(): void {
    console.log("unsubscribe")
    this.getRegisterSubscription?.unsubscribe()
  }
  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value===g.get('rePassword')?.value){
      return null
    }
    else{
      return{mismatch:true}
    }
  }
}
