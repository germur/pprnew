# UI/UX y proyectos — 23 de octubre de 2026

Esta propuesta continúa la auditoría y se basa en su rama, porque el PR #1 sigue abierto. No incorpora fotografías nuevas de la cuenta privada de CompanyCam.

## Cambios visibles

- Inicio más compacto, con llamada y solicitud online próximas al titular y una fotografía real ya publicada.
- Seis proyectos en portada y ocho en /projects/, filtrables por ciudad y con apertura nativa de fotos. El contenido permanece disponible sin JavaScript.
- Navegación por teclado, Escape, gestión de foco móvil y enlaces cerrados fuera de la tabulación.
- Mejor contraste del texto secundario, foco visible, movimiento reducido y contenido visible si no se inicializan las animaciones.
- Tarjetas de portada con destinos coherentes, acceso a Our Work y enlaces de Privacy/Terms.
- Se retiran notas SEO de las secciones modificadas y se priorizan fotos seleccionadas en las páginas locales.

## Selección pública

Se eligieron ocho fotografías de ocho proyectos ya incluidos en el repositorio público: Miami, Naples, Orlando, Homestead, Wellington, Doral, Bonita Springs y Weston. Los textos describen lo visible; no atribuyen resultados, duración ni comparaciones antes/después sin evidencia.

También se eliminó de los archivos publicados y del catálogo una captura de agenda encontrada durante la revisión. Esto no borra el historial de Git ni significa que se haya revisado toda la biblioteca histórica.

Las candidatas nuevas de CompanyCam permanecen locales y excluidas de Git, pendientes de aprobación expresa para publicación. No forman parte de esta rama ni de sus commits.

## Importador

Se corrige el corte después de una página corta: se consulta hasta una página vacía, con deduplicación y límites contra repeticiones. El comando review:photos descarga muestras únicamente en una carpeta local excluida de Git. sync:photos requiere etiqueta web, prepara WebP sin EXIF/GPS, evita exportar nombres privados y conserva el catálogo si falla. No modifica CompanyCam ni corre automáticamente en cada deploy.

[Instrucciones de uso](../scripts/README-companycam.md).

## Validación

Pruebas del flujo de envíos, paginación y navegación. Compilación de 55 páginas, 53 URLs de sitemap y comprobación de destinos locales. Revisar también el deploy preview en móvil y escritorio; no se enviaron formularios a producción.
