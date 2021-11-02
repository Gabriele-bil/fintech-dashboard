import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ftMovementInOut]'
})
export class MovementInOutDirective {
  @Input() set ftMovementInOut(type: 'in' | 'out') {
    this.renderer.setStyle(this.el.nativeElement, 'color', type === 'in' ? '#4BB543' : '#D0342C');
  };

  constructor(private el: ElementRef, private renderer: Renderer2) { }
}
