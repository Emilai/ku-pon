import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  catSelected = '';
  constructor( private http: HttpClient) { }

  getCategories() {
    return this.http.get('../../assets/categories.json');
  }
}
