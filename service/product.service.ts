import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/products', data);
  }
  ProductList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  delectOldProduct(id: any) {
    return this.http.delete<product[]>(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: any) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  PopularProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=6');
  }
  trendyProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
  searchProducts(query: any) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?name=${query}`
    );
  }
}
