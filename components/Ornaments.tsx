export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 240 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 12 H92" />
        <path d="M148 12 H236" />
        <path d="M92 12 c8 -9 18 -9 22 0 c-4 6 -12 6 -14 0" />
        <path d="M148 12 c-8 -9 -18 -9 -22 0 c4 6 12 6 14 0" />
      </g>
      <path d="M120 4 l5 8 -5 8 -5 -8z" fill="currentColor" />
      <circle cx="104" cy="12" r="1.6" fill="currentColor" />
      <circle cx="136" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

const paths: Record<string, React.ReactNode> = {
  calendar: (<><rect x="4" y="6" width="24" height="22" rx="2" /><path d="M4 12h24M10 3v6M22 3v6M9 17h3M15 17h3M21 17h2M9 22h3M15 22h3" /></>),
  clock: (<><circle cx="16" cy="16" r="12" /><path d="M16 9v7l5 3" /></>),
  toast: (<><path d="M8 4h7l-1 9a3.5 3.5 0 0 1-5 0z" /><path d="M11.5 15v10M8 26h7" /><path d="M18 6l7 1.5-2.6 8.6a3.5 3.5 0 0 1-4.9-1z" /><path d="M20 17l-2 9M16 27l5 1" /></>),
  rings: (<><circle cx="12" cy="19" r="8" /><circle cx="20" cy="19" r="8" /><path d="M10 7l2-3 2 3-2 2z" /></>),
  dinner: (<><path d="M4 23h24M6 23a10 10 0 0 1 20 0" /><circle cx="16" cy="11" r="1.5" /><path d="M3 27h26" /></>),
  music: (<><path d="M12 24V7l14-3v17" /><circle cx="9" cy="24" r="3.2" /><circle cx="23" cy="21" r="3.2" /></>),
  pin: (<><path d="M16 29s9-9 9-16a9 9 0 0 0-18 0c0 7 9 16 9 16z" /><circle cx="16" cy="13" r="3" /></>),
  heart: (<path d="M16 27S4 19.5 4 11.5A6 6 0 0 1 16 9a6 6 0 0 1 12 2.5C28 19.5 16 27 16 27z" />),
};

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.heart}
    </svg>
  );
}

export function Corner({ side }: { side: "left" | "right" }) {
  return <span className={`floral floral-${side}`} aria-hidden="true" />;
}
