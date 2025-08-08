import React from 'react'
import { useState,useEffect } from 'react';
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
// import { get } from 'https';


const Table = () => {
  const [rows, setRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  const chunkSize = 5;
  const headers = ["phone", "location", "product", "amount", "payment", "createdAt"];

  // Fetch data and set rows
  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await fetch('http://localhost:3010/order', {
          method: "GET",
        });
        const data = await result.json();

        const refined = data.map(el => [
          el.ordered?.phone || '',
          el.ordered?.location || '',
          el.orderCost?.ordeCart?.name || '',
          el.orderCost?.amount || '',
          el.payment ? "Paid" : "Unpaid",
          new Date(el.createdAt).toLocaleString() || ''
        ]);

        setRows(refined);
        setFilteredRows(refined);
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };

    getOrders();
  }, []);


  useEffect(() => {
    const text = searchText.trim().toLowerCase();

    const matches = rows.filter((row) =>
      row.some((cell) =>
        String(cell).toLowerCase().includes(text)
      )
    );

    setFilteredRows(matches);
    setActiveTab(0);
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
                    onClick={() => alert(`server order No: ${rowIndex + 1}`)}
                    className="text-blue-700 hover:underline bg-secondary"
                  >
                    serve
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
const TableProducts = () => {

  const headers = ["id","path","name","measure"]
  const [rows,setRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [visible,setVisible] = useState(false);
// for product add form
  const [productName,setProductName] = useState('');
  const [productFile,setProductFile] = useState(null);
  const [productMeaure,setProductMeasure] = useState('');

  useEffect(()=>{
    const getProducts = async()=>{
      const result = await fetch(` http://localhost:3010/products`,{
        method: "GET"
      });
      const data = await result.json();
      const flatten = data?.map(row=>(
        [
          row.id,
          row.path,
          row.name,
          row.measure
        ]
      ));
      setRows(flatten);
    }
    getProducts();
  },[]);


  const handleProductaddition = async () =>{
    if(!productName || !productFile || !productMeaure){
      alert(`please fill out both fields.`);
      return;
    }

    const formData = new FormData();
    formData.append("name",productName);
    formData.append("profile_path",productFile);
    formData.append("measure",productMeaure);

    try {
      const res = await fetch(" http://localhost:3010/register/product",{/// name,measure,profile_path
        method:"POST",
        body:formData,
      });

      const data = await res.json();

      if(res.ok){
        alert(data.msg || "partner registerd");
        setProductName('');
        setProductMeasure('');
        setProductFile(null);
      }else{
        alert(data.Error || "upload failed")
      }
    } catch (error) {
      console.log(error.message);
      alert(`something went really rwong! ${error.message}`)
    }
  };

  const chunkSize = 3;

  const Addproduct = () =>{
    setVisible(true);
  }
  const Addproductclose = () =>{
    setVisible(false);
  }

  useEffect(() => {
    const text = searchText.trim().toLowerCase();

    const matches = rows.filter((row) =>
      row.some((cell) =>
        String(cell).toLowerCase().includes(text)//  anycell with *mytext* // efficient
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
      {/* add a partner form */}
      {visible && (
        <div className='h-[470px] w-[400px] bg-blue-200/90 flex  flex-col items-center border-4 border-white rounded-xl absolute top-2 left-5 mt-3'>
        <button
          className='absolute right-0 top-0 font-bold text-sm text-white bg-red-500 '
          onClick={()=>Addproductclose()}
          >
          x
        </button>
        <div className='font-semibold flex justify-center h-[60px]  underline'>Add a new Product</div>
        <div className='h-[300px] flex flex-col gap-12 w-[300px] pt-12'>
          <div className='px-3 flex gap-3 items-center text-xl'>
            name:
            <input
              type="text"
              id="#" placeholder="product name" className='shadow-xl rounded-lg h-[35px] p-1'
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
            />
          </div>
          <div className='px-3 flex gap-3 items-center text-xl'>
            measure:
            <input
              type="text"
              id="#" placeholder="measurement" className='shadow-xl rounded-lg h-[35px] p-1'
              value={productMeaure}
              onChange={(e)=>setProductMeasure(e.target.value)}
            />
          </div>
          <div className=' flex gap-3 items-center text-xl'>
            profile:
            <input
              type="file"
              id="#"
              className='shadow-xl rounded-lg h-[35px] w-[250px]'
              onChange={(e)=>setProductFile(e.target.files[0])}
            />
          </div>
          <div className='px-6 flex flex-col gap-4'>
            <div className='flex justify-evenly '>
              <button className='text-white bg-secondary' onClick={handleProductaddition}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      )}



      {/* Add button */}
      <button
        className='absolute right-0 p-4 m-5 font-bold text-lg text-white bg-primary'
        onClick={()=>Addproduct()}
        >
        Add a Product
      </button>
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
        <div className="flex mb-4 gap-3 w-[70vw] ">
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
      <div className="overflow-x-auto rounded-xl shadow-md  w-[70vw] mt-2">
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
                        {i === 1 ? (
                          <img src={cell} alt="preview" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          cell
                        )}
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

const Business = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center gap-10 p-10 relative'>
      <button className='absolute top-0 right-0 m-5 h-[40px] w-[70px] flex items-center justify-center text-white bg-primary'
      onClick={()=>navigate('/')}
      > logout</button>
      <div className="p-4 flex flex-col itmes-center gap-4">
        <div className='text-xl font-bold underline flex justify-center'>
        All orders
        </div>
        <div className='h-[500px] w-[1600px] bg-red-200/50'>
        <Table/>
        </div>
      </div>

      <div className="p-4 flex flex-col itmes-center gap-4">
        <div className='text-xl font-bold underline flex justify-center'>
        Products
        </div>
        <div className='h-[500px] w-[1600px] bg-red-200/50'>
          <TableProducts />
        </div>
      </div>
    </div>
  )
}

export default Business;
