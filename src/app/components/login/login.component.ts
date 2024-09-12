import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

   // Services
   private readonly _AuthService=inject(AuthService)
   private readonly _FormBuilder=inject(FormBuilder)
   private readonly _Router = inject(Router)
 
   // properties
   isLoading:boolean=false;
   msgError:string=""
   msgsuccess:boolean=false
   getLoginSubscription!:Subscription
 
   // form group 
   loginForm:FormGroup=this._FormBuilder.group({
     email:[null,[Validators.required,Validators.email]],
     password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
   })

 //     name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
 //     email:new FormControl(null,[Validators.required,Validators.email]),
 //     password:new FormControl(null,[Validators.required,Validators.pattern(/^\[A-Z][a-z0-9]{6,10}$/)]),
 //     rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^\[A-Z][a-z0-9]{6,10}$/)]),
 //     phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
 
     
 //   },this.confirmPassword
 // );
 
 // methods
   loginSubmit():void{
     if(this.loginForm.valid){
       // console.log(this.loginForm.value)
     // console.log(this.loginForm)
     this.isLoading=true;
     this.getLoginSubscription=this._AuthService.setLoginForm(this.loginForm.value).subscribe(
       {
         next:(res)=>{
           if(res.message=="success"){
             setTimeout(()=>{
               this.msgsuccess=true
              //  1-save token 
               localStorage.setItem('userToken',res.token)

              //  2- decode token 

              // 3- navigation 
           this._Router.navigate(['/home'])
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
       this.loginForm.setErrors({mismatch:true})
       this.loginForm.markAllAsTouched()
     }
     
   }
   ngOnDestroy(): void {
    console.log("unsubscribe")
    this.getLoginSubscription?.unsubscribe()
  }

}
