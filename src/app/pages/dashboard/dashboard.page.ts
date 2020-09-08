import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { ImagehandlerService } from '../../services/imagehandler.service';
import { CloudlessonsService } from '../../services/cloudlessons.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { firestore } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs/Observable';

interface Lesson {
  name: string,  
  subject: string,
  grade: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
	lessons = [];
//lesCollectionRef: AngularFirestoreCollection<Lesson>;

	//lessons;
	empty = true;
	noLessons = 0;
	tutorials = [];
	vidURL ='';
	uploadProgress = 0;
	les = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
  constructor(private storageLocal: Storage,public afstore: AngularFirestore,public cl: CloudlessonsService,public file: File,public storage: AngularFireStorage,public img: ImagehandlerService,private videoPlayer: VideoPlayer,public alertController: AlertController ,public ls: LessonService) { }

  ionViewDidEnter() {
	  this.storageLocal.get('myLessons').then((val) => {
			//console.log('Your ideaname is', val.ideaname);
			if(val == null){
				this.empty = true;
				this.noLessons = 0;
				console.log("recieved no lessons");
			}				
			else{
				this.lessons = val;
				console.log("recieved lessons: " +this.lessons[0].lessonName);
				if(this.lessons.length == 0){
					this.empty = true;
					this.noLessons = 0;
				}
				else{
					this.empty = false;
					this.noLessons = this.lessons.length;
				}
			}
			
		});
  }
  
  load(item){
	  	  this.ls.update(item);

	  console.log("can load and route");
  }
  
  createPost(item){
	  this.les = item;
     this.afstore.collection('lessons').add(this.les).then(() => {
		 this.uploadFile(this.les);
			alert("uploaded lesson succesfully");
		})
}
  

  clear(){
	   this.storageLocal.set('myLessons', null);
	   this.storageLocal.set('tutorial0', null);
	   this.storageLocal.set('tutorial1', null);
	   this.storageLocal.set('tutorial2', null);
	   this.storageLocal.set('tutorial3', null);
	   this.storageLocal.set('tutorial4', null);
	   alert("deleted lessons!");
  }
  
	deleteLesson(lesson){
		this.presentAlertConfirm(lesson.lessonIndex, "'Are you sure you would like to delete this lesson?");
	}
	
	  async presentAlertConfirm(index,msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
			  this.lessons.splice(index,1);
			  this.storageLocal.set('myLessons', this.lessons);
			 this.storageLocal.set("tutorial " + index,null);

            this.presentDelete();
          }
        }
      ]
    });
	
    await alert.present();
  }
  
   async presentDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Delete',
      message: 'Your lesson has been deleted.',
      buttons: ['OK']
    });

    await alert.present();
  } 

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Delete',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  
   uploadpic(){
       
        this.img.uploadimage().then((uploadedurl: any) =>{
          this.vidURL = uploadedurl;
		  alert("found video: " + uploadedurl);
        })
    }
  
  playVideoHosted() {
    this.videoPlayer.play(this.vidURL).then(() => {
      this.presentAlert('video completed');
    }).catch(err => {
     this.presentAlert(err);
    });
  }
  
  
  async uploadFile(item) {
    const path = this.vidURL;
  
   var fileBlob ;
   this.img.uploadpost().then((post) => {
	   fileBlob = post;
   }).then(() => {
	const name = item.lessonName;
	const sub = item.Subject;
	const grd = item.Grade;
    const randomId = Math.random()
		  .toString(36)
		  .substring(2, 8);
		const uploadTask = this.storage.upload(
		   `files/${name}_${sub}_${grd}`,
		  fileBlob
		);
		uploadTask.percentageChanges().subscribe(change => {
		  this.uploadProgress = change;
		});
		uploadTask.then(async res => {
			alert("upload success");
		
		}).catch((err) => {
			alert("error: " + err.code);
		});
   })
  }
  
   getMimeType(fileExt) {
    if (fileExt == 'wav') return { type: 'audio/wav' };
    else if (fileExt == 'jpg') return { type: 'image/jpg' };
    else if (fileExt == 'mp4') return { type: 'video/mp4' };
    else if (fileExt == 'MOV') return { type: 'video/quicktime' };
  }
  
   async options(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Options',
      message: item.lessonName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
			
          }
        }, {
          text: 'Upload Lesson',
          handler: () => {
           this.createPost(item);
          }
        }, {
          text: 'Delete Lesson',
          handler: () => {
            this.deleteLesson(item);
          }
        },
      ]
    });

    await alert.present();
  }
  
  

}
