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
const IconFigmaRaw = (props) => (
  <svg viewBox="0 0 15 15" width="100%" height="100%" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" stroke="currentColor" strokeWidth="0.2" d="M7.00005 2.04999H5.52505C4.71043 2.04999 4.05005 2.71037 4.05005 3.52499C4.05005 4.33961 4.71043 4.99999 5.52505 4.99999H7.00005V2.04999ZM7.00005 1.04999H8.00005H9.47505C10.842 1.04999 11.95 2.15808 11.95 3.52499C11.95 4.33163 11.5642 5.04815 10.9669 5.49999C11.5642 5.95184 11.95 6.66836 11.95 7.475C11.95 8.8419 10.842 9.95 9.47505 9.95C8.92236 9.95 8.41198 9.76884 8.00005 9.46266V9.95L8.00005 11.425C8.00005 12.7919 6.89195 13.9 5.52505 13.9C4.15814 13.9 3.05005 12.7919 3.05005 11.425C3.05005 10.6183 3.43593 9.90184 4.03317 9.44999C3.43593 8.99814 3.05005 8.28163 3.05005 7.475C3.05005 6.66836 3.43594 5.95184 4.03319 5.5C3.43594 5.04815 3.05005 4.33163 3.05005 3.52499C3.05005 2.15808 4.15814 1.04999 5.52505 1.04999H7.00005ZM8.00005 2.04999V4.99999H9.47505C10.2897 4.99999 10.95 4.33961 10.95 3.52499C10.95 2.71037 10.2897 2.04999 9.47505 2.04999H8.00005ZM5.52505 8.94998H7.00005L7.00005 7.4788L7.00005 7.475L7.00005 7.4712V6H5.52505C4.71043 6 4.05005 6.66038 4.05005 7.475C4.05005 8.28767 4.70727 8.94684 5.5192 8.94999L5.52505 8.94998ZM4.05005 11.425C4.05005 10.6123 4.70727 9.95315 5.5192 9.94999L5.52505 9.95H7.00005L7.00005 11.425C7.00005 12.2396 6.33967 12.9 5.52505 12.9C4.71043 12.9 4.05005 12.2396 4.05005 11.425ZM8.00005 7.47206C8.00164 6.65879 8.66141 6 9.47505 6C10.2897 6 10.95 6.66038 10.95 7.475C10.95 8.28962 10.2897 8.95 9.47505 8.95C8.66141 8.95 8.00164 8.29121 8.00005 7.47794V7.47206Z" />
  </svg>
);
export const IconFigma = IconFigmaRaw;
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
export const IconStar = wrap(<><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 18.6 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" /></>);
export const IconFilter = wrap(<><path d="M3 5h18l-7 8v6l-4-2v-4z" /></>);
export const IconUserPlus = wrap(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></>);
