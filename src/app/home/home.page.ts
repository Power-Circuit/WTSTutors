import { Component, AfterViewInit, ViewChild, Renderer2 , NgZone} from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	@ViewChild('imageCanvas', {static: false}) canvas: any;
	isDrawing = false; //check if user is pressing on board or not
	//canvasElement: any;
	saveX: number; //track x coordinate of touch
	saveY: number; //track y coordinate of touch
	nativepath: any; //track path of fetchd image
	currentColor = '#fff'; //track current selected color
	colors = ['#ff0','#f00', '#0f0','#00f', '#0ff','#fff','#000']; //array of availale colors
	lineWidth = 5; //track drawing line width
	canvasElement: any; //object to store canvas object
		lastX; //track last x coordinate of touch
		lastY; //track last r coordinate of touch
       
	
  constructor(private plt: Platform, public renderer: Renderer2, public filechooser: FileChooser, public zone: NgZone) {}
  
  ngAfterViewInit(){//inizialize drawing board
	
	    this.canvasElement = this.canvas.nativeElement;
        //this.can.thecanvas = this.canvas;
        this.renderer.setAttribute(this.canvasElement, 'width', this.plt.width() * (99.5/100) + '');
        this.renderer.setAttribute(this.canvasElement, 'height', this.plt.height() * (80 / 100) + '');
        var ctx = this.canvasElement.getContext('2d');
		ctx.fillStyle ="black";
		ctx.fillRect(0,0,this.canvasElement.width,this.canvasElement.height);
		//
	
  }
  
   handleStart(ev){ //when user touches down on board
		let dataUrl = this.canvasElement.toDataURL();

	  // this.undo.push(dataUrl);
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
   
   uploadpic(){
        
        var ctx = this.canvasElement.getContext('2d');
		var im = new Image();
        this.fetchImage().then((uploadedurl: any) =>{
			
			im.src = uploadedurl;
			im.crossOrigin = 'Anonymous';

			im.onload = () => {
				this.zone.run(() => {
				alert("draw before then event: " + im.src);
				
				ctx.drawImage(im, 0, 0, this.canvasElement.width, this.canvasElement.height);
		  })

			};
			im.src = uploadedurl;
			
        }).then(() => {
			 this.zone.run(() => {
				alert("draw after then event: " + im.src);
				
				ctx.drawImage(im, 0, 0, this.canvasElement.width, this.canvasElement.height);
		  })
		})
    }
   
    fetchImage(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
					  resolve(result);
				  })
			  }).catch((err) => {
			  reject(err);
		  })
		 })
	  
	  return promise;
  }
  
  
  
  /*handleStart(ev){
	  console.log("start draw...");
	  this.isDrawing = true;
	  const canvasPos = this.canvasElement.getBoundingClientRect();
	  console.log(canvasPos);
	  
	  this.saveX = ev.pageX - canvasPos.x;
	  this.saveY = ev.pageY - canvasPos.y;
  }
  
  handleMove(ev){
	  if(!this.isDrawing){
		  return;
	  }
	   console.log("move draw...");
	   	 const canvasPos = this.canvasElement.getBoundingClientRect();

	   let ctx = this.canvasElement.getContext('2d');
	   
	   let currentX = ev.pageX - canvasPos.x;
	   let currentY = ev.pageY - canvasPos.y
	   
	   ctx.lineJoin = 'round';
	   ctx.strokeStyle = this.currentColor;
	   ctx.lineWidth = this.lineWidth;
	   
	   ctx.beginPath();
	   ctx.moveTo(this.saveX, this.saveY);
	   ctx.lineTo(currentX, currentY);
	   ctx.closePath();
	   
	   ctx.stroke();
	   
	   this.saveX = currentX;
	   this.saveY = currentY;
	   
  }
  
  handleEnd(ev){
	   alert(this.saveY);
	   this.isDrawing = false;
  }*/
  
  selectColor(col){ //change pen color
	  this.currentColor = col;
  }
  
  

}
