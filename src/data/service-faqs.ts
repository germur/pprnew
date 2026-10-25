export type FAQItem = { question: string; answer: string };
export const INSURANCE_ANSWER = 'Coverage depends on your policy, the cause of the damage and your insurer’s review. We can discuss documentation for the restoration work. Confirm billing arrangements and any amount you may owe before authorizing work.';
export const ARRIVAL_ANSWER = 'Call 24/7 to discuss your location and the damage. Availability and arrival depend on the property, access, conditions and current demand. A website request does not confirm a dispatch or arrival time.';
export const MOLD_ROLE_ANSWER = 'Confirm who will perform the assessment, sampling, laboratory analysis and remediation before booking. A separate laboratory does not by itself establish that the assessment is independent of remediation. Ask about the professionals, their credentials and the proposed scope.';
export const SERVICE_FAQS: Record<string, FAQItem[]> = {
  'water-damage': [
    { question: 'How fast can you respond?', answer: ARRIVAL_ANSWER },
    { question: 'Will insurance cover the work?', answer: INSURANCE_ANSWER },
    { question: 'Can affected floors and drywall be saved?', answer: 'The assessment considers the material, its condition, contamination and access. Some materials may be suitable for drying; others may need removal. The proposed scope should explain the recommendation for your property.' },
    { question: 'How long does drying take?', answer: 'Drying time depends on affected materials, the extent of moisture, access and progress readings. Ask for an initial estimate after assessment and updates as conditions change.' },
    { question: 'Does every water loss require mold testing?', answer: 'No. An inspection helps determine the next step. EPA guidance says sampling is generally unnecessary when visible mold is already present. Ask what a proposed test would establish before paying for it.' },
  ],
  'fire-damage': [
    { question: 'Can smoke odors and affected belongings be recovered?', answer: 'Recovery depends on the materials and the extent of heat, smoke, soot and water exposure. The assessment should identify items suitable for cleaning, those needing specialist attention and those that cannot be recovered. Ask which outcomes are realistic for each material after the assessment.' },
    { question: 'What about water used during firefighting?', answer: 'The assessment can include water-affected areas as well as smoke and fire damage. Any extraction, drying, cleaning and repair work should be identified in the agreed scope.' },
    { question: 'Will insurance cover the work?', answer: INSURANCE_ANSWER },
    { question: 'How long does fire restoration take?', answer: 'The schedule depends on the extent of damage, safe access, the agreed work and any specialist repairs. Ask for an estimated sequence after assessment and updates if the scope changes.' },
  ],
  'storm-damage': [
    { question: 'Can you attend during a hurricane?', answer: 'Call to discuss your situation and availability. Site access and work depend on safe conditions, local access restrictions and demand. A call or website request does not reserve an arrival time.' },
    { question: 'Can you tarp a roof the same day?', answer: 'The team must confirm availability, safe access, roof conditions and the proposed temporary protection. Same-day attendance is not guaranteed.' },
    { question: 'Will insurance cover the work?', answer: INSURANCE_ANSWER },
    { question: 'Does drying guarantee that mold will not develop?', answer: 'Moisture control is important, but an assessment is needed to identify affected materials and any existing growth. Drying work and any additional mold-related work should be discussed as separate parts of the scope.' },
    { question: 'Do you handle structural and tree damage?', answer: 'Describe the damage when you contact us. Structural repairs, roofing, utilities and tree work may require separate specialists. Confirm who is responsible for each part before work begins.' },
  ],
  'mold-remediation': [
    { question: 'Is the color of mold enough to identify its risk?', answer: 'No. Color does not establish the species or the effect on someone’s health. Our guide links to CDC and EPA information; contact a healthcare professional about symptoms or individual health concerns.' },
    { question: 'Is testing always needed before remediation?', answer: 'No. EPA says visible mold generally does not need sampling to establish that cleanup is needed. Assessment and the proposed scope determine the next steps. Confirm the roles and qualifications of the professionals involved.' },
    { question: 'Can you guarantee mold will not return?', answer: 'Mold can return if moisture remains or a new water problem develops. Discuss moisture control, the proposed cleanup and follow-up with the professionals involved.' },
    { question: 'Will insurance cover the work?', answer: INSURANCE_ANSWER },
    { question: 'How long does remediation take?', answer: 'Timing depends on affected materials, access, the agreed scope and any follow-up assessment. Ask for an estimate after the property has been evaluated.' },
  ],
  'mold-testing': [
    { question: 'Is testing always necessary?', answer: 'No. EPA says that sampling is generally unnecessary when visible mold is present. A proposed test should answer a specific question and explain how the result would affect the next step.' },
    { question: 'How is the cost determined?', answer: 'Ask for a written scope identifying inspection, any samples, laboratory work, reporting and follow-up. Confirm the price and any additional charges before booking.' },
    { question: 'Who performs the assessment and remediation?', answer: MOLD_ROLE_ANSWER },
    { question: 'Does a test establish that a building is safe?', answer: 'A sampling result describes the samples collected and their conditions. It does not establish an individual’s health risk or guarantee an entire building is safe. Review the findings, limitations and moisture conditions with the assessing professional.' },
    { question: 'What is a post-remediation assessment?', answer: 'It is a review against the agreed assessment or remediation criteria. Confirm who will perform it, whether sampling is included and what the report can conclude. There is no universal federal mold threshold that proves a building is safe.' },
  ],
};
