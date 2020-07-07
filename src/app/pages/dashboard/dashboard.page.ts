import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { VideoPlayer } from '@ionic-native/video-player/ngx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
	lessons = [];
	empty = true;
	noLessons = 0;
	tutorials = [];
  constructor(private storage: Storage,private videoPlayer: VideoPlayer,public alertController: AlertController ,public ls: LessonService) { }

  ionViewDidEnter() {
	  this.storage.get('myLessons').then((val) => {
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
  
 
	
	deleteLesson(lesson){
		this.presentAlertConfirm(lesson.lessonIndex);
	}
	
	  async presentAlertConfirm(index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you would like to delete this lesson? <strong>text</strong>',
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
			  this.storage.set('myLessons', this.lessons);
			 this.storage.set("tutorial " + index,null);

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
  
  playVideoHosted() {
    this.videoPlayer.play('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4').then(() => {
      this.presentAlert('video completed');
    }).catch(err => {
     this.presentAlert(err);
    });
  }
  
  

}
