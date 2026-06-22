# Paramount Property Restoration — Sitio 3.0 (reset limpio)

Proyecto Astro nuevo que materializa el blueprint SEO 2.0 y el diseño editorial.

## Arrancar

```bash
npm install
npm run dev      # desarrollo en http://localhost:4321
npm run build    # build de producción a /dist
```

## Qué incluye (Fase 0 + Fase 1)

- **Andamiaje limpio**: 1 layout base, componentes Header/Footer, `company.ts` como única fuente de datos.
- **Home completa** con el diseño editorial premium (Newsreader + Hanken Grotesk + Space Mono).
- **URLs del silo** en toda la navegación (`/restoration/water-damage/`, etc.) — no nombres de archivo.
- **Schema JSON-LD LocalBusiness** en el `<head>` (vía BaseLayout).
- **Sin claims de General Contractor** — solo credenciales reales (IICRC, Insured & Bonded, 24/7).

## Estructura

```
src/
├── layouts/BaseLayout.astro   → <head> SEO + schema JSON-LD + Header/Footer
├── components/Header.astro     → nav con dropdown de servicios (lee de company.ts)
├── components/Footer.astro     → footer (lee de company.ts)
├── data/company.ts             → ÚNICA fuente de datos del negocio + SILO de servicios
├── pages/index.astro           → Home
└── styles/global.css           → sistema de diseño editorial completo
public/app.js                   → interacciones (reveal, menú móvil, before/after)
```

## Pendientes (Fase 1 → siguientes)

- Reemplazar placeholders en `src/data/company.ts`: teléfono real, métricas (XXX), rating.
- Construir las páginas pillar (`/restoration/water-damage/`, etc.) — el diseño ya tiene la plantilla.
- Fase 2: páginas de las 11 ciudades reales.
- Logo e imágenes reales (hoy placeholders).
