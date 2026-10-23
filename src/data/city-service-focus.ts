export interface CityServiceFocus {
  title: string;
  description: string;
  heading: string;
  intro: string;
  sections: { id: string; heading: string; paragraphs: string[]; serviceLabel: string; serviceUrl: string }[];
  prepare: string[];
  faqs: { question: string; answer: string }[];
}

// Editorial scope: respond to a specific property problem without implying a local office or a completed project.
export const CITY_SERVICE_FOCUS: Record<string, CityServiceFocus> = {
  'bonita-springs': {
    title: 'Bonita Springs Fire, Smoke & Water Restoration | Paramount',
    description: 'Fire and smoke damage restoration in Bonita Springs, FL. Discuss soot cleanup, smoke odor, affected contents and water damage. Call Paramount 24/7.',
    heading: 'Fire and smoke damage restoration in Bonita Springs',
    intro: 'After a fire, the rooms that look untouched can still need attention. Tell us where smoke traveled, which materials are affected and whether water was used to extinguish the fire. We can discuss an assessment for your Bonita Springs property and the documentation needed for the work.',
    sections: [
      { id: 'fire-smoke', heading: 'Soot cleanup and smoke odor: define the scope first', paragraphs: [
        'Soot on a painted wall, smoke residue on cabinets and odor in upholstered belongings are different problems. An assessment helps identify the affected rooms and materials, the cleaning approach to consider, and which items may require specialist attention. Odor treatment should be discussed alongside residue removal and the source of the smell.',
        'For a house, condo or commercial space, explain who controls access and whether common areas or neighboring units are involved. Before work begins, ask for a written scope that distinguishes surface cleaning, contents handling, odor treatment and any removal of affected materials. Reconstruction or repairs outside that scope should be identified separately.'
      ], serviceLabel: 'Explore fire, smoke and soot restoration', serviceUrl: '/restoration/fire-damage/' },
      { id: 'water-after-fire', heading: 'Include water damage in the same assessment', paragraphs: [
        'Water used during firefighting can affect floors, wall cavities and contents beyond the visibly burned area. Let the team know about standing water, wet finishes and rooms below the fire. Extraction and drying needs should be documented separately from smoke and soot cleaning so the proposed work is clear.',
        'If you are away from a seasonal property, provide the contact details of the person who can grant access and any photos already available. Access arrangements, the extent of the affected area and the assessment determine the next steps; a telephone description alone cannot establish the full loss.'
      ], serviceLabel: 'Understand extraction and structural drying', serviceUrl: '/restoration/water-damage/' }
    ],
    prepare: ['Property address and a contact who can provide access.', 'When the fire occurred and whether access has been cleared by the appropriate authorities.', 'Rooms with smoke, soot, odor or water, plus photos you already have.', 'Insurer or property-manager details, if a claim or building coordination is involved.'],
    faqs: [
      { question: 'Can I request help for smoke damage without visible fire damage?', answer: 'Yes. Describe the smoke exposure, affected rooms and materials. The assessment determines the cleaning and odor-treatment scope; visible burning is not the only information relevant to the visit.' },
      { question: 'Does a restoration estimate include rebuilding?', answer: 'Ask for that distinction in writing. Cleaning, contents handling and drying are different from reconstruction. The team should explain what the proposed scope includes and what needs separate evaluation or coordination.' }
    ]
  },
  'cooper-city': {
    title: 'Cooper City Flood Cleanup & Water Restoration | Paramount',
    description: 'Flood damage cleanup and water restoration in Cooper City, FL. Discuss water extraction, affected floors, drying and documentation. Call Paramount 24/7.',
    heading: 'Flood damage cleanup in Cooper City',
    intro: 'Water on the floor is the starting point of an assessment, not the full scope. Tell us whether the water came from rain, a fixture, an appliance or an unknown source, and which rooms are affected. That information helps the team discuss the right next step for your Cooper City property.',
    sections: [
      { id: 'flood-cleanup', heading: 'From water removal to a documented drying plan', paragraphs: [
        'Flood cleanup can involve removing accessible water, examining wet finishes and checking materials that may retain moisture. The source of the water and the affected materials influence the proposed work. Explain whether water reached cabinets, flooring edges, closets or rooms on the other side of a wall, even if the main floor now looks dry.',
        'Ask how the affected area will be documented, what equipment is proposed and how drying progress will be checked. The estimate should make clear which materials are being dried, which may need removal and what is outside the agreed scope. Equipment time and a completion date depend on the property assessment.'
      ], serviceLabel: 'See the water extraction and drying process', serviceUrl: '/restoration/water-damage/' },
      { id: 'source-and-follow-up', heading: 'Separate the source repair from the resulting damage', paragraphs: [
        'Stopping a leaking appliance, repairing plumbing and drying the resulting water damage are different tasks. Tell us if the source has already been addressed and whether another trade is involved. An active source may require coordination before restoration work can be completed.',
        'For rain-related intrusion, note where water entered and whether the issue has happened before. Keep existing photos and any assessment or repair paperwork together. If you later need a mold inspection, discuss that as a separate question instead of assuming every water loss requires the same testing or treatment.'
      ], serviceLabel: 'Learn about mold inspection and testing', serviceUrl: '/restoration/mold-testing/' }
    ],
    prepare: ['Water source, if known, and when the issue was first noticed.', 'Affected rooms, floor finishes and cabinets.', 'Whether the source has been stopped or another trade is attending.', 'Existing photos and claim details, if applicable.'],
    faqs: [
      { question: 'Can you assess water damage after the standing water is gone?', answer: 'Yes. Describe the original extent of the water and the materials that were wet. A dry-looking surface does not establish the condition of all affected materials; the assessment helps define the remaining work.' },
      { question: 'Is a plumbing repair included in flood cleanup?', answer: 'Do not assume it is. Ask the team to distinguish the source repair from extraction, drying and restoration, and confirm any coordination or separate scope before approving work.' }
    ]
  },
  'deerfield-beach': {
    title: 'Deerfield Beach Storm & Water Damage Restoration | Paramount',
    description: 'Storm damage restoration in Deerfield Beach, FL. Discuss rain intrusion, affected interiors, drying and documentation for your property. Call Paramount 24/7.',
    heading: 'Storm damage restoration in Deerfield Beach',
    intro: 'A storm loss can begin with an opening at the roof or exterior and continue into ceilings, walls and floors. Describe the entry point, rooms affected and any temporary protection already in place so we can discuss an assessment for your Deerfield Beach property.',
    sections: [
      { id: 'storm-assessment', heading: 'Connect the entry point with the interior damage', paragraphs: [
        'A ceiling stain, wet wall or damaged floor may be part of the same water path. Include the rooms next to and below the visible issue when describing the loss. Tell the team whether rain is still entering and if a roofer, building manager or emergency service has already attended.',
        'Temporary protection, interior water removal, drying and permanent roof or exterior repair are separate parts of recovery. Ask which are included in the proposed scope and which require coordination. The assessment should establish priorities for the property rather than assume the same treatment for every storm loss.'
      ], serviceLabel: 'Explore storm and hurricane restoration', serviceUrl: '/restoration/storm-damage/' },
      { id: 'storm-drying', heading: 'Document affected materials and the drying work', paragraphs: [
        'Keep photos already taken, the date the damage was noticed and records of temporary measures. A restoration scope can then distinguish the original damage, the materials affected and the work proposed. Documentation supports a discussion with your insurer but does not determine coverage or guarantee a claim outcome.',
        'For condos and managed buildings, identify who can authorize access and whether common areas or adjacent units are involved. Let the team know about access restrictions before scheduling. The drying plan and any removal of materials depend on the actual extent of the damage.'
      ], serviceLabel: 'Read about water damage assessment and drying', serviceUrl: '/restoration/water-damage/' }
    ],
    prepare: ['When the intrusion began and where water entered, if known.', 'Photos of affected interiors and any temporary measures already taken.', 'Details of other trades or building staff involved.', 'The person authorized to approve access and the proposed work.'],
    faqs: [
      { question: 'Is storm restoration the same as a permanent roof repair?', answer: 'No. Discuss temporary protection, water mitigation and any permanent repair as distinct scopes. Confirm what the restoration proposal includes and which work requires another trade or separate coordination.' },
      { question: 'Can restoration documentation guarantee insurance coverage?', answer: 'No. Photos, readings and a written scope can help document the loss. Coverage and claim decisions remain subject to the policy and the insurer’s review.' }
    ]
  },
  'hobe-sound': {
    title: 'Hobe Sound Water Damage & Mold Restoration | Paramount',
    description: 'Water damage cleanup and mold remediation in Hobe Sound, FL. Discuss extraction, drying, affected materials and inspection. Call Paramount 24/7.',
    heading: 'Water damage cleanup and mold remediation in Hobe Sound',
    intro: 'Start with what you know about the property: when the issue appeared, where water or visible growth is present, and whether the moisture source has been addressed. We can discuss assessment, drying or remediation needs for your Hobe Sound property without assuming the cause from a photo alone.',
    sections: [
      { id: 'water-removal', heading: 'Emergency water removal and the work after extraction', paragraphs: [
        'Removing standing water does not by itself define the full restoration job. Floors, wall bases, cabinets and adjacent rooms may need assessment, depending on the source and spread of the water. Tell the team whether the water came from a leak, an appliance, rain or an unknown source and whether it is still entering.',
        'A written scope should explain the proposed extraction, drying and monitoring work, along with any materials that may require removal. Source repair and reconstruction should be identified separately. Ask what documentation you will receive and how progress will be evaluated before the work is considered complete.'
      ], serviceLabel: 'Explore water removal and structural drying', serviceUrl: '/restoration/water-damage/' },
      { id: 'mold-assessment', heading: 'Mold removal begins with the moisture problem and affected area', paragraphs: [
        'Visible growth, a musty odor and a history of water damage are useful information to share, but they do not establish the species of mold or the full extent of a problem. Describe the affected surfaces, whether the issue recurs and any previous cleaning, inspection or repairs.',
        'Inspection, sampling and remediation answer different questions. Discuss whether an inspection is needed, what any proposed samples would help establish and how the removal scope addresses affected materials and the moisture source. Testing should have a defined purpose rather than be assumed necessary for every property.'
      ], serviceLabel: 'Understand mold remediation', serviceUrl: '/restoration/mold-remediation/' }
    ],
    prepare: ['When the water or growth was first noticed and whether it has returned.', 'Affected rooms and materials, with existing photos if available.', 'Known source repairs, previous inspection reports or cleaning.', 'Access details and the best contact for scheduling an assessment.'],
    faqs: [
      { question: 'Do water removal and mold remediation mean the same work?', answer: 'No. Extraction and drying address water and wet materials. Mold remediation addresses affected materials under a separate assessed scope. A property may need one or both; explain the conditions so the team can discuss the appropriate assessment.' },
      { question: 'Should I order mold testing before discussing the property?', answer: 'Start by explaining the concern. Ask what question testing would answer and whether it would change the proposed work. You can review our mold inspection service to understand the difference between assessment, sampling and remediation.' }
    ]
  }
};
