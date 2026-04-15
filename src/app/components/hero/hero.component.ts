import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ═══════════════════════════════════════════════
         HERO  –  3D canvas background + text overlay
    ═══════════════════════════════════════════════ -->
    <section id="hero" class="relative overflow-hidden bg-gray-950" style="min-height:100svh;">

      <!-- 3D canvas — full section, behind everything (z:1) -->
      <canvas #threeCanvas
              class="absolute inset-0 w-full h-full"
              style="z-index:1; display:block;"></canvas>

      <!-- Soft vignette overlays (z:2) -->
      <div class="absolute inset-0 pointer-events-none"
           style="z-index:2; background:linear-gradient(to bottom, rgba(3,7,18,.5) 0%, transparent 40%, rgba(3,7,18,.8) 100%);"></div>
      <div class="absolute inset-0 pointer-events-none"
           style="z-index:2; background:linear-gradient(to right, rgba(3,7,18,.6) 0%, transparent 50%, rgba(3,7,18,.6) 100%);"></div>

      <!-- Glowing colour blobs (z:3) -->
      <div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
           style="z-index:3; border-radius:50%; background:radial-gradient(circle, rgba(99,102,241,.22), transparent 70%); filter:blur(60px);"></div>
      <div class="absolute bottom-1/3 right-1/4 translate-x-1/2 w-80 h-80 pointer-events-none"
           style="z-index:3; border-radius:50%; background:radial-gradient(circle, rgba(139,92,246,.18), transparent 70%); filter:blur(60px);"></div>

      <!-- ─── TEXT LAYER (z:10) — absolutely centred so it always floats above canvas ─── -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
           style="z-index:10;">

        <!-- Pill badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full
                    border border-indigo-500/30 text-indigo-300 text-sm font-medium"
             style="background:rgba(99,102,241,.1);">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Novità: Automazioni AI integrate
          <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </div>

        <!-- H1 — maximum impact -->
        <h1 class="font-black text-white tracking-tighter leading-none mb-5"
            style="font-size:clamp(3.5rem, 10vw, 8rem); text-shadow: 0 2px 40px rgba(0,0,0,.6);">
          Lavora&nbsp;<span style="background:linear-gradient(135deg,#818cf8,#a78bfa,#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">insieme.</span><br>
          Cresci&nbsp;<span style="background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">più veloce.</span>
        </h1>

        <!-- H2 -->
        <h2 class="text-xl md:text-2xl font-medium text-slate-300 max-w-xl mb-10 leading-snug"
            style="text-shadow: 0 1px 20px rgba(0,0,0,.5);">
          Planning, collaborazione e analytics in un'unica piattaforma — dal primo task al lancio.
        </h2>

        <!-- CTA buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <a href="#pricing"
             class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white
                    transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
             style="background:linear-gradient(135deg,#6366f1,#8b5cf6); box-shadow:0 8px 32px rgba(99,102,241,.4);">
            Inizia Gratuitamente
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <button class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-slate-300
                         border transition-all duration-200 hover:text-white hover:-translate-y-0.5"
                  style="border-color:rgba(255,255,255,.12); background:rgba(255,255,255,.05);"
                  (click)="scrollToSection('how-it-works')">
            <svg class="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Guarda la Demo
          </button>
        </div>
      </div>

      <!-- Scroll cue — bottom-centre (z:10) -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"
           style="z-index:10; color:rgba(148,163,184,.5);">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         PRODUCT MOCKUP — just below hero, overlaps slightly
    ═══════════════════════════════════════════════ -->
    <div class="relative bg-gray-950 px-6 lg:px-8 pb-0 -mt-2" style="z-index:20;">
      <div class="max-w-5xl mx-auto">

        <!-- Glow -->
        <div class="absolute inset-x-0 top-0 h-32 pointer-events-none"
             style="background:radial-gradient(ellipse at 50% 0%, rgba(99,102,241,.15), transparent 70%);"></div>

        <!-- Browser chrome card -->
        <div class="relative rounded-2xl overflow-hidden shadow-2xl"
             style="border:1px solid rgba(99,102,241,.2); background:rgba(15,23,42,.9); backdrop-filter:blur(20px);
                    box-shadow: 0 0 0 1px rgba(99,102,241,.1), 0 40px 80px rgba(0,0,0,.6), 0 0 80px rgba(99,102,241,.06);">

          <!-- Browser bar -->
          <div class="flex items-center justify-between px-5 py-3 border-b"
               style="border-color:rgba(30,41,59,.8); background:rgba(8,12,24,.9);">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-full" style="background:#ef4444;opacity:.6;"></span>
              <span class="w-3 h-3 rounded-full" style="background:#f59e0b;opacity:.6;"></span>
              <span class="w-3 h-3 rounded-full" style="background:#10b981;opacity:.6;"></span>
            </div>
            <div class="flex items-center gap-1.5 px-4 py-1 rounded-lg text-xs font-mono"
                 style="background:rgba(30,41,59,.6); color:rgba(148,163,184,.7);">
              <svg class="w-3 h-3" style="color:#10b981;" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd"/>
              </svg>
              app.orbit.io/lancio-q2
            </div>
            <div class="flex -space-x-1.5">
              <div *ngFor="let a of mockAvatars"
                   class="w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-bold text-white"
                   style="border-color:#030712;"
                   [style.background]="a.bg">{{ a.init }}</div>
            </div>
          </div>

          <!-- Dashboard body -->
          <div class="flex">
            <!-- Sidebar -->
            <div class="hidden md:flex flex-col w-48 shrink-0 p-3 gap-0.5 border-r"
                 style="border-color:rgba(30,41,59,.6); background:rgba(8,12,20,.7);">
              <p class="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest"
                 style="color:rgba(100,116,139,.6);">Workspace</p>
              <div *ngFor="let item of sideItems"
                   class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs cursor-default transition-colors"
                   [style.background]="item.active ? '#6366f1' : 'transparent'"
                   [style.color]="item.active ? '#fff' : 'rgba(100,116,139,1)'">
                <span class="w-1.5 h-1.5 rounded-full shrink-0"
                      [style.background]="item.active ? 'rgba(255,255,255,.8)' : 'rgba(100,116,139,.5)'"></span>
                {{ item.label }}
                <span *ngIf="item.count" class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      [style.background]="item.active ? 'rgba(255,255,255,.2)' : 'rgba(30,41,59,1)'"
                      [style.color]="item.active ? '#fff' : 'rgba(148,163,184,1)'">
                  {{ item.count }}
                </span>
              </div>
            </div>

            <!-- Kanban area -->
            <div class="flex-1 p-5 overflow-hidden">
              <!-- Header row -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <span class="text-white text-sm font-semibold">Lancio Q2</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style="background:rgba(99,102,241,.15); color:#818cf8; border:1px solid rgba(99,102,241,.2);">In corso</span>
                </div>
                <div class="flex items-center gap-2 text-xs" style="color:rgba(100,116,139,1);">
                  <div class="w-28 h-1.5 rounded-full overflow-hidden" style="background:rgba(30,41,59,1);">
                    <div class="h-full rounded-full w-3/5"
                         style="background:linear-gradient(to right,#6366f1,#8b5cf6);"></div>
                  </div>
                  60%
                </div>
              </div>

              <!-- 3-column kanban -->
              <div class="grid grid-cols-3 gap-3">
                <div *ngFor="let col of kanbanCols">
                  <div class="flex items-center gap-2 mb-2 px-1">
                    <span class="w-1.5 h-1.5 rounded-full" [style.background]="col.color"></span>
                    <span class="text-xs font-semibold" style="color:rgba(148,163,184,1);">{{ col.name }}</span>
                    <span class="ml-auto text-[10px] font-bold" style="color:rgba(71,85,105,1);">{{ col.tasks.length }}</span>
                  </div>
                  <div class="space-y-2">
                    <div *ngFor="let task of col.tasks"
                         class="p-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                         style="background:rgba(15,23,42,.8); border:1px solid rgba(30,41,59,.8);">
                      <div class="flex items-start justify-between gap-1 mb-1.5">
                        <p class="text-xs font-medium leading-snug"
                           [style.color]="task.done ? 'rgba(100,116,139,1)' : '#f1f5f9'"
                           [style.textDecoration]="task.done ? 'line-through' : 'none'">
                          {{ task.title }}
                        </p>
                        <svg *ngIf="task.done" class="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor"
                             style="color:#10b981;" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-bold"
                              [style.background]="task.tagBg" [style.color]="task.tagColor">{{ task.tag }}</span>
                        <div class="ml-auto w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                             [style.background]="task.avatar">{{ task.initials }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fade to section below -->
        <div class="h-20 -mt-1 pointer-events-none"
             style="background:linear-gradient(to bottom, transparent, #030712);"></div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    canvas { display: block; }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;
  private particles!: THREE.Points;
  private shapes: THREE.Mesh[] = [];
  private clock = new THREE.Clock();
  private boundMouseMove: (e: MouseEvent) => void;
  private boundResize: () => void;

  avatars = [
    { initials: 'MR', bg: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
    { initials: 'LB', bg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
    { initials: 'AF', bg: 'linear-gradient(135deg, #a78bfa, #c4b5fd)' },
    { initials: 'SC', bg: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
  ];

  // Dashboard mockup data
  mockAvatars = [
    { bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)', init: 'MR' },
    { bg: 'linear-gradient(135deg,#8b5cf6,#a78bfa)', init: 'LB' },
    { bg: 'linear-gradient(135deg,#06b6d4,#6366f1)', init: 'AF' },
  ];

  sideItems = [
    { label: 'Inbox',         active: false, count: 3 },
    { label: 'Lancio Q2',     active: true,  count: 8 },
    { label: 'Design System', active: false, count: null },
    { label: 'Bug Tracker',   active: false, count: 2 },
    { label: 'Roadmap 2025',  active: false, count: null },
  ];

  kanbanCols = [
    {
      name: 'Da fare', color: '#64748b',
      tasks: [
        { title: 'Aggiornare copy homepage', done: false, tag: 'Marketing', tagBg: 'rgba(99,102,241,0.15)', tagColor: '#818cf8', avatar: 'linear-gradient(135deg,#6366f1,#8b5cf6)', initials: 'MR' },
        { title: 'Review design tokens v2',  done: false, tag: 'Design',    tagBg: 'rgba(139,92,246,0.15)', tagColor: '#a78bfa', avatar: 'linear-gradient(135deg,#8b5cf6,#a78bfa)', initials: 'LB' },
      ],
    },
    {
      name: 'In corso', color: '#6366f1',
      tasks: [
        { title: 'Integrazione Stripe v3', done: false, tag: 'Dev',     tagBg: 'rgba(6,182,212,0.15)',  tagColor: '#22d3ee', avatar: 'linear-gradient(135deg,#06b6d4,#6366f1)', initials: 'AF' },
        { title: 'Onboarding flow UX',     done: false, tag: 'Design',  tagBg: 'rgba(139,92,246,0.15)', tagColor: '#a78bfa', avatar: 'linear-gradient(135deg,#6366f1,#4f46e5)', initials: 'SC' },
      ],
    },
    {
      name: 'Fatto', color: '#10b981',
      tasks: [
        { title: 'Setup CI/CD pipeline',    done: true, tag: 'Dev',   tagBg: 'rgba(16,185,129,0.15)', tagColor: '#34d399', avatar: 'linear-gradient(135deg,#6366f1,#8b5cf6)', initials: 'MR' },
        { title: 'Audit accessibilità WCAG',done: true, tag: 'QA',    tagBg: 'rgba(16,185,129,0.15)', tagColor: '#34d399', avatar: 'linear-gradient(135deg,#8b5cf6,#a78bfa)', initials: 'LB' },
      ],
    },
  ];

  constructor(private ngZone: NgZone) {
    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundResize = this.onResize.bind(this);
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.animate();
    });
    window.addEventListener('mousemove', this.boundMouseMove);
    window.addEventListener('resize', this.boundResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('resize', this.boundResize);
    this.renderer?.dispose();
  }

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.035);

    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    this.camera.position.set(0, 0, 6);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.createParticleField();
    this.createFloatingShapes();
    this.createConnectionLines();
  }

  private createParticleField(): void {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color(0x6366f1), // indigo
      new THREE.Color(0x8b5cf6), // violet
      new THREE.Color(0xa78bfa), // purple light
      new THREE.Color(0x818cf8), // indigo light
      new THREE.Color(0x4f46e5), // indigo dark
    ];

    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private createFloatingShapes(): void {
    const configs = [
      { geo: new THREE.IcosahedronGeometry(0.9, 1), pos: [-2.5, 1.2, -1], color: 0x6366f1, opacity: 0.12 },
      { geo: new THREE.OctahedronGeometry(0.7, 0),  pos: [2.8, -1.0, -0.5], color: 0x8b5cf6, opacity: 0.12 },
      { geo: new THREE.TorusGeometry(0.6, 0.18, 8, 24), pos: [0.5, 2.2, -2], color: 0xa78bfa, opacity: 0.10 },
      { geo: new THREE.TetrahedronGeometry(0.6, 0), pos: [-3, -1.5, -1.5], color: 0x818cf8, opacity: 0.10 },
      { geo: new THREE.IcosahedronGeometry(0.45, 0), pos: [3.5, 1.5, -2],  color: 0x6366f1, opacity: 0.15 },
    ];

    configs.forEach(cfg => {
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(cfg.geo, mat);
      mesh.position.set(...(cfg.pos as [number, number, number]));
      this.scene.add(mesh);
      this.shapes.push(mesh);
    });
  }

  private createConnectionLines(): void {
    const points: THREE.Vector3[] = [];
    const nodeCount = 20;

    for (let i = 0; i < nodeCount; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ));
    }

    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (points[i].distanceTo(points[j]) < 3.5) {
          linePositions.push(points[i].x, points[i].y, points[i].z);
          linePositions.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    const mat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(geo, mat);
    this.scene.add(lines);
    this.shapes.push(lines as unknown as THREE.Mesh);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    const t = this.clock.getElapsedTime();

    // Rotate particle field slowly
    if (this.particles) {
      this.particles.rotation.y = t * 0.04;
      this.particles.rotation.x = t * 0.015;
    }

    // Animate each shape independently
    const rotSpeeds = [
      [0.003, 0.005, 0.002],
      [0.004, -0.003, 0.006],
      [-0.002, 0.004, 0.003],
      [0.005, 0.002, -0.004],
      [-0.003, 0.005, 0.002],
    ];
    this.shapes.forEach((shape, i) => {
      const spd = rotSpeeds[i % rotSpeeds.length];
      shape.rotation.x += spd[0];
      shape.rotation.y += spd[1];
      shape.rotation.z += spd[2];
      // Gentle float
      shape.position.y += Math.sin(t * 0.5 + i) * 0.0015;
    });

    // Smooth camera parallax
    this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.04;
    this.camera.position.y += (-this.mouseY * 0.3 - this.camera.position.y) * 0.04;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouseX = (e.clientX / window.innerWidth)  * 2 - 1;
    this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }

  private onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}
