import { Component,NgZone,ViewChild,ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LessonService } from '../../services/lesson.service';
import { firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common'
import { ToastController, LoadingController,AlertController } from '@ionic/angular';



interface user{
	username: string,
	uid: string,
	email: string,
	propic: Blob,
	bio: string,
	grd: string,
	type: string,
	xpDate: any
}

interface commentI{
	senderID: string,  
	senderUserName: string,
	senderProPic: string,
	senderMessage: string,
	timestamp: any,
	time: any
}




@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage  {
	@ViewChild(IonContent) ionContent: IonContent;
	comment = "";
	commentI: any;
	numComm = 0;
	comments : any = [];
	Comment = {
		senderID: '',  
		senderUserName: '',
		senderProPic: '',
		senderMessage: '',
		timestamp: null,
		time: null
		
	}
	
	
	proPic = "";
	Lesson: any;
	user: any;
	isPrem = false;
	les = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
  constructor(public afstore: AngularFirestore,public dp: DatePipe,public zone: NgZone,public alertController: AlertController,public usr: UserService,public ls: LessonService,public storage: AngularFireStorage,public router: Router) { }

	ionViewWillEnter(){
		this.user = this.usr.user;
		if(this.usr.isPrem){
				this.isPrem = true;
		}
		const theSenderID = this.user.uid;
		this.Comment.senderID = theSenderID;
		this.Comment.senderUserName = this.user.username;
		if(this.usr.editUrl == ""){
			this.Comment.senderProPic = "https://firebasestorage.googleapis.com/v0/b/wtstutors.appspot.com/o/noProfile.png?alt=media&token=912141e1-15f8-4bf8-a0d9-4d442305a3f1";

		}else{
			this.Comment.senderProPic = this.usr.editUrl;
		}
		
		this.loadProPic();
		this.getComments();
		this.scrollContent();
		
	}
	
  goComment() {
	if(this.isPrem){
		  this.Comment.senderMessage = this.comment;
		 const now = new Date();
		// console.log(this.dp.transform(now, "yyyy mm dd hh mm ss");
		  this.Comment.time = moment().format("YYYYMMDD HH:mm:ss");
		  this.Comment.timestamp = firebase.firestore.FieldValue.serverTimestamp();
		  const lesson = "commentFeed/comments/" + this.ls.les.lessonName + this.ls.les.Subject + this.ls.les.Grade + "comment" ;
		 
		  
		 this.afstore.collection(lesson).add(this.Comment).then(() => {
			 this.zone.run(() => {
				this.comment = "";
				console.log("sent");
			 })
			})
			
	}
	else{
		 this.zone.run(() => {
			this.comment="";
			this.getPrem();
		 })
	}

  }
  
  
  
  getComments(){
	  const com = "commentFeed/comments/" + this.ls.les.lessonName + this.ls.les.Subject + this.ls.les.Grade + "comment" ;

	   const lesCollectionRef = this.afstore.collection(com, ref => ref.orderBy('timestamp')); 
  
   const less = lesCollectionRef.valueChanges().subscribe(res => {
	   this.comments=[];
	   var count = 0;
	   res.forEach(item => {
		    this.zone.run(() => {
			this.commentI = item;
				this.commentI.time = moment(this.commentI.time,"YYYYMMDD HH:mm:ss").fromNow();
		   this.comments.push(this.commentI);
		   count = count + 1;
		   this.scrollContent();
			})
	   });
	   this.zone.run(() => {
		this.numComm = count;
	   })
	   
   });
   //this.lessons = 
  
  }
  
  loadProPic(){
	  const uid = this.usr.getUid() + "_pic";
	  
	  const storageRef = firebase.storage().ref('ProfilePics');
	 storageRef.listAll().then(result => {
		  result.items.forEach(async ref => {
					if(ref.name == uid){
						this.proPic = await ref.getDownloadURL();
						//this.usr.currentPic = this.proPic;
					}
			  })
		  			 
	  }).catch((err) => {
				alert("error: " + err);
		});
   }
   
   async getPrem() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Premium Access only',
      message: 'You must be a premium user to comment, would you like to get premium access?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.navigatePrem();
          }
        }
      ]
    });

    await alert.present();
  }
  
  navigatePrem(){
    this.router.navigate(['/requestpremium']);
  }
   
   
  
   scrollContent() {
	   
	   //this.ionContent.scrollHeight	= (80/100) * this.ionContent.scrollHeight	   
    setTimeout(() => {
      this.ionContent.scrollToBottom(300);  //300 for animate the scroll effect.
    }, 300)
  }

}
