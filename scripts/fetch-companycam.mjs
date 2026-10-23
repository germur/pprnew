/**
 * Integracion CompanyCam (build time).
 * 1. Lista proyectos. 2. Saca ciudad de la direccion. 3. Trae fotos curadas
 * (tag "web"). 4. Optimiza y quita metadatos antes de publicar.
 * 5. Genera src/data/companycam.json (mapeo ciudad -> fotos).
 * Correr: npm run sync:photos  (requiere .env con COMPANYCAM_TOKEN)
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import sharp from "sharp";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { paginate } from "./companycam-pagination.mjs";

const API = "https://api.companycam.com/v2";
const TOKEN = process.env.COMPANYCAM_TOKEN;
const PUBLISH_TAG = "web";

const CITY_SLUGS = {
  "miami":"miami","doral":"doral","hialeah":"hialeah","miami gardens":"miami-gardens",
  "homestead":"homestead","sunny isles beach":"sunny-isles-beach","coral gables":"coral-gables",
  "fort lauderdale":"fort-lauderdale","hollywood":"hollywood","weston":"weston",
  "coral springs":"coral-springs","sunrise":"sunrise","davie":"davie",
  "cooper city":"cooper-city","deerfield beach":"deerfield-beach",
  "boca raton":"boca-raton","boynton beach":"boynton-beach","wellington":"wellington",
  "delray beach":"delray-beach","west palm beach":"west-palm-beach",
  "fort myers":"fort-myers","bonita springs":"bonita-springs","alva":"alva",
  "naples":"naples","estero":"estero","cape coral":"cape-coral",
  "marco island":"marco-island","sarasota":"sarasota",
  "orlando":"orlando","kissimmee":"kissimmee","st cloud":"st-cloud","st. cloud":"st-cloud",
  "saint cloud":"st-cloud","winter springs":"winter-springs",
  "stuart":"stuart","port st. lucie":"port-st-lucie","port saint lucie":"port-st-lucie",
  "hobe sound":"hobe-sound",
};

export function citySlug(address){
  const c = (address && address.city || "").trim().toLowerCase();
  return CITY_SLUGS[c] || null;
}

export async function api(path){
  const res = await fetch(API+path, { headers:{ Authorization:"Bearer "+TOKEN, "Content-Type":"application/json" }, signal: AbortSignal.timeout(20000) });
  if(!res.ok) throw new Error("CompanyCam HTTP "+res.status);
  return await res.json();
}

export async function listAllProjects(){
  return paginate(page => api("/projects?page="+page+"&per_page=100"));
}

async function findPublishTagId(){
  const tags = await paginate(page => api("/tags?page="+page+"&per_page=100"));
  return tags.find(t=>(t.value||"").toLowerCase()===PUBLISH_TAG)?.id || null;
}

async function listProjectPhotos(projectId, tagId){
  const tq = tagId ? "&tag_ids[]="+tagId : "";
  return paginate(page => api("/projects/"+projectId+"/photos?page="+page+"&per_page=100"+tq));
}

export function pickUri(photo, { original = false } = {}){
  const uris = photo.uris || [];
  const u = uris.find(x=>x.type===(original ? "original" : "web")) || uris.find(x=>x.type==="original") || uris[0];
  return u ? u.url : null;
}

async function download(url, dest){
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if(!res.ok) throw new Error("Photo download HTTP "+res.status);
  // Sharp strips EXIF (including GPS) unless keepMetadata is explicitly used.
  await sharp(Buffer.from(await res.arrayBuffer())).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toFile(dest);
}

async function main(){
  if(!TOKEN){ console.error("\nFALTA el token. Copia .env.example a .env y pon tu COMPANYCAM_TOKEN.\n"); process.exit(1); }
  console.log("Conectando con CompanyCam...");
  const tagId = await findPublishTagId();
  if(tagId) console.log('Tag "'+PUBLISH_TAG+'" encontrado. Solo se bajan fotos con ese tag.');
  else { throw new Error('No hay etiqueta "web". Ejecuta la revision local con npm run review:photos antes de seleccionar fotos para publicar. El catalogo existente se conserva.'); }
  const projects = await listAllProjects();
  console.log("Proyectos encontrados: "+projects.length+"\n");
  const outDir = "public/companycam";
  mkdirSync(outDir, { recursive:true });
  const byCity = {};
  let totalPhotos=0, skippedInternal=0, noCity=0;
  for(const p of projects){
    if(p.archived || p.status!=="active") continue;
    const slug = citySlug(p.address);
    if(!slug){ noCity++; continue; }
    let photos = await listProjectPhotos(p.id, tagId);
    const cityDir = outDir+"/"+slug;
    mkdirSync(cityDir, { recursive:true });
    let countThis=0;
    for(const photo of photos){
      if(photo.internal){ skippedInternal++; continue; }
      if(photo.processing_status!=="processed") continue;
      const url = pickUri(photo, { original: true });
      if(!url) continue;
      const fname = photo.id+".webp";
      const dest = cityDir+"/"+fname;
      try{
        if(!existsSync(dest)) await download(url, dest);
        byCity[slug] = byCity[slug] || [];
        byCity[slug].push({
          src:"/companycam/"+slug+"/"+fname,
          alt: "Restoration project documentation in "+(p.address&&p.address.city||"Florida"),
          projectId: String(p.id),
          projectName: "",
          service: null,
        });
        totalPhotos++; countThis++;
      }catch(e){ throw new Error('Photo preparation failed; existing catalog preserved. '+e.message); }
    }
    console.log("  "+slug+" ("+countThis+" fotos)");
  }
  if(!totalPhotos) throw new Error('No approved photos found; existing catalog preserved.');
  writeFileSync("src/data/companycam.json", JSON.stringify(byCity, null, 2));
  console.log("\nListo.");
  console.log("  Fotos descargadas: "+totalPhotos);
  console.log("  Omitidas (internal): "+skippedInternal);
  console.log("  Proyectos sin ciudad mapeable: "+noCity);
  console.log("  Ciudades con fotos: "+Object.keys(byCity).length);
}
if(process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch(e=>{ console.error("\nERROR:", e.message); process.exitCode=1; });
}
