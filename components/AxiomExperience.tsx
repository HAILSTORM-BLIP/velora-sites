"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const videos = {
  hero: "https://videos.pexels.com/video-files/6062544/6062544-hd_1920_1080_25fps.mp4",
  result: "https://videos.pexels.com/video-files/6914903/6914903-hd_1920_1080_25fps.mp4",
  website: "https://videos.pexels.com/video-files/3140468/3140468-hd_1920_1080_25fps.mp4",
  leads: "https://videos.pexels.com/video-files/8426047/8426047-hd_1920_1080_25fps.mp4",
  automation: "https://videos.pexels.com/video-files/853919/853919-hd_1920_1080_25fps.mp4",
  contact: "https://videos.pexels.com/video-files/7692917/7692917-hd_1920_1080_25fps.mp4",
};

const work = [
  ["Website", "Make them trust you."],
  ["Leads", "Turn visits into calls."],
  ["Automation", "Stop losing time."],
];

const chapters = [
  {
    badge: "Website signal",
    title: "They judge before they call.",
    body: "Make the first feeling expensive.",
    video: videos.website,
    screen: "leak",
  },
  {
    badge: "Velora lift",
    title: "Interest should not go cold.",
    body: "Every lead moves while attention is still alive.",
    video: videos.leads,
    screen: "growth",
  },
  {
    badge: "Customer flow",
    title: "The work should move itself.",
    body: "Real inquiries. Routed instantly.",
    video: videos.automation,
    screen: "flow",
  },
];

const contactWins = ["Free website audit", "Automation map", "Growth plan"];

const painPoints = [
  ["Bad site.", "Lost trust."],
  ["Slow reply.", "Lost leads."],
  ["Manual work.", "Lost hours."],
];

const chartCandles = [
  { x: 44, high: 92, low: 138, open: 104, close: 126, color: "red" },
  { x: 76, high: 118, low: 166, open: 130, close: 154, color: "red" },
  { x: 108, high: 146, low: 196, open: 158, close: 184, color: "red" },
  { x: 144, high: 170, low: 224, open: 188, close: 210, color: "red" },
  { x: 184, high: 158, low: 214, open: 198, close: 174, color: "green" },
  { x: 228, high: 128, low: 178, open: 162, close: 138, color: "green" },
  { x: 272, high: 118, low: 172, open: 132, close: 160, color: "red" },
  { x: 326, high: 110, low: 162, open: 150, close: 124, color: "green" },
  { x: 378, high: 86, low: 138, open: 126, close: 98, color: "green" },
  { x: 430, high: 66, low: 118, open: 106, close: 78, color: "green" },
  { x: 482, high: 52, low: 98, open: 88, close: 64, color: "green" },
  { x: 534, high: 38, low: 84, open: 72, close: 50, color: "green" },
  { x: 586, high: 26, low: 72, open: 58, close: 36, color: "green" },
];

