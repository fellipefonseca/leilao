import { Component, OnInit, NgZone } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<any>;
  storagePath: string;
  constructor(private productProvider: ProductService, private ngZone: NgZone) {
    
    
   }

  ngOnInit() {
    this.productProvider.getHour().then((hour: Date) => {
      this.storagePath = this.productProvider.storagePath();
      this.productProvider.getAuctions().on('value', (snapshot) => {
        this.ngZone.run(() => {
          this.products = new Array();
          snapshot.forEach(elemento => {
            this.ngZone.run(() => {
              let p = elemento.val();
              p.key = elemento.key;
              if (hour > new Date(p.finalTime)) {
                if (p.active) {
                  p.active = false;
                  return;
                }
              }
              this.products.push(p);
            });
          });
          console.log(this.products);
          this.products.reverse();
        });
      })     
    })
  }

  finalized(p) {

  }
}
