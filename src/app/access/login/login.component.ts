import { Auth } from './../../auth.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() public showPanel: EventEmitter<string> = new EventEmitter();
  public form: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required, Validators.email ]),
    'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });
  public userNotFound: boolean;
  constructor(private authentication: Auth) { }
  ngOnInit() {
  }
  public showRegisterPanel() {
    this.showPanel.emit('register');
  }
  public authenticate(): void {
    // console.log(this.userNotFound);
    this.authentication.authenticate(
      this.form.value.email,
      this.form.value.password
    );
    // this.userNotFound = this.authentication.userNotFound;
  }
}
