import { Image } from './image.model';
import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('hidden', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('hidden <=> visible', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public state = 'hidden';

  public images: Image[] = [
    { state: 'visible', url: '/assets/banner-acesso/img_1.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_2.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_3.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_4.png' },
    { state: 'hidden', url: '/assets/banner-acesso/img_5.png' }
  ];
  constructor() { }

  ngOnInit() {
      setTimeout(() => this.logicRotation(), 4000);
  }
  public logicRotation() {
    let index: number;
    // hidding image
    for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].state === 'visible') {
            this.images[i].state = 'hidden';
            index = i === 4 ? 0 : i + 1;
            break;
        }
    }
    this.images[index].state = 'visible';
    setTimeout(() => this.logicRotation(), 4000);
  }
}
