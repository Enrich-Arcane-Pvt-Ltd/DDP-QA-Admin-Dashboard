"use client";
import { useState } from "react";

export default function Table({
  columns,
  data,
}: {
  columns: string[];
  data: Record<string, any>[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto rounded-xl border-2 border-primary-200 bg-white shadow-lg">
      <table className="min-w-full">
        <thead className="bg-primary-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-4 text-left text-sm font-semibold text-white"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100">
          {currentRows.map((row, idx) => (
            <tr key={idx} className="hover:bg-accent-100 transition-colors">
              {columns.map((col) => (
                <td key={col} className="px-6 py-4 text-sm text-primary-800">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center p-4 text-sm text-primary-700">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-primary-100 text-primary-400 cursor-not-allowed"
              : "bg-primary-700 text-white hover:bg-primary-600"
          }`}
        >
          Previous
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-primary-100 text-primary-400 cursor-not-allowed"
              : "bg-primary-700 text-white hover:bg-primary-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
