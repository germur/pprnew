// Contenido local ÚNICO por ciudad (Eje B, Product-Led local del blueprint SEO).
// Solo información verídica: clima, riesgo, geografía, barrios y tipo de propiedad.
// Los proyectos reales (CompanyCam) y métricas se añaden cuando lleguen.
//
// REGLA: cada ciudad necesita ~300 palabras únicas (test del sheet). Si una ciudad
// no tiene entrada aquí, la plantilla muestra contenido genérico + slot pendiente.

export interface CityContent {
  /** Frase de riesgo destacada (pullcard) */
  riskHeadline: string;
  /** Riesgos locales en lista (4) */
  risks: string[];
  /** Párrafos de contenido local único (verídico) */
  intro: string[];
  /** Barrios / zonas reales que se cubren */
  neighborhoods: string[];
}

export const CITY_CONTENT: Record<string, CityContent> = {
  miami: {
    riskHeadline:
      "Hurricane season, king tides and 70%+ humidity make fast drying non-negotiable.",
    risks: [
      "Coastal and storm-surge flooding",
      "High-rise and condo water intrusion",
      "Humidity-driven mold growth",
      "Hurricane wind and roof damage",
    ],
    intro: [
      "Miami does not get water damage like the rest of the country. Year-round humidity above 70 percent, an active Atlantic hurricane season, and king tides that push saltwater into Brickell and Edgewater garages all combine against your property. The building stock ranges from 1920s Coral Gables homes to glass towers downtown, and each one fails differently when water gets in.",
      "That mix is exactly why drying in place and fast clearance matter more here. In Miami's heat, untreated moisture turns to mold in a day or two, not a week. Our crews know which neighborhoods flood first, which buildings hide moisture behind stucco and CBS walls, and how to document a coastal loss so a Florida insurer approves it.",
      "We respond across single-family, condo and commercial properties throughout Miami-Dade. That local volume is what lets us promise a real 60-minute response instead of a dispatch sent from two counties away.",
    ],
    neighborhoods: [
      "Brickell", "Coral Gables", "Coconut Grove", "Little Havana",
      "Wynwood", "Edgewater", "Kendall", "Downtown",
    ],
  },

  naples: {
    riskHeadline:
      "Gulf storm surge and a high water table make Naples water losses spread fast.",
    risks: [
      "Gulf storm surge and coastal flooding",
      "High water table and slab moisture",
      "Hurricane wind and roof intrusion",
      "Humidity-driven mold in seasonal homes",
    ],
    intro: [
      "Naples sits right on the Gulf, and that location shapes every water loss here. Storm surge from the west pushes saltwater inland through Old Naples and Port Royal, while a high coastal water table means slabs and crawl spaces stay damp long after a storm passes. The result is moisture that spreads quickly if it is not extracted and dried correctly.",
      "Much of Naples is seasonal. Homes sit closed for months with the air conditioning set high, which is the perfect recipe for mold to take hold unnoticed behind walls and in air handlers. We see this pattern every season, and we know how to find hidden moisture in a property that has been shut up since spring.",
      "From beachfront estates to golf-community villas, the building stock is high-value and unforgiving of slow response. We work losses across Collier County and document coastal damage the way Florida carriers require, so your claim moves forward instead of stalling.",
    ],
    neighborhoods: [
      "Old Naples", "Port Royal", "Pelican Bay", "Park Shore",
      "Aqualane Shores", "Vineyards", "Golden Gate",
    ],
  },

  "fort-myers": {
    riskHeadline:
      "Riverfront flooding and direct hurricane exposure define Fort Myers water losses.",
    risks: [
      "Caloosahatchee River and tidal flooding",
      "Direct hurricane and storm-surge exposure",
      "Older housing stock with hidden moisture paths",
      "Post-storm mold from delayed drying",
    ],
    intro: [
      "Fort Myers wraps around the Caloosahatchee River, and that water is the first thing we think about on any loss here. Tidal influence and heavy seasonal rain raise the river and push water into riverfront and downtown properties, while the city's direct Gulf exposure means hurricane surge is a real and recurring threat, not a once-a-decade event.",
      "The area carries a mix of older mid-century homes and newer construction. Older properties hide moisture paths behind plaster and original framing, which is exactly where mold takes hold after a slow leak or a storm. Fast, documented drying is what stops a manageable loss from becoming a gut renovation.",
      "We respond across Lee County, from McGregor Boulevard's historic homes to riverfront condos and commercial sites. Our crews document each loss for the insurer and prioritize the drying timeline, because in this climate a day of delay is the difference between drying in place and tearing out.",
    ],
    neighborhoods: [
      "McGregor Boulevard", "Downtown River District", "Fort Myers Beach",
      "Whiskey Creek", "Iona", "San Carlos Park",
    ],
  },

  "cape-coral": {
    riskHeadline:
      "Over 400 miles of canals put most Cape Coral homes one storm away from water intrusion.",
    risks: [
      "Canal-front and seawall flooding",
      "Storm surge through the canal network",
      "High water table and slab moisture",
      "Humidity and post-storm mold",
    ],
    intro: [
      "Cape Coral was built on water. With more than 400 miles of navigable canals, more than almost any city on earth, a huge share of homes sit directly on a waterway. That is the city's draw and its risk: when surge or heavy rain raises the canal system, water reaches seawalls, lanais and ground floors quickly across entire neighborhoods at once.",
      "The flat terrain and high water table mean that water, once inside, has nowhere easy to drain. Slabs stay wet and humidity keeps materials damp, so mold follows fast if drying is not aggressive and complete. We size our equipment for this reality rather than treating a Cape Coral loss like an inland one.",
      "We cover the full Cape, from the southeast's established canal districts to the growing north. Each loss is documented for your carrier, with the moisture readings and photos a Florida claim needs, so you are not fighting your insurer while you are also drying out your home.",
    ],
    neighborhoods: [
      "Southeast Cape", "Southwest Cape", "Pelican", "Cape Harbour",
      "Tarpon Point", "Northwest Cape",
    ],
  },
};
