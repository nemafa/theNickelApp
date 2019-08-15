import { Component, OnInit } from "@angular/core";

import { UserService } from "./../services/user.service";
@Component({
  selector: "app-followers",
  templateUrl: "./followers.page.html",
  styleUrls: ["./followers.page.scss"]
})
export class FollowersPage {
  constructor(public user: UserService) {}

  ngOnInit() {
    this.user.getFollowers();
  }
}
