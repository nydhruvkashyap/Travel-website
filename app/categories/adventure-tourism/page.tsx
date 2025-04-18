import Image from 'next/image';

export default function AdventureTourism() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Small Header Section */}
      <div className="relative w-full h-64 mb-12">
        <Image src="/images/rafting-header.jpg" alt="White-water rafting adventure in India" layout="fill" objectFit="cover" className="rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h1 className="text-4xl font-bold text-white">Adventure Tourism in India: Where Every Path Leads to Discovery</h1>
        </div>
      </div>

      {/* Section: Introduction */}
      <section className="mb-12 text-lg leading-relaxed text-gray-800">
        <p className='text-xl leading-relaxed'>Not all who wander are lost—some are just chasing the next thrill. Adventure tourism in India offers an unparalleled mix of high-altitude treks, untamed wilderness, and adrenaline-fueled water escapades. Whether you seek trekking in the Himalayas, jungle safaris, or diving in the Andamans, the wild is calling.</p>
      </section>

      {/* Sub-Segments */}
      <div className="space-y-16">
        {/* Wildlife and Nature Tours */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/safari-tiger.jpg" alt="Jeep Safari with Bengal Tiger in India’s Jungles" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Wildlife Safaris in India – Step Into the Unknown</h2>
            <p className='text-xl leading-relaxed'>There’s a moment when you're deep in the wild—when the jungle goes silent, and you know something is watching. Maybe it’s a Bengal tiger, moving like a shadow between the trees. Maybe it’s a herd of elephants, their presence as commanding as the land itself.</p>
            <p className='text-xl leading-relaxed'>This isn’t a zoo. There are no fences, no schedules—just you, the raw power of nature, and the pulse of a land that never lost its wild heart.</p>
          </div>
        </div>

        {/* Mountain and Trekking Adventures */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Image src="/images/himalaya-trek.jpg" alt="Trekker hiking in the Himalayas, India" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Trekking in the Himalayas – Conquer the Heights</h2>
            <p className='text-xl leading-relaxed'>The Himalayas, the Western Ghats, and the Aravallis aren’t just mountains; they’re stories written in rock and time. Trails wind through pine-scented valleys, rugged passes where the air is thin and crisp, and hidden villages where time moves at its own pace.</p>
            <p className='text-xl leading-relaxed'>Will you follow the footsteps of ancient explorers, crossing snow-laden ridges and flower-filled meadows? Or will you carve your own path, letting the mountain winds decide your next step?</p>
          </div>
        </div>

        {/* Water-Based Adventures */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/scuba-andamans.jpg" alt="Scuba diver exploring coral reefs in the Andaman Islands" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Scuba Diving in the Andamans – The Ocean Calls</h2>
            <p className='text-xl leading-relaxed'>Water—wild, untamed, endless. One moment, you’re riding the rapids, your raft twisting through foamy white waters. The next, you're beneath the waves, surrounded by an alien world where vibrant corals stretch out like underwater forests.</p>
            <p className='text-xl leading-relaxed'>For those who dream of diving into the unknown, the Andaman Islands hold an entire universe beneath the surface. Crystal-clear waters, sunken shipwrecks, and untouched coral reefs await.</p>
          </div>
        </div>

        {/* Untamed Adventures */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Image src="/images/living-root-bridge.jpg" alt="Traveler walking on a living root bridge in Meghalaya" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Eco-Tourism in India – The Thrill of the Unknown</h2>
            <p className='text-xl leading-relaxed'>Not all adventures happen at high speed. Some unfold in places untouched by time, where the world moves to the rhythm of nature, and every turn in the road brings the unexpected.</p>
            <p className='text-xl leading-relaxed'>Stand on a living root bridge in Meghalaya, feeling the power of nature’s own architecture beneath your feet. Descend into caves where underground rivers whisper secrets in the dark. Chase the mist as you hike through the Shola forests, where every bend in the path reveals a landscape straight out of a dream.</p>
          </div>
        </div>
      </div>

      {/* Internal Link to Cultural Tourism */}
      <div className="mt-8 text-center text-gray-700">
        <p className="text-lg">Looking for more than just adventure? Discover India's cultural wonders in our <a href="/categories/cultural-tourism" className="text-blue-600 hover:underline">Cultural Tourism section</a>.</p>
      </div>

      {/* Call-to-Action */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-semibold mb-4 font-playfair">Your Next Adventure Starts Here</h3>
        <p className="mb-6"><span className='text-xl leading-relaxed'>At Mythara, we help you find the perfect expedition—whether you’re looking for an adrenaline-packed journey or a slow exploration of India’s most breathtaking landscapes.</span></p>
        <a href="/itineraries" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">Explore Itineraries</a>
      </div>
    </div>
  );
}
