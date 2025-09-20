import { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'complete-demo',
  template: `
    <div class="demo-container">
      
      <!-- Header com Glass Card -->
      <gforge-glass-card variant="light" [animated]="true" class="header-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0 0 8px 0; font-size: 28px;">G-Forge Dashboard</h1>
            <p style="margin: 0; opacity: 0.8;">Biblioteca completa de componentes únicos</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <gforge-neon-button 
              label="SYNC" 
              neonColor="#00ff88" 
              size="small"
              glowStyle="pulse">
            </gforge-neon-button>
            <gforge-neon-button 
              label="DEPLOY" 
              neonColor="#00ccff" 
              size="small"
              glowStyle="wave">
            </gforge-neon-button>
          </div>
        </div>
      </gforge-glass-card>

      <!-- Stats Section -->
      <div class="stats-grid">
        <gforge-card variant="elevated" size="small">
          <div class="stat-card">
            <gforge-badge [label]="activeUsers" variant="success" [pulse]="true" shape="pill"></gforge-badge>
            <div class="stat-icon">👥</div>
            <div class="stat-value">{{activeUsers}}</div>
            <div class="stat-label">Usuários Online</div>
          </div>
        </gforge-card>

        <gforge-card variant="elevated" size="small">
          <div class="stat-card">
            <gforge-badge label="🔥" variant="danger" [glow]="true"></gforge-badge>
            <div class="stat-icon">📊</div>
            <div class="stat-value">{{totalSales}}</div>
            <div class="stat-label">Vendas Hoje</div>
          </div>
        </gforge-card>

        <gforge-card variant="elevated" size="small">
          <div class="stat-card">
            <gforge-badge label="NEW" variant="info" size="small"></gforge-badge>
            <div class="stat-icon">💰</div>
            <div class="stat-value">{{revenue}}</div>
            <div class="stat-label">Receita</div>
          </div>
        </gforge-card>

        <gforge-card variant="elevated" size="small">
          <div class="stat-card">
            <gforge-badge [label]="systemStatus" variant="success" icon="✅"></gforge-badge>
            <div class="stat-icon">⚡</div>
            <div class="stat-value">98.5%</div>
            <div class="stat-label">Uptime</div>
          </div>
        </gforge-card>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        
        <!-- Left Column - Charts -->
        <div class="left-column">
          <gforge-card title="Analytics Overview" subtitle="Últimos 30 dias" variant="elevated">
            <gforge-chart
              type="line"
              [data]="chartData"
              theme="default"
              [width]="500"
              [height]="250"
              [config]="{
                showLegend: true,
                showGrid: true,
                animation: { enabled: true, duration: 1000 }
              }">
            </gforge-chart>
          </gforge-card>

          <!-- Data Grid -->
          <gforge-card title="Últimas Transações" variant="elevated">
            <gforge-data-grid
              [data]="tableData"
              [columns]="tableColumns"
              [config]="gridConfig"
              theme="default">
            </gforge-data-grid>
          </gforge-card>
        </div>

        <!-- Right Column - Controls -->
        <div class="right-column">
          
          <!-- Form Section -->
          <gforge-glass-card title="Configurações" variant="colorful" customColor="#667eea">
            <div class="form-section">
              <gforge-input-text
                placeholder="Nome do projeto"
                [value]="projectName"
                (valueChanged)="projectName = $event">
              </gforge-input-text>

              <gforge-dropdown
                [options]="projectTypes"
                label="Tipo de projeto"
                (selected)="onProjectTypeSelect($event)">
              </gforge-dropdown>

              <div class="checkbox-group">
                <gforge-checkbox
                  label="Notificações por email"
                  [checked]="emailNotifications"
                  (checkedChange)="emailNotifications = $event">
                </gforge-checkbox>

                <gforge-checkbox
                  label="Backup automático"
                  [checked]="autoBackup"
                  (checkedChange)="autoBackup = $event">
                </gforge-checkbox>
              </div>

              <gforge-radio
                [options]="priorityOptions"
                [value]="selectedPriority"
                name="priority"
                direction="horizontal"
                (valueChange)="selectedPriority = $event">
              </gforge-radio>
            </div>

            <div slot="actions" style="display: flex; gap: 8px; justify-content: flex-end;">
              <gforge-button label="Cancelar" variant="secondary" size="small"></gforge-button>
              <gforge-button label="Salvar" variant="primary" size="small"></gforge-button>
            </div>
          </gforge-glass-card>

          <!-- System Status -->
          <gforge-card title="Status do Sistema" variant="outlined">
            <div class="status-list">
              <div class="status-item">
                <span>API Server</span>
                <gforge-badge label="Online" variant="success" [glow]="true"></gforge-badge>
              </div>
              <div class="status-item">
                <span>Database</span>
                <gforge-badge label="Connected" variant="success" [glow]="true"></gforge-badge>
              </div>
              <div class="status-item">
                <span>Cache</span>
                <gforge-badge label="Warning" variant="warning" [pulse]="true"></gforge-badge>
              </div>
              <div class="status-item">
                <span>CDN</span>
                <gforge-badge label="Optimized" variant="info"></gforge-badge>
              </div>
            </div>
          </gforge-card>

          <!-- Loading States -->
          <gforge-card title="Operações em Andamento" variant="basic">
            <div class="loading-section">
              <div class="loading-item">
                <span>Sincronizando dados</span>
                <gforge-loading type="dots" size="small" color="#4ecdc4"></gforge-loading>
              </div>
              <div class="loading-item">
                <span>Processando relatório</span>
                <gforge-loading type="bars" size="small" color="#ff6b6b"></gforge-loading>
              </div>
              <div class="loading-item">
                <span>Backup em progresso</span>
                <gforge-loading type="spinner" size="small" color="#28a745"></gforge-loading>
              </div>
            </div>
          </gforge-card>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="footer-actions">
        <gforge-neon-button 
          label="INITIALIZE SYSTEM" 
          neonColor="#00ff88" 
          size="large"
          glowStyle="wave"
          [scanLine]="true">
        </gforge-neon-button>
        
        <gforge-button 
          label="Gerar Relatório" 
          variant="primary" 
          size="medium">
        </gforge-button>
        
        <gforge-button 
          label="Configurações Avançadas" 
          variant="secondary" 
          size="medium">
        </gforge-button>
      </div>

      <!-- Modal de exemplo -->
      <gforge-modal
        [isOpen]="showModal"
        title="Confirmação de Ação"
        size="medium"
        [showActionButtons]="true"
        confirmButtonText="Confirmar"
        cancelButtonText="Cancelar"
        (closed)="showModal = false"
        (confirmed)="onConfirm()"
        (cancelled)="showModal = false">
        
        <p>Tem certeza que deseja executar esta operação?</p>
        <p>Esta ação não pode ser desfeita.</p>
        
        <div style="margin: 20px 0;">
          <gforge-checkbox
            label="Não mostrar este aviso novamente"
            [checked]="dontShowAgain"
            (checkedChange)="dontShowAgain = $event">
          </gforge-checkbox>
        </div>
      </gforge-modal>

    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .header-card {
      margin-bottom: 20px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }

    .stat-card {
      text-align: center;
      position: relative;
    }

    .stat-card gforge-badge {
      position: absolute;
      top: -8px;
      right: -8px;
    }

    .stat-icon {
      font-size: 24px;
      margin: 10px 0;
    }

    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: #4ecdc4;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .main-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .left-column {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .right-column {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .loading-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .loading-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }

    .footer-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
      padding: 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .main-content {
        grid-template-columns: 1fr;
      }

      .footer-actions {
        flex-direction: column;
      }
    }
  `]
})
class CompleteDemoComponent {
  activeUsers = 127;
  totalSales = 1234;
  revenue = 'R$ 89K';
  systemStatus = 'OK';
  
