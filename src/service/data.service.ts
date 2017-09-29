/**
 * Created by david on 29/09/2017.
 */
import {Injectable} from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import firebase from 'firebase';

@Injectable()
export class DataService {
  public db: any;
  constructor() {}

  init() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyAsuvF-EQcXgYlZvJsOmfZ5tZ5cWzdBS8I",
      authDomain: "el-buscador-54109.firebaseapp.com",
      databaseURL: "https://el-buscador-54109.firebaseio.com",
      projectId: "el-buscador-54109",
      storageBucket: "el-buscador-54109.appspot.com",
      messagingSenderId: "605369360962"
    };
    firebase.initializeApp(config);
    this.db = firebase.database().ref('/');
    console.log(firebase.database().ref('/'));
  }
}
