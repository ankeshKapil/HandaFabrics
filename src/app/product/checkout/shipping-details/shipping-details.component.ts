import { UserDetail, User } from "./../../../shared/models/user";
import { AuthService } from "./../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "../../../../../node_modules/@angular/forms";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import * as firebase from "firebase/app";
@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"]
})
export class ShippingDetailsComponent implements OnInit {
  userDetails: User;

  userDetail: UserDetail;

  constructor(private authService: AuthService,private http: HttpClient) {
    this.userDetail = new UserDetail();
    this.userDetails = authService.getLoggedInUser();
  }

  ngOnInit() {}

  updateUserDetails(form: NgForm) {
    const data = form.value;

    data["emailId"] = this.userDetails.emailId;
    data["userName"] = this.userDetails.userName;
    this.sendEmailAlert(data).subscribe();
    console.log("Data: ", data);
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
