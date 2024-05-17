import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularProduct: undefined | product[];
  trendyProduct: undefined | product[];
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.PopularProduct().subscribe((data) => {
      this.popularProduct = data;
    });
    this.product.trendyProduct().subscribe((data) => {
      this.trendyProduct = data;
    });
  }
}
