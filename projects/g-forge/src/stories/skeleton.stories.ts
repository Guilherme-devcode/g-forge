import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonComponent } from '../lib/components/skeleton/skeleton.component';

const meta: Meta<SkeletonComponent> = {
  title: 'Components/Skeleton',
  component: SkeletonComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Skeleton para exibir estados de carregamento com placeholders visuais.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular', 'rounded', 'avatar', 'card', 'list', 'table', 'custom']
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none']
    },
    animationSpeed: {
      control: { type: 'select' },
      options: ['slow', 'normal', 'fast']
    },
    loading: {
      control: { type: 'boolean' }
    },
    rounded: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Default: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '1em',
    animation: 'pulse',
    loading: true
  }
};

export const TextSkeleton: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px;">
        <h3>Carregando Artigo...</h3>
        <gforge-skeleton variant="text" lines="1" width="60%" height="24px"></gforge-skeleton>
        <br>
        <gforge-skeleton variant="text" lines="4" lineSpacing="8px"></gforge-skeleton>
        <br>
        <gforge-skeleton variant="text" lines="3" lineSpacing="6px"></gforge-skeleton>
      </div>
    `
  })
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <div style="text-align: center;">
          <gforge-skeleton variant="circular" width="80" height="80"></gforge-skeleton>
          <div style="margin-top: 8px; font-size: 12px;">Circular</div>
        </div>
        <div style="text-align: center;">
          <gforge-skeleton variant="rectangular" width="120" height="80"></gforge-skeleton>
          <div style="margin-top: 8px; font-size: 12px;">Rectangular</div>
        </div>
        <div style="text-align: center;">
          <gforge-skeleton variant="rounded" width="120" height="80" borderRadius="12px"></gforge-skeleton>
          <div style="margin-top: 8px; font-size: 12px;">Rounded</div>
        </div>
        <div style="text-align: center;">
          <gforge-skeleton variant="avatar" width="60" height="60"></gforge-skeleton>
          <div style="margin-top: 8px; font-size: 12px;">Avatar</div>
        </div>
      </div>
    `
  })
};

export const Animations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>Pulse Animation</h4>
          <gforge-skeleton variant="rectangular" width="300" height="60" animation="pulse"></gforge-skeleton>
        </div>
        <div>
          <h4>Wave Animation</h4>
          <gforge-skeleton variant="rectangular" width="300" height="60" animation="wave"></gforge-skeleton>
        </div>
        <div>
          <h4>No Animation</h4>
          <gforge-skeleton variant="rectangular" width="300" height="60" animation="none"></gforge-skeleton>
        </div>
      </div>
    `
  })
};

export const CardSkeleton: Story = {
  args: {
    variant: 'card',
    cardConfig: {
      showAvatar: true,
      showTitle: true,
      showSubtitle: true,
      showContent: true,
      contentLines: 3
    }
  }
};

export const ListSkeleton: Story = {
  args: {
    variant: 'list',
    listConfig: {
      items: 5,
      showAvatar: true,
      showSecondaryText: true
    }
  }
};

export const TableSkeleton: Story = {
  args: {
    variant: 'table',
    tableConfig: {
      rows: 6,
      columns: 4,
      showHeader: true
    }
  }
};

export const CustomLines: Story = {
  args: {
    variant: 'text',
    customLines: [
      { width: '100%', height: '24px', marginBottom: '12px' },
      { width: '85%', height: '16px', marginBottom: '8px' },
      { width: '92%', height: '16px', marginBottom: '8px' },
      { width: '70%', height: '16px', marginBottom: '16px' },
      { width: '50%', height: '14px', marginBottom: '0' }
    ]
  }
};

export const LoadingStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>Estado de Carregamento (loading=true)</h4>
          <gforge-skeleton variant="card" [loading]="true">
            <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h3>Conteúdo Real</h3>
              <p>Este conteúdo só aparece quando loading=false</p>
            </div>
          </gforge-skeleton>
        </div>
        <div>
          <h4>Conteúdo Carregado (loading=false)</h4>
          <gforge-skeleton variant="card" [loading]="false">
            <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h3>Conteúdo Real</h3>
              <p>Este conteúdo aparece quando loading=false</p>
            </div>
          </gforge-skeleton>
        </div>
      </div>
    `
  })
};

export const UserProfile: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <gforge-skeleton variant="circular" width="60" height="60"></gforge-skeleton>
          <div style="flex: 1;">
            <gforge-skeleton variant="text" width="70%" height="20px" lines="1"></gforge-skeleton>
            <br>
            <gforge-skeleton variant="text" width="50%" height="16px" lines="1"></gforge-skeleton>
          </div>
        </div>
        <gforge-skeleton variant="rectangular" width="100%" height="120px" [rounded]="true"></gforge-skeleton>
        <br><br>
        <gforge-skeleton variant="text" lines="3" lineSpacing="8px"></gforge-skeleton>
      </div>
    `
  })
};

export const ProductCard: Story = {
  render: () => ({
    template: `
      <div style="width: 280px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <gforge-skeleton variant="rectangular" width="100%" height="200px"></gforge-skeleton>
        <div style="padding: 16px;">
          <gforge-skeleton variant="text" width="80%" height="20px" lines="1"></gforge-skeleton>
          <br>
          <gforge-skeleton variant="text" width="60%" height="16px" lines="1"></gforge-skeleton>
          <br>
          <gforge-skeleton variant="text" lines="2" lineSpacing="6px"></gforge-skeleton>
          <br>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <gforge-skeleton variant="text" width="40%" height="24px" lines="1"></gforge-skeleton>
            <gforge-skeleton variant="rounded" width="80px" height="36px"></gforge-skeleton>
          </div>
        </div>
      </div>
    `
  })
};

export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4>Cores Padrão</h4>
          <gforge-skeleton variant="rectangular" width="300" height="60"></gforge-skeleton>
        </div>
        <div>
          <h4>Cores Personalizadas</h4>
          <gforge-skeleton 
            variant="rectangular" 
            width="300" 
            height="60" 
            baseColor="#ffebee" 
            highlightColor="#ffcdd2">
          </gforge-skeleton>
        </div>
      </div>
    `
  })
};

export const AnimationSpeeds: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4>Lento (3s)</h4>
          <gforge-skeleton variant="rectangular" width="300" height="40" animationSpeed="slow"></gforge-skeleton>
        </div>
        <div>
          <h4>Normal (2s)</h4>
          <gforge-skeleton variant="rectangular" width="300" height="40" animationSpeed="normal"></gforge-skeleton>
        </div>
        <div>
          <h4>Rápido (1s)</h4>
          <gforge-skeleton variant="rectangular" width="300" height="40" animationSpeed="fast"></gforge-skeleton>
        </div>
      </div>
    `
  })
};