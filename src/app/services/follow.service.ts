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
export class FollowService {
  constructor() {}
}
