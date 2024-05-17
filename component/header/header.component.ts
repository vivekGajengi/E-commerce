import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menutype: string = 'default';
  sellerName: string = 'vivek';
  searchResult: undefined | product[];
  searchedInput: any;
  userName: string = '';

  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log('in seller area');
          this.menutype = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            let sellerName = sellerData.name;
            this.menutype = 'seller';
          } else if (localStorage.getItem('users')) {
            let userStore = localStorage.getItem('users');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menutype = 'users';
          } else {
            this.menutype = 'default';
          }
        }
      }
    });
  }
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        this.searchResult = result;
      });
    }
  }
  hidesuarch() {
    this.searchResult = undefined;
  }
  submitSearch(value: any) {
    this.route.navigate([`search/${value}`]);
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
}
