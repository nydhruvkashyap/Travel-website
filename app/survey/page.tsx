"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem";
import { Progress } from "../components/ui/progress";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { UniqueIdentifier } from "@dnd-kit/core";

const travelInterests = [
  {
    id: "cultural",
    label: "Cultural Tourism",
    description:
      "Step into ancient worlds where palaces, forts, and timeless traditions still breathe.",
  },
  {
    id: "spiritual",
    label: "Spiritual & Wellness Tourism",
    description:
      "From sunrise yoga by the Ganges to silent Himalayan retreats, reconnect with what matters most.",
  },
  {
    id: "adventure",
    label: "Adventure Tourism",
    description:
      "Feel your heart race in India’s wild landscapes — whether you’re trekking, rafting, or spotting tigers.",
  },
  {
    id: "beach",
    label: "Beach & Coastal Tourism",
    description:
      "Chase sunsets on golden beaches, dive into coral waters, or drift along peaceful coastal backwaters.",
  },
  {
    id: "culinary",
    label: "Culinary Tourism",
    description:
      "Taste the chaos and comfort of India — from sizzling street food to centuries-old cooking traditions.",
  },
  {
    id: "festivals",
    label: "Festivals & Events Tourism",
    description:
      "Get swept up in color, music, and joy — India’s festivals aren’t watched, they’re lived.",
  },
];

const subSegments: Record<string, string[]> = {
  cultural: [
    "Walk through ancient forts and palaces",
    "Explore traditional art forms like dance and theatre",
    "Join a local heritage walking tour",
    "Visit ancient ruins and UNESCO sites",
    "Discover artisan villages and local crafts",
  ],
  spiritual: [
    "Join a yoga or meditation retreat in nature",
    "Attend a sacred river ceremony (like the Ganga aarti)",
    "Visit monasteries or spiritual communities",
    "Explore India’s famous temples and pilgrimage routes",
    "Experience healing traditions like Ayurveda or sound therapy",
  ],
  adventure: [
    "Trek in the Himalayas or Western Ghats",
    "Go white-water rafting or kayaking",
    "Spot wildlife in a national park",
    "Camp under the stars in scenic locations",
    "Explore caves, canyons, or surreal landscapes",
    "Snorkel/Dive/Surf across India's pristine beaches",
  ],
  beach: [
    "Relax on quiet, scenic beaches",
    "Swim or snorkel in clear waters",
    "Cruise through backwaters in Kerala",
    "Explore coastal temples and heritage towns",
    "Feast on seafood by the sea",
  ],
  culinary: [
    "Try famous street food like pani puri, kebabs, and biryani",
    "Discover vegetarian and vegan specialties across regions",
    "Visit tea estates or coffee plantations and taste fresh brews",
    "Sample wines or craft beers at vineyards and microbreweries",
    "Join a regional food trail or traditional thali experience",
    "Learn to cook Indian dishes in a home-style setting",
  ],
  festivals: [
    "Celebrate Holi or Diwali with locals",
    "Join a traditional Indian wedding or ceremony",
    "Attend a music, dance, or cultural festival",
    "Explore rural fairs and temple festivals",
    "Experience India’s party scenes and nightlife",
  ],
};

