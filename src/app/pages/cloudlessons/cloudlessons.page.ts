import { Component,NgZone,ViewChild,ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LessonService } from '../../services/lesson.service';
import { MenuPage } from '../menu/menu.page';
import { UserService } from '../../services/user.service';
import { firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';


interface Lesson {
  lessonName: string,  
  Subject: string,
  Grade: number
}

interface user{
	username: string,
	uid: string,
	email: string,
	propic: Blob,
	bio: string,
	grd: string
}



@Component({
  selector: 'app-cloudlessons',
  templateUrl: './cloudlessons.page.html',
  styleUrls: ['./cloudlessons.page.scss'],
})
export class CloudlessonsPage {
		@ViewChild(IonContent) ionContent: IonContent;
	isPrem = false;
	cloudFiles = [];
	currentVideo = '';
	comments = [];
	
	disabled = true;
	isAdmin = false;
		lessons = [];
		currentLessons = [];
		sub = 'All';
		grd = '0';
		proPic: any = 'https://firebasestorage.googleapis.com/v0/b/wtstutors.appspot.com/o/noProfile.png?alt=media&token=912141e1-15f8-4bf8-a0d9-4d442305a3f1';
		public user: any;

//lesCollectionRef: AngularFirestoreCollection<Lesson>;
	hasRequests = false;
  constructor(private iab: InAppBrowser,public popoverController: PopoverController,public usr: UserService,public zone: NgZone,public router: Router,public afstore: AngularFirestore,public ls: LessonService,private videoPlayer: VideoPlayer) { }

  
  
  ionViewWillEnter(){
	  if(this.usr.isPrem){
		  this.isPrem = true;
	  }
	  this.lessons = [];
	  this.currentLessons = [];
	  
	  this.getLesson();
	  this.loadFiles();
	  this.loadLessons();
		this.loadProPic();
		//this.getProfile();
		this.scrollContent();
		if(this.usr.isAdmin == true){
			this.isAdmin = true;
			this.disabled = false;
		}
		        
  }
  
  loadLessons(){
	  this.currentLessons = this.lessons;
  }
  
  navigateEdit(){
    this.router.navigate(['/editprofile']);
  } 
  
  viewAdmin(){
	  if(this.isAdmin == true){
		this.router.navigate(['/dashboard']);
	  }else{
	  };
  }
  
  navigateComment(item){
	  this.ls.les = item;
    this.router.navigate(['/comment']);
  }
  
    async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
	
  
   loadProPic(){
	   
	this.zone.run(() => {
		if(this.usr.editUrl != ""){
			this.proPic = "";
			this.proPic = this.usr.editUrl;
		}
	})
					
		
   }
  
  navigateDash(){
    this.router.navigate(['/login']);
  }
  
  getLesson(){
	   const lesCollectionRef = this.afstore.collection('lessons'); 
  
   const less = lesCollectionRef.valueChanges().subscribe(res => {
	   res.forEach(item => {
		   this.lessons.push(item);
	   })
   });
  
  }
  
  getProfile(){
	  const uid = this.usr.getUid() + "";
	   const lesCollectionRef = this.afstore.collection('userprofiles'); 
		
   const less = lesCollectionRef.valueChanges().subscribe(res => {
	   res.forEach(item => {
		   this.user = item;
		   if(this.user.uid == uid){
			   this.usr.user = this.user;
		   }
	   })
   });
  
  }
  
  getRequests(){
	  	   const lesCollectionRef = this.afstore.collection('userprofiles'); 
			var comments = [];
				   const less = lesCollectionRef.valueChanges().subscribe(res => {
					   res.forEach(item => {
						   const user:any = item;
						   if(this.user.type == "request"){
							   comments.push(this.user);
						   }
					   })
					   if(comments.length == 0){
						   this.hasRequests = true;
					   }
				   });
	  
  }

	selectSubject(ev){
		var temp = [];
		temp = this.currentLessons;
		this.zone.run(() => {
			  
			
		  
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
	  const storageRef = firebase.storage().ref('pdfs');
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
  
  scrollContent() {
    
      this.ionContent.scrollToBottom(300);  //300 for animate the scroll effect.
    
  }
 
  
  
 

}
