import {NavController, NavParams, Platform, App, AlertController, Events} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';

export class GetImagesServiceComponent {
  public photos: any = [];
  public photosCrop: any = [];
  public photosData: any = [];
  public maxPhotos: number = 3;
  public actPhoto: number = 0;
  public permissions: boolean = true;
  public cropperLocalReference = {w : 0, h: 0};
  public localReferenceIsSet: boolean = false;
  public refusePermTitle: string = 'Se necesitan permisos';
  public refusePermMessage: string = 'Debes permitir el acceso a la cámara y a la galería para poder subir imágenes desde tu teléfono';

  constructor(public app: App, public platform: Platform, public camera: Camera, public navCtrl: NavController,
              public navParams: NavParams, public alertCtrl: AlertController, public events:Events) {

  }

  public croppedCallback(url, crop_x, crop_y, crop_w, crop_h) {
    this.photosData.push({url: url, crop_x: crop_x, crop_y: crop_y, crop_w: crop_w, crop_h: crop_h});
    this.photos.push(url);
    let despX = -1 * ((this.cropperLocalReference.w * crop_x) / crop_w);
    let despY = -1 * ((this.cropperLocalReference.h * crop_y) / crop_h);
    this.photosCrop[this.photos.length - 1] = {x: despX, y: despY};
    this.viewPhoto(this.photos.length - 1);
  }

  public takePicture(getPictureFromCamera: boolean) {
    this.checkCameraPermissions();

    if (!this.permissions) {
      return
    }

    if (getPictureFromCamera) {
      //noinspection TypeScriptUnresolvedFunction
      this.camera.getPicture({
        quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 1600,
        targetHeight: 1600,
        correctOrientation: true,
      }).then((imageData) => {
        console.log("Hola")
      }, (err) => {

      });
    } else {
      /*this.imagePicker.getPictures({
        maximumImagesCount: (this.maxPhotos - this.photos.length),
        quality: 70,
        width: 1600,
        height: 1600,
      }).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.app.getRootNav().push(CropperPage, {url: results[i], callback: this.croppedCallback.bind(this)});
        }
      }, (err) => {

      });*/
    }

    if (this.photos.length == 1) {
      this.actPhoto = 0;
    }
  }

  public viewPhoto(photo: number) {
    if (photo >= 0) {
      this.actPhoto = photo;
    }
  }

  public removePhoto() {
    var temp = [];
    var tempData = [];
    var newi = 0;
    for (var i = 0; i < this.photos.length; i++) {
      if (this.actPhoto != i) {
        temp[newi] = this.photos[i];
        tempData[newi] = this.photosData[i];
        newi++;
      }
    }
    this.photos = null;
    this.photos = temp;
    this.photosData = null;
    this.photosData = tempData;
    if (this.photos.length > 0) {
      this.viewPhoto(this.photos.length - 1);
    } else {
      this.viewPhoto(-1);
      this.photosData = null;
      this.photosData = [];
    }
    console.log("REMOVE DEL SUPER");
    console.log(this.photosData);
  }

  public setMaxPhotos(max: number) {
    this.maxPhotos = max;
  }

  public setRefusePermissionsMessage(title: string, message: string) {
    this.refusePermTitle = title;
    this.refusePermMessage = message;
  }

  public getImage(image: number) {
    return this.photos[image] || '';
  }

  public getImageCropData(image: number) {
    return this.photosCrop[image] || null;
  }

  public getImageData(image: number) {
    return this.photosData[image] || null;
  }

  public setCropperLocalReference(width: number, height: number) {
    this.cropperLocalReference.w = width;
    this.cropperLocalReference.h = height;
    this.localReferenceIsSet = true;
  }

  public checkCameraPermissions() {
    /*this.diagnostic.isExternalStorageAuthorized().then((authorized) => {
      if (authorized) {
        this.permissions = true;
      } else {
        this.diagnostic.requestExternalStorageAuthorization().then((status) => {
          if(status == this.diagnostic.permissionStatus.GRANTED) {
            this.permissions = true;
          }
          else {
            this.presentAlert(this.refusePermTitle, this.refusePermMessage);
            this.permissions = false;
          }
        });
      }
    });*/
  }
}
