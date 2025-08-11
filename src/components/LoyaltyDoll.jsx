import React from 'react'
import './LoyaltyDoll.css'

function LoyaltyDoll() {
  return (
    <>
        <div className=" absolute">
                <div className="character Z-1 relative  left-45 -top-40">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="70" r="40" fill="#FFD166"/>
                        <circle cx="85" cy="60" r="5" fill="#333"/>
                        <circle cx="115" cy="60" r="5" fill="#333"/>
                        <path d="M90 80 Q100 90 110 80" stroke="#333" stroke-width="2" fill="none"/>
                        <ellipse cx="100" cy="140" rx="40" ry="50" fill="#FFD166"/>
                        <path d="M80 120 Q100 130 120 120" stroke="#333" stroke-width="2" fill="none"/>
                        <rect x="60" y="140" width="80" height="40" fill="#ff426e"/>
                        <path d="M60 140 L40 180 L60 180 Z" fill="#ff426e"/>
                        <path d="M140 140 L160 180 L140 180 Z" fill="#ff426e"/>
                        <circle cx="70" cy="75" r="5" fill="#FFD166"/>
                        <circle cx="130" cy="75" r="5" fill="#FFD166"/>
                    </svg>
                </div>
            </div>
    </>
  )
}

export default LoyaltyDoll