import { Component,NgZone,ViewChild,ElementRef } from '@angular/core';
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


@Component({
  selector: 'app-requestpremium',
  templateUrl: './requestpremium.page.html',
  styleUrls: ['./requestpremium.page.scss'],
})
export class RequestpremiumPage  {
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
		time: null,
		rStatus: ''
		
	}
	
	
	proPic = "";
	Lesson: any;
	user: any;
	isPrem = false;
  constructor(public afstore: AngularFirestore,public router: Router,public loadingController: LoadingController,public toastCtrl: ToastController,public alertController: AlertController,public dp: DatePipe,public zone: NgZone,public usr: UserService,public ls: LessonService,public storage: AngularFireStorage) { }
	
	
	 async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  
	request2() {
	 // var now = yyyy-mm-dd hh:mm:ss;
	  this.Comment.senderMessage = this.comment;
	  this.Comment.senderID = this.usr.getUid() + "";
	  this.Comment.senderProPic = this.usr.editUrl;
	  this.Comment.rStatus = 'Pending...';
	  this.Comment.senderUserName = this.usr.user.username;
	 const now = new Date();
	// console.log(this.dp.transform(now, "yyyy mm dd hh mm ss");
	  this.Comment.time = moment().format("YYYYMMDD HH:mm:ss");
	  this.Comment.timestamp = firebase.firestore.FieldValue.serverTimestamp();
	  const request = "requests/req/req" ;
	 
	  
     this.afstore.collection(request).add(this.Comment).then(() => {
		 this.zone.run(() => {
			this.comment = "";
			console.log("sent");
		 })
		})

  }
  
  request(){
	  		 this.zone.run(() => {

		this.usr.user.type = "request"; 
		this.usr.user.refNum = this.comment; 
		this.comment = "";
		this.usr.user.propic = this.usr.editUrl; 
		
			 this.afstore.doc('userprofiles/' + this.usr.getUid()).update(this.usr.user).then(() => {
				 //this.uploadFile(this.les);
					this.presentToast("Updated profile!");
					this.navigateDash();

				}).catch((err) => {
				this.presentToast("error: " + err);
			});
		
	
	  
			
  })
  
  }
  
  navigateDash(){
	  this.presentToast("Requested premium access!");
    this.router.navigate(['/cloudlessons']);
  }
  
}
