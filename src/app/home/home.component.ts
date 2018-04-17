import { Auth } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('posts') public posts: any;
  constructor(
    private authentication: Auth
  ) { }

  ngOnInit() {
  }
  public updateTimeline(): void {
    this.posts.updateTimeline();
  }

  public logout(): void {
    this.authentication.logout();
  }
}
