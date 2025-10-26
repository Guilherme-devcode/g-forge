import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AnimationType = 
  | 'fadeIn' | 'fadeOut' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight'
  | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight'
  | 'zoomIn' | 'zoomOut' | 'zoomInUp' | 'zoomInDown'
  | 'bounceIn' | 'bounceInUp' | 'bounceInDown' | 'bounceInLeft' | 'bounceInRight'
  | 'rotateIn' | 'rotateInUpLeft' | 'rotateInUpRight' | 'rotateInDownLeft' | 'rotateInDownRight'
  | 'flipInX' | 'flipInY' | 'flipOutX' | 'flipOutY'
  | 'pulse' | 'heartbeat' | 'shake' | 'swing' | 'wobble' | 'jello'
  | 'rubberBand' | 'tada' | 'flash' | 'bounce' | 'headShake' | 'jackInTheBox';

export type EasingFunction = 
  | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  | 'ease-in-sine' | 'ease-out-sine' | 'ease-in-out-sine'
  | 'ease-in-quad' | 'ease-out-quad' | 'ease-in-out-quad'
  | 'ease-in-cubic' | 'ease-out-cubic' | 'ease-in-out-cubic'
  | 'ease-in-quart' | 'ease-out-quart' | 'ease-in-out-quart'
  | 'ease-in-quint' | 'ease-out-quint' | 'ease-in-out-quint'
  | 'ease-in-expo' | 'ease-out-expo' | 'ease-in-out-expo'
  | 'ease-in-circ' | 'ease-out-circ' | 'ease-in-out-circ'
  | 'ease-in-back' | 'ease-out-back' | 'ease-in-out-back'
  | 'ease-in-elastic' | 'ease-out-elastic' | 'ease-in-out-elastic'
  | 'ease-in-bounce' | 'ease-out-bounce' | 'ease-in-out-bounce';

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay: number;
  easing: EasingFunction;
  iterations: number | 'infinite';
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode: 'none' | 'forwards' | 'backwards' | 'both';
  playState: 'running' | 'paused';
}

@Component({
  selector: 'gf-animate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #animationContainer 
         class="animation-container"
         [class.animation-running]="isRunning"
         [class.animation-paused]="isPaused">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./animation-system.component.scss']
})
export class AnimateComponent implements AfterViewInit, OnDestroy {
  @Input() animation: AnimationType = 'fadeIn';
  @Input() duration: number = 1000;
  @Input() delay: number = 0;
  @Input() easing: EasingFunction = 'ease';
  @Input() iterations: number | 'infinite' = 1;
  @Input() direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' = 'normal';
  @Input() fillMode: 'none' | 'forwards' | 'backwards' | 'both' = 'both';
  @Input() autoPlay: boolean = true;
  @Input() trigger: 'load' | 'hover' | 'click' | 'scroll' | 'manual' = 'load';
  @Input() scrollOffset: number = 100;

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationEnd = new EventEmitter<void>();
  @Output() animationIteration = new EventEmitter<void>();

  @ViewChild('animationContainer', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  isRunning: boolean = false;
  isPaused: boolean = false;
  private animationInstance?: Animation;
  private intersectionObserver?: IntersectionObserver;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setupAnimation();
    this.setupTriggers();
  }

  ngOnDestroy() {
    this.stopAnimation();
    this.intersectionObserver?.disconnect();
  }

  private setupAnimation() {
    if (!this.containerRef) return;

    const element = this.containerRef.nativeElement;
    const keyframes = this.getKeyframes(this.animation);
    const options: KeyframeAnimationOptions = {
      duration: this.duration,
      delay: this.delay,
      easing: this.getEasingFunction(this.easing),
      iterations: this.iterations === 'infinite' ? Infinity : this.iterations,
      direction: this.direction,
      fill: this.fillMode
    };

    this.animationInstance = element.animate(keyframes, options);
    this.animationInstance.pause();

    this.animationInstance.addEventListener('animationstart', () => {
      this.isRunning = true;
      this.animationStart.emit();
    });

    this.animationInstance.addEventListener('animationend', () => {
      this.isRunning = false;
      this.animationEnd.emit();
    });

    this.animationInstance.addEventListener('animationiteration', () => {
      this.animationIteration.emit();
    });

    if (this.autoPlay && this.trigger === 'load') {
      this.play();
    }
  }

