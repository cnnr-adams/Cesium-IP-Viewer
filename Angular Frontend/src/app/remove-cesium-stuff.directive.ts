import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appRemoveCesiumStuff]'
})
export class RemoveCesiumStuffDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    while (this.elementRef.nativeElement.firstChild.firstChild !== this.elementRef.nativeElement.firstChild.lastChild) {
      this.elementRef.nativeElement.firstChild.removeChild(this.elementRef.nativeElement.firstChild.lastChild)
    }
  }
}
