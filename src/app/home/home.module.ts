import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { AdsenseModule } from 'ng2-adsense';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-1642001525444604',
      adSlot: 1808949340,
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
