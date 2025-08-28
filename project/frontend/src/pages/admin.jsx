import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// Generic Table with modal
const GenericTable = ({ fetchUrl, summaryKeys, renderCell }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const chunkSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const text = searchText.trim().toLowerCase();
    const matches = rows?.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(text)
      )
    );
    setFilteredRows(matches);
    setActiveTab(0);
  }, [searchText, rows]);

  const rowChunks = chunkArray(filteredRows, chunkSize);

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-[30vw]"
      />

      {rowChunks.length > 1 && (
        <div className="flex gap-2 mb-4">
          {rowChunks.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-1 rounded ${
                activeTab === i ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Page {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-md w-[70vw]">
        <table className="min-w-full border-4 border-blue-300/40 table-auto">
          <thead className="bg-gray-100">
            <tr>
              {summaryKeys.map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-b border-blue-300 capitalize"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowChunks[activeTab]?.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedItem(row)}
              >
                {summaryKeys.map((key, i) => (
                  <td key={i} className="px-4 py-2 border-b border-gray-200">
                    {renderCell ? renderCell(row, key) : row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {/* Modal */}
<AnimatePresence>
  {selectedItem && (
    <>
      {/* Overlay */}
      <Motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedItem(null)}
      />

      {/* Modal */}
      <Motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <div className="bg-white rounded-xl shadow-lg w-full max-w-[600px] max-h-[80vh] overflow-y-auto p-6">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(selectedItem).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-semibold capitalize">{key}:</span>
                <span>
                  {value && typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : value?.toString()}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedItem(null)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </Motion.div>
    </>
  )}
</AnimatePresence>

    </div>
  );
};

// Admin Page
const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col bg-gradient-to-b from-blue-600 via-lime-300 to-amber-200 justify-center items-center gap-10 p-10">
      <button
        className="absolute top-0 right-0 mx-12 font-medium mt-2 rounded-xl bg-red-400 text-white h-[40px] w-[90px] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        LogOut
      </button>

      {/* Users */}
      <div className="p-4 flex flex-col items-center gap-4 w-full">
        <div className="text-xl font-bold underline flex justify-center mb-2">
          Users
        </div>
        <GenericTable
          fetchUrl="http://localhost:3010/user"
          summaryKeys={["name", "location", "phone"]}
        />
      </div>

      {/* History */}
      <div className="p-4 flex flex-col items-center gap-4 w-full">
        <div className="text-xl font-bold underline flex justify-center mb-2">
          History
        </div>
        <GenericTable
  fetchUrl="http://localhost:3010/history"
  summaryKeys={["ownerName", "shopName", "deliveryStatus"]}
  renderCell={(row, key) => {
    switch (key) {
      case "ownerName":
        return row?.ordered?.ownerName || "-";
      case "shopName":
        return row?.orderCost?.ordeCart?.storing?.[0]?.shopOwner?.shopName || "-";
      case "deliveryStatus":
        return row?.orderDelivery?.deliveryStatus || "-";
      default:
        return row[key];
    }
  }}
/>

      </div>

      {/* Partners */}
      <div className="p-4 flex flex-col items-center gap-4 w-full">
        <div className="text-xl font-bold underline flex justify-center mb-2">
          Partners
        </div>
        <GenericTable
          fetchUrl="http://localhost:3010/partner"
          summaryKeys={["profile", "name"]}
          renderCell={(row, key) =>
            key === "profile" ? (
              <img
                src={row[key] || ""}
                alt={row.name}
                className="w-12 h-12 object-cover rounded-xl"
              />
            ) : (
              row[key]
            )
          }
        />
      </div>
    </div>
  );
};

export default Admin;
