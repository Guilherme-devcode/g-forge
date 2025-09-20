import { Meta, StoryObj } from '@storybook/angular';
import { ChartComponent, ChartSeries } from '../lib/components/chart/chart.component';

const lineData: ChartSeries[] = [
  {
    name: 'Vendas 2023',
    data: [
      { label: 'Jan', value: 120 },
      { label: 'Fev', value: 150 },
      { label: 'Mar', value: 180 },
      { label: 'Abr', value: 140 },
      { label: 'Mai', value: 200 },
      { label: 'Jun', value: 220 }
    ],
    color: '#4ecdc4'
  },
  {
    name: 'Vendas 2024',
    data: [
      { label: 'Jan', value: 140 },
      { label: 'Fev', value: 170 },
      { label: 'Mar', value: 160 },
      { label: 'Abr', value: 190 },
      { label: 'Mai', value: 230 },
      { label: 'Jun', value: 250 }
    ],
    color: '#ff6b6b'
  }
];

const pieData: ChartSeries[] = [
  {
    name: 'Categorias',
    data: [
      { label: 'Desktop', value: 45, color: '#4ecdc4' },
      { label: 'Mobile', value: 35, color: '#ff6b6b' },
      { label: 'Tablet', value: 20, color: '#ffe66d' }
    ]
  }
];

const barData: ChartSeries[] = [
  {
    name: 'Q1',
    data: [
      { label: 'Jan', value: 120 },
      { label: 'Fev', value: 150 },
      { label: 'Mar', value: 180 }
    ],
    color: '#4ecdc4'
  },
  {
    name: 'Q2',
    data: [
      { label: 'Jan', value: 140 },
      { label: 'Fev', value: 170 },
      { label: 'Mar', value: 160 }
    ],
    color: '#ff6b6b'
  }
];

const radarData: ChartSeries[] = [
  {
    name: 'Performance',
    data: [
      { label: 'Velocidade', value: 80 },
      { label: 'Qualidade', value: 90 },
      { label: 'Preço', value: 70 },
      { label: 'Suporte', value: 85 },
      { label: 'Usabilidade', value: 95 }
    ],
    color: '#4ecdc4'
  }
];

export default {
  title: 'G-Forge/Chart',
  component: ChartComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie', 'doughnut', 'area', 'radar'],
    },
    theme: {
      control: 'select',
      options: ['default', 'dark', 'neon', 'minimal'],
    },
  },
} as Meta<ChartComponent>;

type Story = StoryObj<ChartComponent>;

export const LineChart: Story = {
  args: {
    type: 'line',
    data: lineData,
    theme: 'default',
    width: 600,
    height: 400,
    config: {
      title: 'Vendas Mensais',
      subtitle: 'Comparativo entre 2023 e 2024',
      showLegend: true,
      showGrid: true,
      showTooltip: true,
      animation: { enabled: true, duration: 1000 },
      responsive: true
    }
  },
};

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: barData,
    theme: 'default',
    width: 600,
    height: 400,
    config: {
      title: 'Vendas por Trimestre',
      showLegend: true,
      showGrid: true,
      animation: { enabled: true, duration: 1000 }
    }
  },
};

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: pieData,
    theme: 'default',
    width: 500,
    height: 400,
    config: {
      title: 'Dispositivos de Acesso',
      showLegend: true,
      animation: { enabled: true, duration: 1000 }
    }
  },
};

export const DoughnutChart: Story = {
  args: {
    type: 'doughnut',
    data: pieData,
    theme: 'default',
    width: 500,
    height: 400,
    config: {
      title: 'Distribuição de Usuários',
      showLegend: true,
      animation: { enabled: true, duration: 1000 }
    }
  },
};

export const AreaChart: Story = {
  args: {
    type: 'area',
    data: lineData,
    theme: 'default',
    width: 600,
    height: 400,
    config: {
      title: 'Crescimento de Vendas',
      showLegend: true,
      showGrid: true,
      animation: { enabled: true, duration: 1000 }
    }
  },
};

export const RadarChart: Story = {
  args: {
    type: 'radar',
    data: radarData,
    theme: 'default',
    width: 500,
    height: 400,
    config: {
      title: 'Análise de Performance',
      showLegend: true,
      animation: { enabled: true, duration: 1000 }
    }
  },
};

export const DarkTheme: Story = {
  args: {
    type: 'line',
    data: lineData,
    theme: 'dark',
    width: 600,
    height: 400,
    config: {
      title: 'Gráfico Tema Escuro',
      showLegend: true,
      showGrid: true,
      animation: { enabled: true, duration: 1000 }
    }
  },
};

export const NeonTheme: Story = {
  args: {
    type: 'line',
    data: lineData,
    theme: 'neon',
    width: 600,
    height: 400,
    config: {
      title: 'Gráfico Tema Neon',
      showLegend: true,
      showGrid: true,
      animation: { enabled: true, duration: 1000 }
    }
  },
};