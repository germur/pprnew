# Auditoría técnica y de contenidos — Paramount

Fecha: 23 de octubre de 2026, America/Bogota. Base: `germur/pprnew`, commit `1da7e90` de `main`.

La base visual es coherente y el sitio está mucho más enfocado en restauración. Las prioridades son hacer fiable la captación, corregir destinos que no cumplen lo prometido y transformar la prueba de trabajo en información útil para quien necesita ayuda. No hace falta empezar el diseño desde cero.

## Alcance y evidencia

- Compilación de producción e inventario de los **54 HTML**, incluyendo **35 páginas de ciudades** y **52 URLs en el sitemap**.
- Revisión del código compartido, siete formularios, navegación, metadatos, redirecciones declaradas, páginas de servicio, artículo y plantillas locales.
- Inspección en navegador de portada, contacto y servicio de agua publicados. Las versiones del buscador de algunas páginas estaban desactualizadas; para confirmar su versión se utilizó el navegador y el código de `pprnew`.
- [Inventario inicial](before.json) y [posterior a las correcciones](after.json), reproducibles con [el inventario de HTML](../../scripts/audit-built-site.py).
- No se enviaron solicitudes a producción ni se verificaron notificaciones privadas de Netlify. No se accedió a GA4, Search Console, configuración de hosting, expedientes de clientes ni base de datos del estimador. No es una auditoría de seguridad del estimador.
- La vista local compiló, pero el navegador conectado no pudo acceder a su dirección local. La revisión visual corresponde al sitio publicado; la propuesta requiere comprobarse en el deploy preview antes de integrar.
- No se atribuyen puntuaciones Lighthouse, datos de Core Web Vitals, tasas de conversión, posiciones en Google ni cumplimiento WCAG integral: no fueron medidos.

## Lo que ya funciona

La estructura estática genera las páginas correctamente. Todas las páginas inventariadas tienen un H1 y descripción; no se detectaron destinos internos inexistentes, fragmentos inexistentes, IDs duplicados ni imágenes sin atributo `alt` con el alcance del script. Esto no valida la calidad de cada texto alternativo ni que un destino existente sea el correcto.

Los datos del negocio se centralizan en `src/data/company.ts`, hay URLs de servicio claras, formatos WebP, dimensiones de imagen y carga diferida en numerosas imágenes secundarias. Las FAQ usan `details/summary`, que aporta interacción nativa. La fuente de fotografías contiene 240 entradas repartidas en 23 ciudades; su clasificación por tipo de pérdida y autorización editorial todavía deben comprobarse.

## Auditoría técnica

P0: afecta directamente a la recepción o medición de solicitudes. P1: afecta a tareas principales o visibilidad. P2: mejora de calidad y eficiencia. El esfuerzo es relativo: bajo, medio o alto.

