"use client";

import { Trash2, X } from "lucide-react";
import { useState } from "react";

import { QARules } from "@/app/types/QaRules";

interface ModalProps {
    onConfirm?: (id: number) => void;
    onCancel?: () => void;
    isSubmitting: boolean;
    row: QARules
}

function DeleteQARule({ onConfirm, onCancel, isSubmitting, row }: ModalProps) {
    const [rowId, setRowId] = useState(row.id);

    const handleClick = () => {
        onConfirm?.(rowId);
    }

    return (
        <div
            onClick={onCancel}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-900/40 backdrop-blur-sm animate-fadeIn"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md transition-all duration-300 transform shadow-2xl bg-gradient-to-br from-error-500 to-error-100 rounded-2xl animate-slideUp"
            >
                <div className="relative p-6 overflow-hidden bg-gradient-to-r from-error-800 to-error-700 rounded-t-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-error-600/20"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 rounded-full bg-error-900/20"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-xl bg-white/20 backdrop-blur-sm">
                                <Trash2 className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Delete QA Rule</h2>
                                <p className="text-sm text-error-100">This action cannot be undone</p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm hover:scale-110"
                        >
                            <X className="text-white" size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <p className="font-bold text-center text-white">
                        Are you sure you want to delete this qa rule?
                    </p>
                </div>

                <div className="flex flex-col gap-3 p-6 pt-0 sm:flex-row">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 font-semibold transition-all duration-200 bg-white rounded-xl text-error-700 hover:bg-error-200 hover:text-error-700 hover:font-bold hover:scale-105"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleClick}
                        className="flex-1 px-6 py-3 font-semibold text-white transition-all duration-200 shadow-lg rounded-xl bg-gradient-to-r from-error-800 to-error-700 hover:from-error-900 hover:to-error-800 hover:scale-105 hover:shadow-xl"
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteQARule;