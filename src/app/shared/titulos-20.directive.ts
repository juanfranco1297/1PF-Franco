import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitulos20]',
  standalone: true
})
export class Titulos20Directive {

  constructor(private el: ElementRef, renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'font-size', '20pt')
  }
}
