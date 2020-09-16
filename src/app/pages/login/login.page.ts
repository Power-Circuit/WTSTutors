import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	email: "";
  password1: "";
  constructor(public afAuth: AngularFireAuth,public toastCtrl: ToastController,private usr: UserService,private router: Router) { }

  ngOnInit() {
  }
  
  navigateLogin(){
    this.router.navigate(['/dashboard'])
  }
  
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
  
  async login(){
	  
	  try{
		  const res = await this.afAuth.signInWithEmailAndPassword(this.email,this.password1);
		  if(res.user){
		  	  this.usr.setUser({
			username: '',
			uid: res.user.uid,
			email: this.email,
			propic: null,
			bio: '',
			grd: ''
			
		})
		  }
		 this.presentToast("Successfully logged in!");
		 this.navigateLogin();
	  }catch(err){
		  this.presentToast("Could not log in: " + err);
		
	  }
  }


}
