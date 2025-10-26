# G-Forge Components Library

Uma biblioteca de componentes Angular moderna e inovadora com efeitos visuais avançados, animações fluidas e implementações fora da curva.

## 🚀 Componentes Implementados

### 📱 Componentes UI Básicos
- **Button** - Botões com múltiplos estilos e estados
- **Input Text** - Campos de entrada de texto
- **Dropdown** - Menus suspensos
- **Table** - Tabelas responsivas
- **Toast** - Notificações temporárias
- **Card** - Cartões de conteúdo
- **Modal** - Janelas modais
- **Checkbox** - Caixas de seleção
- **Radio** - Botões de opção
- **Badge** - Emblemas e etiquetas

### 🎨 Componentes UI Avançados

#### **Slider Component**
Slider interativo com efeitos visuais avançados:
- ✨ Múltiplas variantes (default, neon, gradient, pulse)
- 🎯 Sistema de partículas opcional
- 📏 Suporte a ticks e valores
- 🎨 Múltiplas cores e tamanhos
- 🔧 Integração com Angular Forms

```html
<gf-slider 
  [min]="0" 
  [max]="100" 
  [showValue]="true"
  [showParticles]="true"
  variant="neon"
  color="primary">
</gf-slider>
```

#### **Switch Component**
Switch com animações fluidas e múltiplos estilos:
- 🎭 5 variantes (default, iOS, material, neon, morphism)
- 🏷️ Labels personalizáveis
- ⚡ Estados de loading
- 🎨 Múltiplas cores e tamanhos
- 🔧 Integração com Angular Forms

```html
<gf-switch 
  variant="ios" 
  [showLabels]="true"
  onLabel="ON"
  offLabel="OFF"
  color="success">
</gf-switch>
```

#### **Tabs Component**
Sistema de abas avançado com animações:
- 📱 Responsivo com scroll automático
- 🎨 Múltiplas variantes (default, pills, underline, cards, vertical, morphism)
- 🔄 Indicador animado
- 🏷️ Badges e ícones
- ❌ Abas fecháveis
- ⌨️ Navegação por teclado

```html
<gf-tabs variant="pills" color="primary">
  <gf-tab id="tab1" label="Tab 1" icon="fas fa-home">
    Conteúdo da aba 1
  </gf-tab>
  <gf-tab id="tab2" label="Tab 2" [badge]="5">
    Conteúdo da aba 2
  </gf-tab>
</gf-tabs>
```

#### **Accordion Component**
Accordion com animações suaves:
- 🔄 Múltiplas variantes (default, card, minimal, bordered, flush)
- 📏 Múltiplos tamanhos
- 🎨 Cores personalizáveis
- 🏷️ Ícones e badges
- 🔀 Modo múltiplo ou único

```html
<gf-accordion variant="card" [multiple]="true">
  <gf-accordion-item title="Item 1" icon="fas fa-star">
    Conteúdo do item 1
  </gf-accordion-item>
  <gf-accordion-item title="Item 2" [badge]="3">
    Conteúdo do item 2
  </gf-accordion-item>
</gf-accordion>
```

### 🌟 Componentes Inovadores

#### **Particle System**
Sistema de partículas avançado com Canvas:
- 🎆 6 efeitos diferentes (float, explosion, spiral, wave, constellation, rain)
- 🎨 Múltiplas formas (circle, square, triangle, star)
- 🖱️ Interatividade com mouse
- 🌈 Cores personalizáveis
- ⚡ Otimizado para performance
- 🎯 Suporte a conteúdo sobreposto

```html
<gf-particle-system 
  [width]="600" 
  [height]="400"
  effect="constellation"
  [interactive]="true"
  [colors]="['#4ecdc4', '#44a08d']">
  <div>Seu conteúdo aqui</div>
</gf-particle-system>
```

#### **3D Card**
Cartões com efeitos 3D e holográficos:
- 🎭 5 variantes (default, holographic, metallic, neon, glass)
- 🖱️ Efeito tilt interativo
- ✨ Efeitos de brilho e reflexo
- 🔄 Rotação automática opcional
- 🎨 Múltiplas intensidades de efeito

```html
<gf-card-3d 
  [width]="300" 
  [height]="400"
  variant="holographic"
  [interactive]="true"
  [autoRotate]="false">
  <div>Conteúdo do cartão 3D</div>
</gf-card-3d>
```

#### **AI Chat**
Interface de chat inteligente:
- 🤖 Simulação de IA com respostas dinâmicas
- 💬 Indicador de digitação animado
- 🎨 Temas claro e escuro
- 💡 Sugestões inteligentes
- 📱 Design responsivo
- ⚡ Animações fluidas
- 🔧 Configuração flexível

```html
<gf-ai-chat 
  [width]="400" 
  [height]="500"
  [config]="{
    aiName: 'Assistente IA',
    theme: 'dark',
    showTypingIndicator: true,
    showSuggestions: true
  }">
</gf-ai-chat>
```

