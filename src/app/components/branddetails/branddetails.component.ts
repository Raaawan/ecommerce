import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { Ibrand } from '../../core/interfaces/ibrand';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branddetails',
  standalone: true,
  imports: [],
  templateUrl: './branddetails.component.html',
  styleUrl: './branddetails.component.css'
})
export class BranddetailsComponent implements OnInit,OnDestroy {
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _BrandsService=inject(BrandsService)
  getBrandSubscription!:Subscription
  getBrandIdSubscription!:Subscription
  detailsBrands:Ibrand|null=null

  ngOnInit(): void {
    this.getBrandSubscription=this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idBrand=p.get('id')
        this.getBrandIdSubscription=this._BrandsService.getSpecificBrand(idBrand).subscribe({
          next:(res)=>{
            this.detailsBrands=res.data


          }
          
        })

      }
    })
  
    
    
  }

  ngOnDestroy(): void {
    this.getBrandSubscription?.unsubscribe()
    this.getBrandIdSubscription?.unsubscribe()
    
  }




}
