import { Component } from "@angular/core";
import { UserService } from "./../services/user.service";

import { PostService } from "./../services/post.service";

@Component({
  selector: "app-recommendations",
  templateUrl: "./recommendations.page.html",
  styleUrls: ["./recommendations.page.scss"]
})
export class RecommendationsPage {
  constructor(public user: UserService, private post: PostService) {}

  follow = data => this.post.followUser(data);

  ngOnInit() {
    this.user.getRecommendations();
  }
}
