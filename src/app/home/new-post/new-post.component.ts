import { DB } from './../../db.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import { Progress } from '../../progress.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @Output() public updateTimeline: EventEmitter<any> = new EventEmitter();
  public email: string;
  private image: any;
  public postProgress = 'pending';
  public uploadPercent: number;
  public form: FormGroup = new FormGroup({
    'title': new FormControl(null)
  });
  constructor(
    private db: DB,
    private progress: Progress
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }
  public publish(): void {
    this.db.publish({
      email: this.email,
      title: this.form.value.title,
      image: this.image[0]
    });
    const x = Observable.interval(1500);
    const toBeContinued = new Subject();
    toBeContinued.next(true);

    x
      .takeUntil(toBeContinued)
      .subscribe(() => {
        this.postProgress = 'doing';
        this.uploadPercent = Math.round((this.progress.state.bytesTransferred / this.progress.state.totalBytes) * 100);
        if (this.progress.status === 'concluded') {
            this.postProgress = 'concluded';
            this.updateTimeline.emit();
            toBeContinued.next(false);
        }
      });
  }

  public prepareImageUpload(event: Event): void {
    this.image = (<HTMLInputElement>event.target).files;
  }
}
