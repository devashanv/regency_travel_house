import React, { useState } from 'react';
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

// Filter options
const countryOptions = ["India", "Nepal", "Bhutan", "Tibet"];
const categoryOptions = ["Adventure", "Beach", "Cultural", "Family"];
const priceOptions = ["Below $500", "$500-$1000", "Above $1000"];
const daysOptions = ["1-3 days", "4-7 days", "8+ days"];
const activityOptions = ["Adventures", "Boat Rides", "Cable Cars", "Cruise Journey", "Honeymoon"];

  // Sample travel packages
  const samplePackages = [
    { id: 1, name: "India Adventure Tour", country: "India", category: "Adventure", price: 450, days: 3, activities: ["Adventures"] },
    { id: 2, name: "Nepal Trekking", country: "Nepal", category: "Adventure", price: 700, days: 5, activities: ["Cable Cars"] },
    { id: 3, name: "Bhutan Culture Trip", country: "Bhutan", category: "Cultural", price: 1200, days: 8, activities: ["Cruise Journey"] },
    { id: 4, name: "Tibet Family Fun", country: "Tibet", category: "Family", price: 600, days: 6, activities: ["Boat Rides", "Honeymoon"] },
    { id: 5, name: "India Beach Escape", country: "India", category: "Beach", price: 400, days: 2, activities: ["Boat Rides"] },
    { id: 6, name: "Nepal Honeymoon Retreat", country: "Nepal", category: "Family", price: 950, days: 4, activities: ["Honeymoon"] },
  ];

function TestSort() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? "" : type);
  };

  const handleSelectFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters(prev => [...prev, filter]);
    }
  };

  const handleRemoveFilter = (filter) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  const dropdownFilter = (label, options, type) => (
    <div className="relative w-1/5 mx-1">
      <button
        onClick={() => toggleDropdown(type)}
        className="px-4 py-2 flex items-center w-full justify-between bg-white rounded-full hover:bg-gray-100 hover:bg-gray-100 hover:cursor-pointer"
      >
        <span>{label}</span>
        <IoMdArrowDropdown/>
      </button>
      {openDropdown === type && (
        <div className="absolute z-10 mt-2 w-52 bg-body border border-gray-200 rounded-lg shadow-lg">
          {options.map(option => (
            <div
              key={option}
              onClick={() => {
                handleSelectFilter(option);
                setOpenDropdown("");
              }}
              className="px-4 py-3 hover:bg-blue-100 cursor-pointer text-base"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Filtering logic
  const filteredPackages = samplePackages.filter(pkg =>
    selectedFilters.length === 0 ||
    selectedFilters.includes(pkg.country) ||
    selectedFilters.includes(pkg.category) ||
    selectedFilters.some(f =>
      (f === "Below $500" && pkg.price < 500) ||
      (f === "$500-$1000" && pkg.price >= 500 && pkg.price <= 1000) ||
      (f === "Above $1000" && pkg.price > 1000)
    ) ||
    selectedFilters.some(f =>
      (f === "1-3 days" && pkg.days >= 1 && pkg.days <= 3) ||
      (f === "4-7 days" && pkg.days >= 4 && pkg.days <= 7) ||
      (f === "8+ days" && pkg.days >= 8)
    ) ||
    pkg.activities.some(act => selectedFilters.includes(act))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Dropdown Filters Bar */}
      <div className="bg-white border-2 border-gray-300 w-full rounded-full p-2 mb-6 flex justify-between">
        {dropdownFilter("Country", countryOptions, "country")}
        {dropdownFilter("Category", categoryOptions, "category")}
        {dropdownFilter("Price", priceOptions, "price")}
        {dropdownFilter("Days", daysOptions, "days")}
        {dropdownFilter("Activities", activityOptions, "activities")}
      </div>

      {/* Chips for selected filters */}
      {selectedFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {selectedFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {filter}
              <button
                onClick={() => handleRemoveFilter(filter)}
                className="ml-2 text-blue-800 hover:text-red-600 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filtered Packages Display */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Filtered Packages</h2>
        {filteredPackages.length > 0 ? (
          <ul className="space-y-3">
            {filteredPackages.map(pkg => (
              <li
                key={pkg.id}
                className="p-4 bg-white border border-gray-200 rounded-md shadow-sm"
              >
                <h3 className="font-semibold text-gray-800">{pkg.name}</h3>
                <p className="text-sm text-gray-600">
                  {pkg.country} | {pkg.category} | ${pkg.price} | {pkg.days} days
                </p>
                <p className="text-xs text-gray-500">
                  Activities: {pkg.activities.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No packages found.</p>
        )}
      </div>
    </div>
  );
}


export default TestSort