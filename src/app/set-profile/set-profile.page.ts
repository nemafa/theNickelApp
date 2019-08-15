import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-set-profile",
  templateUrl: "./set-profile.page.html",
  styleUrls: ["./set-profile.page.scss"]
})
export class SetProfilePage implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  aboutYou: string;
  lettersLeft: number;
  profilePic: File;
  aboutMe: string;
  url =
    "data:image/png;base64,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";

  ngOnInit() {}

  createProfile() {
    const profilePic = this.profilePic;
    const aboutMe = this.aboutMe;
    this.userService.setUserProfile(profilePic, aboutMe);
    console.log("Profile Set");
  }
  onFileChanged(event) {
    this.profilePic = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        // called once readAsDataURL is completed
        //    this.url = event.target.result;
      };
    }
  }
}
