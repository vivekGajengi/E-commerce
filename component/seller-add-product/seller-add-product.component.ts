import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}

  ngOnInit(): void {}

  addProduct(data: product) {
    console.log(data);
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = 'Product is Add successfully added';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }
}
