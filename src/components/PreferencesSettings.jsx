import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

const PreferencesSettings = () => {
  const [emailNotification, setEmailNotification] = useState("all");
  const [smsNotification, setSmsNotification] = useState("important");
  const [marketing, setMarketing] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("LKR");

  const handleMarketingChange = (e) => {
    const { name, checked } = e.target;
    setMarketing((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preferences = {
      emailNotification,
      smsNotification,
      marketing,
      language,
      currency,
    };
    console.log("Preferences saved:", preferences);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6  mx-auto space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Notification Preferences
      </h2>

      {/* Email Notifications */}
      <div>
        <p className="font-medium text-gray-800 mb-2">Email Notifications</p>
        <div className="flex gap-6 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="email"
              value="all"
              checked={emailNotification === "all"}
              onChange={() => setEmailNotification("all")}
              className="text-indigo-500"
            />
            All emails
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="email"
              value="important"
              checked={emailNotification === "important"}
              onChange={() => setEmailNotification("important")}
            />
            Important only
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="email"
              value="none"
              checked={emailNotification === "none"}
              onChange={() => setEmailNotification("none")}
            />
            None
          </label>
        </div>
      </div>

      {/* SMS Notifications */}
      <div>
        <p className="font-medium text-gray-800 mb-2">SMS Notifications</p>
        <div className="flex gap-6 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sms"
              value="important"
              checked={smsNotification === "important"}
              onChange={() => setSmsNotification("important")}
              className="text-indigo-500"
            />
            Important only
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sms"
              value="none"
              checked={smsNotification === "none"}
              onChange={() => setSmsNotification("none")}
            />
            None
          </label>
        </div>
      </div>

      {/* Marketing */}
      <div>
        <p className="font-medium text-gray-800 mb-2">
          Marketing Communications
        </p>
        <div className="flex gap-6 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="email"
              checked={marketing.email}
              onChange={handleMarketingChange}
              className="accent-indigo-600"
            />
            Email
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="sms"
              checked={marketing.sms}
              onChange={handleMarketingChange}
              className="accent-indigo-600"
            />
            SMS
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="push"
              checked={marketing.push}
              onChange={handleMarketingChange}
              className="accent-indigo-600"
            />
            Push Notifications
          </label>
        </div>
      </div>

      {/* Language */}
      <div>
        <p className="font-medium text-gray-800 mb-2">Preferred Language</p>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-64 border px-4 py-2 rounded-md text-sm"
        >
          <option>English</option>
          <option>සිංහල</option>
          <option>தமிழ்</option>
        </select>
      </div>

      {/* Currency */}
      <div>
        <p className="font-medium text-gray-800 mb-2">Preferred Currency</p>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-64 border px-4 py-2 rounded-md text-sm"
        >
          <option>LKR (Rs)</option>
          <option>USD ($)</option>
          <option>EUR (€)</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-md text-sm hover:bg-[#0070C4] cursor-pointer"
        >
          <FaSave /> Save Changes
        </button>
      </div>
    </form>
  );
};

export default PreferencesSettings;
