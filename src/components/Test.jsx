import React, { useState } from 'react';

const Test = () => {
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Please upload a PDF file only.");
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g., API call)
    console.log("Submitting form...");
  };

  return (
    <section className="bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          No Matching Position Available?
        </h2>
        <p className="mt-4 text-gray-600">
          We’re always open to discovering new talent. If there’s no position
          that matches your profile right now, feel free to send us your resume
          and a brief message. We’ll keep it on file and reach out if something
          comes up!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message to HR Manager</label>
          <textarea
            rows="4"
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Resume (PDF only)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
            className="mt-2 w-full text-gray-600"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition"
          >
            Submit Resume
          </button>
        </div>
      </form>
    </section>
  );
};

export default Test;
