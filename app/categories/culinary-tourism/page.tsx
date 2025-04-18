import Image from 'next/image';

export default function CulinaryTourism() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Small Header Section */}
      <div className="relative w-full h-64 mb-12">
        <Image src="/images/culinary-hero.jpg" alt="Culinary Tourism in India – A Thali with Regional Indian Dishes" layout="fill" objectFit="cover" className="rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h1 className="text-4xl font-bold text-white">Culinary Tourism in India: Tastebuds travel through the land of Spices</h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="mb-12 text-lg leading-relaxed text-gray-800">
        <p className='text-xl leading-relaxed'>India is a paradise for food lovers, offering some of the best Indian street food experiences, plant-based delights, and regional specialties. Whether you&rsquo;re indulging in the famous chaat of Delhi, enjoying a thali in Rajasthan, or sipping a steaming cup of masala chai, India&rsquo;s culinary tourism promises a flavor-packed adventure.</p>
      </section>

      {/* Sub-Segments */}
      <div className="space-y-16">
        {/* Vineyard & Brewery Tourism */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Image src="/images/vineyards.jpg" alt="Wine Tasting in Nashik Vineyards – Best Indian Breweries and Craft Beer" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Vineyard & Brewery Tourism in India | Wine & Craft Beer Experiences</h2>
            <p className='text-xl leading-relaxed'>Explore India&rsquo;s emerging wine and craft beer culture, from the vineyards of Nashik to the thriving microbreweries of Bangalore and Goa. Enjoy curated tastings of red and white wines at renowned wineries like Sula and Grover Zampa, or experience the country&rsquo;s growing selection of artisanal craft beers from breweries such as Simba and Arbor Brewing Company.</p>
          </div>
        </div>
        {/* Vegan & Vegetarian Food Tourism */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/vegan.jpg" alt="Vegan & Vegetarian Food in India – Dosa, Paneer Tikka, and Dal Makhani" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Vegan & Vegetarian Food Tourism in India | Authentic Plant-Based Dishes</h2>
            <p className='text-xl leading-relaxed'>India is home to the world&rsquo;s largest vegetarian population, making it a paradise for plant-based cuisine. From crisp dosas with coconut chutney to smoky paneer tikka and creamy dal makhani, the flavors are endless.</p>
          </div>
        </div>

        {/* Street Food & Local Specialties */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <Image src="/images/street-food.jpg" alt="Street Food in India – Pani Puri, Tandoori Kebabs, and Butter Chicken" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Famous Indian Street Food | Pani Puri, Butter Chicken & More</h2>
            <p className='text-xl leading-relaxed'>Experience India&rsquo;s lively street food scene—from crispy pani puri to smoky tandoori kebabs and the globally beloved butter chicken. No visit is complete without a plate of fragrant biryani and a taste of warm gulab jamun.</p>
          </div>
        </div>

        {/* Tea, Coffee & Plantation Tours */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image src="/images/tea-coffee-plantation.jpg" alt="Indian Tea & Coffee Plantations – Darjeeling Tea and South Indian Filter Coffee" width={400} height={260} className="rounded-lg" />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Best Indian Tea & Coffee Experiences | Darjeeling Tea & Filter Coffee</h2>
            <p className='text-xl leading-relaxed'>Visit the lush estates of Darjeeling and Coorg, where tea and coffee plantations reveal the magic behind every cup. Savor the aroma of fresh masala chai or bold South Indian filter coffee.</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-semibold mb-4 font-playfair">Your Culinary Adventure Starts Here</h3>
        <p className="mb-6 text-xl leading-relaxed">Ready to explore India&rsquo;s best food destinations? Discover curated itineraries for authentic culinary experiences, from street food markets to luxurious dining.</p>
        <a href="/itineraries" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">Explore Itineraries</a>
      </div>
    </div>
  );
}
