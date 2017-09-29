import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePage} from "../pages/home/home";
import {DataService} from "../service/data.service";
import {AngularFireModule} from "angularfire2";
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from "angularfire2/database";

export const config = {
  apiKey: "AIzaSyAsuvF-EQcXgYlZvJsOmfZ5tZ5cWzdBS8I",
  authDomain: "el-buscador-54109.firebaseapp.com",
  databaseURL: "https://el-buscador-54109.firebaseio.com",
  projectId: "el-buscador-54109",
  storageBucket: "el-buscador-54109.appspot.com",
  messagingSenderId: "605369360962"
};

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config,'demo104'),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
