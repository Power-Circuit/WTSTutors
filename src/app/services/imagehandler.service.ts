import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ImagehandlerService {

	nativepath: any;
  constructor(public filechooser: FileChooser) { }
  
   uploadimage(){
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
  
   uploadpost(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'video/mp4'});
								resolve(imgBlob);
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }

fetchImageBlob(){
	  var promise = new Promise((resolve, reject) => {
		  this.filechooser.open().then((url) => {
			  (<any>window).FilePath.resolveNativePath(url, (result) => {
				  this.nativepath = result;
				  (<any>window).resolveLocalFileSystemURL(this.nativepath,(res) => {
					  res.file((resFile) => {
						  var reader = new FileReader();
						  reader.readAsArrayBuffer(resFile);
						  reader.onloadend = (evt: any) => {
							  var imgBlob = new Blob([evt.target.result],{type: 'image/jpg'});
								resolve(imgBlob);
						  }
					  })
				  })
			  })
		  })
	  })
	  return promise;
  }


}
