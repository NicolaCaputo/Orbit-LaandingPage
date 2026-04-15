import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="cta" class="relative py-32 overflow-hidden bg-gray-950">

      <!-- Full-width gradient card -->
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="relative rounded-3xl overflow-hidden" style="background: linear-gradient(135deg, #1e1b4b 0%, #2d1b69 40%, #1e1b4b 100%);">

          <!-- Decorative elements -->
          <div class="absolute inset-0">
            <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
            <div class="orb orb-indigo w-96 h-96 -top-32 -left-32 opacity-30"></div>
            <div class="orb orb-violet w-80 h-80 -bottom-20 -right-20 opacity-30"></div>

            <!-- Grid overlay -->
            <div class="absolute inset-0 bg-grid opacity-20"></div>
          </div>

          <div class="relative z-10 text-center py-20 px-6 lg:py-24 lg:px-20">

            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-semibold uppercase tracking-wider mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Prova gratuita di 14 giorni
            </div>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Pronto a trasformare<br>
              il tuo team?
            </h2>

            <p class="text-indigo-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Unisciti a 10.000+ team che usano Orbit ogni giorno per lavorare meglio, più velocemente e con più soddisfazione.
            </p>

            <!-- CTA buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="#pricing" class="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base
                                         bg-white text-indigo-700 hover:bg-indigo-50 transition-all duration-200
                                         shadow-2xl shadow-black/30 hover:shadow-black/40 hover:-translate-y-0.5
                                         w-full sm:w-auto justify-center">
                Inizia Gratuitamente
                <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a href="#" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base
                                   bg-white/10 hover:bg-white/20 border border-white/20 text-white
                                   transition-all duration-200 hover:-translate-y-0.5
                                   w-full sm:w-auto justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Parla con un esperto
              </a>
            </div>

            <!-- Trust signals -->
            <div class="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
              <div *ngFor="let trust of trustItems" class="flex items-center gap-2 text-white/50 text-sm">
                <svg class="w-4 h-4 text-green-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ trust }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class CtaComponent {
  trustItems = [
    'Nessuna carta di credito',
    'Cancella quando vuoi',
    'Supporto incluso',
    'Dati sicuri in EU',
  ];
}
