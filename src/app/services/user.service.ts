import { Injectable } from '@angular/core';

interface user{
	username: string,
	uid: string
}

@Injectable({
  providedIn: 'root'
})



export class UserService {
	
	private user: any;
	
  constructor() { }
  
  setUser(user: user){
	  this.user.user
  }
  
  getUid(){
	  return this.user.uid;
  }
}