| ID | Prioridad / esfuerzo | Hallazgo y evidencia | Efecto y acción | Estado en este PR |
|---|---|---|---|---|
| T01 | P0 / medio | `public/app.js` mostraba éxito y emitía `generate_lead` justo después de iniciar `fetch`, sin esperar ni comprobar HTTP. Afectaba a los siete formularios. | Un fallo podía parecer una solicitud recibida y contaminar conversiones. Esperar aceptación HTTP, tratar errores y permitir reintento conservando datos. | Corregido y probado. |
| T02 | P1 / bajo | 25 controles en siete formularios tenían etiquetas visuales sin asociación programática. | Asociar `for/id`, mensajes de validación y autocompletado. Facilita identificar campos con lector de pantalla. [Referencia WAI](https://www.w3.org/WAI/tutorials/forms/labels/). | Corregido. |
| T03 | P1 / bajo | Ninguno de los 54 HTML tenía un landmark `main`. | Añadir región principal y enlace para saltar la navegación repetida. | Corregido desde `BaseLayout`. |
| T04 | P1 / medio | El desplegable de servicios se abre con `:hover`; el botón no controla apertura por teclado. El menú móvil se oculta con `transform` y carece de `inert`, estado `aria-expanded` y cierre con Escape. Sus enlaces aparecieron en el árbol accesible de escritorio. | Usar un patrón de navegación con botón operable, estado explícito, gestión de foco y contenido cerrado fuera de la tabulación. Probar también al cambiar de tamaño. | Pendiente. `Header.astro`, `global.css`, `app.js`. |
| T05 | P1 / bajo | `.reveal` parte de `opacity:0` y depende de `IntersectionObserver` para mostrar contenido. | Si el script no carga, gran parte del contenido queda invisible salvo en la excepción de movimiento reducido. Mostrar contenido por defecto y activar animación como mejora progresiva. | Pendiente. |
| T06 | P2 / bajo | 404 y `/410-gone/` heredaban `index, follow`; el canonical de 404 apuntaba a `/404/`, aunque Astro genera `/404.html`. `robots.txt` bloqueaba rastrear `/410-gone/`. | Declarar `noindex` en ambas y canonical correcto. Permitir que el rastreador lea `noindex`. Esto no sustituye la respuesta HTTP de hosting. [Referencia Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing). | Corregido. El sitemap ya excluía errores; se añade filtro defensivo. |
| T07 | P2 / medio | `--ink-3: #8A97A3` sobre `--paper: #F4F2EC` da aproximadamente **2,67:1**. `.num-label` usa ese color y tamaño de 0,8rem. | Oscurecer el token de texto secundario donde aparece sobre fondo claro y medir estados reales. No aplicar este resultado a toda la paleta ni confundirlo con una auditoría WCAG completa. | Pendiente. |
| T08 | P2 / medio | Las fuentes se solicitan desde un `@import` remoto en CSS. Los héroes usan una imagen fija sin `srcset`; la portada pesa 215.836 bytes. | Medir primero en móvil y red limitada. Evaluar fuentes locales, menos variantes y tamaños responsivos. El mayor WebP del build pesa 387.266 bytes; no hay evidencia para afirmar que las imágenes sean por sí solas el principal cuello de botella. | Pendiente de medición. |
| T09 | P2 / medio | `BaseLayout` publica `LocalBusiness` y `og:type=website` en todos los tipos de página; no genera `Article/BlogPosting` para el artículo ni `Service` por servicio. | Añadir datos estructurados específicos que correspondan al contenido visible y permitan identificar autor, fecha y servicio. Validar con herramientas oficiales; no garantiza resultados enriquecidos. | Pendiente. |
| T10 | P1 / medio | El HTML declara Netlify Forms, pero su detección, bandeja y avisos no se pueden confirmar desde el repositorio. | En un entorno de prueba, comprobar una solicitud desde cada formulario hasta su recepción y notificación, además de GA4 DebugView. Un HTTP aceptado no demuestra una llamada ni una visita del equipo. [Referencia Netlify](https://docs.netlify.com/manage/forms/setup/). | Requiere validación operativa. |
| T11 | P2 / medio | `_redirects` contiene consolidaciones y reglas 410. El inventario local comprueba archivos, no el motor de Netlify ni los headers publicados. | Verificar en hosting una muestra de 301, 410 y 404, con y sin slash, y asegurar que un 410 devuelve el contenido previsto sin cadenas. | Pendiente. No se modificaron esas reglas. |

## Auditoría de contenidos y experiencia

| ID | Prioridad / esfuerzo | Hallazgo y evidencia concreta | Recomendación |
|---|---|---|---|
| C01 | P1 / bajo | En la portada, las tarjetas de agua y huracanes apuntan al artículo de moho. El hub de recursos envía consultas de huracanes y mold testing a agua. El artículo manda “Book a mold inspection” a agua. Los enlaces existen, pero fallan semánticamente. | Hacer inventario de título, intención y destino. Mientras no exista una guía específica, enlazar al servicio pertinente con una etiqueta que describa ese destino. No publicar tarjetas que prometan artículos inexistentes. |
| C02 | P1 / bajo | La portada muestra “No doorway pages”, “validated SEO blueprint” y “the proof that ranks”; el hub usa “The funnel, done right”. También hay rutas técnicas visibles en las tarjetas. | Sustituir instrucciones de estrategia por respuestas para el propietario: qué se hace, qué recibe y cuál es el siguiente paso. Las notas SEO pertenecen a documentación interna. |
| C03 | P1 / bajo | La sección de proyectos dice que se puede arrastrar un antes/después. El HTML contiene tres `proj-photo` estáticos y no un comparador `data-ba`. | Cambiar la instrucción a galería real o construir comparadores solo con pares verificados del mismo trabajo. Añadir problema, intervención y resultado autorizado. |
| C04 | P1 / medio | La portada sitúa el problema de moho en “two to three weeks”; agua y el artículo usan 24–48 horas. | Unificar el criterio editorial y evitar un plazo que sugiera que se puede esperar semanas. La EPA recomienda secar áreas y objetos afectados en 24–48 horas para prevenir crecimiento; no es una garantía de aparición exacta. [Guía EPA](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home). |
| C05 | P1 / medio | El artículo sobre salud declara revisión por un técnico sin identificar persona, fecha ni enlazar fuentes. | Documentar autor/revisor real y fechas; citar EPA/CDC para cada afirmación relevante. Separar el servicio de restauración de la evaluación de síntomas. Revisar también las promesas de independencia en testing según la operación real. |
| C06 | P1 / medio | 9 de las 35 páginas locales usan el mismo párrafo de fallback y riesgos genéricos; 12 no tienen fotos en el JSON actual. Hay banderas `hasProjects` que no equivalen a evidencia publicada. | Priorizar contenido local sustentado, sin inventar oficina, cuadrilla ni plazo. La falta de foto no obliga a eliminar una ciudad: verificar cobertura real y aportar información propia. |
| C07 | P2 / medio | Se presentan 35 ciudades como “South Florida” aunque la lista contiene Central Florida, Orlando y Kissimmee. `CITY_COUNT` existe, pero varias páginas repiten el 35 literalmente. | Definir una descripción geográfica fiel, distinguir base de Miami y zonas atendidas, derivar la cifra y condicionar disponibilidad a ubicación. |
| C08 | P1 / medio | En la captura publicada de escritorio, el titular de la portada ocupa casi toda la altura y las acciones del hero quedan bajo el borde. La columna lateral repite 24/7 dos veces. | Mantener el carácter editorial reduciendo tamaño/longitud del titular y acercando llamada + formulario al inicio. Sustituir la métrica repetida por información verificada. Validar a 360, 390, 768 y 1280 px antes de cambiar todo el sistema tipográfico. |
| C09 | P2 / bajo | “Start an insurance claim” abre el formulario de emergencia, que no tramita directamente una reclamación con una aseguradora. La confirmación de emergencia afirmaba que un despachador ya estaba llamando. | Alinear cada CTA con la acción real y separar recepción, contacto, disponibilidad y despacho. Este PR corrige la afirmación de llamada ya iniciada; revisar el resto de promesas de tiempo con el equipo. |
| C10 | P2 / medio | Fotografías y credenciales aportan confianza, pero las tarjetas de proyecto no explican alcance, tiempo ni resultado. Algunas mismas fotos aparecen bajo distintos contextos de servicio. | Clasificar la biblioteca por tipo de trabajo, confirmar permisos y publicar dos o tres casos completos. No convertir una foto en prueba de un tipo de siniestro sin revisar sus datos. |
| C11 | P2 / bajo | Privacy y Terms existen, pero no están enlazados desde el pie compartido. | Hacerlas accesibles desde el footer y junto a los formularios cuando corresponda; describir los proveedores realmente utilizados. No se revisó suficiencia jurídica. |

### Ciudades que requieren contenido específico

Coral Gables, Fort Lauderdale, Deerfield Beach, Delray Beach, West Palm Beach, Estero, Marco Island, Port St. Lucie y Hobe Sound. La lista proviene de comparar las 35 rutas con las 26 claves de `CITY_CONTENT`, no de un umbral arbitrario de palabras.

## Orden recomendado de trabajo

1. **Fiabilidad de captación.** Integrar las correcciones de este PR después de verificar el preview y Netlify. Confirmar que `generate_lead` registra solicitudes aceptadas y que `click_to_call` representa clics, no llamadas contestadas.
2. **Coherencia de contenidos.** Resolver C01–C05: enlaces correctos, retirar texto interno, ajustar proyectos y revisar afirmaciones. Aceptación: ninguna tarjeta promete una guía que no existe y cada CTA describe su acción.
3. **Navegación y primer pantallazo.** Resolver teclado, menú móvil, contraste y dependencia de animaciones. Acortar el hero manteniendo su estilo. Aceptación: llamada y siguiente paso claros, teclado completo y lectura con JS desactivado.
4. **Autoridad local.** Enriquecer las nueve ciudades con evidencia propia, clasificar fotos y publicar casos completos. Confirmar cobertura con operaciones antes de ampliar promesas.
5. **Medición y rendimiento.** Registrar una línea base móvil de LCP, INP y CLS, contrastarla con datos de campo cuando existan y medir envíos aceptados/clics por plantilla. Optimizar las fuentes e imágenes según ese diagnóstico.

## Cambios incluidos y validación

El PR contiene la auditoría y un primer lote técnico acotado: envío asíncrono con aceptación HTTP, timeout de 15 segundos, bloqueo de doble envío, conservación de campos en error, reintento, foco/estado accesible, etiquetas de los 25 campos, región principal y salto al contenido, `noindex` para errores y canonical de 404. No modifica servicios, cobertura, tarifas, reglas de migración ni textos editoriales generales.

| Comprobación | Antes | Propuesta |
|---|---:|---:|
| Compilación de producción | 54 páginas | 54 páginas |
| URLs de sitemap | 52 | 52 |
| Controles sin etiqueta asociada | 25 | 0 |
| Páginas sin landmark principal | 54 | 0 |
| Páginas de error que declaran indexación | 2 | 0 |
| Canonical que no coincide con su archivo/ruta | 1 | 0 |
| Destinos internos inexistentes detectados | 0 | 0 |
| Pruebas del flujo de envío | No existían | 8 pasan |

Las pruebas cubren espera real de la respuesta, codificación Netlify, HTTP 400/404/429/500, desconexión, timeout y un flujo con doble clic, error, reintento, recepción y evento de lead. Se ejecutó `git diff --check`. La ausencia de incidencias en este inventario limitado no significa que toda la web esté libre de problemas: las tablas anteriores enumeran trabajo pendiente.

Para repetir la validación:

```sh
npm ci
npm test
npm run build
python scripts/audit-built-site.py --output docs/audit-2026-10-23/after.json
```

Antes de integrar: revisar el deploy preview, enviar datos de prueba identificados en un entorno de pruebas de Netlify, comprobar recepción y aviso, revisar el formulario con teclado y comprobar sus mensajes en móvil. La aceptación del servidor confirma recepción técnica; no garantiza notificación, llamada ni despacho.
