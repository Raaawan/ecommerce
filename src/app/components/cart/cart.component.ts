import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import { error } from 'console';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit,OnDestroy{

  // services
  private readonly _CartService=inject(CartService)
  private readonly _ROuter=inject(Router)

  // interface
  cartItems:Icart|null=null

  // properties
  cartItemNumber:number=0
  
  // Subscription
  getProductToCartSubscription!:Subscription
  deleteProductToCartSubscription!:Subscription
  UpdateSpecifcProductFromCartSubscription!:Subscription
  deleteFormSubscription!:Subscription
  



  ngOnInit(): void {
    this.getProductToCartSubscription=this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.cartItems=res.data
        this.cartItemNumber=res.numOfCartItems
      }
    })
  }

  removeItem(id:string):void{
    this.deleteProductToCartSubscription=this._CartService.deleteSpecificProductFromCart(id).subscribe({
      next:(res)=>{
        this.cartItems=res.data
        this.cartItemNumber=res.numOfCartItems
        this._CartService.cartNumber.next(res.numOfCartItems)
      }
    })

  }

  updateCount(id:string,count:number):void{
    if(count>0){
      this.UpdateSpecifcProductFromCartSubscription=this._CartService.UpdateProductFromCart(id,count).subscribe({
        next:(res)=>{
          console.log(res)
          this.cartItems=res.data
        this.cartItemNumber=res.numOfCartItems

        }
      })
    }
    else{
      this.removeItem(id)
    }
  }

  clearForm():void{
    this.deleteFormSubscription=this._CartService.deleteCart().subscribe({
      next:(res)=>{
        if(res.message==="success"){
          this.cartItems=null
        this._CartService.cartNumber.next(0)
          this._ROuter.navigate(["/home"])

        }
      }
    
    })
  }

  ngOnDestroy():void{
    this.getProductToCartSubscription?.unsubscribe()
    this.deleteProductToCartSubscription?.unsubscribe()
    this.UpdateSpecifcProductFromCartSubscription?.unsubscribe()
    this.deleteFormSubscription?.unsubscribe()
    

  }
}
