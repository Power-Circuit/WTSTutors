import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-lessontype',
  templateUrl: './lessontype.page.html',
  styleUrls: ['./lessontype.page.scss'],
})


export class LessontypePage implements OnInit {
	les = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
	
	lessons = [];
  constructor(public route: Router,public loadingController: LoadingController,public toastCtrl: ToastController,private storage: Storage, public ls: LessonService) { }
		
  ngOnInit() {
	 this.ls.start();
	   // Or to get a key/value pair
  this.storage.get('myLessons').then((val) => {
		if(val == null){
				//this.empty = true;
				//this.noLessons = 0;
				console.log("recieved no lessons");
			}				
			else{
				this.lessons = val;
			}
  });
  }
  
  async save(){
	  const loading = await this.loadingController.create({
      cssClass: 'lesson',
      message: 'Creating lesson...',
      
    });
    await loading.present();
	
	  this.les.lessonIndex = this.lessons.length;
	  this.lessons.push(this.les);
	  this.ls.update(this.les);
	  this.storage.set('myLessons', this.lessons);
	  loading.dismiss();
	  this.presentToast("Created " + this.les.lessonName + " successfully!");
	  this.navigateToChalkboard();
  }
  
  navigateToChalkboard(){
    this.route.navigate(['/chalkboard']);
  }
  
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  

}
