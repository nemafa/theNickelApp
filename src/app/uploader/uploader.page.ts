import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { PostService } from "../services/post.service";
import { firestore } from "firebase/app";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.page.html",
  styleUrls: ["./uploader.page.scss"]
})
export class UploaderPage implements OnInit {
  constructor(
    private afstore: AngularFirestore,
    private post: PostService,
    private alertController: AlertController,
    private router: Router
  ) {}

  postText: string;
  postFile: File;
  isPrivate: boolean;
  imageURL = "";

  ngOnInit() {}

  createPost() {
    const postFile = this.postFile;
    const postText = this.postText;
    const isPrivate = this.isPrivate;
    this.post.createPost(postText, postFile, isPrivate);
    console.log("Post Added");
  }
  onFileChanged(event) {
    this.postFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = event => {
        // called once readAsDataURL is completed
        //  this.imageURL = event.target.result;
      };
    }
  }
}
