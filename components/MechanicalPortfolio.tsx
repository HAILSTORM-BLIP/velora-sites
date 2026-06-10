"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Box,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  Factory,
  Gauge,
  Link,
  Mail,
  MessageCircle,
  Orbit,
  PenTool,
  Send,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stats = [
  ["50+", "Mechanical Designs"],
  ["20+", "3D Assemblies"],
  ["15+", "Manufacturing Projects"],
  ["3+", "Years Learning"],
];

const skills = [
  "AutoCAD",
  "SolidWorks",
  "CATIA",
  "PTC Creo",
  "Fusion 360",
  "ANSYS",
  "GD&T",
  "Sheet Metal Design",
  "3D Modelling",
  "Product Design",
  "Reverse Engineering",
  "Mechanical Drafting",
];

const projects = [
  {
    title: "Industrial Gearbox Assembly",
    software: "SolidWorks + ANSYS",
    copy: "Compact helical gearbox with bearing selection, exploded BOM, torque path review, and manufacturable housing design.",
    icon: Settings,
  },
  {
    title: "Hydraulic Press Design",
    software: "CATIA + AutoCAD",
    copy: "Frame structure, cylinder mounting, platen travel, weldment detailing, and safety-focused load transfer validation.",
    icon: Gauge,
  },
  {
    title: "Automated Conveyor System",
    software: "Creo + Fusion 360",
    copy: "Modular belt conveyor with adjustable roller beds, sensor brackets, motor mount, and maintenance-friendly assemblies.",
    icon: Factory,
  },
  {
    title: "Sheet Metal Enclosure",
    software: "SolidWorks Sheet Metal",
    copy: "Folded enclosure system with bend allowance, fastening strategy, ventilation cutouts, and production drawings.",
    icon: Box,
  },
  {
    title: "Automotive Suspension Model",
    software: "CATIA + ANSYS",
    copy: "Double wishbone concept with knuckle packaging, motion clearance checks, and stress-focused topology refinement.",
    icon: Orbit,
  },
  {
    title: "Injection Mold Design",
    software: "PTC Creo + AutoCAD",
    copy: "Two-plate mold concept with parting line study, ejector layout, cooling channels, and machining-ready documentation.",
    icon: ShieldCheck,
  },
];

const demoSites = [
  {
    title: "Mechanical Portfolio",
    type: "Main site",
    href: "https://hailstorm-blip.github.io/velora-web/",
    copy: "Premium engineering portfolio with CAD projects, process, skills, and contact flow.",
  },
  {
    title: "Flavored Cafe",
    type: "Demo site",
    href: "https://hailstorm-blip.github.io/velora-web/cafe/",
    copy: "Animated cafe landing page with menu cards, loader video, product visuals, and ordering-style sections.",
  },
  {
    title: "Velora Sites Archive",
    type: "Repository mirror",
    href: "https://hailstorm-blip.github.io/velora-sites/",
    copy: "The consolidated Pages archive that also carries the shared site collection.",
  },
  {
    title: "Vercel Production",
    type: "Live deployment",
    href: "https://jishanbuilds.vercel.app",
    copy: "Production deployment of the main portfolio site through Vercel.",
  },
];

const gallery = [
  "CAD render",
  "Exploded view",
  "Technical drawing",
  "Assembly model",
  "Blueprint preview",
  "Tolerance stack",
];

const processSteps = [
  "Research",
  "Concept Development",
  "CAD Modeling",
  "Simulation",
  "Optimization",
  "Manufacturing Support",
];

const expertise = [
  ["AutoCAD", 95],
  ["SolidWorks", 90],
  ["CATIA", 85],
  ["Creo", 88],
  ["ANSYS", 75],
];

const testimonials = [
  [
    "Armaan translates rough mechanical ideas into clear CAD assemblies with a manufacturing mindset. His drawings are precise and practical.",
    "Prof. S. Kulkarni",
    "Design Faculty",
  ],
  [
    "The enclosure concept arrived with clean bend strategy, service access, and proper detailing. It felt ready for a fabrication discussion.",
    "Aarav Mehta",
    "Prototype Client",
  ],
  [
    "His suspension and gearbox studies show strong fundamentals, visual clarity, and the discipline recruiters look for in junior design talent.",
    "Neha Rao",
    "Mechanical Mentor",
  ],
];

