import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {DataService} from "../../service/data.service";
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {HomePage} from '../home/home';
import {Injectable} from '@angular/core';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})

@Injectable()
export class ListPage {

  items: Array<{title: string, note: string}>;
  retoMax:FirebaseListObservable<any>;
  retos: FirebaseListObservable<any>;

  //Los servicios se inicializan en el constructor, el servicio dbService se encarga de la capa intermediaria con la base de datos.
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase, public afAuth: AngularFireAuth, private dbService: DataService) {
    this.retos = this.database.list('/retos');
    this.retos.subscribe((data) => {
    })

    //RetoMax indica el último reto que ha desbloqueado el usuario
    this.retoMax = this.database.list('/registro/'+dbService.getUid());
    this.retoMax.subscribe((data)=>{
      //REvisar
    })



    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Reto ' + i,
        note: 'Este es el reto ' + i
      });
    }
  }

  itemTapped(event, reto) {
    this.navCtrl.push(ItemDetailsPage, {
      item : reto
    });
  }


  closeSession(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
}
