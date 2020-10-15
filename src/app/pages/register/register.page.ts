import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email;
  password1;
  password2;
  
  constructor(public afAuth: AngularFireAuth,private toastCtrl: ToastController,public loadingController: LoadingController,public afstore: AngularFirestore,private router: Router,public usr: UserService) { }

  
  navigateOnline(){
    this.router.navigate(['/cloudlessons']);
  }

 navigateProfile(){
    this.router.navigate(['/profileselect'])
  }
  
  
  async register(){
	  const loading = await this.loadingController.create({
      cssClass: 'register',
      message: 'Registering user...',
      
    });
	  if(this.password1 != this.password2){
		  return this.presentToast("Passwords don't match!");
	  }
	  
	  try{
		  
		  
    await loading.present();

    
		const res = await this.afAuth.createUserWithEmailAndPassword(this.email,this.password1)	
		this.afstore.doc('users/' + res.user.uid).set({
			username: this.email
		})
		
		this.usr.setUser({
			username: '',
			uid: res.user.uid,
			email: this.email,
			propic: '',
			bio: '',
			grd: '',
			type: 'trial',
			xpDate: moment().format("YYYYMMDD HH:mm:ss"),
			refNum: ''
			
		});
		loading.dismiss();
		this.usr.fireUser = res.user;
		this.presentToast("Successfully registered");
		//let user = firebase.auth().currentUser;user.emailVerified()
	res.user.sendEmailVerification();
	this.presentToast("Sent email verification");
		this.navigateProfile();
	 }	catch(error){
		 loading.dismiss();
			this.presentToast("There was an error trying to add user, please check your connection.");
	  }		  
  }
  
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
