import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

/**
 * Generated class for the VolunteerProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer-profile-edit',
  templateUrl: 'volunteer-profile-edit.html',
})
export class VolunteerProfileEditPage {
  user: any;
  token: any;
  editForm: FormGroup;
  genderVal: any;
  lastImage: string = null;
  loading: Loading;
  needUploadImage: Boolean = false;
  imageFileName: String = null;


  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private formBuilder: FormBuilder, private asCtrl: ActionSheetController, private camera: Camera, private platform: Platform, private file: File, private transfer: FileTransfer, private filePath: FilePath, private toastCtrl: ToastController) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    })

    this.user = navParams.get('user');

    if(this.user.gender == "Male") {
      this.genderVal = "M";
    }
    else {
      this.genderVal = "F";
    }

    this.editForm = this.formBuilder.group({
      full_name: [this.user.full_name, Validators.required],
      profile_name: [this.user.profile_name, Validators.required],
      gender: [this.genderVal, Validators.required],
      date_of_birth: ['', Validators.required],
      phone_no: [this.user.phone_no, Validators.required],
      address: [this.user.address, Validators.required],
      emergency_contact: [this.user.emergency_contact, Validators.required],
      emergency_name: [this.user.emergency_name, Validators.required],
      emergency_relation: [this.user.emergency_relation, Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerProfileEditPage');
  }

  displayAction() {
    console.log("click");

    let actionSheet = this.asCtrl.create({
      title: "Select From",
      buttons: [
        {
          text: "Take Photo",
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Gallery",
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Cancel",
          icon: !this.platform.is('ios') ? 'close' : null,
          role: "cancel"
        }
      ]
    });

    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 80,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 500,
      targetHeight: 500
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return this.user.profile_image;
    } else {
      return this.file.dataDirectory + img;
    }
  }

  public onSave() {
    if(this.lastImage != null) {
      this.needUploadImage = true;
      this.uploadImage();
    }
    else {
      this.needUploadImage = false;
      this.saveEdit();
    }
  }

  public uploadImage() {
    //destination url
    let url = this.kskProvider.url + "uploadProfileImage";

    //file for uplaod
    let targetPath = this.pathForImage(this.lastImage);

    //file name only
    let filename: any = this.lastImage;
    this.imageFileName = this.user.user_id + "_" + this.lastImage;

    let options: FileUploadOptions = {
      fileKey: "profile_image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'file_name' : this.imageFileName,
      },
      httpMethod: 'POST'
    };
    
    
    const fileTransfer: FileTransferObject = this.transfer.create();

    this.kskProvider.showProgress();

    fileTransfer.upload(targetPath, url, options).then((result) => {
      this.kskProvider.dismissProgress();

      this.kskProvider.showAlertDialog("success", "done upload");
      //this.saveEdit();
    }, (err) => {
      this.kskProvider.dismissProgress();
      //this.kskProvider.showServerErrorDialog();
      console.log(err);
      this.kskProvider.showAlertDialog("Error", JSON.stringify(err))
    });
  }

  public saveEdit() {

  }

}
