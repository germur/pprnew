/**
 * Integracion CompanyCam (build time).
 * 1. Lista proyectos. 2. Saca ciudad de la direccion. 3. Trae fotos curadas
 * (tag "web"; respaldo max 6/proyecto). 4. Descarga a public/companycam/<slug>/.
 * 5. Genera src/data/companycam.json (mapeo ciudad -> fotos).
 * Correr: npm run sync:photos  (requiere .env con COMPANYCAM_TOKEN)
 */
import { writeFileSync, mkdirSync, existsSync, createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import process from "node:process";

const API = "https://api.companycam.com/v2";
const TOKEN = process.env.COMPANYCAM_TOKEN;
const PUBLISH_TAG = "web";
const MAX_PER_PROJECT = 6;

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

function citySlug(address){
  const c = (address && address.city || "").trim().toLowerCase();
  return CITY_SLUGS[c] || null;
}

async function api(path){
  const res = await fetch(API+path, { headers:{ Authorization:"Bearer "+TOKEN, "Content-Type":"application/json" } });
  if(!res.ok) throw new Error("CompanyCam "+res.status+" en "+path+": "+await res.text());
  return await res.json();
}

async function listAllProjects(){
  const all=[]; let page=1;
  while(true){
    const data = await api("/projects?page="+page+"&per_page=100");
    if(!Array.isArray(data)||data.length===0) break;
    all.push(...data);
    if(data.length<100) break;
    page++;
  }
  return all;
}

async function findPublishTagId(){
  let page=1;
  while(true){
    const data = await api("/tags?page="+page+"&per_page=100");
    if(!Array.isArray(data)||data.length===0) break;
    const m = data.find(t=>(t.value||"").toLowerCase()===PUBLISH_TAG);
    if(m) return m.id;
    if(data.length<100) break;
    page++;
  }
  return null;
}

async function listProjectPhotos(projectId, tagId){
  const all=[]; let page=1;
  const tq = tagId ? "&tag_ids[]="+tagId : "";
  while(true){
    const data = await api("/projects/"+projectId+"/photos?page="+page+"&per_page=100"+tq);
    if(!Array.isArray(data)||data.length===0) break;
    all.push(...data);
    if(data.length<100) break;
    page++;
  }
  return all;
}

function pickUri(photo){
  const uris = photo.uris || [];
  const u = uris.find(x=>x.type==="web") || uris.find(x=>x.type==="original") || uris[0];
  return u ? u.url : null;
}

async function download(url, dest){
  const res = await fetch(url);
  if(!res.ok) throw new Error("download "+res.status+" "+url);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

async function main(){
  if(!TOKEN){ console.error("\nFALTA el token. Copia .env.example a .env y pon tu COMPANYCAM_TOKEN.\n"); process.exit(1); }
  console.log("Conectando con CompanyCam...");
  const tagId = await findPublishTagId();
  if(tagId) console.log('Tag "'+PUBLISH_TAG+'" encontrado. Solo se bajan fotos con ese tag.');
  else { console.log('Tag "'+PUBLISH_TAG+'" aun no existe. Respaldo: maximo '+MAX_PER_PROJECT+' fotos por proyecto.');
         console.log('(Marca tus mejores fotos con el tag "'+PUBLISH_TAG+'" en CompanyCam para curar con precision.)'); }
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
    if(!tagId) photos = photos.slice(0, MAX_PER_PROJECT);
    const cityDir = outDir+"/"+slug;
    mkdirSync(cityDir, { recursive:true });
    let countThis=0;
    for(const photo of photos){
      if(photo.internal){ skippedInternal++; continue; }
      if(photo.processing_status!=="processed") continue;
      const url = pickUri(photo);
      if(!url) continue;
      const ext = (url.split(".").pop()||"jpg").split("?")[0].slice(0,4);
      const fname = photo.id+"."+ext;
      const dest = cityDir+"/"+fname;
      try{
        if(!existsSync(dest)) await download(url, dest);
        byCity[slug] = byCity[slug] || [];
        byCity[slug].push({
          src:"/companycam/"+slug+"/"+fname,
          alt: photo.description || ("Restoration project in "+(p.address&&p.address.city||"")),
          projectName: p.name || "",
          service: null,
        });
        totalPhotos++; countThis++;
      }catch(e){ console.warn("  (skip foto "+photo.id+": "+e.message+")"); }
    }
    console.log("  "+(p.name||p.id)+" -> "+slug+" ("+countThis+" fotos)");
  }
  writeFileSync("src/data/companycam.json", JSON.stringify(byCity, null, 2));
  console.log("\nListo.");
  console.log("  Fotos descargadas: "+totalPhotos);
  console.log("  Omitidas (internal): "+skippedInternal);
  console.log("  Proyectos sin ciudad mapeable: "+noCity);
  console.log("  Ciudades con fotos: "+Object.keys(byCity).length);
}
main().catch(e=>{ console.error("\nERROR:", e.message); process.exit(1); });
