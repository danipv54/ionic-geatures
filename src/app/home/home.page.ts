import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, GestureController, IonCard, Platform } from '@ionic/angular';
import { PEOPLE } from 'src/assets/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChildren(IonCard, {read: ElementRef }) cards: QueryList<ElementRef>;

  power=0;
  longPressActive= false;
  people=PEOPLE;

  constructor(private gestureCtrl: GestureController, private animationCtrl: AnimationController,
              private plt: Platform) {}

  ngAfterViewInit(): void {
    this.addTinderSwipe(this.cards.toArray());
  }

addTinderSwipe(cardsArray: ElementRef<any>[]){
  const index=0;

  for (let i=0; i < cardsArray.length; i++) {
    const cards= cardsArray[i];
    const card= cards.nativeElement.style;
     const swipe= this.gestureCtrl.create({
      el:cards.nativeElement,
      gestureName:`swipe-${i}`,
      threshold:0,
      onStart:() =>{
        card.transition='.5s ease-out';
      },
      onMove: ev=>{
        card.transform= `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg) `;
        const color = ev.deltaX < 0 ? `var(--ion-color-danger)` : 'var(--ion-color-success)';
        card.background= color;
      },

      onEnd:ev =>{
        card.transition='.5s ease-out';

        if ( ev.deltaX > 150 ){
          card.transform= `translateX(${this.plt.width() * 2}px) rotate(${ev.deltaX / 10}deg) `;

        } else if ( ev.deltaX < -150 ){
          card.transform= `translateX(${-this.plt.width() * 2}px) rotate(${ev.deltaX / 10}deg) `;

        } else {
          card.transform='';
          card.background='';
        }
      }
    });
    swipe.enable();
  }
 }
}

