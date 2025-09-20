# G-Forge UI Library 🚀

Uma biblioteca de componentes Angular moderna e única, criada para elevar seus sistemas com visuais impressionantes e funcionalidades avançadas.

## ✨ Características Únicas

- **🎨 Efeitos Visuais Únicos**: Glassmorphism, Neon, Temas Dark/Light
- **📊 Componentes Avançados**: DataGrid completo, Charts nativos, Modais sofisticados
- **🎯 Altamente Personalizável**: Temas múltiplos, cores customizáveis, animações
- **📱 Totalmente Responsivo**: Otimizado para todos os dispositivos
- **🔧 Fácil Integração**: Componentes standalone, sem dependências externas
- **⚡ Performance**: Otimizado para aplicações de alta performance

## 🛠 Instalação

```bash
npm install g-forge
```

## 🎨 Componentes Disponíveis

### 📋 Componentes Básicos

#### Button
Botão tradicional com múltiplas variantes e tamanhos.

```typescript
import { ButtonComponent } from 'g-forge';

// No template
<gforge-button 
  label="Clique aqui"
  variant="primary"
  size="medium"
  (clicked)="handleClick($event)">
</gforge-button>
```

**Propriedades:**
- `label`: string - Texto do botão
- `variant`: 'primary' | 'secondary' | 'danger' - Variante visual
- `size`: 'small' | 'medium' | 'large' - Tamanho
- `disabled`: boolean - Estado desabilitado

#### Input Text
Campo de entrada com máscaras e validações.

```typescript
<gforge-input-text
  placeholder="Digite seu nome"
  [value]="name"
  type="text"
  mask="cpf"
  (valueChanged)="onNameChange($event)">
</gforge-input-text>
```

**Máscaras disponíveis:**
- `cpf`: Formato XXX.XXX.XXX-XX
- `money`: Formato monetário
- `currency`: Moeda com símbolo (R$ ou $)

#### Dropdown
Seletor com opções customizáveis.

```typescript
const options = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' }
];

<gforge-dropdown
  [options]="options"
  label="Selecione"
  (selected)="onSelect($event)">
</gforge-dropdown>
```

### 🎯 Componentes Avançados

#### Card
Card moderno com múltiplas variantes.

```typescript
<gforge-card
  title="Título do Card"
  subtitle="Subtítulo"
  variant="elevated"
  size="medium"
  [clickable]="true">
  
  <p>Conteúdo do card aqui...</p>
  
  <div slot="actions">
    <gforge-button label="Ação" variant="primary"></gforge-button>
  </div>
</gforge-card>
```

#### Modal
Modal sofisticado com overlay e animações.

```typescript
<gforge-modal
  [isOpen]="showModal"
  title="Título do Modal"
  size="medium"
  [showActionButtons]="true"
  confirmButtonText="Confirmar"
  cancelButtonText="Cancelar"
  (closed)="onModalClose()"
  (confirmed)="onConfirm()"
  (cancelled)="onCancel()">
  
  <p>Conteúdo do modal...</p>
</gforge-modal>
```

#### DataGrid
Grid de dados completo com filtros, ordenação e paginação.

```typescript
const columns: DataGridColumn[] = [
  { key: 'id', title: 'ID', sortable: true, width: '80px' },
  { key: 'name', title: 'Nome', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true, filterable: true },
  { key: 'active', title: 'Ativo', type: 'boolean' }
];

const config: DataGridConfig = {
  pagination: { enabled: true, pageSize: 10, pageSizeOptions: [5, 10, 25] },
  sorting: { enabled: true, multiSort: false },
  filtering: { enabled: true, globalSearch: true },
  selection: { enabled: true, multiple: true }
};

<gforge-data-grid
  [data]="userData"
  [columns]="columns"
  [config]="config"
  theme="default"
  (rowSelected)="onRowSelect($event)"
  (sortChanged)="onSort($event)">
</gforge-data-grid>
```

#### Chart
Gráficos nativos com múltiplos tipos.

```typescript
const chartData: ChartSeries[] = [
  {
    name: 'Vendas',
    data: [
      { label: 'Jan', value: 120 },
      { label: 'Fev', value: 150 },
      { label: 'Mar', value: 180 }
    ],
    color: '#4ecdc4'
  }
];

<gforge-chart
  type="line"
  [data]="chartData"
  theme="default"
  [width]="600"
  [height]="400"
  [config]="{
    title: 'Vendas Mensais',
    showLegend: true,
    showGrid: true,
    animation: { enabled: true, duration: 1000 }
  }">
</gforge-chart>
```

