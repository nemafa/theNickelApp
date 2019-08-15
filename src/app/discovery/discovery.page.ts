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
  selector: "app-discovery",
  templateUrl: "./discovery.page.html",
  styleUrls: ["./discovery.page.scss"]
})
export class DiscoveryPage {
  constructor(
    private auth: AuthService,
    public post: PostService,
    private dbs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    public user: UserService
  ) {}
  follow = data => this.post.followUser(data);
  ngOnInit() {
    this.post.getDiscoveryPosts();
  }
}
