import { Product } from './../../../shared/models/product';
import { ProductService } from './../../../shared/services/product.service';
import { HttpClient  } from '@angular/common/http';
import { UserDetail, User } from "./../../../shared/models/user";
import { AuthService } from "./../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "../../../../../node_modules/@angular/forms";
import * as firebase from "firebase/app";
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"]
})
export class ShippingDetailsComponent implements OnInit {
  userDetails: User;
   products:Product[];
  userDetail: UserDetail;

  constructor(private authService: AuthService, private http: HttpClient ,private productService: ProductService,private router: Router) {
    debugger;
    const products = productService.getLocalCartProducts();
    this.userDetail = new UserDetail();
    this.userDetails = authService.getLoggedInUser();
  }

  ngOnInit() {}

  updateUserDetails(form: NgForm) {
    debugger;
    const data = form.value;
    data["emailId"] = this.userDetails.emailId;
    data["userName"] = this.userDetails.userName;
    data["dfdf"]=this.productService.getLocalCartProducts();
    this.sendEmailAlert(data).subscribe();
    console.log("Data: ", data); 
    localStorage.removeItem("avct_item");
    this.productService.navbarCartCount=0;
    this.router.navigate(['/checkouts', {outlets: {'checkOutlet': ['result']}}]);
    
  }

  sendEmailAlert(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
            })
    };
   return this.http.post("/sendmailalert", JSON.stringify(data), httpOptions)
   
  }

}
