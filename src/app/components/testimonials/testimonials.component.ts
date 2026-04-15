import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="relative py-32 bg-gray-950 overflow-hidden">

      <div class="orb orb-indigo w-[400px] h-[400px] top-0 left-0 opacity-10"></div>
      <div class="orb orb-violet w-[400px] h-[400px] bottom-0 right-0 opacity-10"></div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16">
          <span class="section-tag">Testimonianze</span>
          <h2 class="section-title mb-4">
            Amato da team in<br>
            <span class="gradient-text">tutto il mondo</span>
          </h2>
          <p class="section-subtitle mx-auto text-center">
            Scopri perché oltre 10.000 team hanno scelto Orbit per gestire la loro produttività.
          </p>
        </div>

        <!-- Featured testimonial -->
        <div class="mb-8 p-8 lg:p-10 rounded-3xl border border-slate-800/60 bg-slate-900/30 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
          <div class="orb orb-indigo w-64 h-64 -top-16 -right-16 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

          <div class="flex flex-col lg:flex-row gap-8 items-start">
            <div class="shrink-0">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                   style="background: linear-gradient(135deg, #6366f1, #8b5cf6);">
                GR
              </div>
            </div>
            <div>
              <!-- Stars -->
              <div class="flex gap-1 mb-4">
                <svg *ngFor="let s of [1,2,3,4,5]" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <blockquote class="text-xl lg:text-2xl text-white font-medium leading-relaxed mb-6">
                "Orbit ha completamente trasformato il modo in cui il nostro team lavora. Prima perdevamo ore in meeting di allineamento, oggi tutti sanno esattamente cosa fare e quando. La produttività è aumentata del <span class="gradient-text font-bold">47%</span> nel primo trimestre."
              </blockquote>
              <div>
                <div class="text-white font-semibold">Giorgio Ricci</div>
                <div class="text-slate-500 text-sm">CEO &amp; Co-founder &#64; Nexus Technologies</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonial grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            *ngFor="let t of testimonials"
            class="card group"
          >
            <!-- Stars -->
            <div class="flex gap-1 mb-4">
              <svg *ngFor="let s of starsArray(t.stars)" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>

            <blockquote class="text-slate-300 text-sm leading-relaxed mb-5 flex-1">
              "{{ t.quote }}"
            </blockquote>

            <div class="flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                   [style.background]="t.avatarBg">
                {{ t.initials }}
              </div>
              <div>
                <div class="text-white text-sm font-semibold">{{ t.name }}</div>
                <div class="text-slate-500 text-xs">{{ t.role }}</div>
              </div>
              <div class="ml-auto">
                <div class="px-2 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-400">
                  {{ t.company }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Logo bar -->
        <div class="mt-16 pt-10 border-t border-slate-800/60">
          <p class="text-center text-slate-600 text-sm mb-8">Scelto da team in aziende come</p>
          <div class="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <div *ngFor="let logo of logos"
                 class="text-slate-700 font-bold text-xl tracking-tight hover:text-slate-500 transition-colors cursor-default">
              {{ logo }}
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class TestimonialsComponent {
  testimonials = [
    {
      quote: 'Finalmente uno strumento che il team usa davvero. L\'interfaccia è così intuitiva che non abbiamo avuto bisogno di formazione. Il nostro sprint planning è diventato un piacere.',
      name: 'Laura Bianchi',
      role: 'Product Manager',
      company: 'DesignCo',
      initials: 'LB',
      stars: 5,
      avatarBg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    },
    {
      quote: 'Le automazioni AI di Orbit sono incredibili. Assegna automaticamente le task in base al carico di lavoro e ci ha fatto risparmiare almeno 5 ore a settimana di overhead.',
      name: 'Marco Ferrari',
      role: 'CTO',
      company: 'DevOps SpA',
      initials: 'MF',
      stars: 5,
      avatarBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    },
    {
      quote: 'Migrato da Asana a Orbit in un giorno. La migrazione è stata painless e i report analytics finalmente ci danno visibilità reale su dove va il tempo del team.',
      name: 'Sofia Costa',
      role: 'Operations Lead',
      company: 'ScaleUp',
      initials: 'SC',
      stars: 5,
      avatarBg: 'linear-gradient(135deg, #06b6d4, #6366f1)',
    },
    {
      quote: 'Orbit si integra perfettamente con GitHub e Slack. Il nostro workflow dev non è mai stato così fluido. I PR si collegano automaticamente alle task.',
      name: 'Luca Romano',
      role: 'Lead Developer',
      company: 'Techwave',
      initials: 'LR',
      stars: 5,
      avatarBg: 'linear-gradient(135deg, #10b981, #6366f1)',
    },
    {
      quote: 'Il supporto clienti è eccezionale — risposta entro 10 minuti. Ma la verità è che la piattaforma è così intuitiva che non ho quasi mai bisogno di aiuto.',
      name: 'Elena Marchi',
      role: 'Head of Marketing',
      company: 'Growlab',
      initials: 'EM',
      stars: 5,
      avatarBg: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    {
      quote: 'Da quando usiamo Orbit, il nostro time-to-market si è ridotto del 30%. La visibilità cross-team che offre è qualcosa che non avevo mai visto in altri tool.',
      name: 'Andrea Conti',
      role: 'VP Engineering',
      company: 'CloudBase',
      initials: 'AC',
      stars: 5,
      avatarBg: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    },
  ];

  logos = ['Stripe', 'Figma', 'Notion', 'Linear', 'Vercel', 'Shopify'];

  starsArray(n: number): number[] {
    return Array(n).fill(0);
  }
}
