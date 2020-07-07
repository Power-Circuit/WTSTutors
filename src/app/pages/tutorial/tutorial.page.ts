import { Component, AfterViewInit,OnInit, ViewChild, Renderer2 , NgZone} from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LessonService } from '../../services/lesson.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {
	options: any;
	tutorialPics = []; //array of tutorials pics
	nativepath: any;
	lessons = [];
   constructor(private imagePicker: ImagePicker,private storage: Storage,public ls: LessonService ,public filechooser: FileChooser, public zone: NgZone) {}

	ionViewDidEnter() {
	  this.storage.get("tutorial " + this.ls.lessonIndex).then((val) => {
			//console.log('Your ideaname is', val.ideaname);
			if(val == null){
				
				
				
			}				
			else{
				
				
				this.tutorialPics = val;
			}
			
		});
  }
  
  save(){

	  
	  
	  this.storage.set("tutorial " + this.ls.lessonIndex, this.tutorialPics);
	  alert("saved tutorial pics!");
  }

  getImages() {
    this.options = {
  
      
      width: 300,
   
      quality: 100,

   
      outputType: 1
    };
  
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.tutorialPics.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }
  


}
