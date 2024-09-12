import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit ,OnDestroy {

  countNumber:number=0
  readonly _AuthService=inject(AuthService)
  private readonly _CartService=inject(CartService)
  cartNumberSubscription!:Subscription

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        this._CartService.cartNumber.next(res.numOfCartItems)
      }
    })
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.countNumber=data
      }
    })
  }
  ngOnDestroy(): void {
    this.cartNumberSubscription?.unsubscribe()
    
  }
}
