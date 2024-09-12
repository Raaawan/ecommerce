import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from "../products/products.component";
import { NavAuthComponent } from "../nav-auth/nav-auth.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, ProductsComponent, NavAuthComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {
  // Carousel
  customOptionsCategory: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
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
  private readonly _CategoriesService=inject(CategoriesService)

  // interfaces 
  categoryList:Icategory[]=[]

  // Subscription
  getAllcategorySubscription!:Subscription
 

 

  ngOnInit(): void {
    this.getAllcategorySubscription=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoryList=res.data
      }
    })
    
    
    
  }
  
  ngOnDestroy(): void {
    console.log("unsubscribe")
    this.getAllcategorySubscription?.unsubscribe()
  }
}
