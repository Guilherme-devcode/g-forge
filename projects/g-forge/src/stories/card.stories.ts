import { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from '../lib/components/card/card.component';

export default {
  title: 'G-Forge/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'elevated', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} as Meta<CardComponent>;

type Story = StoryObj<CardComponent>;

export const Basic: Story = {
  args: {
    title: 'Card Básico',
    subtitle: 'Subtítulo do card',
    variant: 'basic',
    size: 'medium',
    clickable: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [size]="size"
        [clickable]="clickable"
        [disabled]="disabled">
        
        <p>Este é o conteúdo do card básico. Você pode adicionar qualquer conteúdo aqui.</p>
        
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        
      </gforge-card>
    `,
  }),
};

export const Elevated: Story = {
  args: {
    title: 'Card Elevado',
    subtitle: 'Com sombra elegante',
    variant: 'elevated',
    size: 'medium',
    clickable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [size]="size"
        [clickable]="clickable">
        
        <p>Card com efeito de elevação e sombra. Clique para ver o efeito hover.</p>
        
        <div style="margin: 15px 0;">
          <strong>Características:</strong>
          <ul style="margin-top: 8px;">
            <li>Sombra suave</li>
            <li>Efeito hover interativo</li>
            <li>Design moderno</li>
          </ul>
        </div>
        
      </gforge-card>
    `,
  }),
};

export const Outlined: Story = {
  args: {
    title: 'Card Outlined',
    subtitle: 'Com borda destacada',
    variant: 'outlined',
    size: 'medium',
    clickable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <gforge-card 
        [title]="title"
        [subtitle]="subtitle"
        [variant]="variant"
        [size]="size"
        [clickable]="clickable">
        
        <p>Card com borda destacada, ideal para criar contraste visual.</p>
        
        <div style="padding: 15px; background: rgba(78, 205, 196, 0.1); border-radius: 8px; margin: 15px 0;">
          <strong>💡 Dica:</strong> Use este estilo quando quiser dar destaque sem sombras.
        </div>
        
      </gforge-card>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        
        <gforge-card title="Card Small" subtitle="Tamanho pequeno" variant="elevated" size="small">
          <p>Conteúdo compacto para o card pequeno.</p>
        </gforge-card>
        
        <gforge-card title="Card Medium" subtitle="Tamanho médio" variant="elevated" size="medium">
          <p>Conteúdo padrão para o card médio com mais espaço para informações.</p>
        </gforge-card>
        
        <gforge-card title="Card Large" subtitle="Tamanho grande" variant="elevated" size="large">
          <p>Conteúdo expandido para o card grande, com ainda mais espaço para informações detalhadas e elementos adicionais.</p>
        </gforge-card>
        
      </div>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        
        <gforge-card title="Produto Premium" subtitle="R$ 299,90" variant="elevated" [clickable]="true">
          <p>Produto de alta qualidade com recursos avançados e suporte premium.</p>
          
          <div style="margin: 15px 0;">
            <strong>Recursos inclusos:</strong>
            <ul style="margin-top: 8px;">
              <li>Suporte 24/7</li>
              <li>Updates gratuitos</li>
              <li>Garantia estendida</li>
            </ul>
          </div>
          
          <div slot="actions" style="display: flex; gap: 8px;">
            <button style="
              padding: 8px 16px;
              background: transparent;
              border: 1px solid #ccc;
              border-radius: 4px;
              cursor: pointer;
            ">Ver Detalhes</button>
            <button style="
              padding: 8px 16px;
              background: #4ecdc4;
              border: none;
              border-radius: 4px;
              color: white;
              cursor: pointer;
            ">Comprar</button>
          </div>
        </gforge-card>
        
        <gforge-card title="Configurações" subtitle="Personalize sua experiência" variant="outlined">
          <p>Ajuste as configurações do sistema de acordo com suas preferências.</p>
          
          <div style="margin: 15px 0;">
            <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <input type="checkbox" checked> Notificações por email
            </label>
            <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <input type="checkbox"> Modo escuro
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" checked> Auto-save
            </label>
          </div>
          
          <div slot="actions" style="display: flex; gap: 8px;">
            <button style="
              padding: 8px 16px;
              background: transparent;
              border: 1px solid #ccc;
              border-radius: 4px;
              cursor: pointer;
            ">Cancelar</button>
            <button style="
              padding: 8px 16px;
              background: #28a745;
              border: none;
              border-radius: 4px;
              color: white;
              cursor: pointer;
            ">Salvar</button>
          </div>
        </gforge-card>
        
      </div>
    `,
  }),
};

export const Dashboard: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px; background: #f5f5f5; min-height: 100vh;">
        <h2 style="margin: 0 0 20px 0;">Dashboard</h2>
        
        <!-- Stats Cards -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
          
          <gforge-card variant="elevated" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
              <div style="font-size: 20px; font-weight: bold; color: #4ecdc4;">1,234</div>
              <div style="font-size: 12px; color: #666;">Total Vendas</div>
            </div>
          </gforge-card>
          
          <gforge-card variant="elevated" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 8px;">👥</div>
              <div style="font-size: 20px; font-weight: bold; color: #ff6b6b;">567</div>
              <div style="font-size: 12px; color: #666;">Usuários Ativos</div>
            </div>
          </gforge-card>
          
          <gforge-card variant="elevated" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 8px;">💰</div>
              <div style="font-size: 20px; font-weight: bold; color: #28a745;">R$ 89K</div>
              <div style="font-size: 12px; color: #666;">Receita</div>
            </div>
          </gforge-card>
          
          <gforge-card variant="elevated" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 8px;">📈</div>
              <div style="font-size: 20px; font-weight: bold; color: #ffc107;">+12%</div>
              <div style="font-size: 12px; color: #666;">Crescimento</div>
            </div>
          </gforge-card>
          
        </div>
        
        <!-- Main Content -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
          
          <gforge-card title="Relatório de Vendas" subtitle="Últimos 30 dias" variant="elevated">
            <div style="height: 200px; background: linear-gradient(45deg, #4ecdc4, #44a08d); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">
              📊 Gráfico de Vendas
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
              <div>
                <strong>Melhor dia:</strong> Segunda-feira<br>
                <strong>Produto top:</strong> Premium Plan
              </div>
              <div style="text-align: right;">
                <strong>Meta:</strong> 85% atingida<br>
                <strong>Projeção:</strong> +15% próximo mês
              </div>
            </div>
          </gforge-card>
          
          <gforge-card title="Atividade Recente" variant="outlined">
            <div style="space-y: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                <div style="width: 8px; height: 8px; background: #28a745; border-radius: 50%;"></div>
                <div style="flex: 1; font-size: 14px;">Nova venda realizada</div>
                <div style="font-size: 12px; color: #666;">2min</div>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                <div style="width: 8px; height: 8px; background: #ffc107; border-radius: 50%;"></div>
                <div style="flex: 1; font-size: 14px;">Usuário cadastrado</div>
                <div style="font-size: 12px; color: #666;">5min</div>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                <div style="width: 8px; height: 8px; background: #4ecdc4; border-radius: 50%;"></div>
                <div style="flex: 1; font-size: 14px;">Relatório gerado</div>
                <div style="font-size: 12px; color: #666;">10min</div>
              </div>
              
              <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                <div style="width: 8px; height: 8px; background: #ff6b6b; border-radius: 50%;"></div>
                <div style="flex: 1; font-size: 14px;">Erro no sistema</div>
                <div style="font-size: 12px; color: #666;">15min</div>
              </div>
            </div>
            
            <div slot="actions" style="text-align: center; margin-top: 15px;">
              <button style="
                padding: 6px 12px;
                background: transparent;
                border: 1px solid #4ecdc4;
                border-radius: 4px;
                color: #4ecdc4;
                cursor: pointer;
                font-size: 12px;
              ">Ver Todas</button>
            </div>
          </gforge-card>
          
        </div>
      </div>
    `,
  }),
};

