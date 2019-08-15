import { AuthService } from "../services/auth.service";
import { PostService } from "./../services/post.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  constructor(
    private auth: AuthService,
    public post: PostService,
    private dbs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    public user: UserService
  ) {}

  goFollowing() {
    this.router.navigate(["/following"]);
  }

  goFollowers() {
    this.router.navigate(["/followers"]);
  }

  ngOnInit() {
    this.user.loadUserProfile();
    this.post.getMyPosts();
  }
}
