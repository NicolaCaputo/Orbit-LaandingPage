import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.scrolled]="isScrolled()"
      [class.bg-gray-950]="isScrolled()"
      [class.border-b]="isScrolled()"
      [class.border-slate-800]="isScrolled()"
    >
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Logo -->
          <a href="#hero" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" stroke-width="2"/>
                <circle cx="12" cy="12" r="9" stroke-width="1.5" stroke-dasharray="4 2"/>
              </svg>
            </div>
            <span class="text-white font-bold text-lg tracking-tight">Orbit</span>
          </a>

          <!-- Desktop nav -->
          <div class="hidden md:flex items-center gap-1">
            <a *ngFor="let link of navLinks" [href]="link.href"
               class="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium">
              {{ link.label }}
            </a>
          </div>

          <!-- Desktop CTA -->
          <div class="hidden md:flex items-center gap-3">
            <a href="#pricing" class="text-sm text-slate-400 hover:text-white transition-colors font-medium px-3 py-2">
              Accedi
            </a>
            <a href="#pricing" class="btn-primary text-sm py-2 px-5">
              Inizia Gratis
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            (click)="toggleMobile()"
            aria-label="Menu"
          >
            <svg *ngIf="!isMobileOpen()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg *ngIf="isMobileOpen()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        *ngIf="isMobileOpen()"
        class="md:hidden border-t border-slate-800 bg-gray-950/98 backdrop-blur-xl"
      >
        <div class="px-6 py-4 space-y-1">
          <a *ngFor="let link of navLinks" [href]="link.href"
             (click)="closeMobile()"
             class="block px-4 py-3 text-sm text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-all font-medium">
            {{ link.label }}
          </a>
          <div class="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <a href="#pricing" class="btn-secondary justify-center text-sm">Accedi</a>
            <a href="#pricing" class="btn-primary justify-center text-sm">Inizia Gratis</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      backdrop-filter: blur(0px);
      transition: backdrop-filter 0.3s, background-color 0.3s, border-color 0.3s;
    }
    nav.scrolled {
      backdrop-filter: blur(20px);
      background-color: rgba(3, 7, 18, 0.85) !important;
    }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);
  isMobileOpen = signal(false);

  navLinks = [
    { label: 'Funzionalità', href: '#features' },
    { label: 'Come Funziona', href: '#how-it-works' },
    { label: 'Testimonianze', href: '#testimonials' },
    { label: 'Prezzi', href: '#pricing' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }

  closeMobile() {
    this.isMobileOpen.set(false);
  }
}
