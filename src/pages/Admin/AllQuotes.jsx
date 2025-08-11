import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import AdminHeader from "../../components/AdminHeader";
import AdminSideNav from "../../components/AdminSideNav";
import QuoteDetailModal from "./QuoteDetailModal";
import API from "../../api/axiosClient";
import { toast } from "react-toastify";

export default function ManageQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/admin/quotes");
      setQuotes(response.data);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      toast.error("Failed to fetch quotes.");
      setError("Failed to fetch quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuotes = quotes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(quotes.length / itemsPerPage);

  return (
    <div className="min-h-screen  bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <div className="w-1/6 h-auto ">
          <AdminSideNav />
        </div>
        <div className="w-5/6 h-auto pt-10">
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-semibold mb-6">
              Manage <span className="text-red-600">Quotes</span>
            </h1>
            {loading ? (
              <p>Loading quotes...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-4">Quote ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">No. People</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Estimated Price</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuotes.map((quote) => (
                      <tr
                        key={quote.id}
                        className="border-b border-gray-300 hover:bg-gray-50"
                      >
                        <td className="p-4">#{quote.id}</td>
                        <td className="p-4">
                          {quote.customer?.full_name || "—"}
                        </td>
                        <td className="p-4">{quote.package?.title || "—"}</td>
                        <td className="p-4">{quote.number_of_people || "—"}</td>
                        <td className="p-4 capitalize">
                          {quote.status || "—"}
                        </td>
                        <td className="p-4">
                          {quote.estimated_price
                            ? `USD ${quote.estimated_price}`
                            : "—"}
                        </td>
                        <td className="p-4">
                          <button
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs hover:bg-blue-200 flex items-center gap-1"
                            onClick={() => setSelectedQuote(quote)}
                          >
                            <FaEye /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center p-4">
                  <button
                    className="px-3 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => {
            setSelectedQuote(null);
            fetchQuotes();
          }}
        />
      )}
    </div>
  );
}
