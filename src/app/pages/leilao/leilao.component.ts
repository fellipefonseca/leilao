import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-leilao',
  templateUrl: './leilao.component.html',
  styleUrls: ['./leilao.component.scss']
})
export class LeilaoComponent implements OnInit {

  product: any;
  bids: Array<any>;
  quantity: number = 1;
  storagePath: string;
  loading = true;
  constructor(private activatedRoute: ActivatedRoute, private productProvider: ProductService,
    private ngZone: NgZone, private userProvider: UserService) {
    this.storagePath = this.productProvider.storagePath();
  }

  ngOnInit() {

    this.productProvider.getHour().then((hour: Date) => {
      this.storagePath = this.productProvider.storagePath();
      this.activatedRoute.params.subscribe(params => {
        this.productProvider.getProductDetails(params.id).on('value', (snapshot) => {
          this.ngZone.run(() => {
            this.product = snapshot.val();
            this.product.key = snapshot.key;
            if (hour > new Date(this.product.finalTime)) {
              if (this.product.active) {
                this.product.active = false;
                return;
              }
            }
          });

          this.productProvider.getBids(this.product.key).on('value', (snapshot) => {
            this.loading = true;

            this.bids = new Array<any>();

            snapshot.forEach((el) => {
              let bid = el.val();
              bid.key = el.key;
              this.userProvider.getUserById(bid.user).once('value', (snapshot) => {
                let user = snapshot.val();
                bid.login = user.login;
                this.bids.push(bid);
              });
            
            });
            console.log(this.bids);
            
            setTimeout(() => {
              this.checkBids();
            }, 2000)

          });
        });
      });
    })
  }

  checkBids() {
    this.bids.forEach((bid) => {
      this.bids.forEach((bid2) => {
        if (bid.key != bid2.key && bid.value == bid2.value) {
          let b = bid.time > bid2.time ? bid : bid2;
          b.remove = true;
        }
      })
    })
    let aux = new Array<any>()
    this.bids.forEach((b) => {
      if (!b.remove) {
        aux.push(b);
      }
    })

    this.bids = aux;
    this.bids.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
    this.bids.reverse();
    this.loading = false;

  }

  bid(product) {
    this.productProvider.getHour().then((hour: Date) => {
      if (hour < new Date(product.finalTime)) {
        let value = (this.bids && this.bids.length > 0) ? this.bids[0].value + 5 : product.price;
        this.productProvider.bid({ productKey: product.key, value: value }).then((res) => {
          swal({
            title: "Lance realizado",
            type: "success"
          })
        });
      } else {
        swal({
          title: "O leilão acabou!",
          type: "error"
        })
        this.productProvider.inactive(product.key);
      }
    });
  }

  formatFinalDate(date) {
    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  formatTime(time: number) {
    return moment(time).format("DD/MM/YYYY HH:mm:ss");
  }
}
