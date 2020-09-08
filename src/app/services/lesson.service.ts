import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
	
	
		les = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
	lessonIndex = 0;
	currentVideo='';
	onlineLes = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
  constructor() {
		this.start();
	  console.log("instialize lesson service");
  }
  
  start(){
	 console.log("initialize service");
  }
  
  update(item){
	  this.les = item;
	  this.lessonIndex = item.lessonIndex;
  }
	  
	  
  
}
