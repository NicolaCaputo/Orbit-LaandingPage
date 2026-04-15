import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pricing" class="relative py-32 overflow-hidden" style="background: linear-gradient(180deg, #030712 0%, #0a0e1a 50%, #030712 100%);">

      <div class="absolute inset-0 bg-dot opacity-20"></div>
      <div class="orb orb-indigo w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-12">
          <span class="section-tag">Prezzi</span>
          <h2 class="section-title mb-4">
            Semplice e trasparente.<br>
            <span class="gradient-text">Senza sorprese.</span>
          </h2>
          <p class="section-subtitle mx-auto text-center">
            Inizia gratis, scala quando sei pronto. Nessun costo nascosto.
          </p>
        </div>

        <!-- Toggle billing -->
        <div class="flex items-center justify-center gap-4 mb-12">
          <span class="text-sm font-medium" [class.text-white]="!isAnnual()" [class.text-slate-500]="isAnnual()">Mensile</span>
          <button
            class="relative w-12 h-6 rounded-full transition-colors duration-300"
            [class.bg-indigo-600]="isAnnual()"
            [class.bg-slate-700]="!isAnnual()"
            (click)="toggleBilling()"
          >
            <div class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300"
                 [class.left-7]="isAnnual()"
                 [class.left-1]="!isAnnual()">
            </div>
          </button>
          <span class="text-sm font-medium flex items-center gap-2" [class.text-white]="isAnnual()" [class.text-slate-500]="!isAnnual()">
            Annuale
            <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/20">
              -20%
            </span>
          </span>
        </div>

        <!-- Pricing cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div
            *ngFor="let plan of plans"
            class="rounded-2xl border p-8 transition-all duration-300 relative overflow-hidden group"
            [class.pricing-popular]="plan.popular"
            [class.border-slate-800]="!plan.popular"
            [class.bg-slate-900]="!plan.popular"
            [class.hover:border-slate-700]="!plan.popular"
            [class.hover:-translate-y-1]="!plan.popular"
          >
            <!-- Popular badge -->
            <div *ngIf="plan.popular" class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div *ngIf="plan.popular" class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500 text-white">
                Più popolare
              </span>
            </div>

            <!-- Plan header -->
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-white font-bold text-lg">{{ plan.name }}</span>
              </div>
              <p class="text-slate-500 text-sm">{{ plan.description }}</p>
            </div>

            <!-- Price -->
            <div class="mb-8">
              <div class="flex items-end gap-1" *ngIf="plan.price !== null">
                <span class="text-slate-400 text-sm mb-1.5">€</span>
                <span class="text-5xl font-extrabold text-white leading-none">
                  {{ isAnnual() ? plan.priceAnnual : plan.price }}
                </span>
                <span class="text-slate-500 text-sm mb-1.5">/mese</span>
              </div>
              <div *ngIf="plan.price === null" class="text-5xl font-extrabold text-white leading-none mb-1">
                Custom
              </div>
              <p class="text-slate-600 text-xs mt-1" *ngIf="plan.price !== null && plan.price > 0">
                {{ isAnnual() ? 'Fatturato annualmente' : 'Fatturato mensilmente' }}
              </p>
              <p class="text-slate-600 text-xs mt-1" *ngIf="plan.price === 0">
                Per sempre gratuito, nessuna carta richiesta
              </p>
              <p class="text-slate-600 text-xs mt-1" *ngIf="plan.price === null">
                Contattaci per un preventivo personalizzato
              </p>
            </div>

            <!-- CTA -->
            <a [href]="plan.cta.href"
               class="block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 mb-8"
               [ngClass]="plan.popular
                 ? 'bg-indigo-600 text-white shadow-lg'
                 : 'bg-slate-800 text-slate-300'"
               style="transition: background-color 0.2s, box-shadow 0.2s;"
               onmouseover="this.style.filter='brightness(1.1)'"
               onmouseout="this.style.filter='none'"
            >
              {{ plan.cta.label }}
            </a>

            <!-- Features -->
            <ul class="space-y-3">
              <li *ngFor="let feature of plan.features" class="flex items-start gap-3 text-sm">
                <svg class="w-4 h-4 mt-0.5 shrink-0"
                     [class.text-indigo-400]="feature.included"
                     [class.text-slate-700]="!feature.included"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path *ngIf="feature.included" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  <path *ngIf="!feature.included" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span [class.text-slate-300]="feature.included" [class.text-slate-700]="!feature.included">
                  {{ feature.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- FAQ teaser -->
        <div class="mt-16 text-center">
          <p class="text-slate-500 text-sm">
            Hai domande?
            <a href="#" class="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2 ml-1">
              Consulta le FAQ
            </a>
            o
            <a href="#cta" class="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2 ml-1">
              contattaci direttamente
            </a>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class PricingComponent {
  isAnnual = signal(true);

  plans = [
    {
      name: 'Gratis',
      description: 'Perfetto per freelance e piccoli team',
      price: 0,
      priceAnnual: 0,
      popular: false,
      cta: { label: 'Inizia Gratis', href: '#' },
      features: [
        { text: 'Fino a 5 membri',         included: true },
        { text: '3 progetti attivi',        included: true },
        { text: 'Task e sottotask',          included: true },
        { text: 'Vista Kanban & Lista',      included: true },
        { text: 'App mobile',               included: true },
        { text: 'Automazioni AI',           included: false },
        { text: 'Analytics avanzate',       included: false },
        { text: 'Integrazioni premium',     included: false },
        { text: 'Supporto prioritario',     included: false },
      ],
    },
    {
      name: 'Pro',
      description: 'Per team in crescita che vogliono di più',
      price: 19,
      priceAnnual: 15,
      popular: true,
      cta: { label: 'Inizia la prova gratuita', href: '#' },
      features: [
        { text: 'Membri illimitati',        included: true },
        { text: 'Progetti illimitati',      included: true },
        { text: 'Task e sottotask',          included: true },
        { text: 'Tutte le viste (Gantt, Timeline, Calendar)', included: true },
        { text: 'App mobile',               included: true },
        { text: 'Automazioni AI',           included: true },
        { text: 'Analytics avanzate',       included: true },
        { text: '50+ integrazioni',         included: true },
        { text: 'Supporto prioritario 24/7',included: false },
      ],
    },
    {
      name: 'Enterprise',
      description: 'Per organizzazioni con esigenze avanzate',
      price: null,
      priceAnnual: null,
      popular: false,
      cta: { label: 'Contatta le vendite', href: '#' },
      features: [
        { text: 'Tutto di Pro',             included: true },
        { text: 'SSO & SAML',               included: true },
        { text: 'Audit log avanzato',       included: true },
        { text: 'SLA garantito 99.99%',     included: true },
        { text: 'Data residency EU',        included: true },
        { text: 'AI personalizzata',        included: true },
        { text: 'Onboarding dedicato',      included: true },
        { text: 'Account manager dedicato', included: true },
        { text: 'Supporto prioritario 24/7',included: true },
      ],
    },
  ];

  toggleBilling(): void {
    this.isAnnual.set(!this.isAnnual());
  }
}
