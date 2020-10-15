import { Component, AfterViewInit,OnInit, ViewChild, Renderer2 , NgZone} from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LessonService } from '../../services/lesson.service';
import { ImagehandlerService } from '../../services/imagehandler.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

import { ToastController, LoadingController,AlertController } from '@ionic/angular';


@Component({
  selector: 'app-viewtutorial',
  templateUrl: './viewtutorial.page.html',
  styleUrls: ['./viewtutorial.page.scss'],
})
export class ViewtutorialPage {

  options: any;
	tutorialPics = []; //array of tutorials pics
	tutorialBlobs = []; //array of tutorials pics blob objects
	nativepath: any;
	cloudFiles = [];
	lessons = [];
	imgBlob: any = null;
	imgurl:any = "";
	onlineLes = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
   constructor(private imagePicker: ImagePicker,public imgServ: ImagehandlerService,private storage: Storage,public ls: LessonService ,public filechooser: FileChooser, public zone: NgZone) {}

	ionViewWillEnter() {
			  this.onlineLes = this.ls.onlineLes;
			  this.tutorialBlobs = [];
			  this.tutorialPics = [];
			  this.loadPDF();
			// this.tutorialBlobs = this.onlineLes.tutorials;
			this.zone.run(() => {
					for (var i = 0; i < this.tutorialBlobs.length; i++) {

						var reader = new FileReader();
						const imgBlob: any = this.tutorialBlobs[i];
						reader.readAsDataURL(imgBlob);
						reader.onloadend = () => {
							const imgurl = reader.result;
							this.tutorialPics.push(imgurl);
						}
						err => { 
						// display error
						console.log("error trying to read blob...");
						}
						//this.imgurl = res;
					}	//this.imgurl = this.imgServ.nativepath;
			})
	  
  }
  
  loadPDF(){
	  this.cloudFiles = [];
	  const lsName = this.onlineLes.lessonName + "_" + this.onlineLes.Subject + "_" + this.onlineLes.Grade;
	  const storageRef = firebase.storage().ref('pdfs');
	  storageRef.listAll().then(result => {
		  result.items.forEach(async ref => {
			 
			  if(ref.name == lsName){
			 this.cloudFiles.push({
				name: ref.name,
				full: ref.fullPath,
				ref,
				url: await ref.getDownloadURL()
			 });
			  }	
			else{
			}	
		  });		
		  		  
	  });
  }
  
  openPdf(item){
  
  window.open(item.url);
  
  }
  
 
 
  
  
  

}