**Tipos de gráfico:**
- `line`: Gráfico de linha
- `bar`: Gráfico de barras
- `pie`: Gráfico de pizza
- `doughnut`: Gráfico de rosca
- `area`: Gráfico de área
- `radar`: Gráfico radar

### 🎨 Componentes com Efeitos Visuais

#### Glass Card
Card com efeito glassmorphism único.

```typescript
<gforge-glass-card
  title="Glass Card"
  subtitle="Efeito glassmorphism"
  variant="light"
  blurIntensity="medium"
  [animated]="true"
  [glowBorder]="true"
  customColor="#ff6b6b">
  
  <p>Conteúdo com efeito glass...</p>
  
  <div slot="actions">
    <button>Ação</button>
  </div>
</gforge-glass-card>
```

**Variantes:**
- `light`: Efeito claro
- `dark`: Efeito escuro
- `colorful`: Com cor personalizada
- `neon`: Estilo cyberpunk

#### Neon Button
Botão com efeito neon cyberpunk.

```typescript
<gforge-neon-button
  label="NEON BUTTON"
  neonColor="#00ff88"
  size="medium"
  glowStyle="pulse"
  [scanLine]="true"
  (clicked)="onNeonClick($event)">
</gforge-neon-button>
```

**Estilos de glow:**
- `pulse`: Pulsação suave
- `static`: Estático
- `flicker`: Efeito de tremulação
- `wave`: Ondulação

### 📝 Componentes de Formulário

#### Checkbox
Checkbox com estados customizáveis.

```typescript
<gforge-checkbox
  label="Aceito os termos"
  [checked]="accepted"
  variant="primary"
  size="medium"
  [indeterminate]="false"
  (checkedChange)="onAcceptChange($event)">
</gforge-checkbox>
```

#### Radio
Grupo de radio buttons.

```typescript
const radioOptions: RadioOption[] = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3', disabled: true }
];

<gforge-radio
  [options]="radioOptions"
  [value]="selectedValue"
  name="example"
  variant="primary"
  direction="vertical"
  (valueChange)="onRadioChange($event)">
</gforge-radio>
```

## 🎨 Sistema de Temas

A G-Forge oferece múltiplos temas para diferentes estilos:

### Temas Disponíveis

#### Default
Tema padrão com cores vibrantes e modernas.

#### Dark
Tema escuro para interfaces noturnas.

#### Neon
Tema cyberpunk com efeitos neon.

#### Minimal
Tema minimalista e clean.

### Usando Temas

```typescript
// Aplicar tema em componentes individuais
<gforge-data-grid theme="dark" [data]="data" [columns]="columns"></gforge-data-grid>
<gforge-chart theme="neon" type="line" [data]="chartData"></gforge-chart>
<gforge-glass-card variant="dark"></gforge-glass-card>
```

## 🎯 Exemplos de Uso

### Dashboard Completo

```typescript
@Component({
  template: `
    <!-- Header com Glass Card -->
    <gforge-glass-card variant="light" [animated]="true">
      <h1>Dashboard Analytics</h1>
      <div style="display: flex; gap: 20px; margin-top: 20px;">
        <gforge-neon-button label="REFRESH" neonColor="#00ff88" (clicked)="refresh()"></gforge-neon-button>
        <gforge-neon-button label="EXPORT" neonColor="#00ccff" (clicked)="export()"></gforge-neon-button>
      </div>
    </gforge-glass-card>

    <!-- Gráficos -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
      <gforge-chart 
        type="line" 
        [data]="salesData" 
        theme="default"
        [config]="{ title: 'Vendas', showLegend: true }">
      </gforge-chart>
      
      <gforge-chart 
        type="pie" 
        [data]="categoryData" 
        theme="default"
        [config]="{ title: 'Categorias', showLegend: true }">
      </gforge-chart>
    </div>

    <!-- Grid de Dados -->
    <gforge-data-grid
      [data]="tableData"
      [columns]="columns"
      [config]="gridConfig"
      theme="default"
      (rowSelected)="onRowSelect($event)">
    </gforge-data-grid>

    <!-- Modal de Detalhes -->
    <gforge-modal
      [isOpen]="showDetails"
      title="Detalhes do Item"
      size="large"
      [showActionButtons]="true"
      (closed)="closeDetails()"
      (confirmed)="saveDetails()">
      
      <gforge-input-text 
        placeholder="Nome" 
        [value]="selectedItem?.name"
        (valueChanged)="updateName($event)">
      </gforge-input-text>
      
      <gforge-checkbox 
        label="Ativo" 
        [checked]="selectedItem?.active"
        (checkedChange)="updateActive($event)">
      </gforge-checkbox>
      
    </gforge-modal>
  `
})
export class DashboardComponent {
  // Implementação...
}
```

