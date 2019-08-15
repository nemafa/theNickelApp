import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "feed",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../feed/feed.module").then(m => m.FeedPageModule)
          }
        ]
      },
      {
        path: "discovery",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../discovery/discovery.module").then(
                m => m.DiscoveryPageModule
              )
          }
        ]
      },
      {
        path: "uploader",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../uploader/uploader.module").then(
                m => m.UploaderPageModule
              )
          }
        ]
      },
      {
        path: "notifications",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../notifications/notifications.module").then(
                m => m.NotificationsPageModule
              )
          }
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: "",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../feed/feed.module").then(m => m.FeedPageModule)
          }
        ]
      }
    ]
  },
  {
    path: "",
    redirectTo: "../feed/feed",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
