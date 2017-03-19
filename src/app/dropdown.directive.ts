import { Directive, Renderer, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {

  constructor(private renderer: Renderer, private elementRef: ElementRef) { }

  @HostListener('click') onClick() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', true)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', false)
  }

}
