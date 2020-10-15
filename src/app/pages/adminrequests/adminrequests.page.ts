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
import { ToastController, LoadingController ,AlertController} from '@ionic/angular';

interface user{
	username: string,
	uid: string,
	email: string,
	propic: Blob,
	bio: string,
	grd: string,
	type: string
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
  selector: 'app-adminrequests',
  templateUrl: './adminrequests.page.html',
  styleUrls: ['./adminrequests.page.scss'],
})
export class AdminrequestsPage {
	comment = "";
	commentI: any;
	numComm = 0;
	numReq = 0;
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
	les = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
  constructor(public afstore: AngularFirestore,public alertController: AlertController,public loadingController: LoadingController,public toastCtrl: ToastController,public dp: DatePipe,public zone: NgZone,public usr: UserService,public ls: LessonService,public storage: AngularFireStorage) { }

	ionViewWillEnter(){
		this.getRequests();
	}
	

   //this.lessons = 
  
  
  
  decline(item,reason){
	    let index = this.comments.indexOf(item);

			
	  		 this.zone.run(() => {

		item.type = "declined"; 
		item.refNum = reason; 
		this.comment = "";
		
			 this.afstore.doc('userprofiles/' + item.uid).update(item).then(() => {
				 //this.uploadFile(this.les);
					this.presentToast("Declined request");
					this.comments.splice(index,1);

				}).catch((err) => {
				this.presentToast("error: " + err);
			});
		
	
	  
			
  })
  
  } 
  
  grant(item){
	    let index = this.comments.indexOf(item);

			
	  		 this.zone.run(() => {

		item.type = "premium"; 
		//item.xpDate = moment().; 
		item.xpDate = moment().add(3, 'months').calendar(); 
		this.comment = "";
		
			 this.afstore.doc('userprofiles/' + item.uid).update(item).then(() => {
				 //this.uploadFile(this.les);
					this.presentToast("Accepted request");
					this.comments.splice(index,1);

				}).catch((err) => {
				this.presentToast("error: " + err);
			});
		
	
	  
			
  })
  
  }
  
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  
  getRequests(){
	  	   const lesCollectionRef = this.afstore.collection('userprofiles'); 
		
				   const less = lesCollectionRef.valueChanges().subscribe(res => {
					   res.forEach(item => {
						   this.user = item;
						   if(this.user.type == "request"){
							   this.comments.push(this.user);
						   }
					   })
				   });
	  
  }
  
  async deletePrompt(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Decline Request',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Reason for rejecting request?'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //this.grant(item);
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.decline(item,data.reason);
          }
        }
      ]
    });

    await alert.present();
  }
  
  
  async grantConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Grant Premium Access',
      message: 'Are you sure you want to grant this user 3 months premium access?',
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
            this.grant(item);
          }
        }
      ]
    });

    await alert.present();
  }

}
