"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Wedding } from "@/lib";

type Props = { w: Wedding; onDone: () => void; reducedMotion: boolean };

/**
 * Layered envelope built from separated textures of the approved artwork:
 *  - base: full approved image (satin backdrop, closed state)
 *  - interior: CSS paper for the inside of the back panel (revealed when the flap opens)
 *  - card: semantic HTML card that rises out of the pocket
 *  - pocket: body texture (seal area retouched) clipped below the V-fold
 *  - flap pivot: flap texture + wax seal, rotating around the top fold; paper back face
 */
export default function EnvelopeIntro({ w, onDone, reducedMotion }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const skipped = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const finished = useRef(false);
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  const open = () => {
    if (started.current) return; // repeat-tap guard
    started.current = true;
    setOpening(true);
    const q = gsap.utils.selector(root);
    if (reducedMotion) {
      finish();
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: finish });
    // safety net: throttled background tabs may pause rAF-driven timelines
    window.setTimeout(finish, 6500);
    tlRef.current = tl;
    tl.to(q(".env-cta"), { autoAlpha: 0, y: 12, duration: 0.4 }, 0)
      .to(q(".seal"), { scale: 0.94, duration: 0.12, ease: "power1.in" }, 0)
      .to(q(".seal"), { scale: 1.03, duration: 0.25, ease: "back.out(3)" }, 0.12)
      .to(q(".flap-pivot"), { rotateX: 180, duration: 1.35, ease: "power2.inOut" }, 0.4)
      .set(q(".flap-pivot"), { zIndex: 1 }, 1.05)
      .to(q(".flap-shadow"), { opacity: 0, duration: 0.6 }, 0.5)
      .to(q(".card"), { yPercent: -36, duration: 1.3, ease: "power3.out" }, 1.55)
      .to(q(".env-scene"), { scale: 1.08, yPercent: 6, duration: 1.3, ease: "power2.out" }, 1.55)
      // the card becomes the page: envelope fades away, paper fills the screen
      .to(q(".base, .interior, .pocket, .flap-pivot"), { autoAlpha: 0, duration: 0.8, ease: "power1.out" }, 2.7)
      .to(q(".intro-bg, .skip"), { autoAlpha: 0, duration: 0.9, ease: "power1.out" }, 2.7)
      .to(root.current, { backgroundColor: "#fdf8ee", duration: 0.9, ease: "power1.out" }, 2.7)
      .to(q(".card-inner"), { autoAlpha: 0, duration: 0.6, ease: "power1.in" }, 3.05)
      .to(q(".card"), { scale: 3.4, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 1.05, ease: "power2.in" }, 3.05)
      .to(root.current, { autoAlpha: 0, duration: 0.35, ease: "none" }, 3.8);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    if (skipped.current) return;
    skipped.current = true;
    started.current = true;
    tlRef.current?.kill();
    finish();
  };

  return (
    <div className="intro" ref={root} role="dialog" aria-modal="true" aria-label="Ftesa — zarfi">
      <div className="intro-bg" aria-hidden="true" />
      <button className="skip" type="button" onClick={skip}>
        Kalo hyrjen
      </button>

      <div className="env-wrap">
        <div className="env-scene">
          <div className="layer base" aria-hidden="true" />
          <div className="layer interior" aria-hidden="true" />
          <div className="card" aria-hidden={!opening}>
            <div className="card-inner">
              <span className="card-mono">
                {w.first[0]}
                <i className="amp">&amp;</i>
                {w.second[0]}
              </span>
              <span className="card-names">
                {w.first} <span className="amp">&amp;</span> {w.second}
              </span>
            </div>
          </div>
          <div className="layer pocket" aria-hidden="true" />
          <div className="flap-pivot">
            <div className="flap-shadow" aria-hidden="true" />
            <div className="flap-front" aria-hidden="true" />
            <div className="flap-back" aria-hidden="true" />
            <button type="button" className="seal" onClick={open} aria-label="Hap ftesën — prek vulën" disabled={opening}>
              <span className="sr-only">Hap ftesën</span>
            </button>
          </div>
        </div>

        <div className="env-cta">
          <svg className="divider small" viewBox="0 0 120 12" aria-hidden="true">
            <path d="M2 6H50M70 6H118" stroke="currentColor" strokeWidth="1" />
            <path d="M60 1l4 5-4 5-4-5z" fill="currentColor" />
          </svg>
          <button type="button" className="open-btn" onClick={open} disabled={opening}>
            Hap Ftesën <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
