import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { layoutGuard } from './core/guards/layout.guard';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { BranddetailsComponent } from './components/branddetails/branddetails.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';

export const routes: Routes = [
    {path:"",component:AuthLayoutComponent,canActivate:[layoutGuard],children:[
    {path:"",redirectTo:'login',pathMatch:'full'},
    {path:"login",component:LoginComponent,title:"login"},
    {path:"register",component:RegisterComponent,title:"register"},
    {path:"forgetPassword",loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((c)=>c.ForgetpasswordComponent),title:"forget password"},
    ]},
    {path:"",component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:"",redirectTo:'home',pathMatch:'full'},
    {path:"home",component:HomeComponent,title:"home"},
    {path:"cart",component:CartComponent,title:"cart",children:[
        {path:"allorders",loadComponent:()=>import('./components/allorders/allorders.component').then((c)=>c.AllordersComponent),title:"All Orders"},

    ]},
    {path:"products",component:ProductsComponent,title:"products"},
    {path:"categories",component:CategoriesComponent,title:"categories"},
    {path:"wishList",loadComponent:()=>import('./components/wish-list/wish-list.component').then((c)=>c.WishListComponent),title:"wishList"},
    {path:"brands",component:BrandsComponent,title:"brands"},
    {path:"subcategory/:id",loadComponent:()=>import('./components/subcategory/subcategory.component').then((c)=>c.SubcategoryComponent),title:"sub category"},
    {path:"productDetails/:id",component:ProductdetailsComponent,title:"product Details"},
    {path:"brandDetails/:id",component:BranddetailsComponent,title:"brand Details"},
    {path:"categoryDetails/:id",component:CategorydetailsComponent,title:"category Details"},
    {path:"orders/:id",component:OrdersComponent,title:"order Details"},
    ]},
    {path:"**",component:ErrorComponent,title:"error"},
];
