import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Products from '../components/Products.jsx';

const DataTable = ({ headers = [], rows = [] }) => {
  const [page, setPage] = useState(0);
  const [visible,setVisible] = useState(false);
  const [infoVisible,setInfovisible] = useState([]);
  const test = rows[0] || [];
  const minLength = Math.min(headers.length||0, test.length || 0);// if no title given, its data won't display
  const trimmedHeaders = headers.slice(0, minLength);// refine headrs to account the available rows
  const trimmedRows = rows.map((row) => row.slice(0, minLength));//

  const handleClick = (visibleRowIndex) => {
    const realIndex = page * rowsPerPage + visibleRowIndex;
    const row = rows[realIndex]; // the full, untrimmed row
    const rowId = row[0]; // adjust this if your `id` is not at index 0

    setVisible(true);
    setInfovisible([{ id: rowId, info: "am in", row }]);
  };


  const handleClickreverse = ()=>{
    setVisible(false);
    setInfovisible([{"id":``,"info":""}]);
  }

  const rowsPerPage = 5;

  const totalPages = Math.ceil(trimmedRows.length / rowsPerPage);// maximum pages to need

  const visibleRows = trimmedRows.slice(
    page * rowsPerPage,// 0*8   0
    (page + 1) * rowsPerPage//1*8`
  );

  return (
    <div className="w-full bg-white rounded-md relative">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-blue-400 text-white">
            {trimmedHeaders.map((header,index) => (
              <th
                key={index}
                className="p-2 border-b  border-b-4 border-black text-left ">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, i) => (
            <tr
              key={i}
              className={`hover:bg-gray-200 ${i % 2 === 1 ? "bg-blue-100" : "bg-white"}`}
            >
              {row.map((cell, j) => (
                <td key={j} className="p-2 border-b border-r border-dashed">
                  {cell}
                </td>
              ))}
              <td className="w-[50px] px-4">
                <button onClick={() => handleClick(i)}>Shop</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => setPage((previousPage) =>previousPage - 1)}
          disabled={page === 0}
          className="flex items-center gap-1 text-gray-300 hover:border-indigo-500 disabled:text-gray-500 disabled:cursor-default disabled:bg-gray-300 cursor-pointer"
        >
          <ChevronLeft size={20} /> Previous
        </button>
        <span className="text-sm text-gray-600">
          Tab {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((previousPage) =>previousPage + 1)}
          disabled={page === totalPages - 1}
          className="flex items-center gap-1 text-gray-300 hover:border-indigo-500 disabled:text-gray-500 disabled:cursor-default disabled:bg-gray-300 cursor-pointer"
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
      {visible && (
        <div className="absolute left-[10px] top-[20px] bg-blue-200/90 text-black rounded-lg border border-white border-4 h-[500px] w-[64vw] flex items-center flex-col">
          <button
            className=' absolute right-0 h-[8vh] w-[3vw] flex items-center justify-center text-white text-xl bg-red-500/70 hover:bg-red-700'
            onClick={handleClickreverse}>
              x
          </button>
          <h3 className='font-semibold underline text-xl'>Shop</h3>
          <div>
            <Products items={[`${infoVisible[0].id}`]}/>
             {/* {infoVisible[0].id} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
