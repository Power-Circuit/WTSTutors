import { Component } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ToastController, LoadingController,AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';


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
		isPrem = false;
  constructor(public ls: LessonService,public toastCtrl: ToastController,public usr: UserService,public alertController: AlertController,public router: Router,private videoPlayer: VideoPlayer) { }

  ionViewWillEnter() {
	  this.onlineLes = this.ls.onlineLes;
	  if(this.usr.isPrem){
		  this.isPrem = true;
	  }
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
					this.videoles = await ref.getDownloadURL();
			  }
		  });			 
	  });
  }
  
  playVideoHosted() {
	  if(this.isPrem){
			this.videoPlayer.play(this.videoles).then(() => {
			}).catch(err => {
			 this.presentToast(err);
			});
	  }
	  else{
		  this.getPrem();
	  }
   }
   
   async getPrem() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Premium Access only',
      message: 'You must be a premium watch video lessons, would you like to get premium access?',
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
  
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
  

}
