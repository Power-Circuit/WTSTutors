import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
	imgurl = "../../../assets/imgs/mrsib.jpg";
  constructor() { }

  ngOnInit() {
  }

}
