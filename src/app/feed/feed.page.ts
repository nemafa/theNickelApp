import { AuthService } from "../services/auth.service";
import { PostService } from "./../services/post.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.page.html",
  styleUrls: ["./feed.page.scss"]
})
export class FeedPage {
  userPosts;
  sub;
  items: Array<any>;
  likes;
  postLiked = true;
  amountDonated: string;

  constructor(
    private auth: AuthService,
    public post: PostService,
    private dbs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  goMessages() {
    this.router.navigate(["/messages"]);
  }

  logout() {
    this.auth.logout();
  }

  donate(data) {
    const amountDonated = this.amountDonated
    console.log(amountDonated)
  //  this.post.donate(data, amountDonated)
  }

  like(data) {
    this.post.likePost(data)
    this.postLiked = true
  }
  unlike(data) {
    this.post.unlikePost(data)
    this.postLiked = false
  }

  delete = data => this.post.deletePost(data);
  follow = data => this.post.followUser(data);

  ngOnInit() {
    this.post.getUID();
    this.post.getHomePosts();
  }
}
