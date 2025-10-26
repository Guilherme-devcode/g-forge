import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-card-3d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-3d.component.html',
  styleUrls: ['./card-3d.component.scss']
})
export class Card3DComponent implements AfterViewInit, OnDestroy {
  @Input() width: number = 300;
  @Input() height: number = 400;
  @Input() tiltIntensity: number = 15;
  @Input() glareIntensity: number = 0.3;
  @Input() perspective: number = 1000;
  @Input() variant: 'default' | 'holographic' | 'metallic' | 'neon' | 'glass' = 'default';
  @Input() autoRotate: boolean = false;
  @Input() rotateSpeed: number = 1;
  @Input() interactive: boolean = true;
  @Input() shadow: boolean = true;
  @Input() borderRadius: number = 16;

  @ViewChild('card', { static: false }) cardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('glare', { static: false }) glareRef!: ElementRef<HTMLDivElement>;

  private isHovered: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private rotationX: number = 0;
  private rotationY: number = 0;
  private animationFrame?: number;
  private autoRotateAngle: number = 0;

  ngAfterViewInit() {
    if (this.autoRotate) {
      this.startAutoRotation();
    }
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (!this.interactive) return;
    this.isHovered = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (!this.interactive) return;
    this.isHovered = false;
    this.resetTransform();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.interactive || !this.isHovered) return;

    const rect = this.cardRef.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.mouseX = (event.clientX - centerX) / (rect.width / 2);
    this.mouseY = (event.clientY - centerY) / (rect.height / 2);

    this.updateTransform();
    this.updateGlare();
  }

  private updateTransform() {
    if (this.autoRotate) {
      this.rotationY = Math.sin(this.autoRotateAngle) * this.tiltIntensity;
      this.rotationX = Math.cos(this.autoRotateAngle * 0.7) * this.tiltIntensity * 0.5;
    } else {
      this.rotationY = this.mouseX * this.tiltIntensity;
      this.rotationX = -this.mouseY * this.tiltIntensity;
    }

    const transform = `
      perspective(${this.perspective}px) 
      rotateX(${this.rotationX}deg) 
      rotateY(${this.rotationY}deg)
      translateZ(${this.isHovered ? 20 : 0}px)
    `;

    this.cardRef.nativeElement.style.transform = transform;
  }

  private updateGlare() {
    if (!this.glareRef) return;

    const glareX = (this.mouseX + 1) * 50;
    const glareY = (this.mouseY + 1) * 50;
    const glareOpacity = this.isHovered ? this.glareIntensity : 0;

    this.glareRef.nativeElement.style.background = `
      radial-gradient(circle at ${glareX}% ${glareY}%, 
        rgba(255, 255, 255, ${glareOpacity}) 0%, 
        transparent 50%)
    `;
  }

  private resetTransform() {
    const transform = `
      perspective(${this.perspective}px) 
      rotateX(0deg) 
      rotateY(0deg)
      translateZ(0px)
    `;

    this.cardRef.nativeElement.style.transform = transform;
    
    if (this.glareRef) {
      this.glareRef.nativeElement.style.background = 'transparent';
    }
  }

  private startAutoRotation() {
    const animate = () => {
      if (!this.autoRotate) return;

      this.autoRotateAngle += 0.01 * this.rotateSpeed;
      this.updateTransform();

      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  private stopAutoRotation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}