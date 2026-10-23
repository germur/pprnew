/** Editorial notes grounded in the approved photos, not inferred job outcomes. */
export interface CityProjectStory {
  heading: string;
  observation: string;
  relevance: string;
  nextStep: string;
  serviceUrl: string;
  serviceLabel: string;
  captions: string[];
}

export const CITY_PROJECT_STORIES: Record<string, CityProjectStory> = {
  'weston-114190723': {
    heading: 'A closer look at an opened wall in Weston',
    observation: 'These Weston project photos show exposed wall layers around a window opening. Broken interior surfaces and the surrounding framing are visible, with a second angle recording the same work area.',
    relevance: 'The wider view connects the affected materials to the window and nearby surfaces. Close documentation gives a property owner a specific area to discuss when requesting an assessment and reviewing the proposed scope.',
    nextStep: 'If you are reporting a similar issue, describe where the wall is affected, whether there is an active leak and which adjoining rooms are involved.',
    serviceUrl: '/restoration/water-damage/',
    serviceLabel: 'Explore water damage assessment and restoration',
    captions: ['Opened interior wall and exposed materials around the window area in Weston.', 'A second view documents the surrounding framing and wall layers.'],
  },
  'doral-105974310': {
    heading: 'Moisture checks at the base of a Doral wall',
    observation: 'Our Doral documentation includes two views of an instrument positioned along the base of an interior wall. The photographs show the reading locations in relation to the baseboard and floor.',
    relevance: 'Recording a reading together with its location helps connect an inspection to the materials being discussed. Here, the focus is the lower wall edge, a detail that is easy to miss in a photograph of the whole room.',
    nextStep: 'When requesting help, identify the affected room and describe any staining, lifting trim or known water source near the floor.',
    serviceUrl: '/restoration/water-damage/',
    serviceLabel: 'Learn about moisture assessment and structural drying',
    captions: ['Instrument positioned at the lower wall and baseboard during a Doral property visit.', 'A second location along the wall base is recorded with the instrument in view.'],
  },
  'miami-111079436': {
    heading: 'Ceiling and wall conditions documented in Miami',
    observation: 'These Miami photographs follow the junction between a tiled interior wall and an opened ceiling area. One view shows the surrounding room; the other records the affected ceiling materials more closely.',
    relevance: 'Showing both the setting and the material detail helps explain exactly which part of a room needs attention. It also creates a visual reference for conversations about access, affected finishes and the next assessment.',
    nextStep: 'Tell our team which room is involved, whether the issue is still changing and if a leak or other water event has been noticed.',
    serviceUrl: '/restoration/water-damage/',
    serviceLabel: 'Explore help with water-damaged ceilings and walls',
    captions: ['Ceiling opening and adjacent tiled wall documented at a Miami property.', 'Closer view of the ceiling materials and the wall junction.'],
  },
  'naples-107953477': {
    heading: 'Following up on a ceiling mark in Naples',
    observation: 'The Naples project record pairs a view of a marked ceiling area with a photograph of an instrument held against the ceiling. Together, they connect a visible condition with the location being checked.',
    relevance: 'A clear record of the mark and its position makes an assessment easier to discuss. The images provide a starting point for questions about the ceiling, the room above and any known history of moisture in the area.',
    nextStep: 'When you contact us, explain when the mark was first noticed and whether it has changed. Mention any known leak or work affecting that part of the property.',
    serviceUrl: '/restoration/water-damage/',
    serviceLabel: 'Read about water damage inspection and drying',
    captions: ['Visible ceiling mark and inspection tool photographed during a Naples visit.', 'Instrument check recorded against the ceiling surface.'],
  },
  'cape-coral-112078214': {
    heading: 'Equipment placement documented in Cape Coral',
    observation: 'This Cape Coral project photograph shows portable equipment positioned inside a property beside a doorway. The nearby wall and floor give context to the equipment location.',
    relevance: 'Equipment is part of the property visit, and its placement is useful information for the owner. A room-level photograph makes it easier to discuss access, the area in use and what is happening inside the home.',
    nextStep: 'If equipment is needed at your property, ask the team to explain its purpose, where it will sit and how access to the room will be managed.',
    serviceUrl: '/our-process/',
    serviceLabel: 'See how an assessment and restoration visit works',
    captions: ['Portable equipment beside an interior doorway at the Cape Coral property.'],
  },
  'sunny-isles-beach-106117406': {
    heading: 'Recording conditions at a Sunny Isles Beach property',
    observation: 'The Sunny Isles Beach project photo records an instrument screen outside a building, with the wall and walkway visible behind it. The setting identifies where the reading was being documented.',
    relevance: 'The location of a measurement gives it context. A photograph of the instrument and its surroundings can support a conversation about the inspection and how outdoor and indoor observations are being recorded.',
    nextStep: 'If you are arranging an inspection, describe the specific indoor issue you want checked and ask which areas and conditions the visit will cover.',
    serviceUrl: '/restoration/mold-testing/',
    serviceLabel: 'Explore inspection and testing options',
    captions: ['Instrument reading documented outside the Sunny Isles Beach property, with the surrounding walkway visible.'],
  },
  'coral-springs-110858457': {
    heading: 'An indoor condition check in Coral Springs',
    observation: 'This Coral Springs project photo shows an instrument screen beside an interior wall. The image keeps the reading and the indoor setting together in the property record.',
    relevance: 'A documented measurement gives the owner a concrete point to ask about during an assessment. The useful discussion is what was checked, where it was checked and whether additional observations are needed elsewhere in the property.',
    nextStep: 'When contacting the team, name the affected room and explain what prompted the inspection, such as an odor, a visible mark or a known water issue.',
    serviceUrl: '/restoration/mold-testing/',
    serviceLabel: 'Learn about property inspection and mold testing',
    captions: ['Instrument screen and adjacent interior wall recorded during a Coral Springs visit.'],
  },
  'port-st-lucie-110960030': {
    heading: 'Documenting the work area in Port St. Lucie',
    observation: 'These Port St. Lucie photos record an interior area with cabinetry, flooring and appliances. The two viewpoints show how the fixtures and floor relate to the surrounding work area.',
    relevance: 'A property record needs context as well as close-ups. Showing the room layout helps the owner and team identify which finishes, fixtures and access routes are involved in a conversation about the scope.',
    nextStep: 'Describe which surfaces or fixtures concern you, where the issue appears and whether access to appliances or adjoining rooms is affected.',
    serviceUrl: '/our-process/',
    serviceLabel: 'Understand the assessment and restoration process',
    captions: ['Cabinetry, flooring and the interior work area documented in Port St. Lucie.', 'A second viewpoint records the appliances and nearby floor area.'],
  },
};
