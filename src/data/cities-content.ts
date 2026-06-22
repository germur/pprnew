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

  doral: {
    riskHeadline: "Flat terrain and canal drainage make Doral water losses spread across the slab fast.",
    risks: [
      "Canal and lake-system flooding",
      "Heavy summer rain and flash flooding",
      "Humidity-driven mold in newer construction",
      "Hurricane wind and water intrusion",
    ],
    intro: [
      "Doral is one of the fastest-growing cities in Miami-Dade, and its mix of newer single-family homes, townhome communities and commercial parks all sit on flat, low-lying land threaded with lakes and canals. When heavy summer storms hit, that drainage system fills fast, and water backs up into ground floors, garages and slab-built homes across the city.",
      "Most of Doral's housing stock is modern concrete-block construction, which holds moisture differently than older homes. Water that gets under tile or behind drywall can sit unnoticed against the slab, and in Doral's humidity it turns to mold within days. Fast extraction and structural drying are what keep a contained loss from becoming a tear-out.",
      "We respond across Doral, from the residential communities near Doral Boulevard to the office and warehouse parks that define the city's commercial core. Every loss is documented for your insurer with the moisture readings and photos a Florida claim requires.",
    ],
    neighborhoods: ["Downtown Doral", "Doral Isles", "Vintage Estates", "Costa del Sol", "Doral Cove"],
  },

  hialeah: {
    riskHeadline: "Dense older housing stock means hidden moisture paths and fast mold in Hialeah.",
    risks: [
      "Aging plumbing and roof leaks",
      "Flash flooding in low-lying streets",
      "Humidity-driven mold growth",
      "Hurricane wind and water intrusion",
    ],
    intro: [
      "Hialeah is one of the most densely populated cities in Florida, with a housing stock that skews older than most of Miami-Dade. That age is exactly what shapes water and mold losses here: original plumbing, aging roofs and decades-old construction hide moisture paths behind plaster and block walls where leaks go unseen for weeks.",
      "The city's flat, built-up terrain also drains slowly, so heavy rain pools in low-lying streets and pushes water into ground-floor units and slab homes. In Hialeah's year-round humidity, any water left in a wall cavity or under flooring becomes mold quickly. We trace the moisture to its source and dry to clearance standard so it does not quietly return.",
      "We work losses across Hialeah and Hialeah Gardens, from single-family blocks to multi-unit buildings, and document each one the way a Florida insurer needs to approve the claim.",
    ],
    neighborhoods: ["West Hialeah", "Palm Springs", "Hialeah Gardens", "Country Club", "East Hialeah"],
  },

  "boca-raton": {
    riskHeadline: "Coastal flooding and high-value homes make fast, documented drying critical in Boca Raton.",
    risks: [
      "Coastal and tidal flooding",
      "Hurricane storm surge",
      "Humidity-driven mold in closed seasonal homes",
      "High water table and slab moisture",
    ],
    intro: [
      "Boca Raton blends beachfront estates, golf-community villas and gated developments, and that high-value housing stock raises the stakes on any water loss. Coastal flooding and tidal influence reach properties east of the Intracoastal, while heavy seasonal rain and a high water table keep moisture in slabs and crawl spaces well inland.",
      "Many Boca homes are seasonal, closed for months with the air conditioning set high. That is the perfect condition for mold to take hold unnoticed behind walls and in air handlers. We see this pattern every season and know how to find hidden moisture in a property that has been shut up since spring.",
      "We respond across Boca Raton and West Boca, from Royal Palm to the communities along Glades Road, documenting every coastal loss the way Florida carriers require so your claim moves forward instead of stalling.",
    ],
    neighborhoods: ["Royal Palm Yacht Club", "Boca West", "East Boca", "Mizner Park", "Boca Del Mar"],
  },

  "boynton-beach": {
    riskHeadline: "Intracoastal flooding and aging coastal homes drive Boynton Beach water losses.",
    risks: [
      "Intracoastal and tidal flooding",
      "Hurricane storm surge",
      "Aging roofs and plumbing leaks",
      "Humidity-driven mold growth",
    ],
    intro: [
      "Boynton Beach sits along the Intracoastal between Lake Worth and Delray, and that coastal position drives its water risk. Tidal flooding and storm surge reach low-lying neighborhoods east of Federal Highway, while inland communities deal with heavy seasonal rain and a high water table that keeps slabs damp.",
      "The city mixes older coastal homes with newer development. Older properties hide moisture paths behind original construction, which is where mold takes hold after a slow leak or a storm. Aggressive, documented drying is what stops a manageable loss from becoming a full renovation in this climate.",
      "We cover Boynton Beach from the marina district to the western communities off Boynton Beach Boulevard, documenting each loss with the moisture readings and photos a Florida claim needs.",
    ],
    neighborhoods: ["Marina District", "Leisureville", "Hunters Run", "Renaissance Commons", "West Boynton"],
  },

  hollywood: {
    riskHeadline: "Beachfront exposure and aging housing make Hollywood losses spread fast.",
    risks: [
      "Coastal and storm-surge flooding",
      "Aging roofs and plumbing",
      "Humidity-driven mold growth",
      "Hurricane wind and water intrusion",
    ],
    intro: [
      "Hollywood runs from the Atlantic beachfront to the inland neighborhoods west of I-95, and that range shapes its water losses. Beachfront and Intracoastal properties face surge and tidal flooding, while older inland homes deal with aging roofs, original plumbing and slow-draining streets that pool water in heavy rain.",
      "Much of Hollywood's housing stock dates back decades, with construction that hides moisture behind plaster and block. In South Florida humidity, water left in those cavities becomes mold within days. We find the moisture source, dry to clearance standard, and stop the mold before it spreads.",
      "We respond across Hollywood, from the beach and downtown to the communities near Hollywood Boulevard and the western edge, documenting each loss for your insurer.",
    ],
    neighborhoods: ["Hollywood Beach", "Downtown Hollywood", "Emerald Hills", "Hollywood Lakes", "West Hollywood"],
  },

  orlando: {
    riskHeadline: "Lakes, flat terrain and intense summer storms define Orlando water losses.",
    risks: [
      "Lake and retention-pond flooding",
      "Intense summer thunderstorm flooding",
      "Hurricane wind and water intrusion",
      "Humidity-driven mold growth",
    ],
    intro: [
      "Orlando sits inland in Central Florida, but its water risk is real and distinct from the coast. The metro is dotted with lakes and retention ponds, and the region's intense summer thunderstorm season drops heavy rain fast, overwhelming drainage and pushing water into homes across the city. Hurricane systems that cross the peninsula bring wind-driven rain and roof intrusion even far from the coast.",
      "Orlando's housing stock spans historic homes near downtown to sprawling newer subdivisions. Each fails differently when water gets in, but the constant is humidity: water left untreated turns to mold quickly in Central Florida's climate. We dry to clearance standard and fix the moisture source so it does not return.",
      "We respond across the Orlando metro, documenting each loss the way a Florida insurer needs to approve the claim. This is a growing market for our crews, backed by real projects on the ground.",
    ],
    neighborhoods: ["Downtown Orlando", "Winter Park edge", "Lake Nona", "Dr. Phillips", "Baldwin Park"],
  },

  weston: {
    riskHeadline: "Master-planned communities on reclaimed wetland make Weston drainage critical.",
    risks: ["Canal and lake-system flooding","Heavy summer rain and flash flooding","Humidity-driven mold growth","Hurricane wind and water intrusion"],
    intro: [
      "Weston was built as a master-planned community on what was once Everglades wetland, and that origin shapes its water risk. The city is laced with lakes and canals that manage drainage, but in the heaviest summer storms and hurricane systems that network fills fast, sending water toward ground floors and slab homes across its gated neighborhoods.",
      "Weston's housing stock is relatively new concrete-block construction, which traps moisture against the slab when water gets under tile or behind drywall. In South Florida humidity that moisture becomes mold within days, so fast extraction and complete structural drying are what protect the home.",
      "We respond across Weston, from the communities around Weston Road to the developments near the Everglades edge, documenting each loss the way a Florida insurer needs to approve the claim.",
    ],
    neighborhoods: ["Weston Hills", "Savanna", "The Ridges", "Bonaventure", "Country Isles"],
  },

  davie: {
    riskHeadline: "Mixed rural-suburban terrain and a high water table drive Davie water losses.",
    risks: ["Canal and drainage flooding","High water table and slab moisture","Humidity-driven mold growth","Hurricane wind and water intrusion"],
    intro: [
      "Davie blends suburban subdivisions with the larger rural and equestrian lots that give the town its character, and that mix shapes how water losses unfold. The area sits on flat, low-lying land with a high water table, so heavy rain and canal overflow push water into homes and outbuildings across both the developed and rural sections.",
      "The range of construction, from older ranch homes to newer builds, means moisture hides in different places: behind original plaster in older properties, against the slab in newer ones. In Davie's humidity, untreated water turns to mold quickly. We trace the source, dry to clearance standard, and stop the mold before it spreads.",
      "We cover Davie across its suburban and rural areas, documenting each loss for your insurer with the readings and photos a Florida claim requires.",
    ],
    neighborhoods: ["Pine Island Ridge", "Forest Ridge", "Shenandoah", "Orange Park", "Rolling Hills"],
  },

  "cooper-city": {
    riskHeadline: "Dense family subdivisions on flat terrain make fast drying essential in Cooper City.",
    risks: ["Canal and drainage flooding","Heavy summer rain","Humidity-driven mold growth","Hurricane wind and water intrusion"],
    intro: [
      "Cooper City is a compact, family-oriented suburb of mostly single-family subdivisions built on flat South Florida terrain. Its drainage relies on canals and retention systems that can be overwhelmed by the region's intense summer storms, sending water into garages, ground floors and slab homes across its neighborhoods.",
      "Most homes here are concrete-block construction on slab, which holds moisture against the foundation when water gets in. In the local humidity, that becomes mold fast. We focus on aggressive structural drying and finding the moisture source so a contained loss does not turn into a tear-out.",
      "We respond throughout Cooper City, documenting each loss the way Florida carriers require so your claim moves forward without delay.",
    ],
    neighborhoods: ["Rock Creek", "Embassy Lakes", "Country Address", "Flamingo Gardens edge", "Monterra"],
  },

  "coral-springs": {
    riskHeadline: "Canal network and flat terrain make Coral Springs prone to fast-spreading water losses.",
    risks: ["Canal and drainage flooding","Heavy summer rain and flash flooding","Humidity-driven mold growth","Hurricane wind and water intrusion"],
    intro: [
      "Coral Springs is a planned city threaded with canals that manage drainage across its flat terrain. The system works in normal rain, but the heaviest summer storms and hurricane systems overwhelm it, pushing water into ground floors and slab homes throughout the city's residential communities.",
      "The housing stock is largely concrete-block on slab, which traps moisture against the foundation. In South Florida humidity that water becomes mold within days, so we prioritize fast extraction, structural drying and fixing the moisture source so it does not return.",
      "We respond across Coral Springs, from the communities near University Drive to the western developments, documenting each loss for your insurer.",
    ],
    neighborhoods: ["Eagle Trace", "Heron Bay", "Maplewood", "Ramblewood", "The Greens"],
  },

  sunrise: {
    riskHeadline: "Low-lying terrain near the Everglades edge makes Sunrise drainage critical.",
    risks: ["Canal and Everglades-edge flooding","Heavy summer rain","Humidity-driven mold growth","Hurricane wind and water intrusion"],
    intro: [
      "Sunrise sits on low-lying land at the western edge of Broward near the Everglades, and that position drives its water risk. Canals manage drainage, but heavy summer storms and hurricane rain raise the system fast, sending water into homes and ground floors across the city.",
      "Sunrise homes are mostly slab-built concrete block, which holds moisture against the foundation when water intrudes. The local humidity turns that water to mold quickly, so complete structural drying and source repair are essential.",
      "We respond across Sunrise, from the communities near Sawgrass to the older eastern neighborhoods, documenting each loss the way a Florida claim requires.",
    ],
    neighborhoods: ["Sawgrass", "Welleby", "Sunrise Lakes", "Springtree", "Bonaventure edge"],
  },

  kissimmee: {
    riskHeadline: "Lakes, wetlands and intense summer storms shape Kissimmee water losses.",
    risks: ["Lake and wetland flooding","Intense summer thunderstorm flooding","Hurricane wind and water intrusion","Humidity-driven mold growth"],
    intro: [
      "Kissimmee sits in Central Florida's lake country, surrounded by lakes, wetlands and the headwaters of the Everglades system. That water-rich terrain, combined with the region's intense summer thunderstorm season, makes flooding a recurring risk: heavy rain overwhelms drainage and pushes water into homes across the city, and hurricane systems crossing the peninsula add wind-driven rain.",
      "The housing stock spans older homes near downtown to large newer subdivisions serving the tourism corridor. Each fails differently when water gets in, but the constant is humidity, which turns untreated moisture to mold fast. We dry to clearance standard and fix the source so it does not come back.",
      "We respond across Kissimmee and Osceola County, documenting each loss the way a Florida insurer needs. This is an active market for our crews, backed by real projects on the ground.",
    ],
    neighborhoods: ["Downtown Kissimmee", "Buenaventura Lakes", "Poinciana edge", "Celebration edge", "Lakeside"],
  },

  "st-cloud": {
    riskHeadline: "Lakefront terrain and Central Florida storms drive St. Cloud water losses.",
    risks: ["Lake and canal flooding","Intense summer thunderstorm flooding","Hurricane wind and water intrusion","Humidity-driven mold growth"],
    intro: [
      "St. Cloud sits on the shore of East Lake Tohopekaliga in Central Florida, and that lakefront position shapes its water risk. Heavy summer storms and hurricane systems raise the lake and overwhelm local drainage, pushing water into homes near the shore and across the city's growing subdivisions.",
      "St. Cloud is growing fast, with newer slab-built homes alongside its older core near the lake. Water that gets under flooring or behind drywall sits against the slab, and in Central Florida humidity it becomes mold quickly. We focus on fast extraction and complete drying to protect the home.",
      "We respond across St. Cloud and southern Osceola County, documenting each loss for your insurer. Our crews have real projects on the ground here.",
    ],
    neighborhoods: ["Downtown St. Cloud", "Lakefront", "Stevens Plantation", "Anthem Park", "Narcoossee edge"],
  },

  "winter-springs": {
    riskHeadline: "Wooded, lake-dotted terrain makes Winter Springs prone to storm flooding.",
    risks: ["Lake and retention-pond flooding","Intense summer thunderstorm flooding","Hurricane wind and water intrusion","Humidity-driven mold growth"],
    intro: [
      "Winter Springs sits in the wooded, lake-dotted terrain of Seminole County north of Orlando. Its many lakes and retention ponds manage drainage, but the region's intense summer storms and hurricane systems overwhelm them, sending water into homes across the city's established and newer neighborhoods.",
      "The housing stock ranges from mature subdivisions to newer builds, with construction that hides moisture in different places. In Central Florida humidity, any water left untreated becomes mold fast. We trace the source, dry to standard, and stop the mold before it spreads.",
      "We respond across Winter Springs and the surrounding Seminole County communities, documenting each loss the way a Florida claim requires.",
    ],
    neighborhoods: ["Tuscawilla", "Highlands", "Oak Forest", "Hawks Reserve", "Parkstone"],
  },

  sarasota: {
    riskHeadline: "Gulf coastal exposure and barrier islands make Sarasota losses spread fast.",
    risks: ["Gulf storm surge and coastal flooding","Barrier-island and bayfront flooding","Hurricane wind and water intrusion","Humidity-driven mold in seasonal homes"],
    intro: [
      "Sarasota sits on the Gulf with barrier islands, bayfront neighborhoods and a downtown right at the water's edge. That coastal exposure drives its water risk: storm surge and tidal flooding reach the keys and bayfront, while heavy seasonal rain and a high water table keep moisture in slabs inland.",
      "Many Sarasota properties are seasonal, closed for months with the air conditioning set high, the perfect condition for mold to take hold unnoticed. We know how to find hidden moisture in a closed-up coastal home and dry it to clearance standard.",
      "We respond across Sarasota, from Siesta Key and Lido to the downtown and inland communities, documenting each coastal loss the way Florida carriers require.",
    ],
    neighborhoods: ["Siesta Key", "Lido Key", "Downtown Sarasota", "Gulf Gate", "Palmer Ranch"],
  },

  stuart: {
    riskHeadline: "Riverfront and Atlantic exposure make Stuart water losses fast and recurring.",
    risks: ["St. Lucie River and tidal flooding","Atlantic storm surge","Hurricane wind and water intrusion","Humidity-driven mold growth"],
    intro: [
      "Stuart sits where the St. Lucie River meets the Atlantic on Florida's Treasure Coast, and that water-surrounded position drives its risk. Tidal flooding and river overflow reach downtown and riverfront homes, while the city's coastal exposure makes hurricane surge a real and recurring threat.",
      "The housing stock mixes historic downtown homes with newer waterfront development. Older properties hide moisture behind original construction, where mold takes hold after a slow leak or storm. Fast, documented drying keeps a manageable loss from becoming a renovation.",
      "We respond across Stuart and Martin County, from the downtown riverfront to the coastal communities, documenting each loss for your insurer.",
    ],
    neighborhoods: ["Downtown Stuart", "Sewall's Point", "Port Salerno edge", "Rocky Point", "North River Shores"],
  },

  wellington: {
    riskHeadline: "Equestrian community on low-lying land makes Wellington drainage critical.",
    risks: ["Canal and drainage flooding","Heavy summer rain and flash flooding","Humidity-driven mold growth","Hurricane wind and water intrusion"],
    intro: [
      "Wellington is known for its equestrian community and large lots, built on the low-lying western edge of Palm Beach County. Canals manage drainage across its flat terrain, but heavy summer storms and hurricane rain overwhelm the system, pushing water into homes, barns and outbuildings across the village.",
      "The housing stock ranges from gated estates to family subdivisions, mostly slab-built concrete block that holds moisture against the foundation. In the local humidity, untreated water becomes mold fast, so aggressive structural drying and source repair are essential.",
      "We respond across Wellington, from the equestrian neighborhoods to the residential communities near the mall, documenting each loss the way a Florida insurer needs.",
    ],
    neighborhoods: ["Palm Beach Point", "Olympia", "Versailles", "The Landings", "Equestrian Club"],
  },

  "miami-gardens": {
    riskHeadline: "Dense, flat terrain and aging homes make Miami Gardens losses spread fast.",
    risks: ["Flash flooding in low-lying streets","Aging roofs and plumbing leaks","Humidity-driven mold growth","Hurricane wind and water intrusion"],
    intro: [
      "Miami Gardens is a densely built city in northern Miami-Dade with a housing stock that skews older. That age shapes its water and mold losses: original plumbing, aging roofs and decades-old construction hide moisture behind block and plaster walls where leaks go unseen for weeks.",
      "The flat, built-up terrain drains slowly, so heavy rain pools in low-lying streets and pushes water into ground-floor units and slab homes. In the year-round humidity, water in a wall cavity becomes mold quickly. We trace it to the source and dry to clearance standard so it does not return.",
      "We respond across Miami Gardens, documenting each loss the way a Florida claim requires to move it forward.",
    ],
    neighborhoods: ["Andover", "Carol City", "Lake Lucerne", "Bunche Park", "Norland"],
  },

  "sunny-isles-beach": {
    riskHeadline: "High-rise barrier-island living makes Sunny Isles uniquely exposed to coastal water.",
    risks: ["Coastal and king-tide flooding","High-rise water intrusion","Hurricane storm surge","Humidity-driven mold growth"],
    intro: [
      "Sunny Isles Beach is a barrier-island city of oceanfront high-rises between Miami and Fort Lauderdale, and that setting makes its water risk distinct. King tides and storm surge reach the island's low elevation directly, while the towers themselves face a different challenge: water intrusion through facades, balconies and plumbing risers that can spread down multiple floors.",
      "High-rise losses move fast and are hard to trace, with water traveling through wall cavities and floor assemblies. In Miami's humidity, untreated moisture becomes mold within days. We have the equipment and experience to dry vertical losses and document them for condo associations and insurers.",
      "We respond across Sunny Isles Beach, working with residents, associations and property managers, documenting each loss the way a Florida claim requires.",
    ],
    neighborhoods: ["Oceanfront towers", "Golden Shores", "Intracoastal side", "Pinnacle area", "Town Center"],
  },

  "bonita-springs": {
    riskHeadline: "Gulf-adjacent terrain and the Imperial River make Bonita Springs prone to flooding.",
    risks: ["Imperial River and Gulf flooding","Storm surge and tidal flooding","High water table and slab moisture","Humidity-driven mold in seasonal homes"],
    intro: [
      "Bonita Springs sits between Naples and Fort Myers along the Gulf and the Imperial River, and that water-rich setting drives its risk. River overflow and Gulf surge reach low-lying neighborhoods, while a high coastal water table keeps slabs and crawl spaces damp long after a storm.",
      "Much of Bonita Springs is seasonal, with homes closed for months and the air conditioning set high, the perfect condition for mold to take hold unseen. We know how to find hidden moisture in a closed-up home and dry it to clearance standard.",
      "We respond across Bonita Springs and southern Lee County, from the beach communities to the inland developments, documenting each coastal loss the way Florida carriers require.",
    ],
    neighborhoods: ["Bonita Beach", "Pelican Landing", "Bonita Bay", "Spanish Wells", "Old Bonita Springs"],
  },

  homestead: {
    riskHeadline: "Agricultural-edge terrain and direct hurricane exposure define Homestead losses.",
    risks: ["Direct hurricane and storm-surge exposure","Flash flooding on flat terrain","Humidity-driven mold growth","Aging and newer mixed construction"],
    intro: [
      "Homestead sits at the southern edge of Miami-Dade near the agricultural lands and the entrance to the Keys, and its location makes hurricane exposure especially direct. Major storms tend to make landfall in this part of South Florida, bringing surge, wind-driven rain and the water intrusion that follows.",
      "The flat terrain drains slowly, so heavy rain pools and pushes water into slab homes across the city. Homestead mixes older construction with rapid new development, and in either case the local humidity turns untreated water to mold fast. We dry aggressively and fix the source so it does not return.",
      "We respond across Homestead and Florida City, documenting each loss the way a Florida insurer needs to approve the claim.",
    ],
    neighborhoods: ["Downtown Homestead", "Keys Gate", "Malibu Bay", "Florida City edge", "Leisure City"],
  },

  alva: {
    riskHeadline: "Rural Caloosahatchee riverfront makes Alva losses tied to river flooding.",
    risks: ["Caloosahatchee River flooding","Heavy seasonal rain","Hurricane wind and water intrusion","Humidity-driven mold growth"],
    intro: [
      "Alva is a small rural community along the Caloosahatchee River east of Fort Myers, and the river defines its water risk. Tidal influence and heavy seasonal rain raise the river and push water into riverfront homes and low-lying properties, while the area's direct exposure to Gulf hurricane systems adds surge and wind-driven rain.",
      "Alva's housing stock includes larger rural lots and older riverfront homes, where moisture hides behind original construction. In Southwest Florida humidity, untreated water becomes mold quickly, so fast, documented drying is essential.",
      "We respond across Alva and the surrounding rural Lee County area, documenting each loss the way a Florida claim requires.",
    ],
    neighborhoods: ["Riverfront Alva", "North Olga", "Old Alva", "Caloosahatchee shore", "Rural Alva"],
  },
};