export default function AxiomExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".loader-word span", { yPercent: 120, rotate: 2 });
      gsap.set(".hero-word", { yPercent: 105, rotateX: -18, opacity: 0 });
      gsap.set(".fade-up", { y: 34, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .to(".loader-word span", { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.035 })
        .to(".loader-line", { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.45")
        .to(".loader", { yPercent: -100, duration: 1.05, ease: "power4.inOut" }, "+=0.1")
        .to(".hero-word", { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.2, stagger: 0.09 }, "-=0.55")
        .to(".fade-up", { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, "-=0.75");

      gsap.to(".hero-video", {
        scale: 1.14,
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".type-section").forEach((section) => {
        const words = section.querySelectorAll(".split-word");
        gsap.from(words, {
          yPercent: 105,
          opacity: 0,
          rotate: 1.5,
          duration: 1,
          stagger: 0.035,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".result-line").forEach((line) => {
        gsap.from(line, {
          y: 44,
          opacity: 0,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: { trigger: line, start: "top 82%" },
        });
      });

      gsap.fromTo(".pain-card",
        { y: 52, rotateX: -12, filter: "blur(8px)" },
        {
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.25,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".pain-grid", start: "top 78%" },
      });

      gsap.fromTo(".pain-title",
        { yPercent: 18, skewY: 3 },
        {
          yPercent: 0,
          skewY: 0,
          duration: 1.05,
          stagger: 0.14,
          ease: "power4.out",
          scrollTrigger: { trigger: ".pain-grid", start: "top 72%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".chapter").forEach((chapter, index) => {
        const video = chapter.querySelector(".chapter-video");
        const text = chapter.querySelectorAll(".chapter-text");
        const device = chapter.querySelector(".mac-device");
        const screenItems = chapter.querySelectorAll(".screen-anim");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top top",
            end: "+=950",
            pin: window.innerWidth >= 900,
            scrub: 0.8,
          },
        });

        tl.fromTo(video, { clipPath: "inset(12% 18% 12% 18%)", opacity: 0.18, scale: 1.16 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 0.56, scale: 1, ease: "power3.inOut" })
          .from(device, { y: 90, rotateX: 12, rotateY: index === 1 ? -8 : 8, opacity: 0, scale: 0.92, ease: "power4.out" }, 0.08)
          .from(screenItems, { y: 22, opacity: 0, stagger: 0.055, ease: "power4.out" }, 0.2)
          .from(text, { y: 58, opacity: 0, stagger: 0.08, ease: "power4.out" }, 0.22)
          .to(device, { y: -34, rotateY: index === 1 ? 4 : -4, ease: "none" }, 0.58)
          .to(text, { y: -28, ease: "none" }, 0.62);
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });
    }, root);

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const nextScrollY = window.scrollY;
      const goingDown = nextScrollY > lastScrollY && nextScrollY > 90;
      gsap.to(".site-nav", {
        yPercent: goingDown ? -125 : 0,
        autoAlpha: goingDown ? 0 : 1,
        duration: 0.55,
        ease: "power4.out",
        overwrite: true,
      });
      lastScrollY = nextScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root} className="bg-[#050505] text-[#f4f1ea]">
      <div className="grain" />

      <div className="loader fixed inset-0 z-[100] flex items-center justify-center bg-[#f4f1ea] text-[#050505]">
        <div>
          <div className="loader-word overflow-hidden font-serifDisplay text-[clamp(4rem,14vw,15rem)] leading-none">
            {"Velora".split("").map((letter, index) => (
              <span className="inline-block" key={`${letter}-${index}`}>{letter}</span>
            ))}
          </div>
          <div className="mx-auto mt-5 h-px w-3/4 overflow-hidden bg-black/15">
            <div className="loader-line h-full origin-left scale-x-0 bg-black" />
          </div>
        </div>
      </div>

      <nav className="site-nav fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
        <a className="fade-up font-serifDisplay text-3xl leading-none text-white" href="#">Velora</a>
        <div className="fade-up hidden items-center gap-7 text-[10px] uppercase tracking-[0.28em] text-white/70 md:flex">
          <a href="#websites">Websites</a>
          <a href="#automation">Automation</a>
          <a href="#contact">Start</a>
        </div>
      </nav>

      <section className="hero relative flex min-h-screen items-center overflow-hidden px-5 py-20 md:px-10">
        <video className="hero-video absolute inset-0 h-full w-full object-cover opacity-50" autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1800">
          <source src={videos.hero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(244,241,234,.08),transparent_34rem),linear-gradient(180deg,rgba(5,5,5,.5),rgba(5,5,5,.78)_62%,#050505)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <p className="fade-up mb-8 text-[10px] uppercase tracking-[0.42em] text-white/58 md:text-[12px]">
            Websites + automation for local business
          </p>
          <h1 className="text-[clamp(3.7rem,11vw,11.5rem)] leading-[0.82] tracking-[-0.055em]">
            {["Look", "expensive.", "Work", "faster."].map((word, index) => (
                <span className={index === 1 ? "block overflow-hidden font-serifDisplay italic tracking-[-0.04em]" : "block overflow-hidden font-display font-black uppercase"} key={word}>
                  <span className="hero-word block origin-bottom">{word}</span>
                </span>
              ))}
            </h1>
          <a className="fade-up mt-10 inline-flex items-center gap-3 border-b border-white/45 pb-2 text-[10px] uppercase tracking-[0.28em] text-white" href="#contact">
            Build with Velora <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <section id="websites" className="type-section px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-center text-[10px] uppercase tracking-[0.38em] text-white/36">Velora creates</p>
          <h2 className="mx-auto max-w-4xl text-center font-serifDisplay text-[clamp(3rem,6.8vw,7.2rem)] leading-[0.94] tracking-[-0.035em]">
            {splitWords("Trust turns into calls.")}
          </h2>
          <div className="mx-auto mt-16 grid max-w-5xl border-t border-white/12 md:grid-cols-3">
            {work.map(([title, body]) => (
              <div className="border-b border-white/12 py-9 text-center md:border-r md:px-8 md:last:border-r-0" key={title}>
                <h3 className="font-display text-3xl font-black uppercase tracking-[-0.04em] md:text-4xl">{title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-lg leading-7 text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-5 py-24 text-[#f4f1ea] md:px-10 md:py-32">
        <video className="absolute inset-0 h-full w-full object-cover opacity-24" autoPlay muted loop playsInline preload="metadata">
          <source src={videos.result} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#050505]/72" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="result-line text-[10px] uppercase tracking-[0.38em] text-white/34">The truth</p>
          <h2 className="result-line mx-auto mt-8 max-w-5xl font-display text-[clamp(2.9rem,7.6vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.055em]">
            Weak websites lose good customers.
          </h2>
          <p className="result-line mx-auto mt-8 max-w-2xl font-serifDisplay text-4xl leading-[1.06] text-white/72 md:text-6xl">
            People buy from the business that feels easiest to trust.
          </p>
        </div>
        <div className="pain-grid relative mx-auto mt-20 grid max-w-6xl overflow-hidden border border-white/10 bg-white/[0.035] md:grid-cols-3">
          {painPoints.map(([title, body], index) => (
            <div className="pain-card relative flex min-h-52 flex-col items-center justify-center border-b border-white/10 px-4 py-9 text-center backdrop-blur-xl last:border-b-0 sm:min-h-56 md:min-h-72 md:border-b-0 md:border-r md:border-white/10 md:px-5 md:last:border-r-0" key={title}>
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
              <h3 className="pain-title whitespace-nowrap font-serifDisplay text-[clamp(2.9rem,11vw,6.5rem)] leading-[0.88] tracking-[-0.035em] text-white md:text-[clamp(3.8rem,4.75vw,6rem)]">
                {title}
              </h3>
              <p className="mx-auto mt-7 max-w-xs font-display text-lg font-black uppercase tracking-[-0.035em] text-white/78 md:mt-8 md:text-2xl">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {chapters.map((chapter, index) => (
        <section className="chapter relative min-h-screen overflow-hidden bg-[#050505] px-5 py-20 text-[#f4f1ea] md:px-10" id={index === 1 ? "automation" : undefined} key={chapter.title}>
          <video className="chapter-video absolute inset-0 h-full w-full object-cover opacity-40" autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1800">
            <source src={chapter.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(244,241,234,.075),transparent_30rem),linear-gradient(180deg,rgba(5,5,5,.5),rgba(5,5,5,.84))]" />
          <div className={`relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] ${index === 1 ? "md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]" : ""}`}>
            <div className={`${index === 1 ? "md:order-2" : ""}`}>
              <MacShowcase type={chapter.screen} />
            </div>
            <div className={`chapter-copy ${index === 1 ? "md:order-1 md:text-right" : "md:text-left"} text-center`}>
              <p className={`chapter-text liquid-pill mb-7 inline-flex px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/76 ${index === 1 ? "md:ml-auto" : ""}`}>
                {chapter.badge}
              </p>
              <h2 className={`chapter-text text-[clamp(3rem,6.8vw,6.9rem)] leading-[0.86] tracking-[-0.052em] ${index === 1 ? "font-display font-black uppercase" : "font-serifDisplay"}`}>
                {chapter.title}
              </h2>
              <p className={`chapter-text mt-7 max-w-[20ch] font-display text-2xl font-black uppercase leading-[0.98] tracking-[-0.035em] text-white/72 md:text-3xl ${index === 1 ? "md:ml-auto" : ""}`}>{chapter.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="overflow-hidden bg-[#f4f1ea] py-8 text-[#050505]">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-[clamp(2.7rem,7vw,7rem)] font-black uppercase leading-none tracking-[-0.05em]">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="flex gap-10" key={index}>
              <span>Free audit</span><span className="font-serifDisplay italic normal-case">better website</span><span>more calls</span><span className="font-serifDisplay italic normal-case">less admin</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="type-section relative min-h-screen overflow-hidden bg-[#050505] px-5 py-24 md:px-10">
        <video className="absolute inset-0 h-full w-full object-cover opacity-22" autoPlay muted loop playsInline preload="metadata">
          <source src={videos.contact} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#050505]/78" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-6xl gap-12 md:grid-cols-[minmax(0,.82fr)_minmax(0,1fr)] md:items-center">
          <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
            <p className="mb-8 text-[10px] uppercase tracking-[0.38em] text-white/40">Free audit</p>
            <h2 className="font-display text-[clamp(2.9rem,5.2vw,5.8rem)] font-black uppercase leading-[0.9] tracking-[-0.048em]">
              {splitWords("See what is costing you calls.")}
            </h2>
            <p className="mt-7 max-w-md font-serifDisplay text-3xl leading-[1.08] text-white/72 md:text-4xl">
              We show what to fix, then build the website and automation to fix it.
            </p>
            <div className="mx-auto mt-8 grid max-w-sm gap-3 text-left md:mx-0">
              {contactWins.map((item) => (
                <div className="border-t border-white/12 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white/72" key={item}><span className="marker-danger-soft">{item}</span></div>
              ))}
            </div>
          </div>

          <form className="rounded-[18px] border border-white/12 bg-white/[0.035] p-5 backdrop-blur-xl md:p-8" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="group block">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Name</span>
                <input className="mt-3 w-full border-b border-white/16 bg-transparent py-3 font-display text-sm tracking-[-0.02em] text-white/90 outline-none transition placeholder:text-sm placeholder:text-white/42 focus:border-white/70 md:text-base" name="name" placeholder="Your name" />
              </label>
              <label className="group block">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Email</span>
                <input className="mt-3 w-full border-b border-white/16 bg-transparent py-3 font-display text-sm tracking-[-0.02em] text-white/90 outline-none transition placeholder:text-sm placeholder:text-white/42 focus:border-white/70 md:text-base" name="email" type="email" placeholder="you@brand.com" />
              </label>
            </div>
            <label className="mt-7 block">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Business</span>
              <input className="mt-3 w-full border-b border-white/16 bg-transparent py-3 font-display text-sm tracking-[-0.02em] text-white/90 outline-none transition placeholder:text-sm placeholder:text-white/42 focus:border-white/70 md:text-base" name="business" placeholder="What do you run?" />
            </label>
            <label className="mt-7 block">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">What do you want fixed?</span>
              <textarea className="mt-3 min-h-32 w-full resize-none border-b border-white/16 bg-transparent py-3 font-display text-sm leading-7 tracking-[-0.02em] text-white/90 outline-none transition placeholder:text-sm placeholder:text-white/42 focus:border-white/70 md:text-base" name="message" placeholder="Website, more calls, automation, or all of it." />
            </label>
            <button className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#f4f1ea] px-7 py-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#050505] transition hover:bg-white md:w-auto" type="submit">
              Start a project <ArrowUpRight size={15} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function MacShowcase({ type }: { type: string }) {
  return (
    <div className="mac-device mx-auto max-w-3xl perspective-[1400px]">
      <div className="liquid-device rounded-[28px] p-3 shadow-[0_40px_120px_rgba(0,0,0,.72)] md:p-4">
        <div className="liquid-screen overflow-hidden rounded-[20px]">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.045] px-4 py-3">
            <div className="flex gap-2">
              <span className="mac-dot mac-close">×</span>
              <span className="mac-dot mac-min" />
              <span className="mac-dot mac-go" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/34">Velora intelligence</div>
          </div>
          <div className="relative min-h-[285px] overflow-hidden p-3 md:min-h-[430px] md:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(244,241,234,.09),transparent_18rem),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px]" />
            <div className="relative">{type === "leak" && <LeakScreen />}</div>
            <div className="relative">{type === "growth" && <GrowthScreen />}</div>
            <div className="relative">{type === "flow" && <FlowScreen />}</div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-5 w-[72%] rounded-b-[24px] bg-gradient-to-b from-[#1d1d25] to-[#09090c] shadow-[0_22px_70px_rgba(0,0,0,.6)]" />
    </div>
  );
}

function LeakScreen() {
  return (
    <div className="space-y-3 md:space-y-5">
      <div className="screen-anim flex items-start justify-between gap-5">
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/36 md:text-[11px] md:tracking-[0.22em]">Current website</p>
          <h3 className="mt-1 font-display text-[1.55rem] font-black uppercase leading-none tracking-[-0.04em] text-white md:mt-2 md:text-5xl"><span className="marker-danger">Traffic leaks</span></h3>
        </div>
        <div className="rounded-full border border-[#f87171]/30 bg-[#f87171]/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#fca5a5] md:px-3 md:text-xs md:tracking-[0.16em]">-68% calls</div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {[
          ["Visitors", "2,418", "High intent"],
          ["Calls", "19", "Too low"],
          ["Trust", "42%", "Weak first feel"],
        ].map(([label, value, note]) => (
          <div className="screen-anim rounded-xl border border-[#ff3b30]/18 bg-[#ff3b30]/[0.055] p-2 shadow-[0_0_32px_rgba(255,59,48,.06)] md:rounded-2xl md:p-4" key={label}>
            <p className="text-[7px] uppercase tracking-[0.12em] text-[#ffb4ae] md:text-[10px] md:tracking-[0.18em]"><span className="marker-danger-soft">{label}</span></p>
            <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-white md:mt-3 md:text-3xl">{value}</p>
            <p className="mt-1 text-[10px] leading-tight text-white/40 md:mt-2 md:text-sm">{note}</p>
          </div>
        ))}
      </div>

      <div className="screen-anim rounded-xl border border-white/10 bg-white/[0.035] p-3 md:rounded-2xl md:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 md:mb-4">
          <p className="text-[8px] uppercase tracking-[0.16em] text-[#ffb4ae] md:text-[10px] md:tracking-[0.2em]"><span className="marker-danger-soft">Visitor drop-off</span></p>
          <p className="text-[10px] text-[#fca5a5] md:text-xs">Leave before contact</p>
        </div>
        <div className="space-y-2 md:space-y-3">
          {[
            ["Homepage view", "92%"],
            ["Service page", "41%"],
            ["Contact tap", "8%"],
          ].map(([label, width]) => (
            <div className="screen-anim" key={label}>
              <div className="mb-1 flex justify-between text-[10px] text-white/54 md:mb-2 md:text-sm"><span>{label}</span><span>{width}</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/8 md:h-2"><div className="h-full rounded-full bg-[#ff3b30]/80 shadow-[0_0_18px_rgba(255,59,48,.24)]" style={{ width }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GrowthScreen() {
  return (
    <div className="space-y-3 md:space-y-5">
      <div className="screen-anim flex items-start justify-between gap-5">
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/36 md:text-[11px] md:tracking-[0.22em]">After Velora</p>
          <h3 className="mt-1 font-display text-[1.55rem] font-black uppercase leading-none tracking-[-0.04em] text-white md:mt-2 md:text-5xl">Momentum graph</h3>
        </div>
        <div className="rounded-full border border-[#86efac]/30 bg-[#22c55e]/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#bbf7d0] md:px-3 md:text-xs md:tracking-[0.16em]">+214% leads</div>
      </div>

      <div className="screen-anim rounded-xl border border-white/10 bg-white/[0.04] p-3 md:rounded-2xl md:p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[8px] uppercase tracking-[0.16em] text-white/34 md:text-[10px] md:tracking-[0.2em]">Lead value chart</p>
          <div className="flex gap-3 text-[9px] font-bold uppercase tracking-[0.12em] md:text-xs">
            <span className="text-[#ff5a52]">Before Velora</span>
            <span className="text-[#86efac]">After Velora</span>
          </div>
        </div>
        <svg className="trading-chart h-36 w-full overflow-visible md:h-56" viewBox="0 0 640 250" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="chartGlow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="48%" stopColor="#ef4444" />
              <stop offset="58%" stopColor="#f4f1ea" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity=".22" />
              <stop offset="55%" stopColor="#22c55e" stopOpacity=".06" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="chart-grid" stroke="rgba(255,255,255,.06)" strokeWidth="1">
            {[70, 140, 210, 280, 350, 420, 490, 560].map((x) => <line key={`x-${x}`} x1={x} x2={x} y1="0" y2="230" />)}
            {[40, 82, 124, 166, 208].map((y) => <line key={`y-${y}`} x1="0" x2="640" y1={y} y2={y} />)}
          </g>
          <g className="chart-candles">
            {chartCandles.map((candle) => {
              const top = Math.min(candle.open, candle.close);
              const height = Math.max(Math.abs(candle.open - candle.close), 7);
              const color = candle.color === "green" ? "#22c55e" : "#ef4444";
              return (
                <g className="chart-candle" style={{ animationDelay: `${candle.x / 420}s` }} key={candle.x}>
                  <line x1={candle.x} x2={candle.x} y1={candle.high} y2={candle.low} stroke={color} strokeLinecap="round" strokeWidth="2" />
                  <rect x={candle.x - 5} y={top} width="10" height={height} rx="2" fill={color} opacity=".88" />
                </g>
              );
            })}
          </g>
          <path className="chart-area" d="M326 124 C366 110 386 112 414 88 S472 66 516 56 S584 48 620 30 L620 230 L326 230 Z" fill="url(#chartArea)" />
          <path className="chart-line-red" d="M20 110 C58 120 70 132 98 150 S140 214 172 194 S212 128 248 142 S286 174 318 148" fill="none" stroke="#ef4444" strokeLinecap="round" strokeWidth="3.5" pathLength="1" />
          <line className="chart-marker" x1="338" x2="338" y1="30" y2="220" stroke="rgba(244,241,234,.32)" strokeDasharray="5 8" />
          <path className="chart-line-green" d="M326 124 C366 110 386 112 414 88 S472 66 516 56 S584 48 620 30" fill="none" stroke="#22c55e" strokeLinecap="round" strokeWidth="3.5" pathLength="1" />
          <circle className="chart-dot" cx="620" cy="30" r="7" fill="#22c55e" />
          <g fill="rgba(255,255,255,.28)" fontSize="12" fontWeight="800">
            <text x="24" y="246">No site</text>
            <text x="214" y="246">Manual work</text>
            <text x="354" y="246">Velora</text>
            <text x="548" y="246">Growth</text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {[
          ["Response", "0:47", "avg time"],
          ["Booked", "38", "this month"],
          ["Follow-up", "100%", "automatic"],
        ].map(([label, value, note]) => (
          <div className="screen-anim rounded-xl border border-white/10 bg-white/[0.045] p-2 md:rounded-2xl md:p-4" key={label}>
            <p className="text-[7px] uppercase tracking-[0.12em] text-white/34 md:text-[10px] md:tracking-[0.18em]">{label}</p>
            <p className="mt-1 font-display text-lg font-black tracking-[-0.04em] text-white md:mt-3 md:text-3xl">{value}</p>
            <p className="mt-1 text-[10px] leading-tight text-white/40 md:mt-2 md:text-sm">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowScreen() {
  const customers = ["Nora wants pricing", "Arjun booked a call", "Maya asked for quote", "Omar needs follow-up"];

  return (
    <div className="space-y-3 md:space-y-5">
      <div className="screen-anim flex items-start justify-between gap-5">
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/36 md:text-[11px] md:tracking-[0.22em]">Customer engine</p>
          <h3 className="mt-1 font-display text-[1.55rem] font-black uppercase leading-none tracking-[-0.04em] text-white md:mt-2 md:text-5xl">Demand in motion</h3>
        </div>
        <div className="rounded-full border border-[#86efac]/35 bg-[#22c55e]/18 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#bbf7d0] shadow-[0_0_18px_rgba(34,197,94,.12)] md:px-3 md:text-xs md:tracking-[0.16em]">Live</div>
      </div>

      <div className="screen-anim grid grid-cols-[.78fr_1.22fr] gap-2 md:gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 md:rounded-2xl md:p-4">
          <p className="text-[8px] uppercase tracking-[0.16em] text-white/34 md:text-[10px] md:tracking-[0.2em]">Queue</p>
          <div className="mt-3 space-y-2 md:mt-5 md:space-y-3">
            {["Capture", "Qualify", "Route", "Follow up"].map((item, index) => (
              <div className="screen-anim flex items-center gap-3" key={item}>
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f4f1ea] text-[9px] font-black text-[#050505] md:h-7 md:w-7 md:text-xs">{index + 1}</span>
                <span className="text-[11px] font-semibold leading-tight text-white/68 md:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-3 md:rounded-2xl md:p-4">
          <p className="text-[8px] uppercase tracking-[0.16em] text-white/34 md:text-[10px] md:tracking-[0.2em]">Customers</p>
          <div className="mt-3 space-y-2 md:mt-5 md:space-y-3">
            {customers.map((customer, index) => (
              <div className="customer-card screen-anim flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#0d0d12]/90 p-2 md:rounded-xl md:p-3" style={{ animationDelay: `${index * 0.28}s` }} key={customer}>
                <span className="text-[11px] font-semibold leading-tight text-white/72 md:text-sm">{customer}</span>
                <span className="rounded-full bg-[#ef4444] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_14px_rgba(239,68,68,.22)] md:px-2 md:py-1 md:text-[10px] md:tracking-[0.14em]">new</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="screen-anim rounded-xl border border-white/10 bg-white/[0.04] p-3 md:rounded-2xl md:p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/44 md:text-sm">Today</span>
          <span className="font-display text-xl font-black tracking-[-0.04em] text-white md:text-3xl">14 booked actions</span>
        </div>
      </div>
    </div>
  );
}

function splitWords(text: string) {
  return text.split(" ").map((word, index) => (
    <span className="inline-block overflow-hidden pr-[0.18em]" key={`${word}-${index}`}>
      <span className="split-word inline-block">{word}</span>
    </span>
  ));
}
