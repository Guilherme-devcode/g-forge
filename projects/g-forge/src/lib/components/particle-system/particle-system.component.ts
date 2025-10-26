import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
}

@Component({
  selector: 'gf-particle-system',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="particle-container" 
         [style.width]="width + 'px'"
         [style.height]="height + 'px'"
         [style.position]="'relative'"
         [style.overflow]="'hidden'">
      <canvas #canvas 
              [width]="width" 
              [height]="height"
              [style.position]="'absolute'"
              [style.top]="'0'"
              [style.left]="'0'"
              [style.pointer-events]="interactive ? 'auto' : 'none'">
      </canvas>
      <div class="particle-content" [style.position]="'relative'" [style.z-index]="'1'">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./particle-system.component.scss']
})
export class ParticleSystemComponent implements AfterViewInit, OnDestroy {
  @Input() width: number = 800;
  @Input() height: number = 600;
  @Input() particleCount: number = 100;
  @Input() particleSize: number = 3;
  @Input() particleSpeed: number = 1;
  @Input() particleLife: number = 100;
  @Input() colors: string[] = ['#4ecdc4', '#44a08d', '#093637', '#20bf6b'];
  @Input() shapes: Array<'circle' | 'square' | 'triangle' | 'star'> = ['circle'];
  @Input() effect: 'float' | 'explosion' | 'spiral' | 'wave' | 'constellation' | 'rain' = 'float';
  @Input() interactive: boolean = false;
  @Input() followMouse: boolean = false;
  @Input() gravity: number = 0;
  @Input() wind: number = 0;
  @Input() respawn: boolean = true;

  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrame?: number;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private isRunning: boolean = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.initParticles();
    this.setupEventListeners();
    this.startAnimation();
  }

  ngOnDestroy() {
    this.stopAnimation();
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(x?: number, y?: number): Particle {
    const particle: Particle = {
      x: x ?? Math.random() * this.width,
      y: y ?? Math.random() * this.height,
      vx: (Math.random() - 0.5) * this.particleSpeed * 2,
      vy: (Math.random() - 0.5) * this.particleSpeed * 2,
      size: Math.random() * this.particleSize + 1,
      life: this.particleLife,
      maxLife: this.particleLife,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      opacity: 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      shape: this.shapes[Math.floor(Math.random() * this.shapes.length)]
    };

    this.applyEffectToParticle(particle);
    return particle;
  }

  private applyEffectToParticle(particle: Particle) {
    switch (this.effect) {
      case 'explosion':
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * this.particleSpeed * 3;
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;
        particle.x = this.width / 2;
        particle.y = this.height / 2;
        break;

      case 'spiral':
        const spiralAngle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100;
        particle.x = this.width / 2 + Math.cos(spiralAngle) * radius;
        particle.y = this.height / 2 + Math.sin(spiralAngle) * radius;
        particle.vx = Math.cos(spiralAngle + Math.PI / 2) * this.particleSpeed;
        particle.vy = Math.sin(spiralAngle + Math.PI / 2) * this.particleSpeed;
        break;

      case 'wave':
        particle.x = Math.random() * this.width;
        particle.y = this.height / 2 + Math.sin(particle.x * 0.01) * 50;
        particle.vx = this.particleSpeed;
        particle.vy = 0;
        break;

      case 'rain':
        particle.x = Math.random() * this.width;
        particle.y = -10;
        particle.vx = Math.random() * 0.5 - 0.25;
        particle.vy = Math.random() * this.particleSpeed + 2;
        break;

      case 'constellation':
        particle.vx *= 0.1;
        particle.vy *= 0.1;
        break;
    }
  }

  private updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      if (this.followMouse && this.interactive) {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }
      }

      particle.vx += this.wind;
      particle.vy += this.gravity;

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.rotationSpeed;
      particle.life--;

      particle.opacity = particle.life / particle.maxLife;

      if (this.effect === 'wave') {
        particle.y = this.height / 2 + Math.sin((particle.x + Date.now() * 0.001) * 0.01) * 50;
      }

      if (this.effect === 'constellation') {
        this.drawConnections(particle, i);
      }

      if (particle.life <= 0 || 
          particle.x < -50 || particle.x > this.width + 50 ||
          particle.y < -50 || particle.y > this.height + 50) {
        
        if (this.respawn) {
          this.particles[i] = this.createParticle();
        } else {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  private drawConnections(particle: Particle, index: number) {
    for (let j = index + 1; j < this.particles.length; j++) {
      const other = this.particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        this.ctx.strokeStyle = `rgba(78, 205, 196, ${0.3 * (1 - distance / 100)})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(other.x, other.y);
        this.ctx.stroke();
      }
    }
  }

  private drawParticle(particle: Particle) {
    this.ctx.save();
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);
    this.ctx.globalAlpha = particle.opacity;

    const color = particle.color;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;

    switch (particle.shape) {
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        break;

      case 'square':
        this.ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        break;

      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(0, -particle.size);
        this.ctx.lineTo(-particle.size, particle.size);
        this.ctx.lineTo(particle.size, particle.size);
        this.ctx.closePath();
        this.ctx.fill();
        break;

      case 'star':
        this.drawStar(particle.size);
        break;
    }

    this.ctx.restore();
  }

  private drawStar(size: number) {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.5;

    this.ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  private render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    for (const particle of this.particles) {
      this.drawParticle(particle);
    }
  }

  private animate() {
    if (!this.isRunning) return;

    this.updateParticles();
    this.render();

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  private setupEventListeners() {
    if (this.interactive) {
      const canvas = this.canvasRef.nativeElement;
      
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      });

      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = 0; i < 10; i++) {
          this.particles.push(this.createParticle(x, y));
        }
      });
    }
  }

  startAnimation() {
    this.isRunning = true;
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  stopAnimation() {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  reset() {
    this.initParticles();
  }

  addParticles(count: number, x?: number, y?: number) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(x, y));
    }
  }
}