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
  selector: 'app-profileselect',
  templateUrl: './profileselect.page.html',
  styleUrls: ['./profileselect.page.scss'],
})
export class ProfileselectPage  {
	imgurl: any = 'https://firebasestorage.googleapis.com/v0/b/wtstutors.appspot.com/o/noProfile.png?alt=media&token=912141e1-15f8-4bf8-a0d9-4d442305a3f1';
	imgBlob: any = null;
    uploadProgress :number = 0;
    usrName;
	grd;
	descri;
	isPicChanged = false;
 constructor(private imagePicker: ImagePicker,public loadingController: LoadingController,public toastCtrl: ToastController,private router: Router,public afstore: AngularFirestore,public storage: AngularFireStorage,public usr: UserService,public zone: NgZone,public imgServ: ImagehandlerService,private camera: Camera) {
	  }

	
  navigateDash(){
	  this.presentToast("A verification email has been sent. Verify to log in.");
    this.router.navigate(['/login']);
  }
  
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
  
	
	getImages(){
		this.imgServ.fetchImageBlob().then((res) => {
			this.zone.run(() => {
				var reader = new FileReader();
				this.imgBlob = res;
          reader.readAsDataURL(this.imgBlob);
          reader.onloadend = () => {
            this.imgurl = reader.result;
			this.isPicChanged = true;
          }
        err => {
           
        }
				
			})
		})
	}

	upload(){
		this.usr.user.username = this.usrName;
		this.usr.user.grd = this.grd;
		this.usr.user.bio = this.descri;
			 this.afstore.doc('userprofiles/' + this.usr.getUid()).set(this.usr.user).then(() => {
					this.presentToast("Added new profile!");
					this.presentToast("Please verify your email before logging in...");
					this.navigateDash();

				}).catch((err) => {
				this.presentToast("error: " + err);
			});
		
	}

	async proceed(){
		  const loading = await this.loadingController.create({
      cssClass: 'profileselect',
      message: 'Setting up new profile...',
      
    });
	
		if(this.isPicChanged == true){
			loading.present();
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
				this.presentToast("Added new profile pic!");
				this.upload();
			
			}).catch((err) => {
				this.presentToast("Error: " + err.code);
			});
		}
		else{
			this.upload();
		}
	}
	
	
}
