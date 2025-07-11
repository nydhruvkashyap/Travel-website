import Image from 'next/image';
import Link from 'next/link';

export default function BeachCoastalTourism() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mythara Banner */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/mythara-logo.png"
              alt="Mythara - Your Personalized Travel Guide to India"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>
      </header>

      {/* Add margin to avoid overlap with the fixed header */}
      <div className="mt-16">
        {/* Small Header Section */}
        <div className="relative w-full h-80 mb-16">
          <Image
            src="/images/coastal-hero.jpg"
            alt="Beach and Coastal Tourism in India - Pristine Shores, Marine Adventures & Island Escapes"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h1 className="text-5xl font-bold text-white text-center">
              Beach & Coastal Tourism in India: Sun, Sand & Serenity
            </h1>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12 text-lg leading-relaxed text-gray-800">
          <p className="text-xl leading-relaxed">
            India&rsquo;s coastline stretches over 7,500 kilometers, offering some of the world&rsquo;s most diverse and breathtaking coastal experiences. Whether it&rsquo;s the tranquil backwaters of Kerala, the party vibes of Goa, or the untouched islands of Lakshadweep, coastal tourism in India blends adventure, relaxation, and natural beauty.
          </p>
        </section>

        {/* Sub-Segments */}
        {/* Beach Recreation */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <Image
            src="/images/shores-moods.jpg"
            alt="Best Beach Destinations in India - Goa and Kerala"
            width={500}
            height={320}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-4xl font-semibold mb-6">Best Beaches in India: From Serenity to Celebration</h2>
            <p className="text-xl leading-relaxed">
              From the bustling beaches of Goa to the serene shores of Varkala, India&rsquo;s coastline offers the perfect getaway for every traveler. Relax under swaying palms, indulge in fresh seafood, or take a sunset stroll on the golden sands.
            </p>
          </div>
        </div>

        {/* Water Sports */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-16">
          <Image
            src="/images/surfing.jpg"
            alt="Thrilling Water Sports in India - Surfing and Scuba Diving"
            width={500}
            height={320}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-4xl font-semibold mb-6">Thrill on the Waves: Surfing & Scuba Diving</h2>
            <p className="text-xl leading-relaxed">
              Experience the adrenaline of riding the waves at Varkala, scuba diving among coral reefs in the Andamans, or parasailing over the Arabian Sea. India&rsquo;s coastal waters offer endless adventures for thrill-seekers and water lovers alike.
            </p>
          </div>
        </div>

        {/* Island & Marine Tourism */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <Image
            src="/images/island.jpg"
            alt="Island Tourism in India - Andaman & Lakshadweep"
            width={500}
            height={320}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-4xl font-semibold mb-6">Discover India&rsquo;s Hidden Island Paradises</h2>
            <p className="text-xl leading-relaxed">
              Sail to the turquoise lagoons of Lakshadweep, explore the lush jungles of Andaman, or unwind on the secluded beaches of Havelock Island. India&rsquo;s islands offer pristine landscapes and unique cultural experiences.
            </p>
          </div>
        </div>

        {/* Coastal Wildlife Tourism */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-16">
          <Image
            src="/images/sunderban.jpg"
            alt="Wildlife & Eco-Tourism in India&rsquo;s Coastal Regions"
            width={500}
            height={320}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-4xl font-semibold mb-6">Where Land Meets Ocean: Coastal Wildlife & Conservation</h2>
            <p className="text-xl leading-relaxed">
              Spot dolphins off the coast of Goa, watch Olive Ridley turtles nest at Gahirmatha Beach, or explore the Sundarbans, home to the elusive Bengal tiger. India&rsquo;s coastal ecosystems are rich with biodiversity and conservation efforts.
            </p>
          </div>
        </div>

        {/* Internal Links */}
        <div className="mt-8 text-center text-gray-700">
          <p className="text-lg">
            From stunning coastlines to towering peaks, explore more of India&rsquo;s natural wonders in our{' '}
            <Link href="/categories/adventure-tourism" className="text-blue-600 hover:underline">
              Adventure Tourism section
            </Link>
            .
          </p>
        </div>

        {/* Stationary Call-to-Action */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold mb-4 font-playfair">Your Next Coastal Adventure Awaits</h3>
          <p className="mb-6 text-xl leading-relaxed">
            Mythara helps travelers uncover India&rsquo;s most breathtaking coastal experiences, from hidden island retreats to thrilling water sports.
          </p>
          <Link href="/trip-planner">
            <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">
              ✨ Create Your Itinerary
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}