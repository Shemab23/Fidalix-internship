import React from 'react'
import { useState,useEffect} from 'react';
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import {useNavigate} from 'react-router-dom'


const Table = () => {
  const [users,setUsers] = useState([]);
  const rows= users;
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  const headers=["id","kind","name","location","phone","profile_path","password"];



useEffect(() => {
  const getUsers = async () => {
    try {
      const res = await fetch('http://localhost:3010/user');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  getUsers();
}, []);

  const chunkSize = 3;

  useEffect(() => {
    const text = searchText.trim().toLowerCase();

const matches = rows.filter((row) =>
  Object.values(row).some((cell) =>
    String(cell).toLowerCase().includes(text)
  )
);


    setFilteredRows(matches);
    setActiveTab(0); // reset to first tab on new search
  }, [searchText, rows]);

  const rowChunks = [];
  for (let i = 0; i < filteredRows.length; i += chunkSize) {
    rowChunks.push(filteredRows.slice(i, i + chunkSize));
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-[30vw] mt-3"
      />

      {/* Tabs if rows > 5 */}
      {rowChunks.length > 1 && (
        <div className="flex mb-4 gap-2 w-[70vw]">
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

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md  w-[70vw]">
        <table className="min-w-full table-auto border-4 border-blue-300/40">
          <thead className="bg-gray-100 text-left">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-4 py-2 border-b border-blue-300">
                  {header}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-blue-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowChunks[activeTab]?.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Array.isArray(row)
                  ? row.map((cell, i) => (
                      <td key={i} className="px-4 py-2 border-b border-blue-200">
                        {cell}
                      </td>
                    ))
                  : headers.map((key, i) => (
                      <td key={i} className="px-4 py-2 border-b border-gray-200">
                        {row[key]}
                      </td>
                    ))}
                <td className="px-4 py-2 border-b border-gray-200 text-center">
                  <button
                    onClick={() => alert(`delete row number ${rowIndex}`)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TablePartner = () => {
  const [partners, setPartners] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(false);

  // Add form states
  const [partnerName, setPartnerName] = useState("");
  const [partnerFile, setPartnerFile] = useState(null);

  const headers = ["profile", "name"];
  const chunkSize = 5;

  // Fetch partners
  const getPartners = async () => {
    try {
      const res = await fetch("http://localhost:3010/partner");
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  // Filter rows based on search
  useEffect(() => {
    const text = searchText.trim().toLowerCase();
    const matches = partners.filter((row) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(text)
      )
    );
    setFilteredRows(matches);
    setActiveTab(0);
  }, [searchText, partners]);

  // Create paginated chunks
  const rowChunks = [];
  for (let i = 0; i < filteredRows.length; i += chunkSize) {
    rowChunks.push(filteredRows.slice(i, i + chunkSize));
  }

  // Register partner
  const handlePartnerRegister = async () => {
    if (!partnerName || !partnerFile) {
      alert("Please fill out both fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", partnerName);
    formData.append("profile_path", partnerFile);

    try {
      const res = await fetch("http://localhost:3010/register/partner", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.msg || "Partner registered");
        setPartnerName("");
        setPartnerFile(null);
        setVisible(false);
        getPartners(); // Refresh table
      } else {
        alert(data.Error || "Upload failed");
      }
    } catch (error) {
      console.log(error.message);
      alert(`Something went really wrong! ${error.message}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Add Partner Form */}
      {visible && (
        <div className="h-[400px] w-[400px] bg-blue-200/90 flex flex-col items-center border-4 border-white rounded-xl absolute top-2 left-5 mt-10 z-10">
          <button
            className="absolute right-0 top-0 font-bold text-sm text-white bg-red-500 px-2"
            onClick={() => setVisible(false)}
          >
            x
          </button>
          <div className="font-semibold flex justify-center h-[60px] underline">
            Add a new Partner
          </div>
          <div className="h-[300px] flex flex-col gap-12 w-[300px] pt-12">
            <div className="px-3 flex gap-3 items-center text-xl">
              Name:
              <input
                type="text"
                placeholder="Partner's brand name"
                className="shadow-xl rounded-lg h-[35px] p-1"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
              />
            </div>
            <div className="flex gap-3 items-center text-xl">
              Profile:
              <input
                type="file"
                className="shadow-xl rounded-lg h-[35px] w-[250px]"
                onChange={(e) => setPartnerFile(e.target.files[0])}
              />
            </div>
            <div className="px-6 flex flex-col gap-4">
              <div className="flex justify-evenly">
                <button
                  className="text-white bg-secondary px-4 py-1 rounded"
                  onClick={handlePartnerRegister}
                >
                  Register
                </button>
              </div>
              <div className="flex justify-center text-sm">
                Forgot your password? Click{" "}
                <span
                  className="text-primary mx-1 cursor-pointer underline"
                  onClick={() =>
                    alert(`We sent a one time password to +25078*******`)
                  }
                >
                  here
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Partner Button */}
      <button
        className="absolute right-0 p-4 m-5 font-bold text-lg text-white bg-primary"
        onClick={() => setVisible(true)}
      >
        Add a partner
      </button>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-[30vw] mt-3"
      />

      {/* Pagination Tabs */}
      {rowChunks.length > 1 && (
        <div className="flex mb-4 gap-2 w-[70vw]">
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

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md w-[70vw]">
        <table className="min-w-full table-auto border-4 border-blue-300/40">
          <thead className="bg-gray-100 text-left">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-4 py-2 border-b border-blue-300 capitalize">
                  {header}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-blue-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowChunks[activeTab]?.map((partner, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-blue-200">
                  <img
                    src={partner.path}
                    alt={partner.name}
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                </td>
                <td className="px-4 py-2 border-b border-blue-200">{partner.name}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">
                  <button
                    onClick={() => alert(`Delete partner: ${partner.name}`)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const TableHistory = () => {
  const [rows,setRows] =useState([])
  // const Rows=[];
  // rows.map(row=>{
  //   Rows.push([

  //   ])
  // })
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const headers = [
  "payment",
  "bank",
  "bank_card",
  "ownerName",
  "ownerLocation",
  "ownerPhone",
  "ownerProfile",
  "amount",
  "productImage",
  "Product",
  "unitPrice",
  "shopName",
  "shopLocation",
  "shopPhone",
  "shopProfile",
  "deliveryStatus",
  "totalCost",
  "deliveryName",
  "deliveryLocation",
  "deliveryPhone",
  "deliveryProfile"
]


  useEffect(()=>{
    const getHistory = async () =>{
      try {
        const res = await fetch("http://localhost:3010/history",{
          method:"GET",
        });
        const data = await res.json();
        const flat = data?.map(row=>(
          [
          row.payment?"true":"false",
          row.bank,
          row.bank_card,
          row.ordered?.ownerName,
          row.ordered?.ownerLocation,
          row.ordered?.ownerPhone,
          row.ordered?.ownerProfile,
          row.orderCost?.amount,
          row.orderCost?.ordeCart?.productImage,
          row.orderCost?.ordeCart?.Product,
          row.orderCost?.ordeCart?.storing?.[0].unitPrice,
          row.orderCost?.ordeCart?.storing?.[0].shopOwner?.shopName,
          row.orderCost?.ordeCart?.storing?.[0].shopOwner?.shopLocation,
          row.orderCost?.ordeCart?.storing?.[0].shopOwner?.shopPhone,
          row.orderCost?.ordeCart?.storing?.[0].shopOwner?.shopProfile,
          row.orderDelivery?.deliveryStatus || "NOT YET",
          row.orderDelivery?.totalCost || "NOT YET",
          row.orderDelivery?.ordersDestination?.deliveryName || "NOT YET",
          row.orderDelivery?.ordersDestination?.deliveryLocation || "NOT YET",
          row.orderDelivery?.ordersDestination?.deliveryPhone || "NOT YET",
          row.orderDelivery?.ordersDestination?.deliveryProfile || "NOT YET"
        ]
        ));

        setRows(flat);
      } catch (error) {
        console.log(error.message);
        alert(`something went really rwong! ${error.message}`)
      }
    };
    getHistory();

  },[]);

  const chunkSize = 3;



  useEffect(() => {
    const text = searchText.trim().toLowerCase();

const matches = rows.filter((row) =>///// changed
  Object.values(row).some((cell) =>
    String(cell).toLowerCase().includes(text)
  )
);


    setFilteredRows(matches);
    setActiveTab(0); // reset to first tab on new search
  }, [searchText, rows]);

  const rowChunks = [];
  for (let i = 0; i < filteredRows.length; i += chunkSize) {
    rowChunks.push(filteredRows.slice(i, i + chunkSize));
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-[30vw] mt-3"
      />

      {/* Tabs if rows > 5 */}
      {rowChunks.length > 1 && (
        <div className="flex mb-4 gap-2 w-[70vw]">
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

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md  w-[70vw]">
        <table className="min-w-full table-auto border-4 border-blue-300/40">
          <thead className="bg-gray-100 text-left">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-4 py-2 border-b border-blue-300">
                  {header}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-blue-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowChunks[activeTab]?.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Array.isArray(row)
                  ? row.map((cell, i) => (
                      <td key={i} className="px-4 py-2 border-b border-blue-200">
                        {cell}
                      </td>
                    ))
                  : headers.map((key, i) => (
                      <td key={i} className="px-4 py-2 border-b border-gray-200">
                        {row[key]}
                      </td>
                    ))}
                <td className="px-4 py-2 border-b border-gray-200 text-center">
                  <button
                    onClick={() => alert(`delete row number ${rowIndex}`)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate =useNavigate();

  return (
    <div className='relative flex flex-col bg-blue-300/40 justify-center items-center gap-10 p-10'>
      <button className='absolute top-0 right-0 mx-12 h-[40px] w-[90px] flex items-center justify-center'
      onClick={()=>navigate('/')}
      >LogOut</button>
      <div className="p-4 flex flex-col itmes-center gap-4">
        <div className='text-xl font-bold underline flex justify-center'>
        All users
        </div>
        <div className='h-[500px] w-[1600px] '>
        <Table/>
        </div>
      </div>
      <div className="p-4 flex flex-col itmes-center gap-4">
        <div className='text-xl font-bold underline flex justify-center'>
        All history
        </div>
        <div className='h-[500px] w-[1600px]'>
        <TableHistory/>

        </div>
      </div>
      <div className="p-4 flex flex-col itmes-center gap-4">
        <div className='text-xl font-bold underline flex justify-center'>
        partners
        </div>
        <div className='h-[500px] w-[1600px]'>
          <TablePartner/>
        </div>
      </div>
    </div>
  )
}

export default Admin;