function useCounter(value: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const target = Number.parseInt(value, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 56;
    const tick = () => {
      frame += 1;
      setCount(Math.round((target * frame) / total));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return { ref, text: `${count}${value.includes("+") ? "+" : ""}` };
}

function StatCard({ value, label }: { value: string; label: string }) {
  const { ref, text } = useCounter(value);
  return (
    <motion.article className="stat-card" variants={fadeUp}>
      <span ref={ref}>{text}</span>
      <p>{label}</p>
    </motion.article>
  );
}

function ProjectVisual({ icon: Icon, index }: { icon: LucideIcon; index: number }) {
  return (
    <div className="project-visual">
      <div className="blueprint-grid" />
      <div className="cad-part" data-variant={index % 3}>
        <Icon size={58} strokeWidth={1.15} />
      </div>
      <span className="dimension-line top" />
      <span className="dimension-line right" />
      <span className="corner-dot one" />
      <span className="corner-dot two" />
    </div>
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <motion.a
      className={`magnetic-button ${variant}`}
      href={href}
      whileHover={{ y: -4, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
    >
      {children}
    </motion.a>
  );
}

export default function MechanicalPortfolio() {
  const [sent, setSent] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [navHidden, setNavHidden] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroLift = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const heroFade = useTransform(scrollYProgress, [0, 0.9], [1, 0.45]);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".mech-page");
    const handlePointer = (event: PointerEvent) => {
      if (!root) return;
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
      root.style.setProperty("--px", (event.clientX / window.innerWidth - 0.5).toFixed(3));
      root.style.setProperty("--py", (event.clientY / window.innerHeight - 0.5).toFixed(3));
    };
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      if (Math.abs(delta) < 8) return;
      setNavHidden(delta > 0 && currentY > 110);
      previousY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const project = projects[activeProject];
  const nextProject = () => setActiveProject((current) => (current + 1) % projects.length);
  const previousProject = () => setActiveProject((current) => (current - 1 + projects.length) % projects.length);

  return (
    <main className="mech-page">
      <div className="light-streaks" aria-hidden="true" />
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 34 }).map((_, index) => (
          <span key={index} style={{ "--i": index } as React.CSSProperties} />
        ))}
      </div>

      <nav className={`nav-bar ${navHidden ? "is-hidden" : ""}`} aria-label="Main navigation">
        <a href="#top" className="logo-mark">
          AT
        </a>
        <div>
          <a href="#projects">Projects</a>
          <a href="#demos">Demos</a>
          <a href="#skills">Skills</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <motion.div className="hero-copy" style={{ y: heroLift, opacity: heroFade }}>
          <motion.p className="eyebrow" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            Premium mechanical design portfolio
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.85, delay: 0.08 }}>
            <span>ARMAAN</span>
            <span>TAMBOLI</span>
          </motion.h1>
          <motion.h2 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.85, delay: 0.16 }}>
            Mechanical Design Engineer
          </motion.h2>
          <motion.p className="hero-subtext" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.85, delay: 0.24 }}>
            Transforming concepts into precision-engineered products through CAD, simulation and manufacturing-driven design.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.85, delay: 0.32 }}>
            <MagneticButton href="#projects">
              View Projects <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton href="#demos" variant="ghost">
              Demo Sites <Link size={18} />
            </MagneticButton>
            <MagneticButton href="Armaan-Tamboli-Resume.pdf" variant="ghost">
              Download Resume <Download size={18} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me <Mail size={18} />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 64, rotateY: -12, filter: "blur(16px)" }}
          animate={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="portrait-shell">
            <img className="portfolio-preview" src="assets/portfolio-reference.jpg" alt="Blue portfolio design preview" />
            <div className="engineer-silhouette">
              <span className="helmet" />
              <span className="torso" />
              <span className="tablet" />
            </div>
            <div className="wireframe wf-one"><Box size={58} /></div>
            <div className="wireframe wf-two"><Settings size={52} /></div>
            <div className="wireframe wf-three"><Orbit size={66} /></div>
          </div>
        </motion.div>
      </section>

      <motion.section className="stats-strip section-shell" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} transition={{ staggerChildren: 0.08 }}>
        {stats.map(([value, label]) => (
          <StatCard key={label} value={value} label={label} />
        ))}
      </motion.section>

      <section className="section-shell" id="skills">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="eyebrow">Design toolkit</p>
          <h2>CAD fluency shaped for parts, assemblies, analysis, and shop-floor clarity.</h2>
        </motion.div>
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <motion.article
              className="skill-card"
              key={skill}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
              variants={fadeUp}
              transition={{ duration: 0.65, delay: (index % 6) * 0.04 }}
              whileHover={{ y: -8, rotateX: 7, rotateY: -7, scale: 1.03 }}
            >
              <PenTool size={18} />
              <span>{skill}</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell project-section" id="projects">
        <motion.div className="section-heading wide" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
          <p className="eyebrow">Featured projects</p>
          <h2>Precision concepts presented like a luxury engineering studio.</h2>
        </motion.div>
        <div className="project-carousel">
          <button className="carousel-control left" onClick={previousProject} aria-label="Previous project">
            <ChevronLeft size={24} />
          </button>
          <motion.article
            className="featured-project"
            key={project.title}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectVisual icon={project.icon} index={activeProject} />
            <div className="featured-copy">
              <span>{project.software}</span>
              <h3>{project.title}</h3>
              <p>{project.copy}</p>
              <motion.a href="#contact" className="detail-button" whileHover={{ x: 8 }}>
                View Details <ArrowRight size={18} />
              </motion.a>
            </div>
          </motion.article>
          <button className="carousel-control right" onClick={nextProject} aria-label="Next project">
            <ChevronRight size={24} />
          </button>
          <div className="project-dots" aria-label="Project selector">
            {projects.map((item, index) => (
              <button
                key={item.title}
                aria-label={`Show ${item.title}`}
                className={index === activeProject ? "active" : ""}
                onClick={() => setActiveProject(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell demo-section" id="demos">
        <motion.div className="section-heading wide" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
          <p className="eyebrow">Connected demos</p>
          <h2>Every live site from the Velora workspace, connected from one main hub.</h2>
        </motion.div>
        <div className="demo-grid">
          {demoSites.map((site, index) => (
            <motion.a
              className="demo-card"
              href={site.href}
              key={site.title}
              target="_blank"
              rel="noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
              variants={fadeUp}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              whileHover={{ y: -8, scale: 1.015 }}
            >
              <span>{site.type}</span>
              <h3>{site.title}</h3>
              <p>{site.copy}</p>
              <strong>
                Open site <ArrowRight size={18} />
              </strong>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <motion.div className="gallery-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
          <div className="section-heading">
            <p className="eyebrow">3D design gallery</p>
            <h2>Blueprint previews, exploded structures, and assembly-level thinking.</h2>
          </div>
          <div className="gallery-track">
            {gallery.concat(gallery).map((item, index) => (
              <article className="gallery-card" key={`${item}-${index}`}>
                <div className="mini-blueprint">
                  <span />
                  <span />
                  <span />
                </div>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell process-section" id="process">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.24 }}>
          <p className="eyebrow">Engineering process</p>
          <h2>From problem definition to manufacturing support with traceable design decisions.</h2>
        </motion.div>
        <div className="timeline">
          {processSteps.map((step, index) => (
            <motion.article
              className="timeline-step"
              key={step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell dashboard-section">
        <motion.div className="dashboard" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
          <div>
            <p className="eyebrow">Software expertise</p>
            <h2>Production-ready dashboard of design strengths.</h2>
          </div>
          <div className="bars">
            {expertise.map(([name, value]) => (
              <div className="bar-row" key={name}>
                <div>
                  <span>{name}</span>
                  <strong>{value}%</strong>
                </div>
                <motion.i initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="section-shell testimonials-section">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <p className="eyebrow">Testimonials</p>
          <h2>Quiet confidence from the people who reviewed the work.</h2>
        </motion.div>
        <div className="testimonial-marquee">
          {testimonials.concat(testimonials).map(([quote, name, role], index) => (
            <article className="testimonial-card" key={`${name}-${index}`}>
              <p>&quot;{quote}&quot;</p>
              <span>{name}</span>
              <small>{role}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell contact-section" id="contact">
        <motion.div className="contact-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.24 }}>
          <p className="eyebrow">Contact</p>
          <h2>Bring the next design challenge.</h2>
          <p>For CAD modeling, product detailing, simulation support, reverse engineering, and manufacturing-ready drawings.</p>
          <div className="social-row">
            <a href="https://www.linkedin.com" aria-label="LinkedIn"><Link size={20} /></a>
            <a href="https://github.com" aria-label="GitHub"><Code2 size={20} /></a>
            <a href="https://wa.me/" aria-label="WhatsApp"><MessageCircle size={20} /></a>
          </div>
        </motion.div>
        <motion.form className="contact-form" onSubmit={handleSubmit} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.24 }}>
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>Project Type</option>
            <option>CAD Modeling</option>
            <option>Simulation</option>
            <option>Manufacturing Drawings</option>
            <option>Product Design</option>
          </select>
          <textarea name="message" placeholder="Message" rows={5} required />
          <button type="submit">
            {sent ? "Inquiry Ready" : "Send Inquiry"} <Send size={18} />
          </button>
        </motion.form>
      </section>

      <footer className="footer">
        <div>AT</div>
        <p>Engineering Tomorrow Through Design.</p>
        <span>AutoCAD / CATIA / Creo / SolidWorks / ANSYS</span>
      </footer>
    </main>
  );
}
