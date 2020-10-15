import { Component, AfterViewInit, ViewChild, Renderer2 , NgZone} from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LessonService } from '../../services/lesson.service';
import { ImagehandlerService } from '../../services/imagehandler.service';
import { ToastController, LoadingController,AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chalkboard',
  templateUrl: './chalkboard.page.html',
  styleUrls: ['./chalkboard.page.scss'],
})
export class ChalkboardPage {
	
	@ViewChild('imageCanvas', {static: false}) canvas: any;
	isDrawing = false; //check if user is pressing on board or not
	//canvasElement: any;
	imgBlob: any = null;
	imgurl: any = "";
	saveX: number; //track x coordinate of touch
	saveY: number; //track y coordinate of touch
	nativepath: any; //track path of fetchd image
	currentColor = '#fff'; //track current selected color
	colors = ['#ff0','#f00', '#0f0','#00f', '#0ff','#fff','#000']; //array of availale colors
	lineWidth = 5; //track drawing line width
	canvasElement: any; //object to store canvas object
		lastX; //track last x coordinate of touch.
		lastY; //track last r coordinate of touch.
      options: any; 
	les = {
			lessonName: '',
			Grade: '',
			Subject: '',
			lessonIndex : 0,
			tutorials : [],
			slides: []
		}
	undo = [];
	slides = [];
	lessons = [];
	tutorials = [];
 constructor(private plt: Platform,public toastCtrl: ToastController,public imgServ: ImagehandlerService,private storage: Storage,public ls: LessonService,private imagePicker: ImagePicker, public renderer: Renderer2, public filechooser: FileChooser, public zone: NgZone) {}
  
  ngAfterViewInit(){//inizialize drawing board
		this.les = this.ls.les;
	    this.canvasElement = this.canvas.nativeElement;
        //this.can.thecanvas = this.canvas;
        this.renderer.setAttribute(this.canvasElement, 'width', this.plt.width() * (99.5/100) + '');
        this.renderer.setAttribute(this.canvasElement, 'height', this.plt.height() * (80 / 100) + '');
        var ctx = this.canvasElement.getContext('2d');
		ctx.fillStyle ="black";
		ctx.fillRect(0,0,this.canvasElement.width,this.canvasElement.height);
		//
		  this.storage.get('myLessons').then((val) => {
			//console.log('Your ideaname is', val.ideaname);
			if(val == null){
				
				
				
			}				
			else{
				this.lessons = val;
				this.slides = this.lessons[this.ls.lessonIndex].slides;
				this.tutorials = this.lessons[this.ls.lessonIndex].tutorials;
				
			}
			
		});
		
  }
  
   handleStart(ev){ //when user touches down on board
		let dataUrl = this.canvasElement.toDataURL();

	   this.undo.push(dataUrl);
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    }
	
	
    handleMove(ev){ //when user moves finger on board
        var ctx = this.canvasElement.getContext('2d');
        var currentX = ev.touches[0].pageX;
        var currentY = ev.touches[0].pageY;
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColor;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        this.lastX = currentX;
        this.lastY = currentY;
    }
	
   handleEnd(ev){
	   		
   }
   
	doundo(){
		        var ctx = this.canvasElement.getContext('2d');

		let source = new Image();
            source.src = this.undo.pop();
            source.crossOrigin = 'Anonymous';
            source.onload = () => {
                ctx.drawImage(source, 0, 0, this.canvasElement.width, this.canvasElement.height);
            };
	}
   
  
  selectColor(col){ //change pen color
	  this.currentColor = col;
  }
  
  saveCanvasImage() {
		
		/* var toaster = this.tst.create({
		  duration: 3000,
		  position: 'bottom'
	  });*/
	
		var dataUrl = this.canvasElement.toDataURL();
		
			
			this.slides.push(dataUrl); 
		 this.lessons[this.ls.lessonIndex].slides = this.slides;
		 this.lessons[this.ls.lessonIndex].tutorials = this.tutorials;

	  
	  
	  this.storage.set('myLessons', this.lessons);
	  this.presentToast("Saved to slides!");
	
		
		
	  
	}
	
		getImages(){
			 var ctx = this.canvasElement.getContext('2d');
        var source = new Image();
		this.imgServ.fetchImageBlob().then((res) => {
			this.zone.run(() => {
				var reader = new FileReader();
				this.imgBlob = res;
          reader.readAsDataURL(this.imgBlob);
          reader.onloadend = () => {
            this.imgurl = reader.result;
          }
        err => {
            // display error
			alert("error trying to read blob...");
        }
				
			})
		}).then(() => {
			this.drawOnCanvas();
		});
	}
	
	    drawOnCanvas(){
        var ctx = this.canvasElement.getContext('2d');
        var source = new Image();
		this.zone.run(() => {
            source.src = this.imgurl;
            source.crossOrigin = 'Anonymous';
            source.onload = () => {
                ctx.drawImage(source, 0, 0, this.canvasElement.width, this.canvasElement.height);
            };
            source.src = this.imgurl;
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

  


