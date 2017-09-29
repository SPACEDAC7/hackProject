import {Component} from '@angular/core';
import {GetImagesServiceComponent} from '../../service/getimages-service/getimages-service';
import {AlertController, App, NavController, NavParams, Platform, Events} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';

@Component({
  selector: 'photo',
  templateUrl: 'photo.html'
})
export class PhotoComponent extends GetImagesServiceComponent {
  public newType: number = 0;
  public nextTab: number = 0;
  public canPublish: boolean = false;
  public titles = ['Fotos de la incidencia', 'Fotos de la propuesta'];
  public data: any;

  constructor(public app: App, public platform: Platform, public camera: Camera, public navCtrl: NavController,
              public navParams: NavParams, public alertCtrl: AlertController, public events:Events) {
    super(app, platform, camera, navCtrl, navParams, alertCtrl,events);
    super.setMaxPhotos(3);
    super.setRefusePermissionsMessage('Es necesario subir al menos una foto', 'Para publicar una incidencia debes permitir el acceso a la cámara y a la galería de imágenes. Puedes cambiar los permisos en los ajustes de tu teléfono');
    super.checkCameraPermissions();
    this.newType = navParams.get('newType');
    this.nextTab = navParams.get('nextTab');
    this.canPublish = navParams.get('canPublish');
    this.data.images = [];
  }

  takePicture(getPictureFromCamera: boolean) {
    if (!this.localReferenceIsSet) {
      super.setCropperLocalReference(window.innerWidth , window.innerWidth);
    }
    super.takePicture(getPictureFromCamera);
    this.data.images = this.photosData;
  }

  viewPhoto(photo: number) {
    super.viewPhoto(photo);
  }

  removePhoto() {
    super.removePhoto();
    this.data.images = null;
    this.data.images = this.photosData;
  }

  nextStep(event: Event) {
    event.preventDefault();
    if (this.canPublish) {
    } else {
      this.navCtrl.parent.select(this.nextTab);
    }
  }
}
