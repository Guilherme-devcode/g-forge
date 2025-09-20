import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface ChartConfig {
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  animation?: {
    enabled: boolean;
    duration: number;
  };
  responsive?: boolean;
}

@Component({
  selector: 'gforge-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  /** Tipo do gráfico */
  @Input() type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'radar' = 'line';

  /** Dados do gráfico */
  @Input() data: ChartSeries[] = [];

  /** Configurações do gráfico */
  @Input() config: ChartConfig = {
    showLegend: true,
    showGrid: true,
    showTooltip: true,
    animation: { enabled: true, duration: 1000 },
    responsive: true
  };

  /** Tema visual */
  @Input() theme: 'default' | 'dark' | 'neon' | 'minimal' = 'default';

  /** Largura do gráfico */
  @Input() width: number = 400;

  /** Altura do gráfico */
  @Input() height: number = 300;

  private ctx!: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private readonly colors = [
    '#4ecdc4', '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf',
    '#ffd93d', '#6c5ce7', '#fd79a8', '#00b894', '#e84393'
  ];

  ngOnInit(): void {
    this.initializeChart();
    this.setupResizeObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['type'] || changes['theme']) {
      this.drawChart();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initializeChart(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.drawChart();
  }

  private setupResizeObserver(): void {
    if (this.config.responsive && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeCanvas();
        this.drawChart();
      });
      this.resizeObserver.observe(this.containerRef.nativeElement);
    }
  }

  private resizeCanvas(): void {
    const container = this.containerRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    
    if (this.config.responsive) {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    } else {
      canvas.width = this.width;
      canvas.height = this.height;
    }
  }

  private drawChart(): void {
    if (!this.ctx || !this.data.length) return;

    this.clearCanvas();
    
    switch (this.type) {
      case 'line':
        this.drawLineChart();
        break;
      case 'bar':
        this.drawBarChart();
        break;
      case 'pie':
        this.drawPieChart();
        break;
      case 'doughnut':
        this.drawDoughnutChart();
        break;
      case 'area':
        this.drawAreaChart();
        break;
      case 'radar':
        this.drawRadarChart();
        break;
    }

    if (this.config.showLegend) {
      this.drawLegend();
    }
  }

  private clearCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private drawLineChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    if (this.config.showGrid) {
      this.drawGrid(padding, chartWidth, chartHeight);
    }

    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.colors[seriesIndex % this.colors.length];
      
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 3;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';

      this.ctx.beginPath();
      
      series.data.forEach((point, index) => {
        const x = padding + (index / (series.data.length - 1)) * chartWidth;
        const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
        const y = padding + chartHeight - (point.value / maxValue) * chartHeight;

        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }

        // Desenhar pontos
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
      });

      this.ctx.stroke();
    });
  }

  private drawBarChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    if (this.config.showGrid) {
      this.drawGrid(padding, chartWidth, chartHeight);
    }

    const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
    const barWidth = chartWidth / (this.data[0]?.data.length || 1) * 0.8;
    const seriesWidth = barWidth / this.data.length;

    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.colors[seriesIndex % this.colors.length];
      this.ctx.fillStyle = color;

      series.data.forEach((point, index) => {
        const x = padding + (index * barWidth) + (seriesIndex * seriesWidth) + barWidth * 0.1;
        const barHeight = (point.value / maxValue) * chartHeight;
        const y = padding + chartHeight - barHeight;

        this.ctx.fillRect(x, y, seriesWidth * 0.8, barHeight);

        // Adicionar brilho
        const gradient = this.ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, this.lightenColor(color, 20));
        gradient.addColorStop(1, color);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, seriesWidth * 0.8, barHeight);
      });
    });
  }

  private drawPieChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    const totalValue = this.data[0]?.data.reduce((sum, point) => sum + point.value, 0) || 0;
    let currentAngle = -Math.PI / 2;

    this.data[0]?.data.forEach((point, index) => {
      const sliceAngle = (point.value / totalValue) * 2 * Math.PI;
      const color = point.color || this.colors[index % this.colors.length];

      // Desenhar fatia
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      this.ctx.closePath();

      // Gradiente radial
      const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, this.lightenColor(color, 30));
      gradient.addColorStop(1, color);
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Borda
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
      this.ctx.fillStyle = 'white';
      this.ctx.font = 'bold 12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`${Math.round((point.value / totalValue) * 100)}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });
  }

  private drawDoughnutChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) * 0.7;
    const innerRadius = outerRadius * 0.5;

    const totalValue = this.data[0]?.data.reduce((sum, point) => sum + point.value, 0) || 0;
    let currentAngle = -Math.PI / 2;

    this.data[0]?.data.forEach((point, index) => {
      const sliceAngle = (point.value / totalValue) * 2 * Math.PI;
      const color = point.color || this.colors[index % this.colors.length];

      // Desenhar fatia
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      this.ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      this.ctx.closePath();

      this.ctx.fillStyle = color;
      this.ctx.fill();

      // Borda
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      currentAngle += sliceAngle;
    });

    // Texto central
    this.ctx.fillStyle = this.getThemeColor('text');
    this.ctx.font = 'bold 16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Total', centerX, centerY - 5);
    this.ctx.font = '14px Arial';
    this.ctx.fillText(totalValue.toString(), centerX, centerY + 15);
  }

  private drawAreaChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    if (this.config.showGrid) {
      this.drawGrid(padding, chartWidth, chartHeight);
    }

    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.colors[seriesIndex % this.colors.length];
      
      // Área preenchida
      this.ctx.beginPath();
      this.ctx.moveTo(padding, padding + chartHeight);
      
      series.data.forEach((point, index) => {
        const x = padding + (index / (series.data.length - 1)) * chartWidth;
        const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
        const y = padding + chartHeight - (point.value / maxValue) * chartHeight;
        this.ctx.lineTo(x, y);
      });

      this.ctx.lineTo(padding + chartWidth, padding + chartHeight);
      this.ctx.closePath();

      // Gradiente de área
      const gradient = this.ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
      gradient.addColorStop(0, color + '80');
      gradient.addColorStop(1, color + '20');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Linha superior
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      
      series.data.forEach((point, index) => {
        const x = padding + (index / (series.data.length - 1)) * chartWidth;
        const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
        const y = padding + chartHeight - (point.value / maxValue) * chartHeight;

        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });

      this.ctx.stroke();
    });
  }

  private drawRadarChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.7;
    const sides = this.data[0]?.data.length || 0;

    // Desenhar grade radar
    for (let i = 1; i <= 5; i++) {
      const r = (radius / 5) * i;
      this.ctx.beginPath();
      for (let j = 0; j < sides; j++) {
        const angle = (j / sides) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        
        if (j === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.closePath();
      this.ctx.strokeStyle = this.getThemeColor('grid');
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // Linhas radiais
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.strokeStyle = this.getThemeColor('grid');
      this.ctx.stroke();

      // Labels
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      this.ctx.fillStyle = this.getThemeColor('text');
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.data[0].data[i].label, labelX, labelY);
    }

    // Desenhar dados
    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.colors[seriesIndex % this.colors.length];
      const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));

      this.ctx.beginPath();
      series.data.forEach((point, index) => {
        const angle = (index / sides) * 2 * Math.PI - Math.PI / 2;
        const r = (point.value / maxValue) * radius;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        
        if (index === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });
      this.ctx.closePath();

      // Área preenchida
      this.ctx.fillStyle = color + '40';
      this.ctx.fill();

      // Linha
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
  }

  private drawGrid(padding: number, width: number, height: number): void {
    this.ctx.strokeStyle = this.getThemeColor('grid');
    this.ctx.lineWidth = 1;

    // Linhas horizontais
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * height;
      this.ctx.beginPath();
      this.ctx.moveTo(padding, y);
      this.ctx.lineTo(padding + width, y);
      this.ctx.stroke();
    }

    // Linhas verticais
    const dataLength = this.data[0]?.data.length || 0;
    for (let i = 0; i < dataLength; i++) {
      const x = padding + (i / (dataLength - 1)) * width;
      this.ctx.beginPath();
      this.ctx.moveTo(x, padding);
      this.ctx.lineTo(x, padding + height);
      this.ctx.stroke();
    }
  }

  private drawLegend(): void {
    const canvas = this.canvasRef.nativeElement;
    const legendX = 20;
    let legendY = 20;

    this.data.forEach((series, index) => {
      const color = series.color || this.colors[index % this.colors.length];
      
      // Quadrado colorido
      this.ctx.fillStyle = color;
      this.ctx.fillRect(legendX, legendY, 12, 12);
      
      // Texto
      this.ctx.fillStyle = this.getThemeColor('text');
      this.ctx.font = '12px Arial';
      this.ctx.fillText(series.name, legendX + 20, legendY + 9);
      
      legendY += 20;
    });
  }

  private getThemeColor(type: 'text' | 'grid' | 'background'): string {
    const themes = {
      default: { text: '#333', grid: '#e0e0e0', background: '#fff' },
      dark: { text: '#e0e0e0', grid: '#404040', background: '#1a1a1a' },
      neon: { text: '#00ff88', grid: '#00ff8844', background: '#0a0a0a' },
      minimal: { text: '#666', grid: '#f0f0f0', background: '#fff' }
    };
    
    return themes[this.theme][type];
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  /** Classe CSS dinâmica */
  get chartClass(): string {
    return `gforge-chart gforge-chart--${this.theme}`;
  }
}