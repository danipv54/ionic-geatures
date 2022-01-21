import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output,
         EventEmitter } from '@angular/core';
import { GestureController, AnimationController, IonItem, Animation } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})

export class SwipeItemComponent implements AfterViewInit {
// External data manipulation
@Input() person;
@Output() itemDeleted: EventEmitter<any> = new EventEmitter();

//Dom elements
@ViewChild( IonItem, { read: ElementRef }) item: ElementRef;
@ViewChild( 'wrapper' ) wrapper: ElementRef;
@ViewChild( 'trash', { read: ElementRef }) trashIcon: ElementRef;
@ViewChild( 'archived', { read: ElementRef }) archivedIcon: ElementRef;

// Variables
bigIcon=false;
trashAnimation: Animation;
deleteAnimation: Animation;
archivedAnimation: Animation;
// eslint-disable-next-line @typescript-eslint/naming-convention
BREAK_POINT=76;

  constructor(private gestureCtrl: GestureController, private animationCtrl: AnimationController) { }

    ngAfterViewInit(): void {
      const gestureItem= this.item.nativeElement.style;
      const wrapper= this.wrapper.nativeElement;

      this.deletedAnimation();
      this.setupIconAnimation();

      const moveGesture= this.gestureCtrl.create({
        el: this.item.nativeElement,
        gestureName: 'move',
        threshold: 0,
        onStart:ev => {
          gestureItem.transition='';
      },

      onMove: ev => {
        this.item.nativeElement.classList.add('rounded');
        this.swipeBackGround(ev, wrapper, gestureItem);
        this.zoomIcons(ev);
      },

      onEnd: ev => {
        this.item.nativeElement.classList.remove('rounded');
        gestureItem.transition='.2s ease-out';

        if ( ev.deltaX > this.BREAK_POINT ){
          this.onSwipeArchived(gestureItem);
        }
        else if ( ev.deltaX < -this.BREAK_POINT){
          this.onSwipeDeleted(gestureItem);
        }
        else { gestureItem.transform= '';}
      }
    });
    moveGesture.enable();
  }

  swipeBackGround(ev, wrapper,gestureItem ){
    if ( ev.deltaX > 0 ){
      wrapper.style['background-color']='var(--ion-color-danger)';
      gestureItem.transform =` translateX(${ev.deltaX}px)`;

    } else if ( ev.deltaX < 0 ) {
      wrapper.style['background-color']='green';
      gestureItem.transform =` translateX(${ev.deltaX}px)`;
    }
  }

  zoomIcons(ev){
    if ( ev.deltaX > this.BREAK_POINT && !this.bigIcon ) {
      this.animateTrash(true);

    } else if ( ev.deltaX > 0 && ev.deltaX < this.BREAK_POINT && this.bigIcon ) {
      this.animateTrash(false);
    }
  }

  onSwipeArchived(gestureItem){
    gestureItem.transform= `translateX(${window.innerWidth}px)`;
    this.deleteAnimation.play();
    this.itemDeleted.emit(true);
    this.deleteAnimation.onFinish(()=>{
      this.itemDeleted.emit(true);
    });
  }

  onSwipeDeleted(gestureItem){
    gestureItem.transform= `translateX(-${window.innerWidth}px)`;
    this.deleteAnimation.play();

    this.deleteAnimation.onFinish(()=>{
      this.itemDeleted.emit(true);
    });
  }

  deletedAnimation(){
  this.deleteAnimation=this.animationCtrl.create()
    .addElement(this.item.nativeElement)
    .duration(300)
    .easing('ease-out')
    .fromTo('height','76px', '0px');
}

  setupIconAnimation(){
    this.trashAnimation= this.animationCtrl.create('trash-animation')
    .addElement(this.trashIcon.nativeElement)
    .duration(300)
    .easing('ease-in')
    .fromTo('transform', 'scale(1)','scale(1.5)');

  this.archivedAnimation = this.animationCtrl.create('archived-animation')
    .addElement(this.archivedIcon.nativeElement)
    .duration(300)
    .easing('ease-in')
    .fromTo('transform', 'scale(1)','scale(1.5)');

  }

  animateTrash(zoomIn: boolean){
    this.bigIcon= zoomIn;

    if ( zoomIn ){
      this.trashAnimation.direction('alternate').play();
    } else {
      this.trashAnimation.direction('reverse').play();
    }
    Haptics.impact({style:ImpactStyle.Medium});
  }
}
