import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Cultural Tourism", link: "/categories/cultural-tourism", image: "/images/cultural.jpg", caption: "Unravel India's history with stories behind palaces, forts, and ancient traditions." },
  { name: "Adventure Tourism", link: "/categories/adventure-tourism", image: "/images/adventure.jpg", caption: "Guided treks, safe explorations, and thrill-packed experiences across India." },
  { name: "Beach & Coastal Tourism", link: "/categories/beach-coastal-tourism", image: "/images/beach.jpg", caption: "Find the perfect coastal escape—from serene retreats to vibrant beach towns." },
  { name: "Spiritual & Wellness Tourism", link: "/categories/spiritual-wellness-tourism", image: "/images/spiritual.jpg", caption: "Discover India’s spiritual heart through ancient wellness practices and retreats." },
  { name: "Festivals & Events", link: "/categories/festivals-events-tourism", image: "/images/festivals.jpg", caption: "Experience India's festivals like a local—vibrant, immersive, and unforgettable." },
  { name: "Culinary Tourism", link: "/categories/culinary-tourism", image: "/images/culinary.jpg", caption: "Savor India's rich flavors, from street food to royal feasts." },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mythara - Explore India's Cultural & Adventure Experiences</title>
        <meta name="description" content="Discover India through personalized travel experiences. From cultural heritage to thrilling adventures, Mythara guides you to unforgettable journeys." />
      </Head>
      
      <main className="bg-gray-50 min-h-screen">
        {/* Fixed Banner with Logo */}
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center p-4">
          <div className="max-w-6xl mx-auto flex items-center">
            <Image 
              src="/images/mythara-logo.png" 
              alt="Mythara - Your Personalized Travel Guide to India" 
              width={120} 
              height={40} 
              priority
            />
          </div>
        </header>

        {/* Hero Section */}
<section className="relative w-full h-screen flex items-center justify-center bg-gray-100 mt-16">
  <Image 
    src="/images/hero-banner.png" 
    alt="Explore India’s Top Destinations with Mythara - Travel Planning Made Easy" 
    width={1920} 
    height={800} 
    priority
    className="absolute top-0 left-0 w-full h-full object-cover"
  />
  <div className="relative z-10 bg-black bg-opacity-60 p-8 rounded-xl text-white text-center max-w-2xl">
    <h1 className="text-4xl font-bold">India's Mystical Lands Beckon</h1>
    <p className="text-lg mt-4">Planning a trip to India can feel overwhelming - so much to see, but where to begin?</p>

   
  </div>
</section>


        {/* About Mythara Section */}
        <div className="text-center px-6 py-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800">We're here with you, every step of the way...</h2>
          <p className="text-lg text-gray-600 mt-4">
            Mythara helps travelers navigate India effortlessly, uncovering experiences that match your interests, comfort, and curiosity.  
          </p>
        </div>

        {/* Category Section */}
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Explore India, Your Way</h2>
          <p className="text-lg text-gray-600 mt-2">Read through India's vast expanse of travel experiences and identify the ones that match your tastes and interests.</p>

          {/* Category Grid */}
          <div className="max-w-3xl mx-auto mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
              {categories.map((category, index) => (
                <Link key={index} href={category.link} className="relative flex w-full sm:max-w-[6rem] lg:max-w-xs group">
                  <div className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer transform hover:scale-105 transition-transform text-center">
                    <Image
                      src={category.image}
                      alt={category.name + " - Travel Experiences in India"}
                      width={256} 
                      height={192} 
                      loading="lazy"
                      className="sm:w-[6rem] sm:h-[4rem] lg:w-64 lg:h-48 object-cover rounded-2xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-0 group-hover:translate-y-[-0.5rem] transition-transform">
                      <h2 className="absolute bottom-0 left-0 right-0 text-white text-lg font-semibold text-center bg-gradient-to-t from-black to-transparent p-0 group-hover:translate-y-[-2rem]">{category.name}</h2>
                      <p className="text-white text-xs font-light max-w-[18rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:bg-black group-hover:p-0 group-hover:rounded-md">
                        {category.caption}
                      </p>

                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 mt-12 text-gray-600">
          <p>© 2025 Mythara. All rights reserved.</p>
        </footer>
        {/* Enhanced Floating Trip Planner CTA */}
<Link href="/trip-planner" className="fixed bottom-6 right-6 z-50">
  <div className="bg-gray-900 hover:bg-gray-800 text-white shadow-2xl rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer transition-all animate-bounce-slow">
    <span className="text-lg font-semibold">✨ Create Your Itinerary</span>
  </div>
</Link>


      </main>
    </>
  );
}
