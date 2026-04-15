import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { CtaComponent } from './components/cta/cta.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    PricingComponent,
    CtaComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-features></app-features>
      <app-how-it-works></app-how-it-works>
      <app-testimonials></app-testimonials>
      <app-pricing></app-pricing>
      <app-cta></app-cta>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {}
