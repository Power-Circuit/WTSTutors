import { Component, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	@ViewChild('imageCanvas', {static: false}) canvas: any;
	isDrawing = false;
	//canvasElement: any;
	saveX: number;
	saveY: number;
	
	currentColor = '#fff';
	colors = ['#ff0','#f00', '#0f0','#00f', '#0ff','#fff','#000'];
	lineWidth = 5;
	canvasElement: any;
		lastX;
		lastY;
        color; ;
        notes = [];
        brushSize = 10;
	
  constructor(private plt: Platform, public renderer: Renderer2) {}
  
  ngAfterViewInit(){
	 /* setTimeout(() => {
	  this.canvasElement = this.canvas.nativeElement;
	  this.canvasElement.width = this.plt.width() + '';
	  this.canvasElement.height = (this.plt.height() * (75/100)) + '';
	  },3000);
	  */
	  
	    this.canvasElement = this.canvas.nativeElement;
        //this.can.thecanvas = this.canvas;
        this.renderer.setAttribute(this.canvasElement, 'width', this.plt.width() * (99.5/100) + '');
        this.renderer.setAttribute(this.canvasElement, 'height', this.plt.height() * (80 / 100) + '');
        var ctx = this.canvasElement.getContext('2d');
		ctx.fillStyle ="black";
		ctx.fillRect(0,0,this.canvasElement.width,this.canvasElement.height);
		//
		this.brushSize = 6;
  }
  
   handleStart(ev){
		let dataUrl = this.canvasElement.toDataURL();

	  // this.undo.push(dataUrl);
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    }
	
	
    handleMove(ev){
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
  
  selectColor(col){
	  this.currentColor = col;
  }
  
  

}
