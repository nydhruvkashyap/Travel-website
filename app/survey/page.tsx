// app/survey/page.tsx (Corrected Full SurveyPage Component)

"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem";
import { Progress } from "../components/ui/progress";

const travelInterests = [
  { id: "cultural", label: "Cultural Tourism", description: "Step into ancient worlds where palaces, forts, and timeless traditions still breathe." },
  { id: "spiritual", label: "Spiritual & Wellness Tourism", description: "From sunrise yoga by the Ganges to silent Himalayan retreats, reconnect with what matters most." },
  { id: "adventure", label: "Adventure Tourism", description: "Feel your heart race in India’s wild landscapes — whether you’re trekking, rafting, or spotting tigers." },
  { id: "beach", label: "Beach & Coastal Tourism", description: "Chase sunsets on golden beaches, dive into coral waters, or drift along peaceful coastal backwaters." },
  { id: "culinary", label: "Culinary Tourism", description: "Taste the chaos and comfort of India — from sizzling street food to centuries-old cooking traditions." },
  { id: "festivals", label: "Festivals & Events Tourism", description: "Get swept up in color, music, and joy — India’s festivals aren’t watched, they’re lived." },
];

const subSegments: Record<string, string[]> = {
    adventure: [
      "Trek in the Himalayas or Western Ghats",
      "Go white-water rafting or kayaking",
      "Spot wildlife in a national park",
      "Camp under the stars in scenic locations",
      "Explore caves, canyons, or surreal landscapes"
    ],
    cultural: [
      "Walk through ancient forts and palaces",
      "Explore traditional art forms like dance and theatre",
      "Join a local heritage walking tour",
      "Visit ancient ruins and UNESCO sites",
      "Discover artisan villages and local crafts"
    ],
    beach: [
      "Relax on quiet, scenic beaches",
      "Swim or snorkel in clear waters",
      "Cruise through backwaters in Kerala",
      "Explore coastal temples and heritage towns",
      "Feast on seafood by the sea"
    ],
    culinary: [
      "Try famous street food like pani puri, kebabs, and biryani",
      "Discover vegetarian and vegan specialties across regions",
      "Visit tea estates or coffee plantations and taste fresh brews",
      "Sample wines or craft beers at vineyards and microbreweries",
      "Join a regional food trail or traditional thali experience",
      "Learn to cook Indian dishes in a home-style setting"
    ],
    festivals: [
      "Celebrate Holi or Diwali with locals",
      "Join a traditional Indian wedding or ceremony",
      "Attend a music, dance, or cultural festival",
      "Explore rural fairs and temple festivals",
      "Experience India’s party scenes and nightlife"
    ],
    spiritual: [
      "Join a yoga or meditation retreat in nature",
      "Attend a sacred river ceremony (like the Ganga aarti)",
      "Visit monasteries or spiritual communities",
      "Explore India’s famous temples and pilgrimage routes",
      "Experience healing traditions like Ayurveda or sound therapy"
    ]
  };
  

