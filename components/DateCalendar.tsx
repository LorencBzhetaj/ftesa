"use client";
import { useEffect, useState } from "react";
import type { Wedding } from "@/lib";

const WEEK = ["Hë", "Ma", "Më", "En", "Pr", "Sh", "Di"];

function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  if (now === null) return null;
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60, done: s === 0 };
}

function icsFile(w: Wedding) {
  const start = new Date(w.startsAt);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const esc = (t: string) => t.replace(/([,;\\])/g, "\\$1");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ftesa//SQ",
    "BEGIN:VEVENT",
    `UID:fejesa-${w.iso}@ftesa`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `SUMMARY:${esc(`Fejesa e ${w.names}`)}`,
    `LOCATION:${esc(w.venue.name)}`,
    ...(w.venue.mapsUrl ? [`URL:${w.venue.mapsUrl}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export default function DateCalendar({ w }: { w: Wedding }) {
  const cd = useCountdown(new Date(w.startsAt).getTime());

  // Monday-first month grid
  const first = new Date(Date.UTC(w.year, w.month - 1, 1)).getUTCDay();
  const lead = (first + 6) % 7;
  const days = new Date(Date.UTC(w.year, w.month, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  const addToCalendar = () => {
    const blob = new Blob([icsFile(w)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fejesa-adrian-melisa.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="block when-panel" aria-labelledby="when-h">
      <div className="when-inner reveal">
        <h2 id="when-h" className="when-kicker">Ruajeni datën</h2>
        <p className="when-date">
          {w.weekday}, {w.date} · Ora {w.time}
        </p>
        <p className="countdown" aria-live="off">
          {cd === null ? (
            " "
          ) : cd.done ? (
            "Dita ka ardhur!"
          ) : (
            <>
              <span><b>{cd.d}</b> ditë</span>
              <span><b>{cd.h}</b> orë</span>
              <span><b>{cd.m}</b> min</span>
              <span><b>{cd.s}</b> sek</span>
            </>
          )}
        </p>

        <div className="cal" role="group" aria-label={`Kalendari ${w.monthName} ${w.year}`}>
          <p className="cal-title">
            {w.monthName} {w.year}
          </p>
          <div className="cal-week" aria-hidden="true">
            {WEEK.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="cal-grid">
            {cells.map((n, i) =>
              n === null ? (
                <span key={"e" + i} aria-hidden="true" />
              ) : n === w.day ? (
                <span key={n} className="cal-day is-day" aria-label={`${n} ${w.monthName} — dita e fejesës`}>
                  <svg viewBox="0 0 32 30" aria-hidden="true">
                    <path d="M16 29S2 20.5 2 10.5A7.5 7.5 0 0 1 16 6a7.5 7.5 0 0 1 14 4.5C30 20.5 16 29 16 29z" />
                  </svg>
                  <b>{n}</b>
                </span>
              ) : (
                <span key={n} className="cal-day">
                  {n}
                </span>
              ),
            )}
          </div>
        </div>

        <button type="button" className="cal-add" onClick={addToCalendar}>
          Shto në Kalendar
        </button>
      </div>
    </section>
  );
}
