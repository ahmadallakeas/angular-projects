import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor:string
  @Input('appBetterHighlight') highlightColor:string

  @HostBinding('style.backgroundColor') backgroundColor
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.backgroundColor=this.defaultColor
  }
  @HostListener('mouseenter') mouseOver(eventData:Event)
  {
    // this.renderer.setStyle(this.elementRef.nativeElement,'background-color','lime')
    this.backgroundColor=this.highlightColor
  }
  @HostListener('mouseleave') mouseLeave(eventData:Event)
  {
    // this.renderer.setStyle(this.elementRef.nativeElement,'background-color','gold')
    this.backgroundColor=this.defaultColor
  }
}
