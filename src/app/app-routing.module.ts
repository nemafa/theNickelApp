import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  { path: "signup", loadChildren: "./signup/signup.module#SignupPageModule" },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "set-profile",
    loadChildren: "./set-profile/set-profile.module#SetProfilePageModule"
  },
  {
    path: "followers",
    loadChildren: "./followers/followers.module#FollowersPageModule"
  },
  {
    path: "following",
    loadChildren: "./following/following.module#FollowingPageModule"
  },
  {
    path: "follow-requests",
    loadChildren:
      "./follow-requests/follow-requests.module#FollowRequestsPageModule"
  },
  {
    path: "recommendations",
    loadChildren:
      "./recommendations/recommendations.module#RecommendationsPageModule"
  },
  {
    path: "messages",
    loadChildren: "./messages/messages.module#MessagesPageModule"
  },
  { path: "chat", loadChildren: "./chat/chat.module#ChatPageModule" },
  {
    path: "welcome-page",
    loadChildren: "./welcome-page/welcome-page.module#WelcomePagePageModule"
  },
  {
    path: "individual-post",
    loadChildren:
      "./individual-post/individual-post.module#IndividualPostPageModule"
  },
  { path: "tabs", loadChildren: "./tabs/tabs.module#TabsPageModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
