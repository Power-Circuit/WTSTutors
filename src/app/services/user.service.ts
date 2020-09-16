import { Injectable } from '@angular/core';

interface user{
	username: string,
	uid: string,
	email: string,
	propic: Blob,
	bio: string,
	grd: string
}

@Injectable({
  providedIn: 'root'
})



export class UserService {
	
	public user: any;
	editUrl ='';
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
