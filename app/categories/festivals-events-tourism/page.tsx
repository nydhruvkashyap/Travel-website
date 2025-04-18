import Image from 'next/image';

export default function FestivalsAndEventsTourism() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Small Header Section */}
      <div className="relative w-full h-64 mb-12">
        <Image src="/images/festivals-events-hero.jpg" alt="Festivals & Events in India – Cultural, Religious & Nightlife Celebrations" layout="fill" objectFit="cover" className="rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h1 className="text-4xl font-bold text-white">Festivals & Events in India – Cultural, Religious & Nightlife Celebrations</h1>
        </div>
      </div>

      {/* Section: Introduction */}
      <section className="mb-12 text-lg leading-relaxed text-gray-800">
        <p className='text-xl leading-relaxed'>Everything in India happens at a scale you've never witnessed before! From spiritual gatherings to art festivals, cricket stadiums to neon-lit concerts, every experience is a chance to be part of something unforgettable.</p>
      </section>

      {/* Sub-Segments */}
      <div className="space-y-16">
        {/* Religious Festivals */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/religious-festivals.jpg" alt="Diwali, Holi, and Kumbh Mela celebrations in India" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Religious Festivals: A Nation in Celebration</h2>
            <p className='text-xl leading-relaxed'>Faith here is alive—bursting into the streets during processions, lighting up cities on Diwali, turning entire rivers into sacred gathering points during Kumbh Mela. Whether it's the vibrance of Holi or the grandeur of Durga Puja, every festival offers a glimpse into India’s deep-rooted traditions.</p>
          </div>
        </div>

        {/* Cultural Events */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Image src="/images/cultural-events.jpg" alt="Jaipur Literature Festival, Mumbai street art, and Indian film festivals" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Cultural Events: A Stage for Every Story</h2>
            <p className='text-xl leading-relaxed'>From the Jaipur Literature Festival’s intellectual buzz to Mumbai’s street art transforming entire neighborhoods, India celebrates creativity in all forms. Music, film, dance, and art festivals bring global voices and local traditions together in an endless flow of ideas.</p>
          </div>
        </div>

        {/* Concerts, Cricket & Nightlife */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/party-nightlife.jpg" alt="Concerts, IPL cricket, Sunburn Festival, craft breweries, and vineyard tours in India" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Concerts, Cricket & Nightlife: The Energy Never Stops</h2>
            <p className='text-xl leading-relaxed'>From sold-out Coldplay concerts and Goa’s Sunburn Festival to Mumbai’s buzzing club scene and vineyard tours in Nashik—India’s nightlife and entertainment culture is more dynamic than ever.</p>
          </div>
        </div>
      </div>

      {/* Internal Link to Cultural Tourism */}
      <div className="mt-8 text-center text-gray-700">
        <p className="text-lg">Looking for more immersive experiences? <a href="/categories/cultural-tourism" className="text-blue-600 hover:underline">Explore India's Cultural Heritage & Traditional Festivals</a>.</p>
      </div>

      {/* Call-to-Action */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-semibold mb-4 font-playfair">Experience the Joy of Sharing Your Happiness with a Billion People</h3>
        <p className="mb-6"><span className='text-xl leading-relaxed'>From spiritual celebrations to artistic showcases and nightlife spectacles, Mythara curates experiences that bring you closer to India's grandest events.</span></p>
        <a href="/itineraries" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">Explore Itineraries</a>
      </div>
    </div>
  );
}