export default function SurveyPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [orderedItems, setOrderedItems] = useState(
    travelInterests.map((item) => item.id)
  );
  const [answers, setAnswers] = useState({
    country: "",
    group: "",
    groupSize: "",
    style: "",
    budgetType: "",
    budgetAmount: "",
    focusNote: "",
    travelDate: "",
    knowsTravelDate: "",
    duration: "",
    topSegments: [] as string[],
    weatherNote: "",
    subPrefs: {} as Record<string, string[]>,
    notes: "",
  });

  const [isClient, setIsClient] = useState(false);

  // Always call hooks in the same order
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInput = (key: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedItems((items) =>
        arrayMove(
          items,
          items.indexOf(active.id as string),
          items.indexOf(over.id as string)
        )
      );
    }
    setActiveId(null);
  };

  const handleSubDragEnd = (key: string, event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const newList = arrayMove(
        answers.subPrefs[key],
        answers.subPrefs[key].indexOf(active.id as string),
        answers.subPrefs[key].indexOf(over.id as string)
      );
      setAnswers((prev) => ({
        ...prev,
        subPrefs: { ...prev.subPrefs, [key]: newList },
      }));
    }
  };

  const handleContinue = () => {
    if (step === 1) {
      const topSegments = orderedItems.slice(0, 3);
      const subPrefs = topSegments.reduce((acc, segment) => {
        acc[segment] = subSegments[segment] || [];
        return acc;
      }, {} as Record<string, string[]>);

      setAnswers((prev) => ({
        ...prev,
        topSegments,
        subPrefs,
      }));
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-white px-4 py-6 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <Progress value={(step / 11) * 100} className="mb-6" />


{/* Step 1: Travel Interests */}
{step === 1 && (
  <div>
    <h1 className="text-2xl font-semibold mb-2">
      What kind of travel excites you most in India?
    </h1>
    <p className="mb-4 text-gray-600">
      Drag and drop to rank your top 3 — most exciting at the top.
    </p>
    {isClient && (
      <DndContext
        sensors={sensors} // Reuse the sensors created above
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={(e) => setActiveId(e.active.id)} // Set activeId when dragging starts
        onDragEnd={handleDragEnd} // Use the shared handler for drag-and-drop
      >
        <SortableContext
          items={orderedItems}
          strategy={verticalListSortingStrategy}
        >
          {orderedItems.map((id, index) => {
            const item = travelInterests.find((i) => i.id === id)!;
            return (
              <SortableItem key={item.id} id={item.id}>
                <div className="px-4 py-3 border rounded-md mb-2 bg-gray-50 touch-none">
                  <div className="flex items-start sm:items-center gap-x-4">
                    {/* Number */}
                    <span className="text-sm font-bold flex-shrink-0">{index + 1}</span>
                    {/* Text */}
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    )}
    <div className="mt-6 flex justify-end">
      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  </div>
)}
      {/* Step 2: Country */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Which country are you from? 
          </h2>
          <input
            type="text"
            value={answers.country}
            onChange={(e) => handleInput("country", e.target.value)}
            placeholder="Eg. Germany"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-200 px-5 py-2 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}

       {/* Step 3: Travel Group */}
  {step === 3 && (
    <div>
      <h2 className="text-2xl font-semibold mb-2">
        Who are you traveling with?
      </h2>
      <p className="text-gray-600 mb-3">
        Choose the option that best describes your group.
      </p>
      {[
        "Solo",
        "Partner",
        "Friends",
        "Family with kids",
        "Family with elders",
        "Group tour or mixed",
      ].map((option) => (
        <div key={option} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="travel-group"
              value={option}
              checked={answers.group === option}
              onChange={() =>
                setAnswers((prev) => ({
                  ...prev,
                  group: option,
                  groupSize:
                    option === "Solo" ? "1" : option === "Partner" ? "2" : "",
                }))
              }
              className="mr-2 accent-blue-600"
            />
            {option}
          </label>
        </div>
      ))}
      {answers.group &&
        !["Solo", "Partner"].includes(answers.group) && (
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              How many people (including you) will be traveling?
            </label>
            <input
              type="text"
              value={answers.groupSize}
              onChange={(e) => handleInput("groupSize", e.target.value)}
              placeholder="e.g., 3"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  )}
  {/* Step 4: Travel Style */}
  {step === 4 && (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        How would you describe your travel style?
      </h2>
      <p className="text-gray-600 mb-4">
        This helps us shape your itinerary to match how you love to travel.
      </p>
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
      ].map((option) => (
        <label
          key={option.label}
          className="flex items-start mb-3 p-3 border border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer"
        >
          <input
            type="radio"
            name="travel-style"
            value={option.label}
            checked={answers.style === option.label}
            onChange={() => handleInput("style", option.label)}
            className="mt-1 mr-4 accent-blue-600"
          />
          <div className="grid grid-cols-[180px_1fr] gap-4">
            <div className="font-medium text-gray-800">{option.label}</div>
            <div className="text-sm text-gray-600">{option.description}</div>
          </div>
        </label>
      ))}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Do you have any weather-related preferences or sensitivities that we
          should know about?
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
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  )}
 {/* Step 5: Budget */}
{step === 5 && (
  <div>
    <h2 className="text-2xl font-semibold mb-4">
      How would you be budgeting for your trip?
    </h2>
    {/* Only show budget type options if the user is not traveling solo */}
    {answers.group !== "Solo" && (
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="per person"
              checked={answers.budgetType === "per person"}
              onChange={() => handleInput("budgetType", "per person")}
              className="mr-2 accent-blue-600"
            />
            Per person
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="group total"
              checked={answers.budgetType === "group total"}
              onChange={() => handleInput("budgetType", "group total")}
              className="mr-2 accent-blue-600"
            />
            Total for group
          </label>
        </div>
      </div>
    )}
    <div className="mb-4">
      <label className="block font-medium text-gray-700">
        Estimated trip budget with currency (excluding flights)
        {answers.group !== "Solo" && ` (${answers.budgetType})`}
      </label>
      <input
        type="text"
        value={answers.budgetAmount}
        onChange={(e) => handleInput("budgetAmount", e.target.value)}
        placeholder="e.g., 1000 Euros"
        className="w-full p-3 border border-gray-300 rounded-lg text-sm"
      />
    </div>
    <div className="mt-6 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
      >
        Back
      </button>
      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  </div>
)}
  {/* Step 6: Travel Date */}
  {step === 6 && (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Do you already know when your trip to India might begin?
      </h2>
      <p className="text-gray-600 mb-4">
        Even if it’s just an estimate, this helps us align suggestions with
        weather, festivals, and availability.
      </p>
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {["Yes", "No"].map((option) => (
            <label key={option} className="inline-flex items-center">
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
      </div>
      {answers.knowsTravelDate && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {answers.knowsTravelDate === "Yes"
              ? "Confirmed Start Date"
              : "Estimated Start Date"}
          </label>
          <input
            type="text"
            value={answers.travelDate}
            onChange={(e) => handleInput("travelDate", e.target.value)}
            placeholder="e.g., 15 July 2025 or 'next winter'"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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
      <h2 className="text-2xl font-semibold mb-4">
        How many days are you planning to spend in India?
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Trip Duration (Days)
        </label>
        <input
          type="number"
          value={answers.duration}
          onChange={(e) => handleInput("duration", e.target.value)}
          placeholder="e.g., 10"
          className="w-full p-3 border border-gray-300 rounded-lg text-sm"
          min={1} // Minimum duration is 1 day
        />
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  )}
{/* Steps 8–10: Sub-Segment Rankings */}
{[8, 9, 10].includes(step) && (
  <div>
    <h2 className="text-2xl font-semibold mb-4">
      What kind of experiences are you most excited about in{" "}
      <span className="capitalize text-blue-700 font-bold">
        {
          travelInterests.find((item) => item.id === answers.topSegments[step - 8])
            ?.label
        }
      </span>
      ?
    </h2>
    <p className="mb-4 text-gray-600">
      Drag and drop to rank the activities that excite you the most — your top pick should come first.
    </p>
    {isClient && ( // Render DndContext only on the client
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(e: DragEndEvent) =>
          handleSubDragEnd(answers.topSegments[step - 8], e)
        }
      >
        <SortableContext
          items={answers.subPrefs[answers.topSegments[step - 8]] || []}
          strategy={verticalListSortingStrategy}
        >
          {answers.subPrefs[answers.topSegments[step - 8]]?.map((item, index) => (
            <SortableItem key={item} id={item}>
              <div className="px-4 py-3 border rounded-md mb-2 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold w-6 text-center">
                    {index + 1}
                  </div>
                  <div className="text-sm text-gray-800">{item}</div>
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    )}
    <div className="mt-6 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
      >
        Back
      </button>
      <button
        onClick={handleContinue}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  </div>
)}
  {/* Step 11: Final Notes */}
{step === 11 && (
  <div>
    <h2 className="text-2xl font-semibold mb-4">
      Anything else you’d like us to know while planning your trip?
    </h2>
    <textarea
      className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[120px]"
      placeholder="e.g., Would love to see the Taj Mahal, vegetarian only, slower pace, want spiritual experiences..."
      value={answers.notes}
      onChange={(e) => handleInput("notes", e.target.value)}
    />
    <div className="mt-6 flex justify-between">
      <button
        onClick={handleBack}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
      >
        Back
      </button>
      <button
        onClick={() => {
          localStorage.setItem("surveyAnswers", JSON.stringify(answers));
          router.push("/survey-complete");
        }}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Finish
      </button>
    </div>
  </div>
)}
    </div>
  );
}