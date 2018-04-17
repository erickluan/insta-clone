import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() public showPanel: EventEmitter<string> = new EventEmitter();
  public form: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required, Validators.email, Validators.minLength(10) ]),
    'fullname': new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(100) ]),
    'username': new FormControl(null, [Validators.required, Validators.minLength(3) ] ),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18) ])
  });
  constructor(
    private authentication: Auth
  ) { }

  ngOnInit() {
  }
  public showPanelLogin() {
    this.showPanel.emit('login');
  }
  public registerUser(): void {
    const user = new User(
      this.form.value.email,
      this.form.value.fullname,
      this.form.value.username,
      this.form.value.password
    );
    this.authentication.registerUser(user)
      .then(() => this.showPanelLogin());
  }
}
