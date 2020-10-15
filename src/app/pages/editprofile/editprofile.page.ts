import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagehandlerService } from '../../services/imagehandler.service';
import { Component,NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController, LoadingController,AlertController } from '@ionic/angular';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage  {
imgurl: any = 'https://firebasestorage.googleapis.com/v0/b/wtstutors.appspot.com/o/noProfile.png?alt=media&token=912141e1-15f8-4bf8-a0d9-4d442305a3f1';
	imgBlob: any = null;
    uploadProgress :number = 0;
    usrName;
	grd;
	descri;
	isPicChanged = false;
 constructor(private imagePicker: ImagePicker,public loadingController: LoadingController,public toastCtrl: ToastController,private router: Router,public afstore: AngularFirestore,public storage: AngularFireStorage,public usr: UserService,public zone: NgZone,public imgServ: ImagehandlerService,private camera: Camera) {
	  }
	
	 async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
  
	ionViewWillEnter(){
		this.usrName = this.usr.user.username;
		this.grd = this.usr.user.grd;
		this.descri = this.usr.user.bio;
		this.imgurl = this.usr.editUrl;
	}

  navigateDash(){
    this.router.navigate(['/cloudlessons']);
  }
	
	getImages(){
		this.imgServ.fetchImageBlob().then((res) => {
			this.zone.run(() => {
				var reader = new FileReader();
				this.imgBlob = res;
          reader.readAsDataURL(this.imgBlob);
          reader.onloadend = () => {
            this.imgurl = reader.result;
			this.usr.editUrl = this.imgurl;
			this.isPicChanged = true;
          }
        err => {
            // display error
			alert("error trying fetch image...");
        }
				//this.imgurl = res;
				//this.imgurl = this.imgServ.nativepath;
			})
		})
	}

	upload(){
		this.usr.user.username = this.usrName;
		this.usr.user.grd = this.grd;
		this.usr.user.bio = this.descri;
			 this.afstore.doc('userprofiles/' + this.usr.getUid()).update(this.usr.user).then(() => {
				 //this.uploadFile(this.les);
					this.presentToast("Updated profile!");
					this.navigateDash();

				}).catch((err) => {
				this.presentToast("error: " + err);
			});
		
	}

	async proceed(){
				  const loading = await this.loadingController.create({
      cssClass: 'profileselect',
      message: 'Updating profile...',
      
    });
	
		if(this.isPicChanged == true){
			loading.present()
			const uid = this.usr.getUid();
			const dot = "pic";
			const uploadTask = this.storage.upload(
			   `ProfilePics/${uid}_${dot}`,
			  this.imgBlob
			);
			uploadTask.percentageChanges().subscribe(change => {
			  this.uploadProgress = change;
			});
			uploadTask.then(async res => {
				loading.dismiss();
				//this.presentToast("Updated profile picture (NB: old photos are inprinted on old comments. ");
				this.upload();
			
			}).catch((err) => {
				loading.dismiss();
				this.presentToast("error: " + err.code);
			});
			
		}
		else{
			this.upload();
		}
	}

	
}
