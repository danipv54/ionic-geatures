import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwipePageRoutingModule } from './swipe-routing.module';

import { SwipePage } from './swipe.page';
import { ShareComponentModule } from '../components/share-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwipePageRoutingModule,
    ShareComponentModule
  ],
  declarations: [SwipePage]
})
export class SwipePageModule {}
