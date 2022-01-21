import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PEOPLE } from '../../assets/data';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit {
 people = PEOPLE;
  constructor(private changeDetect:ChangeDetectorRef) { }

  ngOnInit() {
  }

  removeMail(id: any){
    this.people= this.people.filter(person => person.id != id);

    setTimeout(() => {

      this.changeDetect.detectChanges();
    }, 175);

  }

}
