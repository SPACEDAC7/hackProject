import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListPage} from "../list/list";
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';



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
  public mail: String;
  public password: String;
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

    this.navCtrl.setRoot(ListPage);
  }

  login() {
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
 }

 logout() {
   this.afAuth.auth.signOut();
 }

}
