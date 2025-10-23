"use client";
import { useState } from "react";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, XCircle, CheckCircle } from "lucide-react";

type TableProps = {
  columns: string[];
  data: Record<string, any>[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  onStatusChange?: (row: any) => void;
  rowsPerPage?: number;
};

export default function Table({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  onStatusChange,
  rowsPerPage = 10,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const showActions = onEdit || onDelete || onView || onStatusChange;

  return (
    <div className="bg-gradient-to-br from-white to-primary-100 rounded-2xl shadow-xl border border-primary-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary-700 to-primary-600">
              {columns.map((col, idx) => (
                <th
                  key={col}
                  className={`px-6 py-4 text-xs font-bold text-white uppercase tracking-wider ${
                    idx === 0 ? "text-left" : "text-center"
                  }`}
                >
                  {String(col).replace(/_/g, ' ')}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-primary-100">
            {currentRows.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-accent-100 transition-all duration-200 hover:shadow-sm"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={col}
                    className={
                      `px-6 py-4 text-sm font-medium text-primary-800 
                      ${colIdx === 0 ? "text-left" : "text-center"}
                      ${col == 'status'? 'capitalize' : ''}
                      `}
                  >
                    {row[col] ? row[col] : 'N/A'}
                  </td>
                ))}
                {showActions && (
                  <td className="p-4 flex justify-center">
                    <div className="flex items-center gap-4">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          title="View"
                          className="p-2 rounded-lg bg-gradient-to-r from-light-800 to-light-700 text-white hover:from-light-900 hover:to-light-800 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          title="Edit"
                          className="p-2 rounded-lg bg-gradient-to-r from-accent-600 to-accent-500 text-white hover:from-accent-700 hover:to-accent-600 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          title="Delete"
                          className="p-2 rounded-lg bg-gradient-to-r from-error-800 to-error-700 text-white hover:from-error-900 hover:to-error-800 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}

                      {onStatusChange && (
                        <button
                          onClick={() => onStatusChange(row)}
                          className={`p-2 rounded-lg text-white transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-700 hover:to-primary-500`}
                          title={row.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {row.status === 'active' ? (
                            <XCircle size={16} />
                          ) : (
                            <CheckCircle size={16} />
                          )}
                        </button>
                      )}

                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-primary-200 bg-gradient-to-r from-primary-100 to-white">
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary-700">
            Showing{" "}
            <span className="font-bold text-accent-600">{indexOfFirstRow + 1}</span>{" "}
            to{" "}
            <span className="font-bold text-accent-600">
              {Math.min(indexOfLastRow, data.length)}
            </span>{" "}
            of <span className="font-bold text-accent-600">{data.length}</span> results
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              currentPage === 1
                ? "text-primary-400 bg-primary-100 cursor-not-allowed"
                : "text-white bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 shadow-md hover:shadow-lg hover:scale-105"
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg scale-110"
                    : "text-primary-700 hover:bg-primary-100 hover:scale-105"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              currentPage === totalPages
                ? "text-primary-400 bg-primary-100 cursor-not-allowed"
                : "text-white bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-800 hover:to-primary-700 shadow-md hover:shadow-lg hover:scale-105"
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
