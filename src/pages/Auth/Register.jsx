import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../api/axiosClient";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(true);
  const [acceptLoyalty, setAcceptLoyalty] = useState(true);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/mydashboard";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!fullName || !email || !password || !passwordConfirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptPrivacyPolicy) {
      setError("You must accept the Privacy Policy to register.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/customers/register", {
        full_name: fullName,
        email,
        password,
        password_confirmation: passwordConfirm,
        per_for_news: subscribeNewsletter,
        per_for_loyalty: acceptLoyalty,
        per_for_privacy: acceptPrivacyPolicy,
      });

      const { token, customer } = response.data;

      if (token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("customer_id", customer.id);
        localStorage.setItem("auth_user", JSON.stringify(customer));
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        navigate(from, { replace: true });
        // navigate("/mydashboard");
      } else {
        setError("Registration failed: Token not received.");
      }
    } catch (err) {
      console.error("Registration error:", err);

      if (err.response) {
        const message = err.response.data?.message || "Registration failed.";
        setError(message);

        if (err.response.data?.errors) {
          setFieldErrors(err.response.data.errors);
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <button
        className="absolute mt-5 ml-50 px-4  cursor-pointer py-2 border hidden lg:block border-pink-500 text-pink-600 rounded-full hover:border-[#0D1537] hover:text-[#0D1537]"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <div className="mx-auto my-20 flex h-auto w-11/12 max-w-6xl shadow-2xl rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-10 bg-white">
          <img
            src="RTH-logo.png"
            alt="Logo"
            className="w-48 h-16 object-contain mb-6"
          />
          <p className="mb-6 text-gray-600 text-center text-lg font-medium">
            Create a new account
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col items-center"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mb-3 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />
            {fieldErrors.full_name && (
              <p className="text-sm text-red-500 mb-2">
                {fieldErrors.full_name[0]}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-500 mb-2">
                {fieldErrors.email[0]}
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />
            {fieldErrors.password && (
              <p className="text-sm text-red-500 mb-2">
                {fieldErrors.password[0]}
              </p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mb-4 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />

            {/* Checkbox Section */}
            <div className="space-y-1 mb-6 w-80">
              <label className="flex items-start gap-2 text-gray-700 text-xs">
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="mt-1"
                  name="per_for_news"
                />
                I agree to receive newsletters.
              </label>

              <label className="flex items-start gap-2 text-gray-700 text-xs">
                <input
                  type="checkbox"
                  checked={acceptLoyalty}
                  onChange={(e) => setAcceptLoyalty(e.target.checked)}
                  className="mt-1"
                  name="per_for_loyalty"
                />
                I consent to the make loyalty points.
              </label>

              <label className="flex items-start gap-2 text-gray-700 text-xs">
                <input
                  type="checkbox"
                  checked={acceptPrivacyPolicy}
                  onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
                  className="mt-1"
                  name="per_for_privacy"
                  required
                />
                I consent to the accept Privacy Policy & Regulations.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-80 py-3 mt-2 cursor-pointer rounded-full font-semibold shadow-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0D1537] text-white hover:bg-[#ec2326]"
              }`}
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center justify-center text-sm text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-2 px-4 py-2 mt-2 border  cursor-pointer border-blue-500 text-blue-600 rounded-full hover:border-[#0D1537] hover:text-[#0D1537]"
            >
              LOG IN
            </button>
            <button
              className="mt-3 px-4 py-2 border  cursor-pointer border-pink-500 text-pink-600  rounded-full hover:border-[#0D1537] hover:text-[#0D1537] lg:hidden"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex w-1/2 bg-cover bg-center bg-[url('../src/assets/footer-background.png')] items-center justify-center text-white text-center px-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Join us and explore new destinations
            </h2>
            <p className="text-sm leading-relaxed">
              Discover new journeys with us and unlock memorable experiences
              around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
