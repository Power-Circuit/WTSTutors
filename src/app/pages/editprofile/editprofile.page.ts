import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagehandlerService } from '../../services/imagehandler.service';
import { Component,NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


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
 constructor(private imagePicker: ImagePicker,private router: Router,public afstore: AngularFirestore,public storage: AngularFireStorage,public usr: UserService,public zone: NgZone,public imgServ: ImagehandlerService,private camera: Camera) {
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
			 this.afstore.doc('userprofiles/' + this.usr.getUid()).set(this.usr.user).then(() => {
				 //this.uploadFile(this.les);
					alert("Updated profile");
					this.navigateDash();

				}).catch((err) => {
				alert("error: " + err);
			});
		
	}

	proceed(){
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
			alert("upload success: " + res);
			this.upload();
		
		}).catch((err) => {
			alert("error: " + err.code);
		});
	}

	
}
