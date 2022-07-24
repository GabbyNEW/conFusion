import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

// Whenever you want to use this directive, you will use an attribute called 'appHighlight' within an element in your template
@Directive({
  selector: '[appHighlight]' 
})
export class HighlightDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer2) { }

    @HostListener('mouseenter') onmouseenter(){
      this.renderer.addClass(this.el.nativeElement, 'highlight');
    }

    @HostListener('mouseleave') onmouseleave() {
      this.renderer.removeClass(this.el.nativeElement, 'highlight');
    }
}
