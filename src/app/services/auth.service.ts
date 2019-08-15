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

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(
    private storage: AngularFireStorage,
    private dbs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = afAuth.authState;
  }

  currentUserId() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.setUserStatus("online");
        this.router.navigate(["/tabs"]);
      });
  }

  logout() {
    this.setUserStatus("offline"); //logout called, the created userStatus is set to offline.
    this.afAuth.auth.signOut(); //firebase authent registers signOut.
    this.router.navigate(["login"]); //then sent to login screen.
  }

  signUp(
    email: string,
    password: string,
    userName: string,
    firstName: string,
    lastName: string
  ) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password) //responds  by creating using email and password
      .then(user => {
        this.authState = user;
        const status = "online";
        this.setUserData(email, userName, status, firstName, lastName);
        this.router.navigate(["/set-profile"]);
      })
      .catch(error => console.log(error));
  }

  setUserData(
    email: string,
    userName: string,
    status: string,
    firstName: string,
    lastName: string
  ): void {
    this.currentUserId().subscribe(user => {
      if (user) {
        this.dbs.doc(`users/${user.uid}`).set({
          userName: userName,
          email: email,
          status: status,
          firstName: firstName,
          lastName: lastName,
          aboutMe: null,
          fileUrl: null,
          followers: null,
          following: null,
          numberPosts: null,
          userID: user.uid,
          nickels: 125
        });
      }
    });
  }

  setUserStatus(status: string): void {
    console.log("set user called ", status);
    this.currentUserId().subscribe(user => {
      if (user) {
        console.log("Hi", status);
        this.dbs.doc(`users/${user.uid}`).update({
          status: status
        });
      }
    });
  }
}