export const ProductCards: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px;">
        
        <gforge-card variant="elevated" [clickable]="true">
          <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 30px;">📱</div>
            <h3 style="margin: 0 0 8px 0;">Mobile App</h3>
            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">Aplicativo mobile completo com todas as funcionalidades</p>
            
            <div style="display: flex; gap: 5px; justify-content: center; margin-bottom: 15px;">
              <span style="color: gold;">⭐⭐⭐⭐⭐</span>
              <span style="font-size: 12px; color: #666;">(4.8)</span>
            </div>
            
            <div style="font-size: 20px; font-weight: bold; color: #4ecdc4;">R$ 99</div>
          </div>
        </gforge-card>
        
        <gforge-card variant="elevated" [clickable]="true">
          <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #f093fb, #f5576c); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 30px;">💻</div>
            <h3 style="margin: 0 0 8px 0;">Web Platform</h3>
            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">Plataforma web responsiva com dashboard avançado</p>
            
            <div style="display: flex; gap: 5px; justify-content: center; margin-bottom: 15px;">
              <span style="color: gold;">⭐⭐⭐⭐⭐</span>
              <span style="font-size: 12px; color: #666;">(4.9)</span>
            </div>
            
            <div style="font-size: 20px; font-weight: bold; color: #4ecdc4;">R$ 199</div>
          </div>
        </gforge-card>
        
        <gforge-card variant="elevated" [clickable]="true">
          <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #4facfe, #00f2fe); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 30px;">☁️</div>
            <h3 style="margin: 0 0 8px 0;">Cloud Service</h3>
            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">Serviço em nuvem escalável com API completa</p>
            
            <div style="display: flex; gap: 5px; justify-content: center; margin-bottom: 15px;">
              <span style="color: gold;">⭐⭐⭐⭐⭐</span>
              <span style="font-size: 12px; color: #666;">(5.0)</span>
            </div>
            
            <div style="font-size: 20px; font-weight: bold; color: #4ecdc4;">R$ 299</div>
          </div>
        </gforge-card>
        
      </div>
    `,
  }),
};