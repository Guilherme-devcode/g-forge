import type { Meta, StoryObj } from '@storybook/angular';
import { AnimateComponent } from '../lib/components/animation-system/animation-system.component';

const meta: Meta<AnimateComponent> = {
  title: 'Animation System/Animate',
  component: AnimateComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: { type: 'select' },
      options: [
        'fadeIn', 'fadeOut', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight',
        'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight',
        'zoomIn', 'zoomOut', 'zoomInUp', 'zoomInDown',
        'bounceIn', 'bounceInUp', 'bounceInDown', 'bounceInLeft', 'bounceInRight',
        'rotateIn', 'rotateInUpLeft', 'rotateInUpRight', 'rotateInDownLeft', 'rotateInDownRight',
        'flipInX', 'flipInY', 'flipOutX', 'flipOutY',
        'pulse', 'heartbeat', 'shake', 'swing', 'wobble', 'jello',
        'rubberBand', 'tada', 'flash', 'bounce', 'headShake', 'jackInTheBox'
      ],
    },
    easing: {
      control: { type: 'select' },
      options: [
        'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear',
        'ease-in-sine', 'ease-out-sine', 'ease-in-out-sine',
        'ease-in-quad', 'ease-out-quad', 'ease-in-out-quad',
        'ease-in-cubic', 'ease-out-cubic', 'ease-in-out-cubic',
        'ease-in-back', 'ease-out-back', 'ease-in-out-back',
        'ease-in-elastic', 'ease-out-elastic', 'ease-in-out-elastic',
        'ease-in-bounce', 'ease-out-bounce', 'ease-in-out-bounce'
      ],
    },
    trigger: {
      control: { type: 'select' },
      options: ['load', 'hover', 'click', 'scroll', 'manual'],
    },
    direction: {
      control: { type: 'select' },
      options: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
    },
    fillMode: {
      control: { type: 'select' },
      options: ['none', 'forwards', 'backwards', 'both'],
    },
  },
};

export default meta;
type Story = StoryObj<AnimateComponent>;

export const Default: Story = {
  args: {
    animation: 'fadeIn',
    duration: 1000,
    delay: 0,
    easing: 'ease',
    iterations: 1,
    direction: 'normal',
    fillMode: 'both',
    trigger: 'load',
    autoPlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <gf-animate 
        [animation]="animation"
        [duration]="duration"
        [delay]="delay"
        [easing]="easing"
        [iterations]="iterations"
        [direction]="direction"
        [fillMode]="fillMode"
        [trigger]="trigger"
        [autoPlay]="autoPlay">
        <div style="padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
          <h3 style="margin: 0 0 15px 0;">Animated Element</h3>
          <p style="margin: 0; opacity: 0.9;">This element will animate based on the selected animation type and settings.</p>
        </div>
      </gf-animate>
    `,
  }),
};

export const OnHover: Story = {
  args: {
    animation: 'pulse',
    duration: 600,
    delay: 0,
    easing: 'ease-in-out',
    iterations: 'infinite',
    trigger: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <gf-animate 
        [animation]="animation"
        [duration]="duration"
        [delay]="delay"
        [easing]="easing"
        [iterations]="iterations"
        [trigger]="trigger">
        <div style="padding: 30px; background: #4ecdc4; color: white; border-radius: 8px; text-align: center; cursor: pointer;">
          <h4 style="margin: 0 0 10px 0;">Hover Me!</h4>
          <p style="margin: 0; font-size: 14px;">Animation triggers on hover</p>
        </div>
      </gf-animate>
    `,
  }),
};

export const OnClick: Story = {
  args: {
    animation: 'tada',
    duration: 1000,
    delay: 0,
    easing: 'ease-out',
    iterations: 1,
    trigger: 'click',
  },
  render: (args) => ({
    props: args,
    template: `
      <gf-animate 
        [animation]="animation"
        [duration]="duration"
        [delay]="delay"
        [easing]="easing"
        [iterations]="iterations"
        [trigger]="trigger">
        <button style="padding: 20px 40px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);">
          Click Me for Animation!
        </button>
      </gf-animate>
    `,
  }),
};

export const AnimationShowcase: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 20px;">
        <gf-animate animation="fadeInUp" [duration]="800" delay="0">
          <div style="padding: 20px; background: #3498db; color: white; border-radius: 8px; text-align: center;">
            <h5 style="margin: 0 0 10px 0;">Fade In Up</h5>
            <p style="margin: 0; font-size: 12px;">Fades in from bottom</p>
          </div>
        </gf-animate>
        
        <gf-animate animation="bounceIn" [duration]="1000" delay="200">
          <div style="padding: 20px; background: #e74c3c; color: white; border-radius: 8px; text-align: center;">
            <h5 style="margin: 0 0 10px 0;">Bounce In</h5>
            <p style="margin: 0; font-size: 12px;">Bounces into view</p>
          </div>
        </gf-animate>
        
        <gf-animate animation="rotateIn" [duration]="800" delay="400">
          <div style="padding: 20px; background: #2ecc71; color: white; border-radius: 8px; text-align: center;">
            <h5 style="margin: 0 0 10px 0;">Rotate In</h5>
            <p style="margin: 0; font-size: 12px;">Rotates while scaling</p>
          </div>
        </gf-animate>
        
        <gf-animate animation="flipInX" [duration]="1000" delay="600">
          <div style="padding: 20px; background: #9b59b6; color: white; border-radius: 8px; text-align: center;">
            <h5 style="margin: 0 0 10px 0;">Flip In X</h5>
            <p style="margin: 0; font-size: 12px;">3D flip effect</p>
          </div>
        </gf-animate>
        
        <gf-animate animation="zoomInUp" [duration]="800" delay="800">
          <div style="padding: 20px; background: #f39c12; color: white; border-radius: 8px; text-align: center;">
            <h5 style="margin: 0 0 10px 0;">Zoom In Up</h5>
            <p style="margin: 0; font-size: 12px;">Zooms from bottom</p>
          </div>
        </gf-animate>
        
        <gf-animate animation="jackInTheBox" [duration]="1200" delay="1000">
          <div style="padding: 20px; background: #1abc9c; color: white; border-radius: 8px; text-align: center;">
            <h5 style="margin: 0 0 10px 0;">Jack In The Box</h5>
            <p style="margin: 0; font-size: 12px;">Surprise animation</p>
          </div>
        </gf-animate>
      </div>
    `,
  }),
};