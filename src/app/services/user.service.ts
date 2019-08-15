import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  profile;
  recommendations;
  followers;
  following;

  constructor(
    private storage: AngularFireStorage,
    private dbs: AngularFirestore,
    private user: AuthService,
    private router: Router
  ) {}

  getRecommendations() {
    this.user.currentUserId().subscribe(user => {
      if (user) {
        this.dbs
          .collection(
            "users" /*, ref => ref.where("isPrivate", "==", "false")*/
          )
          .snapshotChanges()
          .subscribe(event => {
            this.recommendations = event;
          });
      }
    });
  }

  getFollowers() {
    this.user.currentUserId().subscribe(user => {
      if (user) {
        this.dbs
          .collection(
            "users", ref => ref.where("follower", "array-contains", user.uid)
          )
          .snapshotChanges()
          .subscribe(event => {
            this.followers = event;
          });
      }
    });
  }
  getFollowing() {
    this.user.currentUserId().subscribe(user => {
      if (user) {
        this.dbs
          .collection(
            "users" , ref => ref.where("following", "array-contains", user.uid)
          )
          .snapshotChanges()
          .subscribe(event => {
            this.following = event;
          });
      }
    });
  }
  setUserProfile(profilePic, aboutMe: string) {
    this.user.currentUserId().subscribe(user => {
      if (user) {
        const storage = firebase.storage();
        const route = this.router;
        const path = `${user.uid}/ProfilePic/_${profilePic.name}`;
        const ref = this.dbs.doc(`users/${user.uid}`);
        this.task = this.storage.upload(path, profilePic);
        this.snapshot = this.task.snapshotChanges();
        const currentUser = user.uid;
        this.dbs
          .collection("users")
          .doc(`${currentUser}`)
          .collection("following")
          .doc(currentUser)
          .set({ currentUser });

        this.snapshot
          .pipe(
            finalize(
              () => (this.downloadURL = this.storage.ref(path).getDownloadURL())
            )
          )
          .subscribe();

        const pathReference = storage.ref(path);

        pathReference.getDownloadURL().then(function(url) {
          ref.update({
            fileUrl: url,
            aboutMe: aboutMe
          });
          route.navigate(["/tabs/feed"]);
        });
      }
    });
  }
  loadUserProfile() {
    this.user.currentUserId().subscribe(user => {
      if (user) {
        this.dbs
          .collection("users", ref => ref.where("userID", "==", user.uid))
          .snapshotChanges()
          .subscribe(result => {
            this.profile = result;
            // this.dbs
            //   .collection("users")
            //   .doc(user.uid)
            //   .collection("following")
            //   .snapshotChanges()
            //   .subscribe(following => {
            //     this.dbs.doc(`users/${user.uid}`).update({
            //       following: following.length
            //     });
            //   });
            // this.dbs
            //   .collection("users")
            //   .doc(user.uid)
            //   .collection("followers")
            //   .snapshotChanges()
            //   .subscribe(followers => {
            //     this.dbs.doc(`users/${user.uid}`).update({
            //       followers: followers.length
            //     });
            //   });
          });
      }
    });
  }
}
