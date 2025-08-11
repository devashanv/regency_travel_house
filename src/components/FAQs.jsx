import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

function FAQs({ title, content, isOpen, onClick }) {
  return (
    <>
          <div className="border-b bg-gray-50 px-5 my-5 rounded-xl border-gray-300 ">
              <button
                  className="flex justify-between items-center hover:cursor-pointer w-full py-4 text-left text-base font-medium text-gray-800 hover:text-secondary transition"
                  onClick={onClick}
              >
                  {title}
                  <IoIosArrowDown
                      className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                          }`}
                  />
              </button>
              <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
                      }`}
              >
                  <div className="pb-4 text-gray-400">{content}</div>
              </div>
          </div> 
    </>
  )
}

export default FAQs