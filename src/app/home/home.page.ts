import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

@ViewChild('box') box: ElementRef;
  constructor(private gestureCtrl: GestureController, private animationCtrl: AnimationController) {}


  ngAfterViewInit(): void {
    const moveGesture=  this.gestureCtrl.create({
    el:this.box.nativeElement,
    gestureName:'move',
    threshold:0,
    onStart:ev=>{
      console.log('Start');
    },
    onMove:ev=>{
    const curretX= ev.deltaX;
    const curretY= ev.deltaY;

    this.box.nativeElement.style.transform= `translate(${curretX}px, ${curretY}px )`;
     },
    onEnd:ev=>{
      console.log('end');
    }
    });
   moveGesture.enable();
  }
  onAnimation(){
  const simpleAnimation= this.animationCtrl.create('whatever')
  .addElement(this.box.nativeElement)
  .duration(1500)
  .easing('ease-out')
  .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');

  simpleAnimation.play();
  }
}
