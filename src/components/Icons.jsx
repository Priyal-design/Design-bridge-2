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
export const IconFile = wrap(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></>);
export const IconChat = wrap(<><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" /></>);
export const IconDecision = wrap(<><path d="M12 3v4" /><path d="M12 21v-4" /><circle cx="12" cy="12" r="3" /><path d="M5 12H3" /><path d="M21 12h-2" /><path d="m7 7-1.5-1.5" /><path d="m18.5 18.5-1.5-1.5" /></>);
export const IconGraph = wrap(<><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M6.7 7.3 10.5 16.5M17.3 7.3 13.5 16.5M7 6h10" /></>);
export const IconAdd = wrap(<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>);
export const IconPlus = wrap(<><path d="M12 5v14M5 12h14" /></>);
export const IconRocket = wrap(<><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5C18 1 22 2 22 2s1 4-2.5 7.5L13 16l-5-5z" /><circle cx="15" cy="9" r="1.2" /></>);
const IconFigmaRaw = (props) => (
  <svg viewBox="0 0 15 15" width="100%" height="100%" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" stroke="currentColor" strokeWidth="0.2" d="M7.00005 2.04999H5.52505C4.71043 2.04999 4.05005 2.71037 4.05005 3.52499C4.05005 4.33961 4.71043 4.99999 5.52505 4.99999H7.00005V2.04999ZM7.00005 1.04999H8.00005H9.47505C10.842 1.04999 11.95 2.15808 11.95 3.52499C11.95 4.33163 11.5642 5.04815 10.9669 5.49999C11.5642 5.95184 11.95 6.66836 11.95 7.475C11.95 8.8419 10.842 9.95 9.47505 9.95C8.92236 9.95 8.41198 9.76884 8.00005 9.46266V9.95L8.00005 11.425C8.00005 12.7919 6.89195 13.9 5.52505 13.9C4.15814 13.9 3.05005 12.7919 3.05005 11.425C3.05005 10.6183 3.43593 9.90184 4.03317 9.44999C3.43593 8.99814 3.05005 8.28163 3.05005 7.475C3.05005 6.66836 3.43594 5.95184 4.03319 5.5C3.43594 5.04815 3.05005 4.33163 3.05005 3.52499C3.05005 2.15808 4.15814 1.04999 5.52505 1.04999H7.00005ZM8.00005 2.04999V4.99999H9.47505C10.2897 4.99999 10.95 4.33961 10.95 3.52499C10.95 2.71037 10.2897 2.04999 9.47505 2.04999H8.00005ZM5.52505 8.94998H7.00005L7.00005 7.4788L7.00005 7.475L7.00005 7.4712V6H5.52505C4.71043 6 4.05005 6.66038 4.05005 7.475C4.05005 8.28767 4.70727 8.94684 5.5192 8.94999L5.52505 8.94998ZM4.05005 11.425C4.05005 10.6123 4.70727 9.95315 5.5192 9.94999L5.52505 9.95H7.00005L7.00005 11.425C7.00005 12.2396 6.33967 12.9 5.52505 12.9C4.71043 12.9 4.05005 12.2396 4.05005 11.425ZM8.00005 7.47206C8.00164 6.65879 8.66141 6 9.47505 6C10.2897 6 10.95 6.66038 10.95 7.475C10.95 8.28962 10.2897 8.95 9.47505 8.95C8.66141 8.95 8.00164 8.29121 8.00005 7.47794V7.47206Z" />
  </svg>
);
export const IconFigma = IconFigmaRaw;
export const IconJira = (props) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" {...props}>
    <path d="M12 3 21 12 12 21 3 12 12 3Z" fill="currentColor" opacity="0.16" />
    <path d="M12 3 21 12 12 21 3 12 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
export const IconSearch = wrap(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>);
export const IconBell = wrap(<><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 0 0 4 0" /></>);
export const IconSparkle = wrap(<><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" /></>);
export const IconArrow = wrap(<><path d="M5 12h14M13 6l6 6-6 6" /></>);
export const IconCheck = wrap(<><path d="M20 6 9 17l-5-5" /></>);
export const IconPlay = wrap(<><path d="M6 4l14 8-14 8z" /></>);
export const IconLink = wrap(<><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>);
export const IconExternalLink = wrap(<><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5" /></>);
export const IconGauge = wrap(<><path d="M4 14a8 8 0 1 1 16 0" /><path d="M12 14l4-3" /><circle cx="12" cy="14" r="1.2" /></>);
export const IconBolt = wrap(<><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></>);
export const IconClose = wrap(<><path d="M6 6l12 12M18 6 6 18" /></>);
export const IconCopy = wrap(<><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" /></>);
export const IconStar = wrap(<><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 18.6 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" /></>);
export const IconRuler = wrap(<><rect x="3" y="9" width="18" height="8" rx="1.5" /><path d="M6 9v4M9 9v2M12 9v4M15 9v2M18 9v4" strokeWidth="1.5" /></>);
export const IconLock = wrap(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>);
export const IconAttach = wrap(<><path d="M12 5v14M5 12h14" /></>);
export const IconFilter = wrap(<><path d="M3 5h18l-7 8v6l-4-2v-4z" /></>);
export const IconUserPlus = wrap(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></>);
export const IconUser = wrap(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>);
export const IconCoach = wrap(<><circle cx="8" cy="8" r="3" /><path d="M3.5 21v-2.5A4.5 4.5 0 0 1 8 14h1" /><path d="M14 5h6v8h-6z" /><path d="M14 9h6" /><path d="M12 15l3-2" /><path d="M17 16v5" /><path d="M14 21h6" /></>);
export const IconUfo = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.36662 7.59895C6.88733 5.11517 9.09023 3.25 11.7288 3.25H12.2712C14.9098 3.25 17.1127 5.11517 17.6334 7.59895C18.9914 7.96685 20.1722 8.47324 21.0543 9.09778C22.0199 9.78151 22.75 10.7019 22.75 11.8262C22.75 12.6633 22.3404 13.3932 21.7409 13.9846C21.1442 14.5735 20.3191 15.0693 19.3599 15.4696C19.3498 15.4738 19.3396 15.4781 19.3294 15.4823L20.1708 17.1645C20.3561 17.5349 20.206 17.9855 19.8355 18.1708C19.465 18.3561 19.0145 18.206 18.8292 17.8355L17.9005 15.9787C16.401 16.4127 14.638 16.682 12.75 16.7386V19C12.75 19.4142 12.4142 19.75 12 19.75C11.5858 19.75 11.25 19.4142 11.25 19V16.7386C9.36201 16.682 7.59897 16.4127 6.09952 15.9787L5.17077 17.8355C4.98548 18.206 4.53495 18.3561 4.16449 18.1708C3.79404 17.9855 3.64393 17.5349 3.82923 17.1645L4.67064 15.4823C4.66043 15.4781 4.65023 15.4738 4.64006 15.4696C3.68091 15.0693 2.85581 14.5735 2.25907 13.9846C1.65964 13.3932 1.25 12.6633 1.25 11.8262C1.25 10.7019 1.98006 9.78151 2.94573 9.09778C3.8278 8.47324 5.00857 7.96685 6.36662 7.59895ZM6.31758 9.1738C5.27525 9.49234 4.425 9.88832 3.81252 10.322C3.02544 10.8793 2.75 11.4057 2.75 11.8262C2.75 12.1417 2.9 12.5098 3.31263 12.9169C3.72794 13.3267 4.36731 13.7303 5.2178 14.0853C6.91556 14.7939 9.31299 15.2499 12 15.2499C14.687 15.2499 17.0844 14.7939 18.7822 14.0853C19.6327 13.7303 20.2721 13.3267 20.6874 12.9169C21.1 12.5098 21.25 12.1417 21.25 11.8262C21.25 11.4057 20.9746 10.8793 20.1875 10.322C19.575 9.88832 18.7247 9.49234 17.6824 9.1738C17.6121 9.39507 17.4763 9.62375 17.2285 9.79611C16.6273 10.2142 15.2456 10.75 12 10.75C8.75443 10.75 7.37265 10.2142 6.77147 9.79611C6.52367 9.62375 6.38791 9.39507 6.31758 9.1738ZM7.751 8.63868C8.13808 8.84517 9.25423 9.25 12 9.25C14.7458 9.25 15.8619 8.84517 16.249 8.63868C16.2011 6.48287 14.4385 4.75 12.2712 4.75H11.7288C9.56146 4.75 7.79889 6.48287 7.751 8.63868ZM16.2497 8.73583C16.2497 8.73582 16.2497 8.73538 16.2498 8.73451L16.2497 8.73583Z" fill="currentColor"/>
    <circle cx="12" cy="13" r="1" fill="currentColor"/>
    <circle cx="7" cy="12" r="1" fill="currentColor"/>
    <circle cx="17" cy="12" r="1" fill="currentColor"/>
  </svg>
);
