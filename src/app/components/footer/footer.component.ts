import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <footer class="relative bg-gray-950 border-t border-slate-800/60 overflow-hidden">

      <div class="orb orb-indigo w-[400px] h-[400px] -top-32 left-1/2 -translate-x-1/2 opacity-5"></div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Main footer content -->
        <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          <!-- Brand column -->
          <div class="lg:col-span-2">
            <a href="#hero" class="flex items-center gap-2.5 mb-4 group">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" stroke-width="2"/>
                  <circle cx="12" cy="12" r="9" stroke-width="1.5" stroke-dasharray="4 2"/>
                </svg>
              </div>
              <span class="text-white font-bold text-lg tracking-tight">Orbit</span>
            </a>

            <p class="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              La piattaforma di produttività per team moderni. Gestisci, collabora e cresci insieme.
            </p>

            <!-- Social links -->
            <div class="flex items-center gap-3">
              <a *ngFor="let social of socials" [href]="social.href"
                 class="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500
                        hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all duration-200"
                 [attr.aria-label]="social.label">
                <span class="flex items-center justify-center w-4 h-4" [innerHTML]="social.icon | safeHtml"></span>
              </a>
            </div>
          </div>

          <!-- Link columns -->
          <div *ngFor="let col of linkColumns">
            <h4 class="text-white font-semibold text-sm mb-4">{{ col.title }}</h4>
            <ul class="space-y-3">
              <li *ngFor="let link of col.links">
                <a [href]="link.href"
                   class="text-slate-500 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5">
                  {{ link.label }}
                  <span *ngIf="link.badge"
                        class="px-1.5 py-0.5 rounded text-[10px] font-bold leading-tight text-white"
                        [class.bg-indigo-500]="link.badge === 'Nuovo'"
                        [class.bg-green-500]="link.badge === 'Beta'">
                    {{ link.badge }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="py-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-slate-600 text-xs">
            &copy; {{ year }} Orbit Technologies Srl. Tutti i diritti riservati.
          </p>

          <div class="flex items-center gap-6">
            <a *ngFor="let link of legalLinks" [href]="link.href"
               class="text-slate-600 hover:text-slate-400 text-xs transition-colors">
              {{ link.label }}
            </a>
          </div>

          <div class="flex items-center gap-1.5 text-slate-600 text-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Tutti i sistemi operativi
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`:host { display: block; }`]
})
export class FooterComponent {
  year = new Date().getFullYear();

  socials = [
    {
      label: 'Twitter/X',
      href: '#',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    },
    {
      label: 'LinkedIn',
      href: '#',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    },
    {
      label: 'GitHub',
      href: '#',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    },
  ];

  linkColumns = [
    {
      title: 'Prodotto',
      links: [
        { label: 'Funzionalità',    href: '#features' },
        { label: 'Prezzi',          href: '#pricing' },
        { label: 'Changelog',       href: '#', badge: 'Nuovo' },
        { label: 'Roadmap',         href: '#' },
        { label: 'API & Integrazioni', href: '#', badge: 'Beta' },
      ],
    },
    {
      title: 'Azienda',
      links: [
        { label: 'Chi siamo',  href: '#' },
        { label: 'Blog',       href: '#' },
        { label: 'Carriere',   href: '#' },
        { label: 'Stampa',     href: '#' },
        { label: 'Contatti',   href: '#' },
      ],
    },
    {
      title: 'Risorse',
      links: [
        { label: 'Documentazione', href: '#' },
        { label: 'Guide & Tutorial', href: '#' },
        { label: 'Webinar',         href: '#' },
        { label: 'Comunità',        href: '#' },
        { label: 'Supporto',        href: '#' },
      ],
    },
  ];

  legalLinks = [
    { label: 'Privacy',         href: '#' },
    { label: 'Termini',         href: '#' },
    { label: 'Cookie Policy',   href: '#' },
    { label: 'Accessibilità',   href: '#' },
  ];
}
