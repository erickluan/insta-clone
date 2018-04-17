import { Auth } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authentication: Auth
    ) {}
    canActivate(): boolean {
        return this.authentication.authenticated();
    }
}
