export interface Service {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: string; // inline SVG string
  points: string[];
}

const icon = (path: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

export const services: Service[] = [
  {
    id: 'web-design',
    title: 'Web Design',
    short: 'Modern, accessible designs that reflect your brand and convert visitors into customers.',
    description:
      'Bespoke, responsive designs built mobile-first. Every layout is crafted for clarity, accessibility and conversion — so your site looks the part and gets results on any device.',
    icon: icon('<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/>'),
    points: [
      'Custom, brand-aligned design',
      'Mobile-first & fully responsive',
      'WCAG accessibility built in',
      'Conversion-focused layouts',
    ],
  },
  {
    id: 'web-hosting',
    title: 'Web Hosting',
    short: 'Blazing-fast, secure hosting on Cloudflare\u2019s global edge network.',
    description:
      'I deploy and manage your site on Cloudflare Pages — served from hundreds of locations worldwide with free SSL, DDoS protection and effortless scaling.',
    icon: icon('<rect x="3" y="4" width="18" height="8" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 8h.01M7 17h.01"/>'),
    points: [
      'Global edge delivery',
      'Free, automatic SSL',
      'DDoS protection & WAF',
      'Managed deploys & backups',
    ],
  },
  {
    id: 'seo',
    title: 'SEO Optimisation',
    short: 'Technical SEO and Core Web Vitals tuning that helps you climb the rankings.',
    description:
      'From semantic markup and structured data to sitemaps and lightning-fast Core Web Vitals, I make sure search engines can find, understand and rank your site.',
    icon: icon('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    points: [
      'Technical SEO audit',
      'Core Web Vitals tuning',
      'Structured data & metadata',
      'Sitemaps & indexing',
    ],
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    short: 'Clear, persuasive copy and content that speaks to your audience.',
    description:
      'Words matter. I help you craft clear, on-brand copy and ongoing content — blog posts, service pages and more — that engages readers and supports your SEO.',
    icon: icon('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
    points: [
      'Website & landing page copy',
      'Blog & article writing',
      'SEO keyword integration',
      'Brand tone of voice',
    ],
  },
];
