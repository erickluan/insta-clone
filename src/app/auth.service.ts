import { User } from './access/user.model';
import * as firebase from 'firebase';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Auth {
    public token_id: string;
    constructor(
        private router: Router
    ) {}
    public authenticate(email: string, password: string): void {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('idToken', idToken);
                        this.router.navigate(['/home']);
                    });
            })
            .catch((error) => {
                console.log('Aqui pegou-se o erro: ', error.code, error.message);
            });
    }
    public registerUser(user: User): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res: any) => {
                delete user.password;
                firebase.database().ref(`user_detail/${btoa(user.email)}`)
                    .set({ user });
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }
    public authenticated(): boolean {
        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken');
        }
        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }
        return this.token_id !== undefined;
    }

    public logout(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.token_id = undefined;
                this.router.navigate(['/']);
            });
    }
}
