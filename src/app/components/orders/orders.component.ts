import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { error } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit,OnDestroy {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
  cartId:string|null=""
  msgError:string=""

  orders:FormGroup=this._FormBuilder.group({
    details:[null,[Validators.required,Validators.minLength(3)]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null,[Validators.required,Validators.minLength(3)]],
  })

  ordersSubscription!:Subscription
  ordersSubmitSubscription!:Subscription

  ngOnInit(): void {
   this.ordersSubscription= this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId=params.get('id')
        
      }
    })
    
  }
  ordersSubmit():void{
    console.log(this.orders.value)
   this.ordersSubmitSubscription= this._OrdersService.checkOut(this.cartId,this.orders.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status==='success'){
          window.open(res.session.url,"_self")
        }
      }
    })
  }
ngOnDestroy(): void {
  this.ordersSubscription?.unsubscribe()
  this.ordersSubmitSubscription?.unsubscribe()
  
}
}
