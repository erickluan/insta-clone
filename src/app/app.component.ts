import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyDRU3S8RoAt1ZkkrxsMVbwdQPw7_bgX5ko',
      authDomain: 'instagram-clone-31de4.firebaseapp.com',
      databaseURL: 'https://instagram-clone-31de4.firebaseio.com',
      projectId: 'instagram-clone-31de4',
      storageBucket: 'instagram-clone-31de4.appspot.com',
      messagingSenderId: '79105235199'
    };
    firebase.initializeApp(config);
  }
}
