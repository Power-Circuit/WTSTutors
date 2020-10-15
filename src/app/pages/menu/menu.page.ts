import { Component, NgZone } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { UserService } from '../../services/user.service';
import { ToastController, LoadingController ,AlertController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage  {
	proPic = "";
	isPrem = false;
  constructor(public popoverCtrl: PopoverController,public backgroundMode: BackgroundMode,public zone: NgZone,public alertController: AlertController,public afAuth: AngularFireAuth,public loadingController: LoadingController,public toastCtrl: ToastController,private usr: UserService,private router: Router) { 
  }
	
	ionViewWillEnter(){
		if(this.usr.isPrem){
			this.isPrem = true;
		}
		this.loadProPic();
	}
	
  async onDismiss(msg) {
        try {
            await this.popoverCtrl.dismiss(msg);
        } catch (e) {
            //click more than one time popover throws error, so ignore..
        }

    }
	
	navigateLogin(){
		this.onDismiss("log-out");
    this.router.navigateByUrl('/login');
	
  }
  
  about(){
		this.onDismiss("about");
    this.router.navigate(['/aboutus']);
	
  }
  
  study(){
		this.onDismiss("study");
    this.router.navigate(['/studyguide']);
	
  }
  
  requestPrem(){
		this.onDismiss("prem");
    this.router.navigate(['/requestpremium']);
	
  }
	
	doLogout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.authState) {
        this.afAuth.signOut()
          .then(() => {
				this.backgroundMode.disable();
			this.usr.user = null;
			this.navigateLogin();
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }
  
  privacy(){
  
  window.open('https://www.privacypolicygenerator.info/live.php?token=bEIZ2cC4KAr9J6URN3qBTuQimslQAxDV');
  
  }
  
    async logout() {
    const alert = await this.alertController.create({
      cssClass: 'logout',
      header: 'Logging out...',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.doLogout();
          }
        }
      ]
    });

    await alert.present();
  }
  
  loadProPic(){
	   
	this.zone.run(() => {
		if(this.usr.editUrl != ""){
			this.proPic = this.usr.editUrl;
		}
	})
					
		
   }
  
   
	
	


}
