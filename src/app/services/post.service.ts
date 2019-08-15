import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction
} from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class PostService {
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  users: AngularFirestoreDocument;
  subusers;
  email;
  userName;
  uid: string;
  userPhoto;
  selectedPosts: Array<any>;
  myProfilePosts: Array<any>;
  homePosts: Array<any>;
  discoverablePosts: Array<any>;
  posts: Observable<DocumentChangeAction<unknown>[]>;
  following: Array<any>;

  private user: Observable<firebase.User>;
  private authState: any;
  constructor(
    private storage: AngularFireStorage,
    private dbs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private router: Router
  ) {
    this.user = afAuth.authState;
  }

  getUID() {
    this.auth.currentUserId().subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }


  


  getDiscoveryPosts() {
    this.auth.currentUserId().subscribe(user => {
      if (user) {
        this.dbs
          .collection("posts", ref => ref.where("isPrivate", "==", "false"))
          .snapshotChanges()
          .subscribe(event => {
            this.discoverablePosts = event;
          });
      }
    });
  }

deletePost(data) {
    return this.dbs
      .collection("posts")
      .doc(data.payload.doc.id)
      .delete();
  }

  likePost(data) {
     this.auth.currentUserId().subscribe(user => {
      if (user) {
    return this.dbs
      .collection("posts")
      .doc(data.payload.doc.id).update({"likes": firebase.firestore.FieldValue.arrayUnion(user.uid)})
  }})}
  unlikePost(data) {
     this.auth.currentUserId().subscribe(user => {
      if (user) {
    return this.dbs
      .collection("posts")
      .doc(data.payload.doc.id).update({"likes": firebase.firestore.FieldValue.arrayRemove(user.uid)})
  }})}

  followUser(userkey) {
    this.auth.currentUserId().subscribe(user => {
      if (user) {
        const following = userkey.payload.doc.data().userID;
        const postID = userkey.payload.doc.id
        const me = user.uid;
        //following a user
        this.dbs
          .collection("users")
          .doc(`${me}`).update({"following": firebase.firestore.FieldValue.arrayUnion(following)})
          //user recieves a follow
        this.dbs
          .collection("users")
          .doc(`${following}`).update({"follower": firebase.firestore.FieldValue.arrayUnion(me)})
        //post recieves a follower 
        this.dbs
          .collection("posts")
          .doc(`${postID}`).update({"followers": firebase.firestore.FieldValue.arrayUnion(user.uid)})
        
      }
    });
  }
  getHomePosts() {
    this.auth.currentUserId().subscribe(user => {
      if (user) {
       this.dbs.doc(`users/${user.uid}`).valueChanges().subscribe(result => {
     
            this.dbs.collection(
                "posts" , ref => ref.where("followers", "array-contains", user.uid)
                
              )
              .snapshotChanges()
              .subscribe(event => {
                this.homePosts = event;
              });
          });
        
      }
    });
  }

  getMyPosts() {
    this.auth.currentUserId().subscribe(user => {
      if (user) {
        this.dbs
          .collection("posts", ref => ref.where("userID", "==", user.uid))
          .snapshotChanges()
          .subscribe(event => {
            this.myProfilePosts = event;
            this.dbs.doc(`users/${user.uid}`).update({
              numberPosts: event.length
            });
          });
      }
    });
  }

  getProfilePosts(data) {
    const userID = data.payload.doc.data().userID;
    const following = this.dbs
      .collection("users")
      .doc(userID)
      .collection("following")
      .doc();
    this.auth.currentUserId().subscribe(user => {
      if (user) {
        this.dbs
          .collection("posts" /*, ref => ref.where("userID", "==", user.uid)*/)
          .snapshotChanges()
          .subscribe(event => {
            this.selectedPosts = event;
          });
      }
    });
  }
  createPost(postText, postFile, isPrivate) {
    this.auth.currentUserId().subscribe(user => {
      if (user) {
        const timeStamp = this.getTimeStamp();
        const route = this.router;
        const storage = firebase.storage();
        const file = postFile;
        const path = `${user.uid}/${file.name}`;
        const ref = this.dbs.collection(`posts`);
        const pathuser = `users/${user.uid}`;

        this.users = this.dbs.doc(pathuser);
        this.subusers = this.users.valueChanges().subscribe(event => {
          console.log(event);

          const email = event.email;
          const userName = event.userName;
          const userPhoto = event.fileUrl;
          const follower = event.following;
          this.task = this.storage.upload(path, file);
          this.snapshot = this.task.snapshotChanges();
          this.snapshot
            .pipe(
              finalize(
                () =>
                  (this.downloadURL = this.storage.ref(path).getDownloadURL())
              )
            )
            .subscribe();

          const pathReference = storage.ref(path);
         

          pathReference.getDownloadURL().then(function(url) {
            ref.add({
              fileUrl: url,
              postText: postText,
              isPrivate: isPrivate,
              timeSent: timeStamp,
              userID: user.uid,
              likes: [],
              comments: [],
              shares: [],
              donations: [],
              userPhoto: userPhoto,
              userName: userName,
              email: email,
              followers:  follower
            
            });
          });
         

        
        });
    
      }
    });
  }
  
  getTimeStamp() {
    const now = new Date(); // set now to be new date
    const date =
      now.getUTCFullYear() +
      "/" +
      (now.getUTCMonth() + 1) +
      "/" +
      now.getUTCDate();
    const time =
      now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();
    return date + " " + time;
  }
}
