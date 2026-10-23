# Fotos de CompanyCam

La web sirve fotografías locales preparadas en build time. No consulta CompanyCam en cada visita ni expone el token al navegador.

## Configuración

Guarda COMPANYCAM_TOKEN en un .env local siguiendo .env.example. El token y .companycam-review/ están excluidos de Git. No copies credenciales al frontend o al JSON público.

## Revisar material sin etiqueta

```
npm run review:photos
```

Consulta todas las páginas de proyectos y descarga hasta 32 candidatas recientes en .companycam-review/. La muestra usa proyectos activos no archivados de ciudades reconocidas, hasta dos fotos por proyecto y dos proyectos por ciudad. Omite fotos internas, no procesadas y las ya conocidas. No es una revisión exhaustiva y no cambia CompanyCam ni publica archivos.

Los candidatos pueden contener datos de clientes y coordenadas EXIF. Revisar claridad, contexto, caras, direcciones, placas y documentos. No copiarlos directamente a public/. No inferir un antes/después solo por pertenecer al mismo proyecto.

## Selección editorial

src/data/selected-projects.json contiene los proyectos revisados para portada y /projects/. Los archivos preparados en public/projects/ tienen orientación corregida, formato WebP, tamaños de tarjeta y ningún EXIF/GPS. No incluyen nombres privados de proyectos ni enlaces firmados.

La selección del 23 de octubre de 2026 contiene ocho proyectos y trece fotos. Los criterios están en docs/ui-projects-2026-10-23.md. Editar ese JSON no descarga ni aprueba automáticamente material adicional; las futuras selecciones requieren revisión y preparación.

## Sincronizar material marcado para publicación

```
npm run sync:photos
```

Requiere la etiqueta web. Si no existe o no hay fotos aprobadas, termina sin sustituir el catálogo. No publica fotos arbitrarias como fallback. La revisión sin etiqueta sigue disponible con review:photos.

La sincronización omite fotos internas y sin procesar; prepara WebP de hasta 1600 px sin EXIF/GPS y evita exportar nombres privados o descripciones libres. Si falla la preparación, no reemplaza el JSON por un catálogo incompleto. Pueden quedar archivos locales sin referenciar de una ejecución fallida.

La paginación termina en una página vacía, deduplica por ID y detecta repeticiones. Se corrigió el corte anterior: la cuenta devuelve páginas de 50 incluso al solicitar per_page=100.

No se crean etiquetas, no se escribe en CompanyCam y no se sincroniza automáticamente en cada deploy.

## Mantenimiento

[Proyectos](https://docs.companycam.com/reference/listprojects) y [fotos por proyecto](https://docs.companycam.com/reference/listprojectphotos): endpoints utilizados.

[CompanyCam anuncia la retirada de la API heredada a principios de 2027](https://docs.companycam.com/docs/welcome). Planificar la migración antes de esa fecha; esta propuesta conserva la conexión existente.
