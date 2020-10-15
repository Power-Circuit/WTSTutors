import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { UserService } from '../../services/user.service';
import { ToastController, LoadingController,AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import * as moment from 'moment';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
	email = "";
  password1= "";
  user: any ;
  constructor(public afAuth: AngularFireAuth,public backgroundMode: BackgroundMode,private videoPlayer: VideoPlayer,public afstore: AngularFirestore,public alertController: AlertController,public loadingController: LoadingController,public toastCtrl: ToastController,private usr: UserService,private router: Router) {
	
	this.backgroundMode.setDefaults({silent: true});
	this.backgroundMode.enable();
	//this.playVideoHosted();
	  }

  ionViewWillEnter(){
	  this.password1 = "";
	  
  }
  
  navigateLogin(){
    this.router.navigateByUrl('/cloudlessons');
  }
  
  navigateAdmin(){
    this.router.navigateByUrl('/dashboard');
  }
  
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  
  
  async login(){
	  
	  const loading = await this.loadingController.create({
      cssClass: 'login',
      message: 'Logging in...',
      
    });
    await loading.present();

    
	  
	  try{
		  const res = await this.afAuth.signInWithEmailAndPassword(this.email,this.password1);
		  if(res.user){
		  	  this.usr.setUser({
			username: '',
			uid: res.user.uid,
			email: this.email,
			propic: '',
			bio: '',
			grd: '',
			type: '',
			xpDate: null,
			refNum: ''
			
		});
		this.getUser();
		this.loadProPic();
		
		loading.dismiss();
		if(res.user.emailVerified || this.email == "tester1@email.com"){

			 if(this.email == "tester1@email.com" || this.email == "phirikhumbolane@gmail.com" || this.email == "dumimbona@gmail.com" || this.email == "kwvsibiya@wtstutor.co.za"){
				 this.presentToast("Successfully logged in as Admin! Loading Lesson Dashboard...");
				 this.usr.isAdmin = true;
				 this.navigateAdmin();
			 }
			 else{
				 this.presentToast("Successfully logged in!");
				 
				this.navigateLogin();
			 }
		}else{
			this.presentToast("This email is not verified");
		}
		  }
		  
		  
		  
	  }catch(err){
		  loading.dismiss();
		  this.presentToast("Could not log in: " + err);
		
	  }
	  loading.dismiss();
  }
  
   loadProPic(){
	  const uid = this.usr.getUid() + "_pic";
	  
	  const storageRef = firebase.storage().ref('ProfilePics');
	 storageRef.listAll().then(result => {
		  result.items.forEach(async ref => {
					if(ref.name == uid){
						
						
						this.usr.editUrl = await ref.getDownloadURL();
					}
			  })
		  			 
	  }).catch((err) => {
				alert("error: " + err);
		});
   }
   
   async forgot() {
    const alert = await this.alertController.create({
      cssClass: 'forgot',
      header: 'Did you forget your password?',
      message: 'Would you like us to send password reset link to the email in the log in field?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Yes',
          handler: () => {
			  if(this.email != ""){
				this.afAuth.sendPasswordResetEmail(this.email).then((res) => {
					this.presentToast("Password reset link has been sent to " + this.email);
				});
			  }
			  else{
				  this.presentToast("Please enter an email in the field");
			  }
          }
        }
      ]
    });

    await alert.present();
  }
  
    playVideoHosted() {
			this.videoPlayer.play("../../../assets/imgs/splash.mp4").then(() => {
			}).catch(err => {
			 //alert(err);
			});
	  
   }
   
  
   getUser(){
	  	  const uid = this.usr.getUid() + "";

	   const lesCollectionRef = this.afstore.collection('userprofiles'); 
		
				   const less = lesCollectionRef.valueChanges().subscribe(res => {
					   res.forEach(item => {
						   this.user = item;
						   if(this.user.uid == uid){
							   this.usr.user = this.user;
							   
							   const mom = moment(this.user.xpDate).isAfter();
								if(mom){
									this.usr.isPrem = true;
								}
						   }
					   })
				   })
				   
  }
  


}
