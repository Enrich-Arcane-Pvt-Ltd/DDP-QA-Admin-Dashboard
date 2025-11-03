"use client";

import { Trash2, X } from "lucide-react";
import { useState } from "react";

import { DesignProducts } from "@/app/types/DesignProducts";

interface ModalProps {
    onConfirm?: (id: number) => void;
    onCancel?: () => void;
    isSubmitting: boolean;
    id: number;
}

function DeleteDesignItem({ onConfirm, onCancel, isSubmitting, id }: ModalProps) {
    
    const handleClick = () => {
        console.log('id : ', id);
        onConfirm?.(id);
        
    }

    return (
        <div
            onClick={onCancel}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/40 backdrop-blur-sm p-4 animate-fadeIn"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-error-500 to-error-100 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-slideUp"
            >
                <div className="relative bg-gradient-to-r from-error-800 to-error-700 rounded-t-2xl p-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-error-600/20 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-error-900/20 rounded-full -ml-12 -mb-12"></div>

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <Trash2 className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Delete Design Item</h2>
                                <p className="text-error-100 text-sm">This action cannot be undone</p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                        >
                            <X className="text-white" size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <p className="text-white text-center font-bold">
                        Are you sure you want to delete this design item ?
                    </p>
                </div>

                <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 rounded-xl bg-white text-error-700 font-semibold hover:bg-error-200 hover:text-error-700 hover:font-bold transition-all duration-200 hover:scale-105"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleClick}
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-error-800 to-error-700 text-white font-semibold hover:from-error-900 hover:to-error-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteDesignItem;