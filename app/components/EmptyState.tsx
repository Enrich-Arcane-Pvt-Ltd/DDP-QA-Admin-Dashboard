"use client";

import React from "react";
import { Box, Plus } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    icon?: React.ReactNode;
}

export default function EmptyState({
    title = "No Products Yet",
    description = "Get started by creating your first design product for this order.",
    buttonText = "Create Design Product",
    onButtonClick,
    icon,
}: EmptyStateProps) {
    return (
        <div className="mt-8 bg-gradient-to-br from-light-100 to-accent-50 rounded-2xl border-2 border-dashed border-light-300 p-12 text-center">
            <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    {icon || <Box className="w-10 h-10 text-accent-600" />}
                </div>

                <h3 className="text-2xl font-bold text-primary-800 mb-3">{title}</h3>
                <p className="text-primary-600 mb-6">{description}</p>

                {onButtonClick && (
                    <button
                        onClick={onButtonClick}
                        className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{buttonText}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
