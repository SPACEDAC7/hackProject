import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {ListPage} from "../list/list";
import {Camera, CameraOptions } from '@ionic-native/camera';

const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  public base64Image: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('ite  m');
    var self = this;
    /*setTimeout(function() {
         self.navCtrl.setRoot(ListPage);
    }, 2000);*/
  }


  takePicture(){
    this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
   let base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });
}
}
