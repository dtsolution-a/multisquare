// Shared icon set for M2's service offerings — used by both the homepage
// "Core Services" teaser and the full /services page, so the same service
// always gets the same mark across the site.
export const ICONS = {
  registration: (
    <>
      <rect x="5" y="7" width="22" height="18" rx="3" />
      <circle cx="12" cy="16" r="3" />
      <path d="M17 12h8M17 16h8M17 20h5" strokeLinecap="round" />
    </>
  ),
  compliance: (
    <path
      d="M16 4l10 3.6v7.2c0 7-4.4 11.3-10 13.2-5.6-1.9-10-6.2-10-13.2V7.6L16 4Z M11.3 16.2l3 3 6.4-6.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  structuring: (
    <>
      <path
        d="M16 6v20M10 26h12M6 10h20M9 10L6 16M9 10L12 16M6 16a3 3 0 0 0 6 0M23 10L20 16M23 10L26 16M20 16a3 3 0 0 0 6 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="5" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  evaluation: (
    <>
      <path d="M5 27V5M5 27h23" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="18" width="4" height="6" />
      <rect x="16" y="12" width="4" height="12" />
      <rect x="23" y="7" width="3" height="17" />
    </>
  ),
  diligence: (
    <>
      <circle cx="13" cy="13" r="8" />
      <path d="M19 19L27 27" strokeLinecap="round" />
      <path d="M9.5 13l2.4 2.4L17 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cost: (
    <>
      <rect x="7" y="4" width="18" height="24" rx="3" />
      <rect x="10" y="7" width="12" height="5" rx="1" />
      <path
        d="M11 16.5h.01M16 16.5h.01M21 16.5h.01M11 20.5h.01M16 20.5h.01M21 20.5h.01M11 24.5h.01M16 24.5h.01"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
    </>
  ),
  vcfo: (
    <>
      <rect x="5" y="12" width="22" height="14" rx="2" />
      <path d="M12 12V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h22" />
      <path d="M9 23.5l3.5-3.5 3 2.5 5.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  startup: (
    <>
      <path d="M16 4c5 3 7 8 6 15l-6 7-6-7c-1-7 1-12 6-15Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="14" r="2.2" />
      <path
        d="M9 22c-3 1-4 4-4 7 3 0 6-1 7-4M23 22c3 1 4 4 4 7-3 0-6-1-7-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  cbcr: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M4 16h24M16 4v24" strokeLinecap="round" />
      <ellipse cx="16" cy="16" rx="5.2" ry="12" />
    </>
  ),
};
