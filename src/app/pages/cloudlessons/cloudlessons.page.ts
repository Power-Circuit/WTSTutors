import { Component,NgZone } from '@angular/core';

import * as firebase from 'firebase/app';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LessonService } from '../../services/lesson.service';
import { firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


interface Lesson {
  lessonName: string,  
  Subject: string,
  Grade: number
}


@Component({
  selector: 'app-cloudlessons',
  templateUrl: './cloudlessons.page.html',
  styleUrls: ['./cloudlessons.page.scss'],
})
export class CloudlessonsPage {
	cloudFiles = [];
	currentVideo = '';
		lessons = [];
		currentLessons = [];
		sub = 'All';
		grd = '0';
//lesCollectionRef: AngularFirestoreCollection<Lesson>;

  constructor(private iab: InAppBrowser,public zone: NgZone,public router: Router,public afstore: AngularFirestore,public ls: LessonService,private videoPlayer: VideoPlayer) { }

  
  
  ionViewWillEnter(){
	  this.lessons = [];
	  this.currentLessons = [];
	  
	  this.getLesson();
	  this.loadFiles();
	  this.loadLessons();
  }
  
  loadLessons(){
	  this.currentLessons = this.lessons;
  }
  
  getLesson(){
	   const lesCollectionRef = this.afstore.collection('lessons'); 
  
   const less = lesCollectionRef.valueChanges().subscribe(res => {
	   res.forEach(item => {
		   this.lessons.push(item);
	   })
   });
   //this.lessons = 
  
  }

	selectSubject(ev){
		var temp = [];
		temp = this.currentLessons;
		this.zone.run(() => {
			  
			
			//setpassword2(idea,data.password);
		  
			this.currentLessons = [];
			if(this.sub == "All"){
				
				if(this.grd =="0"){
					for(var key in this.lessons){
						this.currentLessons.push(this.lessons[key]);
					}
				}
				else{
					for(var key in this.lessons){
						if(this.lessons[key].Grade == this.grd){
							this.currentLessons.push(this.lessons[key]);
						}
					}
				}
			}
			else{
				if(this.grd =="0"){
					for(var key in this.lessons){
						if(this.lessons[key].Subject == this.sub){
							this.currentLessons.push(this.lessons[key]);
							alert("yep!");
						}
					}
				}
				else{
					for(var key in this.lessons){
						if(this.lessons[key].Subject == this.sub && this.lessons[key].Grade == this.grd){
							this.currentLessons.push(this.lessons[key]);
						}
					}
				}
			}
		})
	}
	
	selectGrade(ev){
		var temp = [];
		temp = this.currentLessons;
		this.zone.run(() => {
			  
			
			//setpassword2(idea,data.password);
		  
			this.currentLessons = [];
			if(this.grd == "0"){
				
				if(this.sub =="All"){
					for(var key in this.lessons){
						this.currentLessons.push(this.lessons[key]);
					}
				}
				else{
					for(var key in this.lessons){
						if(this.lessons[key].Subject == this.sub){
							this.currentLessons.push(this.lessons[key]);
						}
					}
				}
			}
			else{
				if(this.sub =="All"){
					for(var key in this.lessons){
						if(this.lessons[key].Grade == this.grd){
							this.currentLessons.push(this.lessons[key]);
						}
					}
				}
				else{
					for(var key in this.lessons){
						if(this.lessons[key].Subject == this.sub && this.lessons[key].Grade == this.grd){
							this.currentLessons.push(this.lessons[key]);
						}
					}
				}
			}
		})
	}
  
  viewLesson(lesson){
	  this.ls.onlineLes = lesson;
	  for(var key in this.cloudFiles){
					//if(lesson.lessonName + "_" + lesson.Subject + "_" + lesson.Grade == this.cloudFiles[key].name){
						//this.ls.currentVideo = this.cloudFiles[key].name;
					//	alert("video url: " + this.cloudFiles[key].name);
					//}
					//alert(this.cloudFiles.name);
				}
	  this.router.navigate(['/viewlesson']);
  }

  
  loadFiles(){
	  this.cloudFiles = [];
	  const storageRef = firebase.storage().ref('files');
	  storageRef.listAll().then(result => {
		  result.items.forEach(async ref => {
			 this.cloudFiles.push({
				name: ref.name,
				full: ref.fullPath,
				ref,
				url: await ref.getDownloadURL()
			 });		
		  });			 
	  });
  }
  
  openExternal(url){
	  this.iab.create(url);
  }
  
   playVideoHosted(url) {
    this.videoPlayer.play(url).then(() => {
      alert('video completed');
    }).catch(err => {
     alert(err);
    });
   }
  
  addToPlay(url){
	  this.ls.currentVideo = url;
  }
  
  deleteFile(ref: firebase.storage.Reference){
	  ref.delete().then(() => {
		 this.loadFiles();
	  });
  }
  
 
  
  
 

}
