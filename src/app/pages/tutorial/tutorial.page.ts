import { Component, AfterViewInit,OnInit, ViewChild, Renderer2 , NgZone} from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LessonService } from '../../services/lesson.service';
import { ImagehandlerService } from '../../services/imagehandler.service';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController,AlertController } from '@ionic/angular';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {
	options: any;
	tutorialPics = []; //array of tutorials pics
	tutorialBlobs = []; //array of tutorials pics blob objects
	nativepath: any;
	lessons = [];
	imgBlob: any = null;
	imgurl:any = "";
	isSet = false;
   constructor(private imagePicker: ImagePicker,private document: DocumentViewer,public toastCtrl: ToastController,public imgServ: ImagehandlerService,private storage: Storage,public ls: LessonService ,public filechooser: FileChooser, public zone: NgZone) {}

	ionViewWillEnter() {
	  this.storage.get("tutorial " + this.ls.les.lessonName + this.ls.les.Subject + this.ls.les.Grade).then((val) => {
			//console.log('Your ideaname is', val.ideaname);
			if(val == null){
				
				this.tutorialBlobs = [];
				this.tutorialPics = [];
				//this.study();
				
			}				
			else{
				
				
				this.tutorialBlobs = [];
				this.tutorialPics = [];
				this.tutorialBlobs = val;
				this.zone.run(() => {

						var reader = new FileReader();
						const imgBlob: any = this.tutorialBlobs[0];
						reader.readAsDataURL(imgBlob);
						reader.onloadend = () => {
							const pdfurl = reader.result;
							this.tutorialPics.push(pdfurl);
							//this.study();
						}
						err => { 
						alert("error trying to read blob...");
						}
			})
				
				
			}
			
		});
  }
  
  save(){

	  
	  
	  this.storage.set("tutorial " + this.ls.les.lessonName + this.ls.les.Subject + this.ls.les.Grade, this.tutorialBlobs);
	  this.presentToast("saved tutorial pics!");
  }
  
  openPdf(url){
		  const options: DocumentViewerOptions = {
	  title: 'My PDF'
	}

this.document.viewDocument(url, 'application/pdf', options)
  }
  
   openpdf(url){
  
  window.open(url);
  
  }
  
  savee(){
	  const options: DocumentViewerOptions = {
  title: 'random pdf'
}

this.document.viewDocument('../../../assets/myFile.pdf', 'application/pdf', options);
  }
  
  getPdf(){
	  this.imgServ.fetchPdfBlob().then((res) => {
		  this.tutorialBlobs.push(res);
		  var reader = new FileReader();
			const tutBlob: any = res;
			this.zone.run(() => {
			reader.readAsDataURL(tutBlob);
			reader.onloadend = () => {
				const pdfurl = reader.result;
				this.tutorialPics[0] = pdfurl;
			}
			err => { 
			// display error
			alert("error trying to read blob...");
			}
			
			})
	  })
	  
  }
  
  ionViewWillLeave(){
	  this.tutorialBlobs = [];
	  this.tutorialPics = [];
	  
  }

  
  
  getImages(){
		this.imgServ.fetchImageBlob().then((res) => {
			this.zone.run(() => {
				var reader = new FileReader();
				var imgBlob2: any = res;
				 this.tutorialBlobs.push(imgBlob2);
          reader.readAsDataURL(imgBlob2);
          reader.onloadend = () => {
            var imgurl2:any = reader.result;
			this.tutorialPics.push(imgurl2);
          }
        err => {
            // display error
			alert("error trying to read blob...");
        }
				//this.imgurl = res;
				//this.imgurl = this.imgServ.nativepath;
			})
		})
	}
	
	async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  


}
