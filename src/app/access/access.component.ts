import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  animations: [
    trigger('banner-animation', [
      state('created', style({ opacity: 1 })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate('500ms 0s ease-in-out')
      ])
    ]),
    trigger('panel-animation', [
      state('created', style({ opacity: 1 })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class AccessComponent implements OnInit {
  public bannerState = 'created';
  public pannelState = 'created';
  public register = false;
  constructor() { }

  ngOnInit() {
  }
  public showPanel(event: string): void {
    this.register = event === 'register' ? true : false;
  }
}
