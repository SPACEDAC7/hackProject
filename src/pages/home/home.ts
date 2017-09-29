import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListPage} from "../list/list";
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public mail: string;
  public password: string;
  public db : AngularFireDatabase;
  user: Observable<firebase.User>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.db = database;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  beginRetos(){
    this.login();
    if(!this.error){
      this.navCtrl.setRoot(ListPage);
    }
  }

  login() {
    console.log("Login");
    console.log(this.mail + " , " + this.password);
   this.afAuth.auth.signInWithEmailAndPassword(this.mail,this.password).catch(function(error) {
     // Handle Errors here.
     let errorCode = error.code;
     let errorMessage = error.message;
     if (errorCode === 'auth/wrong-password') {
       alert('Wrong password.');
     } else {
       alert(errorMessage);
     }
     console.log(error);
   });
  console.log("Login");
 }

 logout() {
   this.afAuth.auth.signOut();
 }

}
