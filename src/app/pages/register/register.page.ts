import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';



 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email;
  password1;
  password2;
  
  constructor(public afAuth: AngularFireAuth,private toastCtrl: ToastController,public afstore: AngularFirestore,private router: Router,public usr: UserService) { }

  ngOnInit() {
  }
  
  navigateOnline(){
    this.router.navigate(['/cloudlessons']);
  }

 navigateProfile(){
    this.router.navigate(['/profileselect'])
  }
  
  
  async register(){
	  if(this.password1 != this.password2){
		  return this.presentToast("Passwords don't match!");
	  }
	  
	  try{
		const res = await this.afAuth.createUserWithEmailAndPassword(this.email,this.password1)	
		this.afstore.doc('users/' + res.user.uid).set({
			username: this.email
		})
		
		this.usr.setUser({
			username: '',
			uid: res.user.uid,
			email: this.email,
			propic: null,
			bio: '',
			grd: ''
			
		})
		this.presentToast("Successfully registered");
		this.navigateProfile();
	 }	catch(error){
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
