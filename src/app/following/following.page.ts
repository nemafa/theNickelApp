import { Component } from "@angular/core";

import { UserService } from "./../services/user.service";

@Component({
  selector: "app-following",
  templateUrl: "./following.page.html",
  styleUrls: ["./following.page.scss"]
})
export class FollowingPage {
  constructor(public user: UserService) {}

  ngOnInit() {
    this.user.getFollowing();
  }
}
