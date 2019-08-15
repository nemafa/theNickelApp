import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  email: string;
  password: string;
  cpassword: string;
  displayName: string;
  firstName: string;
  lastName: string;
  userName: string;
  errorMsg: string;

  constructor(private auth: AuthService, private router: Router) {}

  signUp() {
    const email = this.email;
    const password = this.password;
    const userName = this.userName;
    const firstName = this.firstName;
    const lastName = this.lastName;
    this.auth
      .signUp(email, password, userName, firstName, lastName)
      .catch(error => (this.errorMsg = error.message));
  }

  goLogin() {
    this.router.navigate(["/login"]);
  }

  ngOnInit() {}
}
