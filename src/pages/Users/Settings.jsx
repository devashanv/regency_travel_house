import React, { useState, useEffect } from "react";
import { FaUpload, FaTrash, FaSave } from "react-icons/fa";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import API from "../../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    country_of_residence: "",
    nic: "",
    date_of_birth: "",
    gender: "",
    avatar: null,
    id: null,
    id_number: null,
    id_type: null,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await API.get("/customer/profile");
        setProfile(response.data);
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data.");
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!profile.full_name) newErrors.full_name = "Full name is required";
    if (!profile.email) newErrors.email = "Email is required";
    if (!profile.phone) newErrors.phone = "Phone number is required";
    if (!profile.date_of_birth)
      newErrors.date_of_birth = "Date of birth is required";
    if (!profile.gender) newErrors.gender = "Please select your gender";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    try {
      const updatedProfile = {
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        country_of_residence: profile.country_of_residence,
        nic: profile.nic,
        date_of_birth: profile.date_of_birth,
        gender: profile.gender,
        id_type: profile.id_type,
        id_number: profile.id_number,
      };

      const response = await API.put(
        `/customers/${profile.id}`,
        updatedProfile
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        console.log("Updated User data:", response.data);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error("Validation failed. Please check your inputs.");
      } else {
        toast.error("Failed to update profile. Please try again.");
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await API.post("/customers/logout");
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("customer_id");
      delete API.defaults.headers.common["Authorization"];
      navigate("/login");
    }
  };

  return (
    <>
      <div className="relative h-screen">
        {/* Navbar Section */}
        <div className="relative w-full top-0">
          <NavBar />
        </div>

        {/* SideNav Section */}
        <div className="  flex w-full flex-row ">
          {/* Sidenav */}
          <div className="lg:w-1/6 h-screen relative">
            {" "}
            <SideNav />
          </div>

          {/* Bodycontent */}
          <div className=" w-full lg:w-5/6 h-screen overflow-y-auto ">
            <div className="flex w-full">
              <div className="h-auto w-full">
                <main className="flex-1 lg:p-10">
                  <div className="grid grid-cols-2 items-center ">
                    <div>
                      <h1 className="pl-6 text-2xl font-semibold text-gray-800 mb-6">
                        Account <span className="text-blue-600">Settings</span>
                      </h1>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="pl-6 flex space-x-8 border-b border-gray-200 mb-8">
                    <p className="pb-2 font-semibold text-blue-600 border-b-2 border-[#0070C4]">
                      Profile
                    </p>
                  </div>

                  {/* Content */}
                  {activeTab === "profile" && (
                    <form
                      onSubmit={handleSubmit}
                      className="sm:w-full bg-white rounded-lg shadow p-6 space-y-6"
                    >
                      <h2 className="text-lg font-semibold text-gray-800">
                        Personal Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Full Name
                          </label>
                          <input
                            name="full_name"
                            value={profile.full_name}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border ${
                              errors.full_name
                                ? "border-red-500"
                                : "border-gray-400"
                            } px-4 py-2 text-sm`}
                          />
                          {errors.full_name && (
                            <p className="text-sm text-red-600">
                              {errors.full_name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-400"
                            } px-4 py-2 text-sm`}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Phone Number
                          </label>
                          <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-400"
                            } px-4 py-2 text-sm`}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-600">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date of Birth
                          </label>
                          <input
                            name="date_of_birth"
                            type="date"
                            value={profile.date_of_birth}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border ${
                              errors.date_of_birth
                                ? "border-red-500"
                                : "border-gray-400"
                            } px-4 py-2 text-sm`}
                          />
                          {errors.date_of_birth && (
                            <p className="text-sm text-red-600">
                              {errors.date_of_birth}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border ${
                              errors.gender
                                ? "border-red-500"
                                : "border-gray-400"
                            } px-4 py-2 text-sm`}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.gender && (
                            <p className="text-sm text-red-600">
                              {errors.gender}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Address
                          </label>
                          <input
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-400 px-4 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Country
                          </label>
                          <input
                            name="country_of_residence"
                            value={profile.country_of_residence}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-400 px-4 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            ID Type
                          </label>

                          <div className="flex items-center gap-4 mb-2 text-sm">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="id_type"
                                value="passport"
                                checked={profile.id_type === "passport"}
                                onChange={handleChange}
                              />
                              Passport
                            </label>

                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="id_type"
                                value="nic"
                                checked={profile.id_type === "nic"}
                                onChange={handleChange}
                              />
                              ID
                            </label>

                            {profile.id_type && (
                              <input
                                name="id_number"
                                value={profile.id_number}
                                onChange={handleChange}
                                placeholder={
                                  profile.id_type === "passport"
                                    ? "Enter Passport Number"
                                    : "Enter ID Number"
                                }
                                maxLength={
                                  profile.id_type === "passport" ? 9 : 12
                                }
                                className="w-full rounded-2xl border border-gray-400 px-4 py-2 text-sm"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 pb-15 grid grid-cols-2">
                        <div>
                          <button
                            type="submit"
                            className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-md text-sm hover:bg-[#0070C4]"
                          >
                            <FaSave /> Save Changes
                          </button>
                        </div>
                        <div className="block sm:hidden">
                          <a
                            href="#"
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-md text-sm hover:bg-[#0070C4]"
                          >
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                          </a>
                        </div>
                      </div>
                    </form>
                  )}
                </main>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
