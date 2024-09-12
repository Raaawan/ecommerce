import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgClass],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnDestroy {

   // Services
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)

   // properties 
  step:number=1
  isLoading:boolean=false;
  msgError:string=""

  // Subscription
  VerifyEmailSubscription!:Subscription
  VerifyCodeSubscription!:Subscription
  resetPasswordSubscription!:Subscription




  verifyEmail:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
  })

  verifyCode:FormGroup=this._FormBuilder.group({
    resetCode:[null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
  })

  resetPassword:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],

    

  })

  verifyEmailSubmit():void{
    if(this.verifyEmail.valid){
     this.isLoading=true;
      let emailValue=this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)
    this.VerifyEmailSubscription=this.VerifyEmailSubscription=this._AuthService.setverifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statusMsg==='success'){
          this.step=2
     this.isLoading=false;
        }
      }
      ,error:(err)=>{
        this.msgError=err.error.message

        console.log(err)
     this.isLoading=false;

      }
    })
    }
  }
  verifyCodeSubmit():void{
    if(this.verifyCode.valid){
     this.isLoading=true;

      this.VerifyCodeSubscription=this.VerifyCodeSubscription=this._AuthService.verifyCode(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status==='Success'){
            this.step=3
     this.isLoading=false;
          }
        }
        ,error:(err)=>{
          this.msgError=err.error.message

          console.log(err)
     this.isLoading=false;

        }
      })
    }
  }

  resetPasswordSubmit():void{
    if(this.resetPassword.valid){
     this.isLoading=true;

      this.resetPasswordSubscription=this.resetPasswordSubscription=this._AuthService.resetPass(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.isLoading=false;
          localStorage.setItem("userToken",res.token)
          this._AuthService.saveUserData()
          this._Router.navigate(["/home"])
     

        }
        ,error:(err)=>{
          this.msgError=err.error.message
          console.log(err)
     this.isLoading=false;

        }
      })
    }
  }

  ngOnDestroy(): void {
    this.VerifyEmailSubscription?.unsubscribe()
    this.VerifyCodeSubscription?.unsubscribe()
    this.resetPasswordSubscription?.unsubscribe()
  }
}
