import type { Meta, StoryObj } from '@storybook/angular';
import { Card3DComponent } from '../lib/components/card-3d/card-3d.component';

const meta: Meta<Card3DComponent> = {
  title: 'Innovative/3D Card',
  component: Card3DComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'holographic', 'metallic', 'neon', 'glass'],
    },
  },
};

export default meta;
type Story = StoryObj<Card3DComponent>;

export const Default: Story = {
  args: {
    width: 300,
    height: 400,
    variant: 'default',
    interactive: true,
    shadow: true,
    tiltIntensity: 15,
  },
  render: (args) => ({
    props: args,
    template: `
      <gf-card-3d 
        [width]="width" 
        [height]="height" 
        [variant]="variant"
        [interactive]="interactive"
        [shadow]="shadow"
        [tiltIntensity]="tiltIntensity">
        <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
          <h3 style="margin: 0 0 15px 0; color: white;">3D Card</h3>
          <p style="margin: 0; color: rgba(255,255,255,0.9); line-height: 1.5;">
            Hover over this card to see the 3D tilt effect in action. The card responds to mouse movement with smooth animations.
          </p>
        </div>
      </gf-card-3d>
    `,
  }),
};

export const Holographic: Story = {
  args: {
    width: 300,
    height: 400,
    variant: 'holographic',
    interactive: true,
    shadow: true,
    tiltIntensity: 20,
  },
  render: (args) => ({
    props: args,
    template: `
      <gf-card-3d 
        [width]="width" 
        [height]="height" 
        [variant]="variant"
        [interactive]="interactive"
        [shadow]="shadow"
        [tiltIntensity]="tiltIntensity">
        <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
          <h3 style="margin: 0 0 15px 0; color: white;">Holographic Card</h3>
          <p style="margin: 0; color: rgba(255,255,255,0.9); line-height: 1.5;">
            Experience the mesmerizing holographic effect with rainbow gradients and dynamic color shifts.
          </p>
        </div>
      </gf-card-3d>
    `,
  }),
};

export const AutoRotate: Story = {
  args: {
    width: 300,
    height: 400,
    variant: 'neon',
    interactive: false,
    autoRotate: true,
    rotateSpeed: 1,
    shadow: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <gf-card-3d 
        [width]="width" 
        [height]="height" 
        [variant]="variant"
        [interactive]="interactive"
        [autoRotate]="autoRotate"
        [rotateSpeed]="rotateSpeed"
        [shadow]="shadow">
        <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
          <h3 style="margin: 0 0 15px 0; color: white;">Auto Rotating</h3>
          <p style="margin: 0; color: rgba(255,255,255,0.9); line-height: 1.5;">
            This card rotates automatically with a neon glow effect. Perfect for showcasing content.
          </p>
        </div>
      </gf-card-3d>
    `,
  }),
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; padding: 20px;">
        <gf-card-3d width="250" height="300" variant="default">
          <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="margin: 0 0 10px 0; color: white;">Default</h4>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px;">Classic gradient background</p>
          </div>
        </gf-card-3d>
        
        <gf-card-3d width="250" height="300" variant="holographic">
          <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="margin: 0 0 10px 0; color: white;">Holographic</h4>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px;">Rainbow color effects</p>
          </div>
        </gf-card-3d>
        
        <gf-card-3d width="250" height="300" variant="metallic">
          <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="margin: 0 0 10px 0; color: #333;">Metallic</h4>
            <p style="margin: 0; color: #666; font-size: 14px;">Shiny metal surface</p>
          </div>
        </gf-card-3d>
        
        <gf-card-3d width="250" height="300" variant="neon">
          <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="margin: 0 0 10px 0; color: white;">Neon</h4>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px;">Glowing neon borders</p>
          </div>
        </gf-card-3d>
        
        <gf-card-3d width="250" height="300" variant="glass">
          <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="margin: 0 0 10px 0; color: #333;">Glass</h4>
            <p style="margin: 0; color: #666; font-size: 14px;">Frosted glass effect</p>
          </div>
        </gf-card-3d>
      </div>
    `,
  }),
};