  private setupTriggers() {
    const element = this.containerRef.nativeElement;

    switch (this.trigger) {
      case 'hover':
        this.renderer.listen(element, 'mouseenter', () => this.play());
        this.renderer.listen(element, 'mouseleave', () => this.reverse());
        break;

      case 'click':
        this.renderer.listen(element, 'click', () => this.play());
        break;

      case 'scroll':
        this.setupScrollTrigger();
        break;
    }
  }

  private setupScrollTrigger() {
    if (typeof IntersectionObserver === 'undefined') return;

    const options: IntersectionObserverInit = {
      rootMargin: `${this.scrollOffset}px`,
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.play();
        }
      });
    }, options);

    this.intersectionObserver.observe(this.containerRef.nativeElement);
  }

  private getKeyframes(animation: AnimationType): Keyframe[] {
    const keyframes: { [key in AnimationType]: Keyframe[] } = {
      // Fade animations
      fadeIn: [
        { opacity: 0 },
        { opacity: 1 }
      ],
      fadeOut: [
        { opacity: 1 },
        { opacity: 0 }
      ],
      fadeInUp: [
        { opacity: 0, transform: 'translateY(100px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      fadeInDown: [
        { opacity: 0, transform: 'translateY(-100px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      fadeInLeft: [
        { opacity: 0, transform: 'translateX(-100px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],
      fadeInRight: [
        { opacity: 0, transform: 'translateX(100px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],

      // Slide animations
      slideInUp: [
        { transform: 'translateY(100%)' },
        { transform: 'translateY(0)' }
      ],
      slideInDown: [
        { transform: 'translateY(-100%)' },
        { transform: 'translateY(0)' }
      ],
      slideInLeft: [
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(0)' }
      ],
      slideInRight: [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0)' }
      ],

      // Zoom animations
      zoomIn: [
        { transform: 'scale(0)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      zoomOut: [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0)', opacity: 0 }
      ],
      zoomInUp: [
        { transform: 'scale(0) translateY(100px)', opacity: 0 },
        { transform: 'scale(1) translateY(0)', opacity: 1 }
      ],
      zoomInDown: [
        { transform: 'scale(0) translateY(-100px)', opacity: 0 },
        { transform: 'scale(1) translateY(0)', opacity: 1 }
      ],

      // Bounce animations
      bounceIn: [
        { transform: 'scale(0)', opacity: 0, offset: 0 },
        { transform: 'scale(1.3)', opacity: 1, offset: 0.6 },
        { transform: 'scale(0.9)', offset: 0.8 },
        { transform: 'scale(1)', offset: 1 }
      ],
      bounceInUp: [
        { transform: 'translateY(100px) scale(0)', opacity: 0, offset: 0 },
        { transform: 'translateY(-30px) scale(1.1)', opacity: 1, offset: 0.6 },
        { transform: 'translateY(10px) scale(0.95)', offset: 0.8 },
        { transform: 'translateY(0) scale(1)', offset: 1 }
      ],
      bounceInDown: [
        { transform: 'translateY(-100px) scale(0)', opacity: 0, offset: 0 },
        { transform: 'translateY(30px) scale(1.1)', opacity: 1, offset: 0.6 },
        { transform: 'translateY(-10px) scale(0.95)', offset: 0.8 },
        { transform: 'translateY(0) scale(1)', offset: 1 }
      ],
      bounceInLeft: [
        { transform: 'translateX(-100px) scale(0)', opacity: 0, offset: 0 },
        { transform: 'translateX(30px) scale(1.1)', opacity: 1, offset: 0.6 },
        { transform: 'translateX(-10px) scale(0.95)', offset: 0.8 },
        { transform: 'translateX(0) scale(1)', offset: 1 }
      ],
      bounceInRight: [
        { transform: 'translateX(100px) scale(0)', opacity: 0, offset: 0 },
        { transform: 'translateX(-30px) scale(1.1)', opacity: 1, offset: 0.6 },
        { transform: 'translateX(10px) scale(0.95)', offset: 0.8 },
        { transform: 'translateX(0) scale(1)', offset: 1 }
      ],

      // Rotate animations
      rotateIn: [
        { transform: 'rotate(-200deg) scale(0)', opacity: 0 },
        { transform: 'rotate(0) scale(1)', opacity: 1 }
      ],
      rotateInUpLeft: [
        { transform: 'rotate(-45deg) scale(0)', transformOrigin: 'left bottom', opacity: 0 },
        { transform: 'rotate(0) scale(1)', transformOrigin: 'left bottom', opacity: 1 }
      ],
      rotateInUpRight: [
        { transform: 'rotate(45deg) scale(0)', transformOrigin: 'right bottom', opacity: 0 },
        { transform: 'rotate(0) scale(1)', transformOrigin: 'right bottom', opacity: 1 }
      ],
      rotateInDownLeft: [
        { transform: 'rotate(45deg) scale(0)', transformOrigin: 'left bottom', opacity: 0 },
        { transform: 'rotate(0) scale(1)', transformOrigin: 'left bottom', opacity: 1 }
      ],
      rotateInDownRight: [
        { transform: 'rotate(-45deg) scale(0)', transformOrigin: 'right bottom', opacity: 0 },
        { transform: 'rotate(0) scale(1)', transformOrigin: 'right bottom', opacity: 1 }
      ],

      // Flip animations
      flipInX: [
        { transform: 'perspective(400px) rotateX(90deg)', opacity: 0 },
        { transform: 'perspective(400px) rotateX(-20deg)' },
        { transform: 'perspective(400px) rotateX(10deg)' },
        { transform: 'perspective(400px) rotateX(-5deg)' },
        { transform: 'perspective(400px) rotateX(0deg)', opacity: 1 }
      ],
      flipInY: [
        { transform: 'perspective(400px) rotateY(90deg)', opacity: 0 },
        { transform: 'perspective(400px) rotateY(-20deg)' },
        { transform: 'perspective(400px) rotateY(10deg)' },
        { transform: 'perspective(400px) rotateY(-5deg)' },
        { transform: 'perspective(400px) rotateY(0deg)', opacity: 1 }
      ],
      flipOutX: [
        { transform: 'perspective(400px) rotateX(0deg)', opacity: 1 },
        { transform: 'perspective(400px) rotateX(70deg)', opacity: 0 }
      ],
      flipOutY: [
        { transform: 'perspective(400px) rotateY(0deg)', opacity: 1 },
        { transform: 'perspective(400px) rotateY(70deg)', opacity: 0 }
      ],

      // Special effects
      pulse: [
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ],
      heartbeat: [
        { transform: 'scale(1)' },
        { transform: 'scale(1.3)' },
        { transform: 'scale(1)' },
        { transform: 'scale(1.3)' },
        { transform: 'scale(1)' }
      ],
      shake: [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(0)' }
      ],
      swing: [
        { transform: 'rotate(0deg)', transformOrigin: 'top center' },
        { transform: 'rotate(15deg)', transformOrigin: 'top center' },
        { transform: 'rotate(-10deg)', transformOrigin: 'top center' },
        { transform: 'rotate(5deg)', transformOrigin: 'top center' },
        { transform: 'rotate(-5deg)', transformOrigin: 'top center' },
        { transform: 'rotate(0deg)', transformOrigin: 'top center' }
      ],
      wobble: [
        { transform: 'translateX(0) rotate(0deg)' },
        { transform: 'translateX(-25%) rotate(-5deg)' },
        { transform: 'translateX(20%) rotate(3deg)' },
        { transform: 'translateX(-15%) rotate(-3deg)' },
        { transform: 'translateX(10%) rotate(2deg)' },
        { transform: 'translateX(-5%) rotate(-1deg)' },
        { transform: 'translateX(0) rotate(0deg)' }
      ],
      jello: [
        { transform: 'skewX(0deg) skewY(0deg)' },
        { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
        { transform: 'skewX(6.25deg) skewY(6.25deg)' },
        { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
        { transform: 'skewX(1.5625deg) skewY(1.5625deg)' },
        { transform: 'skewX(-0.78125deg) skewY(-0.78125deg)' },
        { transform: 'skewX(0deg) skewY(0deg)' }
      ],
      rubberBand: [
        { transform: 'scale(1)' },
        { transform: 'scale(1.25, 0.75)' },
        { transform: 'scale(0.75, 1.25)' },
        { transform: 'scale(1.15, 0.85)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1)' }
      ],
      tada: [
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(0.9) rotate(-3deg)' },
        { transform: 'scale(0.9) rotate(-3deg)' },
        { transform: 'scale(1.1) rotate(3deg)' },
        { transform: 'scale(1.1) rotate(-3deg)' },
        { transform: 'scale(1.1) rotate(3deg)' },
        { transform: 'scale(1.1) rotate(-3deg)' },
        { transform: 'scale(1.1) rotate(3deg)' },
        { transform: 'scale(1.1) rotate(-3deg)' },
        { transform: 'scale(1) rotate(0deg)' }
      ],
      flash: [
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 }
      ],
      bounce: [
        { transform: 'translateY(0)' },
        { transform: 'translateY(0)' },
        { transform: 'translateY(-30px)' },
        { transform: 'translateY(0)' },
        { transform: 'translateY(-15px)' },
        { transform: 'translateY(0)' }
      ],
      headShake: [
        { transform: 'translateX(0) rotateY(0deg)' },
        { transform: 'translateX(-6px) rotateY(-9deg)' },
        { transform: 'translateX(5px) rotateY(7deg)' },
        { transform: 'translateX(-3px) rotateY(-5deg)' },
        { transform: 'translateX(2px) rotateY(3deg)' },
        { transform: 'translateX(0) rotateY(0deg)' }
      ],
      jackInTheBox: [
        { transform: 'scale(0.1) rotate(30deg)', transformOrigin: 'center bottom', opacity: 0 },
        { transform: 'scale(0.5) rotate(-10deg)', transformOrigin: 'center bottom' },
        { transform: 'scale(0.7) rotate(3deg)', transformOrigin: 'center bottom' },
        { transform: 'scale(1) rotate(0deg)', transformOrigin: 'center bottom', opacity: 1 }
      ]
    };

    return keyframes[animation] || keyframes.fadeIn;
  }

  private getEasingFunction(easing: EasingFunction): string {
    const easingFunctions: { [key in EasingFunction]: string } = {
      'ease': 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
      'linear': 'linear',
      'ease-in-sine': 'cubic-bezier(0.12, 0, 0.39, 0)',
      'ease-out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)',
      'ease-in-out-sine': 'cubic-bezier(0.37, 0, 0.63, 1)',
      'ease-in-quad': 'cubic-bezier(0.11, 0, 0.5, 0)',
      'ease-out-quad': 'cubic-bezier(0.5, 1, 0.89, 1)',
      'ease-in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)',
      'ease-in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
      'ease-out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
      'ease-in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
      'ease-in-quart': 'cubic-bezier(0.5, 0, 0.75, 0)',
      'ease-out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      'ease-in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      'ease-in-quint': 'cubic-bezier(0.64, 0, 0.78, 0)',
      'ease-out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      'ease-in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
      'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      'ease-in-circ': 'cubic-bezier(0.55, 0, 1, 0.45)',
      'ease-out-circ': 'cubic-bezier(0, 0.55, 0.45, 1)',
      'ease-in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
      'ease-in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      'ease-in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      'ease-in-elastic': 'cubic-bezier(0.11, 0, 0.5, 0)',
      'ease-out-elastic': 'cubic-bezier(0.5, 1, 0.89, 1)',
      'ease-in-out-elastic': 'cubic-bezier(0.45, 0, 0.55, 1)',
      'ease-in-bounce': 'cubic-bezier(0.11, 0, 0.5, 0)',
      'ease-out-bounce': 'cubic-bezier(0.5, 1, 0.89, 1)',
      'ease-in-out-bounce': 'cubic-bezier(0.45, 0, 0.55, 1)'
    };

    return easingFunctions[easing] || 'ease';
  }

  play() {
    if (this.animationInstance) {
      this.animationInstance.play();
    }
  }

  pause() {
    if (this.animationInstance) {
      this.animationInstance.pause();
      this.isPaused = true;
    }
  }

  reverse() {
    if (this.animationInstance) {
      this.animationInstance.reverse();
    }
  }

  restart() {
    if (this.animationInstance) {
      this.animationInstance.currentTime = 0;
      this.animationInstance.play();
    }
  }

  stopAnimation() {
    if (this.animationInstance) {
      this.animationInstance.cancel();
      this.isRunning = false;
      this.isPaused = false;
    }
  }

  setPlaybackRate(rate: number) {
    if (this.animationInstance) {
      this.animationInstance.playbackRate = rate;
    }
  }
}