  projectName = 'Meu Projeto';
  emailNotifications = true;
  autoBackup = false;
  selectedPriority = 'medium';
  
  showModal = false;
  dontShowAgain = false;

  projectTypes = [
    { label: 'Web Application', value: 'web' },
    { label: 'Mobile App', value: 'mobile' },
    { label: 'Desktop Software', value: 'desktop' },
    { label: 'API Service', value: 'api' }
  ];

  priorityOptions = [
    { label: 'Baixa', value: 'low' },
    { label: 'Média', value: 'medium' },
    { label: 'Alta', value: 'high' }
  ];

  chartData = [
    {
      name: 'Vendas',
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
      name: 'Usuários',
      data: [
        { label: 'Jan', value: 80 },
        { label: 'Fev', value: 90 },
        { label: 'Mar', value: 110 },
        { label: 'Abr', value: 95 },
        { label: 'Mai', value: 130 },
        { label: 'Jun', value: 145 }
      ],
      color: '#ff6b6b'
    }
  ];

  tableData = [
    { id: 1, user: 'João Silva', amount: 'R$ 150,00', status: 'Aprovado', date: '2024-01-15' },
    { id: 2, user: 'Maria Santos', amount: 'R$ 320,00', status: 'Pendente', date: '2024-01-14' },
    { id: 3, user: 'Pedro Costa', amount: 'R$ 89,90', status: 'Aprovado', date: '2024-01-14' },
    { id: 4, user: 'Ana Oliveira', amount: 'R$ 275,50', status: 'Rejeitado', date: '2024-01-13' }
  ];

