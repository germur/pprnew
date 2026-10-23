/** Read-only API review. Candidates stay outside public/ and out of Git. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { api, listAllProjects, citySlug, pickUri } from './fetch-companycam.mjs';

if (!process.env.COMPANYCAM_TOKEN) throw new Error('COMPANYCAM_TOKEN is required');
const directory = '.companycam-review';
await mkdir(directory, { recursive: true });
const existing = JSON.parse(await readFile('src/data/companycam.json', 'utf8'));
const known = new Set(Object.values(existing).flat().map(p => p.src.match(/\/([^/]+)\.[^.]+$/)?.[1]));
const projects = await listAllProjects();
const eligible = projects.filter(p => p.status === 'active' && !p.archived && citySlug(p.address));
const candidates = [];
const cities = new Map();
for (const project of eligible) {
  const city = citySlug(project.address);
  if ((cities.get(city) || 0) >= 2) continue;
  const photos = await api(`/projects/${project.id}/photos?per_page=50&page=1`);
  if (!Array.isArray(photos)) throw new Error('Unexpected photo response');
  let selected = 0;
  for (const photo of photos) {
    if (photo.internal || photo.processing_status !== 'processed' || known.has(String(photo.id))) continue;
    const uri = pickUri(photo);
    if (!uri) continue;
    const response = await fetch(uri, { signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`Photo download HTTP ${response.status}`);
    const filename = `${String(candidates.length + 1).padStart(2, '0')}-${photo.id}.jpg`;
    await writeFile(`${directory}/${filename}`, new Uint8Array(await response.arrayBuffer()));
    candidates.push({ file: filename, photoId: String(photo.id), projectId: String(project.id), city });
    if (++selected === 2) break;
  }
  if (selected) cities.set(city, (cities.get(city) || 0) + 1);
  if (candidates.length >= 32) break;
}
const report = { projects: projects.length, eligibleProjects: eligible.length, candidates };
await writeFile(`${directory}/inventory.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ projects: projects.length, eligibleProjects: eligible.length, candidates: candidates.length, reviewDirectory: directory }));
