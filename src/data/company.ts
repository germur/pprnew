// Única fuente de verdad de los datos del negocio.
// Se usa en TODOS los componentes. Nunca hardcodear teléfono/dirección.
export const COMPANY = {
  name: "Paramount Property Restoration",
  shortName: "Paramount",
  // Placeholders confirmados por el usuario (reemplazar con datos reales):
  phone: "(XXX) XXX-XXXX",
  phoneRaw: "+10000000000",
  email: "services@paramountpropertyrestoration.com",
  // Alcance y posicionamiento (del blueprint SEO 2.0):
  tagline: "South Florida's 24/7 restoration response",
  region: "South Florida",
  // Credenciales REALES (sin claims de General Contractor, riesgo legal):
  credentials: ["IICRC Certified", "Fully Insured & Bonded", "24/7 Response"],
  responseTime: "60 minutes",
  // Métricas placeholder (reemplazar):
  rating: "X.X",
  reviewCount: "XXX",
  projectsRestored: "XXX+",
  social: {
    linkedin: "https://www.linkedin.com/company/paramount-property-restoration",
    facebook: "https://www.facebook.com/paramountpropertyrestoration",
    instagram: "https://www.instagram.com/paramountpropertyrestoration",
  },
} as const;

// SILO 2.0: los servicios y sus URLs canónicas (del blueprint validado).
export const SERVICES = [
  { slug: "water-damage",    name: "Water Damage Restoration", short: "Water Damage",      url: "/restoration/water-damage/",    vol: "135K", nearMe: "246K", icon: "water",      desc: "Extraction, drying & structural restoration" },
  { slug: "mold-remediation",name: "Mold Remediation",         short: "Mold Remediation",  url: "/restoration/mold-remediation/",vol: "165K", nearMe: "60K",  icon: "mold",       desc: "Containment, removal & clearance" },
  { slug: "fire-damage",     name: "Fire & Smoke Damage",      short: "Fire & Smoke",      url: "/restoration/fire-damage/",     vol: "135K", nearMe: "49K",  icon: "fire",       desc: "Soot, smoke & content recovery" },
  { slug: "storm-damage",    name: "Storm & Hurricane Damage", short: "Storm & Hurricane", url: "/restoration/storm-damage/",    vol: "110K", nearMe: "60K",  icon: "storm",      desc: "Water intrusion, tarping & repair" },
  { slug: "mold-testing",    name: "Mold Testing & Inspection",short: "Mold Testing",      url: "/restoration/mold-testing/",    vol: "66K",  nearMe: "",     icon: "testing",    desc: "Independent inspection & lab analysis" },
  { slug: "commercial",      name: "Commercial Restoration",   short: "Commercial",        url: "/commercial/",                  vol: "B2B",  nearMe: "",     icon: "commercial", desc: "Large-loss & property management" },
] as const;

// CIUDADES (Eje B, Product-Led local).
// Mapa REAL combinando el blueprint (hoja 5) con los proyectos verificados en
// CompanyCam. `hasProjects: true` = hay proyectos reales documentados con fotos
// (prueba social fuerte). Las demás son targets del sheet sin proyectos aún.
export const REGIONS = [
  {
    name: "Miami-Dade",
    cities: [
      { name: "Miami",          slug: "miami",          hasProjects: true },
      { name: "Doral",          slug: "doral",          hasProjects: true },
      { name: "Hialeah",        slug: "hialeah",        hasProjects: true },
      { name: "Miami Gardens",  slug: "miami-gardens",  hasProjects: true },
      { name: "Homestead",      slug: "homestead",      hasProjects: true },
      { name: "Sunny Isles Beach", slug: "sunny-isles-beach", hasProjects: true },
      { name: "Coral Gables",   slug: "coral-gables" },
    ],
  },
  {
    name: "Broward",
    cities: [
      { name: "Fort Lauderdale", slug: "fort-lauderdale" },
      { name: "Hollywood",       slug: "hollywood",       hasProjects: true },
      { name: "Weston",          slug: "weston",          hasProjects: true },
      { name: "Coral Springs",   slug: "coral-springs",   hasProjects: true },
      { name: "Sunrise",         slug: "sunrise",         hasProjects: true },
      { name: "Davie",           slug: "davie",           hasProjects: true },
      { name: "Cooper City",     slug: "cooper-city",     hasProjects: true },
      { name: "Deerfield Beach", slug: "deerfield-beach" },
    ],
  },
  {
    name: "Palm Beach",
    cities: [
      { name: "Boca Raton",      slug: "boca-raton",      hasProjects: true },
      { name: "Boynton Beach",   slug: "boynton-beach",   hasProjects: true },
      { name: "Wellington",      slug: "wellington",      hasProjects: true },
      { name: "Delray Beach",    slug: "delray-beach" },
      { name: "West Palm Beach", slug: "west-palm-beach" },
    ],
  },
  {
    name: "Southwest Florida",
    cities: [
      { name: "Fort Myers",     slug: "fort-myers",     hasProjects: true },
      { name: "Bonita Springs", slug: "bonita-springs", hasProjects: true },
      { name: "Alva",           slug: "alva",           hasProjects: true },
      { name: "Naples",         slug: "naples" },
      { name: "Estero",         slug: "estero" },
      { name: "Cape Coral",     slug: "cape-coral" },
      { name: "Marco Island",   slug: "marco-island" },
      { name: "Sarasota",       slug: "sarasota",       hasProjects: true },
    ],
  },
  {
    name: "Central Florida",
    cities: [
      { name: "Orlando",        slug: "orlando",        hasProjects: true },
      { name: "Kissimmee",      slug: "kissimmee",      hasProjects: true },
      { name: "St. Cloud",      slug: "st-cloud",       hasProjects: true },
      { name: "Winter Springs", slug: "winter-springs", hasProjects: true },
    ],
  },
  {
    name: "Treasure Coast",
    cities: [
      { name: "Stuart",         slug: "stuart",         hasProjects: true },
      { name: "Port St. Lucie", slug: "port-st-lucie" },
      { name: "Hobe Sound",     slug: "hobe-sound" },
    ],
  },
] as const;

// Total de ciudades, derivado (para no hardcodear el número en copy).
export const CITY_COUNT = REGIONS.reduce((n, r) => n + r.cities.length, 0);
