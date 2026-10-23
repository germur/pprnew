import projects from './selected-projects.json';

export type ProjectImage = (typeof projects)[number]['photos'][number];
export type ProjectSelection = { project: (typeof projects)[number]; photo: ProjectImage; position: string };

function select(city: string, index = 0, position = 'center'): ProjectSelection {
  const project = projects.find(project => project.citySlug === city);
  const photo = project?.photos[index];
  if (!project || !photo) throw new Error(`Missing approved project photo: ${city}/${index}`);
  return { project, photo, position };
}

// Editorial placements describe visible conditions, not an unverified loss cause.
export const SERVICE_IMAGERY = {
  'water-damage': select('doral'),
  'mold-remediation': select('weston', 0, 'center 35%'),
  'fire-damage': select('miami', 0, 'center 30%'),
  'storm-damage': select('weston', 1, 'center 35%'),
  'mold-testing': select('coral-springs', 0, 'center 65%'),
  commercial: select('cape-coral'),
};
export const RESOURCE_IMAGERY = select('naples', 0, 'center 35%');
