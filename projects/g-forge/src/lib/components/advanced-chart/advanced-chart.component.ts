import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AdvancedChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: any;
}

export interface AdvancedChartSeries {
  name: string;
  data: AdvancedChartDataPoint[];
  color?: string;
  type?: 'line' | 'bar' | 'area';
}

export interface AdvancedChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'radar';
  responsive: boolean;
  animated: boolean;
  showGrid: boolean;
  showLegend: boolean;
  showTooltip: boolean;
  showDataLabels: boolean;
  colors: string[];
  gradients: boolean;
  interactive: boolean;
}

@Component({
  selector: 'gf-advanced-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advanced-chart.component.html',
  styleUrls: ['./advanced-chart.component.scss']
})
export class AdvancedChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: AdvancedChartSeries[] = [];
  @Input() config: Partial<AdvancedChartConfig> = {};
  @Input() width: number = 600;
  @Input() height: number = 400;
  @Input() title?: string;
  @Input() subtitle?: string;

  @Output() dataPointClick = new EventEmitter<{series: string, point: AdvancedChartDataPoint, index: number}>();
  @Output() legendClick = new EventEmitter<{series: string, visible: boolean}>();

  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tooltip', { static: false }) tooltipRef!: ElementRef<HTMLDivElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationFrame?: number;
  private hoveredPoint?: {series: number, point: number};
  private chartArea = { x: 60, y: 40, width: 0, height: 0 };
  private legend: {name: string, color: string, visible: boolean}[] = [];

  defaultConfig: AdvancedChartConfig = {
    type: 'line',
    responsive: true,
    animated: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showDataLabels: false,
    colors: ['#4ecdc4', '#44a08d', '#093637', '#20bf6b', '#f39c12', '#e74c3c'],
    gradients: true,
    interactive: true
  };

  get mergedConfig(): AdvancedChartConfig {
    return { ...this.defaultConfig, ...this.config };
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.setupCanvas();
    this.setupEventListeners();
    this.renderChart();
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['config']) {
      this.renderChart();
    }
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';
    
    this.ctx.scale(dpr, dpr);
    
    this.chartArea.width = this.width - 120;
    this.chartArea.height = this.height - 100;
  }

  private setupEventListeners() {
    if (!this.mergedConfig.interactive) return;

    const canvas = this.canvasRef.nativeElement;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.handleMouseMove(x, y);
    });

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.handleClick(x, y);
    });

    canvas.addEventListener('mouseleave', () => {
      this.hoveredPoint = undefined;
      this.hideTooltip();
    });
  }

  private renderChart() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.prepareLegend();

    if (this.mergedConfig.showGrid) {
      this.drawGrid();
    }

    switch (this.mergedConfig.type) {
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
      case 'scatter':
        this.drawScatterChart();
        break;
      case 'radar':
        this.drawRadarChart();
        break;
    }

    if (this.mergedConfig.showLegend) {
      this.drawLegend();
    }

    this.drawTitles();
  }

  private prepareLegend() {
    this.legend = this.data.map((series, index) => ({
      name: series.name,
      color: series.color || this.mergedConfig.colors[index % this.mergedConfig.colors.length],
      visible: true
    }));
  }

  private drawGrid() {
    this.ctx.strokeStyle = '#e0e0e0';
    this.ctx.lineWidth = 1;

    // Vertical lines
    for (let i = 0; i <= 10; i++) {
      const x = this.chartArea.x + (this.chartArea.width / 10) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.chartArea.y);
      this.ctx.lineTo(x, this.chartArea.y + this.chartArea.height);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let i = 0; i <= 10; i++) {
      const y = this.chartArea.y + (this.chartArea.height / 10) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(this.chartArea.x, y);
      this.ctx.lineTo(this.chartArea.x + this.chartArea.width, y);
      this.ctx.stroke();
    }
  }

  private drawLineChart() {
    if (!this.data.length) return;

    const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
    const minValue = Math.min(...this.data.flatMap(s => s.data.map(d => d.value)));
    const valueRange = maxValue - minValue;

    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.mergedConfig.colors[seriesIndex % this.mergedConfig.colors.length];
      
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 3;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';

      this.ctx.beginPath();
      
      series.data.forEach((point, pointIndex) => {
        const x = this.chartArea.x + (this.chartArea.width / (series.data.length - 1)) * pointIndex;
        const y = this.chartArea.y + this.chartArea.height - ((point.value - minValue) / valueRange) * this.chartArea.height;

        if (pointIndex === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });

      this.ctx.stroke();

      // Draw points
      series.data.forEach((point, pointIndex) => {
        const x = this.chartArea.x + (this.chartArea.width / (series.data.length - 1)) * pointIndex;
        const y = this.chartArea.y + this.chartArea.height - ((point.value - minValue) / valueRange) * this.chartArea.height;

        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Highlight hovered point
        if (this.hoveredPoint?.series === seriesIndex && this.hoveredPoint?.point === pointIndex) {
          this.ctx.strokeStyle = '#fff';
          this.ctx.lineWidth = 2;
          this.ctx.beginPath();
          this.ctx.arc(x, y, 6, 0, Math.PI * 2);
          this.ctx.stroke();
        }
      });
    });
  }

  private drawBarChart() {
    if (!this.data.length) return;

    const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
    const barWidth = this.chartArea.width / (this.data[0].data.length * this.data.length + this.data[0].data.length + 1);
    const groupWidth = barWidth * this.data.length;

    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.mergedConfig.colors[seriesIndex % this.mergedConfig.colors.length];
      
      series.data.forEach((point, pointIndex) => {
        const x = this.chartArea.x + (groupWidth + barWidth) * pointIndex + barWidth * seriesIndex + barWidth;
        const height = (point.value / maxValue) * this.chartArea.height;
        const y = this.chartArea.y + this.chartArea.height - height;

        if (this.mergedConfig.gradients) {
          const gradient = this.ctx.createLinearGradient(0, y, 0, y + height);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, this.adjustColor(color, -20));
          this.ctx.fillStyle = gradient;
        } else {
          this.ctx.fillStyle = color;
        }

        this.ctx.fillRect(x, y, barWidth, height);

        // Highlight hovered bar
        if (this.hoveredPoint?.series === seriesIndex && this.hoveredPoint?.point === pointIndex) {
          this.ctx.strokeStyle = '#333';
          this.ctx.lineWidth = 2;
          this.ctx.strokeRect(x, y, barWidth, height);
        }
      });
    });
  }

  private drawPieChart() {
    if (!this.data.length || !this.data[0].data.length) return;

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(this.width, this.height) / 4;
    const total = this.data[0].data.reduce((sum, point) => sum + point.value, 0);

    let currentAngle = -Math.PI / 2;

    this.data[0].data.forEach((point, index) => {
      const sliceAngle = (point.value / total) * Math.PI * 2;
      const color = point.color || this.mergedConfig.colors[index % this.mergedConfig.colors.length];

      if (this.mergedConfig.gradients) {
        const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, this.adjustColor(color, -20));
        this.ctx.fillStyle = gradient;
      } else {
        this.ctx.fillStyle = color;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      this.ctx.closePath();
      this.ctx.fill();

      // Highlight hovered slice
      if (this.hoveredPoint?.point === index) {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }

      currentAngle += sliceAngle;
    });
  }

  private drawDoughnutChart() {
    if (!this.data.length || !this.data[0].data.length) return;

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const outerRadius = Math.min(this.width, this.height) / 4;
    const innerRadius = outerRadius * 0.6;
    const total = this.data[0].data.reduce((sum, point) => sum + point.value, 0);

    let currentAngle = -Math.PI / 2;

    this.data[0].data.forEach((point, index) => {
      const sliceAngle = (point.value / total) * Math.PI * 2;
      const color = point.color || this.mergedConfig.colors[index % this.mergedConfig.colors.length];

      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      this.ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      this.ctx.closePath();
      this.ctx.fill();

      currentAngle += sliceAngle;
    });
  }

  private drawAreaChart() {
    this.drawLineChart();
    
    // Add area fill
    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.mergedConfig.colors[seriesIndex % this.mergedConfig.colors.length];
      const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
      const minValue = Math.min(...this.data.flatMap(s => s.data.map(d => d.value)));
      const valueRange = maxValue - minValue;

      const gradient = this.ctx.createLinearGradient(0, this.chartArea.y, 0, this.chartArea.y + this.chartArea.height);
      gradient.addColorStop(0, color + '40');
      gradient.addColorStop(1, color + '10');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();

      series.data.forEach((point, pointIndex) => {
        const x = this.chartArea.x + (this.chartArea.width / (series.data.length - 1)) * pointIndex;
        const y = this.chartArea.y + this.chartArea.height - ((point.value - minValue) / valueRange) * this.chartArea.height;

        if (pointIndex === 0) {
          this.ctx.moveTo(x, this.chartArea.y + this.chartArea.height);
          this.ctx.lineTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });

      this.ctx.lineTo(this.chartArea.x + this.chartArea.width, this.chartArea.y + this.chartArea.height);
      this.ctx.closePath();
      this.ctx.fill();
    });
  }

  private drawScatterChart() {
    if (!this.data.length) return;

    const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));
    const minValue = Math.min(...this.data.flatMap(s => s.data.map(d => d.value)));
    const valueRange = maxValue - minValue;

    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.mergedConfig.colors[seriesIndex % this.mergedConfig.colors.length];
      
      series.data.forEach((point, pointIndex) => {
        const x = this.chartArea.x + Math.random() * this.chartArea.width;
        const y = this.chartArea.y + this.chartArea.height - ((point.value - minValue) / valueRange) * this.chartArea.height;

        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 6, 0, Math.PI * 2);
        this.ctx.fill();
      });
    });
  }

  private drawRadarChart() {
    if (!this.data.length || !this.data[0].data.length) return;

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(this.width, this.height) / 4;
    const sides = this.data[0].data.length;
    const maxValue = Math.max(...this.data.flatMap(s => s.data.map(d => d.value)));

    // Draw radar grid
    this.ctx.strokeStyle = '#e0e0e0';
    this.ctx.lineWidth = 1;

    for (let i = 1; i <= 5; i++) {
      this.ctx.beginPath();
      for (let j = 0; j < sides; j++) {
        const angle = (j * Math.PI * 2) / sides - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * i / 5);
        const y = centerY + Math.sin(angle) * (radius * i / 5);
        
        if (j === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.closePath();
      this.ctx.stroke();
    }

    // Draw radar lines
    for (let i = 0; i < sides; i++) {
      const angle = (i * Math.PI * 2) / sides - Math.PI / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      this.ctx.stroke();
    }

    // Draw data
    this.data.forEach((series, seriesIndex) => {
      const color = series.color || this.mergedConfig.colors[seriesIndex % this.mergedConfig.colors.length];
      
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = color + '40';
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      series.data.forEach((point, pointIndex) => {
        const angle = (pointIndex * Math.PI * 2) / sides - Math.PI / 2;
        const value = (point.value / maxValue) * radius;
        const x = centerX + Math.cos(angle) * value;
        const y = centerY + Math.sin(angle) * value;

        if (pointIndex === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    });
  }

  private drawLegend() {
    const legendX = this.width - 100;
    let legendY = 60;

    this.legend.forEach((item, index) => {
      // Legend color box
      this.ctx.fillStyle = item.color;
      this.ctx.fillRect(legendX, legendY, 12, 12);

      // Legend text
      this.ctx.fillStyle = '#333';
      this.ctx.font = '12px Arial';
      this.ctx.fillText(item.name, legendX + 20, legendY + 9);

      legendY += 20;
    });
  }

  private drawTitles() {
    if (this.title) {
      this.ctx.fillStyle = '#333';
      this.ctx.font = 'bold 16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.title, this.width / 2, 25);
    }

    if (this.subtitle) {
      this.ctx.fillStyle = '#666';
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.subtitle, this.width / 2, 45);
    }
  }

  private handleMouseMove(x: number, y: number) {
    // Implement hover detection logic based on chart type
    // This is a simplified version
    const point = this.getPointAtPosition(x, y);
    
    if (point) {
      this.hoveredPoint = point;
      this.showTooltip(x, y, point);
      this.renderChart();
    } else {
      this.hoveredPoint = undefined;
      this.hideTooltip();
    }
  }

  private handleClick(x: number, y: number) {
    const point = this.getPointAtPosition(x, y);
    
    if (point && this.data[point.series] && this.data[point.series].data[point.point]) {
      this.dataPointClick.emit({
        series: this.data[point.series].name,
        point: this.data[point.series].data[point.point],
        index: point.point
      });
    }
  }

  private getPointAtPosition(x: number, y: number): {series: number, point: number} | null {
    // Simplified point detection - would need to be implemented per chart type
    return null;
  }

  private showTooltip(x: number, y: number, point: {series: number, point: number}) {
    if (!this.tooltipRef || !this.mergedConfig.showTooltip) return;

    const tooltip = this.tooltipRef.nativeElement;
    const series = this.data[point.series];
    const dataPoint = series.data[point.point];

    tooltip.innerHTML = `
      <div class="tooltip-title">${series.name}</div>
      <div class="tooltip-content">
        <span class="tooltip-label">${dataPoint.label}:</span>
        <span class="tooltip-value">${dataPoint.value}</span>
      </div>
    `;

    tooltip.style.display = 'block';
    tooltip.style.left = (x + 10) + 'px';
    tooltip.style.top = (y - 10) + 'px';
  }

  private hideTooltip() {
    if (this.tooltipRef) {
      this.tooltipRef.nativeElement.style.display = 'none';
    }
  }

  private adjustColor(color: string, amount: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
}