  tableColumns = [
    { key: 'id', title: 'ID', sortable: true, width: '60px' },
    { key: 'user', title: 'Usuário', sortable: true, filterable: true },
    { key: 'amount', title: 'Valor', sortable: true },
    { key: 'status', title: 'Status', sortable: true },
    { key: 'date', title: 'Data', sortable: true, type: 'date' }
  ];

  gridConfig = {
    pagination: { enabled: true, pageSize: 3, pageSizeOptions: [3, 5, 10] },
    sorting: { enabled: true, multiSort: false },
    filtering: { enabled: true, globalSearch: true },
    selection: { enabled: false, multiple: false }
  };

  onProjectTypeSelect(option: any) {
    console.log('Tipo selecionado:', option);
  }

  onConfirm() {
    this.showModal = false;
    console.log('Ação confirmada!');
  }
}

export default {
  title: 'G-Forge/Complete Demo',
  component: CompleteDemoComponent,
  tags: ['autodocs'],
} as Meta<CompleteDemoComponent>;

type Story = StoryObj<CompleteDemoComponent>;

export const FullDashboard: Story = {
  render: () => ({
    component: CompleteDemoComponent,
    template: '<complete-demo></complete-demo>',
  }),
};

export const CyberpunkInterface: Story = {
  render: () => ({
    template: `
      <div style="
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        min-height: 100vh;
        padding: 20px;
      ">
        
        <!-- Header -->
        <gforge-glass-card variant="neon" [glowBorder]="true" style="margin-bottom: 20px;">
          <div style="text-align: center;">
            <h1 style="margin: 0 0 10px 0; font-size: 32px; text-transform: uppercase; letter-spacing: 3px;">
              CYBER CONTROL
            </h1>
            <p style="margin: 0; opacity: 0.8;">NEURAL INTERFACE v2.1.0</p>
          </div>
        </gforge-glass-card>

        <!-- System Status -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
          
          <gforge-glass-card variant="neon" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">🔋</div>
              <div style="font-size: 20px; font-weight: bold;">98%</div>
              <div style="font-size: 12px; opacity: 0.8;">POWER</div>
              <gforge-badge label="OPTIMAL" variant="success" [glow]="true" size="small" style="margin-top: 8px;"></gforge-badge>
            </div>
          </gforge-glass-card>

          <gforge-glass-card variant="neon" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">🌐</div>
              <div style="font-size: 20px; font-weight: bold;">ONLINE</div>
              <div style="font-size: 12px; opacity: 0.8;">NETWORK</div>
              <gforge-badge label="CONNECTED" variant="primary" [pulse]="true" size="small" style="margin-top: 8px;"></gforge-badge>
            </div>
          </gforge-glass-card>

          <gforge-glass-card variant="neon" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">🛡️</div>
              <div style="font-size: 20px; font-weight: bold;">SECURE</div>
              <div style="font-size: 12px; opacity: 0.8;">FIREWALL</div>
              <gforge-badge label="ACTIVE" variant="info" [glow]="true" size="small" style="margin-top: 8px;"></gforge-badge>
            </div>
          </gforge-glass-card>

          <gforge-glass-card variant="neon" size="small">
            <div style="text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">⚡</div>
              <div style="font-size: 20px; font-weight: bold;">2.4GHz</div>
              <div style="font-size: 12px; opacity: 0.8;">CPU FREQ</div>
              <gforge-badge label="STABLE" variant="success" size="small" style="margin-top: 8px;"></gforge-badge>
            </div>
          </gforge-glass-card>

        </div>

        <!-- Main Interface -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          
          <!-- Left Panel -->
          <gforge-glass-card variant="neon" title="SYSTEM DIAGNOSTICS">
            <div style="margin-bottom: 20px;">
              <gforge-chart
                type="radar"
                [data]="[{
                  name: 'Performance',
                  data: [
                    { label: 'CPU', value: 85 },
                    { label: 'RAM', value: 70 },
                    { label: 'DISK', value: 45 },
                    { label: 'NET', value: 90 },
                    { label: 'GPU', value: 95 }
                  ],
                  color: '#00ff88'
                }]"
                theme="neon"
                [width]="300"
                [height]="200">
              </gforge-chart>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>CPU USAGE</span>
                <gforge-loading type="bars" size="small" color="#00ff88"></gforge-loading>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>MEMORY SCAN</span>
                <gforge-loading type="dots" size="small" color="#00ccff"></gforge-loading>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>NEURAL LINK</span>
                <gforge-loading type="neon" size="small" color="#ff0080"></gforge-loading>
              </div>
            </div>
          </gforge-glass-card>

          <!-- Right Panel -->
          <gforge-glass-card variant="neon" title="MISSION CONTROL">
            <div style="display: flex; flex-direction: column; gap: 15px;">
              
              <div>
                <label style="display: block; margin-bottom: 8px; font-size: 12px; opacity: 0.8;">TARGET COORDINATES</label>
                <gforge-input-text
                  placeholder="Enter coordinates..."
                  value="LAT: 40.7128, LON: -74.0060">
                </gforge-input-text>
              </div>

              <div>
                <label style="display: block; margin-bottom: 8px; font-size: 12px; opacity: 0.8;">MISSION TYPE</label>
                <gforge-dropdown
                  [options]="[
                    { label: 'RECONNAISSANCE', value: 'recon' },
                    { label: 'INFILTRATION', value: 'infiltrate' },
                    { label: 'EXTRACTION', value: 'extract' },
                    { label: 'ELIMINATION', value: 'eliminate' }
                  ]"
                  label="SELECT MISSION">
                </gforge-dropdown>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                <gforge-checkbox
                  label="STEALTH MODE"
                  [checked]="true"
                  variant="primary">
                </gforge-checkbox>
                <gforge-checkbox
                  label="SILENT RUNNING"
                  [checked]="false"
                  variant="primary">
                </gforge-checkbox>
                <gforge-checkbox
                  label="AUTO-PILOT"
                  [checked]="true"
                  variant="primary">
                </gforge-checkbox>
              </div>

            </div>

            <div slot="actions" style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
              <gforge-neon-button 
                label="ABORT" 
                neonColor="#ff3333" 
                size="small"
                glowStyle="flicker">
              </gforge-neon-button>
              <gforge-neon-button 
                label="EXECUTE" 
                neonColor="#00ff88" 
                size="small"
                glowStyle="wave">
              </gforge-neon-button>
            </div>
          </gforge-glass-card>

        </div>

        <!-- Command Center -->
        <div style="margin-top: 20px; text-align: center;">
          <gforge-neon-button 
            label="INITIALIZE NEURAL LINK" 
            neonColor="#00ff88" 
            size="large"
            glowStyle="pulse"
            [scanLine]="true">
          </gforge-neon-button>
        </div>

      </div>
    `,
  }),
};