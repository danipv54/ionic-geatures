import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('powebtn', {read: ElementRef }) powerbtn: ElementRef;

  power=0;
  longPressActive= false;


  constructor(private gestureCtrl: GestureController, private animationCtrl: AnimationController) {}


  ngAfterViewInit(): void {

    const longpress= this.gestureCtrl.create({
      el:this.powerbtn.nativeElement,
      gestureName:'power',
      threshold:0,
      onStart: ()=>{
        this.longPressActive=true;
        this.onprogress();

      },
      onEnd:()=>{
        this.longPressActive=false;
      }
    },true);
    longpress.enable();
  }


  onprogress(timeout=1000){

    setTimeout(()=>{
  if(this.longPressActive){
    this.power++;
    this.onprogress(timeout / 1.2);

    console.log(this.power);
  }
    },timeout);

  }
}





/*

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
*/
