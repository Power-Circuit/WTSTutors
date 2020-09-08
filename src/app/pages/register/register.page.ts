import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email;
  password1;
  password2;
  
  constructor(public afAuth: AngularFireAuth,public afstore: AngularFirestore,private router: Router,public usr: UserService) { }

  ngOnInit() {
  }
  
  navigateLogin(){
    this.router.navigate(['/dashboard'])
  }
  
  
  async register(){
	  if(this.password1 != this.password2){
		  return console.log("Passwords don't match!");
	  }
	  
	  try{
		const res = await this.afAuth.createUserWithEmailAndPassword(this.email,this.password1)	
		this.afstore.doc('users/${res.user.uid}').set({
			username: this.email
		})
		
		this.usr.setUser({
			username: this.email,
			uid: res.user.uid
		})
		
		alert("registered! ");
	 }	catch(error){
			console.dir(error);
	  }		  
  }
}
