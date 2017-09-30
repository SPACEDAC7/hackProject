/**
 * Created by david on 29/09/2017.
 Este servicio se encaraga de realizar la conexión con la base de datos
 y de almacenar la información compartida entre los componentes.
 */
import {Injectable} from '@angular/core';
// if you've gone with the local installation approach, you'd use the following:
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class DataService {
  public db: any;
  public uid: any;
  constructor(public afAuth: AngularFireAuth) {}

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
  }

  //Metodo encarga de realizar la autenticación del usuario.
  //Guardamos en una variable los datos del usuario para que puedan ser accedido desde los componentes.
  //El método devuelve una promesa, que puede ser tratada por los componentes.
  authenticate(mail:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(mail,password).then((usuarioAutenticado) => {
      this.uid = usuarioAutenticado.uid;

    }).catch(function(error) {
      // Handle Errors here.
      let errorMessage = error.message;

        alert(errorMessage);
      
    });
  }

  //Método que devuele el identificador del usuario
  public getUid():String{
    return this.uid;
  }
}
