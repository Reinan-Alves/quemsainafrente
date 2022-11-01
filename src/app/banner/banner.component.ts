import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from './banner';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements AfterViewInit {
  @Input() banner: Banner;
  showAd = true;
  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
          overlays: { bottom: true },
        });
      } catch (e) {
        console.error(e);
      }
    }, 0);
  }
}