### 📐 Componentes de Layout

#### **Masonry Layout**
Layout em cascata responsivo:
- 📱 Totalmente responsivo
- 🔄 Animações de entrada
- 👁️ Intersection Observer
- 🎨 Múltiplos breakpoints
- ⚡ Performance otimizada

```html
<gf-masonry [columns]="3" [gap]="16" [responsive]="true">
  <gf-masonry-item>Item 1</gf-masonry-item>
  <gf-masonry-item>Item 2</gf-masonry-item>
  <gf-masonry-item>Item 3</gf-masonry-item>
</gf-masonry>
```

#### **Infinite Scroll**
Scroll infinito com estados avançados:
- 🔄 Intersection Observer
- ⚡ Debounce configurável
- 📱 Suporte horizontal e vertical
- 🎯 Estados de loading, erro e fim
- 🔧 Configuração flexível

```html
<gf-infinite-scroll 
  [threshold]="200"
  [loading]="isLoading"
  [hasMore]="hasMoreItems"
  (loadMore)="loadMoreItems()">
  <!-- Seu conteúdo aqui -->
</gf-infinite-scroll>
```

### 📊 Visualização de Dados

#### **Advanced Chart**
Sistema de gráficos avançado com Canvas:
- 📈 7 tipos de gráficos (line, bar, pie, doughnut, area, scatter, radar)
- 🎨 Gradientes e cores personalizáveis
- 🖱️ Interatividade completa
- 💡 Tooltips dinâmicos
- 📱 Responsivo
- ⚡ Animações suaves

```html
<gf-advanced-chart 
  [data]="chartData"
  [config]="{
    type: 'line',
    animated: true,
    showGrid: true,
    interactive: true
  }"
  [width]="600"
  [height]="400">
</gf-advanced-chart>
```

### 🎬 Sistema de Animações

#### **Animation System**
Sistema completo de animações:
- 🎭 25+ tipos de animação
- ⚡ 15+ funções de easing
- 🎯 Múltiplos triggers (load, hover, click, scroll)
- 🔄 Controle de direção e repetição
- 📱 Intersection Observer para scroll
- 🎨 API Web Animations

```html
<gf-animate 
  animation="fadeInUp"
  [duration]="1000"
  easing="ease-out-back"
  trigger="scroll">
  <div>Elemento animado</div>
</gf-animate>
```

### 🎨 Componentes de Efeitos Visuais
- **Glass Card** - Cartões com efeito glassmorphism
- **Neon Button** - Botões com efeito neon
- **Loading** - Indicadores de carregamento animados

### 🛠️ Serviços
- **Toast Service** - Gerenciamento de notificações

## 🎯 Características Principais

### ✨ Efeitos Visuais Avançados
- Glassmorphism e morfismo
- Efeitos holográficos
- Partículas interativas
- Animações 3D
- Gradientes dinâmicos

### 🚀 Performance
- Otimização com Web APIs modernas
- Intersection Observer
- Web Animations API
- Canvas otimizado
- Lazy loading

### 📱 Responsividade
- Design mobile-first
- Breakpoints configuráveis
- Layouts adaptativos
- Touch-friendly

### 🎨 Customização
- Sistema de temas
- Variáveis CSS
- Props configuráveis
- Slots flexíveis

### ♿ Acessibilidade
- ARIA labels
- Navegação por teclado
- Alto contraste
- Screen reader friendly

## 🔧 Tecnologias Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **Web Animations API** - Animações nativas
- **Canvas API** - Gráficos e partículas
- **Intersection Observer** - Detecção de viewport
- **Storybook** - Documentação interativa

## 📦 Instalação

```bash
npm install g-forge
```

## 🚀 Uso Básico

```typescript
import { Component } from '@angular/core';
import { SliderComponent, Card3DComponent, ParticleSystemComponent } from 'g-forge';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [SliderComponent, Card3DComponent, ParticleSystemComponent],
  template: `
    <gf-particle-system effect="constellation" [interactive]="true">
      <gf-card-3d variant="holographic">
        <h2>Bem-vindo ao G-Forge!</h2>
        <gf-slider variant="neon" [showParticles]="true"></gf-slider>
      </gf-card-3d>
    </gf-particle-system>
  `
})
export class DemoComponent {}
```

## 🎨 Temas e Customização

A biblioteca suporta temas personalizados através de variáveis CSS:

```scss
:root {
  --gf-primary-color: #4ecdc4;
  --gf-secondary-color: #1a535c;
  --gf-danger-color: #ff6b6b;
  --gf-success-color: #28a745;
}
```

## 📚 Documentação Completa

Visite nosso Storybook para ver todos os componentes em ação e suas configurações:

```bash
npm run storybook
```

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de submeter PRs.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

**G-Forge** - Criando interfaces extraordinárias com Angular 🚀