import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() disabled: boolean = false;
  @Input() showValue: boolean = true;
  @Input() showTicks: boolean = false;
  @Input() tickCount: number = 5;
  @Input() color: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'default' | 'neon' | 'gradient' | 'pulse' = 'default';
  @Input() showParticles: boolean = false;

  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('slider', { static: false }) sliderRef!: ElementRef<HTMLInputElement>;
  @ViewChild('track', { static: false }) trackRef!: ElementRef<HTMLDivElement>;

  value: number = 0;
  percentage: number = 0;
  isDragging: boolean = false;
  particles: Array<{ x: number; y: number; opacity: number; size: number }> = [];
  animationFrame?: number;

  private onChange = (value: number) => {};
  private onTouched = () => {};

  ngAfterViewInit() {
    this.updatePercentage();
    if (this.showParticles) {
      this.initParticles();
    }
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  writeValue(value: number): void {
    this.value = value || 0;
    this.updatePercentage();
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = parseFloat(target.value);
    this.updatePercentage();
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    
    if (this.showParticles) {
      this.createParticle();
    }
  }

  onMouseDown(): void {
    this.isDragging = true;
    this.onTouched();
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  private updatePercentage(): void {
    this.percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private initParticles(): void {
    this.animateParticles();
  }

  private createParticle(): void {
    if (!this.trackRef) return;
    
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const x = (this.percentage / 100) * rect.width;
    
    this.particles.push({
      x: x,
      y: rect.height / 2,
      opacity: 1,
      size: Math.random() * 4 + 2
    });

    if (this.particles.length > 20) {
      this.particles.shift();
    }
  }

  private animateParticles(): void {
    this.particles.forEach(particle => {
      particle.y -= 2;
      particle.opacity -= 0.02;
      particle.size *= 0.98;
    });

    this.particles = this.particles.filter(p => p.opacity > 0);

    this.animationFrame = requestAnimationFrame(() => this.animateParticles());
  }

  get ticks(): number[] {
    if (!this.showTicks) return [];
    const ticks = [];
    const step = (this.max - this.min) / (this.tickCount - 1);
    for (let i = 0; i < this.tickCount; i++) {
      ticks.push(this.min + (step * i));
    }
    return ticks;
  }

  getTickPosition(tick: number): number {
    return ((tick - this.min) / (this.max - this.min)) * 100;
  }
}