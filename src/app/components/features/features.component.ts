import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

interface Feature {
  icon: string;
  title: string;
  description: string;
  accent: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <section id="features" class="relative py-32 bg-gray-950 overflow-hidden">

      <!-- Background decoration -->
      <div class="absolute inset-0 bg-dot opacity-40"></div>
      <div class="orb orb-indigo w-[500px] h-[500px] -top-32 right-0 opacity-20"></div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16">
          <span class="section-tag">Funzionalità</span>
          <h2 class="section-title mb-4">
            Tutto ciò di cui il tuo<br>
            <span class="gradient-text">team ha bisogno</span>
          </h2>
          <p class="section-subtitle mx-auto text-center">
            Strumenti potenti pensati per team moderni. Dall'organizzazione al completamento, Orbit ti copre.
          </p>
        </div>

        <!-- Feature grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            *ngFor="let feature of features; let i = index"
            class="card group cursor-default"
            [class.lg:col-span-2]="i === 0"
          >
            <!-- Icon -->
            <div class="flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                 [style.background]="feature.accent + '18'"
                 [style.border]="'1px solid ' + feature.accent + '35'">
              <span class="flex items-center justify-center w-5 h-5"
                    [style.color]="feature.accent"
                    [innerHTML]="feature.icon | safeHtml">
              </span>
            </div>

            <h3 class="text-white font-semibold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- Hover glow line -->
            <div class="h-px mt-5 bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent
                        group-hover:via-indigo-500/40 transition-all duration-500"></div>
          </div>
        </div>

        <!-- Bottom stats -->
        <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-16">
          <div *ngFor="let stat of stats" class="text-center">
            <div class="text-3xl md:text-4xl font-extrabold gradient-text mb-1">{{ stat.value }}</div>
            <div class="text-slate-500 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      title: 'Gestione Attività Intelligente',
      description: 'Organizza, assegna e monitora le attività del team con una vista kanban intuitiva. Priorità automatiche basate su scadenze e dipendenze. Il tuo flusso di lavoro, semplificato.',
      accent: '#6366f1',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="1.5"/><path d="M17.5 14v6M14.5 17h6" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    },
    {
      title: 'Collaborazione Real-time',
      description: 'Lavora insieme al tuo team in tempo reale. Commenti, menzioni e aggiornamenti istantanei mantengono tutti allineati.',
      accent: '#8b5cf6',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    },
    {
      title: 'Analytics Avanzate',
      description: 'Dashboard in tempo reale con metriche di produttività, burndown chart e insights predittivi per prendere decisioni basate sui dati.',
      accent: '#06b6d4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    },
    {
      title: 'Automazioni AI',
      description: 'Delega il lavoro ripetitivo. L\'AI di Orbit suggerisce assegnazioni, rileva colli di bottiglia e automatizza i workflow ricorrenti.',
      accent: '#f59e0b',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    },
    {
      title: '100+ Integrazioni',
      description: 'Connetti i tuoi strumenti preferiti: Slack, GitHub, Figma, Google Drive, Jira e molto altro. Orbit si adatta al tuo stack esistente.',
      accent: '#10b981',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>`,
    },
    {
      title: 'Sicurezza Enterprise',
      description: 'SSO, 2FA, audit log e conformità SOC 2 Type II. I tuoi dati sono cifrati end-to-end e ospitati in data center EU.',
      accent: '#ef4444',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    },
  ];

  stats = [
    { value: '10K+',  label: 'Team attivi' },
    { value: '99.9%', label: 'Uptime garantito' },
    { value: '2 min', label: 'Setup medio' },
    { value: '4.9/5', label: 'Rating utenti' },
  ];
}
