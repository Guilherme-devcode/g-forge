import { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from '../lib/components/badge/badge.component';

export default {
  title: 'G-Forge/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill', 'square'],
    },
    position: {
      control: 'select',
      options: ['static', 'top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    customColor: {
      control: 'color',
    },
  },
} as Meta<BadgeComponent>;

type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  args: {
    label: 'Badge',
    variant: 'primary',
    size: 'medium',
    shape: 'rounded',
    outline: false,
    glow: false,
    pulse: false,
    removable: false,
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 10px; flex-wrap: wrap; padding: 20px;">
        <gforge-badge label="Primary" variant="primary"></gforge-badge>
        <gforge-badge label="Secondary" variant="secondary"></gforge-badge>
        <gforge-badge label="Success" variant="success"></gforge-badge>
        <gforge-badge label="Danger" variant="danger"></gforge-badge>
        <gforge-badge label="Warning" variant="warning"></gforge-badge>
        <gforge-badge label="Info" variant="info"></gforge-badge>
        <gforge-badge label="Light" variant="light"></gforge-badge>
        <gforge-badge label="Dark" variant="dark"></gforge-badge>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 15px; align-items: center; padding: 20px;">
        <gforge-badge label="Small" variant="primary" size="small"></gforge-badge>
        <gforge-badge label="Medium" variant="primary" size="medium"></gforge-badge>
        <gforge-badge label="Large" variant="primary" size="large"></gforge-badge>
      </div>
    `,
  }),
};

export const AllShapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 15px; align-items: center; padding: 20px;">
        <gforge-badge label="Rounded" variant="primary" shape="rounded"></gforge-badge>
        <gforge-badge label="Pill" variant="success" shape="pill"></gforge-badge>
        <gforge-badge label="Square" variant="danger" shape="square"></gforge-badge>
      </div>
    `,
  }),
};

export const OutlineStyle: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 10px; flex-wrap: wrap; padding: 20px;">
        <gforge-badge label="Primary" variant="primary" [outline]="true"></gforge-badge>
        <gforge-badge label="Secondary" variant="secondary" [outline]="true"></gforge-badge>
        <gforge-badge label="Success" variant="success" [outline]="true"></gforge-badge>
        <gforge-badge label="Danger" variant="danger" [outline]="true"></gforge-badge>
        <gforge-badge label="Warning" variant="warning" [outline]="true"></gforge-badge>
        <gforge-badge label="Info" variant="info" [outline]="true"></gforge-badge>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 10px; flex-wrap: wrap; padding: 20px;">
        <gforge-badge label="New" variant="success" icon="✨"></gforge-badge>
        <gforge-badge label="Hot" variant="danger" icon="🔥"></gforge-badge>
        <gforge-badge label="Sale" variant="warning" icon="💰"></gforge-badge>
        <gforge-badge label="Premium" variant="primary" icon="👑"></gforge-badge>
        <gforge-badge label="Beta" variant="info" icon="🧪"></gforge-badge>
      </div>
    `,
  }),
};

export const Numbers: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 15px; align-items: center; padding: 20px;">
        <gforge-badge [label]="1" variant="danger" shape="pill"></gforge-badge>
        <gforge-badge [label]="5" variant="primary" shape="pill"></gforge-badge>
        <gforge-badge [label]="99" variant="success" shape="pill"></gforge-badge>
        <gforge-badge [label]="999" variant="warning" shape="pill"></gforge-badge>
      </div>
    `,
  }),
};

