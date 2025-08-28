import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Products from "../components/Products.jsx";

const DataTable = ({ headers = [], rows = [] }) => {
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const rowsPerPage = 3;

  // Show only first 2 headers in table

  const trimmedHeaders = headers.slice(0, 2);

  // Trimmed rows for table view

  const trimmedRows = rows.map((row) => row.slice(0, 3));

  // data for product popup
  const data = ["","name:","","","Location:","contact:"];

  const totalPages = Math.ceil(trimmedRows.length / rowsPerPage);
  const visibleRows = trimmedRows.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleRowClick = (rowIndex) => {
    setSelectedRow(rows[rowIndex]); // full row from original rows
    setSelectedId(rows[rowIndex][2]); // id is always index 2
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRow(null);
    setSelectedId(null);
  };

  return (
    <div className="w-full bg-white rounded-md relative flex flex-col gap-4">
      {/* Table container with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              {trimmedHeaders?.map((header, i) => (
                <th
                  key={i}
                  className="bg-blue-400 text-white h-[30px] border-l-2"
                >
                  <div className="flex justify-start px-2">{header}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((row, id) => {
              const originalIndex = page * rowsPerPage + id; // map back to original rows
              return (
                <tr
                  key={id}
                  onClick={() => handleRowClick(originalIndex)}
                  className="cursor-pointer hover:bg-gray-300 border-green shadow-lg"
                >
                  <td className="flex justify-center">
                    <img
                      src={row[0]}
                      alt={row[1]}
                      className="mt-2 h-[9vh] w-[5vw] mx-2 rounded-full"
                    />
                  </td>
                  <td className="border-l-2 p-2">{row[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="flex items-center gap-1 text-gray-600 disabled:text-gray-400 px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={page === totalPages - 1}
          className="flex items-center gap-1 text-gray-600 disabled:text-gray-400 px-3 py-1 border rounded cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Modal Overlay */}
      {modalVisible && selectedRow && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50 px-2">
          <div className="bg-white/70 text-black rounded-lg w-full max-w-4xl p-6 relative overflow-auto max-h-[85vh]">
            <button
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Dynamically render all values for the row with selectedId */}
            <div className="flex gap-3 mb-4 items-center">
              {rows
                .filter((row) => row[2] === selectedId) // id at index 2
                .flatMap((row) =>
                  row.map((value, i) => (
                    i!== 3 && i!== 2 && <div key={i} className="">
                      <span className={i=== 0 ? "":"border-l-2 border-green-400 px-1 font-bold"}>{data[i]}</span>
                      {i===0? (<img src={value} alt={value} className=" h-12 w-12 rounded-lg"/>):(<span>{value}</span>)}
                    </div>
                  ))
                )}
            </div>

            {/* Example: passing product ID (assuming it's column 2) */}
            <Products items={[selectedRow[2]]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
