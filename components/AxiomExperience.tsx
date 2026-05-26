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
    kicker: "",
    title: "They judge before they call.",
    body: "Make the first feeling expensive.",
    video: videos.website,
  },
  {
    kicker: "",
    title: "Interest should not go cold.",
    body: "Every lead moves while attention is still alive.",
    video: videos.leads,
  },
  {
    kicker: "",
    title: "The work should move itself.",
    body: "Less chasing. Less admin. More growth.",
    video: videos.automation,
  },
];

const contactWins = ["Free website audit", "Automation map", "Growth plan"];

const painPoints = [
  ["Bad site.", "Lost trust."],
  ["Slow reply.", "Lost leads."],
  ["Manual work.", "Lost hours."],
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

      gsap.utils.toArray<HTMLElement>(".chapter").forEach((chapter, index) => {
        const video = chapter.querySelector(".chapter-video");
        const text = chapter.querySelectorAll(".chapter-text");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top top",
            end: "+=950",
            pin: true,
            scrub: 1,
          },
        });

        tl.fromTo(video, { clipPath: "inset(12% 18% 12% 18%)", opacity: 0.18, scale: 1.16 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 0.56, scale: 1, ease: "power3.inOut" })
          .from(text, { y: 58, opacity: 0, stagger: 0.08, ease: "power4.out" }, 0.16)
          .to(text, { y: -36, ease: "none" }, 0.62);
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });
    }, root);

    return () => ctx.revert();
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

      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
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
        <div className="relative mx-auto mt-16 grid max-w-5xl gap-px bg-white/12 md:grid-cols-3">
          {painPoints.map(([title, body]) => (
            <div className="result-line bg-white/[0.035] p-8 text-center backdrop-blur-xl md:min-h-56" key={title}>
              <h3 className="font-serifDisplay text-5xl leading-none md:text-7xl">{title}</h3>
              <p className="mx-auto mt-6 max-w-xs font-display text-2xl font-black uppercase tracking-[-0.04em] text-white/80">{body}</p>
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
          <div className={`relative z-10 flex min-h-[calc(100vh-10rem)] flex-col justify-center ${index === 0 ? "items-start text-left" : index === 1 ? "items-center text-center" : "items-end text-right"}`}>
            <div className={`w-full ${index === 1 ? "mx-auto max-w-5xl" : "max-w-6xl"}`}>
              <h2 className={`chapter-text max-w-5xl text-[clamp(3.5rem,8vw,8.2rem)] leading-[0.86] tracking-[-0.052em] ${index === 1 ? "mx-auto font-display font-black uppercase" : "font-serifDisplay"}`}>
                {chapter.title}
              </h2>
              <p className={`chapter-text mt-8 max-w-[18ch] font-display text-2xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white/76 md:text-4xl ${index === 1 ? "mx-auto" : index === 2 ? "ml-auto" : ""}`}>{chapter.body}</p>
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
                <div className="border-t border-white/12 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white/62" key={item}>{item}</div>
              ))}
            </div>
          </div>

          <form className="border border-white/12 bg-white/[0.035] p-5 backdrop-blur-xl md:p-8" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="group block">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Name</span>
                <input className="mt-3 w-full border-b border-white/16 bg-transparent py-3 text-base text-white/90 outline-none transition placeholder:text-white/42 focus:border-white/70 md:text-lg" name="name" placeholder="Your name" />
              </label>
              <label className="group block">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Email</span>
                <input className="mt-3 w-full border-b border-white/16 bg-transparent py-3 text-base text-white/90 outline-none transition placeholder:text-white/42 focus:border-white/70 md:text-lg" name="email" type="email" placeholder="you@brand.com" />
              </label>
            </div>
            <label className="mt-7 block">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Business</span>
              <input className="mt-3 w-full border-b border-white/16 bg-transparent py-3 text-base text-white/90 outline-none transition placeholder:text-white/42 focus:border-white/70 md:text-lg" name="business" placeholder="What do you run?" />
            </label>
            <label className="mt-7 block">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">What do you want fixed?</span>
              <textarea className="mt-3 min-h-32 w-full resize-none border-b border-white/16 bg-transparent py-3 text-base leading-7 text-white/90 outline-none transition placeholder:text-white/42 focus:border-white/70 md:text-lg" name="message" placeholder="Website, more calls, automation, or all of it." />
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

function splitWords(text: string) {
  return text.split(" ").map((word, index) => (
    <span className="inline-block overflow-hidden pr-[0.18em]" key={`${word}-${index}`}>
      <span className="split-word inline-block">{word}</span>
    </span>
  ));
}
