import { Component } from '@angular/core';

@Component({
  selector: 'app-studyguide',
  templateUrl: './studyguide.page.html',
  styleUrls: ['./studyguide.page.scss'],
})
export class StudyguidePage {

  constructor() { }

  ionViewWillEnter(){
	  this.openPdf();
	  
	  
  }
  
  openPdf(){
  
  window.open('https://firebasestorage.googleapis.com/v0/b/wtstutors.appspot.com/o/2019%20WTS%2011%20MATHEMATICS%20GUIDE%20Q%20%26%20S-1.pdf?alt=media&token=b0b4fb84-3046-44b2-a2a8-63fae451cd99');
  
  }

}
