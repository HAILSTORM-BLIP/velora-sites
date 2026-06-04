"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, ChevronRight, Menu, Monitor, Sparkles, X } from "lucide-react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["Work", "Offer", "Process"];

const proof = [
  ["01", "Simple message"],
  ["02", "Premium motion"],
  ["03", "Mobile-first build"],
];

const services = [
  "Clean landing pages for creators and local brands",
  "Dark cinematic sections inspired by real product footage",
  "Fast Next.js builds with responsive details handled",
  "Copy hierarchy that sounds human instead of overdesigned",
];

const work = [
  ["Studio launch", "A sharp one-page site with cinematic scroll and founder-led copy."],
  ["Local service", "A conversion-focused homepage for calls, bookings, and trust."],
  ["Creator offer", "A minimal personal brand page built around one clear action."],
];

export default function AxiomExperience() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!root.current || !canvas.current) return;

    const scene = createStudioScene(canvas.current);
    const ctx = gsap.context(() => {
      setupIntro();
      setupScroll(scene.api);
      setupMagneticButtons(root.current);
    }, root);

    return () => {
      ctx.revert();
      scene.destroy();
    };
  }, []);

  return (
    <main ref={root} className="site-root">
      <div className="site-loader" aria-label="Loading website experience">
        <div className="site-loader__inner">
          <div className="market-loader" aria-hidden="true">
            <div className="market-loader__bar" />
            <div className="market-loader__bar" />
            <div className="market-loader__bar" />
            <div className="market-loader__bar" />
            <div className="market-loader__bar" />
            <div className="market-loader__ball" />
          </div>
          <p>Loading experience</p>
        </div>
      </div>
      <canvas ref={canvas} className="studio-canvas" aria-hidden="true" />
      <div className="ambient-noise" />
      <div className="ambient-vignette" />

      <header className="site-nav">
        <a className="brand" href="#" aria-label="Jishan Builds home">
          <span><Monitor size={17} /></span>
          JISHAN BUILDS
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </nav>
        <a className="nav-action magnetic" href="#start">Start</a>
        <button
          className="icon-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        {[...navItems, "Start"].map((item) => (
          <a
            key={item}
            href={item === "Start" ? "#start" : `#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow reveal-line">Websites that look intentional</p>
          <h1 className="hero-title">Simple sites. No overdoing it.</h1>
          <p className="hero-body reveal-line">
            I design and build clean, cinematic websites for people who need a serious online presence without the clutter.
          </p>
          <div className="hero-actions reveal-line">
            <a className="primary-button magnetic" href="#start">Build my site <ArrowUpRight size={16} /></a>
            <a className="secondary-button magnetic" href="#work">See the style <ChevronRight size={16} /></a>
          </div>
        </div>
        <div className="hero-proof reveal-line" aria-label="Website qualities">
          {proof.map(([number, label]) => (
            <span key={label}><strong>{number}</strong>{label}</span>
          ))}
        </div>
      </section>

      <section className="statement-section section-panel">
        <p className="quote">
          Client: I need a simple website, do not overdo me with chaos.
          <span>Me: clean hierarchy, one strong CTA, motion only where it helps.</span>
        </p>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Recent directions</p>
          <h2>Dark, focused, built around the screen.</h2>
        </div>
        <div className="work-grid">
          {work.map(([title, copy]) => (
            <article className="work-card" key={title}>
              <div className="work-preview">
                <span />
                <span />
                <span />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="offer-section section-panel" id="offer">
        <div>
          <p className="eyebrow">What you get</p>
          <h2>A complete website, not a half-finished mockup.</h2>
        </div>
        <div className="feature-list">
          {services.map((service) => (
            <div className="feature-row" key={service}>
              <span><Check size={17} /></span>
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="section-heading">
          <p className="eyebrow">Process</p>
          <h2>Short path from idea to live page.</h2>
        </div>
        <div className="process-grid">
          {[
            ["Send the vibe", "You share the business, references, and the kind of first impression you want."],
            ["Design the first screen", "We lock the look before expanding the rest of the page."],
            ["Build and polish", "Responsive layout, motion, copy, and launch-ready details get handled."],
          ].map(([title, copy], index) => (
            <article className="process-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-section section-panel" id="start">
        <p className="eyebrow">Start here</p>
        <h2>Want a site like the references?</h2>
        <p>Send the offer, a few examples, and the main action visitors should take. I will shape the design before building the full page.</p>
        <a className="primary-button magnetic" href="mailto:hello@jishan.build">Request a website <Sparkles size={16} /></a>
      </section>
    </main>
  );
}

function createStudioScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.2, 8);

  scene.add(new THREE.AmbientLight(0xffffff, 0.34));
  const key = new THREE.DirectionalLight(0xffffff, 4.2);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0x8d6cff, 34, 12);
  rim.position.set(-3, -1, 2.5);
  scene.add(rim);
  const warm = new THREE.PointLight(0xf2b66d, 24, 10);
  warm.position.set(2.6, 1.8, 3);
  scene.add(warm);

  const group = new THREE.Group();
  scene.add(group);

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x15171d,
    metalness: 0.25,
    roughness: 0.16,
    transparent: true,
    opacity: 0.84,
    transmission: 0.1,
    envMapIntensity: 1.8,
  });
  const metal = new THREE.MeshStandardMaterial({ color: 0x0c0d10, metalness: 0.82, roughness: 0.22, envMapIntensity: 1.4 });
  const glow = new THREE.MeshBasicMaterial({ color: 0xf4f1ea, transparent: true, opacity: 0.86 });
  const accent = new THREE.MeshBasicMaterial({ color: 0x9b7cff, transparent: true, opacity: 0.72 });

  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.75, 0.06), glass);
  group.add(screen);

  const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 0.95), metal);
  base.position.set(0, -1.0, 0.34);
  base.rotation.x = -0.72;
  group.add(base);

  const lineTop = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.035, 0.025), glow);
  lineTop.position.set(-0.1, 0.36, 0.06);
  group.add(lineTop);

  const lineMid = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.025, 0.025), glow);
  lineMid.position.set(-0.35, 0.13, 0.06);
  lineMid.material = accent;
  group.add(lineMid);

  const cta = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.18, 0.035), glow);
  cta.position.set(-0.76, -0.42, 0.065);
  group.add(cta);

  const sideOrb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), new THREE.MeshStandardMaterial({
    color: 0x9b7cff,
    metalness: 0.1,
    roughness: 0.26,
    emissive: 0x23114f,
    emissiveIntensity: 0.8,
  }));
  sideOrb.position.set(1.12, -0.18, 0.12);
  group.add(sideOrb);

  const dots = new THREE.Group();
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xf4f1ea, transparent: true, opacity: 0.42 });
  for (let i = 0; i < 38; i += 1) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.008 + (i % 3) * 0.003, 8, 8), dotMat);
    dot.position.set((Math.random() - 0.5) * 7.5, (Math.random() - 0.5) * 4.8, -1 - Math.random() * 2);
    dots.add(dot);
  }
  scene.add(dots);

  const state = { progress: 0 };
  const clock = new THREE.Clock();

  const render = () => {
    const t = clock.elapsedTime;
    const p = state.progress;
    const mobile = window.innerWidth < 760;
    group.position.set(mobile ? 0.75 : 2.55 - p * 0.18, mobile ? -1.02 : -0.24 + Math.sin(t * 0.9) * 0.04, -1.65);
    group.rotation.x = -0.08 + Math.sin(t * 0.7) * 0.025;
    group.rotation.y = -0.26 + Math.sin(t * 0.55) * 0.08 + p * 0.16;
    group.rotation.z = Math.sin(t * 0.5) * 0.018;
    group.scale.setScalar(mobile ? 0.44 : 0.54);
    dots.rotation.y += 0.0009;
    renderer.render(scene, camera);
  };

  let raf = 0;
  const animate = () => {
    render();
    raf = requestAnimationFrame(animate);
  };
  animate();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);

  return {
    api: {
      set progress(value: number) {
        state.progress = value;
      },
      get progress() {
        return state.progress;
      },
    },
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pmrem.dispose();
    },
  };
}

function setupIntro() {
  gsap.set([".hero-title", ".reveal-line"], { y: 34, opacity: 0 });
  gsap.set(".site-loader", { autoAlpha: 1 });
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .to(".site-loader__inner", { scale: 1.03, duration: 3.2, ease: "none" })
    .to(".site-loader", { autoAlpha: 0, duration: 0.72, ease: "power3.inOut" })
    .set(".site-loader", { display: "none" })
    .to(".hero-title", { y: 0, opacity: 1, duration: 1.05 }, "-=0.12")
    .to(".reveal-line", { y: 0, opacity: 1, duration: 0.78, stagger: 0.1 }, "-=0.76");
}

function setupScroll(api: { progress: number }) {
  gsap.to(api, {
    progress: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".site-root",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.4,
    },
  });

  gsap.utils.toArray<HTMLElement>(".section-panel, .work-card, .process-card").forEach((item) => {
    gsap.fromTo(item,
      { y: 34, opacity: 0.35, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          end: "top 48%",
          scrub: 1,
        },
      }
    );
  });
}

function setupMagneticButtons(scope: HTMLElement | null) {
  if (!scope) return;
  scope.querySelectorAll<HTMLElement>(".magnetic").forEach((button) => {
    const onMove = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      gsap.to(button, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.08,
        y: (event.clientY - rect.top - rect.height / 2) * 0.1,
        duration: 0.36,
        ease: "power3.out",
      });
    };
    const onLeave = () => gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    button.addEventListener("mousemove", onMove);
    button.addEventListener("mouseleave", onLeave);
  });
}
