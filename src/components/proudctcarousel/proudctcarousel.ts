import { Component,Input,ViewChild } from '@angular/core';
import { Slides} from 'ionic-angular';

/**
 * Generated class for the ProudctcarouselComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'proudctcarousel',
  templateUrl: 'proudctcarousel.html'
})
export class ProudctcarouselComponent {

  @Input('item') item :any;
   @ViewChild(Slides) slider: any;
    theClickedIndex: number =0;
    nextSlide: String;
    prevSlide:String;
  constructor() {
    console.log('Hello ProudctcarouselComponent Component');

  }
     ionViewDidLoad() {
    console.log('ionViewDidLoad carousel');
  }

  /*Getting Current Slide */
    getCurrentSlide(index) {

       //let activeIndex = this.slider.getActiveIndex();
       let realIndex = this.slider.realIndex;

       //console.log("activeIndex"+activeIndex);
       //console.log("realIndex"+realIndex);
// debugger;
       this.theClickedIndex = realIndex;
       console.log('clicked on slide: ', this.theClickedIndex);

       if ((this.item.length) >= (this.theClickedIndex)) {

            console.log(this.item.length, "credit");

            if ((this.item.length - 1) > (this.theClickedIndex)) {
                this.nextSlide = this.item[this.theClickedIndex + 1].name;
            } else {
                this.nextSlide = this.item[this.theClickedIndex -this.theClickedIndex].name;
            }
            if (this.theClickedIndex==0) {
                this.prevSlide = this.item[this.item.length - 1].name;
            } else {
                this.prevSlide = this.item[this.theClickedIndex -1].name;
            }
        }
    }

     slidePrev() {
         console.log("prev ");
        if(this.theClickedIndex==0) {
            this.slider.slideTo(this.item.length - 1);
        }
        else {
            this.slider.slideTo(this.theClickedIndex -1);
        }
    }

   slideNext() {
       console.log("In next ");
        if((this.item.length - 1) > (this.theClickedIndex)) {
            this.slider.slideTo(this.theClickedIndex + 1);
        }
        else {
            this.slider.slideTo(this.theClickedIndex -this.theClickedIndex);
        }

    }


}