### Interface Cyberpunk

```typescript
@Component({
  template: `
    <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); min-height: 100vh; padding: 20px;">
      
      <!-- Header Neon -->
      <gforge-glass-card variant="neon" [glowBorder]="true">
        <h1>SYSTEM CONTROL PANEL</h1>
        <div style="display: flex; gap: 15px; margin-top: 20px;">
          <gforge-neon-button label="INITIALIZE" glowStyle="wave" neonColor="#00ff88"></gforge-neon-button>
          <gforge-neon-button label="SCAN" glowStyle="flicker" neonColor="#00ccff"></gforge-neon-button>
          <gforge-neon-button label="EXECUTE" glowStyle="pulse" neonColor="#ff0080"></gforge-neon-button>
        </div>
      </gforge-glass-card>

      <!-- Data Grid Neon -->
      <gforge-data-grid
        [data]="systemData"
        [columns]="systemColumns"
        theme="neon"
        style="margin-top: 20px;">
      </gforge-data-grid>

      <!-- Charts Neon -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <gforge-chart type="radar" [data]="performanceData" theme="neon"></gforge-chart>
        <gforge-chart type="line" [data]="systemMetrics" theme="neon"></gforge-chart>
      </div>

    </div>
  `
})
export class CyberpunkDashboard {
  // Implementação...
}
```

## 🔧 Configuração Avançada

### Customização de Cores

```scss
// No seu arquivo de estilos globais
:root {
  --gforge-primary: #4ecdc4;
  --gforge-secondary: #1a535c;
  --gforge-danger: #ff6b6b;
  --gforge-success: #28a745;
}
```

### Sobrescrevendo Estilos

```scss
// Customizar componentes específicos
.gforge-button--custom {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
}
```

## 📱 Responsividade

Todos os componentes são totalmente responsivos:

- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints**: Adaptação automática para tablet e desktop
- **Touch Friendly**: Interações otimizadas para touch
- **Flexível**: Layouts que se adaptam ao conteúdo

## ⚡ Performance

- **Tree Shaking**: Importe apenas os componentes necessários
- **Lazy Loading**: Componentes carregados sob demanda
- **Otimizações**: Renderização otimizada com OnPush
- **Animations**: Animações com GPU acceleration

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Storybook para desenvolvimento
npm run storybook
```

## 📖 Storybook

Explore todos os componentes no Storybook:

```bash
npm run storybook
```

Acesse: `http://localhost:6006`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🚀 Roadmap

### v2.0.0 (Em desenvolvimento)
- [ ] Componente Timeline
- [ ] Kanban Board
- [ ] Rich Text Editor
- [ ] Date Picker avançado
- [ ] Color Picker
- [ ] File Upload com preview
- [ ] Notification Center
- [ ] Tree View
- [ ] Gallery/Carousel
- [ ] Statistics Cards

### v3.0.0 (Planejado)
- [ ] Drag & Drop API
- [ ] Virtual Scrolling
- [ ] Advanced Animations
- [ ] Theme Builder
- [ ] Component Generator CLI
- [ ] Angular Schematics

## 💡 Exemplos e Demos

- [Dashboard Demo](https://g-forge-demo.vercel.app/dashboard)
- [Cyberpunk Interface](https://g-forge-demo.vercel.app/cyberpunk)
- [E-commerce](https://g-forge-demo.vercel.app/ecommerce)
- [Admin Panel](https://g-forge-demo.vercel.app/admin)

## 📞 Suporte

- 📧 Email: support@g-forge.dev
- 💬 Discord: [G-Forge Community](https://discord.gg/g-forge)
- 📖 Docs: [g-forge.dev/docs](https://g-forge.dev/docs)
- 🐛 Issues: [GitHub Issues](https://github.com/g-forge/issues)

---

**Desenvolvido com ❤️ para criar interfaces únicas e impressionantes!**

*G-Forge - Forge Your Interface* 🔥