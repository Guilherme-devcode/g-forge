import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
  suggestions?: string[];
  metadata?: any;
}

export interface ChatConfig {
  aiName: string;
  aiAvatar?: string;
  userAvatar?: string;
  theme: 'light' | 'dark' | 'auto';
  showTypingIndicator: boolean;
  showTimestamps: boolean;
  showSuggestions: boolean;
  maxMessages: number;
}

@Component({
  selector: 'gf-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss']
})
export class AiChatComponent implements AfterViewInit, OnDestroy {
  @Input() config: ChatConfig = {
    aiName: 'Assistente IA',
    theme: 'light',
    showTypingIndicator: true,
    showTimestamps: true,
    showSuggestions: true,
    maxMessages: 100
  };

  @Input() height: number = 500;
  @Input() width: number = 400;
  @Input() placeholder: string = 'Digite sua mensagem...';
  @Input() disabled: boolean = false;

  @Output() messageSubmit = new EventEmitter<string>();
  @Output() suggestionClick = new EventEmitter<string>();

  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput', { static: false }) messageInput!: ElementRef<HTMLInputElement>;

  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isTyping: boolean = false;
  suggestions: string[] = [
    'Como posso ajudar?',
    'Explique mais sobre isso',
    'Quais são as opções?',
    'Preciso de mais informações'
  ];

  private typingTimeout?: number;
  private messageIdCounter: number = 0;

  ngAfterViewInit() {
    this.addWelcomeMessage();
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  private addWelcomeMessage() {
    const welcomeMessage: ChatMessage = {
      id: this.generateMessageId(),
      content: `Olá! Eu sou ${this.config.aiName}. Como posso ajudar você hoje?`,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: this.suggestions
    };

    this.messages.push(welcomeMessage);
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.currentMessage.trim() || this.disabled) return;

    const userMessage: ChatMessage = {
      id: this.generateMessageId(),
      content: this.currentMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.messageSubmit.emit(this.currentMessage.trim());
    
    const messageToSend = this.currentMessage.trim();
    this.currentMessage = '';
    
    this.scrollToBottom();
    
    if (this.config.showTypingIndicator) {
      this.showTypingIndicator();
    }

    setTimeout(() => {
      this.simulateAiResponse(messageToSend);
    }, 1000 + Math.random() * 2000);
  }

  addMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    const newMessage: ChatMessage = {
      ...message,
      id: this.generateMessageId(),
      timestamp: new Date()
    };

    this.messages.push(newMessage);
    this.hideTypingIndicator();
    this.scrollToBottom();

    if (this.messages.length > this.config.maxMessages) {
      this.messages = this.messages.slice(-this.config.maxMessages);
    }
  }

  onSuggestionClick(suggestion: string) {
    this.currentMessage = suggestion;
    this.suggestionClick.emit(suggestion);
    this.sendMessage();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private showTypingIndicator() {
    this.isTyping = true;
    const typingMessage: ChatMessage = {
      id: 'typing',
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      typing: true
    };

    this.messages.push(typingMessage);
    this.scrollToBottom();
  }

  private hideTypingIndicator() {
    this.isTyping = false;
    this.messages = this.messages.filter(m => m.id !== 'typing');
  }

  private simulateAiResponse(userMessage: string) {
    const responses = [
      'Entendi sua pergunta. Deixe-me pensar sobre isso...',
      'Interessante perspectiva! Aqui está o que eu penso:',
      'Baseado no que você disse, posso sugerir:',
      'Essa é uma ótima questão. Vou explicar:',
      'Obrigado por compartilhar isso. Minha resposta:'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const aiMessage: ChatMessage = {
      id: this.generateMessageId(),
      content: `${randomResponse}\n\nVocê mencionou: "${userMessage}". Isso é muito relevante para nossa conversa.`,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: this.generateDynamicSuggestions(userMessage)
    };

    this.addMessage(aiMessage);
  }

  private generateDynamicSuggestions(userMessage: string): string[] {
    const baseSuggestions = [
      'Pode explicar melhor?',
      'Quais são as alternativas?',
      'Como isso funciona?',
      'Preciso de mais detalhes'
    ];

    if (userMessage.toLowerCase().includes('como')) {
      return ['Explique o processo', 'Mostre um exemplo', 'Quais são os passos?'];
    }

    if (userMessage.toLowerCase().includes('por que')) {
      return ['Quais são as razões?', 'Pode dar exemplos?', 'Isso sempre acontece?'];
    }

    return baseSuggestions;
  }

  private generateMessageId(): string {
    return `msg_${++this.messageIdCounter}_${Date.now()}`;
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        const container = this.messagesContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }

  clearChat() {
    this.messages = [];
    this.addWelcomeMessage();
  }

  exportChat(): string {
    return JSON.stringify(this.messages, null, 2);
  }

  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  trackByMessageId(index: number, message: ChatMessage): string {
    return message.id;
  }

  formatMessageContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }
}