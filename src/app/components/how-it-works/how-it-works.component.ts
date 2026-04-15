import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <section id="how-it-works" class="relative py-32 overflow-hidden" style="background: linear-gradient(180deg, #030712 0%, #0a0e1a 50%, #030712 100%);">

      <!-- Background grid -->
      <div class="absolute inset-0 bg-grid opacity-30"></div>
      <div class="orb orb-violet w-[600px] h-[600px] -bottom-32 left-1/2 -translate-x-1/2 opacity-15"></div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-20">
          <span class="section-tag">Come Funziona</span>
          <h2 class="section-title mb-4">
            Operativo in<br>
            <span class="gradient-text">3 semplici passi</span>
          </h2>
          <p class="section-subtitle mx-auto text-center">
            Nessuna configurazione complessa. Nessun onboarding infinito. Solo risultati.
          </p>
        </div>

        <!-- Steps -->
        <div class="relative">

          <!-- Connecting line (desktop) -->
          <div class="hidden lg:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            <div *ngFor="let step of steps; let i = index" class="relative flex flex-col items-center lg:items-start text-center lg:text-left group">

              <!-- Step number with glow -->
              <div class="relative mb-6">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white relative z-10
                            transition-all duration-300 group-hover:scale-110"
                     [style.background]="'linear-gradient(135deg, ' + step.color + ', ' + step.colorEnd + ')'">
                  {{ step.number }}
                  <!-- Glow -->
                  <div class="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                       [style.background]="'linear-gradient(135deg, ' + step.color + ', ' + step.colorEnd + ')'"></div>
                </div>
              </div>

              <!-- Icon -->
              <div class="w-16 h-16 mb-6 flex items-center justify-center
                          text-indigo-400/40 transition-colors duration-300 group-hover:text-indigo-400/70">
                <span class="flex items-center justify-center w-12 h-12"
                      [innerHTML]="step.icon | safeHtml">
                </span>
              </div>

              <h3 class="text-white font-bold text-xl mb-3 group-hover:text-indigo-300 transition-colors">
                {{ step.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
                {{ step.description }}
              </p>

              <!-- Feature list -->
              <ul class="mt-4 space-y-1.5">
                <li *ngFor="let feature of step.features" class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class HowItWorksComponent {
  steps = [
    {
      number: '01',
      color: '#6366f1',
      colorEnd: '#8b5cf6',
      title: 'Crea il tuo spazio',
      description: 'Registrati e configura il tuo workspace in meno di due minuti. Scegli tra template predefiniti o parti da zero.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
      features: ['Template pronti all\'uso', 'Importa da altri tool', 'Setup guidato'],
    },
    {
      number: '02',
      color: '#8b5cf6',
      colorEnd: '#a78bfa',
      title: 'Invita il tuo team',
      description: 'Aggiungi i colleghi con un semplice link. Assegna ruoli e permessi granulari per mantenere tutto organizzato.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>`,
      features: ['Invito via link o email', 'Ruoli personalizzabili', 'Onboarding automatico'],
    },
    {
      number: '03',
      color: '#a78bfa',
      colorEnd: '#c4b5fd',
      title: 'Lavora & Cresci',
      description: 'Il tuo team è operativo. Monitora i progressi, celebra i traguardi e ottimizza continuamente con i dati di Orbit.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`,
      features: ['Dashboard in real-time', 'Report settimanali', 'AI insights'],
    },
  ];

}
