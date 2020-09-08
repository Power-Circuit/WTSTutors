import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	email;
  password1;
  constructor(public afAuth: AngularFireAuth,private usr: UserService,private router: Router) { }

  ngOnInit() {
  }
  
  navigateLogin(){
    this.router.navigate(['/dashboard'])
  }
  
  
  async login(){
	  
	  try{
		  const res = await this.afAuth.signInWithEmailAndPassword(this.email,this.password1)
		 alert("Logged in Successfully!")
		 this.navigateLogin();
	  }catch(err){
		  alert("Could not log in: " + err);
		
	  }
  }


}