export const NotificationBadges: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 40px; padding: 40px; align-items: center;">
        
        <!-- Notification Bell -->
        <div style="position: relative; display: inline-block;">
          <div style="
            width: 40px; 
            height: 40px; 
            background: #f0f0f0; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            font-size: 20px;
          ">🔔</div>
          <gforge-badge [label]="3" variant="danger" size="small" position="top-right" shape="pill"></gforge-badge>
        </div>
        
        <!-- Message Icon -->
        <div style="position: relative; display: inline-block;">
          <div style="
            width: 40px; 
            height: 40px; 
            background: #f0f0f0; 
            border-radius: 8px; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            font-size: 20px;
          ">💬</div>
          <gforge-badge [label]="12" variant="primary" size="small" position="top-right" shape="pill"></gforge-badge>
        </div>
        
        <!-- Shopping Cart -->
        <div style="position: relative; display: inline-block;">
          <div style="
            width: 40px; 
            height: 40px; 
            background: #f0f0f0; 
            border-radius: 8px; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            font-size: 20px;
          ">🛒</div>
          <gforge-badge [label]="7" variant="success" size="small" position="top-right" shape="pill"></gforge-badge>
        </div>
        
        <!-- Profile with Status -->
        <div style="position: relative; display: inline-block;">
          <div style="
            width: 50px; 
            height: 50px; 
            background: linear-gradient(45deg, #667eea, #764ba2); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            color: white;
            font-weight: bold;
          ">JD</div>
          <gforge-badge variant="success" size="small" position="bottom-right" shape="pill"></gforge-badge>
        </div>
        
      </div>
    `,
  }),
};

export const SpecialEffects: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 20px; flex-wrap: wrap; padding: 20px;">
        <div>
          <h4>Glow Effect</h4>
          <div style="display: flex; gap: 10px;">
            <gforge-badge label="Glowing" variant="primary" [glow]="true"></gforge-badge>
            <gforge-badge label="Bright" variant="success" [glow]="true"></gforge-badge>
            <gforge-badge label="Neon" variant="danger" [glow]="true"></gforge-badge>
          </div>
        </div>
        
        <div>
          <h4>Pulse Effect</h4>
          <div style="display: flex; gap: 10px;">
            <gforge-badge label="Live" variant="success" [pulse]="true"></gforge-badge>
            <gforge-badge label="Active" variant="primary" [pulse]="true"></gforge-badge>
            <gforge-badge label="Alert" variant="danger" [pulse]="true"></gforge-badge>
          </div>
        </div>
        
        <div>
          <h4>Removable</h4>
          <div style="display: flex; gap: 10px;">
            <gforge-badge label="Tag 1" variant="info" [removable]="true"></gforge-badge>
            <gforge-badge label="Tag 2" variant="secondary" [removable]="true"></gforge-badge>
            <gforge-badge label="Tag 3" variant="warning" [removable]="true"></gforge-badge>
          </div>
        </div>
      </div>
    `,
  }),
};

export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 10px; flex-wrap: wrap; padding: 20px;">
        <gforge-badge label="Custom Pink" customColor="#e91e63"></gforge-badge>
        <gforge-badge label="Custom Purple" customColor="#9c27b0"></gforge-badge>
        <gforge-badge label="Custom Orange" customColor="#ff9800"></gforge-badge>
        <gforge-badge label="Custom Teal" customColor="#009688"></gforge-badge>
        <gforge-badge label="Outline" customColor="#673ab7" [outline]="true"></gforge-badge>
        <gforge-badge label="Glow" customColor="#f44336" [glow]="true"></gforge-badge>
      </div>
    `,
  }),
};

export const StatusIndicators: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <h3>System Status Dashboard</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h4 style="margin: 0 0 15px 0;">Server Status</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <gforge-badge label="API Online" variant="success" icon="✅"></gforge-badge>
              <gforge-badge label="Database Connected" variant="success" icon="🗄️"></gforge-badge>
              <gforge-badge label="Cache Warning" variant="warning" icon="⚠️"></gforge-badge>
            </div>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h4 style="margin: 0 0 15px 0;">User Activity</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <gforge-badge [label]="127" variant="primary" icon="👥" shape="pill"></gforge-badge>
              <gforge-badge [label]="45" variant="info" icon="🔄" shape="pill"></gforge-badge>
              <gforge-badge [label]="12" variant="success" icon="📈" shape="pill"></gforge-badge>
            </div>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h4 style="margin: 0 0 15px 0;">Notifications</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <gforge-badge [label]="3" variant="danger" [pulse]="true" shape="pill"></gforge-badge>
              <gforge-badge label="New Messages" variant="primary" icon="✉️"></gforge-badge>
              <gforge-badge label="Updates Available" variant="warning" icon="🔄"></gforge-badge>
            </div>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h4 style="margin: 0 0 15px 0;">Performance</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <gforge-badge label="CPU 45%" variant="success" [glow]="true"></gforge-badge>
              <gforge-badge label="RAM 78%" variant="warning" [glow]="true"></gforge-badge>
              <gforge-badge label="Disk 23%" variant="success" [glow]="true"></gforge-badge>
            </div>
          </div>
          
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    label: 'Click to remove',
    variant: 'primary',
    size: 'medium',
    removable: true,
  },
  render: (args) => ({
    props: {
      ...args,
      badges: [
        { id: 1, label: 'JavaScript', variant: 'primary' },
        { id: 2, label: 'TypeScript', variant: 'info' },
        { id: 3, label: 'Angular', variant: 'danger' },
        { id: 4, label: 'React', variant: 'success' },
        { id: 5, label: 'Vue', variant: 'warning' },
      ],
      removeBadge: function(id: number) {
        this.badges = this.badges.filter((b: any) => b.id !== id);
      }
    },
    template: `
      <div style="padding: 20px;">
        <h3>Interactive Tags (Click × to remove)</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
          <gforge-badge 
            *ngFor="let badge of badges" 
            [label]="badge.label" 
            [variant]="badge.variant"
            [removable]="true"
            (click)="removeBadge(badge.id)">
          </gforge-badge>
        </div>
        
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
          Click the × button on any badge to remove it from the list.
        </p>
      </div>
    `,
  }),
};