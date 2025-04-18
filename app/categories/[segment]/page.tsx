"use client";

import { useParams } from "next/navigation";

const subSegments = {
  cultural: ["Heritage Site Visits", "Religious Site Visits"],
  adventure: ["Mountain and Trekking Adventures", "Water-Based Adventures", "Wildlife and Nature Tours", "Soft Adventures and Eco-Tours"],
  beach: ["Beach Recreation", "Water Sports"],
  spiritual: ["Spiritual Tourism", "Wellness Tourism"],
  festivals: ["Cultural Festivals/Events", "Religious Festivals", "Party Events and Nightlife"]
};

export default function SubSegmentPage() {
  const params = useParams();
  const segment = params.segment as keyof typeof subSegments;
  const segmentTitle = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");

  return (
    <main className="text-center px-6 py-12 bg-[#F9FAFB]">
      <h1 className="text-4xl font-bold text-[#1F2937] font-serif">{segmentTitle} Tourism</h1>
      <p className="text-lg text-gray-600 mt-2">
        Explore different experiences within this category.
      </p>
      <ul className="mt-6 space-y-4 max-w-3xl mx-auto">
        {subSegments[segment]?.map((sub) => (
          <li key={sub} className="text-lg font-medium text-[#6366F1] border-b pb-2 hover:text-[#4F46E5] transition">
            {sub}
          </li>
        ))}
      </ul>
    </main>
  );
}
