import { DB } from './../../db.service';
import { Component, OnInit, Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public email: string;
  public posts: any;
  constructor(
    private db: DB
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
      this.updateTimeline();
    });
  }
  public updateTimeline(): void {
    this.db.searchPosts(this.email)
      .then((posts: any) => {
        this.posts = posts;
      });
  }
}
