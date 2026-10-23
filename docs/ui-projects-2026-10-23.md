# UI/UX y proyectos — 23 de octubre de 2026

Esta propuesta continúa la auditoría y se basa en su rama, porque el PR #1 sigue abierto. Incluye las 13 fotografías de CompanyCam revisadas y autorizadas expresamente para publicación el 23 de octubre de 2026.

## Cambios visibles

- Inicio más compacto, con llamada y solicitud online próximas al titular y una fotografía real ya publicada.
- Seis proyectos en portada y ocho en /projects/, filtrables por ciudad y con apertura nativa de fotos. El contenido permanece disponible sin JavaScript.
- Navegación por teclado, Escape, gestión de foco móvil y enlaces cerrados fuera de la tabulación.
- Mejor contraste del texto secundario, foco visible, movimiento reducido y contenido visible si no se inicializan las animaciones.
- Tarjetas de portada con destinos coherentes, acceso a Our Work y enlaces de Privacy/Terms.
- Se retiran notas SEO de las secciones modificadas y se priorizan fotos seleccionadas en las páginas locales.

## Selección pública

Se incorporan trece fotografías de ocho proyectos revisados en CompanyCam: Weston, Doral, Miami, Naples, Cape Coral, Sunny Isles Beach, Coral Springs y Port St. Lucie. Sustituyen la selección temporal de fotografías ya públicas usada para preparar el diseño. Los textos describen lo visible; no atribuyen resultados, duración ni comparaciones antes/después sin evidencia.

También se eliminó de los archivos publicados y del catálogo una captura de agenda encontrada durante la revisión. Esto no borra el historial de Git ni significa que se haya revisado toda la biblioteca histórica.

La selección recibió autorización expresa para publicarse en el repositorio público y en la web. Solo se incorporan esas trece fotos y sus miniaturas WebP: orientación corregida, tamaños de tarjeta y EXIF/GPS eliminados. No se exportan nombres ni direcciones de clientes, descripciones privadas o enlaces firmados. Las candidatas descartadas y los originales permanecen locales, excluidos de Git.

## Importador

Se corrige el corte después de una página corta: se consulta hasta una página vacía, con deduplicación y límites contra repeticiones. El comando review:photos descarga muestras únicamente en una carpeta local excluida de Git. sync:photos requiere etiqueta web, prepara WebP sin EXIF/GPS, evita exportar nombres privados y conserva el catálogo si falla. No modifica CompanyCam ni corre automáticamente en cada deploy.

[Instrucciones de uso](../scripts/README-companycam.md).

## Validación

Pruebas del flujo de envíos, paginación y navegación. Compilación de 55 páginas, 53 URLs de sitemap y comprobación de destinos locales. Se verificaron dimensiones y ausencia de EXIF/XMP en los 26 archivos preparados (13 fotos y 13 miniaturas). Revisar también el deploy preview en móvil y escritorio; no se enviaron formularios a producción.
