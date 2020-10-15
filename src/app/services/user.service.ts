import { Injectable } from '@angular/core';

interface user{
	username: string,
	uid: string,
	email: string,
	propic: string,
	bio: string,
	grd: string,
	type: string,
	xpDate: any,
	refNum: string
}

@Injectable({
  providedIn: 'root'
})



export class UserService {
	fireUser: any;
	public user: any;
	editUrl ='';
	isAdmin = false;
	isPrem = false;
  constructor() { }
  
  setUser(user: user){
	  this.user = user;
  }
  
  getUid(){
	  return this.user.uid;
  
  
  }
  
  getProPic(){
	  return this.user.propic;
  }
  
  getName(){
	  return this.user.username;
  }
}
