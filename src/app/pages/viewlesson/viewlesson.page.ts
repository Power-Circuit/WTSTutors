import { Component } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { VideoPlayer } from '@ionic-native/video-player/ngx';


@Component({
  selector: 'app-viewlesson',
  templateUrl: './viewlesson.page.html',
  styleUrls: ['./viewlesson.page.scss'],
})
export class ViewlessonPage {
	onlineLes = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
		videoles = '';
		
  constructor(public ls: LessonService,public router: Router,private videoPlayer: VideoPlayer) { }

  ionViewWillEnter() {
	  this.onlineLes = this.ls.onlineLes;
	  this.loadFiles();
  }
  
  viewTut(){
	   this.router.navigate(['/viewtutorial']);

  }
  
   loadFiles(){
	   
	  const storageRef = firebase.storage().ref('files');
	  storageRef.listAll().then(result => {
		  result.items.forEach(async ref => {
			  if(this.onlineLes.lessonName + "_" + this.onlineLes.Subject + "_" + this.onlineLes.Grade == ref.name){
				  alert("has video");
					this.videoles = await ref.getDownloadURL();
			  }
		  });			 
	  });
  }
  
  playVideoHosted() {
    this.videoPlayer.play(this.videoles).then(() => {
      alert('video completed');
    }).catch(err => {
     alert(err);
    });
   }
  
  

}
