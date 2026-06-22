# Integración CompanyCam (fotos de proyectos)

Trae las fotos reales de tus proyectos de CompanyCam al sitio, en build time
(se descargan y quedan locales, rápidas y buenas para SEO).

## Primera vez: configurar el token

1. En CompanyCam: **Settings → Integrations → API** (o Developer Settings).
   Requiere plan **Pro/Premium/Elite** y rol **Admin**. Genera un token.
2. En la raíz del proyecto, copia la plantilla y pega tu token:
   ```
   copy .env.example .env
   ```
   Abre `.env` y reemplaza `pega_aqui_tu_token` por el token real.
   (El archivo `.env` está en `.gitignore`: nunca se sube a git.)

## Traer las fotos

```
npm run sync:photos
```

Esto:
- Lista tus proyectos de CompanyCam.
- Saca la **ciudad** de la dirección de cada proyecto y la mapea a las 15 ciudades del sitio.
- Descarga las fotos (omite las marcadas como `internal` en CompanyCam).
- Las guarda en `public/companycam/<ciudad>/`.
- Genera `src/data/companycam.json` con el mapeo ciudad → fotos.

Vuelve a correrlo cuando agregues proyectos nuevos en CompanyCam.

## Cuando el CEO añada los tags de servicio

Hoy las fotos se mapean por **ciudad** (desde la dirección). Para mapearlas también
por **servicio** (water/mold/fire/storm), cuando existan tags en CompanyCam:

1. Abre `scripts/fetch-companycam.mjs`.
2. En `SERVICE_TAGS` ya están los nombres de tag esperados (water, mold, fire, storm…).
3. Avísame y conecto la lectura de tags por foto (`GET /projects/{id}/photos?tag_ids=...`),
   para que cada foto sepa a qué pillar pertenece.

## Qué NO hace (a propósito)

- No publica fotos marcadas `internal` en CompanyCam.
- No sube nada a CompanyCam: solo lee.
- No corre en cada build automático (lo corres tú cuando quieres refrescar).
