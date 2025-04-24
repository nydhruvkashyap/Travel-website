import Image from 'next/image';
import Link from 'next/link';

export default function SpiritualWellnessTourism() {
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
        <div className="relative w-full h-64 mb-12">
          <Image
            src="/images/hero-wellness.jpg"
            alt="Spiritual & Wellness Tourism in India: Where Healing Meets the Soul"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <h1 className="text-4xl font-bold text-white">
              Spiritual & Wellness Tourism in India: Where Healing Meets the Soul
            </h1>
          </div>
        </div>

        {/* Section: Introduction */}
        <section className="mb-12 text-lg leading-relaxed text-gray-800">
          <p className="text-xl leading-relaxed">
            Some come to India seeking wisdom. Others come searching for healing. Many arrive not knowing what they seek—only to leave transformed. From the meditation retreats of the Himalayas to Ayurveda therapies in Kerala, wellness and spirituality intertwine, offering journeys of healing, devotion, and self-discovery.
          </p>
        </section>

        {/* Sub-Segments */}
        <div className="space-y-16">
          {/* Wellness Tourism */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              src="/images/wellness-tourism.jpg"
              alt="Ayurveda retreats, meditation, and yoga in India"
              width={400}
              height={260}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-semibold mb-4">Wellness Tourism – A Journey of Healing</h2>
              <p className="text-xl leading-relaxed">
                In Kerala&rsquo;s Ayurveda retreats and Himalayan meditation centers, the scent of sandalwood lingers as warm herbal oils dissolve tension, restoring balance. Whether through Ayurveda, mindfulness, or sunrise yoga by the Ganges, India&rsquo;s wellness traditions go beyond relaxation—they transform the body and soul.
              </p>
            </div>
          </div>

          {/* Spiritual Tourism */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <Image
              src="/images/spiritual-tourism.jpg"
              alt="Meditation retreats, ashrams, and spiritual awakening in India"
              width={400}
              height={260}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-semibold mb-4">Spiritual Tourism – The Call of the Sacred</h2>
              <p className="text-xl leading-relaxed">
                Temples glowing at dawn, monks lost in deep prayer, and sacred rivers reflecting a thousand oil lamps. From the ashrams of Rishikesh to the monasteries of Ladakh, India&rsquo;s spiritual pulse beats through places of worship where seekers come not just to pray, but to listen—to the silence, to themselves.
              </p>
            </div>
          </div>

          {/* Pilgrimage & Sacred Journeys */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              src="/images/religious-pilgrimage.jpg"
              alt="Sacred Pilgrimage Journey in India – Varanasi, Golden Temple, and Himalayan Monasteries"
              width={400}
              height={260}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-semibold mb-4">Pilgrimage & Sacred Journeys – Footsteps of the Divine</h2>
              <p className="text-xl leading-relaxed">
                Follow the footsteps of countless seekers who have walked these sacred paths for millennia. Whether at the banks of the Ganges in Varanasi, the steps of the Golden Temple in Amritsar, or the mountain monasteries where prayer flags flutter in the wind, faith in India is not just seen—it is experienced.
              </p>
            </div>
          </div>
        </div>

        {/* Internal Link to Other Segments */}
        <div className="mt-8 text-center text-gray-700">
          <p className="text-lg">
            Looking for more immersive experiences?{' '}
            <Link href="/categories/cultural-tourism" className="text-blue-600 hover:underline">
              Explore India&rsquo;s Spiritual & Cultural Heritage
            </Link>
            .
          </p>
        </div>

        {/* Stationary Call-to-Action */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-semibold mb-4 font-playfair">Begin Your Journey of Renewal</h3>
          <p className="mb-6 text-xl leading-relaxed">
            At Mythara, we guide you through India&rsquo;s most profound wellness and spiritual experiences—where every step is a step toward transformation.
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