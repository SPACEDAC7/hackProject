import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {DataService} from "../../service/data.service";
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [DataService]
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  tasks: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {
    this.tasks = this.database.list('/retos');
    this.tasks.subscribe((data) => {
      console.log(data);
    })



    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Reto ' + i,
        note: 'Este es el reto ' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
