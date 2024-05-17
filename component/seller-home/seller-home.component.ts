import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.ProductList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
  delectProduct(id: any) {
    this.product.delectOldProduct(id).subscribe((result) => {
      console.log(result);
      this.product.ProductList().subscribe((result) => {
        if (result) {
          this.productList = result;
        }
      });
    });
  }
  update(id: any) {
    console.log('id', id);
  }
}
