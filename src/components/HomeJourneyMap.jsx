import React from 'react'
import{ useState } from 'react';

function HomeJourneyMap() {
    const journeySteps = [
        {
          title: 'Plan Your Trip',
          description: 'Organize your journey with personalized planning tools.',
          icon: '🧭',
        },
        {
          title: 'Choose Destination',
          description: 'Explore exciting places that match your vibe.',
          icon: '🌍',
        },
        {
          title: 'Book & Pay',
          description: 'Secure your booking easily with flexible options.',
          icon: '💳',
        },
        {
          title: 'Travel & Explore',
          description: 'Live the adventure with comfort and support.',
          icon: '✈️',
        },
        {
          title: 'Share Memories',
          description: 'Capture and share the best moments of your trip.',
          icon: '📸',
        },
      ]; 

    const [showAll, setShowAll] = useState(false);
      
    const visibleSteps = showAll ? journeySteps : journeySteps.slice(0, 4);

  


      

  return (
    <>
        <div className="bg-gray-50 px-6 py-16 overflow-x-hidden">
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-[#0d1537] h-48 flex items-center justify-center">
                        {/* Icon or image can go here */}
                        <span className="text-white text-5xl">🌍</span>
                    </div>
                    <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#0d1537] mb-2">Explore The World</h2>
                    <p className="text-gray-600 mb-4">
                    Discover exciting destinations with personalized travel experiences crafted just for you.
                    </p>
                    <a
                    href="#"
                    className="inline-block px-4 py-2 bg-[#0d1537] text-white rounded-md hover:bg-[#0a112d] transition"
                    >
                    Learn More
                    </a>
                </div>
            </div>
        </div>
    </>
  )
}

export default HomeJourneyMap