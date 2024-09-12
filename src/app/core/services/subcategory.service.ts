import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private readonly _HttpClient=inject(HttpClient)
  
  getAllSubCategories(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
  }
}