export default function SurveyPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [orderedItems, setOrderedItems] = useState(travelInterests.map((item) => item.id));
  const [answers, setAnswers] = useState({
    country: "",
    group: "",
    groupSize: "",
    style: "",
    budgetType: "",
    budgetAmount: "",
    focusNote: "" ,
    travelDate: "",
    knowsTravelDate: "",
    duration: "",
    topSegments: [] as string[],
    weatherNote: "",
    subPrefs: {} as Record<string, string[]>,
    notes: "",
  });

  const handleInput = (key: string, val: string) => setAnswers({ ...answers, [key]: val });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOrderedItems((items) => arrayMove(items, items.indexOf(active.id), items.indexOf(over.id)));
    }
  };

  const handleSubDragEnd = (key: string, event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const newList = arrayMove(
        answers.subPrefs[key],
        answers.subPrefs[key].indexOf(active.id),
        answers.subPrefs[key].indexOf(over.id)
      );
      setAnswers({ ...answers, subPrefs: { ...answers.subPrefs, [key]: newList } });
    }
  };

  const renderInput = (label: string, key: string, placeholder = "") => (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        className="w-full p-3 border border-gray-300 rounded-xl"
        value={(answers as any)[key]}
        placeholder={placeholder}
        onChange={(e) => handleInput(key, e.target.value)}
      />
    </div>
  );

  const renderSubPrefDrag = (segment: string) => (
    <DndContext collisionDetection={closestCenter} onDragEnd={(e) => handleSubDragEnd(segment, e)}>
      <SortableContext items={answers.subPrefs[segment]} strategy={verticalListSortingStrategy}>
        {answers.subPrefs[segment].map((item, index) => (
          <SortableItem key={item} id={item}>
            <div className="p-3 border rounded-md mb-2 bg-gray-50 flex items-center gap-3">
              <div className="text-sm font-bold w-6 text-center">{index + 1}</div>
              <div className="text-sm text-gray-800">{item}</div>
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );

  const validateStep = () => {
    switch (step) {
      case 1:
        return orderedItems.slice(0, 3).length === 3;
      case 2:
        return answers.country.trim() !== "";
      case 3:
        return answers.group.trim() !== "" && answers.groupSize.trim() !== "";
      case 4:
        return answers.style.trim() !== "";
      case 5:
        return answers.budgetType.trim() !== "" && answers.budgetAmount.trim() !== "";
      case 6:
        return answers.travelDate.trim() !== "";
      case 7:
        return answers.duration.trim() !== "";
      default:
        return true;
    }
  };

  const handleContinue = () => {
    if (!validateStep()) return;
    if (step === 1) {
      const top3 = orderedItems.slice(0, 3);
      const subPrefs: Record<string, string[]> = {};
      top3.forEach((segment) => (subPrefs[segment] = subSegments[segment]));
      setAnswers({ ...answers, topSegments: top3, subPrefs });
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const currentProgress = (step / 11) * 100;

  return (
    <div className="min-h-screen bg-white px-4 py-6 max-w-3xl mx-auto">
      <Progress value={currentProgress} className="mb-6" />
      {      /* Step 1: Travel Interests */
      step === 1 && (
        <div>
          <h1 className="text-2xl font-semibold mb-2">What kind of travel excites you most in India?</h1>
          <p className="mb-4 text-gray-600">Drag and drop to rank your top 3 — most exciting at the top.</p>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={orderedItems} strategy={verticalListSortingStrategy}>
              {orderedItems.map((id, index) => {
                const item = travelInterests.find((i) => i.id === id)!;
                const isTopThree = index < 3;
                return (
                  <SortableItem key={item.id} id={item.id}>
                    <div className={`px-3 py-2 border rounded-md mb-1 ${isTopThree ? 'bg-blue-100 border-blue-400' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="text-base font-semibold text-gray-700 w-6 text-center">{index + 1}</div>
                        <div className="flex-1 grid grid-cols-[240px_1fr] items-center gap-3">
                          <div className="text-sm font-medium text-gray-800">{item.label}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                      </div>
                    </div>
                  </SortableItem>
                );
              })}
            </SortableContext>
          </DndContext>
          <div className="mt-4">
  <label className="block mb-1 text-sm font-medium text-gray-700">
    Anything travel theme-related you'd like us to know?
  </label>
  <textarea
    value={answers.focusNote}
    onChange={(e) => handleInput("focusNote", e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 min-h-[60px]"
    placeholder="Optional: e.g., 'Want to focus on wellness' or 'Open to all except beaches'"
  />
</div>


<div className="mt-6 flex justify-end">
  <button
    onClick={handleContinue}
    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm"
  >
    Continue
  </button>
</div>

        </div>
      )}
  
      {/* Step 2: Country */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Which country are you based in?</h2>
          <p className="text-gray-600 mb-3">This helps us tailor recommendations based on distance, seasons, and visa rules.</p>
          {renderInput("Your Country", "country", "e.g., United States")}
          <div className="mt-6 flex justify-between">
            <button onClick={handleBack} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300">Back</button>
            <button onClick={handleContinue} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Continue</button>
          </div>
        </div>
      )}
  
  {step === 3 && (
  <div>
    <h2 className="text-2xl font-semibold mb-2">Who are you traveling with?</h2>
    <p className="text-gray-600 mb-3">Choose the option that best describes your group</p>

    {["Solo", "Partner", "Friends", "Family with kids", "Family with elders", "Group tour or mixed"].map((opt) => (
      <div key={opt} className="mb-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="travel-group"
            value={opt}
            checked={answers.group === opt}
            onChange={() => {
              setAnswers((prev) => ({
                ...prev,
                group: opt,
                groupSize: opt === "Solo" ? "1" : opt === "Partner" ? "2" : ""
              }));
            }}
            className="mr-2"
          />
          {opt}
        </label>
      </div>
    ))}

    {answers.group &&
      !["Solo", "Partner"].includes(answers.group) && (
        <div className="mt-4">
          {renderInput("How many people (including you) will be traveling?", "groupSize", "e.g., 3")}
        </div>
      )}

    <div className="mt-6 flex justify-between">
      <button onClick={handleBack} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300">Back</button>
      <button onClick={handleContinue} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Continue</button>
    </div>
  </div>
)}
{step === 4 && (
  <div>
    <h2 className="text-2xl font-semibold mb-4">How would you describe your travel style?</h2>
    <p className="text-gray-600 mb-4">This helps us shape your itinerary to match how you love to travel.</p>

    {[
      {
        label: "Curious Explorer",
        description:
          "You love discovering new cultures, local traditions, and hidden gems off the tourist trail.",
      },
      {
        label: "Balanced Traveler",
        description:
          "You like a mix of exploration and relaxation — a bit of adventure, some local flavor, and downtime too.",
      },
      {
        label: "Comfort-First",
        description:
          "You prefer a smoother, safer travel experience with reliable options, comfortable stays, and low physical effort.",
      },
      {
        label: "Luxury Seeker",
        description:
          "You’re looking for premium accommodations, curated experiences, and high-end services.",
      },
    ].map((opt) => (
      <label
        key={opt.label}
        className="flex items-start mb-3 p-3 border border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer"
      >
        <input
          type="radio"
          name="travel-style"
          value={opt.label}
          checked={answers.style === opt.label}
          onChange={() => handleInput("style", opt.label)}
          className="mt-1 mr-4 accent-blue-600"
        />
        <div className="grid grid-cols-[180px_1fr] gap-4">
          <div className="font-medium text-gray-800">{opt.label}</div>
          <div className="text-sm text-gray-600">{opt.description}</div>
        </div>
      </label>
    ))}

<div className="mt-6">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Do you have any weather related preferences or sensitivities that we should know about?
  </label>
  <textarea
    value={answers.weatherNote}
    onChange={(e) => handleInput("weatherNote", e.target.value)}
    placeholder='Optional: e.g., "Prefer cooler climates", "Avoid humidity", "Love misty hills", "Hate heavy rain"...'
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[80px]"
  />
</div>



    <div className="mt-6 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300"
      >
        Back
      </button>
      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  </div>
)}

      {/* Step 5: Budget */}
      {step === 5 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">How would you be budgeting for your trip?</h2>
          <div className="mb-4">
            <label className="mr-4">
              <input type="radio" value="per person" checked={answers.budgetType === "per person"} onChange={() => handleInput("budgetType", "per person")} /> Per person
            </label>
            <label className="ml-4">
              <input type="radio" value="group total" checked={answers.budgetType === "group total"} onChange={() => handleInput("budgetType", "group total")} /> Total for group
            </label>
          </div>
          {renderInput(`Estimated trip budget with currency(excluding flights) (${answers.budgetType})`, "budgetAmount", "e.g., 1000 Euros")}
          <div className="mt-6 flex justify-between">
            <button onClick={handleBack} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300">Back</button>
            <button onClick={handleContinue} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Continue</button>
          </div>
        </div>
      )}
  
  {step === 6 && (
  <div>
    <h2 className="text-2xl font-semibold mb-2">
      Do you already know when your trip to India might begin?
    </h2>
    <p className="text-gray-600 mb-4">
      Even if it’s just an estimate, this helps us align suggestions with weather, festivals, and availability.
    </p>

    <div className="mb-4">
      {["Yes", "No"].map((option) => (
        <label key={option} className="inline-flex items-center mr-6">
          <input
            type="radio"
            name="knowsTravelDate"
            value={option}
            checked={answers.knowsTravelDate === option}
            onChange={() => handleInput("knowsTravelDate", option)}
            className="mr-2 accent-blue-600"
          />
          {option}
        </label>
      ))}
    </div>

    {/* This section ONLY appears after Yes/No selection */}
    {answers.knowsTravelDate && (
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          {answers.knowsTravelDate === "Yes"
            ? "Confirmed Start Date"
            : "Estimated Start Date"}
        </label>
        <input
          type="text"
          value={answers.travelDate}
          onChange={(e) => handleInput("travelDate", e.target.value)}
          placeholder="e.g., 15 July 2025 or 'next winter'"
          className="w-full p-3 border border-gray-300 rounded-xl"
        />
      </div>
    )}

    <div className="mt-6 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300"
      >
        Back
      </button>
      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        disabled={!answers.knowsTravelDate || answers.travelDate.trim() === ""}
      >
        Continue
      </button>
    </div>
  </div>
)}

  
      {/* Step 7: Duration */}
      {step === 7 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">How many days are you planning to spend in India?</h2>
          {renderInput("Trip Duration (Days)", "duration", "e.g., 10")}
          <div className="mt-6 flex justify-between">
            <button onClick={handleBack} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300">Back</button>
            <button onClick={handleContinue} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Continue</button>
          </div>
        </div>
      )}
  
      {/* Steps 8–10: Sub-Segment Rankings */}
      {[8, 9, 10].includes(step) && (
  <div>
    <h2 className="text-2xl font-semibold mb-2">
      What kind of experiences are you most excited about in{" "}
      <span className="capitalize text-blue-700 font-bold">
        {answers.topSegments[step - 8]?.replace(/\b\w/g, (l) => l.toUpperCase())} Tourism
      </span>
      ?
    </h2>
    <p className="mb-4 text-gray-600">
      Drag and drop to rank the activities that excite you the most — your top pick should come first.
    </p>
    {renderSubPrefDrag(answers.topSegments[step - 8])}
    <div className="mt-6 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300"
      >
        Back
      </button>
      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  </div>
)}

  
      {/* Step 11: Final Notes */}
      {step === 11 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Anything else you'd like us to know while planning your trip?</h2>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-xl min-h-[120px]"
            placeholder="e.g., Would love to see the Taj Mahal, vegetarian only, slower pace, want spiritual experiences..."
            value={answers.notes}
            onChange={(e) => handleInput("notes", e.target.value)}
          />
        


<button
  onClick={() => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
    router.push("/survey-complete");
  }}
  className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
>
  Finish
</button>
        </div>
      )}
    </div>
  );
}