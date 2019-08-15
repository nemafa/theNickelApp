import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"]
})
export class NotificationsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goRecommendations() {
    this.router.navigate(["/recommendations"]);
  }

  goFollowReq() {
    this.router.navigate(["/follow-requests"]);
  }
}
