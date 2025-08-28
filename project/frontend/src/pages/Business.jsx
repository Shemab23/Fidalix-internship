import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../context/UserContext";


/* ------------------ ORDERS TABLE ------------------ */
const OrdersTable = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const chunkSize = 5;

  const summaryHeaders = ["Phone", "Product", "Amount"]; // max 3 cols

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("http://localhost:3010/order");
        const data = await res.json();
        const refined = data.map((el) => ({
          phone: el.ordered?.phone || "",
          location: el.ordered?.location || "",
          product: el.orderCost?.ordeCart?.name || "",
          amount: el.orderCost?.amount || "",
          time: new Date(el.createdAt).toLocaleString() || "",
          raw: el,
        }));
        setRows(refined);
        setFilteredRows(refined);
      } catch (err) {
        alert(err.message);
      }
    };
    getOrders();
  }, []);

  // Search
  useEffect(() => {
    const text = searchText.toLowerCase();
    const matches = rows.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(text))
    );
    setFilteredRows(matches);
    setActiveTab(0);
  }, [searchText, rows]);

  const rowChunks = [];
  for (let i = 0; i < filteredRows.length; i += chunkSize) {
    rowChunks.push(filteredRows.slice(i, i + chunkSize));
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      <input
        type="text"
        placeholder="Search orders..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      {/* Pagination (only if rows > 3) */}
      {filteredRows.length > 3 && rowChunks.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {rowChunks.map((_, i) => (
            <button
              key={i}
              className={`px-4 py-1 rounded ${
                activeTab === i ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveTab(i)}
            >
              Page {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Summary Table */}
      <div className="overflow-x-auto rounded-xl shadow w-full">
        <table className="min-w-full table-auto border border-blue-200">
          <thead className="bg-blue-50">
            <tr>
              {summaryHeaders.map((h, i) => (
                <th key={i} className="px-4 py-2 border-b border-blue-200 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowChunks[activeTab]?.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-50 cursor-pointer"
                onClick={() => setSelectedItem(row.raw)}
              >
                {summaryHeaders.map((key, i) => (
                  <td key={i} className="px-4 py-2 border-b border-gray-200">
                    {row[key.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <Motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />
            <Motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white rounded-xl shadow-lg w-full max-w-[600px] max-h-[80vh] overflow-y-auto p-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <div className="flex flex-col gap-2">
                  {Object.entries(selectedItem).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b py-1">
                      <span className="font-semibold capitalize">{key}:</span>
                      <span>
                        {value && typeof value === "object"
                          ? JSON.stringify(value)
                          : value?.toString()}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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



/* ------------------ PRODUCTS TABLE ------------------ */
const ProductsTable = () => {
  const {inn} = useContext(UserContext);// user_id
  const summaryHeaders = ["Image", "Name"];
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [name, setName] = useState("");
  const [measure, setMeasure] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  const chunkSize = 5;

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:3010/products");
      const data = await res.json();
      const refined = data.map((p) => ({
        name: p.name,
        measure: p.measure,
        image: p.path,
        raw: p,
      }));
      setRows(refined);
      setFilteredRows(refined);
    };
    getProducts();
  }, []);

  // Search
  useEffect(() => {
    const text = searchText.toLowerCase();
    const matches = rows.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(text))
    );
    setFilteredRows(matches);
    setActiveTab(0);
  }, [searchText, rows]);

  const rowChunks = [];
  for (let i = 0; i < filteredRows.length; i += chunkSize) {
    rowChunks.push(filteredRows.slice(i, i + chunkSize));
  }

const handleAdd = async () => {
  if (!name || !measure || !file || !price) return alert("Fill all fields");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("measure", measure);
  formData.append("profile_path", file);

  try {
    // 1️⃣ Upload product
    const res = await fetch("http://localhost:3010/register/product", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.Error || "Product upload failed");
      return;
    }

    const productId = data.id; // ✅ get product ID from backend

    alert("Product added successfully");

    // Reset form
    setVisible(false);
    setName("");
    setMeasure("");
    setFile(null);
    setPrice("");

    // 2️⃣ Create store entry
    const res1 = await fetch(`http://localhost:3010/business/store/${inn}/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    });

    if (!res1.ok) {
      const text = await res1.text();
      console.error("Store creation failed:", text);
      alert("Store entry creation failed");
      return;
    }

    const data1 = await res1.json();
    alert(data1.message || "Store entry created");

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Add Product Modal */}
      <AnimatePresence>
        {visible && (
          <>
            <Motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVisible(false)}
            />
            <Motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white relative rounded-xl shadow-lg w-full max-w-md p-6">
              <div className="top-1 right-2 absolute bg-red-600 text-white text-lg px-2 rounded-md cursor-pointer"
              onClick={()=>setVisible(false)}
              >x</div>
                <h2 className="text-lg font-bold mb-4">Add Product</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Measure"
                  value={measure}
                  onChange={(e) => setMeasure(e.target.value)}
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  placeholder="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="mb-2 p-2 border rounded w-full"
                />
                <button
                  onClick={handleAdd}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>

      <button
        onClick={() => setVisible(true)}
        className="self-end mb-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Product
      </button>

      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      {/* Pagination only if rows > 3 */}
      {filteredRows.length > 3 && rowChunks.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {rowChunks.map((_, i) => (
            <button
              key={i}
              className={`px-4 py-1 rounded ${
                activeTab === i ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveTab(i)}
            >
              Page {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Summary Table */}
      <div className="overflow-x-auto rounded-xl shadow w-full">
        <table className="min-w-full table-auto border border-blue-200">
          <thead className="bg-blue-50">
            <tr>
              {summaryHeaders.map((h, i) => (
                <th key={i} className="px-4 py-2 border-b border-blue-200 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowChunks[activeTab]?.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-50 cursor-pointer"
                onClick={() => setSelectedItem(row.raw)}
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  <img
                    src={row.image}
                    alt={row.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <Motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />
            <Motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
                <h2 className="text-lg font-bold mb-4">Product Details</h2>
                <div className="flex flex-col gap-2">
                  {Object.entries(selectedItem).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b py-1">
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
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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


/* ------------------ BUSINESS PAGE ------------------ */
const Business = () => {
  // const {inn} = useContext(UserContext);// user_id
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 flex flex-col gap-6 sm:gap-10 p-4 sm:p-6 md:p-10">

      {/* Logout */}
      <div className="flex justify-end">
        <button
          className="h-[40px] px-4 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
          onClick={() => navigate("/")}
        >
          Logout
          {/* {inn} */}
        </button>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-x-auto">
        <h2 className="text-xl font-bold underline mb-4 text-center">All Orders</h2>
        <OrdersTable />
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-x-auto">
        <h2 className="text-xl font-bold underline mb-4 text-center">Products</h2>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Business;
