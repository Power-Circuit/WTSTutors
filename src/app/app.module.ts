import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//self installed plugins
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


//import { Firebase } from '@ionic-native/firebase/ngx';
import{ AngularFireModule } from '@angular/fire';
import{ AngularFireAuthModule } from '@angular/fire/auth';
import{ AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';



//Custom services
import { LessonService } from './services/lesson.service';
import { UserService } from './services/user.service';
import { ImagehandlerService } from './services/imagehandler.service';

//firebase settings
var firebaseConfig = {
    apiKey: "AIzaSyAQjKyWJEH8Fozy0NllzRxUUC41G-VX3gU",
    authDomain: "wtstutors.firebaseapp.com",
    databaseURL: "https://wtstutors.firebaseio.com",
    projectId: "wtstutors",
    storageBucket: "wtstutors.appspot.com",
    messagingSenderId: "180460090509",
    appId: "1:180460090509:web:1adf9838aba6875a599ec4",
    measurementId: "G-07DQC4M1QX"
  };
  // Initialize Firebase
 // firebase.initializeApp(firebaseConfig);
 // firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(),
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFireAuthModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule,
  AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	File,
	FileChooser,
	FilePath,
	ImagePicker,
	LessonService,
	ImagehandlerService,
	UserService,
	VideoPlayer,
	InAppBrowser,
	Camera
	

	
	
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
