import { Component } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage  {
	les = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
	
	lessons = [];
	slides = [];
  constructor(private storage: Storage, public ls: LessonService) { }

  ionViewWillEnter() {
	  	  this.storage.get('myLessons').then((val) => {

			if(val == null){
				
				console.log("recieved no lessons");
			}				
			else{
				this.lessons = val;
				this.slides = [];
				this.slides = this.lessons[this.ls.lessonIndex].slides;
				
			}
			
		});
  }
//
}
