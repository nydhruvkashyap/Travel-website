export type SurveyData = {
  country: string;
  group: string;
  groupSize: string;
  style: string;
  budgetType: string;
  budgetAmount: string;
  focusNote?: string;
  travelDate: string;
  knowsTravelDate: string;
  duration: string;
  topSegments: string[];
  subPrefs: Record<string, string[]>;
  notes?: string;
  weatherNote?: string;
};

export function createPromptFromSurvey(data: SurveyData): string {
  const {
    country,
    group,
    groupSize,
    style,
    budgetType,
    budgetAmount,
    focusNote,
    travelDate,
    knowsTravelDate,
    duration,
    topSegments,
    subPrefs,
    notes,
    weatherNote,
  } = data;

  // Traveler profile definitions.
  const travelerDefinitions = {
    "Curious Explorer": "You love discovering new cultures, local traditions, and hidden gems off the tourist trail.",
    "Balanced Traveler": "You like a mix of exploration and relaxation — a bit of adventure, some local flavor, and downtime too.",
    "Comfort-First": "You prefer a smoother, safer travel experience with reliable options, comfortable stays, and low physical effort.",
    "Luxury Seeker": "You’re looking for premium accommodations, curated experiences, and high-end services at a relaxed travel pace.",
  };

  const styleDefinition = travelerDefinitions[style as keyof typeof travelerDefinitions] || "";

  // Mapping from segment ID (in any case) to its full display name.
  const segmentMapping: Record<string, string> = {
    cultural: "Cultural Tourism",
    adventure: "Adventure Tourism",
    "spiritual & wellness": "Spiritual and Wellness Tourism",
    beach: "Beach & Coastal Tourism",
    culinary: "Culinary Tourism",
    festivals: "Festivals & Events Tourism",
  };

  // Convert stored top segment IDs to full display names using the mapping.
  const topSegmentsFull = topSegments.map(
    (s: string) => segmentMapping[s.toLowerCase()] || s
  );

  // Build the preferred experiences section using the full names.
  const segmentDetails = topSegments.map((segment: string) => {
    const key = segment.toLowerCase();
    const prefs = subPrefs[segment] || [];
    const fullName = segmentMapping[key] || segment;
    return `${fullName} Preferred Experiences:\n${prefs.length > 0 ? prefs.map((p: string) => `- ${p}`).join("\n") : "- N/A"}`;
  }).join("\n\n");

  const tripTiming = knowsTravelDate === "Yes"
    ? `starting around ${travelDate}`
    : `sometime around ${travelDate} (estimated)`;

  return `
Generate a personalized ${duration}-day travel itinerary for a "${style}" based traveler from ${country}, traveling with ${group.toLowerCase()} (${groupSize} people). Their approximate budget is ${budgetAmount} (${budgetType}), and they are planning a trip to India ${tripTiming}.

The traveler’s top interests in order of priority are:
${topSegmentsFull.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n")}

${focusNote?.trim() ? `They also mentioned: "${focusNote.trim()}"\n` : ""}

Their preferred experiences within each interest in order of priority (consider top 3, except while making tradeoffs):
${segmentDetails}

Traveler Profile:
"${style}" — ${styleDefinition}

${weatherNote?.trim() ? `Weather Preferences: "${weatherNote.trim()}"\n` : ""}
${notes?.trim() ? `Final note from the traveler: "${notes.trim()}"\n` : ""}

Ensure the itinerary aligns with the preferences and travel personality of a "${style}". Include seasonal details (e.g., monsoons in July) and ensure a high level of personalization, and seamlessly mention within the itinerary where and when it deviates from the input prompt. 

IMPORTANT: 
Please format the output so it can be easily rendered into a PDF using pdf-lib. 
Each day should begin with a line starting with "DAY X: [Title]".
Each activity MUST begin with a hyphen and a space ("- "). Do not use round bullets (•), numbers, or any other symbols. Only use "- ".
Use a blank line to separate each day section.
Do not use any Markdown, emojis, or extra styling.
Keep each line under 100 characters for better readability.
`.trim();
}
