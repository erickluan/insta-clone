import { Injectable } from '@angular/core';
import { Progress } from './progress.service';
import * as firebase from 'firebase';


@Injectable()
export class DB {
    constructor (
      private progress: Progress
    ) {}
    public publish(post: any): void {
      firebase.database().ref(`posts/${btoa(post.email)}`)
        .push({
          title: post.title
        })
        .then((answer: any) => {
          const imageName = answer.key;
          firebase.storage().ref()
            .child(`images/${imageName}`)
            .put(post.image)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
              (snapshot: any) => {
                this.progress.status = 'doing';
                this.progress.state = snapshot;
              },
              (error) => {
                this.progress.status = 'error';
              },
              () => {
                this.progress.status = 'concluded';
              }
            );
        });
    }
    public searchPosts(email: string): Promise<any> {
      return new Promise((resolve, reject) => {
        firebase.database().ref(`posts/${btoa(email)}`)
          .orderByKey()
          .once('value')
          .then((snapshot: any) => {
            const posts: Array<any> = [];
            snapshot.forEach((childSnapshot: any) => {
              const post = childSnapshot.val();
              post.key = childSnapshot.key;
              posts.push(post);
            });
            return posts.reverse();
          })
          .then((posts: any) => {
              posts.forEach((post) => {
                firebase.storage().ref()
                  .child(`images/${post.key}`)
                  .getDownloadURL()
                  .then((url: string) => {
                    post.urlImage = url;
                    firebase.database().ref(`user_detail/${btoa(email)}`)
                      .once('value')
                      .then((snapshot: any) => {
                        post.username = snapshot.val().user.username;
                      });
                  });
              });
              resolve(posts);
          });
      });
    }
}


