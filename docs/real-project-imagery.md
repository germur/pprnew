# Replace generic imagery with approved project photos

Removed the nine legacy images in public/heroes, including the unused home hero and the illustrative coverage map. No new CompanyCam photos or customer information were imported.

- Home: four service-card images now use approved project photographs with visible city labels. The coverage section uses the six actual region lists instead of the illustrative map.
- Six service/commercial pages: shared project photo figures include responsive sources, accurate dimensions, observational alt text, city and a link to the documented project.
- Resources hub and mold article: a real Naples ceiling-inspection photo replaces the generated mold image. The article caption explicitly says that the photo does not identify a mold species.
- Contact and 27 city pages without approved local hero photos: coverage information replaces the map. The eight city pages with approved local photography retain their own project images.
- Service imagery placements are centralized in src/data/project-imagery.ts. The image captions describe visible conditions rather than claiming an unverified loss cause or commercial building type.

Only the existing thirteen approved photographs and their responsive thumbnails are used for new placements. Existing historical CompanyCam galleries are unchanged. The removed assets remain recoverable in Git history; deletion here removes them from future site builds.

Validation: 56 pages build, 54 sitemap URLs, 18 tests pass and the built-site audit reports no issues. All generated HTML is free of /heroes/ references and all newly placed project images belong to the approved selection, with dimensions and alt text. The eight local city heroes remain; the other 27 cities use coverage cards. Browser checks cover home cards, service photo captions, the Naples project link, resources and a city fallback at desktop and phone widths.
