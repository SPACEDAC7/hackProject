import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListPage} from "../list/list";
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {DataService} from '../../service/data.service';

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

@Injectable()
export class HomePage {
  public mail: string;
  public password: string;
  public db : AngularFireDatabase;
  user: Observable<firebase.User>;

  constructor(
    private service: DataService,
    public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.db = database;

  }

  ionViewDidLoad() {
  }

  beginRetos(){
    //Llamamos al metodo del servicio que auntetica
    this.service.authenticate(this.mail,this.password).then((usuarioAutenticado) => {
        //Si la autenticación se realiza correctamente cambiamos de página.
         this.navCtrl.setRoot(ListPage);
      });


  }

 logout() {
   this.afAuth.auth.signOut();
 }

}
