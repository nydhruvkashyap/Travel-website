import Image from 'next/image';

export default function CulturalTourism() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Small Header Section */}
      <div className="relative w-full h-64 mb-12">
        <Image src="/images/cultural-small-hero.png" alt="Cultural Tourism in India - Heritage, Festivals & Traditions" layout="fill" objectFit="cover" className="rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h1 className="text-4xl font-bold text-white">Cultural Tourism in India: A Journey Through Time and Traditions</h1>
        </div>
      </div>

      {/* Section: Introduction */}
      <section className="mb-12 text-lg leading-relaxed text-gray-800">
        <p className='text-xl leading-relaxed'>India’s cultural heritage is a living story, shaped over thousands of years. Whether you’re exploring ancient forts, witnessing vibrant festivals, or sharing a meal with a local family, cultural tourism in India offers an immersive experience beyond sightseeing.</p>
      </section>

      {/* Sub-Segments */}
      <div className="space-y-16">
        {/* Heritage Site Visits */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/heritage-site.jpg" alt="Historical Monuments & Heritage Sites in India" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Explore India's Living History</h2>
            <p className='text-xl leading-relaxed'>India’s history isn’t locked away in museums—it’s in the palaces, forts, and streets that tell the stories of dynasties, warriors, and ancient civilizations. Walk through the grand palaces of Rajasthan, explore centuries-old temple towns, and lose yourself in the historic alleys of Old Delhi.</p>
          </div>
        </div>

        {/* Religious Site Visits */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Image src="/images/religious-site.jpg" alt="Spiritual and Religious Sites in India" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Sacred Journeys & Spiritual Experiences</h2>
            <p className='text-xl leading-relaxed'>Experience the deep spirituality woven into India’s culture. Witness the grandeur of temple processions, explore ancient mosques, and be part of devotional ceremonies along the sacred Ganges River.</p>
          </div>
        </div>

        {/* Cultural Festivals & Events */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/festivals-events.jpg" alt="Indian Festivals & Cultural Events" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Celebrate India’s Vibrant Festivals</h2>
            <p className='text-xl leading-relaxed'>From Holi’s explosion of colors to Diwali’s dazzling lights, India’s festivals are immersive experiences. Dance through Navratri celebrations, witness grand processions, and experience the joy of shared traditions.</p>
          </div>
        </div>

        {/* Street Food & Local Specialties */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Image src="/images/food.jpg" alt="Authentic Indian Street Food & Local Cuisines" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Taste the Flavors of India</h2>
            <p className='text-xl leading-relaxed'>Every dish in India tells a story. Savor the bold spices of Mughlai cuisine, enjoy crispy dosas in the South, or dive into the bustling street food markets of Delhi. Food is not just a meal—it’s an adventure through taste and tradition.</p>
          </div>
        </div>

        {/* Tea, Coffee & Plantation Tours */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/tea-coffee-plantation.jpg" alt="Tea & Coffee Plantation Tours in India" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Explore India’s Tea & Coffee Estates</h2>
            <p className='text-xl leading-relaxed'>Step into the lush plantations of Darjeeling, Assam, or Coorg, where age-old traditions of tea and coffee cultivation continue. Experience farm-to-cup freshness as you walk through aromatic estates and taste the finest brews.</p>
          </div>
        </div>
      </div>

      {/* Internal Link to Adventure Tourism */}
      <div className="mt-8 text-center text-gray-700">
        <p className="text-lg">Looking for something more adrenaline-fueled? Check out <a href="/categories/adventure-tourism" className="text-blue-600 hover:underline">Adventure Tourism in India</a>.</p>
      </div>

      {/* Call-to-Action */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-semibold mb-4 font-playfair">Plan Your Cultural Journey</h3>
        <p className="mb-6"><span className='text-xl leading-relaxed'>At Mythara, we help you go beyond sightseeing. Our itineraries immerse you in India’s culture—through its people, traditions, and unforgettable experiences.</span></p>
        <a href="/itineraries" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">Explore Itineraries</a>
      </div>
    </div>
  );
}
