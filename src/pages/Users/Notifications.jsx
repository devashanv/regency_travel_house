import React, { useState } from "react";
import {
  FaRegEnvelope,
  FaTrash,
  FaBoxOpen,
  FaBell,
  FaHeart,
  FaUsers,
  FaInbox,
} from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import SideNav from "../../components/SideNav";
import NavBar1 from "../../components/NavBar1";

// Sample data
const messagesData = {
  "Admin Notifications": [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      body: "Our system will undergo maintenance on June 15 from 2:00 AM to 4:00 AM. During this time, booking services will be temporarily unavailable.",
      time: "Today, 10:30 AM",
      unread: true,
    },
    {
      id: 2,
      title: "New Feature: Carbon Offset",
      body: "We've introduced a new carbon offset program. Now you can track and offset the environmental impact of your travels directly from your dashboard.",
      time: "Yesterday, 3:45 PM",
      unread: true,
    },
    {
      id: 3,
      title: "Privacy Policy Update",
      body: "We've updated our privacy policy. Please review the changes to understand how we collect, use, and protect your personal information.",
      time: "Jun 5, 10:15 AM",
      unread: false,
    },
  ],
  "Booking Updates": [],
  "Support & Complaints": [],
  "Loyalty & Rewards": [],
};

// Sub-component for each section
const MessageSection = ({ title, messages, isOpen, toggleOpen, showUnreadOnly }) => {
  const unreadCount = messages.filter((msg) => msg.unread).length;
  const filteredMessages = showUnreadOnly
    ? messages.filter((msg) => msg.unread)
    : messages;

  return (
    <div className="mb-3">
      <div
        onClick={toggleOpen}
        className="bg-[#0D0D39] text-white px-4 py-3 rounded-lg cursor-pointer flex justify-between items-center"
      >
        <div className="flex items-center gap-2 font-semibold text-lg">
          {title === "Admin Notifications" && <FaBell />}
          {title === "Booking Updates" && <FaBoxOpen />}
          {title === "Support & Complaints" && <FaUsers />}
          {title === "Loyalty & Rewards" && <FaHeart />}
          {title}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
          {isOpen ? <IoMdArrowDropup size={22} /> : <IoMdArrowDropdown size={22} />}
        </div>
      </div>

      {isOpen &&
        (filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 p-4 rounded-lg mt-2 ${
                msg.unread ? "bg-rose-100" : "bg-white"
              } shadow-sm items-start`}
            >
              <div className="bg-rose-200 w-12 h-12 rounded-full flex items-center justify-center">
                <FaInbox size={20} className="text-[#0D0D39]" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{msg.title}</h4>
                <p className="text-sm text-gray-700">{msg.body}</p>
                <p className="text-sm text-gray-500 mt-1">{msg.time}</p>
              </div>
              <div className="flex flex-col items-center gap-3 mt-1">
                <button className="text-gray-500 hover:text-gray-700">
                  <FaRegEnvelope />
                </button>
                <button className="text-gray-500 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">No messages to show.</div>
        ))}
    </div>
  );
};

// Main Notifications component
const Notifications = () => {
  const [openSection, setOpenSection] = useState("Admin Notifications");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const toggleUnreadFilter = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  return (
    <>
      <header>
        <NavBar1 />
      </header>
      <div className="flex">
        <aside className="lg:w-1/5 ">
          <SideNav />
        </aside>

        <main className="w-4/5  p-6">
          <div className="flex lg:ml-9 justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              My <span className="text-red-600">Messages</span>
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUnreadOnly(false)}
                className={`border border-gray-600 px-4 py-2 rounded-full ${
                  !showUnreadOnly
                    ? "border border-red-600 text-red-600"
                    : "border border-gray-600 text-gray-600 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                📥 All Messages
              </button>
              <button
                onClick={toggleUnreadFilter}
                className={`border border-gray-600 px-4 py-2 rounded-full ${
                  showUnreadOnly
                    ? "border border-red-600 text-red-600"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                ✉️ Unread
              </button>
            </div>
          </div>

          {Object.entries(messagesData).map(([section, messages]) => (
            <MessageSection
              key={section}
              title={section}
              messages={messages}
              isOpen={openSection === section}
              toggleOpen={() =>
                setOpenSection(openSection === section ? null : section)
              }
              showUnreadOnly={showUnreadOnly}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default Notifications;
