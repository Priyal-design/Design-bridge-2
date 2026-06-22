// Minimal inline stroke icons
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const wrap = (children) => (props) =>
  (
    <svg viewBox="0 0 24 24" width="100%" height="100%" {...base} {...props}>
      {children}
    </svg>
  );

export const IconHome = wrap(<><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>);
export const IconHub = wrap(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
export const IconProject = wrap(<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>);
export const IconChat = wrap(<><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" /></>);
export const IconDecision = wrap(<><path d="M12 3v4" /><path d="M12 21v-4" /><circle cx="12" cy="12" r="3" /><path d="M5 12H3" /><path d="M21 12h-2" /><path d="m7 7-1.5-1.5" /><path d="m18.5 18.5-1.5-1.5" /></>);
export const IconGraph = wrap(<><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M6.7 7.3 10.5 16.5M17.3 7.3 13.5 16.5M7 6h10" /></>);
export const IconAdd = wrap(<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>);
export const IconRocket = wrap(<><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5C18 1 22 2 22 2s1 4-2.5 7.5L13 16l-5-5z" /><circle cx="15" cy="9" r="1.2" /></>);
export const IconFigma = wrap(<><circle cx="12" cy="12" r="3" /><path d="M9 5h3v4H9a2 2 0 1 1 0-4z" /><path d="M12 5h3a2 2 0 1 1 0 4h-3" /><path d="M9 9h3v4H9a2 2 0 1 1 0-4z" /><path d="M9 13h3v3a2 2 0 1 1-3-1.7z" /></>);
export const IconSearch = wrap(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>);
export const IconBell = wrap(<><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 0 0 4 0" /></>);
export const IconSparkle = wrap(<><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" /></>);
export const IconArrow = wrap(<><path d="M5 12h14M13 6l6 6-6 6" /></>);
export const IconCheck = wrap(<><path d="M20 6 9 17l-5-5" /></>);
export const IconPlay = wrap(<><path d="M6 4l14 8-14 8z" /></>);
export const IconLink = wrap(<><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>);
export const IconGauge = wrap(<><path d="M4 14a8 8 0 1 1 16 0" /><path d="M12 14l4-3" /><circle cx="12" cy="14" r="1.2" /></>);
export const IconBolt = wrap(<><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></>);
export const IconClose = wrap(<><path d="M6 6l12 12M18 6 6 18" /></>);
