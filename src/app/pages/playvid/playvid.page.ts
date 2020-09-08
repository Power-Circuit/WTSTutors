import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';


@Component({
  selector: 'app-playvid',
  templateUrl: './playvid.page.html',
  styleUrls: ['./playvid.page.scss'],
})
export class PlayvidPage implements OnInit {
	vid = '';
  constructor(public ls: LessonService) { }

  ngOnInit() {
	  
  }
  
  ionViewWillEnter(){
	  this.vid = this.ls.currentVideo;
	  alert("video playing: " + this.vid);
  }

}
