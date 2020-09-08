import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CloudlessonsService {
  constructor() { }
  
  /*uploadLesson(){
	  var promise = new Promise((resolve,reject) => {
				this.firepost.push({
					grade: 12,
					subject: 'math',
					title: 'graphs'
				}).then(() => {
					resolve({ success: true}) ;
			      })
				  
	  })
		   
	  
	  return promise;
  }*/
}
