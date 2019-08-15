import { AuthService } from "./../services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    console.log("login() called from login-form component");
    this.auth.login(this.email, this.password);
  }

  goSignup() {
    this.router.navigate(["/signup"]);
  }

  ngOnInit() {}
}
