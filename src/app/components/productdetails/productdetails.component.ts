import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartComponent } from '../cart/cart.component';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CarouselModule,CartComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit,OnDestroy {

  // CarouselModule
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
  // services 
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService=inject(ProductsService)
  private readonly _CartService=inject(CartService)

   // properties
   getProductSubscription!:Subscription
   getProductIdSubscription!:Subscription
   addProductToCartSubscription!:Subscription

  //  interfaces 
  detailsProduct:Iproduct|null=null

  addProductToCart(id:string){
    this.addProductToCartSubscription=this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._CartService.cartNumber.next(res.numOfCartItems)
  
        
      }
    })
  }

   ngOnInit(): void {
    this.getProductSubscription=this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idProduct=p.get('id')
        this.getProductIdSubscription=this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next:(res)=>{
            this.detailsProduct=res.data


          }
          
        })

      }
    })
  
    
    
  }

  ngOnDestroy(): void {
    this.getProductIdSubscription?.unsubscribe()
    this.getProductSubscription?.unsubscribe()
    
  }

}
