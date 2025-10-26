import type { Meta, StoryObj } from '@storybook/angular';
import { AiChatComponent } from '../lib/components/ai-chat/ai-chat.component';

const meta: Meta<AiChatComponent> = {
  title: 'Innovative/AI Chat',
  component: AiChatComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AiChatComponent>;

export const Default: Story = {
  args: {
    width: 400,
    height: 500,
    config: {
      aiName: 'Assistente IA',
      theme: 'light',
      showTypingIndicator: true,
      showTimestamps: true,
      showSuggestions: true,
      maxMessages: 100,
    },
    placeholder: 'Digite sua mensagem...',
  },
};

export const DarkTheme: Story = {
  args: {
    width: 400,
    height: 500,
    config: {
      aiName: 'AI Assistant',
      theme: 'dark',
      showTypingIndicator: true,
      showTimestamps: true,
      showSuggestions: true,
      maxMessages: 100,
    },
    placeholder: 'Type your message...',
  },
};

export const Minimal: Story = {
  args: {
    width: 350,
    height: 400,
    config: {
      aiName: 'Helper',
      theme: 'light',
      showTypingIndicator: false,
      showTimestamps: false,
      showSuggestions: false,
      maxMessages: 50,
    },
    placeholder: 'Ask me anything...',
  },
};

export const CustomAvatar: Story = {
  args: {
    width: 400,
    height: 500,
    config: {
      aiName: 'ChatBot Pro',
      aiAvatar: 'https://via.placeholder.com/40x40/4ecdc4/ffffff?text=AI',
      userAvatar: 'https://via.placeholder.com/40x40/44a08d/ffffff?text=U',
      theme: 'light',
      showTypingIndicator: true,
      showTimestamps: true,
      showSuggestions: true,
      maxMessages: 100,
    },
    placeholder: 'How can I help you today?',
  },
};

export const CompactSize: Story = {
  args: {
    width: 300,
    height: 350,
    config: {
      aiName: 'Mini AI',
      theme: 'light',
      showTypingIndicator: true,
      showTimestamps: false,
      showSuggestions: true,
      maxMessages: 30,
    },
    placeholder: 'Quick question?',
  },
};