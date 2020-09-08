import { Component} from '@angular/core';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-viewtutorial',
  templateUrl: './viewtutorial.page.html',
  styleUrls: ['./viewtutorial.page.scss'],
})
export class ViewtutorialPage {

  onlineLes = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
  constructor(public ls: LessonService) { }

  ionViewWillEnter() {
	  this.onlineLes = this.ls.onlineLes;
	  this.onlineLes.tutorials =  this.onlineLes.slides;
  }

}
