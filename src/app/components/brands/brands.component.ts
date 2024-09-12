import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Ibrand } from '../../core/interfaces/ibrand';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit,OnDestroy {
  //interfaces
  brandsList:Ibrand[]=[]

  // services
  private readonly _BrandsService =inject(BrandsService)

  //properties
  text:string=""

  // Subscription
  getAllBrandsSubscription!:Subscription
  getspecificBrandSubscription!:Subscription

  ngOnInit(): void {
    this.getAllBrandsSubscription=this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.brandsList=res.data
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllBrandsSubscription?.unsubscribe()

  
}

}
